import { s as supabase } from './MenuCache_B5cElaqR.mjs';

const fetchMenuById = async (menuId) => {
  try {
    const supabaseClient = supabase();
    const { data: menuData, error: menuError } = await supabaseClient.from("menus").select(`
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
      `).eq("id", menuId).single();
    if (menuError || !menuData) {
      console.error("Error fetching menu by ID:", menuError);
      return { error: menuError || new Error("Menu not found") };
    }
    const { data: pagesData, error: pagesError } = await supabaseClient.from("menu_pages").select("id, name, position").eq("menu_id", menuData.id).order("position");
    if (pagesError) {
      console.error("Error fetching menu pages:", pagesError);
      return { error: pagesError };
    }
    const pageIds = pagesData.map((p) => p.id);
    const { data: itemsData, error: itemsError } = await supabaseClient.from("menu_items").select(`
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
          type
        )
      `).in("page_id", pageIds).order("position");
    if (itemsError) {
      console.error("Error fetching menu items:", itemsError);
      return { error: itemsError };
    }
    const itemsByPageId = (itemsData || []).reduce((acc, item) => {
      const pageId = item.page_id;
      const itemData = item.items;
      if (!itemData) return acc;
      const menuItem = {
        id: item.id,
        item_id: itemData.id,
        name: itemData.name || "",
        price: itemData.price,
        image_url: itemData.image_url,
        description: itemData.description,
        is_available: itemData.is_available,
        classes: itemData.classes,
        type: itemData.type || "item"
      };
      if (!acc[pageId]) acc[pageId] = [];
      acc[pageId].push(menuItem);
      return acc;
    }, {});
    const pages = pagesData.map((page) => ({
      id: page.id,
      name: page.name,
      items: itemsByPageId[page.id] || []
    }));
    const appearance = Array.isArray(menuData.menu_appearances) ? menuData.menu_appearances[0] : menuData.menu_appearances;
    const settings = Array.isArray(menuData.menu_settings) ? menuData.menu_settings[0] : menuData.menu_settings;
    if (appearance?.style) {
      try {
        JSON.parse(appearance.style);
      } catch (e) {
        console.error("Error parsing style JSON:", e);
      }
    }
    const menu = {
      id: menuData.id,
      name: menuData.name,
      type: menuData.type,
      mainPageId: menuData.main_page_id,
      appearance: {
        theme: appearance?.theme || "light",
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
    };
    return {
      data: menu,
      accountId: menuData.account_id
    };
  } catch (error) {
    console.error("Error fetching menu by ID:", error);
    return { error: error instanceof Error ? error : new Error("Unknown error") };
  }
};

export { fetchMenuById as f };
