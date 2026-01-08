import { supabase } from "../supabase/client"
import type { IMenu, MenuItem, MenuPage, MenuResponse } from "../../types/menu"
import type { SupportedLanguage } from "../../utils/server-locale"

type MenuResponseWithAccountId = MenuResponse & { accountId?: string }

/**
 * Fetches a specific menu by ID (for preview purposes)
 * This bypasses the is_active filter to allow previewing inactive menus
 * @param menuId - The menu ID to fetch
 * @param language - Optional language preference for translations
 * @returns Promise with menu data or error, including accountId for fetching settings
 */
export const fetchMenuById = async (
  menuId: string,
  language?: SupportedLanguage
): Promise<MenuResponseWithAccountId> => {
  try {
    const supabaseClient = supabase()

    // 1. Fetch menu by ID with nested appearance and settings
    const { data: menuData, error: menuError } = await supabaseClient
      .from('menus')
      .select(`
        id,
        name,
        type,
        main_page_id,
        account_id,
        menu_appearances (
          theme,
          style,
          custom_bg_img,
          custom_bg_props
        ),
        menu_settings (
          show_images,
          show_descriptions,
          show_prices
        )
      `)
      .eq('id', menuId)
      .single()

    if (menuError || !menuData) {
      console.error('Error fetching menu by ID:', menuError)
      return { error: menuError || new Error('Menu not found') }
    }

    // 2. Fetch pages for the menu (including translations)
    const { data: pagesData, error: pagesError } = await supabaseClient
      .from('menu_pages')
      .select('id, name, position, translations')
      .eq('menu_id', menuData.id)
      .order('position')

    if (pagesError) {
      console.error('Error fetching menu pages:', pagesError)
      return { error: pagesError }
    }

    const pageIds = pagesData.map(p => p.id)

    // 3. Fetch items with their details in a single query (including translations)
    const { data: itemsData, error: itemsError } = await supabaseClient
      .from('menu_items')
      .select(`
        id,
        page_id,
        position,
        items:item_id (
          id,
          name,
          price,
          image_url,
          description,
          is_available,
          classes,
          type,
          translations
        )
      `)
      .in('page_id', pageIds)
      .order('position')

    if (itemsError) {
      console.error('Error fetching menu items:', itemsError)
      return { error: itemsError }
    }

    // 4. Group items by page (preserving translations for later application)
    const itemsByPageId = (itemsData || []).reduce<Record<string, (MenuItem & { translations?: any })[]>>((acc, item: any) => {
      const pageId = item.page_id
      const itemData = item.items

      if (!itemData) return acc // Skip if item data is missing

      const menuItem: MenuItem & { translations?: any } = {
        id: item.id,
        item_id: itemData.id,
        name: itemData.name || '',
        price: itemData.price,
        image_url: itemData.image_url,
        description: itemData.description,
        is_available: itemData.is_available,
        classes: itemData.classes,
        type: itemData.type || 'item',
        translations: itemData.translations || null
      }

      if (!acc[pageId]) acc[pageId] = []
      acc[pageId].push(menuItem)
      return acc
    }, {})

    // 5. Construct pages with their items (preserving translations)
    const pages: (MenuPage & { translations?: any })[] = pagesData.map(page => ({
      id: page.id,
      name: page.name,
      items: itemsByPageId[page.id] || [],
      translations: page.translations || null
    }))

    // 6. Apply translations if language is provided and different from primary
    // Note: We'll need account settings to know primary_language and enabled_languages
    // For now, we'll apply translations in the page component where we have access to account settings

    // Handle the case where menu_appearances and menu_settings might be arrays or objects
    const appearance = Array.isArray(menuData.menu_appearances)
      ? menuData.menu_appearances[0]
      : menuData.menu_appearances

    const settings = Array.isArray(menuData.menu_settings)
      ? menuData.menu_settings[0]
      : menuData.menu_settings

    // Parse the style JSON if it exists - just for validation
    if (appearance?.style) {
      try {
        JSON.parse(appearance.style)
      } catch (e) {
        console.error('Error parsing style JSON:', e)
      }
    }

    // 7. Build the final menu object
    const menu: IMenu = {
      id: menuData.id,
      name: menuData.name,
      type: menuData.type,
      mainPageId: menuData.main_page_id,
      appearance: {
        theme: appearance?.theme || 'light',
        style: appearance?.style || null,
        custom_bg_img: appearance?.custom_bg_img || null,
        custom_bg_props: appearance?.custom_bg_props || null
      },
      settings: {
        showImages: settings?.show_images ?? true,
        showDescriptions: settings?.show_descriptions ?? true,
        showPrices: settings?.show_prices ?? true
      },
      pages
    }

    // Return menu with account_id for fetching account settings
    return { 
      data: menu,
      accountId: menuData.account_id as string | undefined
    }
  } catch (error) {
    console.error('Error fetching menu by ID:', error)
    return { error: error instanceof Error ? error : new Error('Unknown error') }
  }
}

