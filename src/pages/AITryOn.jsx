import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Upload, Wand2, MessageCircle, RotateCcw, Sparkles } from 'lucide-react'

const WHATSAPP_NUMBER = '923126743225'

const STYLES = [
  {
    id: 'skin-fade',
    name: 'Skin Fade',
    category: 'fade',
    preview: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=120&h=120&fit=crop&q=80',
    filter: 'contrast(1.15) brightness(1.05) saturate(1.1)',
    overlay: { color: 'rgba(0,0,0,0.08)', blur: 0 },
    badge: '🔥 Popular',
  },
  {
    id: 'drop-fade',
    name: 'Drop Fade',
    category: 'fade',
    preview: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=120&h=120&fit=crop&q=80',
    filter: 'contrast(1.2) brightness(1.02) saturate(1.15) hue-rotate(5deg)',
    overlay: { color: 'rgba(10,0,0,0.06)', blur: 0 },
    badge: '✨ Trending',
  },
  {
    id: 'pompadour',
    name: 'Pompadour',
    category: 'haircut',
    preview: 'https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?w=120&h=120&fit=crop&q=80',
    filter: 'contrast(1.1) brightness(1.08) saturate(1.2) sepia(0.08)',
    overlay: { color: 'rgba(20,10,0,0.07)', blur: 0 },
    badge: '💎 Classic',
  },
  {
    id: 'textured-crop',
    name: 'Textured Crop',
    category: 'haircut',
    preview: 'https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?w=120&h=120&fit=crop&q=80',
    filter: 'contrast(1.12) brightness(1.06) saturate(1.08)',
    overlay: { color: 'rgba(0,5,10,0.05)', blur: 0 },
    badge: '🆕 Modern',
  },
  {
    id: 'beard-khat',
    name: 'Beard Khat',
    category: 'beard',
    preview: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=120&h=120&fit=crop&q=80',
    filter: 'contrast(1.18) brightness(0.98) saturate(1.05) sepia(0.05)',
    overlay: { color: 'rgba(5,0,0,0.1)', blur: 0 },
    badge: '⚡ Sharp',
  },
  {
    id: 'full-beard',
    name: 'Full Beard',
    category: 'beard',
    preview: 'https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=120&h=120&fit=crop&q=80',
    filter: 'contrast(1.22) brightness(0.96) saturate(1.1) sepia(0.1)',
    overlay: { color: 'rgba(10,5,0,0.12)', blur: 0 },
    badge: '💪 Bold',
  },
  {
    id: 'hot-shave',
    name: 'Hot Shave',
    category: 'shave',
    preview: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=120&h=120&fit=crop&q=80',
    filter: 'contrast(1.08) brightness(1.1) saturate(0.95)',
    overlay: { color: 'rgba(255,240,200,0.08)', blur: 0 },
    badge: '🪒 Clean',
  },
]

const STEPS = [
  'Analyzing facial structure...',
  'Detecting hair zones...',
  'Applying style parameters...',
  'Rendering final look...',
  'Enhancing details...',
]

export default function AITryOn() {
  const navigate = useNavigate()
  const [photo, setPhoto] = useState(null)
  const [selectedStyle, setSelectedStyle] = useState(STYLES[0])
  const [activeTab, setActiveTab] = useState('all')
  const [processing, setProcessing] = useState(false)
  const [processed, setProcessed] = useState(false)
  const [stepText, setStepText] = useState('')
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef(null)
  const canvasRef = useRef(null)

  const filteredStyles =
    activeTab === 'all' ? STYLES : STYLES.filter((s) => s.category === activeTab)

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPhoto(url)
    setProcessed(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file)
      setPhoto(url)
      setProcessed(false)
    }
  }

  const handleApply = async () => {
    if (!photo) return
    setProcessing(true)
    setProcessed(false)
    setProgress(0)

    for (let i = 0; i < STEPS.length; i++) {
      setStepText(STEPS[i])
      setProgress(((i + 1) / STEPS.length) * 100)
      await new Promise((r) => setTimeout(r, 600))
    }

    setProcessing(false)
    setProcessed(true)
  }

  const handleReset = () => {
    setProcessed(false)
    setPhoto(null)
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
            AI Try-On <span style={{ fontSize: '0.7rem', backgroundColor: 'rgba(212,175,55,0.2)', color: 'var(--accent-color)', padding: '2px 8px', borderRadius: '20px', marginLeft: '6px', fontWeight: '600' }}>BETA</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: '2px 0 0' }}>
            Style preview on your photo
          </p>
        </div>
      </header>

      <div style={{ flex: 1, padding: '0 20px', overflowY: 'auto' }}>

        {/* Photo Upload / Preview Area */}
        <div
          className="neu-inset"
          style={{
            height: '320px',
            borderRadius: '24px',
            marginBottom: '20px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: photo ? 'default' : 'pointer',
          }}
          onClick={() => !photo && fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {photo ? (
            <>
              {/* User Photo with AI filter applied */}
              <img
                src={photo}
                alt="Your photo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: processed ? selectedStyle.filter : 'none',
                  transition: 'filter 1s ease',
                }}
              />

              {/* Color overlay for style effect */}
              {processed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: selectedStyle.overlay.color,
                    pointerEvents: 'none',
                  }}
                />
              )}

              {/* Processing overlay */}
              <AnimatePresence>
                {processing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(26,26,36,0.85)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '16px',
                      padding: '20px',
                    }}
                  >
                    {/* Scanning line */}
                    <div className="ai-scanner" />

                    {/* AI Icon */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles size={36} color="var(--accent-color)" />
                    </motion.div>

                    {/* Step text */}
                    <p style={{ color: 'var(--accent-color)', fontSize: '0.9rem', fontWeight: '600', textAlign: 'center' }}>
                      {stepText}
                    </p>

                    {/* Progress bar */}
                    <div style={{ width: '80%', height: '4px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                      <motion.div
                        style={{ height: '100%', backgroundColor: 'var(--accent-color)', borderRadius: '4px' }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{Math.round(progress)}%</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Success badge */}
              <AnimatePresence>
                {processed && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(46,204,113,0.9)',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <Sparkles size={12} /> {selectedStyle.name} Applied
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Reset button */}
              <button
                className="neu-box"
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  padding: '8px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  backgroundColor: 'rgba(26,26,36,0.8)',
                }}
                onClick={handleReset}
              >
                <RotateCcw size={16} color="var(--text-color)" />
              </button>
            </>
          ) : (
            /* Upload placeholder */
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
              <p style={{ fontSize: '0.78rem' }}>Tap karo ya drag & drop karein</p>
              <p style={{ fontSize: '0.7rem', marginTop: '8px', color: 'rgba(136,136,153,0.6)' }}>
                JPG, PNG supported
              </p>
            </motion.div>
          )}
        </div>

        <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handlePhotoUpload} />

        {/* Upload / Change button */}
        <button
          className="neu-button"
          style={{ width: '100%', padding: '13px', marginBottom: '20px', borderRadius: '14px' }}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload size={17} />
          {photo ? 'Photo Change Karein' : 'Photo Upload Karein'}
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
          <h3 style={{ fontSize: '1rem', marginBottom: '14px', color: 'var(--text-muted)' }}>Style Select Karein:</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {filteredStyles.map((style) => (
              <motion.div
                key={style.id}
                whileTap={{ scale: 0.96 }}
                className={selectedStyle.id === style.id ? 'neu-inset' : 'neu-box'}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: selectedStyle.id === style.id ? '2px solid var(--accent-color)' : '2px solid transparent',
                }}
                onClick={() => {
                  setSelectedStyle(style)
                  setProcessed(false)
                }}
              >
                {/* Style preview image */}
                <div style={{ height: '90px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={style.preview}
                    alt={style.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {/* Badge */}
                  <span style={{
                    position: 'absolute', top: '6px', left: '6px',
                    backgroundColor: 'rgba(26,26,36,0.85)',
                    color: 'var(--accent-color)',
                    fontSize: '0.55rem', fontWeight: '700',
                    padding: '2px 6px', borderRadius: '10px',
                  }}>
                    {style.badge}
                  </span>
                  {selectedStyle.id === style.id && (
                    <div style={{
                      position: 'absolute', inset: 0,
                      backgroundColor: 'rgba(212,175,55,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Sparkles size={20} color="var(--accent-color)" />
                    </div>
                  )}
                </div>
                <div style={{ padding: '8px 10px' }}>
                  <p style={{
                    fontSize: '0.82rem', fontWeight: '600', margin: 0,
                    color: selectedStyle.id === style.id ? 'var(--accent-color)' : 'var(--text-color)',
                  }}>
                    {style.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Apply AI Button */}
        {photo && !processed && !processing && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="neu-button"
            style={{
              width: '100%', padding: '16px', marginBottom: '16px',
              color: 'var(--accent-color)', fontSize: '1rem',
              borderRadius: '14px', fontWeight: '700',
            }}
            onClick={handleApply}
          >
            <Wand2 size={20} /> AI Style Apply Karein — {selectedStyle.name}
          </motion.button>
        )}

        {/* Book Button */}
        <AnimatePresence>
          {processed && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="neu-button neu-button-primary"
              style={{
                width: '100%', padding: '16px', fontSize: '1rem',
                borderRadius: '14px', marginBottom: '12px',
              }}
              onClick={handleBook}
            >
              <MessageCircle size={20} />
              Yeh Style Book Karein — WhatsApp
            </motion.button>
          )}
        </AnimatePresence>

        {/* Disclaimer */}
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '8px', lineHeight: '1.5' }}>
          ⚠️ Yeh AI preview demo mode mein hai. Actual result barber ke haath mein hoga.
        </p>
      </div>
    </motion.div>
  )
}
