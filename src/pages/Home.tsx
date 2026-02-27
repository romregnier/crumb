import { motion } from 'framer-motion'
import { Bell } from 'lucide-react'
import { mockCapsules, currentUser } from '../mocks/data'
import { CapsuleCard } from '../components/CapsuleCard'
import { BottomNav } from '../components/BottomNav'

const locked = mockCapsules.filter(c => c.status === 'locked').slice(0, 3)
const unlocked = mockCapsules.filter(c => c.status === 'unlocked').slice(0, 2)

export function Home() {
  return (
    <div style={{ paddingBottom: 90, minHeight: '100vh', background: '#0A0A0F' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '56px 20px 16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/logo.svg" alt="Crumb" style={{ width: 32, height: 40 }} />
          <span style={{ fontSize: 22, fontWeight: 700, color: '#F0EAF5', letterSpacing: -0.5 }}>crumb</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <motion.button
            whileTap={{ scale: 0.9 }}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <Bell size={22} color="rgba(240,234,245,0.6)" />
          </motion.button>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: currentUser.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'pointer',
          }}>
            {currentUser.initials}
          </div>
        </div>
      </div>

      {/* Map Preview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          margin: '0 20px 24px',
          borderRadius: 20,
          overflow: 'hidden',
          height: 160,
          position: 'relative',
          background: 'linear-gradient(135deg, #1E1C28 0%, #0D1B2A 50%, #1A0A20 100%)',
          border: '1px solid rgba(255,107,53,0.2)',
        }}
      >
        {/* Fake map grid */}
        <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.15 }}>
          {[0, 40, 80, 120].map(y => <line key={y} x1="0" y1={y} x2="430" y2={y} stroke="#F0EAF5" strokeWidth="0.5"/>)}
          {[0, 50, 100, 150, 200, 250, 300, 350, 400].map(x => <line key={x} x1={x} y1="0" x2={x} y2="160" stroke="#F0EAF5" strokeWidth="0.5"/>)}
        </svg>
        {/* Markers */}
        {[{x: '30%', y: '40%', c: '#FF6B35'}, {x: '60%', y: '60%', c: '#00C9A7'}, {x: '75%', y: '25%', c: '#7B61FF'}].map((m, i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
            style={{
              position: 'absolute', left: m.x, top: m.y,
              width: 12, height: 12, borderRadius: '50%',
              background: m.c, boxShadow: `0 0 12px ${m.c}`,
            }}
          />
        ))}
        <div style={{
          position: 'absolute', bottom: 14, left: 14,
          background: 'rgba(10,10,15,0.8)', backdropFilter: 'blur(8px)',
          borderRadius: 10, padding: '6px 12px',
        }}>
          <span style={{ fontSize: 12, color: '#F0EAF5', fontWeight: 500 }}>
            🌍 <strong style={{ color: '#FF6B35' }}>8</strong> capsules près de toi
          </span>
        </div>
      </motion.div>

      {/* Capsules à débloquer */}
      <div style={{ padding: '0 20px', marginBottom: 24 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: '#F0EAF5', marginBottom: 14 }}>
          ⏳ Capsules à débloquer
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {locked.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <CapsuleCard capsule={c} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Récemment débloquées */}
      <div style={{ padding: '0 20px' }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: '#F0EAF5', marginBottom: 14 }}>
          ✨ Récemment débloquées
        </h2>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
          {unlocked.map((c) => (
            <CapsuleCard key={c.id} capsule={c} variant="compact" />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
