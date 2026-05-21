import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('App Error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a24',
          color: '#e0e0e0',
          padding: '30px',
          textAlign: 'center',
          fontFamily: 'Inter, sans-serif'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✂️</div>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '10px', color: '#d4af37' }}>
            Kuch masla aa gaya
          </h2>
          <p style={{ color: '#888899', fontSize: '0.9rem', marginBottom: '24px' }}>
            App load hone mein problem hui. Please refresh karein.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#d4af37',
              color: '#1a1a24',
              border: 'none',
              padding: '12px 28px',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Refresh Karein
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
