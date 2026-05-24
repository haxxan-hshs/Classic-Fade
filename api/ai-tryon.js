// Vercel Serverless Function — Leonardo.ai API proxy (SeedDream 4.5)
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const LEONARDO_API_KEY = process.env.LEONARDO_API_KEY
  if (!LEONARDO_API_KEY) {
    return res.status(500).json({ error: 'Leonardo API key not set in environment variables' })
  }

  try {
    const { image, prompt } = req.body

    if (!image || !prompt) {
      return res.status(400).json({ error: 'image aur prompt required hain' })
    }

    // Step 1: Upload the image to Leonardo first
    const uploadRes = await fetch('https://cloud.leonardo.ai/api/rest/v1/init-image', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LEONARDO_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        extension: 'jpg',
      }),
    })

    if (!uploadRes.ok) {
      const errorText = await uploadRes.text()
      console.error('Leonardo init-image error:', uploadRes.status, errorText)
      return res.status(400).json({ error: 'Failed to initialize image upload' })
    }

    const uploadData = await uploadRes.json()
    const { uploadInitImage } = uploadData

    if (!uploadInitImage?.url || !uploadInitImage?.fields || !uploadInitImage?.id) {
      console.error('Invalid upload response:', uploadData)
      return res.status(400).json({ error: 'Invalid upload initialization response' })
    }

    // Step 2: Upload the actual image to the presigned URL
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '')
    const imageBuffer = Buffer.from(base64Data, 'base64')

    // Parse the fields string to JSON
    let fields
    try {
      fields = typeof uploadInitImage.fields === 'string' 
        ? JSON.parse(uploadInitImage.fields) 
        : uploadInitImage.fields
    } catch (e) {
      console.error('Failed to parse fields:', e)
      return res.status(400).json({ error: 'Invalid upload fields format' })
    }

    // Create form data for S3 upload
    const formData = new FormData()
    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value)
    })
    formData.append('file', new Blob([imageBuffer], { type: 'image/jpeg' }))

    const s3UploadRes = await fetch(uploadInitImage.url, {
      method: 'POST',
      body: formData,
    })

    if (!s3UploadRes.ok) {
      const s3Error = await s3UploadRes.text()
      console.error('S3 upload failed:', s3UploadRes.status, s3Error)
      return res.status(400).json({ error: 'Failed to upload image to storage' })
    }

    // Step 3: Generate image using SeedDream 4.5 via v2 API
    const generateRes = await fetch('https://cloud.leonardo.ai/api/rest/v2/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LEONARDO_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        model: 'seedream-4.5',
        parameters: {
          width: 768,
          height: 1024,
          prompt: `${prompt}, photorealistic, high quality, professional photo, same person face preserved, detailed facial features, natural skin texture, sharp focus`,
          quantity: 1,
          guidances: {
            image_reference: [
              {
                image: {
                  id: uploadInitImage.id,
                  type: 'UPLOADED',
                },
                strength: 'HIGH', // HIGH to preserve original face better
              },
            ],
          },
          style_ids: ['ab5a4220-7c42-41e5-a578-eddb9fed3d75'], // Portrait style for better face preservation
        },
        public: false,
      }),
    })

    if (!generateRes.ok) {
      const errorText = await generateRes.text()
      console.error('Leonardo generation error:', generateRes.status, errorText)
      return res.status(400).json({ error: 'Failed to start generation' })
    }

    const generateData = await generateRes.json()
    console.log('Generation response:', JSON.stringify(generateData))
    
    // v2 API may return generation.id or sdGenerationJob.generationId
    const generationId = generateData.generation?.id || generateData.sdGenerationJob?.generationId

    if (!generationId) {
      console.error('No generation ID in response:', JSON.stringify(generateData))
      return res.status(400).json({ error: 'Failed to get generation ID' })
    }

    // Step 4: Poll for completion (max 120 seconds)
    for (let i = 0; i < 60; i++) {
      await new Promise((r) => setTimeout(r, 2000))

      const pollRes = await fetch(`https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`, {
        headers: { 
          'Authorization': `Bearer ${LEONARDO_API_KEY}`,
          'Accept': 'application/json',
        },
      })

      if (!pollRes.ok) {
        console.error('Poll error:', pollRes.status)
        continue
      }

      const pollData = await pollRes.json()
      const generation = pollData.generations_by_pk

      if (generation?.status === 'COMPLETE') {
        const generatedImages = generation.generated_images
        if (generatedImages && generatedImages.length > 0) {
          return res.status(200).json({ output: generatedImages[0].url })
        }
        return res.status(500).json({ error: 'Generation complete but no images found' })
      }

      if (generation?.status === 'FAILED') {
        console.error('Generation failed:', generation)
        return res.status(500).json({ error: 'AI generation failed' })
      }
    }

    return res.status(408).json({ error: 'Timeout — dobara try karein' })

  } catch (err) {
    console.error('Leonardo AI proxy error:', err)
    return res.status(500).json({ error: err.message || 'Server error' })
  }
}
