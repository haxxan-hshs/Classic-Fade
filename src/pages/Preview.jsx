import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Upload, CheckCircle, Image as ImageIcon, Wand2, Move } from 'lucide-react'

// Placeholder transparent images for the overlay (User will replace these later)
const STYLE_OPTIONS = [
  { 
    id: 'fade', 
    name: 'Classic Fade', 
    type: 'hair', 
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Hair_silhouette_01.svg/512px-Hair_silhouette_01.svg.png' 
  },
  { 
    id: 'buzz', 
    name: 'Buzz Cut', 
    type: 'hair', 
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Hair_silhouette_02.svg/512px-Hair_silhouette_02.svg.png' 
  },
  { 
    id: 'beard', 
    name: 'Beard Trim', 
    type: 'beard', 
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Beard_silhouette.svg/512px-Beard_silhouette.svg.png' 
  },
]

export default function Preview() {
  const navigate = useNavigate()
  const [userPhoto, setUserPhoto] = useState(null)
  const [selectedStyle, setSelectedStyle] = useState(STYLE_OPTIONS[0])
  const [isProcessing, setIsProcessing] = useState(false)
  const [isProcessed, setIsProcessed] = useState(false)
  const fileInputRef = useRef(null)

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setUserPhoto(url)
      setIsProcessed(false)
    }
  }

  const handleGenerate = () => {
    setIsProcessing(true)
    setIsProcessed(false)
    
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsProcessed(true)
    }, 2500)
  }

  const handleBookNow = () => {
    // Save to user history
    const history = JSON.parse(localStorage.getItem('bookingHistory')) || []
    history.push({
      styleName: selectedStyle.name,
      date: new Date().toISOString()
    })
    localStorage.setItem('bookingHistory', JSON.stringify(history))

    // Open WhatsApp
    const message = encodeURIComponent(`Hello Classic Fade! I'd like to book an appointment for the ${selectedStyle.name} style.`)
    const phone = '923126743225'
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
  }

  return (
    <motion.div 
      className="mobile-container"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
      style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
    >
      <header style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button className="neu-button" style={{ padding: '10px' }} onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1 style={{ fontSize: '1.4rem', margin: 0 }}>AI Try On</h1>
      </header>

      <div style={{ flex: 1, padding: '0 20px', overflowY: 'auto' }}>
        <div 
          className="neu-inset" 
          style={{ 
            height: '350px', 
            borderRadius: '24px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '20px'
          }}
        >
          {userPhoto ? (
            <>
              <img 
                src={userPhoto} 
                alt="User face" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  filter: isProcessed ? 'contrast(1.05) brightness(1.02)' : 'none',
                  transition: 'filter 0.5s ease'
                }} 
              />
              
              {isProcessing && <div className="ai-scanner"></div>}
              
              {isProcessed && (
                <motion.div
                  drag
                  dragMomentum={false}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    position: 'absolute',
                    top: selectedStyle.type === 'beard' ? '50%' : '10%',
                    cursor: 'move',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    zIndex: 10
                  }}
                >
                  <img 
                    src={selectedStyle.src} 
                    alt={selectedStyle.name} 
                    style={{ 
                      width: '150px', 
                      height: 'auto',
                      filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.5))',
                      opacity: 0.85
                    }} 
                  />
                  <div style={{ 
                    marginTop: '10px', 
                    background: 'rgba(0,0,0,0.6)', 
                    color: 'white', 
                    padding: '4px 8px', 
                    borderRadius: '12px', 
                    fontSize: '0.7rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Move size={12} /> Drag to adjust
                  </div>
                </motion.div>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', cursor: 'pointer' }} onClick={() => fileInputRef.current?.click()}>
              <ImageIcon size={48} style={{ opacity: 0.5, marginBottom: '10px' }} />
              <p>Upload a clear photo of your face</p>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
          <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handlePhotoUpload} />
          <button className="neu-button" style={{ flex: 1 }} onClick={() => fileInputRef.current?.click()}>
            <Upload size={18} /> {userPhoto ? 'Change Photo' : 'Upload'}
          </button>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '15px', fontSize: '1.1rem' }}>Select Style</h3>
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
            {STYLE_OPTIONS.map(style => (
              <button
                key={style.id}
                className={selectedStyle.id === style.id ? 'neu-inset' : 'neu-box'}
                style={{ 
                  padding: '12px 16px', 
                  borderRadius: '12px',
                  whiteSpace: 'nowrap',
                  color: selectedStyle.id === style.id ? 'var(--accent-color)' : 'var(--text-color)',
                }}
                onClick={() => {
                  setSelectedStyle(style)
                  if (userPhoto) setIsProcessed(false)
                }}
              >
                {style.name}
              </button>
            ))}
          </div>
        </div>

        {userPhoto && !isProcessed && (
          <button 
            className="neu-button" 
            style={{ width: '100%', padding: '16px', marginBottom: '20px', color: 'var(--accent-color)' }}
            onClick={handleGenerate}
            disabled={isProcessing}
          >
            {isProcessing ? 'Applying Style...' : <><Wand2 size={18} /> Apply Style</>}
          </button>
        )}
      </div>

      <div style={{ padding: '20px', background: 'var(--bg-color)', zIndex: 10 }}>
        <button 
          className="neu-button neu-button-primary" 
          style={{ width: '100%', padding: '16px', fontSize: '1.1rem', opacity: isProcessed ? 1 : 0.5 }}
          onClick={handleBookNow}
          disabled={!isProcessed}
        >
          <CheckCircle size={20} />
          Book Now (+92 312 6743225)
        </button>
      </div>
    </motion.div>
  )
}
