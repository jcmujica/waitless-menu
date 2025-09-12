import { TAILWIND_COLORS } from "../constants/colors";

/**
 * Generate CSS variables for a theme based on the primary color
 * @param primaryColor The base color name from Tailwind palette (e.g., 'blue', 'red')
 * @returns An object with CSS variables for the theme
 */
export function generateThemeVariables(primaryColor: string) {
  // Get the color shades from Tailwind colors
  const colorPalette = TAILWIND_COLORS[primaryColor as keyof typeof TAILWIND_COLORS] || TAILWIND_COLORS.slate;
  
  // Generate CSS variables for each shade
  const cssVars: Record<string, string> = {};
  
  // Add each color shade as a CSS variable
  Object.entries(colorPalette).forEach(([shade, value]) => {
    cssVars[`--primary-${shade}`] = value;
  });
  
  return cssVars;
}

/**
 * Convert theme variables to CSS custom properties string
 * @param variables The theme variables object
 * @returns CSS custom properties as a string
 */
export function themeVariablesToCss(variables: Record<string, string>): string {
  return Object.entries(variables)
    .map(([key, value]) => `${key}: ${value};`)
    .join('\n  ');
}

/**
 * Generate inline style object for HTML elements
 * @param variables The theme variables object
 * @returns An object that can be used with the style attribute
 */
export function themeVariablesToInlineStyle(variables: Record<string, string>): Record<string, string> {
  return variables;
}
