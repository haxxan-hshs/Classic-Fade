import { useNavigate } from 'react-router-dom'
import { Scissors, Sparkles, UserCheck, Star, Moon, Sun, Download, CheckCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePWAInstall } from '../hooks/usePWAInstall'

const CATEGORIES = [
  { id: 'fade',    name: 'Classic Fades',     icon: Scissors,  desc: 'Skin fades, tapers & bursts' },
  { id: 'haircut', name: 'Modern Cuts',        icon: Star,      desc: 'Quiffs, crops & pompadours' },
  { id: 'beard',   name: 'Beard Styling',      icon: UserCheck, desc: 'Trims, Khat & sharp edges' },
  { id: 'shave',   name: 'Hot Towel Shaves',   icon: Sparkles,  desc: 'Straight razor perfection' },
]

export default function Home({ isDarkMode, toggleTheme }) {
  const navigate = useNavigate()
  const { canInstall, isInstalled, isInstalling, install } = usePWAInstall()

  return (
    <motion.div
      className="mobile-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ paddingBottom: '40px' }}
    >
      {/* Top Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 20px 0', alignItems: 'center' }}>

        {/* Install Button */}
        <AnimatePresence>
          {isInstalled ? (
            <motion.div
              key="installed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="neu-inset"
              style={{ padding: '8px 14px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '7px', fontSize: '0.78rem', color: '#2ecc71' }}
            >
              <CheckCircle size={14} /> App Installed
            </motion.div>
          ) : canInstall ? (
            <motion.button
              key="install-btn"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="neu-button neu-button-primary"
              onClick={install}
              disabled={isInstalling}
              style={{ padding: '9px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '7px', fontSize: '0.82rem', cursor: 'pointer' }}
            >
              <Download size={15} />
              {isInstalling ? 'Installing...' : 'Install App'}
            </motion.button>
          ) : (
            <div style={{ width: '10px' }} />
          )}
        </AnimatePresence>

        {/* Theme Toggle */}
        <button
          className="neu-box"
          onClick={toggleTheme}
          style={{ padding: '8px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          {isDarkMode ? <Sun size={18} color="var(--accent-color)" /> : <Moon size={18} color="var(--accent-color)" />}
        </button>
      </div>

      {/* Header */}
      <header style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', margin: 0 }} className="text-gradient">Classic Fade</h1>
          <p style={{ color: 'var(--text-muted)', margin: '4px 0 0', fontSize: '0.9rem' }}>Welcome back, boss.</p>
        </div>
        <div
          className="neu-box"
          style={{ width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', cursor: 'pointer' }}
          onClick={() => navigate('/user-dashboard')}
        >
          <UserCheck size={20} color="var(--accent-color)" />
        </div>
      </header>

      {/* Install Banner — shown when installable */}
      <AnimatePresence>
        {canInstall && !isInstalled && (
          <motion.section
            key="install-banner"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{ padding: '0 20px 20px' }}
          >
            <div
              className="neu-box"
              style={{
                padding: '16px 20px', borderRadius: '18px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.04))',
                border: '1px solid rgba(212,175,55,0.2)',
              }}
            >
              <div>
                <p style={{ fontWeight: '700', fontSize: '0.95rem', margin: 0 }}>📲 App Install Karein</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: '3px 0 0' }}>
                  Home screen pe add karein — fast & offline
                </p>
              </div>
              <button
                className="neu-button neu-button-primary"
                onClick={install}
                disabled={isInstalling}
                style={{ padding: '10px 16px', borderRadius: '12px', fontSize: '0.82rem', flexShrink: 0, marginLeft: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Download size={14} />
                {isInstalling ? '...' : 'Install'}
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Categories */}
      <section style={{ padding: '0 20px 40px' }}>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>Browse Styles Catalog</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon
            return (
              <motion.div
                key={cat.id}
                className="neu-box"
                style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }}
                onClick={() => navigate('/catalog', { state: { category: cat.id } })}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className="neu-inset"
                  style={{ width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}
                >
                  <Icon size={24} color="var(--accent-color)" />
                </div>
                <h3 style={{ fontSize: '1rem', marginBottom: '6px' }}>{cat.name}</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cat.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>
    </motion.div>
  )
}
