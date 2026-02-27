import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Image, Mic, Type, Video, Lock, User, Users, Globe, ChevronLeft, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { BottomNav } from '../components/BottomNav'

const steps = ['Contenu', 'Déblocage', 'Audience', 'Résumé']

export function Create() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [selectedContent, setSelectedContent] = useState<string | null>(null)
  const [selectedUnlock, setSelectedUnlock] = useState<string | null>(null)
  const [selectedAudience, setSelectedAudience] = useState<string | null>(null)
  const [sealed, setSealed] = useState(false)

  const canNext = step === 0 ? !!selectedContent : step === 1 ? !!selectedUnlock : step === 2 ? !!selectedAudience : false

  const contentTypes = [
    { id: 'image', label: 'Photo', icon: Image, color: '#FF6B35' },
    { id: 'video', label: 'Vidéo', icon: Video, color: '#7B61FF' },
    { id: 'voice', label: 'Vocal', icon: Mic, color: '#00C9A7' },
    { id: 'text', label: 'Texte', icon: Type, color: '#FFD166' },
  ]

  const unlockTypes = [
    { id: 'date', label: 'Date', sublabel: 'Se débloque à une date précise', icon: '📅', color: '#FF6B35' },
    { id: 'location', label: 'Lieu', sublabel: 'Se débloque à un endroit précis', icon: '📍', color: '#00C9A7' },
    { id: 'fragments', label: 'Multi-fragments', sublabel: 'Collecte plusieurs morceaux', icon: '🧩', color: '#7B61FF' },
  ]

  const audienceTypes = [
    { id: 'private', label: 'Privé', sublabel: 'Visible uniquement par toi', icon: Lock, color: '#F0EAF5' },
    { id: 'person', label: 'Une personne', sublabel: 'Envoie à quelqu\'un de précis', icon: User, color: '#FF6B35' },
    { id: 'group', label: 'Groupe', sublabel: 'Pour plusieurs personnes', icon: Users, color: '#7B61FF' },
    { id: 'public', label: 'Public', sublabel: 'Visible par tous', icon: Globe, color: '#00C9A7' },
  ]

  if (sealed) {
    return (
      <div style={{ minHeight: '100vh', background: '#0A0A0F', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 12 }}
          style={{ fontSize: 80, marginBottom: 24 }}
        >
          📦
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ fontSize: 28, fontWeight: 700, color: '#F0EAF5', textAlign: 'center', marginBottom: 12 }}>
          Capsule scellée !
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          style={{ fontSize: 15, color: 'rgba(240,234,245,0.55)', textAlign: 'center', lineHeight: 1.6, marginBottom: 40 }}>
          Ta capsule est désormais en sécurité, attendant d'être découverte. ✨
        </motion.p>
        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
          onClick={() => navigate('/')}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'linear-gradient(135deg, #FF6B35, #FF8F5E)',
            border: 'none', borderRadius: 16, padding: '16px 40px',
            fontSize: 16, fontWeight: 700, color: '#fff', cursor: 'pointer',
            boxShadow: '0 8px 30px rgba(255,107,53,0.4)',
          }}
        >
          Retour à l'accueil
        </motion.button>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0F', paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ padding: '56px 20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => step > 0 ? setStep(step - 1) : navigate(-1)}
          style={{ background: '#1E1C28', border: 'none', borderRadius: 12, padding: 10, cursor: 'pointer' }}
        >
          <ChevronLeft size={20} color="#F0EAF5" />
        </motion.button>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#F0EAF5' }}>Nouvelle capsule</h1>
          <p style={{ fontSize: 12, color: 'rgba(240,234,245,0.45)', marginTop: 2 }}>Étape {step + 1} sur {steps.length}</p>
        </div>
      </div>

      {/* Stepper */}
      <div style={{ padding: '0 20px 28px', display: 'flex', gap: 8 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ flex: 1 }}>
            <motion.div
              animate={{ background: i <= step ? '#FF6B35' : '#1E1C28' }}
              style={{ height: 4, borderRadius: 2 }}
            />
            <p style={{ fontSize: 10, color: i <= step ? '#FF6B35' : 'rgba(240,234,245,0.3)', marginTop: 6, fontWeight: i === step ? 600 : 400 }}>
              {s}
            </p>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.25 }}
          style={{ padding: '0 20px' }}
        >
          {/* Step 0: Content */}
          {step === 0 && (
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F0EAF5', marginBottom: 8 }}>Quel contenu ?</h2>
              <p style={{ fontSize: 14, color: 'rgba(240,234,245,0.5)', marginBottom: 24 }}>Choisis le type de souvenir que tu veux capsulé</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {contentTypes.map((ct) => {
                  const Icon = ct.icon
                  const selected = selectedContent === ct.id
                  return (
                    <motion.button
                      key={ct.id}
                      onClick={() => setSelectedContent(ct.id)}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        background: selected ? `${ct.color}20` : '#1E1C28',
                        border: `2px solid ${selected ? ct.color : 'rgba(240,234,245,0.06)'}`,
                        borderRadius: 20, padding: '24px 16px',
                        cursor: 'pointer', display: 'flex', flexDirection: 'column',
                        alignItems: 'center', gap: 12,
                      }}
                    >
                      <div style={{
                        width: 52, height: 52, borderRadius: 16,
                        background: `${ct.color}25`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon size={24} color={ct.color} />
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 600, color: selected ? ct.color : '#F0EAF5' }}>
                        {ct.label}
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 1: Unlock */}
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F0EAF5', marginBottom: 8 }}>Condition de déblocage</h2>
              <p style={{ fontSize: 14, color: 'rgba(240,234,245,0.5)', marginBottom: 24 }}>Comment ta capsule sera-t-elle révélée ?</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {unlockTypes.map((ut) => {
                  const selected = selectedUnlock === ut.id
                  return (
                    <motion.button
                      key={ut.id}
                      onClick={() => setSelectedUnlock(ut.id)}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        background: selected ? `${ut.color}15` : '#1E1C28',
                        border: `2px solid ${selected ? ut.color : 'rgba(240,234,245,0.06)'}`,
                        borderRadius: 18, padding: '18px 20px',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16,
                        textAlign: 'left',
                      }}
                    >
                      <span style={{ fontSize: 32 }}>{ut.icon}</span>
                      <div>
                        <p style={{ fontSize: 16, fontWeight: 600, color: selected ? ut.color : '#F0EAF5' }}>{ut.label}</p>
                        <p style={{ fontSize: 12, color: 'rgba(240,234,245,0.45)', marginTop: 2 }}>{ut.sublabel}</p>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 2: Audience */}
          {step === 2 && (
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F0EAF5', marginBottom: 8 }}>Pour qui ?</h2>
              <p style={{ fontSize: 14, color: 'rgba(240,234,245,0.5)', marginBottom: 24 }}>Définis l'audience de ta capsule</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {audienceTypes.map((at) => {
                  const Icon = at.icon
                  const selected = selectedAudience === at.id
                  return (
                    <motion.button
                      key={at.id}
                      onClick={() => setSelectedAudience(at.id)}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        background: selected ? `${at.color}15` : '#1E1C28',
                        border: `2px solid ${selected ? at.color : 'rgba(240,234,245,0.06)'}`,
                        borderRadius: 18, padding: '16px 20px',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14,
                        textAlign: 'left',
                      }}
                    >
                      <div style={{
                        width: 42, height: 42, borderRadius: 12,
                        background: `${at.color}20`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <Icon size={20} color={at.color} />
                      </div>
                      <div>
                        <p style={{ fontSize: 15, fontWeight: 600, color: selected ? at.color : '#F0EAF5' }}>{at.label}</p>
                        <p style={{ fontSize: 12, color: 'rgba(240,234,245,0.45)', marginTop: 2 }}>{at.sublabel}</p>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 3: Summary */}
          {step === 3 && (
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F0EAF5', marginBottom: 8 }}>Résumé</h2>
              <p style={{ fontSize: 14, color: 'rgba(240,234,245,0.5)', marginBottom: 24 }}>Vérifie ta capsule avant de la sceller</p>
              <div style={{ background: '#1E1C28', borderRadius: 20, padding: 20, border: '1px solid rgba(255,107,53,0.2)' }}>
                <div style={{ fontSize: 48, textAlign: 'center', marginBottom: 16 }}>📦</div>
                {[
                  { label: 'Contenu', value: selectedContent },
                  { label: 'Déblocage', value: selectedUnlock },
                  { label: 'Audience', value: selectedAudience },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(240,234,245,0.06)' }}>
                    <span style={{ fontSize: 13, color: 'rgba(240,234,245,0.5)' }}>{label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#FF6B35', textTransform: 'capitalize' }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* CTA */}
      <div style={{ padding: '32px 20px 0' }}>
        {step < 3 ? (
          <motion.button
            onClick={() => setStep(step + 1)}
            disabled={!canNext}
            whileTap={{ scale: 0.97 }}
            style={{
              width: '100%',
              background: canNext ? 'linear-gradient(135deg, #FF6B35, #FF8F5E)' : '#1E1C28',
              border: 'none', borderRadius: 16, padding: '18px',
              fontSize: 16, fontWeight: 700,
              color: canNext ? '#fff' : 'rgba(240,234,245,0.3)',
              cursor: canNext ? 'pointer' : 'not-allowed',
              boxShadow: canNext ? '0 8px 30px rgba(255,107,53,0.3)' : 'none',
              transition: 'all 0.3s',
            }}
          >
            Continuer →
          </motion.button>
        ) : (
          <motion.button
            onClick={() => setSealed(true)}
            whileTap={{ scale: 0.97 }}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #FF6B35, #FF8F5E)',
              border: 'none', borderRadius: 16, padding: '18px',
              fontSize: 16, fontWeight: 700, color: '#fff', cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(255,107,53,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            }}
          >
            <Sparkles size={20} /> Sceller la capsule ✨
          </motion.button>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
