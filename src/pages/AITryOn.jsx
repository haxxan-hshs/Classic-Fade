import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Upload, Wand2, MessageCircle, RotateCcw, Sparkles, AlertCircle } from 'lucide-react'

const WHATSAPP_NUMBER = '923126743225'

// Detect if running locally or on Vercel
const API_BASE = import.meta.env.DEV ? 'http://localhost:3000' : ''

// Style reference images — these are used as the "target style" for AI
const STYLES = [
  {
    id: 'skin-fade',
    name: 'Skin Fade',
    category: 'fade',
    badge: '🔥 Popular',
    preview: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=300&fit=crop&q=80',
    refImage: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=512&fit=crop&q=90',
    prompt: 'man with clean skin fade haircut, sharp fade on sides, professional barber style',
  },
  {
    id: 'drop-fade',
    name: 'Drop Fade',
    category: 'fade',
    badge: '✨ Trending',
    preview: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=300&fit=crop&q=80',
    refImage: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=512&fit=crop&q=90',
    prompt: 'man with drop fade haircut, low drop fade on sides, modern barbershop style',
  },
  {
    id: 'pompadour',
    name: 'Pompadour',
    category: 'haircut',
    badge: '💎 Classic',
    preview: 'https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?w=300&fit=crop&q=80',
    refImage: 'https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?w=512&fit=crop&q=90',
    prompt: 'man with classic pompadour hairstyle, voluminous top, slicked back sides',
  },
  {
    id: 'textured-crop',
    name: 'Textured Crop',
    category: 'haircut',
    badge: '🆕 Modern',
    preview: 'https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?w=300&fit=crop&q=80',
    refImage: 'https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?w=512&fit=crop&q=90',
    prompt: 'man with textured crop haircut, short textured top, modern fade sides',
  },
  {
    id: 'beard-khat',
    name: 'Beard Khat',
    category: 'beard',
    badge: '⚡ Sharp',
    preview: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=300&fit=crop&q=80',
    refImage: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=512&fit=crop&q=90',
    prompt: 'man with sharp beard khat line, clean defined beard edges, executive beard trim',
  },
  {
    id: 'full-beard',
    name: 'Full Beard',
    category: 'beard',
    badge: '💪 Bold',
    preview: 'https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=300&fit=crop&q=80',
    refImage: 'https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=512&fit=crop&q=90',
    prompt: 'man with full thick beard, well groomed full beard, masculine beard style',
  },
  {
    id: 'hot-shave',
    name: 'Hot Shave',
    category: 'shave',
    badge: '🪒 Clean',
    preview: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=300&fit=crop&q=80',
    refImage: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=512&fit=crop&q=90',
    prompt: 'man with clean shaved face, smooth clean shave, no beard fresh look',
  },
]

// Convert file to base64
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

const STEPS = [
  'Uploading your photo...',
  'Analyzing facial features...',
  'Detecting hair & beard zones...',
  'Applying style transformation...',
  'Enhancing final result...',
  'Almost done...',
]

export default function AITryOn() {
  const navigate = useNavigate()
  const [photoFile, setPhotoFile] = useState(null)
  const [photoUrl, setPhotoUrl] = useState(null)
  const [selectedStyle, setSelectedStyle] = useState(STYLES[0])
  const [activeTab, setActiveTab] = useState('all')
  const [processing, setProcessing] = useState(false)
  const [resultUrl, setResultUrl] = useState(null)
  const [error, setError] = useState(null)
  const [stepText, setStepText] = useState('')
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef(null)

  const filteredStyles =
    activeTab === 'all' ? STYLES : STYLES.filter((s) => s.category === activeTab)

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setPhotoFile(file)
    setPhotoUrl(URL.createObjectURL(file))
    setResultUrl(null)
    setError(null)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setPhotoFile(file)
      setPhotoUrl(URL.createObjectURL(file))
      setResultUrl(null)
      setError(null)
    }
  }

  const handleApply = async () => {
    if (!photoFile) return
    setProcessing(true)
    setResultUrl(null)
    setError(null)
    setProgress(0)

    try {
      // Step 1 — Upload
      setStepText(STEPS[0]); setProgress(15)
      const base64 = await toBase64(photoFile)

      // Step 2 — Analyze
      setStepText(STEPS[1]); setProgress(30)
      await new Promise((r) => setTimeout(r, 500))

      // Step 3 — Detect zones
      setStepText(STEPS[2]); setProgress(45)

      // Call our proxy API
      const response = await fetch('/api/ai-tryon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: base64,
          prompt: selectedStyle.prompt,
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'AI processing failed')

      // Step 5 — Enhance
      setStepText(STEPS[4]); setProgress(85)
      await new Promise((r) => setTimeout(r, 400))
      setStepText(STEPS[5]); setProgress(100)
      await new Promise((r) => setTimeout(r, 300))

      setResultUrl(data.output)
    } catch (err) {
      console.error('AI Error:', err)
      setError(err.message || 'Kuch masla hua. Dobara try karein.')
    } finally {
      setProcessing(false)
    }
  }

  const handleReset = () => {
    setResultUrl(null)
    setPhotoUrl(null)
    setPhotoFile(null)
    setError(null)
    setProgress(0)
  }

  const handleBook = () => {
    const history = JSON.parse(localStorage.getItem('bookingHistory')) || []
    history.push({ styleName: selectedStyle.name, date: new Date().toISOString() })
    localStorage.setItem('bookingHistory', JSON.stringify(history))
    const msg = encodeURIComponent(
      `Assalam o Alaikum Classic Fade! Maine AI Try-On mein "${selectedStyle.name}" style try kiya aur mujhe yeh pasand aaya. Booking karni hai!`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
  }

  const displayImage = resultUrl || photoUrl

  return (
    <motion.div
      className="mobile-container"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingBottom: '30px' }}
    >
      {/* Header */}
      <header style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px', flexShrink: 0 }}>
        <button className="neu-button" style={{ padding: '10px' }} onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 style={{ fontSize: '1.3rem', margin: 0 }}>
            AI Try-On
            <span style={{ fontSize: '0.6rem', backgroundColor: 'rgba(212,175,55,0.2)', color: 'var(--accent-color)', padding: '2px 8px', borderRadius: '20px', marginLeft: '8px', fontWeight: '700' }}>
              REAL AI
            </span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: '2px 0 0' }}>
            Apni photo pe actual style apply hoga
          </p>
        </div>
      </header>

      <div style={{ flex: 1, padding: '0 20px', overflowY: 'auto' }}>

        {/* Photo Preview Area */}
        <div
          className="neu-inset"
          style={{
            height: '320px', borderRadius: '24px', marginBottom: '16px',
            position: 'relative', overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: displayImage ? 'default' : 'pointer',
          }}
          onClick={() => !displayImage && fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {displayImage ? (
            <>
              <img
                src={displayImage}
                alt="Result"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {/* Processing overlay */}
              <AnimatePresence>
                {processing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      position: 'absolute', inset: 0,
                      backgroundColor: 'rgba(26,26,36,0.88)',
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                      gap: '16px', padding: '24px',
                    }}
                  >
                    <div className="ai-scanner" />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles size={40} color="var(--accent-color)" />
                    </motion.div>
                    <p style={{ color: 'var(--accent-color)', fontSize: '0.9rem', fontWeight: '600', textAlign: 'center' }}>
                      {stepText}
                    </p>
                    <div style={{ width: '85%', height: '6px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden' }}>
                      <motion.div
                        style={{ height: '100%', backgroundColor: 'var(--accent-color)', borderRadius: '6px' }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                      {Math.round(progress)}% — Please wait...
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Result badge */}
              {resultUrl && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    position: 'absolute', top: '12px', left: '12px',
                    backgroundColor: 'rgba(46,204,113,0.92)',
                    color: 'white', padding: '6px 12px', borderRadius: '20px',
                    fontSize: '0.72rem', fontWeight: '700',
                    display: 'flex', alignItems: 'center', gap: '5px',
                  }}
                >
                  <Sparkles size={12} /> AI Result — {selectedStyle.name}
                </motion.div>
              )}

              {/* Reset button */}
              {!processing && (
                <button
                  className="neu-box"
                  style={{
                    position: 'absolute', top: '12px', right: '12px',
                    padding: '8px', borderRadius: '50%', cursor: 'pointer',
                    backgroundColor: 'rgba(26,26,36,0.8)',
                  }}
                  onClick={handleReset}
                >
                  <RotateCcw size={16} color="var(--text-color)" />
                </button>
              )}
            </>
          ) : (
            <motion.div
              style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px' }}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: 'rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Upload size={28} color="var(--accent-color)" />
              </div>
              <p style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-color)', marginBottom: '6px' }}>
                Apni Photo Upload Karein
              </p>
              <p style={{ fontSize: '0.78rem' }}>Tap karo ya drag & drop</p>
              <p style={{ fontSize: '0.7rem', marginTop: '8px', color: 'rgba(136,136,153,0.5)' }}>
                Clear face photo best results deti hai
              </p>
            </motion.div>
          )}
        </div>

        <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handlePhotoUpload} />

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: '10px',
                backgroundColor: 'rgba(231,76,60,0.12)', border: '1px solid rgba(231,76,60,0.3)',
                borderRadius: '14px', padding: '14px 16px', marginBottom: '14px',
              }}
            >
              <AlertCircle size={18} color="#e74c3c" style={{ flexShrink: 0, marginTop: '1px' }} />
              <div>
                <p style={{ color: '#e74c3c', fontSize: '0.85rem', fontWeight: '600', margin: '0 0 4px' }}>
                  AI Error
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: 0 }}>{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upload button */}
        <button
          className="neu-button"
          style={{ width: '100%', padding: '13px', marginBottom: '20px', borderRadius: '14px' }}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload size={17} />
          {photoUrl ? 'Photo Change Karein' : 'Photo Upload Karein'}
        </button>

        {/* Style Tabs */}
        <div style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none' }}>
            {['all', 'fade', 'haircut', 'beard', 'shave'].map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? 'neu-inset' : 'neu-box'}
                style={{
                  padding: '8px 16px', borderRadius: '10px', whiteSpace: 'nowrap',
                  color: activeTab === tab ? 'var(--accent-color)' : 'var(--text-color)',
                  fontWeight: activeTab === tab ? '600' : '400',
                  fontSize: '0.8rem', cursor: 'pointer', textTransform: 'capitalize',
                }}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'all' ? 'All' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Style Grid */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '0.95rem', marginBottom: '12px', color: 'var(--text-muted)' }}>
            Style Select Karein:
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {filteredStyles.map((style) => (
              <motion.div
                key={style.id}
                whileTap={{ scale: 0.96 }}
                className={selectedStyle.id === style.id ? 'neu-inset' : 'neu-box'}
                style={{
                  borderRadius: '16px', overflow: 'hidden', cursor: 'pointer',
                  border: selectedStyle.id === style.id ? '2px solid var(--accent-color)' : '2px solid transparent',
                }}
                onClick={() => {
                  setSelectedStyle(style)
                  setResultUrl(null)
                  setError(null)
                }}
              >
                <div style={{ height: '90px', overflow: 'hidden', position: 'relative' }}>
                  <img src={style.preview} alt={style.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{
                    position: 'absolute', top: '6px', left: '6px',
                    backgroundColor: 'rgba(26,26,36,0.85)', color: 'var(--accent-color)',
                    fontSize: '0.55rem', fontWeight: '700', padding: '2px 6px', borderRadius: '10px',
                  }}>
                    {style.badge}
                  </span>
                  {selectedStyle.id === style.id && (
                    <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(212,175,55,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Sparkles size={22} color="var(--accent-color)" />
                    </div>
                  )}
                </div>
                <div style={{ padding: '8px 10px' }}>
                  <p style={{ fontSize: '0.82rem', fontWeight: '600', margin: 0, color: selectedStyle.id === style.id ? 'var(--accent-color)' : 'var(--text-color)' }}>
                    {style.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Apply AI Button */}
        {photoUrl && !resultUrl && !processing && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="neu-button neu-button-primary"
            style={{ width: '100%', padding: '16px', marginBottom: '14px', fontSize: '1rem', borderRadius: '14px', fontWeight: '700' }}
            onClick={handleApply}
          >
            <Wand2 size={20} /> AI Se Apply Karein — {selectedStyle.name}
          </motion.button>
        )}

        {/* Book Button */}
        <AnimatePresence>
          {resultUrl && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="neu-button neu-button-primary"
              style={{ width: '100%', padding: '16px', fontSize: '1rem', borderRadius: '14px', marginBottom: '12px' }}
              onClick={handleBook}
            >
              <MessageCircle size={20} /> Yeh Style Book Karein — WhatsApp
            </motion.button>
          )}
        </AnimatePresence>

        {/* Info note */}
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '8px', lineHeight: '1.6' }}>
          💡 Best results ke liye: clear face photo, good lighting, front-facing
        </p>
      </div>
    </motion.div>
  )
}
