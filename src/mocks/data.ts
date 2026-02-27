export type CapsuleType = 'temporal' | 'geo' | 'multi'
export type CapsuleStatus = 'locked' | 'unlocked'
export type AudienceType = 'private' | 'person' | 'group' | 'public'

export interface Capsule {
  id: string
  title: string
  description: string
  type: CapsuleType
  status: CapsuleStatus
  audience: AudienceType
  author: {
    name: string
    initials: string
    color: string
  }
  createdAt: string
  unlockCondition: {
    type: 'date' | 'location' | 'fragments'
    label: string
    date?: string
    location?: { lat: number; lng: number; name: string }
    fragmentsTotal?: number
    fragmentsCollected?: number
  }
  image?: string
  content?: string
  distance?: string
}

export const mockCapsules: Capsule[] = [
  {
    id: '1',
    title: 'Souvenir de Tokyo',
    description: 'Une capsule remplie de photos et de pensées de mon voyage au Japon.',
    type: 'temporal',
    status: 'locked',
    audience: 'public',
    author: { name: 'Romain', initials: 'R', color: '#7C3AED' },
    createdAt: '2026-01-15',
    unlockCondition: {
      type: 'date',
      label: '15 mars 2026',
      date: '2026-03-15',
    },
    image: 'https://picsum.photos/seed/tokyo/400/300',
    distance: '2.3 km',
  },
  {
    id: '2',
    title: 'Message à moi du futur',
    description: 'Je t\'écris depuis 2026 avec plein d\'espoirs pour toi.',
    type: 'temporal',
    status: 'locked',
    audience: 'private',
    author: { name: 'Marie', initials: 'M', color: '#8B5CF6' },
    createdAt: '2026-02-01',
    unlockCondition: {
      type: 'date',
      label: '1er janvier 2027',
      date: '2027-01-01',
    },
    distance: '0.8 km',
  },
  {
    id: '3',
    title: 'Le secret de la rue Lepic',
    description: 'Une capsule cachée à Montmartre. Trouve-moi.',
    type: 'geo',
    status: 'locked',
    audience: 'public',
    author: { name: 'Lucas', initials: 'L', color: '#06B6D4' },
    createdAt: '2026-01-20',
    unlockCondition: {
      type: 'location',
      label: 'Rue Lepic, Paris 18e',
      location: { lat: 48.8842, lng: 2.3385, name: 'Rue Lepic, Montmartre' },
    },
    image: 'https://picsum.photos/seed/montmartre/400/300',
    distance: '5.1 km',
  },
  {
    id: '4',
    title: 'Anniversaire de Léa',
    description: 'Tous nos messages d\'amour pour tes 30 ans 🎉',
    type: 'multi',
    status: 'locked',
    audience: 'person',
    author: { name: 'Romain', initials: 'R', color: '#7C3AED' },
    createdAt: '2026-02-10',
    unlockCondition: {
      type: 'fragments',
      label: '4/7 fragments collectés',
      fragmentsTotal: 7,
      fragmentsCollected: 4,
    },
    distance: '1.2 km',
  },
  {
    id: '5',
    title: 'Notre premier appartement',
    description: 'Les photos du jour où on a emménagé ensemble, avec nos rêves pour la suite.',
    type: 'temporal',
    status: 'unlocked',
    audience: 'group',
    author: { name: 'Marie', initials: 'M', color: '#8B5CF6' },
    createdAt: '2025-06-01',
    unlockCondition: {
      type: 'date',
      label: '1er février 2026',
      date: '2026-02-01',
    },
    image: 'https://picsum.photos/seed/apartment/400/300',
    content: 'Ce jour-là, on avait peur et on était excités à la fois. On a mangé des pizzas sur le sol du salon parce qu\'on n\'avait pas encore de table. C\'était parfait.',
    distance: '0.3 km',
  },
  {
    id: '6',
    title: 'Vue depuis le Sacré-Cœur',
    description: 'Le panorama de Paris au coucher du soleil, capsulé pour toujours.',
    type: 'geo',
    status: 'unlocked',
    audience: 'public',
    author: { name: 'Lucas', initials: 'L', color: '#06B6D4' },
    createdAt: '2025-11-15',
    unlockCondition: {
      type: 'location',
      label: 'Sacré-Cœur, Paris',
      location: { lat: 48.8867, lng: 2.3431, name: 'Sacré-Cœur' },
    },
    image: 'https://picsum.photos/seed/sacrecoeur/400/300',
    content: 'Paris s\'étendait à l\'infini sous mes pieds. Le soleil orange se couchait sur la Tour Eiffel. Je voulais que ce moment dure éternellement.',
    distance: '4.8 km',
  },
  {
    id: '7',
    title: 'Concert de Tame Impala',
    description: 'Les vibrations, la foule, la magie. Une nuit inoubliable.',
    type: 'temporal',
    status: 'locked',
    audience: 'group',
    author: { name: 'Sophie', initials: 'S', color: '#FF3D71' },
    createdAt: '2026-02-20',
    unlockCondition: {
      type: 'date',
      label: '20 avril 2026',
      date: '2026-04-20',
    },
    image: 'https://picsum.photos/seed/concert/400/300',
    distance: '3.7 km',
  },
  {
    id: '8',
    title: 'Chasse au trésor Crumb',
    description: 'Collecte les 5 fragments cachés dans Paris pour révéler le secret.',
    type: 'multi',
    status: 'unlocked',
    audience: 'public',
    author: { name: 'Romain', initials: 'R', color: '#7C3AED' },
    createdAt: '2025-12-01',
    unlockCondition: {
      type: 'fragments',
      label: '5/5 fragments collectés',
      fragmentsTotal: 5,
      fragmentsCollected: 5,
    },
    content: 'Félicitations, aventurier ! Tu as trouvé tous les fragments. La récompense ? Ce moment de fierté, et la certitude que Paris n\'a plus de secrets pour toi.',
    distance: '0.5 km',
  },
]

export const currentUser = {
  name: 'Romain',
  initials: 'R',
  color: '#7C3AED',
  capsulesCréées: 3,
  capsulesDebloquees: 12,
  capsulesRecues: 7,
}
