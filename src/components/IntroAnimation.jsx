import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function IntroAnimation() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    // Hide the intro after 2.5 seconds
    const timer = setTimeout(() => {
      setShow(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#1a1a24',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1 className="text-gradient" style={{ fontSize: '3rem', margin: 0 }}>
              Classic Fade
            </h1>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px', textAlign: 'center', fontSize: '1.2rem' }}>
              Premium Grooming
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
