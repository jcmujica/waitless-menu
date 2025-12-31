import { supabase } from "../supabase/client"

export interface SearchResult {
  accountId: string
  accountName: string
  path: string | null
  logoUrl: string | null
  menuName: string
  menuId: string
}

export interface SearchResponse {
  data?: SearchResult[]
  error?: Error
}

/**
 * Search for menus across all active accounts
 * Searches by restaurant name (accounts.name) with accent-insensitive matching
 */
export async function searchMenus(query: string): Promise<SearchResponse> {
  try {
    if (!query || query.trim().length < 2) {
      return { data: [] }
    }

    const supabaseClient = supabase()
    const searchTerm = query.trim()

    // Use raw SQL for accent-insensitive search using unaccent extension
    const { data, error } = await supabaseClient.rpc('search_restaurants', {
      search_term: searchTerm
    })

    if (error) {
      // Fallback to regular search if RPC doesn't exist
      if (error.code === 'PGRST202' || error.message?.includes('function')) {
        return searchMenusFallback(searchTerm)
      }
      console.error('Error searching menus:', error)
      return { error }
    }

    // Map results
    const results: SearchResult[] = (data || []).map((row: any) => ({
      accountId: row.account_id,
      accountName: row.account_name,
      path: row.path,
      logoUrl: row.logo_url,
      menuName: row.menu_name,
      menuId: row.menu_id
    }))

    return { data: results }
  } catch (error) {
    console.error('Error in searchMenus:', error)
    return { error: error instanceof Error ? error : new Error('Unknown error') }
  }
}

/**
 * Fallback search without accent handling (uses ilike)
 */
async function searchMenusFallback(searchTerm: string): Promise<SearchResponse> {
  try {
    const supabaseClient = supabase()

    const { data, error } = await supabaseClient
      .from('accounts')
      .select(`
        id,
        name,
        account_status,
        account_settings (
          path,
          logo_url
        ),
        menus (
          id,
          name,
          is_active
        )
      `)
      .ilike('name', `%${searchTerm}%`)
      .eq('account_status', 'active')
      .limit(20)

    if (error) {
      console.error('Error in fallback search:', error)
      return { error }
    }

    const results: SearchResult[] = []

    if (data) {
      for (const account of data) {
        const settings = Array.isArray(account.account_settings) 
          ? account.account_settings[0] 
          : account.account_settings

        const menus = Array.isArray(account.menus) ? account.menus : [account.menus]
        const activeMenu = menus?.find((m: any) => m?.is_active)

        if (activeMenu && settings) {
          results.push({
            accountId: account.id,
            accountName: account.name,
            path: settings.path,
            logoUrl: settings.logo_url,
            menuName: activeMenu.name,
            menuId: activeMenu.id
          })
        }
      }
    }

    return { data: results }
  } catch (error) {
    console.error('Error in fallback search:', error)
    return { error: error instanceof Error ? error : new Error('Unknown error') }
  }
}

