import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Clock, Calendar, MapPin, Puzzle } from 'lucide-react'
import { mockCapsules, type Capsule } from '../mocks/data'
import { useNavigate } from 'react-router-dom'
import { BottomNav } from '../components/BottomNav'

function getUnlockDate(c: Capsule): Date | null {
  if (c.unlockCondition.date) return new Date(c.unlockCondition.date)
  return null
}

function isToday(d: Date): boolean {
  const now = new Date()
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate()
}

function countdown(d: Date): string {
  const diff = d.getTime() - Date.now()
  if (diff <= 0) return 'Maintenant'
  const days = Math.floor(diff / 86400000)
  if (days > 0) return `dans ${days}j`
  const hours = Math.floor(diff / 3600000)
  if (hours > 0) return `dans ${hours}h`
  return 'bientôt'
}

function ConditionIcon({ type, color }: { type: string; color: string }) {
  const icons: Record<string, typeof Calendar> = { date: Calendar, location: MapPin, fragments: Puzzle }
  const Icon = icons[type] || Calendar
  return <Icon size={12} color={color} />
}

function CapsuleNode({ capsule, index, period }: { capsule: Capsule; index: number; period: 'past' | 'today' | 'future' }) {
  const navigate = useNavigate()
  const unlockDate = getUnlockDate(capsule)
  const isUnlocked = capsule.status === 'unlocked' || period === 'past'
  const isFuture = period === 'future'

  const accentColor = isUnlocked ? '#06B6D4' : isFuture ? '#8B5CF6' : '#7C3AED'
  const unlockColor = capsule.unlockCondition.type === 'date' ? '#7C3AED'
    : capsule.unlockCondition.type === 'location' ? '#06B6D4' : '#8B5CF6'

  const cardStyle = {
    background: isFuture ? 'rgba(30,41,59,0.7)' : '#1E293B',
    borderRadius: 14,
    padding: '10px 12px',
    border: `1px solid ${accentColor}30`,
    cursor: 'pointer',
    maxWidth: 160,
    filter: isFuture ? 'grayscale(0.3)' : 'none',
    opacity: isFuture ? 0.8 : 1,
    boxShadow: isUnlocked ? `0 0 12px ${accentColor}25` : 'none',
  }

  const cardContent = (
    <>
      {capsule.image && (
        <img src={capsule.image} alt={capsule.title}
          style={{ width: '100%', height: 56, objectFit: 'cover', borderRadius: 8, marginBottom: 8, filter: isFuture ? 'blur(1px)' : 'none' }} />
      )}
      <p style={{ fontSize: 12, fontWeight: 700, color: isFuture ? 'rgba(248,250,252,0.5)' : '#F8FAFC', marginBottom: 4, lineHeight: 1.3 }}>
        {capsule.title}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
        <ConditionIcon type={capsule.unlockCondition.type} color={unlockColor} />
        <span style={{ fontSize: 10, color: 'rgba(248,250,252,0.45)' }}>{capsule.unlockCondition.label}</span>
      </div>
      {isFuture && unlockDate && (
        <p style={{ fontSize: 10, color: '#8B5CF6', marginTop: 4, fontWeight: 600 }}>{countdown(unlockDate)}</p>
      )}
      {isUnlocked && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
          <CheckCircle size={10} color="#06B6D4" />
          <span style={{ fontSize: 10, color: '#06B6D4', fontWeight: 600 }}>Débloquée</span>
        </div>
      )}
    </>
  )

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      style={{ display: 'flex', alignItems: 'center', gap: 16, position: 'relative' }}
    >
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
        {index % 2 === 0 ? (
          <motion.div onClick={() => navigate(`/capsule/${capsule.id}`)} whileTap={{ scale: 0.97 }} style={cardStyle}>
            {cardContent}
          </motion.div>
        ) : <div />}
      </div>

      {/* Center node */}
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.08 + 0.1, type: 'spring' }}
          style={{
            width: 20, height: 20, borderRadius: '50%',
            background: accentColor,
            border: `3px solid #030712`,
            boxShadow: `0 0 ${isUnlocked ? 16 : 8}px ${accentColor}${isUnlocked ? '80' : '40'}`,
          }}
        />
      </div>

      <div style={{ flex: 1 }}>
        {index % 2 !== 0 ? (
          <motion.div onClick={() => navigate(`/capsule/${capsule.id}`)} whileTap={{ scale: 0.97 }} style={cardStyle}>
            {cardContent}
          </motion.div>
        ) : <div />}
      </div>
    </motion.div>
  )
}

function SectionLabel({ label, color }: { label: string; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0 4px' }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${color}40)` }} />
      <span style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${color}40)` }} />
    </div>
  )
}

export function Timeline() {
  const now = new Date()
  const [filterYear, setFilterYear] = useState(2028)

  const { past, today, future } = useMemo(() => {
    const filtered = mockCapsules.filter(c => {
      const d = getUnlockDate(c)
      return !d || d.getFullYear() <= filterYear
    })
    const past: Capsule[] = []
    const today: Capsule[] = []
    const future: Capsule[] = []
    for (const c of filtered) {
      if (c.status === 'unlocked') { past.push(c); continue }
      const d = getUnlockDate(c)
      if (!d || d < now) { past.push(c); continue }
      if (isToday(d)) { today.push(c); continue }
      future.push(c)
    }
    return { past, today, future }
  }, [filterYear])

  const allSections: { label: string; items: Capsule[]; period: 'past' | 'today' | 'future'; color: string }[] = [
    { label: 'Passé', items: past, period: 'past', color: '#06B6D4' },
    { label: "Aujourd'hui", items: today, period: 'today', color: '#7C3AED' },
    { label: 'Futur', items: future, period: 'future', color: '#8B5CF6' },
  ]

  let nodeIndex = 0

  return (
    <div style={{ minHeight: '100vh', background: 'transparent', paddingBottom: 100 }} className="page-content">
      {/* Header */}
      <div style={{ padding: '56px 20px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
          <Clock size={22} color="#7C3AED" />
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#F8FAFC' }}>Voyage dans le temps</h1>
        </div>
        <p style={{ fontSize: 13, color: 'rgba(248,250,252,0.45)' }}>Toutes tes capsules sur la ligne du temps</p>
      </div>

      {/* Date filter */}
      <div style={{ padding: '0 20px 24px' }}>
        <div style={{ background: '#1E293B', borderRadius: 16, padding: '16px 18px', border: '1px solid rgba(124,58,237,0.15)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 12, color: 'rgba(248,250,252,0.5)', fontWeight: 600 }}>Voyager jusqu'à</span>
            <span style={{ fontSize: 13, color: '#7C3AED', fontWeight: 700 }}>{filterYear}</span>
          </div>
          <input
            type="range" min={2025} max={2030} value={filterYear}
            onChange={e => setFilterYear(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#7C3AED', cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <span style={{ fontSize: 10, color: 'rgba(248,250,252,0.3)' }}>2025</span>
            <span style={{ fontSize: 10, color: 'rgba(248,250,252,0.3)' }}>2030</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ padding: '0 16px', position: 'relative' }}>
        <div style={{
          position: 'absolute', left: '50%', top: 0, bottom: 0,
          width: 2, transform: 'translateX(-50%)',
          background: 'linear-gradient(to bottom, #7C3AED, #8B5CF6, #06B6D4)',
          opacity: 0.4,
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {allSections.map(section => (
            section.items.length > 0 && (
              <div key={section.label}>
                <div style={{ position: 'relative', zIndex: 3, padding: '0 0 8px' }}>
                  <SectionLabel label={section.label} color={section.color} />
                </div>
                {section.items.map(capsule => {
                  const idx = nodeIndex++
                  return (
                    <div key={capsule.id} style={{ marginBottom: 12 }}>
                      <CapsuleNode capsule={capsule} index={idx} period={section.period} />
                    </div>
                  )
                })}
              </div>
            )
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
