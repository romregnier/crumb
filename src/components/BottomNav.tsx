import { motion } from 'framer-motion'
import { Home, Compass, Plus, Clock, User } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Compass, label: 'Explorer', path: '/explore' },
  { icon: Plus, label: 'Créer', path: '/create', isCenter: true },
  { icon: Clock, label: 'Voyage', path: '/timeline' },
  { icon: User, label: 'Profil', path: '/profile' },
]

export function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <>
      {/* Desktop horizontal nav */}
      <nav className="desktop-nav" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 64,
        background: 'rgba(3,7,18,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(124,58,237,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        zIndex: 1000,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 22, fontWeight: 800, background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            ✦ crumb
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {navItems.map((item) => {
            const active = location.pathname === item.path
            const Icon = item.icon
            if (item.isCenter) {
              return (
                <motion.button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
                    border: 'none',
                    borderRadius: 12,
                    padding: '8px 20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: 14,
                    boxShadow: '0 4px 20px rgba(124,58,237,0.4)',
                    marginLeft: 8,
                  }}
                >
                  <Icon size={16} color="#fff" strokeWidth={2.5} />
                  {item.label}
                </motion.button>
              )
            }
            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: active ? 'rgba(124,58,237,0.15)' : 'none',
                  border: active ? '1px solid rgba(124,58,237,0.3)' : '1px solid transparent',
                  borderRadius: 10,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 16px',
                  transition: 'all 0.2s',
                }}
              >
                <Icon
                  size={18}
                  color={active ? '#7C3AED' : 'rgba(248,250,252,0.5)'}
                  strokeWidth={active ? 2.5 : 1.5}
                />
                <span style={{
                  fontSize: 13,
                  color: active ? '#7C3AED' : 'rgba(248,250,252,0.5)',
                  fontWeight: active ? 600 : 400,
                }}>
                  {item.label}
                </span>
              </motion.button>
            )
          })}
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <nav className="bottom-nav" style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '430px',
        background: 'rgba(15,23,42,0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(124,58,237,0.15)',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '8px 0 20px',
        zIndex: 100,
      }}>
        {navItems.map((item) => {
          const active = location.pathname === item.path
          const Icon = item.icon

          if (item.isCenter) {
            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 20px rgba(124,58,237,0.5)',
                  marginTop: -16,
                }}
              >
                <Icon size={24} color="#fff" strokeWidth={2.5} />
              </motion.button>
            )
          }

          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              whileTap={{ scale: 0.9 }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                padding: '4px 12px',
              }}
            >
              <Icon
                size={22}
                color={active ? '#7C3AED' : 'rgba(248,250,252,0.4)'}
                strokeWidth={active ? 2.5 : 1.5}
              />
              <span style={{
                fontSize: 10,
                color: active ? '#7C3AED' : 'rgba(248,250,252,0.4)',
                fontWeight: active ? 600 : 400,
              }}>
                {item.label}
              </span>
            </motion.button>
          )
        })}
      </nav>
    </>
  )
}
