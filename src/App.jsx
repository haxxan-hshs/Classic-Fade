import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Login from './pages/Login'
import Signup from './pages/Signup'
import BookingFlow from './pages/BookingFlow'
import Barbers from './pages/Barbers'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import UserDashboard from './pages/UserDashboard'
import IntroAnimation from './components/IntroAnimation'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  const location = useLocation()
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') !== 'light')

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-mode')
      localStorage.setItem('theme', 'dark')
    } else {
      document.body.classList.add('light-mode')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  const toggleTheme = () => setIsDarkMode(p => !p)

  return (
    <ErrorBoundary>
      <IntroAnimation />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* User Routes */}
          <Route path="/" element={<Home isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/book" element={<BookingFlow />} />
          <Route path="/barbers" element={<Barbers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />

          {/* Fallback */}
          <Route path="*" element={<Home isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
        </Routes>
      </AnimatePresence>
    </ErrorBoundary>
  )
}

export default App
