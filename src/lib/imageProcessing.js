/**
 * Image Processing Utilities for Virtual Makeover
 * Handles image manipulation, face detection, and style application
 */

/**
 * Simple face detection using brightness analysis
 * In production, use face-api.js or TensorFlow.js for accurate face detection
 */
export const detectFaceRegion = (imageData) => {
  const { data, width, height } = imageData
  let minX = width,
    maxX = 0,
    minY = height,
    maxY = 0

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const brightness = (r + g + b) / 3

    // Consider skin tones (higher brightness often indicates face area)
    if (brightness > 100 && brightness < 220) {
      const pixelIndex = i / 4
      const x = pixelIndex % width
      const y = Math.floor(pixelIndex / width)

      minX = Math.min(minX, x)
      maxX = Math.max(maxX, x)
      minY = Math.min(minY, y)
      maxY = Math.max(maxY, y)
    }
  }

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
    centerX: minX + (maxX - minX) / 2,
    centerY: minY + (maxY - minY) / 2,
  }
}

/**
 * Apply hairstyle effect using canvas filters and gradients
 */
export const applyHairstyleEffect = (ctx, faceRegion, hairStyle, imageWidth, imageHeight) => {
  const { y, height, centerX, width } = faceRegion
  const hairTop = Math.max(0, y - height * 0.3)
  const hairHeight = height * 0.45

  // Hair color and texture based on style
  const hairConfig = {
    fade: {
      color: 'rgba(20, 20, 20, 0.3)',
      blend: 'multiply',
      intensity: 0.35,
    },
    taper: {
      color: 'rgba(30, 30, 30, 0.25)',
      blend: 'multiply',
      intensity: 0.3,
    },
    buzzcut: {
      color: 'rgba(40, 40, 40, 0.2)',
      blend: 'darken',
      intensity: 0.22,
    },
    crewcut: {
      color: 'rgba(25, 25, 25, 0.28)',
      blend: 'multiply',
      intensity: 0.32,
    },
    pompadour: {
      color: 'rgba(15, 15, 15, 0.35)',
      blend: 'multiply',
      intensity: 0.38,
    },
    curly: {
      color: 'rgba(20, 20, 20, 0.32)',
      blend: 'multiply',
      intensity: 0.35,
    },
    longhair: {
      color: 'rgba(15, 15, 15, 0.4)',
      blend: 'multiply',
      intensity: 0.42,
    },
  }

  const config = hairConfig[hairStyle] || hairConfig.fade

  // Create radial gradient for natural hair blending
  const hairGradient = ctx.createLinearGradient(0, hairTop, 0, hairTop + hairHeight)
  hairGradient.addColorStop(0, config.color.replace('0.', (parseFloat(config.color.match(/[\d.]+$/)[0]) * 0.7).toFixed(2)))
  hairGradient.addColorStop(0.5, config.color)
  hairGradient.addColorStop(1, config.color.replace('0.', (parseFloat(config.color.match(/[\d.]+$/)[0]) * 0.2).toFixed(2)))

  ctx.globalAlpha = config.intensity
  ctx.globalCompositeOperation = 'multiply'
  ctx.fillStyle = hairGradient
  ctx.fillRect(0, hairTop, imageWidth, hairHeight)
  ctx.globalCompositeOperation = 'source-over'
  ctx.globalAlpha = 1
}

/**
 * Apply beard style effect
 */
export const applyBeardEffect = (ctx, faceRegion, beardStyle, imageWidth, imageHeight) => {
  const { y, height, centerX } = faceRegion
  const jawY = y + height * 0.65
  const beardHeight = height * 0.35

  const beardConfig = {
    clean: { intensity: 0, color: 'transparent' },
    stubble: { intensity: 0.1, color: 'rgba(50, 50, 50, 0.15)' },
    fullbeard: { intensity: 0.25, color: 'rgba(40, 40, 40, 0.28)' },
    frenchbeard: { intensity: 0.2, color: 'rgba(45, 45, 45, 0.22)' },
    goatee: { intensity: 0.15, color: 'rgba(40, 40, 40, 0.18)' },
    mustache: { intensity: 0.12, color: 'rgba(50, 50, 50, 0.2)' },
  }

  const config = beardConfig[beardStyle] || beardConfig.clean

  if (config.intensity === 0) return

  const beardGradient = ctx.createLinearGradient(0, jawY, 0, jawY + beardHeight)
  beardGradient.addColorStop(0, config.color.replace(/[\d.]+\)/, '0)'))
  beardGradient.addColorStop(0.3, config.color)
  beardGradient.addColorStop(1, config.color.replace(/[\d.]+\)/, '0.1)'))

  ctx.globalAlpha = config.intensity
  ctx.globalCompositeOperation = 'multiply'
  ctx.fillStyle = beardGradient
  ctx.fillRect(0, jawY, imageWidth, beardHeight)
  ctx.globalCompositeOperation = 'source-over'
  ctx.globalAlpha = 1
}

/**
 * Apply overall image enhancement (contrast, brightness, etc)
 */
export const enhanceImageQuality = (ctx, imageWidth, imageHeight) => {
  const imageData = ctx.getImageData(0, 0, imageWidth, imageHeight)
  const data = imageData.data

  // Enhanced contrast and brightness for better definition
  for (let i = 0; i < data.length; i += 4) {
    // Increase contrast and brightness
    data[i] = Math.min(255, data[i] * 1.1 + 5) // Red
    data[i + 1] = Math.min(255, data[i + 1] * 1.1 + 5) // Green
    data[i + 2] = Math.min(255, data[i + 2] * 1.1 + 5) // Blue
    // Alpha remains unchanged
  }

  ctx.putImageData(imageData, 0, 0)
}

/**
 * Advanced AI-based style application (for future integration)
 * This would integrate with services like:
 * - Replicate API (Stability AI models)
 * - RunwayML API
 * - Custom ML backend
 */
export const applyAIStyleTransform = async (imageBase64, hairStyle, beardStyle) => {
  // Placeholder for future AI integration
  // Example with Replicate API:
  /*
  const response = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${process.env.REACT_APP_REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      version: 'MODEL_ID',
      input: {
        image: imageBase64,
        hair_style: hairStyle,
        beard_style: beardStyle,
      },
    }),
  })

  const result = await response.json()
  return result.output
  */

  // For now, return a placeholder
  throw new Error('AI integration not yet configured. Please set up API credentials.')
}

/**
 * Compress image for faster processing and download
 */
export const compressImage = (canvas, quality = 0.85) => {
  return canvas.toDataURL('image/jpeg', quality)
}

/**
 * Create before/after comparison image
 */
export const createComparisonImage = (beforeCanvas, afterCanvas) => {
  const width = beforeCanvas.width
  const height = beforeCanvas.height

  // Create a new canvas for the comparison
  const comparisonCanvas = document.createElement('canvas')
  comparisonCanvas.width = width * 2
  comparisonCanvas.height = height

  const ctx = comparisonCanvas.getContext('2d')

  // Draw before image
  ctx.drawImage(beforeCanvas, 0, 0)

  // Draw after image
  ctx.drawImage(afterCanvas, width, 0)

  // Add labels
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'
  ctx.font = 'bold 24px Arial'
  ctx.fillText('BEFORE', 20, 40)
  ctx.fillText('AFTER', width + 20, 40)

  return comparisonCanvas.toDataURL('image/jpeg', 0.9)
}
