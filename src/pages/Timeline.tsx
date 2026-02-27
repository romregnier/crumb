import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
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

// Vertical time-travel scrubber
function TimeScrubber({ onDrag }: { onDrag: (offset: number) => void }) {
  const thumbY = useMotionValue(0)
  const springThumbY = useSpring(thumbY, { stiffness: 300, damping: 30 })
  const timeOffset = useTransform(springThumbY, [-78, 0, 78], [100, 0, -100])
  const [isDragging, setIsDragging] = useState(false)
  const [currentOffset, setCurrentOffset] = useState(0)

  useEffect(() => {
    const unsubscribe = timeOffset.on('change', (val) => {
      setCurrentOffset(val)
      onDrag(val)
    })
    return unsubscribe
  }, [timeOffset, onDrag])

  const thumbColor = currentOffset > 20 ? '#8B5CF6' : currentOffset < -20 ? '#06B6D4' : '#FFFFFF'

  return (
    <div style={{
      position: 'fixed',
      left: 12,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      userSelect: 'none',
    }}>
      {/* Futur label */}
      <span style={{ fontSize: 9, color: 'rgba(248,250,252,0.5)', fontWeight: 600, letterSpacing: '0.05em' }}>Futur ↑</span>

      {/* Track */}
      <div style={{
        width: 36,
        height: 200,
        borderRadius: 18,
        background: 'linear-gradient(to bottom, #8B5CF6, #7C3AED, #06B6D4)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
      }}>
        {/* Center today marker */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 20,
          height: 2,
          background: 'rgba(255,255,255,0.4)',
          borderRadius: 1,
          zIndex: 1,
        }} />

        {/* Draggable thumb */}
        <motion.div
          drag="y"
          dragConstraints={{ top: -78, bottom: 78 }}
          dragElastic={0.3}
          style={{
            width: 28,
            height: 44,
            borderRadius: 14,
            background: thumbColor,
            boxShadow: `0 4px 16px rgba(0,0,0,0.5), 0 0 12px ${thumbColor}80`,
            cursor: 'grab',
            y: springThumbY,
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
          }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => {
            setIsDragging(false)
            thumbY.set(0)
          }}
          whileDrag={{ cursor: 'grabbing' }}
        >
          <div style={{
            width: 16,
            height: 2,
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 1,
            boxShadow: '0 3px 0 rgba(0,0,0,0.2)',
          }} />
        </motion.div>
      </div>

      {/* Passé label */}
      <span style={{ fontSize: 9, color: 'rgba(248,250,252,0.5)', fontWeight: 600, letterSpacing: '0.05em' }}>Passé ↓</span>

      {/* Dynamic label while dragging */}
      {isDragging && currentOffset > 20 && (
        <motion.span
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ fontSize: 9, color: '#8B5CF6', fontWeight: 700, marginTop: 2 }}
        >Futur ⏭</motion.span>
      )}
      {isDragging && currentOffset < -20 && (
        <motion.span
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ fontSize: 9, color: '#06B6D4', fontWeight: 700, marginTop: 2 }}
        >⏮ Passé</motion.span>
      )}
    </div>
  )
}

export function Timeline() {
  const now = new Date()
  const todayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const { past, today, future } = (() => {
    const past: Capsule[] = []
    const today: Capsule[] = []
    const future: Capsule[] = []
    for (const c of mockCapsules) {
      if (c.status === 'unlocked') { past.push(c); continue }
      const d = getUnlockDate(c)
      if (!d || d < now) { past.push(c); continue }
      if (isToday(d)) { today.push(c); continue }
      future.push(c)
    }
    return { past, today, future }
  })()

  const allSections: { label: string; items: Capsule[]; period: 'past' | 'today' | 'future'; color: string }[] = [
    { label: 'Passé', items: past, period: 'past', color: '#06B6D4' },
    { label: "Aujourd'hui", items: today, period: 'today', color: '#7C3AED' },
    { label: 'Futur', items: future, period: 'future', color: '#8B5CF6' },
  ]

  useEffect(() => {
    setTimeout(() => {
      todayRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 300)
  }, [])

  const handleScrubberDrag = (offset: number) => {
    if (!contentRef.current) return
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
    if (scrollHeight <= 0) return
    // offset: 100 = future (scroll down), -100 = past (scroll top)
    const targetRatio = (offset + 100) / 200 // 0=past top, 0.5=center, 1=future bottom
    const targetY = scrollHeight * targetRatio
    window.scrollTo({ top: targetY, behavior: 'smooth' })
  }

  let nodeIndex = 0

  return (
    <div style={{ minHeight: '100vh', background: 'transparent', paddingBottom: 100 }} className="page-content">
      {/* Time-travel scrubber */}
      <TimeScrubber onDrag={handleScrubberDrag} />

      {/* Header */}
      <div style={{ padding: '56px 20px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
          <Clock size={22} color="#7C3AED" />
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#F8FAFC' }}>Voyage dans le temps</h1>
        </div>
        <p style={{ fontSize: 13, color: 'rgba(248,250,252,0.45)' }}>Toutes tes capsules sur la ligne du temps</p>
      </div>

      {/* Timeline */}
      <div ref={contentRef} style={{ padding: '0 16px', position: 'relative' }}>
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
                <div
                  ref={section.period === 'today' ? todayRef : undefined}
                  style={{
                    position: 'relative', zIndex: 3, padding: '0 0 8px',
                    ...(section.period === 'today' ? {
                      background: 'rgba(124,58,237,0.08)',
                      borderRadius: 12,
                      border: '1px solid rgba(124,58,237,0.25)',
                      boxShadow: '0 0 20px rgba(124,58,237,0.15)',
                      padding: '8px 8px',
                      margin: '0 -8px',
                    } : {}),
                  }}
                >
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
