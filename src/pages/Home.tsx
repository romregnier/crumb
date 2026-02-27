import { motion } from 'framer-motion'
import { Bell, Rocket, Star, Zap } from 'lucide-react'
import { mockCapsules, currentUser } from '../mocks/data'
import { CapsuleCard } from '../components/CapsuleCard'
import { BottomNav } from '../components/BottomNav'
import { useNavigate } from 'react-router-dom'

const locked = mockCapsules.filter(c => c.status === 'locked').slice(0, 3)
const unlocked = mockCapsules.filter(c => c.status === 'unlocked').slice(0, 2)

const features = [
  { icon: '📦', title: 'Capsule temporelle', desc: 'Scelle tes souvenirs et retrouve-les plus tard', color: '#7C3AED' },
  { icon: '📍', title: 'Ancré dans l\'espace', desc: 'Lie tes capsules à des lieux magiques', color: '#06B6D4' },
  { icon: '🧩', title: 'Multi-fragments', desc: 'Collecte des pièces cachées dans la réalité', color: '#8B5CF6' },
]

export function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ paddingBottom: 90, minHeight: '100vh', background: 'transparent' }} className="page-content">
      {/* Mobile Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '56px 20px 16px',
      }} className="md-hide">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/logo-gradient.png" alt="Crumb" style={{ width: 30, height: 30, objectFit: 'contain' }} />
          <span style={{
            fontSize: 22, fontWeight: 800,
            background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>crumb</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <motion.button
            whileTap={{ scale: 0.9 }}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <Bell size={22} color="rgba(248,250,252,0.6)" />
          </motion.button>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'pointer',
          }}>
            {currentUser.initials}
          </div>
        </div>
      </div>

      {/* Desktop: two-column hero layout */}
      <div style={{ display: 'none' }} className="home-desktop-wrapper">
        {/* Hidden on mobile, shown on desktop via class */}
      </div>

      {/* Main content — responsive grid */}
      <div style={{ padding: '0 20px' }}>
        {/* Desktop hero (hidden on mobile via inline + CSS) */}
        <style>{`
          @media (min-width: 768px) {
            .home-mobile-header { display: none !important; }
            .home-desktop-hero { display: grid !important; }
            .home-main-padding { padding: 40px 40px 0 !important; max-width: none !important; }
            .home-content-grid { display: grid !important; grid-template-columns: 1fr 1fr; gap: 60px; max-width: 1200px; margin: 0 auto; padding: 60px 40px 0; }
            .home-right-col { display: flex !important; }
            .home-capsules-section { padding: 0 40px !important; max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
            .home-map-card { margin: 40px !important; max-width: none !important; }
          }
          @media (max-width: 767px) {
            .home-right-col { display: none !important; }
          }
        `}</style>

        {/* Desktop hero section */}
        <div className="home-content-grid" style={{ display: 'none' }}>
          {/* Left: hero text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginBottom: 32 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {currentUser.initials}
                </div>
                <div>
                  <p style={{ fontSize: 14, color: '#94A3B8' }}>Bonjour,</p>
                  <p style={{ fontSize: 18, fontWeight: 700, color: '#F8FAFC' }}>{currentUser.name} 👋</p>
                </div>
              </div>
              <h1 style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.15, color: '#F8FAFC', marginBottom: 16 }}>
                Capsule tes{' '}
                <span style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  souvenirs
                </span>{' '}
                dans l'univers
              </h1>
              <p style={{ fontSize: 16, color: '#94A3B8', lineHeight: 1.7, marginBottom: 32 }}>
                Crée des capsules temporelles liées à des lieux, des dates, ou des personnes. Tes souvenirs voyagent dans le temps.
              </p>
              <div style={{ display: 'flex', gap: 16 }}>
                <motion.button
                  onClick={() => navigate('/create')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
                    border: 'none', borderRadius: 14, padding: '14px 28px',
                    fontSize: 15, fontWeight: 700, color: '#fff', cursor: 'pointer',
                    boxShadow: '0 8px 30px rgba(124,58,237,0.4)',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}
                >
                  <Rocket size={18} />
                  Créer une capsule
                </motion.button>
                <motion.button
                  onClick={() => navigate('/timeline')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: 'rgba(124,58,237,0.1)',
                    border: '1px solid rgba(124,58,237,0.3)',
                    borderRadius: 14, padding: '14px 28px',
                    fontSize: 15, fontWeight: 600, color: '#7C3AED', cursor: 'pointer',
                  }}
                >
                  Mes capsules
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Right: feature cards */}
          <div className="home-right-col" style={{ flexDirection: 'column', gap: 16 }}>
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: '#0F172A',
                  border: `1px solid ${f.color}25`,
                  borderRadius: 16,
                  padding: '20px 24px',
                  display: 'flex', alignItems: 'center', gap: 16,
                }}
              >
                <div style={{ fontSize: 32, width: 56, height: 56, borderRadius: 14, background: `${f.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {f.icon}
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: '#F8FAFC', marginBottom: 4 }}>{f.title}</p>
                  <p style={{ fontSize: 13, color: '#94A3B8' }}>{f.desc}</p>
                </div>
              </motion.div>
            ))}
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginTop: 8 }}>
              {[
                { n: currentUser.capsulesCréées, label: 'Créées', icon: Star },
                { n: currentUser.capsulesDebloquees, label: 'Débloquées', icon: Zap },
                { n: currentUser.capsulesRecues, label: 'Reçues', icon: Rocket },
              ].map(({ n, label, icon: Icon }) => (
                <div key={label} style={{ background: '#0F172A', borderRadius: 12, padding: '16px 12px', textAlign: 'center', border: '1px solid rgba(124,58,237,0.1)' }}>
                  <Icon size={16} color="#7C3AED" style={{ margin: '0 auto 8px' }} />
                  <p style={{ fontSize: 22, fontWeight: 800, color: '#F8FAFC' }}>{n}</p>
                  <p style={{ fontSize: 11, color: '#94A3B8' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Map Preview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="home-map-card"
        style={{
          margin: '0 20px 24px',
          borderRadius: 20,
          overflow: 'hidden',
          height: 160,
          position: 'relative',
          background: 'linear-gradient(135deg, #0F172A 0%, #030712 50%, #0F172A 100%)',
          border: '1px solid rgba(124,58,237,0.2)',
          cursor: 'pointer',
        }}
        onClick={() => navigate('/explore')}
      >
        {/* Nebula gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 30% 50%, rgba(124,58,237,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(6,182,212,0.1) 0%, transparent 60%)',
        }} />
        {/* Grid lines */}
        <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.1 }}>
          {[0, 40, 80, 120].map(y => <line key={y} x1="0" y1={y} x2="430" y2={y} stroke="#F8FAFC" strokeWidth="0.5"/>)}
          {[0, 50, 100, 150, 200, 250, 300, 350, 400].map(x => <line key={x} x1={x} y1="0" x2={x} y2="160" stroke="#F8FAFC" strokeWidth="0.5"/>)}
        </svg>
        {/* Markers */}
        {[{x: '30%', y: '40%', c: '#7C3AED'}, {x: '60%', y: '60%', c: '#06B6D4'}, {x: '75%', y: '25%', c: '#8B5CF6'}].map((m, i) => (
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
          background: 'rgba(3,7,18,0.8)', backdropFilter: 'blur(8px)',
          borderRadius: 10, padding: '6px 12px',
        }}>
          <span style={{ fontSize: 12, color: '#F8FAFC', fontWeight: 500 }}>
            🌌 <strong style={{ color: '#7C3AED' }}>8</strong> capsules près de toi
          </span>
        </div>
      </motion.div>

      {/* Capsules à débloquer */}
      <div style={{ padding: '0 20px', marginBottom: 24 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: '#F8FAFC', marginBottom: 14 }}>
          ⏳ Capsules à débloquer
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }} className="capsule-grid">
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
        <h2 style={{ fontSize: 17, fontWeight: 700, color: '#F8FAFC', marginBottom: 14 }}>
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
