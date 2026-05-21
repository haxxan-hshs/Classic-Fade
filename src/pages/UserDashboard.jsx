import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Edit2, Camera, Clock, Download, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePWAInstall } from '../hooks/usePWAInstall'

export default function UserDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState({ name: 'Guest User', pic: null })
  const [isEditing, setIsEditing] = useState(false)
  const [history, setHistory] = useState([])
  const fileInputRef = useRef(null)
  const { canInstall, isInstalled, isInstalling, install } = usePWAInstall()

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('userProfile'))
    if (savedUser) setUser(savedUser)
    const savedHistory = JSON.parse(localStorage.getItem('bookingHistory')) || []
    setHistory(savedHistory)
  }, [])

  const saveUser = (newUser) => {
    setUser(newUser)
    localStorage.setItem('userProfile', JSON.stringify(newUser))
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => saveUser({ ...user, pic: reader.result })
      reader.readAsDataURL(file)
    }
  }

  return (
    <motion.div
      className="mobile-container"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      style={{ paddingBottom: '40px' }}
    >
      {/* Header */}
      <header style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button className="neu-button" style={{ padding: '10px' }} onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>
          <h1 style={{ fontSize: '1.4rem', margin: 0 }}>My Profile</h1>
        </div>

        {/* Install Button */}
        <AnimatePresence>
          {isInstalled ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="neu-inset"
              style={{
                padding: '8px 14px', borderRadius: '12px',
                display: 'flex', alignItems: 'center', gap: '7px',
                fontSize: '0.78rem', color: '#2ecc71',
              }}
            >
              <CheckCircle size={14} /> Installed
            </motion.div>
          ) : canInstall ? (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="neu-button neu-button-primary"
              onClick={install}
              disabled={isInstalling}
              style={{
                padding: '10px 16px', borderRadius: '12px',
                display: 'flex', alignItems: 'center', gap: '8px',
                fontSize: '0.85rem', cursor: 'pointer',
              }}
            >
              <Download size={15} />
              {isInstalling ? 'Installing...' : 'Install App'}
            </motion.button>
          ) : null}
        </AnimatePresence>
      </header>

      {/* Profile Pic + Name */}
      <section style={{ padding: '10px 20px 24px', textAlign: 'center' }}>
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '20px' }}>
          <div
            className="neu-inset"
            style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto' }}
          >
            {user.pic ? (
              <img src={user.pic} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                No Image
              </div>
            )}
          </div>
          <button
            className="neu-box"
            style={{ position: 'absolute', bottom: '0', right: '0', padding: '10px', borderRadius: '50%', cursor: 'pointer' }}
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera size={16} color="var(--accent-color)" />
          </button>
          <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handlePhotoUpload} />
        </div>

        {isEditing ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <input
              autoFocus
              className="neu-inset"
              style={{ padding: '10px 15px', color: 'var(--text-color)', fontSize: '1.2rem', textAlign: 'center', width: '200px', borderRadius: '12px', background: 'none' }}
              value={user.name}
              onChange={(e) => saveUser({ ...user, name: e.target.value })}
              onBlur={() => setIsEditing(false)}
              onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
            />
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{user.name}</h2>
            <Edit2 size={16} color="var(--text-muted)" style={{ cursor: 'pointer' }} onClick={() => setIsEditing(true)} />
          </div>
        )}
      </section>

      {/* Install Banner — shown when installable */}
      <AnimatePresence>
        {canInstall && !isInstalled && (
          <motion.section
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{ padding: '0 20px 20px' }}
          >
            <div
              className="neu-box"
              style={{
                padding: '16px 20px', borderRadius: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))',
              }}
            >
              <div>
                <p style={{ fontWeight: '700', fontSize: '0.95rem', margin: 0 }}>📲 App Install Karein</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: '4px 0 0' }}>
                  Home screen pe add karein — fast & offline
                </p>
              </div>
              <button
                className="neu-button neu-button-primary"
                onClick={install}
                disabled={isInstalling}
                style={{ padding: '10px 16px', borderRadius: '12px', fontSize: '0.82rem', flexShrink: 0, marginLeft: '12px' }}
              >
                <Download size={14} />
                {isInstalling ? '...' : 'Install'}
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Booking History */}
      <section style={{ padding: '0 20px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Booking History</h3>
        {history.length === 0 ? (
          <div className="neu-inset" style={{ padding: '30px 20px', borderRadius: '16px', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)' }}>Abhi koi booking nahi ki.</p>
            <button
              className="neu-button"
              style={{ marginTop: '14px', padding: '10px 20px', color: 'var(--accent-color)', fontSize: '0.85rem' }}
              onClick={() => navigate('/catalog')}
            >
              Catalog Dekho
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {history.map((booking, index) => (
              <div key={index} className="neu-box" style={{ padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '16px' }}>
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>{booking.styleName}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} />
                    {new Date(booking.date).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <span style={{ color: 'var(--accent-color)', fontWeight: '700', fontSize: '0.8rem', backgroundColor: 'rgba(212,175,55,0.15)', padding: '4px 10px', borderRadius: '20px' }}>
                  Requested
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </motion.div>
  )
}
