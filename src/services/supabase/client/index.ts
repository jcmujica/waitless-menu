import { createClient } from '@supabase/supabase-js'
import { getSecret } from 'astro:env/server'

export const supabase = () => {
  const supabaseUrl = getSecret('SUPABASE_URL')!
  const supabaseAnonKey = getSecret('SUPABASE_ANON_KEY')!

  const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey, {
    global: {
      fetch: (...args) => fetch(...args),
    },
  })

  return supabase
}