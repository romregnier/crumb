import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, ChevronDown, X, Lock, Calendar, MapPin, Puzzle } from 'lucide-react'
import { mockCapsules, type Capsule } from '../mocks/data'
import { useNavigate } from 'react-router-dom'
import { BottomNav } from '../components/BottomNav'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN as string

// Capsules with map positions
const capsulesWithPos: Array<Capsule & { lat: number; lng: number }> = [
  { ...mockCapsules[0], lat: 48.8566, lng: 2.3522 },
  { ...mockCapsules[1], lat: 48.8650, lng: 2.3290 },
  { ...mockCapsules[2], lat: 48.8842, lng: 2.3385 },
  { ...mockCapsules[4], lat: 48.8530, lng: 2.3499 },
  { ...mockCapsules[5], lat: 48.8867, lng: 2.3431 },
  { ...mockCapsules[6], lat: 48.8720, lng: 2.3600 },
  { ...mockCapsules[7], lat: 48.8600, lng: 2.3400 },
]

function TypeIcon({ type }: { type: Capsule['unlockCondition']['type'] }) {
  if (type === 'date') return <Calendar size={14} color="#7C3AED" />
  if (type === 'location') return <MapPin size={14} color="#06B6D4" />
  return <Puzzle size={14} color="#8B5CF6" />
}

function CapsuleMiniCard({ capsule, onClose }: { capsule: Capsule & { lat: number; lng: number }; onClose: () => void }) {
  const navigate = useNavigate()
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      style={{
        position: 'absolute',
        bottom: 140,
        left: 16,
        right: 16,
        background: '#0F172A',
        borderRadius: 18,
        border: '1px solid rgba(124,58,237,0.3)',
        padding: 16,
        zIndex: 500,
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
      }}
    >
      <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(248,250,252,0.1)', border: 'none', borderRadius: 8, padding: 6, cursor: 'pointer' }}>
        <X size={14} color="#F8FAFC" />
      </button>
      <div style={{ display: 'flex', gap: 14 }}>
        {capsule.image && (
          <div style={{ width: 64, height: 64, borderRadius: 12, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
            <img src={capsule.image} alt={capsule.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {capsule.status === 'locked' && (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(3,7,18,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Lock size={16} color="#7C3AED" />
              </div>
            )}
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#F8FAFC', marginBottom: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {capsule.title}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <TypeIcon type={capsule.unlockCondition.type} />
            <span style={{ fontSize: 12, color: '#94A3B8' }}>{capsule.unlockCondition.label}</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/capsule/${capsule.id}`)}
            style={{
              background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
              border: 'none', borderRadius: 10, padding: '8px 16px',
              fontSize: 12, fontWeight: 700, color: '#fff', cursor: 'pointer',
            }}
          >
            {capsule.status === 'locked' ? '🔒 Voir la capsule' : '✨ Ouvrir'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export function Explore() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [listOpen, setListOpen] = useState(false)
  const [selectedCapsule, setSelectedCapsule] = useState<(Capsule & { lat: number; lng: number }) | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (map.current || !mapContainer.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [2.3522, 48.8566],
      zoom: 12,
    })

    map.current.on('load', () => {
      // Add nebula-like overlay
      capsulesWithPos.forEach(capsule => {
        const color = capsule.unlockCondition.type === 'date' ? '#7C3AED'
          : capsule.unlockCondition.type === 'location' ? '#06B6D4' : '#8B5CF6'
        const isLocked = capsule.status === 'locked'

        // Create custom marker element
        const el = document.createElement('div')
        el.style.cssText = `
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: ${color};
          border: 3px solid rgba(255,255,255,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 18px;
          box-shadow: 0 0 20px ${color}80, 0 4px 12px rgba(0,0,0,0.4);
          transition: transform 0.2s;
          ${isLocked ? 'filter: brightness(0.75);' : ''}
        `
        el.textContent = isLocked ? '🔒' : '✨'
        el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.2)' })
        el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)' })
        el.addEventListener('click', () => {
          setSelectedCapsule(capsule)
          map.current?.flyTo({ center: [capsule.lng, capsule.lat], zoom: 14, duration: 800 })
        })

        new mapboxgl.Marker({ element: el })
          .setLngLat([capsule.lng, capsule.lat])
          .addTo(map.current!)
      })
    })

    return () => {
      map.current?.remove()
      map.current = null
    }
  }, [])

  return (
    <div style={{ height: '100vh', background: '#030712', position: 'relative', overflow: 'hidden' }} className="page-content">
      {/* Header overlay */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '56px 20px 16px',
        background: 'linear-gradient(to bottom, rgba(3,7,18,0.95) 0%, rgba(3,7,18,0) 100%)',
        pointerEvents: 'none',
      }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#F8FAFC' }}>Explorer</h1>
        <p style={{ fontSize: 13, color: 'rgba(248,250,252,0.5)', marginTop: 2 }}>🌌 Capsules dans le cosmos</p>
      </div>

      {/* Mapbox container */}
      <div ref={mapContainer} style={{ position: 'absolute', inset: 0, zIndex: 1 }} />

      {/* Capsule mini card popup */}
      <AnimatePresence>
        {selectedCapsule && (
          <CapsuleMiniCard capsule={selectedCapsule} onClose={() => setSelectedCapsule(null)} />
        )}
      </AnimatePresence>

      {/* Capsule list drawer */}
      <motion.div
        animate={{ y: listOpen ? 0 : 'calc(100% - 60px)' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        style={{
          position: 'absolute',
          bottom: 80,
          left: 0,
          right: 0,
          background: '#0F172A',
          borderRadius: '20px 20px 0 0',
          border: '1px solid rgba(124,58,237,0.2)',
          zIndex: 400,
          maxHeight: '60vh',
        }}
      >
        {/* Drag handle */}
        <div
          onClick={() => setListOpen(!listOpen)}
          style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
        >
          <div>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#F8FAFC' }}>
              {capsulesWithPos.length} capsules
            </span>
            <span style={{ fontSize: 12, color: '#94A3B8', marginLeft: 8 }}>dans cette zone</span>
          </div>
          {listOpen ? <ChevronDown size={20} color="#7C3AED" /> : <ChevronUp size={20} color="#7C3AED" />}
        </div>

        {/* List */}
        <div style={{ overflowY: 'auto', maxHeight: 'calc(60vh - 60px)', padding: '0 16px 16px' }}>
          {capsulesWithPos.map((c) => (
            <motion.div
              key={c.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedCapsule(c)
                setListOpen(false)
                map.current?.flyTo({ center: [c.lng, c.lat], zoom: 14, duration: 800 })
              }}
              style={{
                background: '#1E293B',
                borderRadius: 14,
                padding: '12px 14px',
                marginBottom: 10,
                border: '1px solid rgba(124,58,237,0.1)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              {c.image ? (
                <img src={c.image} alt={c.title} style={{ width: 44, height: 44, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
              ) : (
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(124,58,237,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 20 }}>
                  {c.status === 'locked' ? '🔒' : '✨'}
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#F8FAFC', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.title}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <TypeIcon type={c.unlockCondition.type} />
                  <span style={{ fontSize: 11, color: '#94A3B8' }}>{c.unlockCondition.label}</span>
                </div>
              </div>
              <div style={{
                padding: '4px 10px', borderRadius: 20,
                background: c.status === 'locked' ? 'rgba(124,58,237,0.15)' : 'rgba(6,182,212,0.15)',
                border: `1px solid ${c.status === 'locked' ? 'rgba(124,58,237,0.3)' : 'rgba(6,182,212,0.3)'}`,
              }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: c.status === 'locked' ? '#7C3AED' : '#06B6D4' }}>
                  {c.status === 'locked' ? '🔒' : '✓'}
                </span>
              </div>
            </motion.div>
          ))}

          {/* Create capsule here CTA */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/create')}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.1))',
              border: '1px dashed rgba(124,58,237,0.4)',
              borderRadius: 14, padding: '14px',
              fontSize: 13, fontWeight: 600, color: '#7C3AED', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            ✦ Créer une capsule ici
          </motion.button>
        </div>
      </motion.div>

      <BottomNav />
    </div>
  )
}
