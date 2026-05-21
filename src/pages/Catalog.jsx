import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'

const WHATSAPP_NUMBER = '923126743225'

const CATALOG_ITEMS = [
  {
    id: 1,
    name: 'Premium Skin Fade',
    category: 'fade',
    img: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'Low Drop Fade',
    category: 'fade',
    img: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'Modern Pompadour',
    category: 'haircut',
    img: 'https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?w=600&fit=crop&q=80',
  },
  {
    id: 4,
    name: 'Textured Crop',
    category: 'haircut',
    img: 'https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?w=600&fit=crop&q=80',
  },
  {
    id: 5,
    name: 'Executive Beard Trim (Khat)',
    category: 'beard',
    img: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&fit=crop&q=80',
  },
  {
    id: 6,
    name: 'Full Beard Sculpting',
    category: 'beard',
    img: 'https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=600&fit=crop&q=80',
  },
  {
    id: 7,
    name: 'Hot Towel Clean Shave',
    category: 'shave',
    img: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&fit=crop&q=80',
  },
]

const TABS = ['all', 'fade', 'haircut', 'beard', 'shave']

export default function Catalog() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(location.state?.category || 'all')
  const [loadingId, setLoadingId] = useState(null)

  const filteredItems =
    activeTab === 'all'
      ? CATALOG_ITEMS
      : CATALOG_ITEMS.filter((item) => item.category === activeTab)

  const handleBookNow = async (item) => {
    setLoadingId(item.id)

    // Save to Supabase
    const { error } = await supabase.from('bookings').insert({
      style_name: item.name,
      style_img: item.img,
      status: 'pending',
    })

    if (error) {
      console.error('Booking error:', error)
    }

    setLoadingId(null)

    // Open WhatsApp
    const message = encodeURIComponent(
      `Assalam o Alaikum Classic Fade! Main "${item.name}" style ki booking karna chahta hoon. Mujhe appointment de dein.`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
  }

  return (
    <motion.div
      className="mobile-container"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
      style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
    >
      {/* Header */}
      <header style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px', flexShrink: 0 }}>
        <button className="neu-button" style={{ padding: '10px' }} onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1 style={{ fontSize: '1.4rem', margin: 0 }}>Styles Catalog</h1>
      </header>

      {/* Tabs */}
      <div style={{ padding: '0 20px', marginBottom: '20px', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px', scrollbarWidth: 'none' }}>
          {TABS.map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? 'neu-inset' : 'neu-box'}
              style={{
                padding: '10px 18px',
                borderRadius: '12px',
                whiteSpace: 'nowrap',
                color: activeTab === tab ? 'var(--accent-color)' : 'var(--text-color)',
                textTransform: 'capitalize',
                fontWeight: activeTab === tab ? '600' : '400',
                cursor: 'pointer',
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'all' ? 'All Styles' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ flex: 1, padding: '0 20px 30px', overflowY: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '25px' }}>
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="neu-box"
                style={{ overflow: 'hidden', borderRadius: '24px' }}
              >
                {/* Image */}
                <div style={{ height: '240px', width: '100%', overflow: 'hidden', backgroundColor: 'var(--shadow-dark)' }}>
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                </div>

                {/* Footer */}
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>{item.name}</h3>
                  <button
                    className="neu-button neu-button-primary"
                    style={{
                      width: '100%',
                      padding: '14px',
                      fontSize: '1rem',
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      opacity: loadingId === item.id ? 0.7 : 1,
                    }}
                    onClick={() => handleBookNow(item)}
                    disabled={loadingId === item.id}
                  >
                    <MessageCircle size={20} />
                    {loadingId === item.id ? 'Booking...' : 'Book on WhatsApp'}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
