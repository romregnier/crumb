import { useState, useRef, useCallback } from 'react'
import type { DragEvent } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion'
import { Image, Mic, Type, Video, Lock, User, Users, Globe, ChevronLeft, Sparkles, Square, Trash2, Play, Pause, Upload } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { BottomNav } from '../components/BottomNav'

const steps = ['Contenu', 'Déblocage', 'Audience', 'Résumé']

// ── Confetti ───────────────────────────────────────────────────────────────────
function Confetti() {
  const pieces = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ['#7C3AED', '#06B6D4', '#8B5CF6', '#0EA5E9', '#A78BFA'][Math.floor(Math.random() * 5)],
    delay: Math.random() * 0.5,
    duration: 1 + Math.random() * 1,
    size: 6 + Math.random() * 8,
  }))
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50, overflow: 'hidden' }}>
      {pieces.map(p => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{ y: '110vh', opacity: [1, 1, 0], rotate: 720 }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
          style={{ position: 'absolute', width: p.size, height: p.size, background: p.color, borderRadius: 2 }}
        />
      ))}
    </div>
  )
}

// ── AudioRecorder ──────────────────────────────────────────────────────────────
function AudioRecorder({ onSave }: { onSave: (url: string, duration: number) => void }) {
  const [state, setState] = useState<'idle' | 'recording' | 'done'>('idle')
  const [timer, setTimer] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [playing, setPlaying] = useState(false)
  const [savedDuration, setSavedDuration] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const startRecording = async () => {
    setError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mr = new MediaRecorder(stream)
      mediaRecorderRef.current = mr
      chunksRef.current = []
      mr.ondataavailable = e => chunksRef.current.push(e.data)
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(blob)
        setAudioUrl(url)
        setSavedDuration(timer)
        onSave(url, timer)
        stream.getTracks().forEach(t => t.stop())
        setState('done')
      }
      mr.start()
      setState('recording')
      setTimer(0)
      intervalRef.current = setInterval(() => {
        setTimer(t => {
          if (t >= 59) { stopRecording(); return 60 }
          return t + 1
        })
      }, 1000)
    } catch {
      setError("Autorisez l'accès au micro dans votre navigateur")
    }
  }

  const stopRecording = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    mediaRecorderRef.current?.stop()
  }

  const deleteRecording = () => { setAudioUrl(null); setState('idle'); setTimer(0) }
  const togglePlay = () => {
    if (!audioRef.current) return
    if (playing) { audioRef.current.pause(); setPlaying(false) }
    else { audioRef.current.play(); setPlaying(true) }
  }
  const fmt = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`

  if (error) return <div style={{ padding: '12px 16px', background: '#2A1C1C', borderRadius: 12, color: '#F87171', fontSize: 13 }}>{error}</div>

  if (state === 'done' && audioUrl) return (
    <div style={{ background: '#1E293B', borderRadius: 16, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, border: '1px solid rgba(6,182,212,0.25)' }}>
      <audio ref={audioRef} src={audioUrl} onEnded={() => setPlaying(false)} />
      <motion.button whileTap={{ scale: 0.9 }} onClick={togglePlay}
        style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(6,182,212,0.1)', border: '1px solid #06B6D4', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        {playing ? <Pause size={16} color="#06B6D4" /> : <Play size={16} color="#06B6D4" />}
      </motion.button>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#F8FAFC' }}>Audio enregistré</p>
        <p style={{ fontSize: 11, color: 'rgba(248,250,252,0.5)' }}>{fmt(savedDuration)}</p>
      </div>
      <motion.button whileTap={{ scale: 0.9 }} onClick={deleteRecording}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}>
        <Trash2 size={16} color="rgba(248,250,252,0.4)" />
      </motion.button>
    </div>
  )

  if (state === 'recording') return (
    <div style={{ background: '#1E293B', borderRadius: 16, padding: '14px 16px', border: '1px solid rgba(124,58,237,0.4)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 0.8, repeat: Infinity }}
          style={{ width: 10, height: 10, borderRadius: '50%', background: '#7C3AED' }} />
        <span style={{ fontSize: 13, color: '#7C3AED', fontWeight: 600 }}>Enregistrement... {fmt(timer)}</span>
        <motion.button whileTap={{ scale: 0.9 }} onClick={stopRecording}
          style={{ marginLeft: 'auto', background: 'rgba(124,58,237,0.2)', border: '1px solid #7C3AED', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Square size={12} color="#7C3AED" fill="#7C3AED" />
          <span style={{ fontSize: 12, color: '#7C3AED', fontWeight: 600 }}>Stop</span>
        </motion.button>
      </div>
      <div style={{ display: 'flex', gap: 3, alignItems: 'center', height: 32 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div key={i}
            animate={{ height: [4, 8 + Math.random() * 20, 4] }}
            transition={{ duration: 0.4 + Math.random() * 0.4, repeat: Infinity, delay: i * 0.05 }}
            style={{ flex: 1, background: 'linear-gradient(to top, #7C3AED, #06B6D4)', borderRadius: 2, minHeight: 4 }} />
        ))}
      </div>
    </div>
  )

  return (
    <motion.button whileTap={{ scale: 0.95 }} onClick={startRecording}
      style={{ width: '100%', background: '#1E293B', border: '1px dashed rgba(6,182,212,0.3)', borderRadius: 16, padding: '16px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
      <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(6,182,212,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Mic size={18} color="#06B6D4" />
      </div>
      <span style={{ fontSize: 14, color: 'rgba(248,250,252,0.7)', fontWeight: 500 }}>Ajouter un souvenir vocal</span>
    </motion.button>
  )
}

// ── VideoRecorder ──────────────────────────────────────────────────────────────
function VideoRecorder({ onSave }: { onSave: (url: string) => void }) {
  const [state, setState] = useState<'idle' | 'preview' | 'recording' | 'done'>('idle')
  const [timer, setTimer] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startPreview = async () => {
    setError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      streamRef.current = stream
      if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.play() }
      setState('preview')
    } catch {
      setError("Autorisez l'accès à la caméra dans votre navigateur")
    }
  }

  const stopRecording = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    mediaRecorderRef.current?.stop()
  }, [])

  const startRecording = () => {
    if (!streamRef.current) return
    chunksRef.current = []
    const mr = new MediaRecorder(streamRef.current)
    mediaRecorderRef.current = mr
    mr.ondataavailable = e => chunksRef.current.push(e.data)
    mr.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' })
      const url = URL.createObjectURL(blob)
      setVideoUrl(url)
      onSave(url)
      streamRef.current?.getTracks().forEach(t => t.stop())
      streamRef.current = null
      setState('done')
    }
    mr.start()
    setState('recording')
    setTimer(0)
    intervalRef.current = setInterval(() => {
      setTimer(t => { if (t >= 29) { stopRecording(); return 30 }; return t + 1 })
    }, 1000)
  }

  const deleteVideo = () => { setVideoUrl(null); setState('idle'); setTimer(0) }
  const fmt = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`

  if (error) return <div style={{ padding: '12px 16px', background: '#2A1C1C', borderRadius: 12, color: '#F87171', fontSize: 13 }}>{error}</div>

  if (state === 'done' && videoUrl) return (
    <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(124,58,237,0.3)', position: 'relative' }}>
      <video src={videoUrl} controls style={{ width: '100%', display: 'block', maxHeight: 220 }} />
      <motion.button whileTap={{ scale: 0.9 }} onClick={deleteVideo}
        style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: 8, padding: 8, cursor: 'pointer' }}>
        <Trash2 size={14} color="#fff" />
      </motion.button>
    </div>
  )

  if (state === 'preview' || state === 'recording') return (
    <div style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${state === 'recording' ? 'rgba(124,58,237,0.5)' : 'rgba(6,182,212,0.3)'}`, position: 'relative' }}>
      <video ref={videoRef} autoPlay muted playsInline style={{ width: '100%', display: 'block', maxHeight: 220, objectFit: 'cover' }} />
      <div style={{ position: 'absolute', bottom: 12, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 12 }}>
        {state === 'preview' ? (
          <motion.button whileTap={{ scale: 0.9 }} onClick={startRecording}
            style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', border: 'none', borderRadius: 50, width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 20px rgba(124,58,237,0.5)' }}>
            <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff' }} />
          </motion.button>
        ) : (
          <>
            <div style={{ background: 'rgba(0,0,0,0.6)', borderRadius: 20, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }}
                style={{ width: 8, height: 8, borderRadius: '50%', background: '#7C3AED' }} />
              <span style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>{fmt(timer)} / 00:30</span>
            </div>
            <motion.button whileTap={{ scale: 0.9 }} onClick={stopRecording}
              style={{ background: '#7C3AED', border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer' }}>
              <Square size={16} color="#fff" fill="#fff" />
            </motion.button>
          </>
        )}
      </div>
    </div>
  )

  return (
    <motion.button whileTap={{ scale: 0.95 }} onClick={startPreview}
      style={{ width: '100%', background: '#1E293B', border: '1px dashed rgba(124,58,237,0.3)', borderRadius: 16, padding: '16px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
      <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(124,58,237,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Video size={18} color="#7C3AED" />
      </div>
      <span style={{ fontSize: 14, color: 'rgba(248,250,252,0.7)', fontWeight: 500 }}>Ajouter une vidéo</span>
    </motion.button>
  )
}

// ── DropZone ───────────────────────────────────────────────────────────────────
function DropZone({ onFiles }: { onFiles: (files: File[]) => void }) {
  const [isDragging, setIsDragging] = useState(false)
  const [droppedCount, setDroppedCount] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(e.type === 'dragenter' || e.type === 'dragover')
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/') || f.type.startsWith('video/'))
    if (files.length > 0) {
      setDroppedCount(c => c + files.length)
      onFiles(files)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      setDroppedCount(c => c + files.length)
      onFiles(files)
    }
  }

  return (
    <motion.div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      animate={{ borderColor: isDragging ? '#06B6D4' : 'rgba(124,58,237,0.3)', background: isDragging ? 'rgba(6,182,212,0.08)' : '#1E293B' }}
      transition={{ duration: 0.2 }}
      style={{
        border: '2px dashed rgba(124,58,237,0.3)',
        borderRadius: 16,
        padding: '32px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        cursor: 'pointer',
        background: '#1E293B',
      }}
      onClick={() => fileInputRef.current?.click()}
    >
      <input ref={fileInputRef} type="file" accept="image/*,video/*" multiple style={{ display: 'none' }} onChange={handleFileInput} />
      <motion.div
        animate={{ scale: isDragging ? 1.15 : 1 }}
        style={{ width: 48, height: 48, borderRadius: 14, background: isDragging ? 'rgba(6,182,212,0.15)' : 'rgba(124,58,237,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Upload size={22} color={isDragging ? '#06B6D4' : '#7C3AED'} />
      </motion.div>
      <p style={{ fontSize: 14, fontWeight: 600, color: isDragging ? '#06B6D4' : '#F8FAFC', textAlign: 'center' }}>
        {isDragging ? 'Lâche tes souvenirs ici ✨' : 'Dépose tes souvenirs ici'}
      </p>
      <p style={{ fontSize: 12, color: 'rgba(248,250,252,0.45)', textAlign: 'center' }}>
        Photos & vidéos · ou clique pour choisir
      </p>
      {droppedCount > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)', borderRadius: 20, padding: '4px 14px', marginTop: 4 }}
        >
          <span style={{ fontSize: 12, color: '#fff', fontWeight: 600 }}>{droppedCount} fichier{droppedCount > 1 ? 's' : ''} ajouté{droppedCount > 1 ? 's' : ''}</span>
        </motion.div>
      )}
    </motion.div>
  )
}

// ── DragCapsule ────────────────────────────────────────────────────────────────
function DragCapsule({ onSealed }: { onSealed: () => void }) {
  const y = useMotionValue(0)
  const scale = useTransform(y, [-300, 0], [0.6, 1])
  const [launched, setLaunched] = useState(false)
  const constraintRef = useRef<HTMLDivElement>(null)

  const handleDragEnd = (_: unknown, info: { offset: { y: number } }) => {
    const threshold = window.innerHeight * 0.3
    if (info.offset.y < -threshold) {
      setLaunched(true)
      animate(y, -1200, { duration: 0.6, ease: [0.2, 0, 0.8, 1] })
      setTimeout(() => onSealed(), 800)
    } else {
      animate(y, 0, { type: 'spring', stiffness: 300, damping: 25 })
    }
  }

  return (
    <div ref={constraintRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, paddingTop: 16 }}>
      <p style={{ fontSize: 14, color: 'rgba(248,250,252,0.55)', textAlign: 'center', lineHeight: 1.6 }}>
        Glissez vers le haut pour lancer votre capsule 🚀
      </p>
      <div style={{ position: 'relative', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <motion.div
          drag="y"
          dragConstraints={{ top: -500, bottom: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          style={{ y, scale, cursor: launched ? 'default' : 'grab', touchAction: 'none' }}
          whileTap={{ cursor: 'grabbing' }}
        >
          <div style={{
            width: 120, height: 120, borderRadius: 28,
            background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 8,
            boxShadow: '0 20px 60px rgba(124,58,237,0.5), 0 0 0 1px rgba(255,255,255,0.1)',
            userSelect: 'none',
          }}>
            <span style={{ fontSize: 40 }}>📦</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>MA CAPSULE</span>
          </div>
        </motion.div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, opacity: 0.35 }}>
        {[0, 1, 2].map(i => (
          <motion.div key={i}
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            style={{ fontSize: 14, color: '#7C3AED' }}>▲</motion.div>
        ))}
      </div>
    </div>
  )
}

// ── Main Create ────────────────────────────────────────────────────────────────
export function Create() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [selectedContent, setSelectedContent] = useState<string | null>(null)
  const [selectedUnlock, setSelectedUnlock] = useState<string | null>(null)
  const [selectedAudience, setSelectedAudience] = useState<string | null>(null)
  const [sealed, setSealed] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [_audioUrl, setAudioUrl] = useState<string | null>(null)
  const [_videoUrl, setVideoUrl] = useState<string | null>(null)

  const canNext = step === 0 ? !!selectedContent : step === 1 ? !!selectedUnlock : step === 2 ? !!selectedAudience : false

  const handleSealed = () => { setShowConfetti(true); setSealed(true) }

  const contentTypes = [
    { id: 'image', label: 'Photo', icon: Image, color: '#7C3AED' },
    { id: 'video', label: 'Vidéo', icon: Video, color: '#8B5CF6' },
    { id: 'voice', label: 'Vocal', icon: Mic, color: '#06B6D4' },
    { id: 'text', label: 'Texte', icon: Type, color: '#0EA5E9' },
  ]

  const unlockTypes = [
    { id: 'date', label: 'Date', sublabel: 'Se débloque à une date précise', icon: '📅', color: '#7C3AED' },
    { id: 'location', label: 'Lieu', sublabel: 'Se débloque à un endroit précis', icon: '📍', color: '#06B6D4' },
    { id: 'fragments', label: 'Multi-fragments', sublabel: 'Collecte plusieurs morceaux', icon: '🧩', color: '#8B5CF6' },
  ]

  const audienceTypes = [
    { id: 'private', label: 'Privé', sublabel: 'Visible uniquement par toi', icon: Lock, color: '#F8FAFC' },
    { id: 'person', label: 'Une personne', sublabel: "Envoie à quelqu'un de précis", icon: User, color: '#7C3AED' },
    { id: 'group', label: 'Groupe', sublabel: 'Pour plusieurs personnes', icon: Users, color: '#8B5CF6' },
    { id: 'public', label: 'Public', sublabel: 'Visible par tous', icon: Globe, color: '#06B6D4' },
  ]

  if (sealed) {
    return (
      <div style={{ minHeight: '100vh', background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        {showConfetti && <Confetti />}
        <motion.div initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', damping: 12 }} style={{ fontSize: 80, marginBottom: 24 }}>
          📦
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ fontSize: 28, fontWeight: 700, color: '#F8FAFC', textAlign: 'center', marginBottom: 12 }}>
          Capsule scellée ! ✨
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          style={{ fontSize: 15, color: 'rgba(248,250,252,0.55)', textAlign: 'center', lineHeight: 1.6, marginBottom: 40 }}>
          Ta capsule est désormais en sécurité, attendant d'être découverte.
        </motion.p>
        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
          onClick={() => navigate('/')}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
            border: 'none', borderRadius: 16, padding: '16px 40px',
            fontSize: 16, fontWeight: 700, color: '#fff', cursor: 'pointer',
            boxShadow: '0 8px 30px rgba(124,58,237,0.4)',
          }}
        >
          Retour à l'accueil 🚀
        </motion.button>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'transparent', paddingBottom: 100 }} className="page-content">
      {/* Header */}
      <div style={{ padding: '56px 20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => step > 0 ? setStep(step - 1) : navigate(-1)}
          style={{ background: '#1E293B', border: 'none', borderRadius: 12, padding: 10, cursor: 'pointer' }}
        >
          <ChevronLeft size={20} color="#F8FAFC" />
        </motion.button>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#F8FAFC' }}>Nouvelle capsule</h1>
          <p style={{ fontSize: 12, color: 'rgba(248,250,252,0.45)', marginTop: 2 }}>Étape {step + 1} sur {steps.length}</p>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .create-layout { display: grid !important; grid-template-columns: 260px 1fr; gap: 40px; max-width: 1000px; margin: 0 auto; padding: 0 40px; }
          .create-stepper { flex-direction: column !important; gap: 8px !important; position: sticky; top: 100px; }
          .create-stepper-item { flex: none !important; display: flex; align-items: center; gap: 12px; }
          .create-stepper-bar { width: 4px !important; height: 40px !important; border-radius: 2px !important; }
        }
      `}</style>

      {/* Stepper + Content layout */}
      <div className="create-layout" style={{ display: 'block' }}>
        {/* Stepper */}
        <div style={{ padding: '0 20px 28px', display: 'flex', gap: 8 }} className="create-stepper">
          {steps.map((s, i) => (
            <div key={s} style={{ flex: 1 }} className="create-stepper-item">
              <motion.div
                animate={{ background: i <= step ? '#7C3AED' : '#1E293B' }}
                style={{ height: 4, borderRadius: 2 }}
                className="create-stepper-bar"
              />
              <p style={{ fontSize: 10, color: i <= step ? '#7C3AED' : 'rgba(248,250,252,0.3)', marginTop: 6, fontWeight: i === step ? 600 : 400 }}>
                {s}
              </p>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div>
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
                  <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F8FAFC', marginBottom: 8 }}>Quel contenu ?</h2>
                  <p style={{ fontSize: 14, color: 'rgba(248,250,252,0.5)', marginBottom: 20 }}>Choisis le type de souvenir à capturer</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                    {contentTypes.map((ct) => {
                      const Icon = ct.icon
                      const selected = selectedContent === ct.id
                      return (
                        <motion.button
                          key={ct.id}
                          onClick={() => setSelectedContent(ct.id)}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            background: selected ? `${ct.color}18` : '#1E293B',
                            border: `2px solid ${selected ? ct.color : 'rgba(248,250,252,0.06)'}`,
                            borderRadius: 20, padding: '24px 16px',
                            cursor: 'pointer', display: 'flex', flexDirection: 'column',
                            alignItems: 'center', gap: 12,
                          }}
                        >
                          <div style={{ width: 52, height: 52, borderRadius: 16, background: `${ct.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon size={24} color={ct.color} />
                          </div>
                          <span style={{ fontSize: 14, fontWeight: 600, color: selected ? ct.color : '#F8FAFC' }}>{ct.label}</span>
                        </motion.button>
                      )
                    })}
                  </div>

                  {/* Drag & Drop zone */}
                  <div style={{ marginBottom: 16 }}>
                    <DropZone onFiles={(files) => { console.log('Files added:', files.length) }} />
                  </div>

                  {/* Recording tools */}
                  <AnimatePresence>
                    {(selectedContent === 'voice' || selectedContent === 'video') && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
                      >
                        <p style={{ fontSize: 12, color: 'rgba(248,250,252,0.4)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4 }}>
                          Enregistrement
                        </p>
                        {selectedContent === 'voice' && (
                          <AudioRecorder onSave={(url, dur) => { setAudioUrl(url); void dur }} />
                        )}
                        {selectedContent === 'video' && (
                          <VideoRecorder onSave={(url) => setVideoUrl(url)} />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Step 1: Unlock */}
              {step === 1 && (
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F8FAFC', marginBottom: 8 }}>Condition de déblocage</h2>
                  <p style={{ fontSize: 14, color: 'rgba(248,250,252,0.5)', marginBottom: 24 }}>Comment ta capsule sera-t-elle révélée ?</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {unlockTypes.map((ut) => {
                      const selected = selectedUnlock === ut.id
                      return (
                        <motion.button
                          key={ut.id}
                          onClick={() => setSelectedUnlock(ut.id)}
                          whileTap={{ scale: 0.98 }}
                          style={{
                            background: selected ? `${ut.color}12` : '#1E293B',
                            border: `2px solid ${selected ? ut.color : 'rgba(248,250,252,0.06)'}`,
                            borderRadius: 18, padding: '18px 20px',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16, textAlign: 'left',
                          }}
                        >
                          <span style={{ fontSize: 32 }}>{ut.icon}</span>
                          <div>
                            <p style={{ fontSize: 16, fontWeight: 600, color: selected ? ut.color : '#F8FAFC' }}>{ut.label}</p>
                            <p style={{ fontSize: 12, color: 'rgba(248,250,252,0.45)', marginTop: 2 }}>{ut.sublabel}</p>
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
                  <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F8FAFC', marginBottom: 8 }}>Pour qui ?</h2>
                  <p style={{ fontSize: 14, color: 'rgba(248,250,252,0.5)', marginBottom: 24 }}>Définis l'audience de ta capsule</p>
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
                            background: selected ? `${at.color}12` : '#1E293B',
                            border: `2px solid ${selected ? at.color : 'rgba(248,250,252,0.06)'}`,
                            borderRadius: 18, padding: '16px 20px',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left',
                          }}
                        >
                          <div style={{ width: 42, height: 42, borderRadius: 12, background: `${at.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Icon size={20} color={at.color} />
                          </div>
                          <div>
                            <p style={{ fontSize: 15, fontWeight: 600, color: selected ? at.color : '#F8FAFC' }}>{at.label}</p>
                            <p style={{ fontSize: 12, color: 'rgba(248,250,252,0.45)', marginTop: 2 }}>{at.sublabel}</p>
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Step 3: Summary + Drag to seal */}
              {step === 3 && (
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F8FAFC', marginBottom: 8 }}>Résumé</h2>
                  <p style={{ fontSize: 14, color: 'rgba(248,250,252,0.5)', marginBottom: 24 }}>Vérifie ta capsule avant de la sceller</p>
                  <div style={{ background: '#1E293B', borderRadius: 20, padding: 20, border: '1px solid rgba(124,58,237,0.2)', marginBottom: 24 }}>
                    {[
                      { label: 'Contenu', value: selectedContent },
                      { label: 'Déblocage', value: selectedUnlock },
                      { label: 'Audience', value: selectedAudience },
                    ].map(({ label, value }) => (
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(248,250,252,0.06)' }}>
                        <span style={{ fontSize: 13, color: 'rgba(248,250,252,0.5)' }}>{label}</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#7C3AED', textTransform: 'capitalize' }}>{value}</span>
                      </div>
                    ))}
                  </div>
                  <DragCapsule onSealed={handleSealed} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* CTA */}
          {step < 3 && (
            <div style={{ padding: '32px 20px 0' }}>
              <motion.button
                onClick={() => setStep(step + 1)}
                disabled={!canNext}
                whileTap={{ scale: 0.97 }}
                style={{
                  width: '100%',
                  background: canNext ? 'linear-gradient(135deg, #7C3AED, #06B6D4)' : '#1E293B',
                  border: 'none', borderRadius: 16, padding: '18px',
                  fontSize: 16, fontWeight: 700,
                  color: canNext ? '#fff' : 'rgba(248,250,252,0.3)',
                  cursor: canNext ? 'pointer' : 'not-allowed',
                  boxShadow: canNext ? '0 8px 30px rgba(124,58,237,0.3)' : 'none',
                  transition: 'all 0.3s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
              >
                {step === 2 ? <><Sparkles size={18} /> Voir le résumé</> : 'Continuer →'}
              </motion.button>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
