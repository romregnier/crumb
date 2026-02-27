# CRUMB — Specs Techniques Dev
> Référence complète pour l'agent développeur

**Version:** 1.0  
**Date:** Février 2026  
**Pour:** Dev Agent — Build MVP  
**Lire aussi:** `CRUMB_PRD.md` pour le contexte produit

---

## Table of Contents

1. [Stack Recommandée](#1-stack-recommandée)
2. [Structure des Dossiers](#2-structure-des-dossiers)
3. [Modèle de Données JSON](#3-modèle-de-données-json)
4. [Endpoints API](#4-endpoints-api)
5. [Composants Principaux](#5-composants-principaux)
6. [5 Écrans MVP — UI Détaillée](#6-5-écrans-mvp--ui-détaillée)
7. [Configuration & Environment](#7-configuration--environment)
8. [Services Tiers](#8-services-tiers)

---

## 1. Stack Recommandée

### Décision : **Expo (React Native) + Supabase**

#### Pourquoi Expo plutôt que PWA ?
| Critère | Expo RN | PWA React |
|---------|---------|-----------|
| Accès GPS précis | ✅ Natif | ⚠️ Limité iOS |
| Notifications push | ✅ expo-notifications | ⚠️ iOS limité |
| Caméra / Médias | ✅ expo-camera, expo-av | ⚠️ Limité |
| App Store presence | ✅ | ❌ |
| Performance animations | ✅ Reanimated 3 | ⚠️ Web only |
| AR (V2) | ✅ ARKit/ARCore | ❌ |

**→ Expo est impératif** pour les features core (géoloc précise, notifications, médias, AR en V2).

---

### Frontend Stack

```
Framework:      Expo SDK 51+ (React Native)
Language:       TypeScript (strict mode)
Navigation:     Expo Router v3 (file-based routing)
State:          Zustand (global) + React Query (server state)
Animations:     React Native Reanimated 3 + Moti
Map:            react-native-maps + MapBox GL (expo-maps en V2)
Media:          expo-image-picker, expo-av, expo-camera
Location:       expo-location
Notifications:  expo-notifications
Storage local:  expo-secure-store (tokens) + MMKV (cache)
Styling:        NativeWind (Tailwind pour RN) ou StyleSheet inline
Forms:          React Hook Form + Zod
Icons:          @expo/vector-icons (Lucide subset)
```

### Backend Stack

```
BaaS:           Supabase
  - Auth:       Supabase Auth (email + OAuth Google/Apple)
  - Database:   PostgreSQL (via Supabase)
  - Storage:    Supabase Storage (médias)
  - Realtime:   Supabase Realtime (notifications temps réel)
  - Edge Fn:    Deno Edge Functions (logique métier complexe)

CDN:            Supabase Storage + CloudFront (si scaling)
Push Notifs:    Expo Push Notification Service → APNs/FCM
Géocoding:      OpenStreetMap Nominatim (gratuit) ou Google Maps Geocoding
Maps tiles:     MapBox (plan gratuit jusqu'à 25K MAU)
```

### DevOps

```
Monorepo:       pnpm workspaces (apps/mobile + packages/shared)
CI/CD:          GitHub Actions + EAS Build (Expo)
Distribution:   EAS Submit → App Store + Play Store
Env vars:       EAS Secrets + .env.local
Monitoring:     Sentry (crashes) + PostHog (analytics)
```

---

## 2. Structure des Dossiers

```
crumb/
├── apps/
│   └── mobile/                      # App Expo principale
│       ├── app/                     # Expo Router (file-based routing)
│       │   ├── (auth)/
│       │   │   ├── _layout.tsx
│       │   │   ├── login.tsx
│       │   │   ├── signup.tsx
│       │   │   └── onboarding.tsx
│       │   ├── (tabs)/
│       │   │   ├── _layout.tsx      # Bottom tab bar config
│       │   │   ├── index.tsx        # Home / Feed
│       │   │   ├── explore.tsx      # Carte
│       │   │   ├── create.tsx       # Création capsule (wizard)
│       │   │   ├── notifications.tsx
│       │   │   └── profile.tsx
│       │   ├── capsule/
│       │   │   ├── [id].tsx         # Capsule detail (sealed/unlocked)
│       │   │   └── unlock/[id].tsx  # Unlock flow
│       │   ├── create/
│       │   │   ├── step1-media.tsx
│       │   │   ├── step2-condition.tsx
│       │   │   ├── step3-audience.tsx
│       │   │   ├── step4-details.tsx
│       │   │   └── step5-preview.tsx
│       │   ├── _layout.tsx          # Root layout
│       │   └── +not-found.tsx
│       │
│       ├── components/
│       │   ├── capsule/
│       │   │   ├── CapsuleCard.tsx
│       │   │   ├── CapsuleDetail.tsx
│       │   │   ├── CapsuleMapPin.tsx
│       │   │   ├── CapsuleSealAnimation.tsx
│       │   │   ├── CapsuleUnlockAnimation.tsx
│       │   │   └── CapsuleCountdown.tsx
│       │   ├── create/
│       │   │   ├── MediaPicker.tsx
│       │   │   ├── UnlockConditionPicker.tsx
│       │   │   ├── AudiencePicker.tsx
│       │   │   ├── LocationPicker.tsx
│       │   │   └── DatePicker.tsx
│       │   ├── map/
│       │   │   ├── ExploreMap.tsx
│       │   │   ├── CapsulePreviewSheet.tsx
│       │   │   └── MapFilterBar.tsx
│       │   ├── ui/
│       │   │   ├── Button.tsx
│       │   │   ├── Card.tsx
│       │   │   ├── Avatar.tsx
│       │   │   ├── Badge.tsx
│       │   │   ├── BottomSheet.tsx
│       │   │   ├── EmojiPicker.tsx
│       │   │   ├── ProgressSteps.tsx
│       │   │   ├── Skeleton.tsx
│       │   │   └── Toast.tsx
│       │   └── layout/
│       │       ├── Header.tsx
│       │       ├── TabBar.tsx
│       │       └── SafeArea.tsx
│       │
│       ├── hooks/
│       │   ├── useCapsule.ts         # CRUD capsules
│       │   ├── useLocation.ts        # GPS + permissions
│       │   ├── useCamera.ts          # Camera + permissions
│       │   ├── useNotifications.ts   # Push notifs
│       │   ├── useUnlockCheck.ts     # Vérification conditions
│       │   ├── useAuth.ts            # Auth state
│       │   └── useUpload.ts          # Media upload
│       │
│       ├── stores/
│       │   ├── authStore.ts          # Zustand : user session
│       │   ├── capsuleStore.ts       # Zustand : capsules en cours de création
│       │   └── notificationStore.ts  # Zustand : notifications locales
│       │
│       ├── services/
│       │   ├── supabase.ts           # Client Supabase initialisé
│       │   ├── capsuleService.ts     # API calls capsules
│       │   ├── mediaService.ts       # Upload, compression
│       │   ├── locationService.ts    # Geocoding, distance calc
│       │   └── notificationService.ts
│       │
│       ├── types/
│       │   ├── capsule.ts            # Types Capsule, Fragment, etc.
│       │   ├── user.ts
│       │   └── api.ts                # Response types
│       │
│       ├── constants/
│       │   ├── colors.ts
│       │   ├── typography.ts
│       │   ├── spacing.ts
│       │   └── config.ts
│       │
│       ├── utils/
│       │   ├── distance.ts           # Haversine formula
│       │   ├── dateFormat.ts
│       │   ├── mediaCompressor.ts
│       │   └── deepLink.ts
│       │
│       ├── assets/
│       │   ├── images/
│       │   ├── animations/           # Lottie JSON
│       │   └── fonts/
│       │
│       ├── app.json                  # Config Expo
│       ├── eas.json                  # EAS Build config
│       └── package.json
│
├── packages/
│   └── shared/                      # Types + utils partagés
│       ├── src/
│       │   ├── types/
│       │   └── utils/
│       └── package.json
│
├── supabase/
│   ├── migrations/                  # SQL migrations
│   │   ├── 001_create_users.sql
│   │   ├── 002_create_capsules.sql
│   │   ├── 003_create_fragments.sql
│   │   └── 004_create_reactions.sql
│   ├── functions/                   # Edge Functions Deno
│   │   ├── check-unlock-conditions/
│   │   ├── send-unlock-notification/
│   │   └── generate-invite-link/
│   └── seed.sql                     # Données de test
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── eas-build.yml
│
├── package.json                     # pnpm workspace root
└── README.md
```

---

## 3. Modèle de Données JSON

### Tables SQL (Supabase PostgreSQL)

```sql
-- Users (géré par Supabase Auth + table profile)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  notifications_enabled BOOLEAN DEFAULT TRUE,
  location_enabled BOOLEAN DEFAULT FALSE,
  profile_visibility TEXT DEFAULT 'public' CHECK (profile_visibility IN ('public', 'friends', 'private')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Capsules
CREATE TABLE capsules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES profiles(id),
  title TEXT,
  hint TEXT,
  cover_emoji TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sealed', 'unlocked', 'expired')),
  audience_type TEXT NOT NULL CHECK (audience_type IN ('private', 'person', 'group', 'public')),
  unlock_condition JSONB NOT NULL,
  sealed_at TIMESTAMPTZ,
  unlocked_at TIMESTAMPTZ,
  view_count INT DEFAULT 0,
  is_reported BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Capsule Recipients (pour audience person/group)
CREATE TABLE capsule_recipients (
  capsule_id UUID REFERENCES capsules(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  invited_email TEXT,
  invite_token TEXT UNIQUE,
  invite_expires_at TIMESTAMPTZ,
  accepted_at TIMESTAMPTZ,
  PRIMARY KEY (capsule_id, COALESCE(user_id::TEXT, invited_email))
);

-- Fragments
CREATE TABLE fragments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  capsule_id UUID NOT NULL REFERENCES capsules(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES profiles(id),
  type TEXT NOT NULL CHECK (type IN ('text', 'image', 'video', 'audio')),
  text_content TEXT,
  media_url TEXT,
  media_thumbnail_url TEXT,
  duration_seconds INT,
  mime_type TEXT,
  file_size_bytes BIGINT,
  position_order INT NOT NULL DEFAULT 0,
  upload_status TEXT DEFAULT 'ready' CHECK (upload_status IN ('pending', 'processing', 'ready', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reactions
CREATE TABLE reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  capsule_id UUID NOT NULL REFERENCES capsules(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES profiles(id),
  type TEXT NOT NULL CHECK (type IN ('emoji', 'text', 'audio')),
  emoji TEXT,
  text_content TEXT,
  audio_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Fragment Collections (pour multi-fragment: qui a collecté quoi)
CREATE TABLE fragment_collections (
  fragment_id UUID REFERENCES fragments(id),
  collector_id UUID REFERENCES profiles(id),
  collected_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (fragment_id, collector_id)
);
```

### Exemples JSON — Données réelles

#### Capsule — Date unlock
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "creator_id": "user-uuid-abc",
  "title": "Notre premier anniversaire ✨",
  "hint": "Quelque chose de spécial pour notre premier an.",
  "cover_emoji": "💌",
  "status": "sealed",
  "audience_type": "person",
  "unlock_condition": {
    "type": "date",
    "unlock_date": "2027-02-14T09:00:00Z"
  },
  "sealed_at": "2026-02-15T14:30:00Z",
  "view_count": 0,
  "is_reported": false,
  "created_at": "2026-02-15T14:00:00Z"
}
```

#### Capsule — Géolocalisation
```json
{
  "id": "capsule-geo-001",
  "creator_id": "user-uuid-abc",
  "title": "Un secret sous la Tour Eiffel",
  "hint": "Va au pied de la tour, côté Seine.",
  "cover_emoji": "🗼",
  "status": "sealed",
  "audience_type": "public",
  "unlock_condition": {
    "type": "location",
    "location": {
      "lat": 48.8584,
      "lng": 2.2945,
      "radius_meters": 100,
      "label": "Tour Eiffel, Paris"
    }
  },
  "sealed_at": "2026-02-10T11:00:00Z"
}
```

#### Capsule — Multi-fragments
```json
{
  "id": "capsule-multi-001",
  "creator_id": "user-uuid-abc",
  "title": "Notre road trip 🚗",
  "hint": "Collecte les 4 parties de notre aventure.",
  "cover_emoji": "🗺️",
  "status": "sealed",
  "audience_type": "group",
  "unlock_condition": {
    "type": "multi_fragment",
    "multi_fragment": {
      "total_fragments": 4,
      "collected_fragment_ids": [],
      "fragment_locations": [
        { "fragment_index": 0, "lat": 43.2965, "lng": 5.3698, "radius_meters": 200, "label": "Marseille" },
        { "fragment_index": 1, "lat": 43.6047, "lng": 1.4442, "radius_meters": 200, "label": "Toulouse" },
        { "fragment_index": 2, "lat": 44.8378, "lng": -0.5792, "radius_meters": 200, "label": "Bordeaux" },
        { "fragment_index": 3, "lat": 47.2184, "lng": -1.5536, "radius_meters": 200, "label": "Nantes" }
      ]
    }
  }
}
```

#### Fragment — Image
```json
{
  "id": "frag-001",
  "capsule_id": "capsule-geo-001",
  "author_id": "user-uuid-abc",
  "type": "image",
  "media_url": "https://storage.supabase.co/object/public/crumb-media/user-abc/capsule-geo-001/photo.jpg",
  "media_thumbnail_url": "https://storage.supabase.co/object/public/crumb-media/user-abc/capsule-geo-001/photo_thumb.jpg",
  "mime_type": "image/jpeg",
  "file_size_bytes": 2457600,
  "position_order": 0,
  "upload_status": "ready",
  "created_at": "2026-02-10T10:55:00Z"
}
```

#### Fragment — Audio
```json
{
  "id": "frag-002",
  "capsule_id": "capsule-geo-001",
  "author_id": "user-uuid-abc",
  "type": "audio",
  "media_url": "https://storage.supabase.co/object/public/crumb-media/user-abc/capsule-geo-001/voice.m4a",
  "duration_seconds": 45,
  "mime_type": "audio/m4a",
  "file_size_bytes": 720000,
  "position_order": 1,
  "upload_status": "ready"
}
```

---

## 4. Endpoints API

> **Note :** Utiliser Supabase client (PostgREST) directement pour les opérations CRUD standard. Les endpoints ci-dessous décrivent la logique — certains sont des Edge Functions Supabase, d'autres sont des appels PostgREST directs.

### Base URL
```
Production:   https://[project-ref].supabase.co
Edge Fn:      https://[project-ref].supabase.co/functions/v1
Mock local:   http://localhost:54321
```

### Auth

```
POST /auth/v1/signup
Body: { email, password, username, display_name }
Response: { user, session }

POST /auth/v1/token?grant_type=password
Body: { email, password }
Response: { access_token, refresh_token, user }

POST /auth/v1/token?grant_type=refresh_token
Body: { refresh_token }
Response: { access_token, refresh_token }

DELETE /auth/v1/logout
Headers: Authorization: Bearer <token>
```

### Capsules

```
# Lister mes capsules (créées + reçues)
GET /rest/v1/capsules?creator_id=eq.{userId}&select=*,fragments(*)
Headers: Authorization: Bearer <token>

# Créer une capsule (draft)
POST /rest/v1/capsules
Body: CapsuleCreatePayload
Response: { id, status: 'draft', ...}

# Mettre à jour une capsule (avant scellage)
PATCH /rest/v1/capsules?id=eq.{capsuleId}&status=eq.draft
Body: Partial<CapsuleUpdatePayload>

# Sceller une capsule (Edge Function — logique métier)
POST /functions/v1/seal-capsule
Body: { capsule_id: string }
Response: { success: true, sealed_at: string }
→ Vérifie que tous les fragments sont ready
→ Passe status → 'sealed'
→ Notifie les destinataires

# Détail d'une capsule
GET /rest/v1/capsules?id=eq.{capsuleId}&select=*,fragments(*),reactions(*)
Headers: Authorization: Bearer <token>

# Tenter de débloquer (Edge Function — logique métier)
POST /functions/v1/try-unlock
Body: {
  capsule_id: string,
  lat?: number,         // si condition géo
  lng?: number,
  fragment_id?: string  // si multi-fragment
}
Response:
  { success: true, unlocked: true, capsule: Capsule }
  { success: true, unlocked: false, reason: 'too_far' | 'not_yet' | 'fragments_missing' }

# Capsules publiques sur la carte
GET /functions/v1/capsules-map
Query: ?lat=48.85&lng=2.35&radius_km=5
Response: { capsules: MapCapsule[] }
→ Ne retourne que: id, title, hint, cover_emoji, lat, lng, unlock_type, status

# Supprimer une capsule (seulement si draft)
DELETE /rest/v1/capsules?id=eq.{capsuleId}&status=eq.draft
```

### Fragments

```
# Ajouter un fragment à une capsule draft
POST /rest/v1/fragments
Body: {
  capsule_id: string,
  type: 'text' | 'image' | 'video' | 'audio',
  text_content?: string,
  position_order: number
}
Response: { id, upload_url? }

# Upload media (Supabase Storage)
POST /storage/v1/object/crumb-media/{userId}/{capsuleId}/{filename}
Headers: Content-Type: <mime>, Authorization: Bearer <token>
Body: File binary
Response: { Key, path, fullPath }

# Confirmer upload media
PATCH /rest/v1/fragments?id=eq.{fragmentId}
Body: { media_url, media_thumbnail_url, file_size_bytes, upload_status: 'ready' }

# Collecter un fragment (multi-fragment)
POST /functions/v1/collect-fragment
Body: { fragment_id: string, lat?: number, lng?: number }
Response: { collected: true, total_collected: number, total_required: number, all_collected: boolean }
```

### Réactions

```
# Envoyer une réaction
POST /rest/v1/reactions
Body: { capsule_id, type, emoji?, text_content?, audio_url? }
Response: { id, created_at }

# Lister les réactions d'une capsule
GET /rest/v1/reactions?capsule_id=eq.{capsuleId}&select=*,profiles(username,avatar_url)
```

### Invitations

```
# Générer un lien d'invitation
POST /functions/v1/generate-invite
Body: { capsule_id: string, email?: string }
Response: { invite_token, invite_url, expires_at }

# Accepter une invitation
POST /functions/v1/accept-invite
Body: { invite_token: string }
Response: { capsule_id, capsule: Capsule }
```

### Profil & Users

```
# Mon profil
GET /rest/v1/profiles?id=eq.{userId}

# Mettre à jour mon profil
PATCH /rest/v1/profiles?id=eq.{userId}
Body: Partial<Profile>

# Rechercher un utilisateur
GET /rest/v1/profiles?username=ilike.*{query}*&select=id,username,display_name,avatar_url

# Signaler une capsule
POST /rest/v1/reports
Body: { capsule_id, reason: string }
```

### Notifications (Expo Push)

```
# Enregistrer le token push
POST /rest/v1/push_tokens
Body: { user_id, expo_push_token, platform: 'ios' | 'android' }

# (Backend internal) Envoyer une notification
POST /functions/v1/send-notification
Body: {
  user_ids: string[],
  title: string,
  body: string,
  data: { capsule_id: string, type: 'unlock' | 'invite' | 'reaction' }
}
```

---

### Payload Types (TypeScript)

```typescript
// capsule.ts
export interface CapsuleCreatePayload {
  title?: string;
  hint?: string;
  cover_emoji?: string;
  audience_type: 'private' | 'person' | 'group' | 'public';
  unlock_condition: UnlockConditionPayload;
}

export interface UnlockConditionPayload {
  type: 'date' | 'location' | 'multi_fragment';
  unlock_date?: string;        // ISO 8601
  location?: {
    lat: number;
    lng: number;
    radius_meters: number;
    label?: string;
  };
  multi_fragment?: {
    total_fragments: number;
    fragment_locations?: Array<{
      fragment_index: number;
      lat: number;
      lng: number;
      radius_meters: number;
      label?: string;
    }>;
  };
}

export interface MapCapsule {
  id: string;
  title?: string;
  hint?: string;
  cover_emoji?: string;
  lat: number;
  lng: number;
  unlock_type: 'date' | 'location' | 'multi_fragment';
  status: 'sealed' | 'unlocked';
  creator: { username: string; avatar_url?: string };
}
```

---

## 5. Composants Principaux

### CapsuleCard
**Usage:** Feed principal, liste profil
```tsx
interface CapsuleCardProps {
  capsule: Capsule;
  variant: 'received' | 'created' | 'unlocked';
  onPress: () => void;
}
```
**UI:**
- Background: `Surface (#1A1A1A)`
- Coin supérieur droit: badge status (scellé 🔒 / débloqué ✨)
- Emoji cover : grand, centré, 48px
- Titre (Playfair Display, 18px)
- Sous-titre : condition résumée ("📅 Dans 2 jours" / "📍 À 350m" / "🧩 2/4 fragments")
- Si unlocked : timestamp de déblocage + preview thumbnail
- Bordure left: couleur selon type (ambre=date, turquoise=geo, corail=fragment)
- Pressable avec haptic feedback (`expo-haptics`)

### CapsuleMapPin
**Usage:** Carte Explore
```tsx
interface CapsuleMapPinProps {
  capsule: MapCapsule;
  isNearby: boolean; // dans le rayon d'unlock
  onPress: () => void;
}
```
**UI:**
- SVG custom : épingle Crumb (logo)
- Couleur selon type : ambre / turquoise / corail
- Si nearby : animation pulsante (Reanimated scale 1→1.3→1)
- Opacité réduite si déjà unlocked par l'user

### MediaPicker
**Usage:** Step 1 création
```tsx
interface MediaPickerProps {
  onMediaSelected: (media: MediaItem[]) => void;
  maxItems?: number; // default 5
}
```
**UI:**
- 4 boutons carrés en grille 2x2 : [Texte] [Photo] [Vidéo] [Vocal]
- Sélection multiple possible
- Preview strip en bas (thumbnails scrollables)
- Pour "Vocal" : waveform animée pendant recording
- Pour "Texte" : textarea avec compteur (2000 chars)

### UnlockConditionPicker
**Usage:** Step 2 création
```tsx
interface UnlockConditionPickerProps {
  value: UnlockConditionPayload | null;
  onChange: (condition: UnlockConditionPayload) => void;
}
```
**UI:**
- 3 cartes sélectionnables (radio style) :
  - 📅 Date → date/time picker iOS/Android natif
  - 📍 Lieu → MapView interactif avec pin draggable + slider rayon
  - 🧩 Fragments → stepper (2-6) + option positions géo par fragment
- Card sélectionnée : bordure accent color + background légèrement lumineux

### CapsuleUnlockAnimation
**Usage:** Écran de déblocage
```tsx
interface CapsuleUnlockAnimationProps {
  capsule: Capsule;
  onComplete: () => void;
}
```
**Séquence Reanimated:**
1. `withTiming`: enveloppe tremble (translateX -5→5→-5→0, 300ms)
2. `withSpring`: crack de lumière (opacity 0→1, scale 0.8→1.2→1)
3. `withSequence`: confettis (FlatList de particules colorées tombantes)
4. Contenu reveal : fragments apparaissent un par un (stagger 200ms)

### CapsuleCountdown
**Usage:** Capsule card + capsule detail (condition date)
```tsx
interface CapsuleCountdownProps {
  unlockDate: Date;
  style?: 'compact' | 'full'; // compact = "2j 14h", full = flip counter
}
```
**UI full:** Flip counter style horloge vintage (Reanimated 3)
**UI compact:** Badge `#F5C842` avec texte formaté

---

## 6. 5 Écrans MVP — UI Détaillée

---

### Écran 1 — Home (Feed)

**Route:** `/(tabs)/index.tsx`

**Layout:**
```
StatusBar (dark content)
─────────────────────────────
SafeAreaView (bg: #0D0D0D)
│
├── Header (sticky)
│   ├── Logo Crumb (SVG, 28px, left)
│   └── Avatar utilisateur (32px circle, right) → profil
│
├── Section Tabs (2 onglets) — sticky sous header
│   ├── [Reçues] [Mes capsules]     ← underline indicator #F5C842
│   └── Badge count sur "Reçues"
│
└── ScrollView (refresh-to-pull)
    │
    ├── [Si Reçues actif]
    │   ├── SectionHeader "En attente"
    │   │   └── CapsuleCard × N (variant: received, status: sealed)
    │   └── SectionHeader "Débloquées récemment"
    │       └── CapsuleCard × N (variant: unlocked)
    │
    └── [Si Mes capsules actif]
        ├── SectionHeader "Actives"
        │   └── CapsuleCard × N (variant: created, sealed)
        └── SectionHeader "Archives"
            └── CapsuleCard × N (variant: created, unlocked)

[Empty state]
─ Illustration SVG (capsule flottante)
─ Texte: "Aucune capsule pour l'instant."
─ Button: "Créer ma première capsule" → /create/step1-media
```

**Couleurs & typographie:**
- Background: `#0D0D0D`
- Section headers: Inter 12px uppercase, `#5C5C5C`, letter-spacing 1.5px
- Tab active: `#F0EDE8`, tab inactive: `#5C5C5C`

---

### Écran 2 — Explore (Carte)

**Route:** `/(tabs)/explore.tsx`

**Layout:**
```
Plein écran — MapView occupe 100% (react-native-maps)
│
├── MapView (style: dark custom)
│   ├── CapsuleMapPin × N (capsules publiques autour)
│   └── UserLocationMarker (point bleu pulsant)
│
├── Header flottant (top: SafeAreaView + blur bg)
│   ├── SearchBar (placeholder: "Chercher un lieu...")
│   └── FilterChips: [Tous] [📅 Date] [📍 Lieu] [🧩 Fragments]
│
├── FAB bouton "Centrer sur moi" (bottom-right, 48px circle, #1A1A1A)
│
└── BottomSheet (react-native-bottom-sheet)
    ├── [Collapsed] → juste drag handle
    └── [Expanded — sur tap d'un pin]
        ├── CapsulePreviewSheet:
        │   ├── Emoji (48px) + Title + Hint
        │   ├── Métadonnées: distance, type, créateur
        │   ├── [Si géo, nearby] Button "Débloquer ici 🔓" → CTA primary
        │   ├── [Si géo, far] "À {distance}m · Approche-toi"
        │   ├── [Si date] Countdown + "Tu pourras l'ouvrir le {date}"
        │   └── [Si fragment] "Fragment {n}/{total} disponible ici"
        └── Swipe down → collapse
```

**Config carte dark mode:**
```json
[
  { "elementType": "geometry", "stylers": [{ "color": "#1a1a2e" }] },
  { "elementType": "labels.text.fill", "stylers": [{ "color": "#8ec3b9" }] },
  { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#304a7d" }] },
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#0e1d3e" }] }
]
```

---

### Écran 3 — Création Capsule (Wizard Step 1 : Médias)

**Route:** `/create/step1-media.tsx`

**Layout:**
```
SafeAreaView (bg: #0D0D0D)
│
├── Header
│   ├── ← Fermer (X, left)
│   ├── "Créer une capsule" (center, Inter 16px medium)
│   └── ProgressSteps: ●○○○○ (step 1/5)
│
├── ScrollView
│   │
│   ├── Section "Qu'est-ce que tu veux partager ?"
│   │   (Playfair Display 22px, multi-ligne)
│   │
│   ├── MediaTypeGrid (2×2)
│   │   ├── [📝 Texte]    → TextInput modal
│   │   ├── [📷 Photo]    → expo-image-picker (gallery + camera)
│   │   ├── [🎥 Vidéo]    → expo-image-picker (video, max 100MB)
│   │   └── [🎙 Vocal]    → recording overlay inline
│   │
│   ├── [Si items sélectionnés] MediaPreviewStrip
│   │   └── ScrollView horizontal
│   │       └── Preview items (thumbnail/icon) + ✕ remove
│   │
│   └── [Si recording vocal actif]
│       ├── Waveform animée (bars + fréquence)
│       ├── Timer "00:23"
│       └── [⏹ Stop] [🗑 Annuler]
│
└── Footer
    └── Button "Continuer →" (primary, disabled si aucun media)
        → navigate to step2-condition
```

**Constraints:**
- Max 5 médias par capsule
- Image: JPEG/PNG, auto-compressé < 5MB
- Vidéo: max 100MB, warning si > 50MB
- Vocal: max 5 minutes
- Texte: max 2000 chars

---

### Écran 4 — Capsule Débloquée (Reveal)

**Route:** `/capsule/unlock/[id].tsx`

**Layout:**
```
[Phase 1 — Animation (1.5s)]
  Fond noir → enveloppe tremble → crack lumière dorée
  (Reanimated 3 + Lottie animation)

[Phase 2 — Reveal]
SafeAreaView (bg: gradient #0D0D0D → #1A0D00)
│
├── Header
│   ├── ← Retour
│   └── Avatar + "De {displayName}" (right)
│
├── ContentScrollView
│   ├── Confetti layer (absolu, pointer-events: none)
│   │
│   ├── CapsuleHeader
│   │   ├── Emoji (64px, animé scale-in)
│   │   ├── Title (Playfair Display 26px)
│   │   └── "Débloqué le {date}" (Inter 12px, #5C5C5C)
│   │
│   └── FragmentList (stagger fade-in, 200ms apart)
│       ├── [Si text] TextBlock (Inter 16px, line-height 26px)
│       ├── [Si image] FullWidth image (border-radius 12, tap to fullscreen)
│       ├── [Si video] VideoPlayer (react-native-video, controls)
│       └── [Si audio] AudioPlayer (waveform + play/pause, timer)
│
└── Footer
    ├── ReactionBar
    │   ├── EmojiQuickReact: [❤️] [😭] [🤯] [✨] [🙏]
    │   └── Button "Répondre par message..." → TextInput modal
    └── ShareButton "Partager ma découverte" → iOS/Android share sheet
```

**Haptics:** `expo-haptics.notificationAsync(SUCCESS)` au moment du reveal.

---

### Écran 5 — Profil

**Route:** `/(tabs)/profile.tsx`

**Layout:**
```
SafeAreaView (bg: #0D0D0D)
│
├── Header
│   ├── "Mon profil" (left, Inter 20px bold)
│   └── ⚙️ Settings (right) → /profile/settings
│
├── ScrollView
│   │
│   ├── ProfileHero
│   │   ├── Avatar (72px circle + border #F5C842 si pro)
│   │   ├── @username (Inter 16px, #9E9E9E)
│   │   ├── displayName (Playfair Display 22px)
│   │   ├── Bio (Inter 14px, max 2 lignes)
│   │   └── EditButton "Modifier" → edit profile modal
│   │
│   ├── StatsRow (3 colonnes égales)
│   │   ├── [XX] Capsules créées
│   │   ├── [XX] Débloquées
│   │   └── [XX] Reçues
│   │   (chiffres: Playfair Display 28px #F5C842, labels: Inter 11px #9E9E9E)
│   │
│   ├── Section "Mes capsules actives"
│   │   └── HorizontalScrollView
│   │       └── CapsuleCard compact × N (variant: created)
│   │       └── Si vide: EmptyStateCard "Crée ta première capsule +"
│   │
│   ├── Section "Capsules débloquées"
│   │   └── Grid 2 colonnes
│   │       └── CapsuleCard compact × N (variant: unlocked)
│   │
│   └── Section "Autres"
│       ├── ListItem "Inviter des amis" → share invite link
│       ├── ListItem "Paramètres" → /profile/settings
│       ├── ListItem "Aide & Support" → Intercom/web
│       └── ListItem "Déconnexion" (couleur corail #FF6B6B)
```

---

## 7. Configuration & Environment

### app.json (Expo)
```json
{
  "expo": {
    "name": "Crumb",
    "slug": "crumb-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "crumb",
    "userInterfaceStyle": "dark",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#0D0D0D"
    },
    "ios": {
      "supportsTablet": false,
      "bundleIdentifier": "app.crumb.mobile",
      "infoPlist": {
        "NSLocationWhenInUseUsageDescription": "Crumb utilise votre position pour débloquer les capsules géolocalisées.",
        "NSCameraUsageDescription": "Pour créer des capsules avec des photos et vidéos.",
        "NSMicrophoneUsageDescription": "Pour enregistrer des messages vocaux dans vos capsules.",
        "NSPhotoLibraryUsageDescription": "Pour sélectionner des photos et vidéos depuis votre galerie."
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#0D0D0D"
      },
      "package": "app.crumb.mobile",
      "permissions": [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "CAMERA",
        "RECORD_AUDIO",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ]
    },
    "plugins": [
      "expo-router",
      "expo-location",
      ["expo-notifications", {
        "icon": "./assets/images/notification-icon.png",
        "color": "#F5C842"
      }],
      "expo-camera",
      "expo-av"
    ]
  }
}
```

### Variables d'environnement (.env.local)
```bash
# Supabase
EXPO_PUBLIC_SUPABASE_URL=https://[project].supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# MapBox
EXPO_PUBLIC_MAPBOX_TOKEN=pk.eyJ...

# Sentry
EXPO_PUBLIC_SENTRY_DSN=https://...

# PostHog
EXPO_PUBLIC_POSTHOG_KEY=phc_...
EXPO_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Feature flags
EXPO_PUBLIC_FEATURE_MULTI_FRAGMENT=true
EXPO_PUBLIC_FEATURE_PUBLIC_MAP=true
EXPO_PUBLIC_MAX_CAPSULES_FREE=10
```

### constants/colors.ts
```typescript
export const Colors = {
  // Backgrounds
  bg: '#0D0D0D',
  surface: '#1A1A1A',
  surfaceAlt: '#242424',
  
  // Accents
  amber: '#F5C842',
  teal: '#4ECDC4',
  coral: '#FF6B6B',
  
  // Text
  textPrimary: '#F0EDE8',
  textSecondary: '#9E9E9E',
  textHint: '#5C5C5C',
  
  // Unlock type colors
  unlockDate: '#F5C842',
  unlockGeo: '#4ECDC4',
  unlockFragment: '#FF6B6B',
  
  // System
  success: '#51CF66',
  error: '#FF6B6B',
  warning: '#FFD43B',
} as const;
```

---

## 8. Services Tiers

| Service | Usage | Plan / Coût |
|---------|-------|------------|
| **Supabase** | Auth, DB, Storage, Realtime | Free → Pro $25/mo |
| **Expo EAS** | Build + OTA updates | Free → Production $99/mo |
| **MapBox** | Tiles carte Explore | Free < 25K MAU |
| **Sentry** | Crash reporting | Free < 5K errors/mo |
| **PostHog** | Analytics produit | Free < 1M events/mo |
| **Expo Push** | Notifications push | Gratuit (inclus Expo) |
| **Lottie** | Animations (json) | Open source |

### Supabase Row Level Security (RLS) — Règles clés

```sql
-- Capsules : visible si public OU si creator OU si recipient
CREATE POLICY "capsule_select" ON capsules FOR SELECT USING (
  audience_type = 'public'
  OR creator_id = auth.uid()
  OR id IN (
    SELECT capsule_id FROM capsule_recipients
    WHERE user_id = auth.uid()
  )
);

-- Capsules : modification seulement par creator ET si draft
CREATE POLICY "capsule_update" ON capsules FOR UPDATE USING (
  creator_id = auth.uid() AND status = 'draft'
);

-- Fragments : visible si capsule visible (via policy capsules)
CREATE POLICY "fragment_select" ON fragments FOR SELECT USING (
  capsule_id IN (SELECT id FROM capsules) -- hérite policy capsule
);

-- Profils : public en lecture
CREATE POLICY "profiles_select" ON profiles FOR SELECT USING (true);
CREATE POLICY "profiles_update" ON profiles FOR UPDATE USING (id = auth.uid());
```

---

### Notes pour l'agent dev

1. **Commencer par** : Setup Supabase local (`supabase start`) + migrations SQL + seed data
2. **Ordre de build recommandé** :
   - Auth flow (login/signup)
   - Profil basique
   - Création capsule (texte + image, condition date uniquement)
   - Feed home + capsule detail
   - Explore carte (capsules publiques)
   - Notifications
   - Condition géo + multi-fragments
3. **Points d'attention** :
   - Tester la géolocalisation sur device réel (émulateur GPS = imprécis)
   - Compression vidéo côté client AVANT upload (expo-video-thumbnails + ffmpeg via expo-av)
   - Les animations de déblocage sont critiques pour l'émotion produit — ne pas les négliger
   - RLS Supabase doit être testé dès le début, pas en fin de projet
4. **Mock data** : Utiliser `supabase/seed.sql` avec 20 capsules de test (5 de chaque type)

---

*Specs maintenues par le bureau Produit Crumb.*  
*Toute évolution doit passer par une PR + validation CPO.*
