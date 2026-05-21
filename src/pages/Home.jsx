import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Scissors, UserCheck, Star, Moon, Sun, Download, CheckCircle, ChevronRight, Clock, Award } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePWAInstall } from '../hooks/usePWAInstall'
import { supabase } from '../lib/supabase'

export default function Home({ isDarkMode, toggleTheme }) {
  const navigate = useNavigate()
  const { canInstall, isInstalled, isInstalling, install } = usePWAInstall()
  const [user, setUser] = useState(null)
  const [barbers, setBarbers] = useState([])
  const [services, setServices] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    supabase?.auth.getUser().then(({ data }) => setUser(data?.user || null))
    supabase?.from('barbers').select('*').order('rating', { ascending: false }).limit(3)
      .then(({ data }) => setBarbers(data || []))
    supabase?.from('services').select('*').eq('is_active', true).order('category')
      .then(({ data }) => setServices(data || []))
  }, [])

  const categories = ['all', 'fade', 'haircut', 'beard', 'shave']
  const filteredServices = activeCategory === 'all' ? services : services.filter(s => s.category === activeCategory)

  const userName = user?.user_metadata?.name?.split(' ')[0] || 'Boss'

  return (
    <motion.div className="mobile-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '40px' }}>

      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 20px 0', alignItems: 'center' }}>
        <AnimatePresence>
          {isInstalled ? (
            <motion.div key="installed" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="neu-inset" style={{ padding: '7px 12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#2ecc71' }}>
              <CheckCircle size={13} /> Installed
            </motion.div>
          ) : canInstall ? (
            <motion.button key="install" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="neu-button neu-button-primary" onClick={install} disabled={isInstalling} style={{ padding: '8px 14px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', cursor: 'pointer' }}>
              <Download size={13} /> {isInstalling ? '...' : 'Install App'}
            </motion.button>
          ) : <div />}
        </AnimatePresence>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="neu-box" onClick={toggleTheme} style={{ padding: '8px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            {isDarkMode ? <Sun size={17} color="var(--accent-color)" /> : <Moon size={17} color="var(--accent-color)" />}
          </button>
          <div className="neu-box" style={{ width: '36px', height: '36px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => navigate(user ? '/dashboard' : '/login')}>
            <UserCheck size={17} color="var(--accent-color)" />
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <header style={{ padding: '20px 20px 16px' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0 0 4px' }}>Welcome back,</p>
        <h1 style={{ fontSize: '2rem', margin: 0 }} className="text-gradient">{userName} 👋</h1>
        <p style={{ color: 'var(--text-muted)', margin: '6px 0 0', fontSize: '0.88rem' }}>Premium grooming, your way.</p>
      </header>

      {/* Quick Book Banner */}
      <section style={{ padding: '0 20px 24px' }}>
        <motion.div
          className="neu-box"
          whileTap={{ scale: 0.98 }}
          style={{ borderRadius: '22px', padding: '20px', cursor: 'pointer', background: 'linear-gradient(135deg, rgba(212,175,55,0.18), rgba(212,175,55,0.05))', border: '1px solid rgba(212,175,55,0.25)', display: 'flex', alignItems: 'center', gap: '16px' }}
          onClick={() => navigate('/book')}
        >
          <div className="neu-inset" style={{ width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Scissors size={26} color="var(--accent-color)" />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.05rem', margin: '0 0 4px' }}>Book Appointment</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: 0 }}>Barber choose karein, slot book karein</p>
          </div>
          <ChevronRight size={20} color="var(--accent-color)" />
        </motion.div>
      </section>

      {/* Top Barbers */}
      {barbers.length > 0 && (
        <section style={{ padding: '0 20px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h2 style={{ fontSize: '1.1rem', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Award size={16} color="var(--accent-color)" /> Top Barbers
            </h2>
            <button style={{ color: 'var(--accent-color)', fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer', background: 'none', border: 'none' }} onClick={() => navigate('/barbers')}>
              See All →
            </button>
          </div>
          <div style={{ display: 'flex', gap: '14px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none' }}>
            {barbers.map((barber, i) => (
              <motion.div
                key={barber.id}
                className="neu-box"
                whileTap={{ scale: 0.96 }}
                style={{ borderRadius: '18px', padding: '16px', cursor: 'pointer', flexShrink: 0, width: '140px', textAlign: 'center' }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => navigate('/book', { state: { barberId: barber.id } })}
              >
                <div className="neu-inset" style={{ width: '60px', height: '60px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 10px' }}>
                  {barber.photo_url
                    ? <img src={barber.photo_url} alt={barber.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><UserCheck size={22} color="var(--text-muted)" /></div>
                  }
                </div>
                <p style={{ fontSize: '0.85rem', fontWeight: '700', margin: '0 0 4px' }}>{barber.name.split(' ')[0]}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px' }}>
                  <Star size={11} color="#f39c12" fill="#f39c12" />
                  <span style={{ fontSize: '0.75rem', color: '#f39c12', fontWeight: '700' }}>{barber.rating}</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.65rem', margin: '4px 0 0' }}>{barber.experience_years}yr exp</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Services */}
      <section style={{ padding: '0 20px' }}>
        <h2 style={{ fontSize: '1.1rem', margin: '0 0 14px' }}>Services</h2>

        {/* Category Tabs */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '14px', scrollbarWidth: 'none' }}>
          {categories.map(cat => (
            <button
              key={cat}
              className={activeCategory === cat ? 'neu-inset' : 'neu-box'}
              style={{ padding: '8px 16px', borderRadius: '10px', whiteSpace: 'nowrap', color: activeCategory === cat ? 'var(--accent-color)' : 'var(--text-color)', fontWeight: activeCategory === cat ? '600' : '400', fontSize: '0.8rem', cursor: 'pointer', textTransform: 'capitalize' }}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>

        {/* Service Cards */}
        {services.length === 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[1,2,3,4].map(i => (
              <div key={i} className="neu-box" style={{ borderRadius: '18px', height: '160px', opacity: 0.4 }} />
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {filteredServices.map((svc, i) => (
              <motion.div
                key={svc.id}
                className="neu-box"
                whileTap={{ scale: 0.96 }}
                style={{ borderRadius: '18px', overflow: 'hidden', cursor: 'pointer' }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate('/catalog', { state: { category: svc.category } })}
              >
                <div style={{ height: '110px', overflow: 'hidden' }}>
                  <img src={svc.img_url} alt={svc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />
                </div>
                <div style={{ padding: '10px 12px' }}>
                  <p style={{ fontSize: '0.82rem', fontWeight: '700', margin: '0 0 4px', lineHeight: '1.3' }}>{svc.name}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--accent-color)', fontWeight: '700', fontSize: '0.85rem' }}>Rs. {svc.price}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <Clock size={9} /> {svc.duration_mins}m
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </motion.div>
  )
}
