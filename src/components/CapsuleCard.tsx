import { motion } from 'framer-motion'
import { Lock, Calendar, MapPin, Puzzle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { Capsule } from '../mocks/data'

function getCountdown(dateStr?: string): string {
  if (!dateStr) return ''
  const target = new Date(dateStr).getTime()
  const now = Date.now()
  const diff = target - now
  if (diff <= 0) return 'Débloqué!'
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  if (days > 0) return `${days}j ${hours}h`
  return `${hours}h`
}

function TypeIcon({ type }: { type: Capsule['unlockCondition']['type'] }) {
  const props = { size: 14, strokeWidth: 2 }
  if (type === 'date') return <Calendar {...props} color="#FF6B35" />
  if (type === 'location') return <MapPin {...props} color="#00C9A7" />
  return <Puzzle {...props} color="#7B61FF" />
}

interface Props {
  capsule: Capsule
  variant?: 'default' | 'compact'
}

export function CapsuleCard({ capsule, variant = 'default' }: Props) {
  const navigate = useNavigate()

  return (
    <motion.div
      onClick={() => navigate(`/capsule/${capsule.id}`)}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: '#1E1C28',
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        flexShrink: 0,
        width: variant === 'compact' ? 200 : '100%',
        border: '1px solid rgba(240,234,245,0.06)',
      }}
    >
      {capsule.image && (
        <div style={{ position: 'relative', height: variant === 'compact' ? 110 : 140 }}>
          <img
            src={capsule.image}
            alt={capsule.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {capsule.status === 'locked' && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(10,10,15,0.6)',
              backdropFilter: 'blur(4px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Lock size={28} color="#FF6B35" />
            </div>
          )}
        </div>
      )}
      <div style={{ padding: '12px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#F0EAF5', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {capsule.title}
          </span>
          {capsule.status === 'locked' && !capsule.image && <Lock size={14} color="#FF6B35" />}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <TypeIcon type={capsule.unlockCondition.type} />
          <span style={{ fontSize: 11, color: 'rgba(240,234,245,0.5)' }}>
            {capsule.status === 'locked'
              ? capsule.unlockCondition.type === 'date'
                ? getCountdown(capsule.unlockCondition.date)
                : capsule.unlockCondition.label
              : 'Débloqué ✓'}
          </span>
          {capsule.distance && (
            <>
              <span style={{ color: 'rgba(240,234,245,0.2)', fontSize: 11 }}>·</span>
              <span style={{ fontSize: 11, color: 'rgba(240,234,245,0.4)' }}>{capsule.distance}</span>
            </>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
          <div style={{
            width: 20, height: 20, borderRadius: '50%',
            background: capsule.author.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 9, fontWeight: 700, color: '#fff',
          }}>
            {capsule.author.initials}
          </div>
          <span style={{ fontSize: 11, color: 'rgba(240,234,245,0.4)' }}>{capsule.author.name}</span>
        </div>
      </div>
    </motion.div>
  )
}
