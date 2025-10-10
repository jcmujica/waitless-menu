import { fetchMenu } from './fetch-menu'
import { fetchRestaurantSettingsByPath } from './fetch-restaurant-settings'
import type { MenuResponse } from '../../types/menu'

/**
 * Fetches menu by vanity URL path
 * @param path - The vanity URL path
 * @returns Promise with menu data or error
 */
export const fetchMenuByPath = async (path: string): Promise<MenuResponse> => {
  try {
    // Fetch account settings to get the account_id
    const { data: accountData, error: accountError } = await fetchRestaurantSettingsByPath(path)

    if (accountError || !accountData) {
      console.error('Error fetching account by path:', accountError)
      return { error: accountError || new Error('Account not found') }
    }

    // Fetch the menu using the account_id
    const { data: menu, error: menuError } = await fetchMenu(accountData.account_id)

    if (menuError || !menu) {
      return { error: menuError || new Error('Menu not found') }
    }

    return { data: menu, accountSettings: accountData }
  } catch (error) {
    console.error('Error fetching menu by path:', error)
    return { error: error instanceof Error ? error : new Error('Unknown error') }
  }
}