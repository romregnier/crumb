import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, Lock, Calendar, MapPin, Puzzle, Share2 } from 'lucide-react'
import { mockCapsules } from '../mocks/data'

function Countdown({ date }: { date: string }) {
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const update = () => {
      const diff = new Date(date).getTime() - Date.now()
      if (diff <= 0) { setTimeLeft('00:00:00'); return }
      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff % 86400000) / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setTimeLeft(`${d}j ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`)
    }
    update()
    const t = setInterval(update, 1000)
    return () => clearInterval(t)
  }, [date])

  return (
    <div style={{ textAlign: 'center', padding: '24px 0' }}>
      <p style={{ fontSize: 11, color: 'rgba(240,234,245,0.4)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 2 }}>
        Débloqué dans
      </p>
      <motion.p
        animate={{ opacity: [1, 0.7, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        style={{ fontSize: 36, fontWeight: 700, color: '#7C3AED', fontVariantNumeric: 'tabular-nums', letterSpacing: -1 }}
      >
        {timeLeft}
      </motion.p>
    </div>
  )
}

export function CapsuleDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const capsule = mockCapsules.find(c => c.id === id)
  const [revealed, setRevealed] = useState(false)

  if (!capsule) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#F8FAFC' }}>
        Capsule introuvable
      </div>
    )
  }

  const ConditionIcon = capsule.unlockCondition.type === 'date' ? Calendar
    : capsule.unlockCondition.type === 'location' ? MapPin : Puzzle

  const iconColor = capsule.unlockCondition.type === 'date' ? '#7C3AED'
    : capsule.unlockCondition.type === 'location' ? '#06B6D4' : '#8B5CF6'

  return (
    <div style={{ minHeight: '100vh', background: '#030712' }}>
      {/* Hero / image area */}
      <div style={{ position: 'relative', height: 320 }}>
        {capsule.image ? (
          <img src={capsule.image} alt={capsule.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: 'linear-gradient(135deg, #1E293B, #0D1B2A)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80,
          }}>📦</div>
        )}

        {/* Blur overlay for locked */}
        {capsule.status === 'locked' && !revealed && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(10,10,15,0.7)',
            backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Lock size={56} color="#7C3AED" strokeWidth={1.5} />
            </motion.div>
          </div>
        )}

        {/* Gradient bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
          background: 'linear-gradient(to bottom, transparent, #030712)',
        }}/>

        {/* Back button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute', top: 52, left: 20,
            background: 'rgba(10,10,15,0.7)', backdropFilter: 'blur(8px)',
            border: 'none', borderRadius: 12, padding: 10, cursor: 'pointer',
          }}
        >
          <ChevronLeft size={20} color="#F8FAFC" />
        </motion.button>

        {/* Share */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          style={{
            position: 'absolute', top: 52, right: 20,
            background: 'rgba(10,10,15,0.7)', backdropFilter: 'blur(8px)',
            border: 'none', borderRadius: 12, padding: 10, cursor: 'pointer',
          }}
        >
          <Share2 size={20} color="#F8FAFC" />
        </motion.button>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 20px 40px' }}>
        {/* Author + status */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: capsule.author.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700, color: '#fff',
            }}>
              {capsule.author.initials}
            </div>
            <span style={{ fontSize: 13, color: 'rgba(240,234,245,0.6)' }}>par {capsule.author.name}</span>
          </div>
          <div style={{
            background: capsule.status === 'unlocked' ? '#06B6D420' : '#7C3AED20',
            borderRadius: 8, padding: '4px 10px',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            {capsule.status === 'locked' ? <Lock size={12} color="#7C3AED" /> : <span style={{ fontSize: 12 }}>✓</span>}
            <span style={{ fontSize: 11, color: capsule.status === 'unlocked' ? '#06B6D4' : '#7C3AED', fontWeight: 600 }}>
              {capsule.status === 'locked' ? 'Verrouillé' : 'Débloqué'}
            </span>
          </div>
        </div>

        <h1 style={{ fontSize: 26, fontWeight: 700, color: '#F8FAFC', marginBottom: 8, lineHeight: 1.2 }}>
          {capsule.title}
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(240,234,245,0.55)', lineHeight: 1.6, marginBottom: 20 }}>
          {capsule.description}
        </p>

        {/* Condition */}
        <div style={{
          background: '#0F172A',
          borderRadius: 16, padding: '16px 18px',
          display: 'flex', alignItems: 'center', gap: 14,
          marginBottom: 20,
          border: `1px solid ${iconColor}30`,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: `${iconColor}20`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <ConditionIcon size={22} color={iconColor} />
          </div>
          <div>
            <p style={{ fontSize: 11, color: 'rgba(240,234,245,0.4)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>
              Condition de déblocage
            </p>
            <p style={{ fontSize: 14, fontWeight: 600, color: '#F8FAFC' }}>
              {capsule.unlockCondition.label}
            </p>
          </div>
        </div>

        {/* Locked state */}
        <AnimatePresence mode="wait">
          {capsule.status === 'locked' && !revealed && (
            <motion.div
              key="locked"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {capsule.unlockCondition.type === 'date' && capsule.unlockCondition.date && (
                <div style={{ background: '#0F172A', borderRadius: 16, marginBottom: 20 }}>
                  <Countdown date={capsule.unlockCondition.date} />
                </div>
              )}
              {capsule.unlockCondition.type === 'location' && (
                <div style={{
                  background: 'radial-gradient(circle at 50% 50%, #0D1B2A 0%, #030712 100%)',
                  borderRadius: 16, height: 140, marginBottom: 20,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid rgba(0,201,167,0.2)', position: 'relative', overflow: 'hidden',
                }}>
                  <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.1 }}>
                    {[0,35,70,105].map(y => <line key={y} x1="0" y1={y} x2="430" y2={y} stroke="#F8FAFC" strokeWidth="0.5"/>)}
                    {[0,60,120,180,240,300,360,420].map(x => <line key={x} x1={x} y1="0" x2={x} y2="140" stroke="#F8FAFC" strokeWidth="0.5"/>)}
                  </svg>
                  <MapPin size={36} color="#06B6D4" />
                  <p style={{ position: 'absolute', bottom: 12, fontSize: 12, color: 'rgba(240,234,245,0.5)' }}>
                    {capsule.unlockCondition.location?.name}
                  </p>
                </div>
              )}
              {capsule.unlockCondition.type === 'fragments' && (
                <div style={{ background: '#0F172A', borderRadius: 16, padding: 20, marginBottom: 20 }}>
                  <p style={{ fontSize: 13, color: 'rgba(240,234,245,0.5)', marginBottom: 12 }}>Progression</p>
                  <div style={{ background: '#030712', borderRadius: 8, height: 8, overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(capsule.unlockCondition.fragmentsCollected! / capsule.unlockCondition.fragmentsTotal!) * 100}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      style={{ height: '100%', background: 'linear-gradient(to right, #8B5CF6, #A688FA)', borderRadius: 8 }}
                    />
                  </div>
                  <p style={{ fontSize: 12, color: '#8B5CF6', marginTop: 8, fontWeight: 600 }}>
                    {capsule.unlockCondition.fragmentsCollected}/{capsule.unlockCondition.fragmentsTotal} fragments collectés
                  </p>
                </div>
              )}
              {/* Demo unlock button */}
              <motion.button
                onClick={() => setRevealed(true)}
                whileTap={{ scale: 0.97 }}
                style={{
                  width: '100%', background: '#1E293B',
                  border: '1px dashed rgba(255,107,53,0.3)',
                  borderRadius: 16, padding: '16px',
                  fontSize: 14, color: 'rgba(240,234,245,0.4)',
                  cursor: 'pointer',
                }}
              >
                🔓 Démo: simuler le déblocage
              </motion.button>
            </motion.div>
          )}

          {(capsule.status === 'unlocked' || revealed) && (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <div style={{
                background: 'linear-gradient(135deg, #06B6D415, #8B5CF610)',
                border: '1px solid rgba(0,201,167,0.2)',
                borderRadius: 20, padding: '20px',
                marginBottom: 16,
              }}>
                <p style={{ fontSize: 12, color: '#06B6D4', fontWeight: 600, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
                  ✨ Contenu révélé
                </p>
                <p style={{ fontSize: 15, color: '#F8FAFC', lineHeight: 1.7 }}>
                  {capsule.content || capsule.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
