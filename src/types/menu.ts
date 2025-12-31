/**
 * Menu-related type definitions
 * Centralized types used across the application
 */

type BackgroundStyle = Record<string, string | number>

/**
 * Account status from database enum
 */
export type AccountStatus = 'active' | 'inactive' | 'suspended'

/**
 * Access level for the account
 */
export type AccountAccessLevel = 'active' | 'trial' | 'grace_period' | 'expired' | 'inactive' | 'suspended' | 'not_found'

/**
 * Account access check result
 */
export interface AccountAccess {
  hasAccess: boolean
  level: AccountAccessLevel
  message?: string
}

/**
 * Represents a single menu item
 */
export interface MenuItem {
  id: string
  item_id: string
  name: string
  price: number | null
  image_url: string | null
  is_available: boolean
  type: string
  classes: string[]
  description?: string
}

/**
 * Represents a page in the menu
 */
export interface MenuPage {
  id: string
  name: string
  items: MenuItem[]
  position?: number
}

/**
 * Background style options for menu appearance
 */
export interface MenuBackground {
  id: string
  style: BackgroundStyle
}

/**
 * Color definition for menu appearance
 */
export interface MenuColor {
  id: string
  value: string
}

/**
 * Menu appearance settings
 */
export interface MenuAppearance {
  theme: string
  style: string | null
  custom_bg_img: string | null
  custom_bg_props: string | null
}

export interface ParsedMenuAppearanceStyle {
  background?: any
  colors?: {
    primary?: {
      id: string
      value: string
    }
  }
}
  

/**
 * Menu display settings
 */
export interface MenuSettings {
  showImages: boolean
  showDescriptions: boolean
  showPrices: boolean
}

/**
 * Complete menu data structure
 */
export interface IMenu {
  id: string
  name: string
  type: string
  mainPageId: string | null
  appearance: MenuAppearance
  settings: MenuSettings
  pages: MenuPage[]
}

/**
 * Response structure for menu data fetching operations
 */
export interface MenuResponse {
  data?: IMenu
  accountSettings?: AccountSettings
  error?: Error | null
}

/**
 * Account settings data structure
 */
export interface AccountSettings {
  account_id: string
  path: string | null
  logo_url: string | null
  name: string | null
  description: string | null
  contact_email: string | null
  contact_phone: string | null
  address: string | null
  created_at?: string
  updated_at?: string
}

/**
 * Response structure for account settings fetching operations
 */
export interface AccountResponse {
  data?: AccountSettings
  error?: Error | null
}
