import { s as supabase } from './MenuCache_DVQknVYD.mjs';
import { c as createComponent, a as createAstro, m as maybeRenderHead, d as addAttribute, b as renderTemplate } from './astro/server_BXBsx2gE.mjs';
/* empty css                         */

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

const $$Astro = createAstro();
const $$AccountUnavailable = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AccountUnavailable;
  const {
    accountSettings,
    theme = "light",
    level = "inactive",
    message = "This menu is currently unavailable"
  } = Astro2.props;
  const logoUrl = accountSettings?.logo_url;
  const accountName = accountSettings?.name;
  const getDisplayMessage = () => {
    switch (level) {
      case "suspended":
        return {
          title: "Menu Temporarily Unavailable",
          subtitle: "This menu is temporarily unavailable. Please check back later.",
          icon: "pause"
        };
      case "expired":
        return {
          title: "Menu Unavailable",
          subtitle: "This menu is currently not available. The business may be updating their subscription.",
          icon: "clock"
        };
      case "inactive":
      default:
        return {
          title: "Menu Unavailable",
          subtitle: message || "This menu is currently not available.",
          icon: "info"
        };
    }
  };
  const displayInfo = getDisplayMessage();
  return renderTemplate`${maybeRenderHead()}<div class="unavailable-container"${addAttribute(theme, "data-theme")} data-astro-cid-3a36hfiz> <!-- Subtle background pattern --> <div class="background-pattern" data-astro-cid-3a36hfiz></div> <!-- Content --> <div class="content" data-astro-cid-3a36hfiz> <!-- Logo or Icon --> <div class="logo-section" data-astro-cid-3a36hfiz> ${logoUrl ? renderTemplate`<img${addAttribute(logoUrl, "src")}${addAttribute(accountName || "Restaurant", "alt")} class="logo" data-astro-cid-3a36hfiz>` : renderTemplate`<div class="icon-container" data-astro-cid-3a36hfiz> ${displayInfo.icon === "pause" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon" data-astro-cid-3a36hfiz> <circle cx="12" cy="12" r="10" data-astro-cid-3a36hfiz></circle> <line x1="10" y1="15" x2="10" y2="9" data-astro-cid-3a36hfiz></line> <line x1="14" y1="15" x2="14" y2="9" data-astro-cid-3a36hfiz></line> </svg>`} ${displayInfo.icon === "clock" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon" data-astro-cid-3a36hfiz> <circle cx="12" cy="12" r="10" data-astro-cid-3a36hfiz></circle> <polyline points="12 6 12 12 16 14" data-astro-cid-3a36hfiz></polyline> </svg>`} ${displayInfo.icon === "info" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon" data-astro-cid-3a36hfiz> <circle cx="12" cy="12" r="10" data-astro-cid-3a36hfiz></circle> <line x1="12" y1="16" x2="12" y2="12" data-astro-cid-3a36hfiz></line> <line x1="12" y1="8" x2="12.01" y2="8" data-astro-cid-3a36hfiz></line> </svg>`} </div>`} </div> <!-- Restaurant Name (if available) --> ${accountName && renderTemplate`<h2 class="restaurant-name" data-astro-cid-3a36hfiz>${accountName}</h2>`} <!-- Message --> <div class="message-section" data-astro-cid-3a36hfiz> <h1 class="title" data-astro-cid-3a36hfiz>${displayInfo.title}</h1> <p class="subtitle" data-astro-cid-3a36hfiz>${displayInfo.subtitle}</p> </div> <!-- Contact Info (if available) --> ${(accountSettings?.contact_email || accountSettings?.contact_phone) && renderTemplate`<div class="contact-section" data-astro-cid-3a36hfiz> <p class="contact-label" data-astro-cid-3a36hfiz>For inquiries, please contact:</p> ${accountSettings.contact_phone && renderTemplate`<a${addAttribute(`tel:${accountSettings.contact_phone}`, "href")} class="contact-link" data-astro-cid-3a36hfiz> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="contact-icon" data-astro-cid-3a36hfiz> <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" data-astro-cid-3a36hfiz></path> </svg> ${accountSettings.contact_phone} </a>`} ${accountSettings.contact_email && renderTemplate`<a${addAttribute(`mailto:${accountSettings.contact_email}`, "href")} class="contact-link" data-astro-cid-3a36hfiz> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="contact-icon" data-astro-cid-3a36hfiz> <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" data-astro-cid-3a36hfiz></path> <polyline points="22,6 12,13 2,6" data-astro-cid-3a36hfiz></polyline> </svg> ${accountSettings.contact_email} </a>`} </div>`} <!-- Footer --> <div class="footer" data-astro-cid-3a36hfiz> <p class="powered-by" data-astro-cid-3a36hfiz>
Powered by <a href="https://waitless.tech" target="_blank" rel="noopener noreferrer" data-astro-cid-3a36hfiz>Waitless</a> </p> </div> </div> </div> `;
}, "/Users/jcmujica/Code/jc/waitless/waitless-menu/src/components/AccountUnavailable.astro", void 0);

export { $$AccountUnavailable as $, checkAccountAccess as c, fetchMenu as f };
