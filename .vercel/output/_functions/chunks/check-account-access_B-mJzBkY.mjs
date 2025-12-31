import { s as supabase } from './MenuCache_B5cElaqR.mjs';

const fetchMenu = async (account) => {
  try {
    const supabaseClient = supabase();
    const { data: menuData, error: menuError } = await supabaseClient.from("menus").select(`
        id,
        name,
        type,
        main_page_id,
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
      `).eq("account_id", account).eq("is_active", true).single();
    if (menuError || !menuData) {
      console.error("Error fetching menu:", menuError);
      if (menuError?.code === "PGRST116" || menuError?.message?.includes("No rows")) {
        return {
          error: new Error("No active menu found. Please set a menu as active in the admin panel.")
        };
      }
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
    return { data: menu };
  } catch (error) {
    console.error("Error fetching menu:", error);
    return { error: error instanceof Error ? error : new Error("Unknown error") };
  }
};

async function checkAccountAccess(accountId) {
  try {
    const supabaseClient = supabase();
    const { data: account, error: accountError } = await supabaseClient.from("accounts").select("account_status").eq("id", accountId).single();
    if (accountError || !account) {
      console.error("Error fetching account:", accountError);
      return {
        hasAccess: true,
        level: "active"
      };
    }
    const accountData = account;
    if (accountData.account_status === "inactive") {
      return {
        hasAccess: false,
        level: "inactive",
        message: "This menu is currently unavailable"
      };
    }
    if (accountData.account_status === "suspended") {
      return {
        hasAccess: false,
        level: "suspended",
        message: "This menu is temporarily unavailable"
      };
    }
    return {
      hasAccess: true,
      level: "active"
    };
  } catch (error) {
    console.error("Error checking account access:", error);
    return {
      hasAccess: true,
      level: "active"
    };
  }
}

export { checkAccountAccess as c, fetchMenu as f };
