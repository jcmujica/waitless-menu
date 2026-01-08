import type { SupportedLanguage } from './server-locale'
import type { MenuItem, MenuPage } from '@/types/menu'

/**
 * Translation structure for items and pages
 */
export interface Translations {
  [key: string]: {
    name?: string
    description?: string
  }
}

/**
 * Applies translations to a menu item based on the user's language preference
 * Falls back to primary language if translation is not available
 * 
 * @param item - The menu item with potential translations
 * @param language - The user's preferred language
 * @param primaryLanguage - The restaurant's primary language
 * @param enabledLanguages - Languages enabled for this account
 * @returns The item with translated name and description
 */
export function applyItemTranslations(
  item: MenuItem & { translations?: Translations | null },
  language: SupportedLanguage,
  primaryLanguage: string = 'es',
  enabledLanguages: string[] = []
): MenuItem {
  // If language is the primary language or not enabled, return original
  if (language === primaryLanguage || !enabledLanguages.includes(language)) {
    return {
      id: item.id,
      item_id: item.item_id,
      name: item.name,
      price: item.price,
      image_url: item.image_url,
      is_available: item.is_available,
      type: item.type,
      classes: item.classes,
      description: item.description,
    }
  }

  // Try to get translation
  const translations = item.translations as Translations | null | undefined
  const translation = translations?.[language]

  return {
    id: item.id,
    item_id: item.item_id,
    name: translation?.name || item.name, // Fallback to original
    price: item.price,
    image_url: item.image_url,
    is_available: item.is_available,
    type: item.type,
    classes: item.classes,
    description: translation?.description || item.description, // Fallback to original
  }
}

/**
 * Applies translations to a menu page name based on the user's language preference
 * 
 * @param page - The menu page with potential translations
 * @param language - The user's preferred language
 * @param primaryLanguage - The restaurant's primary language
 * @param enabledLanguages - Languages enabled for this account
 * @returns The page with translated name
 */
export function applyPageTranslations(
  page: MenuPage & { translations?: Translations | null },
  language: SupportedLanguage,
  primaryLanguage: string = 'es',
  enabledLanguages: string[] = []
): MenuPage {
  // If language is the primary language or not enabled, return original
  if (language === primaryLanguage || !enabledLanguages.includes(language)) {
    return {
      id: page.id,
      name: page.name,
      items: page.items,
      position: page.position,
    }
  }

  // Try to get translation
  const translations = page.translations as Translations | null | undefined
  const translation = translations?.[language]

  return {
    id: page.id,
    name: translation?.name || page.name, // Fallback to original
    items: page.items,
    position: page.position,
  }
}

/**
 * Applies translations to all items in a menu page
 * 
 * @param page - The menu page with items
 * @param language - The user's preferred language
 * @param primaryLanguage - The restaurant's primary language
 * @param enabledLanguages - Languages enabled for this account
 * @returns The page with all items translated
 */
export function applyPageItemTranslations(
  page: MenuPage & { translations?: Translations | null },
  language: SupportedLanguage,
  primaryLanguage: string = 'es',
  enabledLanguages: string[] = []
): MenuPage {
  const translatedPage = applyPageTranslations(page, language, primaryLanguage, enabledLanguages)
  
  // Apply translations to all items in the page
  const translatedItems = page.items.map(item => 
    applyItemTranslations(item, language, primaryLanguage, enabledLanguages)
  )

  return {
    ...translatedPage,
    items: translatedItems,
  }
}
