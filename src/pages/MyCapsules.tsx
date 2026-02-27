import { motion } from 'framer-motion'
import { mockCapsules } from '../mocks/data'
import { CapsuleCard } from '../components/CapsuleCard'
import { BottomNav } from '../components/BottomNav'

export function MyCapsules() {
  const locked = mockCapsules.filter(c => c.status === 'locked')
  const unlocked = mockCapsules.filter(c => c.status === 'unlocked')

  return (
    <div style={{ minHeight: '100vh', background: '#030712', paddingBottom: 90 }}>
      <div style={{ padding: '56px 20px 24px' }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#F8FAFC' }}>Mes Capsules</h1>
        <p style={{ fontSize: 13, color: 'rgba(240,234,245,0.45)', marginTop: 4 }}>
          {mockCapsules.length} capsules au total
        </p>
      </div>

      <div style={{ padding: '0 20px', marginBottom: 28 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, color: '#F8FAFC', marginBottom: 12 }}>
          🔒 Verrouillées ({locked.length})
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {locked.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <CapsuleCard capsule={c} />
            </motion.div>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 20px' }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, color: '#F8FAFC', marginBottom: 12 }}>
          ✨ Débloquées ({unlocked.length})
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {unlocked.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <CapsuleCard capsule={c} />
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
