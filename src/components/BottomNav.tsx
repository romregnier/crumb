import { motion } from 'framer-motion'
import { Home, Compass, Plus, Archive, User } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Compass, label: 'Explorer', path: '/explore' },
  { icon: Plus, label: 'Créer', path: '/create', isCenter: true },
  { icon: Archive, label: 'Capsules', path: '/my-capsules' },
  { icon: User, label: 'Profil', path: '/profile' },
]

export function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: '430px',
      background: 'rgba(19,18,26,0.95)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(240,234,245,0.08)',
      display: 'flex',
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
                background: 'linear-gradient(135deg, #FF6B35, #FF8F5E)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(255,107,53,0.4)',
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
              color={active ? '#FF6B35' : 'rgba(240,234,245,0.4)'}
              strokeWidth={active ? 2.5 : 1.5}
            />
            <span style={{
              fontSize: 10,
              color: active ? '#FF6B35' : 'rgba(240,234,245,0.4)',
              fontWeight: active ? 600 : 400,
            }}>
              {item.label}
            </span>
          </motion.button>
        )
      })}
    </nav>
  )
}
