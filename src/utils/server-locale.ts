import type { AstroCookies } from 'astro'

/**
 * Supported languages in the application
 */
export type SupportedLanguage = 'en' | 'es' | 'pt'

const LANGUAGE_COOKIE_KEY = 'waitless-language'

/**
 * Gets the user's preferred language from cookies or Accept-Language header
 * This is used for server-side rendering in Astro
 * 
 * @param cookies - Astro cookies object
 * @param headers - Request headers (optional, for Accept-Language)
 * @returns {SupportedLanguage} The detected language code
 */
export function getServerLocale(
  cookies: AstroCookies,
  headers?: Headers
): SupportedLanguage {
  // Check for dev override first
  const devOverride = import.meta.env.PUBLIC_LANGUAGE_OVERRIDE
  if (devOverride && ['en', 'es', 'pt'].includes(devOverride)) {
    return devOverride as SupportedLanguage
  }

  // Try to get language from cookie
  const languageCookie = cookies.get(LANGUAGE_COOKIE_KEY)
  
  if (languageCookie?.value && ['en', 'es', 'pt'].includes(languageCookie.value)) {
    return languageCookie.value as SupportedLanguage
  }

  // Fall back to Accept-Language header
  if (headers) {
    const acceptLanguage = headers.get('accept-language')
    
    if (acceptLanguage) {
      // Parse Accept-Language header (e.g., "en-US,en;q=0.9,es;q=0.8")
      const languages = acceptLanguage
        .split(',')
        .map(lang => lang.split(';')[0].trim().toLowerCase().slice(0, 2))
      
      for (const lang of languages) {
        if (['en', 'es', 'pt'].includes(lang)) {
          return lang as SupportedLanguage
        }
      }
    }
  }

  // Default to English
  return 'en'
}

/**
 * Sets the language preference in a cookie
 * @param cookies - Astro cookies object
 * @param language - The language code to set
 */
export function setServerLocale(cookies: AstroCookies, language: SupportedLanguage): void {
  cookies.set(LANGUAGE_COOKIE_KEY, language, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
    httpOnly: false, // Allow client-side access
  })
}
