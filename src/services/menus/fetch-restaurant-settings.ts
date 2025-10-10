import { supabase } from "../supabase/client"
import type { AccountResponse, AccountSettings } from "../../types/menu"

/**
 * Fetches restaurant account settings including logo and other account data
 * @param account - The account ID to fetch settings for
 * @returns Promise with account settings data or error
 */
export const fetchRestaurantSettings = async (account: string): Promise<AccountResponse> => {
  try {
    const supabaseClient = supabase()
    const { data: accountData, error: accountError } = await supabaseClient
      .from('account_settings')
      .select('*')
      .eq('account_id', account)
      .single()

    if (accountError || !accountData) {
      console.error('Error fetching account settings:', accountError)
      return { error: accountError || new Error('Account settings not found') }
    }

    return { data: accountData as AccountSettings }
  } catch (error) {
    console.error('Error fetching account settings:', error)
    return { error: error instanceof Error ? error : new Error('Unknown error') }
  }
}

/**
 * Fetches restaurant account settings by path (vanity URL)
 * @param path - The vanity URL path to fetch settings for
 * @returns Promise with account settings data or error
 */
export const fetchRestaurantSettingsByPath = async (path: string): Promise<AccountResponse> => {
  try {
    const supabaseClient = supabase()
    const { data: accountData, error: accountError } = await supabaseClient
      .from('account_settings')
      .select('*')
      .eq('path', path)
      .single()

    if (accountError || !accountData) {
      console.error('Error fetching account settings by path:', accountError)
      return { error: accountError || new Error('Account settings not found') }
    }

    return { data: accountData as AccountSettings }
  } catch (error) {
    console.error('Error fetching account settings by path:', error)
    return { error: error instanceof Error ? error : new Error('Unknown error') }
  }
}