import { supabase } from '../supabase/client'
import { fetchMenu } from './fetch-menu'
import type { MenuResponse } from '../../types/menu'

export const fetchMenuByPath = async (path: string): Promise<MenuResponse> => {
  try {
    const supabaseClient = supabase()
    const { data: accountData, error: accountError } = await supabaseClient
      .from('account_settings')
      .select('account_id')
      .eq('path', path)
      .single()

    if (accountError || !accountData) {
      console.error('Error fetching menu:', accountError)
      return { error: accountError || new Error('Menu not found') }
    }

    const { data: menu, error: menuError } = await fetchMenu(accountData.account_id)

    return { data: menu }
  } catch (error) {
    console.error('Error fetching menu by path:', error)
    return { error: error instanceof Error ? error : new Error('Unknown error') }
  }
}