# CRUMB — Product Requirements Document
> *Moments shared through space & time*

**Version:** 1.0  
**Date:** February 2026  
**Author:** CPO — Product Strategy  
**Status:** Ready for Dev Handoff

---

## Table of Contents

1. [Vision & Positionnement](#1-vision--positionnement)
2. [Personas](#2-personas)
3. [User Stories](#3-user-stories)
4. [Fonctionnalités MVP](#4-fonctionnalités-mvp)
5. [Fonctionnalités V2](#5-fonctionnalités-v2)
6. [Architecture Info & Navigation](#6-architecture-info--navigation)
7. [Design Principles](#7-design-principles)
8. [Métriques de succès](#8-métriques-de-succès)
9. [Roadmap](#9-roadmap)
10. [Risques & Mitigations](#10-risques--mitigations)

---

## 1. Vision & Positionnement

### Tagline
> **"Leave a piece of yourself, for the right moment."**

Variante secondaire : *"Moments shared through space & time"*

### Vision 3 ans

D'ici 2029, Crumb est **la plateforme de référence pour la mémoire contextuelle partagée** — une couche émotionnelle au-dessus du monde physique et du temps. Chaque lieu, chaque date, chaque groupe peut porter un souvenir caché, révélé uniquement quand le moment est mûr. Crumb devient l'équivalent numérique d'une lettre dans une bouteille à la mer — mais avec GPS et intelligence collective.

Nous visons :
- **5M d'utilisateurs actifs mensuels** dans 10 pays
- **L'app n°1 des capsules temporelles numériques** (catégorie créée par Crumb)
- Un réseau d'émotions géolocalisées : des millions de crumbs cachés dans le monde, attendant d'être découverts

### Proposition de valeur unique

Crumb n'est pas une app de partage de contenu. C'est une app de **différé émotionnel**. La valeur n'est pas dans la création — elle est dans le **moment de découverte**, orchestré par le temps, l'espace, ou la collecte.

| Dimension | Ce que Crumb apporte |
|-----------|---------------------|
| **Temporalité** | Le contenu a une date de naissance et une date de révélation |
| **Intention** | Chaque capsule est un acte délibéré, pas un post impulsif |
| **Surprise** | Le destinataire ne sait pas (toujours) ce qui l'attend |
| **Contexte** | L'unlock se produit dans les bonnes conditions — pas avant |
| **Mémoire collective** | Un groupe, une famille, un couple partagent des instants différés |

### Différenciation concurrentielle

| Critère | Google Photos | BeReal | Snapchat | **Crumb** |
|---------|--------------|--------|----------|-----------|
| Création différée | ❌ | ❌ | ❌ | ✅ |
| Déblocage géolocalisé | ❌ | ❌ | ❌ | ✅ |
| Capsules multi-fragments | ❌ | ❌ | ❌ | ✅ |
| Authenticité / intention | Archivage | Spontanéité | Éphémère | **Permanence différée** |
| Audience ciblée | Album partagé | Public | Amis | **Granulaire (1 personne → monde)** |
| Émotion principale | Nostalgie passive | FOMO / présence | Fun / ephemère | **Anticipation + surprise** |
| Modèle de données | Organisé par date | Chronologique | Par conversation | **Par condition de révélation** |

**Positionnement :** Crumb est à Google Photos ce que les lettres à ouvrir dans 10 ans sont aux SMS. C'est de la **mémoire intentionnelle**, pas de l'archivage automatique.

---

## 2. Personas

### Persona 1 — Léa, 27 ans
**"La romantique connectée"**

| Champ | Détail |
|-------|--------|
| **Situation** | Designer UX en agence, en couple depuis 3 ans, vit à Lyon |
| **Tech** | iPhone Pro, TikTok, Instagram, Notion pour ses journaux |
| **Motivation Crumb** | Créer des souvenirs cachés pour son partenaire — retrouver un message vocal le jour de leur anniversaire, ou découvrir une photo en arrivant dans le restaurant de leur premier rendez-vous |
| **Besoins** | Simplicité de création, esthétique soignée, sentiment d'un cadeau numérique |
| **Frustrations** | Les apps actuelles n'ont pas de "poids" émotionnel. Une story disparaît, un post se noie. Elle veut que ses moments *comptent*. |
| **Comportement** | Crée du contenu avec soin, pas en masse. Préfère la qualité à la quantité. Utilise l'app 2-3x par semaine, souvent le soir. |
| **Citation** | *"J'ai envie que dans 5 ans, on retrouve nos premiers messages — mais au bon moment, pas en scrollant."* |

---

### Persona 2 — Marc, 41 ans
**"Le père prévoyant"**

| Champ | Détail |
|-------|--------|
| **Situation** | Directeur commercial, père de 2 enfants (8 et 12 ans), Bordeaux |
| **Tech** | Android, WhatsApp intensif, Google Photos pour les familles |
| **Motivation Crumb** | Préparer des capsules pour ses enfants — une vidéo à ouvrir le jour du bac, une lettre à lire à leurs 18 ans, un album de vacances à revivre en famille dans 10 ans |
| **Besoins** | Fiabilité à long terme, confidentialité totale, gestion de plusieurs destinataires, interface simple |
| **Frustrations** | Peur que les plateformes disparaissent. Peur de mourir sans avoir transmis les bonnes choses. Les apps "normales" ne sont pas faites pour ça. |
| **Comportement** | Utilise l'app rarement mais de manière très intentionnelle. Chaque capsule est préparée avec soin. Veut un "coffre-fort numérique émotionnel". |
| **Citation** | *"Je veux que mes enfants puissent m'entendre le jour de leur mariage, même si je ne suis plus là."* |

---

### Persona 3 — Sofia, 22 ans
**"L'exploratrice sociale"**

| Champ | Détail |
|-------|--------|
| **Situation** | Étudiante en master de sociologie, Paris, très active sur les réseaux |
| **Tech** | iPhone, Instagram, BeReal, Discord pour ses communautés |
| **Motivation Crumb** | Découvrir des capsules publiques cachées dans la ville, créer des "chasses au trésor" numériques avec ses amis, laisser des messages dans des endroits symboliques |
| **Besoins** | Gamification, carte interactive, expérience sociale et virale, sentiment de "secret partagé" |
| **Frustrations** | BeReal est trop banal, Instagram trop performatif. Elle cherche quelque chose de *mystérieux*, de *collectif*, de *local*. |
| **Comportement** | Utilise l'app quotidiennement pour explorer. Crée des capsules géolocalisées dans des endroits symboliques. Partage ses découvertes sur Instagram Stories. |
| **Citation** | *"J'adore l'idée qu'il y a un message caché quelque part dans ce café — et que je suis la première à le trouver."* |

---

## 3. User Stories

### MVP — 20 User Stories essentielles

#### Création
1. **En tant qu'utilisateur**, je veux **créer une capsule avec du texte, une image, une vidéo ou un vocal** pour **immortaliser un moment sous la forme que je choisis**.
2. **En tant qu'utilisateur**, je veux **combiner plusieurs types de médias dans une seule capsule** pour **créer une expérience riche et multi-dimensionnelle**.
3. **En tant qu'utilisateur**, je veux **définir une date de déblocage future** pour **m'assurer que la capsule ne soit pas ouverte avant le bon moment**.
4. **En tant qu'utilisateur**, je veux **définir un lieu précis de déblocage** pour **que la capsule ne s'ouvre que quand le destinataire est physiquement présent à cet endroit**.
5. **En tant qu'utilisateur**, je veux **créer plusieurs fragments d'une même capsule** pour **que le destinataire doive les collecter toutes avant de voir le contenu complet**.
6. **En tant qu'utilisateur**, je veux **choisir à qui est destinée ma capsule** (moi-même, une personne, un groupe, ou public) pour **contrôler précisément qui peut y accéder**.
7. **En tant qu'utilisateur**, je veux **ajouter un titre et une description à ma capsule** pour **donner un contexte sans révéler le contenu**.
8. **En tant qu'utilisateur**, je veux **prévisualiser ma capsule avant de la sceller** pour **m'assurer qu'elle est exactement comme je le souhaite**.
9. **En tant qu'utilisateur**, je veux **sceller définitivement ma capsule** (action irréversible) pour **lui donner un caractère sacré et intentionnel**.

#### Découverte & Déblocage
10. **En tant que destinataire**, je veux **recevoir une notification quand une capsule m'est destinée** pour **savoir qu'un secret m'attend**.
11. **En tant que destinataire**, je veux **être notifié quand la condition de déblocage est remplie** pour **vivre l'instant de révélation au bon moment**.
12. **En tant qu'utilisateur**, je veux **voir une carte avec les capsules publiques proches de moi** pour **explorer mon environnement comme une chasse au trésor**.
13. **En tant qu'utilisateur**, je veux **voir l'état de mes capsules en cours** (scellées, débloquées, en attente de fragments) pour **suivre mes créations et collections**.
14. **En tant qu'utilisateur**, je veux **débloquer une capsule géolocalisée en me rendant à l'endroit précis** pour **vivre une expérience de découverte physique**.
15. **En tant qu'utilisateur**, je veux **voir un compte à rebours pour mes capsules temporelles** pour **ressentir l'anticipation du dévoilement**.

#### Profil & Social
16. **En tant qu'utilisateur**, je veux **créer un compte avec email ou OAuth (Google/Apple)** pour **accéder à mes capsules depuis n'importe quel device**.
17. **En tant qu'utilisateur**, je veux **voir mon profil avec mes capsules créées et reçues** pour **avoir un historique de mes moments partagés**.
18. **En tant qu'utilisateur**, je veux **inviter un ami à rejoindre Crumb via un lien** pour **lui envoyer une capsule même s'il n'est pas encore inscrit**.
19. **En tant qu'utilisateur**, je veux **réagir à une capsule débloquée** (emoji, réponse texte) pour **clore la boucle émotionnelle avec l'expéditeur**.
20. **En tant qu'utilisateur**, je veux **signaler une capsule publique inappropriée** pour **maintenir la qualité de l'écosystème**.

---

### V2 — 15 User Stories avancées

#### Collaboratif
1. **En tant qu'utilisateur**, je veux **inviter plusieurs personnes à contribuer à une même capsule** pour **créer un souvenir collectif à plusieurs voix**.
2. **En tant que membre d'un groupe**, je veux **voir la progression de la capsule collaborative** (combien de fragments ont été ajoutés) pour **savoir si tout le monde a contribué**.
3. **En tant qu'utilisateur**, je veux **créer une capsule de groupe avec un unlock collectif** (tous les membres doivent être au même endroit en même temps) pour **orchestrer une réunion surprise**.

#### Legacy & Émotionnel
4. **En tant qu'utilisateur**, je veux **désigner un "gardien"** qui pourra débloquer ma capsule si je ne suis plus actif pendant X mois pour **m'assurer que mes messages posthumes seront délivrés**.
5. **En tant qu'utilisateur**, je veux **créer une capsule "Legacy"** débloquée par un tiers de confiance après validation pour **préparer un message à ouvrir après ma mort**.
6. **En tant que destinataire d'une capsule Legacy**, je veux **recevoir une notification douce et accompagnée** pour **vivre ce moment difficile avec respect**.

#### AR & Géo avancé
7. **En tant qu'utilisateur**, je veux **voir une capsule géolocalisée en réalité augmentée** (visible via la caméra du phone quand je suis sur place) pour **une expérience immersive de découverte**.
8. **En tant qu'utilisateur**, je veux **définir un rayon de découverte** (5m, 50m, 500m) pour **contrôler la précision nécessaire pour débloquer**.
9. **En tant qu'utilisateur**, je veux **recevoir des indices progressifs pour trouver une capsule géolocalisée** pour **gamifier la découverte comme une chasse au trésor**.

#### Famille & Couples
10. **En tant qu'utilisateur**, je veux **créer un "espace famille"** avec des capsules partagées visible uniquement par les membres pour **centraliser les souvenirs familiaux importants**.
11. **En tant que couple**, je veux **avoir un journal de capsules partagé** visible uniquement à deux pour **construire une timeline intime de notre relation**.

#### Dev & API
12. **En tant que développeur**, je veux **accéder à une API REST** pour créer des capsules programmatiquement pour **intégrer Crumb dans d'autres apps ou automatisations**.
13. **En tant que développeur**, je veux **recevoir un webhook** quand une capsule est débloquée pour **déclencher des actions externes** (Zapier, IFTTT, etc.).
14. **En tant qu'utilisateur**, je veux **importer mes photos Google Photos ou iCloud** pour **créer des capsules depuis mes souvenirs existants**.
15. **En tant qu'utilisateur**, je veux **exporter toutes mes capsules** (données + médias) pour **garantir que mes souvenirs m'appartiennent toujours**.

---

## 4. Fonctionnalités MVP

### Priorisation (MoSCoW)

#### 🔴 Must Have
| # | Feature | Effort | Impact |
|---|---------|--------|--------|
| 1 | Authentification (email + Apple/Google OAuth) | M | H |
| 2 | Création de capsule (texte, image, vidéo, vocal) | L | H |
| 3 | Condition de déblocage : Date | S | H |
| 4 | Condition de déblocage : Géolocalisation | M | H |
| 5 | Condition de déblocage : Multi-fragments | M | H |
| 6 | Audience : Privé / Personne / Groupe / Public | M | H |
| 7 | Notification de déblocage (push) | M | H |
| 8 | Carte des capsules publiques | M | H |
| 9 | Profil utilisateur + liste "Mes capsules" | S | H |
| 10 | Scellage irréversible d'une capsule | S | H |

#### 🟡 Should Have
| # | Feature | Effort | Impact |
|---|---------|--------|--------|
| 11 | Réaction à une capsule débloquée | S | M |
| 12 | Invitation par lien (non-utilisateur) | M | M |
| 13 | Compte à rebours capsule temporelle | S | M |
| 14 | Signalement de contenu | S | M |
| 15 | Onboarding interactif (3 écrans) | S | H |

#### 🟢 Could Have
| # | Feature | Effort | Impact |
|---|---------|--------|--------|
| 16 | Recherche de capsules publiques par tag/lieu | M | M |
| 17 | Statistiques créateur (vues, unlocks) | M | L |
| 18 | Thèmes visuels pour la capsule | S | M |

---

### UX Flows détaillés

#### Flow 1 — Création de Capsule (Step by Step)

```
ÉTAPE 1 — Trigger
  └── Bouton "+" central dans la bottom bar
      → Animation d'ouverture (capsule qui s'ouvre)

ÉTAPE 2 — Choix du média (required, min 1)
  └── 4 options présentées :
      [📝 Texte] [📷 Photo] [🎥 Vidéo] [🎙 Vocal]
  └── Possibilité d'ajouter plusieurs types (carousel)
  └── Preview en temps réel sous les options

ÉTAPE 3 — Condition de déblocage (required, 1 type)
  └── 3 cartes sélectionnables :
      [📅 Date] → Date picker (min: demain)
      [📍 Lieu] → Carte + pin + rayon (50m, 200m, 1km)
      [🧩 Fragments] → Slider 2-6 fragments → flux de création répété
  └── Combinaison possible (Date + Lieu) en V1.1

ÉTAPE 4 — Audience
  └── 4 options :
      [🔒 Privé] → Seulement moi
      [👤 Personne] → Recherche contact / lien d'invitation
      [👥 Groupe] → Sélection multi (contacts Crumb)
      [🌍 Public] → Visible sur la carte (modéré)
  └── Pour Personne/Groupe : confirmation des destinataires

ÉTAPE 5 — Détails optionnels
  └── Titre (50 chars max)
  └── Description / indice (140 chars max)
  └── Emoji de couverture (picker)

ÉTAPE 6 — Preview & Scellage
  └── Vue "enveloppe fermée" de la capsule
  └── Résumé : contenu, condition, audience
  └── CTA : [✉️ Sceller la capsule]
  └── Confirmation modal : "Cette action est irréversible. Prêt ?"
  └── Animation de scellage → confetti → retour au feed

ERREURS GÉRÉES :
  - Fichier trop lourd (> 100MB vidéo) → compression automatique ou avertissement
  - Lieu trop vague → zoom requis sur la carte
  - Destinataire non trouvé → option "Inviter par lien"
```

---

#### Flow 2 — Découverte et Déblocage

```
DÉCOUVERTE PASSIVE (notification push)
  └── "🎉 Ta capsule de [Prénom] est prête !"
      → Tap → App s'ouvre sur la capsule
      → Condition vérifiée côté serveur
      → Si OK → Animation de déballage (enveloppe qui s'ouvre)
      → Contenu révélé progressivement
      → CTA : [Répondre] ou [💖 Réagir]

DÉCOUVERTE ACTIVE (carte)
  └── Onglet "Explore" → Carte MapBox centré sur position
  └── Pins colorés selon type (date=bleu, geo=vert, fragments=orange)
  └── Capsules à portée : ombre + animation pulsante
  └── Tap sur pin :
      → Preview card (titre, emoji, hint, distance)
      → Si géo : CTA "Je suis là" → vérification GPS
        → Si match → Déblocage + animation
        → Si pas match → "Approche-toi encore"
      → Si date : countdown visible
      → Si fragments : "X/Y fragments collectés"

UNLOCK ANIMATION :
  - L'enveloppe tremble → crack → lumière → contenu apparaît
  - Son doux (optionnel, respect du mode silencieux)
  - Confettis légers
  - Partage automatiquement dans le fil "Mes capsules" → "Débloquées"
```

---

#### Flow 3 — Partage avec une Personne

```
CRÉATEUR :
  └── Étape 4 du flow création → [👤 Personne]
  └── Recherche dans contacts Crumb (par username ou email)
  └── Si non trouvé :
      → [Inviter par lien] → génère un deep link unique
      → Partage via WhatsApp / SMS / Email natif (iOS/Android share sheet)
      → Le lien expire après 7 jours si pas accepté

DESTINATAIRE (avec compte) :
  └── Notification : "Tu as reçu une capsule de [Prénom] 🔮"
  └── Tap → écran "Capsule reçue" (titre, hint, condition)
  └── Condition visible mais contenu verrouillé jusqu'au bon moment

DESTINATAIRE (sans compte) :
  └── Lien → Landing page web de Crumb
  └── Preview animée de la capsule (titre + animation mystère)
  └── CTA : "Crée ton compte pour la débloquer"
  └── Après signup → capsule automatiquement dans son compte
  └── Si condition déjà remplie → déblocage immédiat

BOUCLE DE RETOUR :
  └── Après déblocage → destinataire peut envoyer une réaction
  └── Créateur reçoit notification + réaction dans le fil
```

---

## 5. Fonctionnalités V2

### 5.1 Capsules Collaboratives
Plusieurs auteurs peuvent contribuer à une même capsule. Chaque auteur ajoute un fragment (photo, vocal, texte). La capsule n'est scellée que quand tous les contributeurs ont ajouté leur part (ou à une deadline). Utile pour : souvenirs de groupe, road trips, anniversaires collectifs.

**Mécanique :** Créateur → invite des co-auteurs → chacun voit "À compléter" → upload leur fragment → Créateur scelle → Destinataire voit une mosaïque

### 5.2 Legacy Mode
Déblocage conditionnel basé sur l'inactivité du créateur. Un "gardien" (personne de confiance) est désigné. Si le compte est inactif > 6 mois, un email est envoyé au créateur pour confirmer. Sans réponse sous 30 jours → le gardien peut autoriser le déblocage des capsules Legacy. Options avancées : intégration avec un service de verification de décès (V3).

### 5.3 AR Viewer
En mode géolocalisé, à proximité d'une capsule publique, le viewfinder de la caméra affiche un overlay AR de l'emplacement de la capsule (épingle animée 3D). Le tap sur l'épingle AR → déblocage si conditions remplies. Technologies : ARKit (iOS) / ARCore (Android) via expo-camera + three.js/react-native-arkit.

### 5.4 Intégration Famille/Couples
- **Espace Famille** : Créer un groupe privé permanent avec des capsules partagées, une timeline familiale et des rôles (admin, membre).
- **Mode Couple** : Espace à deux avec un journal de capsules chronologique, anniversaires automatiques suggérés, et capsule "1 an ensemble" générée automatiquement.

### 5.5 API pour développeurs
- REST API documentée (Swagger/OpenAPI)
- Webhooks pour les événements clés (capsule créée, débloquée, réaction reçue)
- SDK JavaScript/TypeScript
- Cas d'usage : intégration dans apps wedding planners, apps deuil, apps famille

---

## 6. Architecture Info & Navigation

### Navigation principale

```
Bottom Tab Bar (5 tabs) :
├── 🏠 Home (Feed)
├── 🗺️ Explore (Carte)
├── ➕ Créer (CTA central, pill style)
├── 🔔 Notifications
└── 👤 Profil
```

### Hiérarchie des écrans

```
APP
├── AUTH
│   ├── Splash / Onboarding (3 slides)
│   ├── Login
│   └── Signup
│
├── HOME (Feed)
│   ├── Capsules reçues (en attente)
│   ├── Capsules débloquées (récentes)
│   └── Capsule Detail (modal)
│       ├── Vue scellée (countdown / hint / condition)
│       └── Vue débloquée (contenu + réaction)
│
├── EXPLORE (Carte)
│   ├── MapView (capsules publiques)
│   ├── Capsule Preview Card (bottom sheet)
│   └── Capsule Unlock Screen (modal)
│
├── CRÉER
│   ├── Step 1 — Media
│   ├── Step 2 — Unlock Condition
│   ├── Step 3 — Audience
│   ├── Step 4 — Details
│   └── Step 5 — Preview & Seal
│
├── NOTIFICATIONS
│   ├── Capsule unlocked (received)
│   ├── Fragment collected
│   ├── Reaction received
│   └── System (invitations, etc.)
│
└── PROFIL
    ├── Mon profil (stats, avatar, username)
    ├── Mes capsules créées
    │   ├── En attente (scellées)
    │   └── Débloquées
    ├── Mes capsules reçues
    ├── Paramètres
    │   ├── Notifications
    │   ├── Confidentialité
    │   ├── Compte
    │   └── À propos
    └── Inviter des amis
```

---

### Modèle de données

#### User
```typescript
interface User {
  id: string;                    // UUID
  username: string;              // @handle unique
  displayName: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: Date;
  settings: {
    notificationsEnabled: boolean;
    locationEnabled: boolean;
    profileVisibility: 'public' | 'friends' | 'private';
  };
}
```

#### Capsule
```typescript
interface Capsule {
  id: string;                    // UUID
  creatorId: string;             // ref User
  title?: string;                // max 50 chars
  hint?: string;                 // max 140 chars — visible avant déblocage
  coverEmoji?: string;
  status: 'draft' | 'sealed' | 'unlocked' | 'expired';
  audience: {
    type: 'private' | 'person' | 'group' | 'public';
    recipientIds?: string[];     // ref User[]
    groupId?: string;
  };
  unlockCondition: UnlockCondition;
  fragments: Fragment[];
  reactions: Reaction[];
  createdAt: Date;
  sealedAt?: Date;
  unlockedAt?: Date;
  viewCount: number;
  isReported: boolean;
}
```

#### Fragment
```typescript
interface Fragment {
  id: string;                    // UUID
  capsuleId: string;             // ref Capsule
  authorId: string;              // ref User (collaboratif V2)
  type: 'text' | 'image' | 'video' | 'audio';
  content: {
    text?: string;               // max 2000 chars
    mediaUrl?: string;           // CDN URL
    mediaThumbnailUrl?: string;
    duration?: number;           // seconds (video/audio)
    mimeType?: string;
  };
  order: number;                 // position dans la capsule
  createdAt: Date;
  uploadStatus: 'pending' | 'processing' | 'ready' | 'failed';
}
```

#### UnlockCondition
```typescript
interface UnlockCondition {
  type: 'date' | 'location' | 'multi_fragment' | 'combined';
  
  // Type: date
  unlockDate?: Date;
  
  // Type: location
  location?: {
    lat: number;
    lng: number;
    radiusMeters: number;        // 50, 200, 500, 1000
    label?: string;              // "Notre café préféré"
  };
  
  // Type: multi_fragment
  multiFragment?: {
    totalFragments: number;      // 2-6
    collectedFragmentIds: string[];
    fragmentLocations?: Array<{  // Optionnel : chaque fragment à un lieu
      fragmentIndex: number;
      lat: number;
      lng: number;
      radiusMeters: number;
    }>;
  };
  
  // Combined (V1.1)
  combined?: {
    date: Date;
    location: UnlockCondition['location'];
    operator: 'AND' | 'OR';
  };
}
```

#### Reaction
```typescript
interface Reaction {
  id: string;
  capsuleId: string;
  authorId: string;
  type: 'emoji' | 'text' | 'audio';
  emoji?: string;
  text?: string;
  audioUrl?: string;
  createdAt: Date;
}
```

---

## 7. Design Principles

### Philosophie visuelle

Crumb est une app **émotionnelle, intime et mystérieuse**. Le design doit évoquer :
- L'enveloppe cachetée d'une lettre secrète
- Le carnet de voyage artisanal
- La lumière filtrée d'un Polaroid

### Palette de couleurs

```
PRIMARY (Dark Mode — défaut)
  Background:    #0D0D0D (noir profond)
  Surface:       #1A1A1A (gris très sombre)
  Surface Alt:   #242424 (cartes, modals)
  
  Accent 1:      #F5C842 (ambre chaud — capsules temporelles)
  Accent 2:      #4ECDC4 (turquoise — capsules géolocalisées)
  Accent 3:      #FF6B6B (corail — fragments / urgence)
  
  Text Primary:  #F0EDE8 (blanc cassé, chaud)
  Text Secondary:#9E9E9E (gris moyen)
  Text Hint:     #5C5C5C (gris foncé)

LIGHT MODE (optionnel V2)
  Background:    #FAF8F5 (blanc crème)
  Surface:       #FFFFFF
  Accent 1:      #E6B800 (ambre plus sombre)
```

### Typographie

- **Display / Titres :** `Playfair Display` — serif élégant, émotionnel
- **Body / UI :** `Inter` — neutre, lisible, mobile-first
- **Monospace (codes, données):** `JetBrains Mono`

### Iconographie & Logo

**Logo :** Une épingle de localisation minimaliste. L'intérieur de l'épingle contient 3-5 petits points (les "crumbs" / miettes). Style : noir et blanc, géométrique, intemporel.

```
  ●
 ╱ ╲
│• •│  ← dots inside = crumbs
│ • │
 ╲ ╱
  ▼
```

SVG clean, fonctionne en favicon, app icon, et icône de marqueur sur la carte.

### Animations & Micro-interactions

| Moment | Animation |
|--------|-----------|
| Scellage d'une capsule | Enveloppe qui se ferme, cire qui tombe |
| Déblocage d'une capsule | Enveloppe qui tremble → crack de lumière → révélation |
| Pin géo sur la carte | Pulsation douce, halo de lumière |
| Ajout de média | Drag & drop avec spring physics |
| Compte à rebours | Flip counter type horloge vintage |
| Notification | Badge animé + son discret |

**Principe :** Les animations durent < 600ms. Elles récompensent l'action sans la ralentir. On utilise `react-native-reanimated` (Reanimated 3).

### Ton & Voix de marque

| Contexte | Ton | Exemple |
|---------|-----|---------|
| Onboarding | Mystérieux, invitant | *"Quelque chose vous attend. Quelque part. Pour plus tard."* |
| Création | Encourageant, complice | *"Qu'allez-vous cacher dans le temps ?"* |
| Déblocage | Célébrant, émotionnel | *"Le moment est venu. Voici ce qu'on vous a laissé."* |
| Erreur | Calme, humain | *"Hmm, quelque chose a coincé. Réessayons ensemble."* |
| Vide (no capsules) | Poétique | *"Votre carte est vierge. Chaque endroit peut devenir un souvenir."* |

**Règles de voice :**
- Tutoiement en français, "vous" uniquement dans contextes légaux
- Métaphores de temps, d'espace et de voyage
- Jamais de jargon technique
- Phrases courtes, impact émotionnel

---

## 8. Métriques de succès

### North Star Metric
> **Nombre de capsules débloquées par semaine** (Capsules Unlocked Weekly — CUW)

Ce KPI capture l'essentiel : une capsule débloquée = une émotion vécue, une connexion humaine réelle. C'est la finalité du produit.

### KPIs MVP

| Catégorie | KPI | Cible M3 | Cible M6 |
|-----------|-----|----------|----------|
| **Acquisition** | Downloads | 10K | 50K |
| **Activation** | % users créant 1 capsule dans 24h | > 40% | > 55% |
| **Rétention** | D7 Retention | > 25% | > 35% |
| **Rétention** | D30 Retention | > 12% | > 20% |
| **Engagement** | DAU/MAU ratio | > 20% | > 30% |
| **Engagement** | Capsules créées / user actif / semaine | 0.8 | 1.5 |
| **Core Loop** | Taux de déblocage (capsules débloquées / créées) | > 60% | > 75% |
| **Social** | % users ayant invité ≥ 1 personne | > 20% | > 35% |
| **Qualité** | App Store Rating | > 4.3 | > 4.5 |
| **Technique** | Crash-free rate | > 99.5% | > 99.8% |

### Métriques secondaires (santé)
- Taille moyenne d'une capsule (médias)
- Type de condition le plus utilisé (date vs geo vs fragment)
- Type de média le plus utilisé (image > texte > vocal > vidéo ?)
- Délai moyen entre création et déblocage
- NPS (Net Promoter Score) — cible > 50

---

## 9. Roadmap (Premier an)

### Q1 — Foundation (Jan-Mar)
**Objectif : MVP fonctionnel, beta fermée (500 users)**

- [ ] Auth (email + OAuth)
- [ ] Création capsule (texte + image)
- [ ] Condition date & géolocalisation
- [ ] Audience privé/personne
- [ ] Notifications push basiques
- [ ] Profil minimal
- [ ] Infrastructure : Supabase + CDN + Expo
- [ ] Onboarding (3 écrans)
- [ ] Tests beta : 500 early adopters invités

**KPI :** 500 capsules créées, 300 débloquées, D7 > 20%

---

### Q2 — Public Launch (Avr-Juin)
**Objectif : Lancement App Store + Play Store, 10K users**

- [ ] Multi-fragments
- [ ] Audience groupe + public
- [ ] Carte explore (MapBox)
- [ ] Invitation par lien
- [ ] Réactions
- [ ] Modération contenu (signalement)
- [ ] Dark mode complet + animations
- [ ] Campagne launch (TikTok, Instagram)
- [ ] PR / journalistes tech

**KPI :** 10K DL, 5K MAU, 2K capsules/semaine

---

### Q3 — Growth & Engagement (Juil-Sep)
**Objectif : Croissance virale, 50K users**

- [ ] Capsules collaboratives
- [ ] Espace famille (beta)
- [ ] Statistiques créateur
- [ ] Partage de découvertes (Stories)
- [ ] Widget iOS/Android (countdown capsule)
- [ ] Personnalisation (thèmes, sons)
- [ ] Recherche géographique
- [ ] Optimisations perf (< 2s load time)
- [ ] Programme referral (parrain)

**KPI :** 50K DL, 20K MAU, D30 > 18%

---

### Q4 — Monetisation & V2 (Oct-Déc)
**Objectif : Modèle économique validé, V2 en beta**

- [ ] Crumb Pro (abonnement 3.99€/mois)
  - Capsules illimitées (vs 10/mois free)
  - Médias HD
  - Analytics avancés
  - Legacy Mode
- [ ] AR Viewer (beta iOS)
- [ ] API développeurs (early access)
- [ ] Partenariats (wedding planners, apps famille)
- [ ] Internationalisation (EN, ES, DE)

**KPI :** 100K DL, 40K MAU, 5% conversion Pro, ARR > 100K€

---

## 10. Risques & Mitigations

| # | Risque | Probabilité | Impact | Mitigation |
|---|--------|------------|--------|-----------|
| 1 | **Rétention faible** — L'app est utilisée une fois et oubliée | Haute | Critique | Boucle de rétention : notifications de déblocage amènent à rouvrir l'app. Campagne "capsule de l'année" chaque janvier. Widget countdown. |
| 2 | **Cold start** — Sans contenu public, la carte est vide | Haute | Haute | Seed content par l'équipe dans les grandes villes. Partenariats influenceurs pour capsules publiques inaugurales. |
| 3 | **Abus de la carte publique** — Contenu inapproprié ou spam géolocalisé | Moyenne | Haute | Modération automatique (ML) + signalement communautaire + validation manuelle pour les premières semaines. |
| 4 | **Problèmes GPS** — Imprécision de la géolocalisation indoor | Haute | Moyenne | Rayon minimum 50m, tolérance configurable. Fallback : QR code de déblocage manuel si GPS unavailable. |
| 5 | **Coût infrastructure** — Stockage médias coûteux à grande échelle | Moyenne | Haute | Compression automatique côté client avant upload. Limite de taille (video 100MB). CDN avec cache agressif. Tier gratuit limité en stockage. |
| 6 | **Legacy Mode** — Complexité légale et éthique | Basse | Haute | Ne pas lancer avant consultation juridique. RGPD : droit à l'effacement même post-mortem. Gardien avec double validation. |
| 7 | **Fragmentation Android** — Comportement GPS/notifs variable selon constructeur | Haute | Moyenne | Tests approfondis sur Samsung, Xiaomi, Oppo. Utilisation de `expo-notifications` avec fallback. |
| 8 | **Copycat** — Google, Apple, Snapchat copient la feature | Basse | Haute | Se différencier par la profondeur (collaboratif, legacy, AR). Construire la communauté et le réseau comme barrière. |
| 9 | **RGPD** — Données de localisation sensibles | Moyenne | Haute | Localisation jamais stockée côté serveur sans consentement. Géoloc uniquement côté client pour vérification. Hash des coordonnées. DPO désigné. |
| 10 | **Monétisation tardive** — Runway insuffisant avant rentabilité | Moyenne | Critique | Abonnement Pro en Q4. Chercher seed funding dès Q2. Modèle freemium avec limite soft (10 capsules/mois free). |

---

*Document maintenu par le bureau Produit de Crumb.*  
*Prochaine révision : Q2 2026 après retours beta.*
