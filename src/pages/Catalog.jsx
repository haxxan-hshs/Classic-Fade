import { useState, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Search, Clock, MessageCircle, Sparkles, X, SlidersHorizontal } from 'lucide-react'
import { ALL_SERVICES, CATEGORIES, FILTER_TAGS, FACE_SHAPES, AI_RECOMMENDATIONS } from '../data/services'

const WHATSAPP = '923126743225'

// ── Service Card ──
function ServiceCard({ svc, onBook, onWhatsApp, index }) {
  const [imgError, setImgError] = useState(false)

  const badgeColor = (badge) => {
    if (badge.includes('👑') || badge.includes('Luxury') || badge.includes('Royal') || badge.includes('VIP')) return { bg: 'rgba(212,175,55,0.25)', color: '#d4af37' }
    if (badge.includes('🔥') || badge.includes('Viral')) return { bg: 'rgba(231,76,60,0.2)', color: '#e74c3c' }
    if (badge.includes('⭐') || badge.includes('Popular')) return { bg: 'rgba(52,152,219,0.2)', color: '#3498db' }
    if (badge.includes('💰') || badge.includes('Budget')) return { bg: 'rgba(46,204,113,0.2)', color: '#2ecc71' }
    if (badge.includes('🧒')) return { bg: 'rgba(155,89,182,0.2)', color: '#9b59b6' }
    return { bg: 'rgba(212,175,55,0.15)', color: 'var(--accent-color)' }
  }

  const bc = badgeColor(svc.badge)

  return (
    <motion.div
      className="neu-box"
      style={{ borderRadius: '22px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.4) }}
      whileHover={{ y: -2 }}
      layout
    >
      {/* Image */}
      <div style={{ height: '200px', position: 'relative', overflow: 'hidden', backgroundColor: '#1a1a24' }}>
        {!imgError ? (
          <img
            src={svc.img}
            alt={svc.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #1a1a24, #242432)' }}>
            <span style={{ fontSize: '3rem' }}>✂️</span>
          </div>
        )}
        {/* Badge */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: bc.bg, color: bc.color, fontSize: '0.62rem', fontWeight: '700', padding: '4px 10px', borderRadius: '20px', backdropFilter: 'blur(8px)', border: `1px solid ${bc.color}40` }}>
          {svc.badge}
        </div>
        {/* Time */}
        {svc.time > 0 && (
          <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(26,26,36,0.85)', color: 'var(--text-muted)', fontSize: '0.62rem', padding: '4px 8px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '3px', backdropFilter: 'blur(8px)' }}>
            <Clock size={10} /> {svc.time}m
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1rem', margin: '0 0 6px', fontWeight: '700' }}>{svc.name}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: '0 0 12px', lineHeight: '1.5', flex: 1 }}>{svc.desc}</p>

        {/* Face Shapes & Time */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {svc.faceShapes.slice(0, 3).map(f => (
              <span key={f} style={{ fontSize: '0.58rem', backgroundColor: 'rgba(136,136,153,0.15)', color: 'var(--text-muted)', padding: '2px 6px', borderRadius: '8px' }}>{f}</span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="neu-button neu-button-primary"
            style={{ flex: 1, padding: '11px', fontSize: '0.82rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            onClick={() => onBook(svc)}
          >
            <Sparkles size={14} /> Book Now
          </button>
          <button
            className="neu-button"
            style={{ padding: '11px 13px', borderRadius: '12px', color: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => onWhatsApp(svc)}
            title="WhatsApp"
          >
            <MessageCircle size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ── AI Recommendation Banner ──
function AIBanner({ faceShape, onClose }) {
  const rec = AI_RECOMMENDATIONS[faceShape]
  if (!rec) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      style={{ margin: '0 20px 20px', padding: '16px', borderRadius: '18px', background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))', border: '1px solid rgba(212,175,55,0.3)', position: 'relative' }}
    >
      <button onClick={onClose} style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', color: 'var(--text-muted)' }}>
        <X size={14} />
      </button>
      <p style={{ fontSize: '0.7rem', color: 'var(--accent-color)', fontWeight: '700', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>✨ AI Recommendation</p>
      <p style={{ fontSize: '0.82rem', color: 'var(--text-color)', margin: '0 0 8px', lineHeight: '1.4' }}>{rec.tip}</p>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {rec.styles.slice(0, 4).map(id => {
          const svc = ALL_SERVICES.find(s => s.id === id)
          return svc ? (
            <span key={id} style={{ fontSize: '0.68rem', backgroundColor: 'rgba(212,175,55,0.2)', color: 'var(--accent-color)', padding: '3px 8px', borderRadius: '20px', fontWeight: '600' }}>
              {svc.name}
            </span>
          ) : null
        })}
      </div>
    </motion.div>
  )
}

// ── Main Catalog ──
export default function Catalog() {
  const navigate = useNavigate()
  const location = useLocation()

  const initCat = location.state?.category || 'all'
  const [activeCategory, setActiveCategory] = useState(initCat)
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeFace, setActiveFace] = useState('all')
  const [search, setSearch] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [showAI, setShowAI] = useState(activeFace !== 'all')

  const filtered = useMemo(() => {
    let list = ALL_SERVICES
    if (activeCategory !== 'all') list = list.filter(s => s.category === activeCategory)
    if (activeFilter !== 'all') list = list.filter(s => s.tags.includes(activeFilter))
    if (activeFace !== 'all') list = list.filter(s => s.faceShapes.includes(activeFace))
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(s => s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q))
    }
    return list
  }, [activeCategory, activeFilter, activeFace, search])

  const handleBook = (svc) => navigate('/book', { state: { serviceId: svc.id, serviceName: svc.name } })

  const handleWhatsApp = (svc) => {
    const msg = encodeURIComponent(`Assalam o Alaikum Classic Fade! Main "${svc.name}" (Rs. ${svc.price}) ki booking karna chahta hoon.`)
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank')
  }

  const handleFaceChange = (face) => {
    setActiveFace(face)
    setShowAI(face !== 'all')
  }

  return (
    <motion.div
      className="mobile-container"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      {/* Header */}
      <header style={{ padding: '20px 20px 14px', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        <button className="neu-button" style={{ padding: '10px' }} onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '1.3rem', margin: 0 }}>Services</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', margin: '2px 0 0' }}>{ALL_SERVICES.length} premium services</p>
        </div>
        <button
          className={showFilters ? 'neu-inset' : 'neu-box'}
          style={{ padding: '10px', borderRadius: '12px', cursor: 'pointer', color: showFilters ? 'var(--accent-color)' : 'var(--text-color)', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem' }}
          onClick={() => setShowFilters(f => !f)}
        >
          <SlidersHorizontal size={16} /> Filter
        </button>
      </header>

      {/* Search */}
      <div style={{ padding: '0 20px 14px', flexShrink: 0 }}>
        <div className="neu-inset" style={{ display: 'flex', alignItems: 'center', padding: '11px 16px', borderRadius: '14px' }}>
          <Search size={16} color="var(--text-muted)" style={{ marginRight: '10px', flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, color: 'var(--text-color)', fontSize: '0.9rem', background: 'none' }}
          />
          {search && <button onClick={() => setSearch('')} style={{ cursor: 'pointer', color: 'var(--text-muted)' }}><X size={14} /></button>}
        </div>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden', flexShrink: 0 }}
          >
            <div style={{ padding: '0 20px 14px' }}>
              <div className="neu-box" style={{ borderRadius: '18px', padding: '16px' }}>
                {/* Filter by tag */}
                <p style={{ fontSize: '0.72rem', color: 'var(--accent-color)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 10px' }}>Filter By</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                  {FILTER_TAGS.map(f => (
                    <button key={f.id} className={activeFilter === f.id ? 'neu-inset' : 'neu-box'} style={{ padding: '7px 14px', borderRadius: '10px', fontSize: '0.75rem', cursor: 'pointer', color: activeFilter === f.id ? 'var(--accent-color)' : 'var(--text-color)', fontWeight: activeFilter === f.id ? '700' : '400' }} onClick={() => setActiveFilter(f.id)}>
                      {f.label}
                    </button>
                  ))}
                </div>
                {/* Face shape */}
                <p style={{ fontSize: '0.72rem', color: 'var(--accent-color)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 10px' }}>Face Shape (AI)</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {FACE_SHAPES.map(f => (
                    <button key={f.id} className={activeFace === f.id ? 'neu-inset' : 'neu-box'} style={{ padding: '7px 14px', borderRadius: '10px', fontSize: '0.75rem', cursor: 'pointer', color: activeFace === f.id ? 'var(--accent-color)' : 'var(--text-color)', fontWeight: activeFace === f.id ? '700' : '400' }} onClick={() => handleFaceChange(f.id)}>
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Tabs */}
      <div style={{ padding: '0 20px 14px', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px', scrollbarWidth: 'none' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={activeCategory === cat.id ? 'neu-inset' : 'neu-box'}
              style={{ padding: '9px 16px', borderRadius: '12px', whiteSpace: 'nowrap', color: activeCategory === cat.id ? 'var(--accent-color)' : 'var(--text-color)', fontWeight: activeCategory === cat.id ? '700' : '400', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span>{cat.emoji}</span> {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* AI Banner */}
      <AnimatePresence>
        {showAI && activeFace !== 'all' && (
          <AIBanner faceShape={activeFace} onClose={() => setShowAI(false)} />
        )}
      </AnimatePresence>

      {/* Results count */}
      <div style={{ padding: '0 20px 12px', flexShrink: 0 }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: 0 }}>
          {filtered.length} service{filtered.length !== 1 ? 's' : ''} found
          {search && ` for "${search}"`}
        </p>
      </div>

      {/* Services Grid */}
      <div style={{ flex: 1, padding: '0 20px 30px', overflowY: 'auto' }}>
        {filtered.length === 0 ? (
          <div className="neu-inset" style={{ padding: '50px 20px', borderRadius: '20px', textAlign: 'center' }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '12px' }}>✂️</span>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Koi service nahi mili.</p>
            <button className="neu-button" style={{ marginTop: '14px', padding: '10px 20px', color: 'var(--accent-color)', fontSize: '0.82rem' }} onClick={() => { setSearch(''); setActiveCategory('all'); setActiveFilter('all'); setActiveFace('all') }}>
              Reset Filters
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
            <AnimatePresence>
              {filtered.map((svc, i) => (
                <ServiceCard key={svc.id} svc={svc} index={i} onBook={handleBook} onWhatsApp={handleWhatsApp} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  )
}
