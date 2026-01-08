import { useState, useEffect } from 'react'
import type { SupportedLanguage } from '@/utils/server-locale'

interface LanguageSelectorProps {
  currentLanguage: SupportedLanguage
  enabledLanguages: string[]
  primaryLanguage: string
  onLanguageChange: (language: SupportedLanguage) => void
}

const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
}

const LANGUAGE_FLAGS: Record<SupportedLanguage, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
  pt: '🇧🇷',
}

export function LanguageSelector({
  currentLanguage,
  enabledLanguages,
  primaryLanguage,
  onLanguageChange,
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Build list of available languages (primary + enabled)
  const availableLanguages: SupportedLanguage[] = [
    primaryLanguage as SupportedLanguage,
    ...enabledLanguages.filter(lang => lang !== primaryLanguage),
  ].filter((lang): lang is SupportedLanguage => 
    ['en', 'es', 'pt'].includes(lang)
  )

  // Don't show selector if only one language is available
  if (availableLanguages.length <= 1) {
    return null
  }

  const handleLanguageSelect = (language: SupportedLanguage) => {
    onLanguageChange(language)
    setIsOpen(false)
    
    // Store in localStorage for client-side persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('waitless-language', language)
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('waitless-language-change', { 
        detail: language 
      }))
    }
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span className="text-lg">{LANGUAGE_FLAGS[currentLanguage]}</span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {LANGUAGE_NAMES[currentLanguage]}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg z-20">
            <div className="py-1">
              {availableLanguages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageSelect(lang)}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    currentLanguage === lang
                      ? 'bg-primary-50 dark:bg-primary-900/20'
                      : ''
                  }`}
                >
                  <span className="text-lg">{LANGUAGE_FLAGS[lang]}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {LANGUAGE_NAMES[lang]}
                  </span>
                  {currentLanguage === lang && (
                    <svg
                      className="w-4 h-4 ml-auto text-primary-600 dark:text-primary-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
