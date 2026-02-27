import { motion } from 'framer-motion'
import { Settings, Lock } from 'lucide-react'
import { mockCapsules, currentUser } from '../mocks/data'
import { useNavigate } from 'react-router-dom'
import { BottomNav } from '../components/BottomNav'

const myCapsules = mockCapsules.filter(c => c.author.name === 'Romain')

export function Profile() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: '#030712', paddingBottom: 90 }}>
      {/* Header */}
      <div style={{
        padding: '56px 20px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#F8FAFC' }}>Profil</h1>
        <motion.button whileTap={{ scale: 0.9 }} style={{ background: '#1E293B', border: 'none', borderRadius: 12, padding: 10, cursor: 'pointer' }}>
          <Settings size={20} color="rgba(240,234,245,0.6)" />
        </motion.button>
      </div>

      {/* Avatar + info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ padding: '0 20px 28px', display: 'flex', alignItems: 'center', gap: 20 }}
      >
        <motion.div
          whileTap={{ scale: 0.95 }}
          style={{
            width: 80, height: 80, borderRadius: '50%',
            background: `linear-gradient(135deg, ${currentUser.color}, #FF8F5E)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 30, fontWeight: 700, color: '#fff',
            boxShadow: `0 8px 30px ${currentUser.color}40`,
            cursor: 'pointer',
          }}
        >
          {currentUser.initials}
        </motion.div>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F8FAFC' }}>{currentUser.name}</h2>
          <p style={{ fontSize: 13, color: 'rgba(240,234,245,0.45)', marginTop: 2 }}>@{currentUser.name.toLowerCase()}</p>
          <p style={{ fontSize: 12, color: 'rgba(240,234,245,0.35)', marginTop: 4 }}>Membre depuis janvier 2026</p>
        </div>
      </motion.div>

      {/* Stats */}
      <div style={{ padding: '0 20px 28px' }}>
        <div style={{
          background: '#0F172A', borderRadius: 20, padding: '20px',
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          border: '1px solid rgba(240,234,245,0.06)',
        }}>
          {[
            { label: 'Créées', value: currentUser.capsulesCréées, color: '#7C3AED' },
            { label: 'Débloquées', value: currentUser.capsulesDebloquees, color: '#06B6D4' },
            { label: 'Reçues', value: currentUser.capsulesRecues, color: '#8B5CF6' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              style={{ textAlign: 'center', padding: '0 8px', borderRight: i < 2 ? '1px solid rgba(240,234,245,0.06)' : 'none' }}
            >
              <p style={{ fontSize: 28, fontWeight: 700, color: stat.color }}>{stat.value}</p>
              <p style={{ fontSize: 11, color: 'rgba(240,234,245,0.45)', marginTop: 2 }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* My capsules grid */}
      <div style={{ padding: '0 20px' }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#F8FAFC', marginBottom: 14 }}>Mes capsules</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {myCapsules.map((c, i) => (
            <motion.div
              key={c.id}
              onClick={() => navigate(`/capsule/${c.id}`)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: '#1E293B',
                borderRadius: 16, overflow: 'hidden',
                cursor: 'pointer', aspectRatio: '1',
                position: 'relative',
                border: '1px solid rgba(240,234,245,0.06)',
              }}
            >
              {c.image ? (
                <img src={c.image} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{
                  width: '100%', height: '100%',
                  background: 'linear-gradient(135deg, #1E293B, #0D1B2A)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 32,
                }}>📦</div>
              )}
              {c.status === 'locked' && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(10,10,15,0.6)', backdropFilter: 'blur(3px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Lock size={20} color="#7C3AED" />
                </div>
              )}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'linear-gradient(to top, rgba(10,10,15,0.9), transparent)',
                padding: '12px 10px 10px',
              }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: '#F8FAFC', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {c.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
