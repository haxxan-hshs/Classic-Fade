import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Edit2, Camera, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

export default function UserDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState({ name: 'Guest User', pic: null })
  const [isEditing, setIsEditing] = useState(false)
  const [history, setHistory] = useState([])
  const fileInputRef = useRef(null)

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
      reader.onloadend = () => {
        saveUser({ ...user, pic: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <motion.div 
      className="mobile-container"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
    >
      <header style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button className="neu-button" style={{ padding: '10px' }} onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1 style={{ fontSize: '1.4rem', margin: 0 }}>My Profile</h1>
      </header>

      <section style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '20px' }}>
          <div 
            className="neu-inset"
            style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto' }}
          >
            {user.pic ? (
              <img src={user.pic} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
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
              style={{ padding: '10px 15px', color: 'var(--text-color)', fontSize: '1.2rem', textAlign: 'center', width: '200px', borderRadius: '12px' }}
              value={user.name}
              onChange={(e) => saveUser({ ...user, name: e.target.value })}
              onBlur={() => setIsEditing(false)}
            />
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{user.name}</h2>
            <Edit2 size={16} color="var(--text-muted)" style={{ cursor: 'pointer' }} onClick={() => setIsEditing(true)} />
          </div>
        )}
      </section>

      <section style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Booking History</h3>
        {history.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>No bookings yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {history.map((booking, index) => (
              <div key={index} className="neu-box" style={{ padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{booking.styleName}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'flex', alignItems: 'center' }}>
                    <Clock size={12} style={{ marginRight: '4px' }} />
                    {new Date(booking.date).toLocaleDateString()}
                  </p>
                </div>
                <div style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>Requested</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </motion.div>
  )
}
