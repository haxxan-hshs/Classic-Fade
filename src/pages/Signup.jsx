import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, User, Phone, ArrowLeft, Scissors } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSignup = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password.length < 6) { setError('Password kam az kam 6 characters ka hona chahiye.'); return }
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { name: form.name, phone: form.phone }
      }
    })
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
      setTimeout(() => navigate('/login'), 3000)
    }
  }

  if (success) {
    return (
      <div className="mobile-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>✅</div>
          <h2 style={{ color: 'var(--accent-color)', marginBottom: '8px' }}>Account Ban Gaya!</h2>
          <p style={{ color: 'var(--text-muted)' }}>Email verify karein phir login karein.</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '8px' }}>Login page par ja rahe hain...</p>
        </div>
      </div>
    )
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
        <button className="neu-button" style={{ padding: '10px' }} onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
      </header>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ textAlign: 'center', marginBottom: '28px' }}
        >
          <div className="neu-inset" style={{ width: '70px', height: '70px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
            <Scissors size={30} color="var(--accent-color)" />
          </div>
          <h1 style={{ fontSize: '1.6rem', margin: 0 }} className="text-gradient">Create Account</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '4px' }}>Classic Fade mein khush aamdeed</p>
        </motion.div>

        <div className="neu-box" style={{ width: '100%', maxWidth: '380px', padding: '28px 24px', borderRadius: '24px' }}>
          <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="neu-inset" style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderRadius: '14px' }}>
              <User size={17} color="var(--text-muted)" style={{ marginRight: '12px', flexShrink: 0 }} />
              <input type="text" placeholder="Apna naam" value={form.name} onChange={set('name')} required style={{ flex: 1, color: 'var(--text-color)', fontSize: '0.95rem', background: 'none' }} />
            </div>

            <div className="neu-inset" style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderRadius: '14px' }}>
              <Phone size={17} color="var(--text-muted)" style={{ marginRight: '12px', flexShrink: 0 }} />
              <input type="tel" placeholder="Phone number (03xx-xxxxxxx)" value={form.phone} onChange={set('phone')} required style={{ flex: 1, color: 'var(--text-color)', fontSize: '0.95rem', background: 'none' }} />
            </div>

            <div className="neu-inset" style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderRadius: '14px' }}>
              <Mail size={17} color="var(--text-muted)" style={{ marginRight: '12px', flexShrink: 0 }} />
              <input type="email" placeholder="Email address" value={form.email} onChange={set('email')} required style={{ flex: 1, color: 'var(--text-color)', fontSize: '0.95rem', background: 'none' }} />
            </div>

            <div className="neu-inset" style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderRadius: '14px' }}>
              <Lock size={17} color="var(--text-muted)" style={{ marginRight: '12px', flexShrink: 0 }} />
              <input type={showPass ? 'text' : 'password'} placeholder="Password (min 6 chars)" value={form.password} onChange={set('password')} required style={{ flex: 1, color: 'var(--text-color)', fontSize: '0.95rem', background: 'none' }} />
              <button type="button" onClick={() => setShowPass(p => !p)} style={{ cursor: 'pointer', color: 'var(--text-muted)' }}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && <p style={{ color: '#e74c3c', fontSize: '0.82rem', textAlign: 'center', margin: 0 }}>{error}</p>}

            <button type="submit" className="neu-button neu-button-primary" disabled={loading} style={{ padding: '14px', fontSize: '1rem', borderRadius: '14px', marginTop: '4px', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Creating...' : 'Account Banayein'}
            </button>
          </form>

          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '18px' }}>
            Pehle se account hai?{' '}
            <Link to="/login" style={{ color: 'var(--accent-color)', fontWeight: '600' }}>Login</Link>
          </p>
        </div>
      </div>
    </motion.div>
  )
}
