import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Edit2, Camera, Clock, LogOut, Scissors, Download, CheckCircle, Calendar } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { usePWAInstall } from '../hooks/usePWAInstall'
import { format } from 'date-fns'

export default function UserDashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState({ name: 'Guest User', pic: null })
  const [isEditing, setIsEditing] = useState(false)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const fileInputRef = useRef(null)
  const { canInstall, isInstalled, isInstalling, install } = usePWAInstall()

  useEffect(() => {
    supabase?.auth.getUser().then(({ data }) => {
      const u = data?.user
      setUser(u)
      if (u) {
        setProfile({ name: u.user_metadata?.name || 'User', pic: u.user_metadata?.avatar_url || null })
        loadBookings(u.id)
      } else {
        // Guest — load from localStorage
        const saved = JSON.parse(localStorage.getItem('userProfile'))
        if (saved) setProfile(saved)
        const hist = JSON.parse(localStorage.getItem('bookingHistory')) || []
        setBookings(hist.map((h, i) => ({ id: i, service_name: h.styleName, created_at: h.date, status: 'requested' })))
        setLoading(false)
      }
    })
  }, [])

  const loadBookings = async (userId) => {
    const { data } = await supabase.from('bookings').select('*').eq('user_id', userId).order('created_at', { ascending: false })
    setBookings(data || [])
    setLoading(false)
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      const updated = { ...profile, pic: reader.result }
      setProfile(updated)
      localStorage.setItem('userProfile', JSON.stringify(updated))
    }
    reader.readAsDataURL(file)
  }

  const handleLogout = async () => {
    await supabase?.auth.signOut()
    navigate('/')
  }

  const statusColor = (s) => ({
    pending: { bg: 'rgba(212,175,55,0.2)', text: 'var(--accent-color)' },
    confirmed: { bg: 'rgba(46,204,113,0.2)', text: '#2ecc71' },
    rejected: { bg: 'rgba(231,76,60,0.2)', text: '#e74c3c' },
    completed: { bg: 'rgba(52,152,219,0.2)', text: '#3498db' },
    requested: { bg: 'rgba(212,175,55,0.2)', text: 'var(--accent-color)' },
  }[s] || { bg: 'rgba(212,175,55,0.2)', text: 'var(--accent-color)' })

  return (
    <motion.div className="mobile-container" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} style={{ paddingBottom: '40px' }}>
      {/* Header */}
      <header style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button className="neu-button" style={{ padding: '10px' }} onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>
          <h1 style={{ fontSize: '1.3rem', margin: 0 }}>My Profile</h1>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <AnimatePresence>
            {isInstalled ? (
              <motion.div key="inst" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="neu-inset" style={{ padding: '7px 12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.72rem', color: '#2ecc71' }}>
                <CheckCircle size={12} /> Installed
              </motion.div>
            ) : canInstall ? (
              <motion.button key="install" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="neu-button neu-button-primary" onClick={install} disabled={isInstalling} style={{ padding: '8px 12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', cursor: 'pointer' }}>
                <Download size={13} /> {isInstalling ? '...' : 'Install'}
              </motion.button>
            ) : null}
          </AnimatePresence>
          {user && (
            <button className="neu-box" style={{ width: '36px', height: '36px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={handleLogout}>
              <LogOut size={16} color="var(--text-muted)" />
            </button>
          )}
        </div>
      </header>

      {/* Profile Section */}
      <section style={{ padding: '10px 20px 24px', textAlign: 'center' }}>
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '16px' }}>
          <div className="neu-inset" style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto' }}>
            {profile.pic
              ? <img src={profile.pic} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.75rem' }}>No Photo</div>
            }
          </div>
          <button className="neu-box" style={{ position: 'absolute', bottom: '0', right: '0', padding: '8px', borderRadius: '50%', cursor: 'pointer' }} onClick={() => fileInputRef.current?.click()}>
            <Camera size={14} color="var(--accent-color)" />
          </button>
          <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handlePhotoUpload} />
        </div>

        {isEditing ? (
          <input autoFocus className="neu-inset" style={{ padding: '8px 14px', borderRadius: '12px', color: 'var(--text-color)', fontSize: '1.1rem', textAlign: 'center', width: '200px', background: 'none' }}
            value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
            onBlur={() => { setIsEditing(false); localStorage.setItem('userProfile', JSON.stringify(profile)) }}
            onKeyDown={e => e.key === 'Enter' && setIsEditing(false)}
          />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '1.4rem', margin: 0 }}>{profile.name}</h2>
            <Edit2 size={15} color="var(--text-muted)" style={{ cursor: 'pointer' }} onClick={() => setIsEditing(true)} />
          </div>
        )}
        {user?.email && <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>{user.email}</p>}

        {!user && (
          <div style={{ marginTop: '16px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button className="neu-button neu-button-primary" style={{ padding: '10px 20px', borderRadius: '12px', fontSize: '0.85rem' }} onClick={() => navigate('/login')}>Login</button>
            <button className="neu-button" style={{ padding: '10px 20px', borderRadius: '12px', fontSize: '0.85rem' }} onClick={() => navigate('/signup')}>Sign Up</button>
          </div>
        )}
      </section>

      {/* Quick Actions */}
      <section style={{ padding: '0 20px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <button className="neu-box" style={{ padding: '16px', borderRadius: '16px', cursor: 'pointer', textAlign: 'center' }} onClick={() => navigate('/book')}>
            <Scissors size={22} color="var(--accent-color)" style={{ marginBottom: '6px' }} />
            <p style={{ fontSize: '0.82rem', fontWeight: '600', margin: 0 }}>Book Now</p>
          </button>
          <button className="neu-box" style={{ padding: '16px', borderRadius: '16px', cursor: 'pointer', textAlign: 'center' }} onClick={() => navigate('/barbers')}>
            <Calendar size={22} color="var(--accent-color)" style={{ marginBottom: '6px' }} />
            <p style={{ fontSize: '0.82rem', fontWeight: '600', margin: 0 }}>Our Barbers</p>
          </button>
        </div>
      </section>

      {/* Booking History */}
      <section style={{ padding: '0 20px' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Clock size={16} color="var(--accent-color)" /> Booking History
        </h3>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <div style={{ width: '32px', height: '32px', border: '3px solid var(--accent-color)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto' }} />
          </div>
        ) : bookings.length === 0 ? (
          <div className="neu-inset" style={{ padding: '30px 20px', borderRadius: '16px', textAlign: 'center' }}>
            <Scissors size={32} color="var(--text-muted)" style={{ opacity: 0.3, marginBottom: '10px' }} />
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Abhi koi booking nahi ki.</p>
            <button className="neu-button" style={{ marginTop: '12px', padding: '10px 20px', color: 'var(--accent-color)', fontSize: '0.82rem' }} onClick={() => navigate('/book')}>
              Pehli Booking Karein
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {bookings.map((b) => {
              const sc = statusColor(b.status)
              return (
                <div key={b.id} className="neu-box" style={{ padding: '14px 16px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.95rem', margin: '0 0 4px' }}>{b.service_name}</h4>
                    {b.barber_name && <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: '0 0 4px' }}>💈 {b.barber_name}</p>}
                    {b.slot_date && b.slot_time && (
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={10} /> {b.slot_date} · {b.slot_time}
                      </p>
                    )}
                    {!b.slot_date && (
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={10} /> {format(new Date(b.created_at), 'dd MMM yyyy')}
                      </p>
                    )}
                  </div>
                  <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '0.62rem', fontWeight: '700', backgroundColor: sc.bg, color: sc.text, flexShrink: 0, marginLeft: '10px' }}>
                    {b.status?.toUpperCase()}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </motion.div>
  )
}
