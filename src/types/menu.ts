/**
 * Menu-related type definitions
 * Centralized types used across the application
 */

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
  style: {
    background?: string
    backgroundImage?: string
    backgroundSize?: string
    backgroundPosition?: string
    backgroundRepeat?: string
  }
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
  error?: Error | null
}
