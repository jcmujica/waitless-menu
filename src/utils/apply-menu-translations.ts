import type { IMenu, AccountSettings } from '@/types/menu'
import type { SupportedLanguage } from './server-locale'
import { applyPageItemTranslations } from './translations'

/**
 * Applies translations to an entire menu based on user's language preference
 * 
 * @param menu - The menu to translate
 * @param language - The user's preferred language
 * @param accountSettings - Account settings containing language configuration
 * @returns The menu with all translations applied
 */
export function applyMenuTranslations(
  menu: IMenu,
  language: SupportedLanguage,
  accountSettings?: AccountSettings
): IMenu {
  // If no account settings, return menu as-is
  if (!accountSettings) {
    return menu
  }

  const primaryLanguage = accountSettings.primary_language || 'es'
  const enabledLanguages = accountSettings.enabled_languages || []

  // If language is the primary language or not enabled, return original
  if (language === primaryLanguage || !enabledLanguages.includes(language)) {
    return menu
  }

  // Apply translations to all pages
  const translatedPages = menu.pages.map(page =>
    applyPageItemTranslations(
      page as any,
      language,
      primaryLanguage,
      enabledLanguages
    )
  )

  return {
    ...menu,
    pages: translatedPages,
  }
}
