import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Heart, MessageCircle, Share2, TrendingUp, Plus, User } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function Community() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [user, setUser] = useState(null)

  useEffect(() => {
    loadPosts()
    supabase?.auth.getUser().then(({ data }) => setUser(data?.user))
  }, [activeFilter])

  const loadPosts = async () => {
    setLoading(true)
    if (!supabase) {
      setLoading(false)
      return
    }

    let query = supabase
      .from('community_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (activeFilter === 'trending') {
      query = query.eq('is_trending', true)
    } else if (activeFilter !== 'all') {
      query = query.eq('post_type', activeFilter)
    }

    const { data } = await query
    setPosts(data || [])
    setLoading(false)
  }

  const handleLike = async (postId) => {
    if (!user || !supabase) return

    // Check if already liked
    const { data: existing } = await supabase
      .from('post_likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', user.id)
      .single()

    if (existing) {
      // Unlike
      await supabase.from('post_likes').delete().eq('id', existing.id)
      await supabase.rpc('decrement_post_likes', { post_id: postId })
    } else {
      // Like
      await supabase.from('post_likes').insert({ post_id: postId, user_id: user.id })
      await supabase.rpc('increment_post_likes', { post_id: postId })
    }

    loadPosts()
  }

  const formatDate = (iso) => {
    const date = new Date(iso)
    const now = new Date()
    const diff = now - date
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString('en-PK', { day: 'numeric', month: 'short' })
  }

  const postTypeColor = (type) => ({
    discussion: { bg: 'rgba(52,152,219,0.15)', text: '#3498db', label: '💬 Discussion' },
    question: { bg: 'rgba(212,175,55,0.15)', text: 'var(--accent-color)', label: '❓ Question' },
    experience: { bg: 'rgba(46,204,113,0.15)', text: '#2ecc71', label: '⭐ Experience' },
    recommendation: { bg: 'rgba(155,89,182,0.15)', text: '#9b59b6', label: '👍 Recommendation' },
  }[type] || { bg: 'rgba(212,175,55,0.15)', text: 'var(--accent-color)', label: type })

  return (
    <motion.div
      className="mobile-container"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingBottom: '80px' }}
    >
      {/* Header */}
      <header style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button className="neu-button" style={{ padding: '10px' }} onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 style={{ fontSize: '1.3rem', margin: 0 }}>Community</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', margin: '2px 0 0' }}>
              Barber discussions & tips
            </p>
          </div>
        </div>
        {user && (
          <button
            className="neu-button neu-button-primary"
            style={{ padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem' }}
            onClick={() => navigate('/community/new')}
          >
            <Plus size={16} /> Post
          </button>
        )}
      </header>

      {/* Filter Tabs */}
      <section style={{ padding: '0 20px 16px', flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {[
            { id: 'all', label: 'All', icon: '✨' },
            { id: 'trending', label: 'Trending', icon: '🔥' },
            { id: 'question', label: 'Questions', icon: '❓' },
            { id: 'experience', label: 'Experiences', icon: '⭐' },
            { id: 'discussion', label: 'Discussions', icon: '💬' },
          ].map((tab) => (
            <button
              key={tab.id}
              className={activeFilter === tab.id ? 'neu-inset' : 'neu-box'}
              style={{
                padding: '8px 16px',
                borderRadius: '10px',
                whiteSpace: 'nowrap',
                color: activeFilter === tab.id ? 'var(--accent-color)' : 'var(--text-color)',
                fontWeight: activeFilter === tab.id ? '600' : '400',
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
              onClick={() => setActiveFilter(tab.id)}
            >
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Posts Feed */}
      <section style={{ flex: 1, padding: '0 20px', overflowY: 'auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px 0' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                border: '3px solid var(--accent-color)',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
                margin: '0 auto',
              }}
            />
            <p style={{ color: 'var(--text-muted)', marginTop: '16px', fontSize: '0.9rem' }}>
              Loading posts...
            </p>
          </div>
        ) : posts.length === 0 ? (
          <div
            className="neu-inset"
            style={{ padding: '40px 20px', borderRadius: '20px', textAlign: 'center' }}
          >
            <MessageCircle size={36} color="var(--text-muted)" style={{ opacity: 0.3, marginBottom: '12px' }} />
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
              Abhi koi post nahi hai.
            </p>
            {user && (
              <button
                className="neu-button neu-button-primary"
                style={{ padding: '10px 20px', borderRadius: '12px', fontSize: '0.85rem' }}
                onClick={() => navigate('/community/new')}
              >
                Pehli Post Karein
              </button>
            )}
          </div>
        ) : (
          <AnimatePresence>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {posts.map((post) => {
                const typeStyle = postTypeColor(post.post_type)
                return (
                  <motion.div
                    key={post.id}
                    className="neu-box"
                    style={{ borderRadius: '20px', padding: '16px', cursor: 'pointer' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => navigate(`/community/${post.id}`)}
                  >
                    {/* User Info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <div
                        className="neu-inset"
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {post.user_photo ? (
                          <img
                            src={post.user_photo}
                            alt={post.user_name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <User size={18} color="var(--text-muted)" />
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '0.9rem', margin: '0 0 2px', fontWeight: '600' }}>
                          {post.user_name}
                        </h4>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.7rem', margin: 0 }}>
                          {formatDate(post.created_at)}
                        </p>
                      </div>
                      {post.is_trending && (
                        <div
                          style={{
                            padding: '4px 8px',
                            borderRadius: '20px',
                            backgroundColor: 'rgba(231,76,60,0.15)',
                            color: '#e74c3c',
                            fontSize: '0.65rem',
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px',
                          }}
                        >
                          <TrendingUp size={10} /> Trending
                        </div>
                      )}
                    </div>

                    {/* Post Type Badge */}
                    <div
                      style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        backgroundColor: typeStyle.bg,
                        color: typeStyle.text,
                        fontSize: '0.68rem',
                        fontWeight: '600',
                        marginBottom: '10px',
                      }}
                    >
                      {typeStyle.label}
                    </div>

                    {/* Title & Content */}
                    <h3 style={{ fontSize: '1rem', margin: '0 0 8px', fontWeight: '700' }}>{post.title}</h3>
                    <p
                      style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.85rem',
                        margin: '0 0 14px',
                        lineHeight: '1.5',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {post.content}
                    </p>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <button
                        className="neu-button"
                        style={{
                          padding: '6px 12px',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontSize: '0.78rem',
                          cursor: 'pointer',
                        }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleLike(post.id)
                        }}
                      >
                        <Heart size={14} color="#e74c3c" /> {post.likes_count || 0}
                      </button>
                      <button
                        className="neu-button"
                        style={{
                          padding: '6px 12px',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontSize: '0.78rem',
                          cursor: 'pointer',
                        }}
                      >
                        <MessageCircle size={14} color="var(--accent-color)" /> {post.comments_count || 0}
                      </button>
                      <button
                        className="neu-button"
                        style={{
                          padding: '6px 12px',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontSize: '0.78rem',
                          cursor: 'pointer',
                        }}
                        onClick={(e) => {
                          e.stopPropagation()
                          // Share functionality
                        }}
                      >
                        <Share2 size={14} color="var(--text-muted)" />
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </AnimatePresence>
        )}
      </section>

      {/* Login Prompt for Guests */}
      {!user && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 40px)',
            maxWidth: '440px',
            zIndex: 100,
          }}
        >
          <div
            className="neu-box"
            style={{
              padding: '14px 18px',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'var(--bg-color)',
            }}
          >
            <p style={{ fontSize: '0.85rem', margin: 0, color: 'var(--text-muted)' }}>
              Login karein to post & like
            </p>
            <button
              className="neu-button neu-button-primary"
              style={{ padding: '8px 16px', borderRadius: '10px', fontSize: '0.82rem' }}
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </div>
        </div>
      )}
    </motion.div>
  )
}
