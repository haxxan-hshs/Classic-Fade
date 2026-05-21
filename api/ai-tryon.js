// Vercel Serverless Function — Replicate API proxy
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const REPLICATE_TOKEN = process.env.VITE_REPLICATE_TOKEN
  if (!REPLICATE_TOKEN) {
    return res.status(500).json({ error: 'API token not configured' })
  }

  try {
    const { image, prompt } = req.body

    // Start prediction on Replicate
    const startRes = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${REPLICATE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: 'ddfc2b08d209f9fa8c1eca692712918bd449f695dabb4a958da31802a9570fe4',
        input: {
          image,
          prompt: prompt + ', photorealistic, high quality, professional photo, same person',
          negative_prompt: 'blurry, low quality, distorted face, different person, cartoon',
          num_inference_steps: 25,
          guidance_scale: 7,
          strength: 0.5,
        },
      }),
    })

    const prediction = await startRes.json()

    if (!prediction.id) {
      return res.status(400).json({ error: prediction.detail || 'Failed to start AI' })
    }

    // Poll until done (max 90 seconds)
    let result = null
    for (let i = 0; i < 45; i++) {
      await new Promise((r) => setTimeout(r, 2000))
      const pollRes = await fetch(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
        headers: { Authorization: `Bearer ${REPLICATE_TOKEN}` },
      })
      const data = await pollRes.json()

      if (data.status === 'succeeded') {
        result = Array.isArray(data.output) ? data.output[0] : data.output
        break
      }
      if (data.status === 'failed' || data.status === 'canceled') {
        return res.status(500).json({ error: data.error || 'AI processing failed' })
      }
    }

    if (!result) {
      return res.status(408).json({ error: 'Timeout — please try again' })
    }

    return res.status(200).json({ output: result })
  } catch (err) {
    console.error('AI proxy error:', err)
    return res.status(500).json({ error: err.message || 'Server error' })
  }
}
