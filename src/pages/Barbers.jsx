import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Star, Scissors, Award, User } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function Barbers() {
  const navigate = useNavigate()
  const [barbers, setBarbers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      // Fallback data when supabase is not configured
      setBarbers([
        { id: 1, name: 'Ahmed', rating: 4.8, specialty: 'Classic Cuts', avatar_url: '/barbers/ahmed.jpg', experience: '5 years' },
        { id: 2, name: 'Ali', rating: 4.9, specialty: 'Modern Styles', avatar_url: '/barbers/ali.jpg', experience: '7 years' },
      ])
      setLoading(false)
      return
    }
    supabase.from('barbers').select('*').order('rating', { ascending: false })
      .then(({ data }) => { setBarbers(data || []); setLoading(false) })
  }, [])

  return (
    <motion.div className="mobile-container" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', bounce: 0, duration: 0.4 }} style={{ paddingBottom: '40px' }}>
      <header style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button className="neu-button" style={{ padding: '10px' }} onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 style={{ fontSize: '1.4rem', margin: 0 }}>Our Barbers</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: '2px 0 0' }}>Expert groomers at your service</p>
        </div>
      </header>

      <div style={{ padding: '0 20px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ width: '36px', height: '36px', border: '3px solid var(--accent-color)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto' }} />
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {barbers.map((barber, i) => (
              <motion.div
                key={barber.id}
                className="neu-box"
                style={{ borderRadius: '22px', overflow: 'hidden' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {/* Top banner */}
                <div style={{ height: '120px', background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.05))', position: 'relative', display: 'flex', alignItems: 'flex-end', padding: '0 20px 0' }}>
                  {i === 0 && (
                    <div style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: 'var(--accent-color)', color: 'var(--bg-color)', fontSize: '0.65rem', fontWeight: '700', padding: '4px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Award size={11} /> TOP RATED
                    </div>
                  )}
                  <div className="neu-inset" style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--bg-color)', transform: 'translateY(40px)', flexShrink: 0 }}>
                    {barber.photo_url
                      ? <img src={barber.photo_url} alt={barber.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={32} color="var(--text-muted)" /></div>
                    }
                  </div>
                </div>

                <div style={{ padding: '48px 20px 20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <h2 style={{ fontSize: '1.2rem', margin: '0 0 2px' }}>{barber.name}</h2>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: 0 }}>{barber.experience_years} years experience</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                        <Star size={15} color="#f39c12" fill="#f39c12" />
                        <span style={{ fontWeight: '700', color: '#f39c12', fontSize: '1rem' }}>{barber.rating}</span>
                      </div>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', margin: '2px 0 0', display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'flex-end' }}>
                        <Scissors size={10} /> {barber.total_cuts?.toLocaleString()} cuts
                      </p>
                    </div>
                  </div>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '14px', lineHeight: '1.5' }}>{barber.bio}</p>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {(barber.specialties || []).map(sp => (
                      <span key={sp} style={{ fontSize: '0.68rem', backgroundColor: 'rgba(212,175,55,0.15)', color: 'var(--accent-color)', padding: '4px 10px', borderRadius: '20px', fontWeight: '600' }}>{sp}</span>
                    ))}
                  </div>

                  <button
                    className="neu-button neu-button-primary"
                    style={{ width: '100%', padding: '13px', borderRadius: '14px', fontSize: '0.95rem' }}
                    onClick={() => navigate('/book', { state: { barberId: barber.id } })}
                  >
                    <Scissors size={16} /> Book with {barber.name.split(' ')[0]}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
