import type { SupportedLanguage } from './server-locale'
import pageTranslations from '@/translations/pages'

/**
 * Gets a translation for a given key in the specified language
 * 
 * @param {string} key - The translation key
 * @param {SupportedLanguage} lang - The target language
 * @returns {string} The translated string, or the key if translation not found
 */
export function getPageTranslation(key: string, lang: SupportedLanguage): string {
  const translationObj = pageTranslations?.[key as keyof typeof pageTranslations]
  
  if (translationObj && typeof translationObj === 'object') {
    // Check if it's a translation object with language keys
    if ('en' in translationObj || 'es' in translationObj || 'pt' in translationObj) {
      return (translationObj as Record<string, string>)[lang] || 
             (translationObj as Record<string, string>).en || 
             key
    }
  }
  
  // If key doesn't exist or is not a translation object, return the key
  return key
}

/**
 * Replaces placeholders in translation strings
 * 
 * @param {string} text - The text with placeholders like {query} or {count}
 * @param {Record<string, string | number>} replacements - Object with replacement values
 * @returns {string} The text with placeholders replaced
 */
export function replacePlaceholders(
  text: string, 
  replacements: Record<string, string | number>
): string {
  let result = text
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value))
  }
  return result
}

/**
 * Gets a translation and replaces placeholders
 * 
 * @param {string} key - The translation key
 * @param {SupportedLanguage} lang - The target language
 * @param {Record<string, string | number>} replacements - Object with replacement values
 * @returns {string} The translated string with placeholders replaced
 */
export function getPageTranslationWithReplacements(
  key: string,
  lang: SupportedLanguage,
  replacements: Record<string, string | number> = {}
): string {
  const translation = getPageTranslation(key, lang)
  return replacePlaceholders(translation, replacements)
}
