import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, User, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { motion } from 'framer-motion'

// Simple hardcoded credentials — change these as needed
const ADMIN_USERNAME = 'classicfade'
const ADMIN_PASSWORD = 'admin@2025'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      sessionStorage.setItem('adminLoggedIn', 'true')
      navigate('/admin/dashboard')
    } else {
      setError('Username ya password galat hai.')
    }
  }

  return (
    <motion.div
      className="mobile-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
    >
      <header style={{ padding: '20px', display: 'flex', alignItems: 'center' }}>
        <button className="neu-button" style={{ padding: '10px' }} onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
        </button>
      </header>

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        <div
          className="neu-box"
          style={{ width: '100%', maxWidth: '360px', padding: '40px 30px', textAlign: 'center' }}
        >
          {/* Lock Icon */}
          <div
            className="neu-inset"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              margin: '0 auto 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Lock size={32} color="var(--accent-color)" />
          </div>

          <h1 style={{ fontSize: '1.5rem', marginBottom: '6px' }}>Admin Login</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '30px' }}>
            Classic Fade — Sirf Admin ke liye
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Username */}
            <div
              className="neu-inset"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px',
                borderRadius: '14px',
              }}
            >
              <User size={18} color="var(--text-muted)" style={{ marginRight: '12px', flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Username"
                style={{ flex: 1, color: 'var(--text-color)', fontSize: '1rem', background: 'none' }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>

            {/* Password */}
            <div
              className="neu-inset"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px',
                borderRadius: '14px',
              }}
            >
              <Lock size={18} color="var(--text-muted)" style={{ marginRight: '12px', flexShrink: 0 }} />
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Password"
                style={{ flex: 1, color: 'var(--text-color)', fontSize: '1rem', background: 'none' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPass((p) => !p)}
                style={{ cursor: 'pointer', color: 'var(--text-muted)', flexShrink: 0 }}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Error */}
            {error && (
              <p
                style={{
                  color: '#e74c3c',
                  fontSize: '0.85rem',
                  textAlign: 'center',
                  margin: '-6px 0',
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className="neu-button neu-button-primary"
              style={{ marginTop: '6px', padding: '14px', fontSize: '1rem', borderRadius: '14px' }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  )
}
