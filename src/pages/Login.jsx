import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Scissors } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    if (!supabase) {
      // Demo mode - allow any login when supabase is not configured
      setLoading(false)
      navigate('/')
      return
    }
    
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError('Email ya password galat hai.')
    } else {
      navigate('/')
    }
  }

  return (
    <motion.div
      className="mobile-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <header style={{ padding: '20px' }}>
        <button className="neu-button" style={{ padding: '10px' }} onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
        </button>
      </header>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{ textAlign: 'center', marginBottom: '36px' }}
        >
          <div className="neu-inset" style={{ width: '80px', height: '80px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Scissors size={36} color="var(--accent-color)" />
          </div>
          <h1 style={{ fontSize: '1.8rem', margin: 0 }} className="text-gradient">Classic Fade</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>Login karein apne account mein</p>
        </motion.div>

        <div className="neu-box" style={{ width: '100%', maxWidth: '380px', padding: '32px 28px', borderRadius: '24px' }}>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Email */}
            <div className="neu-inset" style={{ display: 'flex', alignItems: 'center', padding: '13px 16px', borderRadius: '14px' }}>
              <Mail size={18} color="var(--text-muted)" style={{ marginRight: '12px', flexShrink: 0 }} />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ flex: 1, color: 'var(--text-color)', fontSize: '0.95rem', background: 'none' }}
              />
            </div>

            {/* Password */}
            <div className="neu-inset" style={{ display: 'flex', alignItems: 'center', padding: '13px 16px', borderRadius: '14px' }}>
              <Lock size={18} color="var(--text-muted)" style={{ marginRight: '12px', flexShrink: 0 }} />
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ flex: 1, color: 'var(--text-color)', fontSize: '0.95rem', background: 'none' }}
              />
              <button type="button" onClick={() => setShowPass(p => !p)} style={{ cursor: 'pointer', color: 'var(--text-muted)' }}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && <p style={{ color: '#e74c3c', fontSize: '0.85rem', textAlign: 'center', margin: 0 }}>{error}</p>}

            <button
              type="submit"
              className="neu-button neu-button-primary"
              disabled={loading}
              style={{ padding: '14px', fontSize: '1rem', borderRadius: '14px', marginTop: '4px', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '20px' }}>
            Account nahi hai?{' '}
            <Link to="/signup" style={{ color: 'var(--accent-color)', fontWeight: '600' }}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  )
}
