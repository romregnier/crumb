import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, Puzzle, ChevronUp, ChevronDown } from 'lucide-react'
import { mockCapsules } from '../mocks/data'
import { useNavigate } from 'react-router-dom'
import { BottomNav } from '../components/BottomNav'

const public_capsules = mockCapsules.filter(c => c.audience === 'public')

const markers = [
  { id: '1', x: '22%', y: '45%', color: '#FF6B35' },
  { id: '3', x: '58%', y: '30%', color: '#00C9A7' },
  { id: '6', x: '70%', y: '62%', color: '#00C9A7' },
  { id: '8', x: '40%', y: '70%', color: '#FF6B35' },
]

export function Explore() {
  const navigate = useNavigate()
  const [listOpen, setListOpen] = useState(true)

  return (
    <div style={{ height: '100vh', background: '#0A0A0F', position: 'relative', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
        padding: '56px 20px 16px',
        background: 'linear-gradient(to bottom, rgba(10,10,15,1) 0%, rgba(10,10,15,0) 100%)',
      }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#F0EAF5' }}>Explorer</h1>
        <p style={{ fontSize: 13, color: 'rgba(240,234,245,0.5)', marginTop: 2 }}>Capsules autour de toi</p>
      </div>

      {/* Fake Map */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 40% 40%, #0D1B2A 0%, #0A0A0F 60%)',
      }}>
        {/* Grid lines */}
        <svg width="100%" height="100%" style={{ opacity: 0.1 }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={`${i * 9}%`} x2="100%" y2={`${i * 9}%`} stroke="#F0EAF5" strokeWidth="0.5"/>
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={`v${i}`} x1={`${i * 14}%`} y1="0" x2={`${i * 14}%`} y2="100%" stroke="#F0EAF5" strokeWidth="0.5"/>
          ))}
          {/* Curved street lines */}
          <path d="M0,200 Q200,180 430,220" stroke="#F0EAF5" strokeWidth="1.5" fill="none" opacity="0.3"/>
          <path d="M0,350 Q150,320 430,380" stroke="#F0EAF5" strokeWidth="1" fill="none" opacity="0.2"/>
          <path d="M100,0 Q120,300 150,700" stroke="#F0EAF5" strokeWidth="1.5" fill="none" opacity="0.3"/>
          <path d="M280,0 Q300,400 260,700" stroke="#F0EAF5" strokeWidth="1" fill="none" opacity="0.2"/>
        </svg>

        {/* User location */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 60, height: 60, borderRadius: '50%',
            background: 'rgba(255,107,53,0.2)',
          }}
        />
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 14, height: 14, borderRadius: '50%',
          background: '#FF6B35', border: '2px solid #fff',
          boxShadow: '0 0 20px rgba(255,107,53,0.6)',
        }}/>

        {/* Capsule markers */}
        {markers.map((m, i) => (
          <motion.div
            key={m.id}
            onClick={() => navigate(`/capsule/${m.id}`)}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.15, type: 'spring' }}
            whileTap={{ scale: 0.85 }}
            style={{
              position: 'absolute', left: m.x, top: m.y,
              cursor: 'pointer',
            }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: m.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 4px 20px ${m.color}60`,
              border: '2px solid rgba(255,255,255,0.2)',
            }}>
              <span style={{ fontSize: 16 }}>📦</span>
            </div>
            <div style={{
              width: 0, height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: `8px solid ${m.color}`,
              margin: '0 auto',
            }}/>
          </motion.div>
        ))}
      </div>

      {/* Bottom sheet */}
      <motion.div
        animate={{ y: listOpen ? 0 : 260 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        style={{
          position: 'absolute', bottom: 80, left: 0, right: 0,
          background: 'rgba(19,18,26,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px 20px 0 0',
          border: '1px solid rgba(240,234,245,0.08)',
          padding: '0 0 20px',
          maxHeight: '50vh',
          overflowY: 'auto',
        }}
      >
        <button
          onClick={() => setListOpen(!listOpen)}
          style={{
            width: '100%', background: 'none', border: 'none', cursor: 'pointer',
            padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 600, color: '#F0EAF5' }}>
            {public_capsules.length} capsules à proximité
          </span>
          {listOpen ? <ChevronDown size={18} color="rgba(240,234,245,0.5)" /> : <ChevronUp size={18} color="rgba(240,234,245,0.5)" />}
        </button>

        <AnimatePresence>
          {listOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}
            >
              {public_capsules.map((c, i) => {
                const Icon = c.unlockCondition.type === 'date' ? Calendar
                  : c.unlockCondition.type === 'location' ? MapPin : Puzzle
                const iconColor = c.unlockCondition.type === 'date' ? '#FF6B35'
                  : c.unlockCondition.type === 'location' ? '#00C9A7' : '#7B61FF'
                return (
                  <motion.div
                    key={c.id}
                    onClick={() => navigate(`/capsule/${c.id}`)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      background: '#1E1C28',
                      borderRadius: 14,
                      padding: '12px 14px',
                      display: 'flex', alignItems: 'center', gap: 12,
                      cursor: 'pointer',
                      border: '1px solid rgba(240,234,245,0.06)',
                    }}
                  >
                    <div style={{
                      width: 40, height: 40, borderRadius: 12,
                      background: `${iconColor}20`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Icon size={18} color={iconColor} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#F0EAF5', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {c.title}
                      </p>
                      <p style={{ fontSize: 11, color: 'rgba(240,234,245,0.45)' }}>
                        {c.unlockCondition.label} · par {c.author.name}
                      </p>
                    </div>
                    <span style={{ fontSize: 12, color: 'rgba(240,234,245,0.4)', flexShrink: 0 }}>
                      {c.distance}
                    </span>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <BottomNav />
    </div>
  )
}
