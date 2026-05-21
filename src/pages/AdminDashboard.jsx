import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LogOut, Clock, Users, MessageCircle, Scissors,
  CheckCircle, XCircle, Camera, Edit2, RefreshCw, Download,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { usePWAInstall } from '../hooks/usePWAInstall'

const WHATSAPP_NUMBER = '923126743225'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [adminProfile, setAdminProfile] = useState({ name: 'Admin', pic: null })
  const [editingName, setEditingName] = useState(false)
  const fileInputRef = useRef(null)

  const { canInstall, isInstalled, isInstalling, install } = usePWAInstall()

  // ── Auth Guard ──
  useEffect(() => {
    if (!sessionStorage.getItem('adminLoggedIn')) {
      navigate('/admin/login')
      return
    }
    // Load admin profile
    const saved = JSON.parse(localStorage.getItem('adminProfile'))
    if (saved) setAdminProfile(saved)

    // Fetch bookings
    fetchBookings()

    // Real-time subscription — only if supabase available
    if (!supabase) return

    const channel = supabase
      .channel('bookings-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bookings' },
        () => { fetchBookings() }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchBookings = async () => {
    setLoading(true)
    if (!supabase) {
      setLoading(false)
      return
    }
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) setBookings(data)
    setLoading(false)
  }

  const updateStatus = async (id, newStatus) => {
    if (!supabase) return
    const { error } = await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', id)

    if (!error) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      )
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn')
    navigate('/admin/login')
  }

  const handleProfilePic = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      const updated = { ...adminProfile, pic: reader.result }
      setAdminProfile(updated)
      localStorage.setItem('adminProfile', JSON.stringify(updated))
    }
    reader.readAsDataURL(file)
  }

  const saveAdminName = (name) => {
    const updated = { ...adminProfile, name }
    setAdminProfile(updated)
    localStorage.setItem('adminProfile', JSON.stringify(updated))
  }

  const openWhatsApp = (booking) => {
    const msg = encodeURIComponent(
      `Assalam o Alaikum! Aapki "${booking.style_name}" ki booking confirm ho gayi hai. Appointment ke liye please contact karein.`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
  }

  // ── Stats ──
  const totalCount = bookings.length
  const pendingCount = bookings.filter((b) => b.status === 'pending').length
  const confirmedCount = bookings.filter((b) => b.status === 'confirmed').length
  const rejectedCount = bookings.filter((b) => b.status === 'rejected').length

  const filteredBookings =
    activeTab === 'all' ? bookings : bookings.filter((b) => b.status === activeTab)

  const formatDate = (iso) =>
    new Date(iso).toLocaleString('en-PK', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })

  const statusStyle = (s) => ({
    pending:   { bg: 'rgba(212,175,55,0.2)',  text: 'var(--accent-color)' },
    confirmed: { bg: 'rgba(46,204,113,0.2)',  text: '#2ecc71' },
    rejected:  { bg: 'rgba(231,76,60,0.2)',   text: '#e74c3c' },
  }[s] || { bg: 'rgba(212,175,55,0.2)', text: 'var(--accent-color)' })

  return (
    <motion.div
      className="mobile-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ paddingBottom: '40px' }}
    >
      {/* ── Header ── */}
      <header style={{ padding: '30px 20px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', margin: 0 }} className="text-gradient">Admin Panel</h1>
          <p style={{ color: 'var(--text-muted)', margin: '4px 0 0', fontSize: '0.82rem' }}>
            Classic Fade — Booking Manager
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {/* Install Button */}
          <AnimatePresence>
            {isInstalled ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="neu-inset"
                style={{ padding: '8px 12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: '#2ecc71' }}
              >
                <CheckCircle size={13} /> Installed
              </motion.div>
            ) : canInstall ? (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="neu-box"
                onClick={install}
                disabled={isInstalling}
                style={{ padding: '8px 12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', cursor: 'pointer', color: 'var(--accent-color)' }}
              >
                <Download size={13} color="var(--accent-color)" />
                {isInstalling ? 'Installing...' : 'Install'}
              </motion.button>
            ) : null}
          </AnimatePresence>

          <button
            className="neu-box"
            style={{ width: '42px', height: '42px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            onClick={fetchBookings}
            title="Refresh"
          >
            <RefreshCw size={16} color="var(--accent-color)" />
          </button>
          <button
            className="neu-box"
            style={{ width: '42px', height: '42px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            onClick={handleLogout}
          >
            <LogOut size={16} color="var(--text-color)" />
          </button>
        </div>
      </header>

      {/* ── Admin Profile ── */}
      <section style={{ padding: '0 20px 24px' }}>
        <div className="neu-box" style={{ borderRadius: '20px', padding: '18px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Pic */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div
              className="neu-inset"
              style={{ width: '68px', height: '68px', borderRadius: '50%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {adminProfile.pic ? (
                <img src={adminProfile.pic} alt="Admin" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <Users size={26} color="var(--text-muted)" />
              )}
            </div>
            <button
              className="neu-box"
              style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera size={12} color="var(--accent-color)" />
            </button>
            <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleProfilePic} />
          </div>

          {/* Name */}
          <div style={{ flex: 1 }}>
            {editingName ? (
              <input
                autoFocus
                className="neu-inset"
                style={{ padding: '7px 12px', borderRadius: '10px', color: 'var(--text-color)', fontSize: '1rem', width: '100%', background: 'none' }}
                value={adminProfile.name}
                onChange={(e) => saveAdminName(e.target.value)}
                onBlur={() => setEditingName(false)}
                onKeyDown={(e) => e.key === 'Enter' && setEditingName(false)}
              />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.05rem', fontWeight: '700' }}>{adminProfile.name}</span>
                <Edit2 size={13} color="var(--text-muted)" style={{ cursor: 'pointer' }} onClick={() => setEditingName(true)} />
              </div>
            )}
            <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', marginTop: '3px' }}>Classic Fade Administrator</p>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ padding: '0 20px 22px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px' }}>
          {[
            { label: 'Total',    value: totalCount,     color: 'var(--accent-color)', bg: 'rgba(212,175,55,0.12)', icon: <Scissors size={15} color="var(--accent-color)" /> },
            { label: 'Pending',  value: pendingCount,   color: 'var(--accent-color)', bg: 'rgba(212,175,55,0.12)', icon: <Clock size={15} color="var(--accent-color)" /> },
            { label: 'Done',     value: confirmedCount, color: '#2ecc71',             bg: 'rgba(46,204,113,0.12)', icon: <CheckCircle size={15} color="#2ecc71" /> },
            { label: 'Rejected', value: rejectedCount,  color: '#e74c3c',             bg: 'rgba(231,76,60,0.12)',  icon: <XCircle size={15} color="#e74c3c" /> },
          ].map((s) => (
            <div key={s.label} className="neu-inset" style={{ padding: '12px 6px', borderRadius: '14px', textAlign: 'center' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '8px', backgroundColor: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px' }}>
                {s.icon}
              </div>
              <h2 style={{ fontSize: '1.4rem', margin: 0, color: s.color }}>{s.value}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.62rem', margin: '2px 0 0' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Filter Tabs ── */}
      <section style={{ padding: '0 20px 16px' }}>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {['all', 'pending', 'confirmed', 'rejected'].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? 'neu-inset' : 'neu-box'}
              style={{
                padding: '8px 16px', borderRadius: '10px', whiteSpace: 'nowrap',
                color: activeTab === tab ? 'var(--accent-color)' : 'var(--text-color)',
                fontWeight: activeTab === tab ? '600' : '400',
                fontSize: '0.82rem', cursor: 'pointer', textTransform: 'capitalize',
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'all' ? 'All' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'pending' && pendingCount > 0 && (
                <span style={{ marginLeft: '5px', backgroundColor: 'var(--accent-color)', color: 'var(--bg-color)', fontSize: '0.6rem', padding: '1px 5px', borderRadius: '20px', fontWeight: '700' }}>
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* ── Bookings List ── */}
      <section style={{ padding: '0 20px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px 0' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid var(--accent-color)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto' }} />
            <p style={{ color: 'var(--text-muted)', marginTop: '16px', fontSize: '0.9rem' }}>Loading bookings...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="neu-inset" style={{ padding: '40px 20px', borderRadius: '20px', textAlign: 'center' }}>
            <Scissors size={36} color="var(--text-muted)" style={{ opacity: 0.3, marginBottom: '12px' }} />
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {activeTab === 'all' ? 'Abhi koi booking nahi aayi.' : `Koi ${activeTab} booking nahi.`}
            </p>
          </div>
        ) : (
          <AnimatePresence>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredBookings.map((booking) => {
                const sc = statusStyle(booking.status)
                return (
                  <motion.div
                    key={booking.id}
                    className="neu-box"
                    style={{ borderRadius: '20px', overflow: 'hidden' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    {/* Style Image */}
                    {booking.style_img && (
                      <div style={{ height: '150px', overflow: 'hidden' }}>
                        <img src={booking.style_img} alt={booking.style_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}

                    <div style={{ padding: '16px' }}>
                      {/* Name + Badge */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <h3 style={{ fontSize: '1rem', margin: 0, flex: 1, paddingRight: '10px' }}>{booking.style_name}</h3>
                        <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '0.62rem', fontWeight: '700', flexShrink: 0, backgroundColor: sc.bg, color: sc.text }}>
                          {booking.status.toUpperCase()}
                        </span>
                      </div>

                      {/* Date */}
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '14px' }}>
                        <Clock size={11} />
                        {formatDate(booking.created_at)}
                      </p>

                      {/* Buttons */}
                      {booking.status === 'pending' ? (
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            className="neu-button"
                            style={{ flex: 1, padding: '10px', color: '#2ecc71', fontSize: '0.82rem', borderRadius: '12px' }}
                            onClick={() => updateStatus(booking.id, 'confirmed')}
                          >
                            <CheckCircle size={15} /> Accept
                          </button>
                          <button
                            className="neu-button"
                            style={{ flex: 1, padding: '10px', color: '#e74c3c', fontSize: '0.82rem', borderRadius: '12px' }}
                            onClick={() => updateStatus(booking.id, 'rejected')}
                          >
                            <XCircle size={15} /> Reject
                          </button>
                          <button
                            className="neu-button"
                            style={{ padding: '10px 13px', color: '#25D366', borderRadius: '12px' }}
                            onClick={() => openWhatsApp(booking)}
                          >
                            <MessageCircle size={15} />
                          </button>
                        </div>
                      ) : (
                        <button
                          className="neu-button"
                          style={{ width: '100%', padding: '10px', color: '#25D366', fontSize: '0.82rem', borderRadius: '12px' }}
                          onClick={() => openWhatsApp(booking)}
                        >
                          <MessageCircle size={15} /> WhatsApp pe Reply
                        </button>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </AnimatePresence>
        )}
      </section>
    </motion.div>
  )
}
