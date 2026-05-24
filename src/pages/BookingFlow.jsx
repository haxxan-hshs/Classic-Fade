import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Star, Clock, CheckCircle, Calendar, MessageCircle, User } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { format, addDays, isToday, isTomorrow } from 'date-fns'

const WHATSAPP = '923126743225'

const TIME_SLOTS = [
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
  '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM',
]

const STEPS = ['Service', 'Barber', 'Date & Time', 'Confirm']

function StepIndicator({ current }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20px 24px', gap: '0' }}>
      {STEPS.map((step, i) => (
        <div key={step} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.75rem', fontWeight: '700', flexShrink: 0,
              backgroundColor: i < current ? 'var(--accent-color)' : i === current ? 'var(--accent-color)' : 'var(--bg-color)',
              color: i <= current ? 'var(--bg-color)' : 'var(--text-muted)',
              boxShadow: i <= current ? 'none' : 'var(--neu-drop-sm)',
            }}>
              {i < current ? <CheckCircle size={16} /> : i + 1}
            </div>
            <span style={{ fontSize: '0.6rem', color: i === current ? 'var(--accent-color)' : 'var(--text-muted)', whiteSpace: 'nowrap', fontWeight: i === current ? '700' : '400' }}>
              {step}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div style={{ flex: 1, height: '2px', backgroundColor: i < current ? 'var(--accent-color)' : 'rgba(136,136,153,0.3)', margin: '0 4px', marginBottom: '18px' }} />
          )}
        </div>
      ))}
    </div>
  )
}

export default function BookingFlow() {
  const navigate = useNavigate()
  const location = useLocation()
  const preselectedService = location.state?.serviceId || null

  const [step, setStep] = useState(preselectedService ? 1 : 0)
  const [services, setServices] = useState([])
  const [barbers, setBarbers] = useState([])
  const [bookedSlots, setBookedSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [user, setUser] = useState(null)

  const [selected, setSelected] = useState({
    service: null,
    barber: null,
    date: new Date(),
    time: null,
    name: '',
    phone: '',
    notes: '',
  })

  useEffect(() => {
    loadData()
    supabase?.auth.getUser().then(({ data }) => {
      if (data?.user) {
        setUser(data.user)
        setSelected(s => ({
          ...s,
          name: data.user.user_metadata?.name || '',
          phone: data.user.user_metadata?.phone || '',
        }))
      }
    })
  }, [])

  useEffect(() => {
    if (selected.barber && selected.date) loadBookedSlots()
  }, [selected.barber, selected.date])

const loadData = async () => {
  setLoading(true)
  
  // If supabase is not configured, use fallback data
  if (!supabase) {
    setServices([
      { id: 1, name: 'Classic Haircut', category: 'haircut', price: 500, duration: 30, img_url: '/styles/classic.jpg' },
      { id: 2, name: 'Beard Trim', category: 'beard', price: 300, duration: 20, img_url: '/styles/beard.jpg' },
      { id: 3, name: 'Hair + Beard Combo', category: 'combo', price: 700, duration: 45, img_url: '/styles/combo.jpg' },
    ])
    setBarbers([
      { id: 1, name: 'Ahmed', rating: 4.8, specialty: 'Classic Cuts', avatar_url: '/barbers/ahmed.jpg' },
      { id: 2, name: 'Ali', rating: 4.9, specialty: 'Modern Styles', avatar_url: '/barbers/ali.jpg' },
    ])
    setLoading(false)
    return
  }
  
  const [{ data: svcs }, { data: brbrs }] = await Promise.all([
    supabase.from('services').select('*').eq('is_active', true).order('category'),
    supabase.from('barbers').select('*').eq('is_available', true).order('rating', { ascending: false }),
  ])
    setServices(svcs || [])
    setBarbers(brbrs || [])

    if (preselectedService) {
      const svc = svcs?.find(s => s.id === preselectedService)
      if (svc) setSelected(s => ({ ...s, service: svc }))
    }
    setLoading(false)
  }

const loadBookedSlots = async () => {
  if (!supabase) {
    setBookedSlots([])
    return
  }
  const dateStr = format(selected.date, 'yyyy-MM-dd')
  const { data } = await supabase
  .from('bookings')
  .select('slot_time')
  .eq('barber_id', selected.barber.id)
  .eq('slot_date', dateStr)
  .in('status', ['pending', 'confirmed'])
  setBookedSlots((data || []).map(b => b.slot_time))
  }

  const getDates = () => Array.from({ length: 7 }, (_, i) => addDays(new Date(), i))

  const formatDateLabel = (d) => {
    if (isToday(d)) return 'Today'
    if (isTomorrow(d)) return 'Tomorrow'
    return format(d, 'EEE')
  }

  const handleSubmit = async () => {
    if (!selected.name || !selected.phone) return
    setSubmitting(true)

    const bookingData = {
      user_id: user?.id || null,
      user_name: selected.name,
      user_phone: selected.phone,
      barber_id: selected.barber.id,
      barber_name: selected.barber.name,
      service_id: selected.service.id,
      service_name: selected.service.name,
      slot_date: format(selected.date, 'yyyy-MM-dd'),
      slot_time: selected.time,
      notes: selected.notes || null,
      style_img: selected.service.img_url,
      status: 'pending',
    }

    // If supabase is available, insert to database
    if (supabase) {
      const { error } = await supabase.from('bookings').insert(bookingData)
      if (error) {
        console.error('Booking error:', error)
        setSubmitting(false)
        return
      }
    }
    
    setSubmitting(false)

    // Save to local history
    const history = JSON.parse(localStorage.getItem('bookingHistory')) || []
    history.push({ styleName: selected.service.name, date: new Date().toISOString() })
    localStorage.setItem('bookingHistory', JSON.stringify(history))
    setDone(true)
  }

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Assalam o Alaikum Classic Fade!\n\nBooking Details:\n👤 Name: ${selected.name}\n📞 Phone: ${selected.phone}\n✂️ Service: ${selected.service?.name}\n💈 Barber: ${selected.barber?.name}\n📅 Date: ${format(selected.date, 'dd MMM yyyy')}\n⏰ Time: ${selected.time}\n\nPlease confirm my appointment.`
    )
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank')
  }

  const canNext = () => {
    if (step === 0) return !!selected.service
    if (step === 1) return !!selected.barber
    if (step === 2) return !!selected.time
    return false
  }

  // ── Done Screen ──
  if (done) {
    return (
      <motion.div className="mobile-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '30px', textAlign: 'center' }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5 }}>
          <div className="neu-inset" style={{ width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <CheckCircle size={48} color="#2ecc71" />
          </div>
        </motion.div>
        <h2 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>Booking Ho Gayi!</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>
          {selected.service?.name} — {selected.barber?.name}
        </p>
        <p style={{ color: 'var(--accent-color)', fontWeight: '700', marginBottom: '32px' }}>
          {format(selected.date, 'dd MMM yyyy')} at {selected.time}
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>
          Admin se confirmation ka wait karein. WhatsApp pe bhi message kar sakte hain.
        </p>
        <button className="neu-button" style={{ width: '100%', padding: '14px', color: '#25D366', marginBottom: '12px', borderRadius: '14px' }} onClick={handleWhatsApp}>
          <MessageCircle size={18} /> WhatsApp pe Confirm Karein
        </button>
        <button className="neu-button neu-button-primary" style={{ width: '100%', padding: '14px', borderRadius: '14px' }} onClick={() => navigate('/')}>
          Home Par Jao
        </button>
      </motion.div>
    )
  }

  if (loading) {
    return (
      <div className="mobile-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid var(--accent-color)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div className="mobile-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ padding: '20px 20px 16px', display: 'flex', alignItems: 'center', gap: '15px', flexShrink: 0 }}>
        <button className="neu-button" style={{ padding: '10px' }} onClick={() => step > 0 ? setStep(s => s - 1) : navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 style={{ fontSize: '1.3rem', margin: 0 }}>Book Appointment</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: '2px 0 0' }}>Step {step + 1} of {STEPS.length}</p>
        </div>
      </header>

      <StepIndicator current={step} />

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 100px' }}>
        <AnimatePresence mode="wait">

          {/* ── STEP 0: Select Service ── */}
          {step === 0 && (
            <motion.div key="step0" initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }}>
              <h2 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--text-muted)' }}>Kaunsi service chahiye?</h2>
              {['fade', 'haircut', 'beard', 'shave'].map(cat => {
                const catServices = services.filter(s => s.category === cat)
                if (!catServices.length) return null
                return (
                  <div key={cat} style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '0.85rem', color: 'var(--accent-color)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>{cat}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {catServices.map(svc => (
                        <motion.div
                          key={svc.id}
                          whileTap={{ scale: 0.98 }}
                          className={selected.service?.id === svc.id ? 'neu-inset' : 'neu-box'}
                          style={{ borderRadius: '18px', overflow: 'hidden', cursor: 'pointer', border: selected.service?.id === svc.id ? '2px solid var(--accent-color)' : '2px solid transparent', display: 'flex' }}
                          onClick={() => setSelected(s => ({ ...s, service: svc }))}
                        >
                          <div style={{ width: '90px', height: '90px', flexShrink: 0, overflow: 'hidden' }}>
                            <img src={svc.img_url} alt={svc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <div style={{ padding: '12px 14px', flex: 1 }}>
                            <h4 style={{ fontSize: '0.95rem', margin: '0 0 4px', color: selected.service?.id === svc.id ? 'var(--accent-color)' : 'var(--text-color)' }}>{svc.name}</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: '0 0 8px' }}>{svc.description}</p>
                            <div style={{ display: 'flex', gap: '12px' }}>
                              <span style={{ color: 'var(--accent-color)', fontWeight: '700', fontSize: '0.9rem' }}>Rs. {svc.price}</span>
                              <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '3px' }}>
                                <Clock size={11} /> {svc.duration_mins} min
                              </span>
                            </div>
                          </div>
                          {selected.service?.id === svc.id && (
                            <div style={{ display: 'flex', alignItems: 'center', paddingRight: '14px' }}>
                              <CheckCircle size={20} color="var(--accent-color)" />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </motion.div>
          )}

          {/* ── STEP 1: Select Barber ── */}
          {step === 1 && (
            <motion.div key="step1" initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }}>
              <h2 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--text-muted)' }}>Barber choose karein</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {barbers.map(barber => (
                  <motion.div
                    key={barber.id}
                    whileTap={{ scale: 0.98 }}
                    className={selected.barber?.id === barber.id ? 'neu-inset' : 'neu-box'}
                    style={{ borderRadius: '20px', padding: '16px', cursor: 'pointer', border: selected.barber?.id === barber.id ? '2px solid var(--accent-color)' : '2px solid transparent' }}
                    onClick={() => setSelected(s => ({ ...s, barber }))}
                  >
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                      <div className="neu-inset" style={{ width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                        {barber.photo_url
                          ? <img src={barber.photo_url} alt={barber.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={24} color="var(--text-muted)" /></div>
                        }
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                          <h3 style={{ fontSize: '1rem', margin: 0, color: selected.barber?.id === barber.id ? 'var(--accent-color)' : 'var(--text-color)' }}>{barber.name}</h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <Star size={13} color="#f39c12" fill="#f39c12" />
                            <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#f39c12' }}>{barber.rating}</span>
                          </div>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: '0 0 8px' }}>{barber.bio}</p>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {(barber.specialties || []).map(sp => (
                            <span key={sp} style={{ fontSize: '0.65rem', backgroundColor: 'rgba(212,175,55,0.15)', color: 'var(--accent-color)', padding: '3px 8px', borderRadius: '20px', fontWeight: '600' }}>{sp}</span>
                          ))}
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: '6px' }}>
                          {barber.experience_years} yrs exp · {barber.total_cuts.toLocaleString()} cuts
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: Date & Time ── */}
          {step === 2 && (
            <motion.div key="step2" initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }}>
              <h2 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--text-muted)' }}>Date aur time select karein</h2>

              {/* Date Picker */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '0.85rem', color: 'var(--accent-color)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={14} /> Date
                </h3>
                <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px', scrollbarWidth: 'none' }}>
                  {getDates().map(d => {
                    const isSelected = format(d, 'yyyy-MM-dd') === format(selected.date, 'yyyy-MM-dd')
                    return (
                      <button
                        key={d.toISOString()}
                        className={isSelected ? 'neu-inset' : 'neu-box'}
                        style={{ padding: '12px 14px', borderRadius: '14px', cursor: 'pointer', textAlign: 'center', flexShrink: 0, color: isSelected ? 'var(--accent-color)' : 'var(--text-color)', minWidth: '60px' }}
                        onClick={() => setSelected(s => ({ ...s, date: d, time: null }))}
                      >
                        <div style={{ fontSize: '0.65rem', color: isSelected ? 'var(--accent-color)' : 'var(--text-muted)', marginBottom: '4px' }}>{formatDateLabel(d)}</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: '700' }}>{format(d, 'd')}</div>
                        <div style={{ fontSize: '0.65rem', color: isSelected ? 'var(--accent-color)' : 'var(--text-muted)' }}>{format(d, 'MMM')}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <h3 style={{ fontSize: '0.85rem', color: 'var(--accent-color)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={14} /> Time Slot
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  {TIME_SLOTS.map(slot => {
                    const isBooked = bookedSlots.includes(slot)
                    const isSelected = selected.time === slot
                    return (
                      <button
                        key={slot}
                        disabled={isBooked}
                        className={isSelected ? 'neu-inset' : 'neu-box'}
                        style={{
                          padding: '10px 6px', borderRadius: '12px', cursor: isBooked ? 'not-allowed' : 'pointer',
                          fontSize: '0.78rem', fontWeight: isSelected ? '700' : '400',
                          color: isBooked ? 'var(--text-muted)' : isSelected ? 'var(--accent-color)' : 'var(--text-color)',
                          opacity: isBooked ? 0.4 : 1,
                          textDecoration: isBooked ? 'line-through' : 'none',
                        }}
                        onClick={() => !isBooked && setSelected(s => ({ ...s, time: slot }))}
                      >
                        {slot}
                      </button>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: Confirm ── */}
          {step === 3 && (
            <motion.div key="step3" initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }}>
              <h2 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--text-muted)' }}>Booking confirm karein</h2>

              {/* Summary Card */}
              <div className="neu-box" style={{ borderRadius: '20px', overflow: 'hidden', marginBottom: '20px' }}>
                {selected.service?.img_url && (
                  <div style={{ height: '140px', overflow: 'hidden' }}>
                    <img src={selected.service.img_url} alt={selected.service.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                <div style={{ padding: '16px' }}>
                  {[
                    { label: '✂️ Service', value: `${selected.service?.name} — Rs. ${selected.service?.price}` },
                    { label: '💈 Barber', value: selected.barber?.name },
                    { label: '📅 Date', value: format(selected.date, 'EEEE, dd MMM yyyy') },
                    { label: '⏰ Time', value: selected.time },
                  ].map(row => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(136,136,153,0.1)' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{row.label}</span>
                      <span style={{ fontWeight: '600', fontSize: '0.85rem', textAlign: 'right', maxWidth: '60%' }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '0.85rem', color: 'var(--accent-color)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Aapki Details</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="neu-inset" style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderRadius: '14px' }}>
                    <User size={16} color="var(--text-muted)" style={{ marginRight: '12px' }} />
                    <input
                      type="text" placeholder="Aapka naam *" value={selected.name}
                      onChange={e => setSelected(s => ({ ...s, name: e.target.value }))}
                      style={{ flex: 1, color: 'var(--text-color)', fontSize: '0.95rem', background: 'none' }}
                    />
                  </div>
                  <div className="neu-inset" style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderRadius: '14px' }}>
                    <MessageCircle size={16} color="var(--text-muted)" style={{ marginRight: '12px' }} />
                    <input
                      type="tel" placeholder="Phone number *" value={selected.phone}
                      onChange={e => setSelected(s => ({ ...s, phone: e.target.value }))}
                      style={{ flex: 1, color: 'var(--text-color)', fontSize: '0.95rem', background: 'none' }}
                    />
                  </div>
                  <div className="neu-inset" style={{ display: 'flex', alignItems: 'flex-start', padding: '12px 16px', borderRadius: '14px' }}>
                    <span style={{ color: 'var(--text-muted)', marginRight: '12px', marginTop: '2px', fontSize: '0.85rem' }}>📝</span>
                    <textarea
                      placeholder="Koi special request? (optional)"
                      value={selected.notes}
                      onChange={e => setSelected(s => ({ ...s, notes: e.target.value }))}
                      rows={2}
                      style={{ flex: 1, color: 'var(--text-color)', fontSize: '0.9rem', background: 'none', resize: 'none', lineHeight: '1.5' }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Bottom Button */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '480px', padding: '16px 20px', backgroundColor: 'var(--bg-color)', borderTop: '1px solid rgba(136,136,153,0.1)', zIndex: 50 }}>
        {step < 3 ? (
          <button
            className="neu-button neu-button-primary"
            style={{ width: '100%', padding: '16px', fontSize: '1rem', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: canNext() ? 1 : 0.5 }}
            disabled={!canNext()}
            onClick={() => setStep(s => s + 1)}
          >
            Next <ArrowRight size={18} />
          </button>
        ) : (
          <button
            className="neu-button neu-button-primary"
            style={{ width: '100%', padding: '16px', fontSize: '1rem', borderRadius: '14px', opacity: (selected.name && selected.phone && !submitting) ? 1 : 0.5 }}
            disabled={!selected.name || !selected.phone || submitting}
            onClick={handleSubmit}
          >
            {submitting ? 'Booking Ho Rahi Hai...' : '✅ Booking Confirm Karein'}
          </button>
        )}
      </div>
    </motion.div>
  )
}
