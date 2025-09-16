import { TAILWIND_COLORS } from "../constants/colors"

/**
 * Generate CSS variables for a theme based on the primary color
 * @param primaryColor The base color name from Tailwind palette (e.g., 'blue', 'red')
 * @returns An object with CSS variables for the theme
 */
export function generateThemeVariables(primaryColor: string) {
  // Get the color shades from Tailwind colors
  const colorPalette = TAILWIND_COLORS[primaryColor as keyof typeof TAILWIND_COLORS] || TAILWIND_COLORS.slate

  // Generate CSS variables for each shade
  const cssVars: Record<string, string> = {}

  // Add each color shade as a CSS variable and its RGB version
  Object.entries(colorPalette).forEach(([shade, value]) => {
    cssVars[`--primary-${shade}`] = value
    cssVars[`--primary-${shade}-rgb`] = hexToRgb(value)
  })
  
  return cssVars
}

export function hexToRgb(hex: string): string {
  const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
  if (!match) return "0, 0, 0" // Default to black if invalid hex

  const [, r, g, b] = match
  return `${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)}`
}