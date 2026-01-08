import { supabase } from "../supabase/client"
import type { AccountResponse, AccountSettings } from "../../types/menu"

/**
 * Fetches restaurant account settings including logo and other account data
 * Also fetches language settings from the accounts table
 * @param account - The account ID to fetch settings for
 * @returns Promise with account settings data or error
 */
export const fetchRestaurantSettings = async (account: string): Promise<AccountResponse> => {
  try {
    const supabaseClient = supabase()
    
    // Fetch account settings
    const { data: accountData, error: accountError } = await supabaseClient
      .from('account_settings')
      .select('*')
      .eq('account_id', account)
      .single()

    if (accountError || !accountData) {
      console.error('Error fetching account settings:', accountError)
      return { error: accountError || new Error('Account settings not found') }
    }

    // Fetch language settings from accounts table
    const { data: accountLanguageData, error: languageError } = await supabaseClient
      .from('accounts')
      .select('primary_language, enabled_languages')
      .eq('id', account)
      .single()

    // Merge language data if available (don't fail if not found)
    const settings: AccountSettings = {
      ...accountData as AccountSettings,
      primary_language: accountLanguageData?.primary_language || 'es',
      enabled_languages: accountLanguageData?.enabled_languages || [],
    }

    return { data: settings }
  } catch (error) {
    console.error('Error fetching account settings:', error)
    return { error: error instanceof Error ? error : new Error('Unknown error') }
  }
}

/**
 * Fetches restaurant account settings by path (vanity URL)
 * Also fetches language settings from the accounts table
 * @param path - The vanity URL path to fetch settings for
 * @returns Promise with account settings data or error
 */
export const fetchRestaurantSettingsByPath = async (path: string): Promise<AccountResponse> => {
  try {
    const supabaseClient = supabase()
    
    // Fetch account settings by path
    const { data: accountData, error: accountError } = await supabaseClient
      .from('account_settings')
      .select('*')
      .eq('path', path)
      .single()

    if (accountError || !accountData) {
      console.error('Error fetching account settings by path:', accountError)
      return { error: accountError || new Error('Account settings not found') }
    }

    const accountId = (accountData as AccountSettings).account_id

    // Fetch language settings from accounts table
    const { data: accountLanguageData, error: languageError } = await supabaseClient
      .from('accounts')
      .select('primary_language, enabled_languages')
      .eq('id', accountId)
      .single()

    // Merge language data if available (don't fail if not found)
    const settings: AccountSettings = {
      ...accountData as AccountSettings,
      primary_language: accountLanguageData?.primary_language || 'es',
      enabled_languages: accountLanguageData?.enabled_languages || [],
    }

    return { data: settings }
  } catch (error) {
    console.error('Error fetching account settings by path:', error)
    return { error: error instanceof Error ? error : new Error('Unknown error') }
  }
}