import { supabase } from "../supabase/client"

// Define types for better type safety
export interface MenuItem {
  id: string;
  item_id: string;
  name: string;
  price: number | null;
  image_url: string | null;
  is_available: boolean;
  type: string;
}

export interface MenuPage {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface MenuAppearance {
  theme: string;
  layout: string;
  customStyle: string | null;
}

export interface MenuSettings {
  showImages: boolean;
  showDescriptions: boolean;
  showPrices: boolean;
}

export interface Menu {
  id: string;
  name: string;
  type: string;
  mainPageId: string | null;
  appearance: MenuAppearance;
  settings: MenuSettings;
  pages: MenuPage[];
}

export const fetchMenu = async (account: string) => {
  try {
    const supabaseClient = supabase();
    
    // 1. Fetch menu with nested appearance and settings in a single query
    const { data: menuData, error: menuError } = await supabaseClient
      .from('menus')
      .select(`
        id,
        name,
        type,
        main_page_id,
        menu_appearances (
          theme,
          layout,
          custom_style
        ),
        menu_settings (
          show_images,
          show_descriptions,
          show_prices
        )
      `)
      .eq('account_id', account)
      .single();

    if (menuError || !menuData) {
      console.error('Error fetching menu:', menuError);
      return { error: menuError || new Error('Menu not found') };
    }

    // 2. Fetch pages for the menu
    const { data: pagesData, error: pagesError } = await supabaseClient
      .from('menu_pages')
      .select('id, name, position')
      .eq('menu_id', menuData.id)
      .order('position');

    if (pagesError) {
      console.error('Error fetching menu pages:', pagesError);
      return { error: pagesError };
    }

    const pageIds = pagesData.map(p => p.id);

    // 3. Fetch items with their details in a single query
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
          is_available,
          type
        )
      `)
      .in('page_id', pageIds)
      .order('position');

    if (itemsError) {
      console.error('Error fetching menu items:', itemsError);
      return { error: itemsError };
    }

    // 4. Group items by page
    const itemsByPageId = (itemsData || []).reduce<Record<string, MenuItem[]>>((acc, item: any) => {
      const pageId = item.page_id;
      const itemData = item.items;
      
      if (!itemData) return acc; // Skip if item data is missing
      
      const menuItem: MenuItem = {
        id: item.id,
        item_id: itemData.id,
        name: itemData.name || '',
        price: itemData.price,
        image_url: itemData.image_url,
        is_available: itemData.is_available,
        type: itemData.type || 'item'
      };
      
      if (!acc[pageId]) acc[pageId] = [];
      acc[pageId].push(menuItem);
      return acc;
    }, {});

    // 5. Construct pages with their items
    const pages: MenuPage[] = pagesData.map(page => ({
      id: page.id,
      name: page.name,
      items: itemsByPageId[page.id] || []
    }));

    // Handle the case where menu_appearances and menu_settings might be arrays or objects
    const appearance = Array.isArray(menuData.menu_appearances) 
      ? menuData.menu_appearances[0] 
      : menuData.menu_appearances;
      
    const settings = Array.isArray(menuData.menu_settings) 
      ? menuData.menu_settings[0] 
      : menuData.menu_settings;

    // 6. Build the final menu object
    const menu: Menu = {
      id: menuData.id,
      name: menuData.name,
      type: menuData.type,
      mainPageId: menuData.main_page_id,
      appearance: {
        theme: appearance?.theme || 'light',
        layout: appearance?.layout || 'grid',
        customStyle: appearance?.custom_style || null
      },
      settings: {
        showImages: settings?.show_images ?? true,
        showDescriptions: settings?.show_descriptions ?? true,
        showPrices: settings?.show_prices ?? true
      },
      pages
    };

    return { data: menu };
  } catch (error) {
    console.error('Error fetching menu:', error);
    return { error };
  }
};
