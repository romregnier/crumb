import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://tpbluellqgehaqmmmunp.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_ID4jZLGVQZ1GoyUz1DwWZA_son8WlCD'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Types
export interface CrumbCapsule {
  id?: string
  author_id?: string
  title: string
  description?: string
  content_type: 'text' | 'image' | 'video' | 'audio'
  content_url?: string
  content_text?: string
  unlock_type: 'date' | 'location' | 'fragments' | 'public'
  unlock_at?: string
  unlock_lat?: number
  unlock_lng?: number
  unlock_radius_m?: number
  audience: 'private' | 'person' | 'group' | 'public'
  is_unlocked?: boolean
  created_at?: string
}

export async function fetchCapsules(): Promise<CrumbCapsule[]> {
  const { data, error } = await supabase
    .from('crumb_capsules')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) { console.warn('Supabase fetch error:', error.message); return [] }
  return data ?? []
}

export async function createCapsule(capsule: Omit<CrumbCapsule, 'id' | 'created_at'>): Promise<CrumbCapsule | null> {
  const { data, error } = await supabase
    .from('crumb_capsules')
    .insert(capsule)
    .select()
    .single()
  if (error) { console.warn('Supabase insert error:', error.message); return null }
  return data
}
