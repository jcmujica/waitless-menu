import { c as createComponent, a as createAstro, d as renderHead, e as addAttribute, b as renderTemplate, r as renderComponent, F as Fragment } from '../chunks/astro/server_DkQs4QDD.mjs';
import { s as supabase } from '../chunks/index_BOrtUAlT.mjs';
/* empty css                                 */
/* empty css                                  */
export { renderers } from '../renderers.mjs';

async function searchMenus(query) {
  try {
    if (!query || query.trim().length < 2) {
      return { data: [] };
    }
    const supabaseClient = supabase();
    const searchTerm = query.trim();
    const { data, error } = await supabaseClient.rpc("search_restaurants", {
      search_term: searchTerm
    });
    if (error) {
      if (error.code === "PGRST202" || error.message?.includes("function")) {
        return searchMenusFallback(searchTerm);
      }
      console.error("Error searching menus:", error);
      return { error };
    }
    const results = (data || []).map((row) => ({
      accountId: row.account_id,
      accountName: row.account_name,
      path: row.path,
      logoUrl: row.logo_url,
      menuName: row.menu_name,
      menuId: row.menu_id
    }));
    return { data: results };
  } catch (error) {
    console.error("Error in searchMenus:", error);
    return { error: error instanceof Error ? error : new Error("Unknown error") };
  }
}
async function searchMenusFallback(searchTerm) {
  try {
    const supabaseClient = supabase();
    const { data, error } = await supabaseClient.from("accounts").select(`
        id,
        name,
        account_status,
        account_settings (
          path,
          logo_url
        ),
        menus (
          id,
          name,
          is_active
        )
      `).ilike("name", `%${searchTerm}%`).eq("account_status", "active").limit(20);
    if (error) {
      console.error("Error in fallback search:", error);
      return { error };
    }
    const results = [];
    if (data) {
      for (const account of data) {
        const settings = Array.isArray(account.account_settings) ? account.account_settings[0] : account.account_settings;
        const menus = Array.isArray(account.menus) ? account.menus : [account.menus];
        const activeMenu = menus?.find((m) => m?.is_active);
        if (activeMenu && settings) {
          results.push({
            accountId: account.id,
            accountName: account.name,
            path: settings.path,
            logoUrl: settings.logo_url,
            menuName: activeMenu.name,
            menuId: activeMenu.id
          });
        }
      }
    }
    return { data: results };
  } catch (error) {
    console.error("Error in fallback search:", error);
    return { error: error instanceof Error ? error : new Error("Unknown error") };
  }
}

const $$Astro = createAstro();
const $$Search = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Search;
  const url = new URL(Astro2.request.url);
  const query = url.searchParams.get("q") || "";
  let results = [];
  let searchError = null;
  if (query.trim().length >= 2) {
    const response = await searchMenus(query);
    if (response.error) {
      searchError = response.error;
    } else {
      results = response.data || [];
    }
  }
  const getMenuUrl = (result) => {
    return result.path ? `/v/${result.path}` : `/qr/${result.accountId}`;
  };
  return renderTemplate`<html lang="en" data-astro-cid-ipsxrsrh> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="color-scheme" content="dark"><title>Search Menus | Waitless</title><meta name="description" content="Search for restaurant menus on Waitless"><link rel="icon" type="image/svg+xml" href="/favicon.svg">${renderHead()}</head> <body data-astro-cid-ipsxrsrh> <div class="search-page" data-astro-cid-ipsxrsrh> <!-- Background effects --> <div class="background-gradient" data-astro-cid-ipsxrsrh></div> <div class="background-pattern" data-astro-cid-ipsxrsrh></div> <div class="glow-effect glow-1" data-astro-cid-ipsxrsrh></div> <div class="glow-effect glow-2" data-astro-cid-ipsxrsrh></div> <!-- Content --> <div class="content" data-astro-cid-ipsxrsrh> <!-- Header --> <header class="header" data-astro-cid-ipsxrsrh> <a href="https://waitless.tech" class="logo-link" target="_blank" rel="noopener noreferrer" data-astro-cid-ipsxrsrh> <div class="logo-wrapper" data-astro-cid-ipsxrsrh> <img src="https://pandgryacrtbbgtnphwc.supabase.co/storage/v1/object/public/public_assets/waitless/waitless.webp" alt="Waitless" class="logo-image" data-astro-cid-ipsxrsrh> </div> </a> </header> <!-- Search Section --> <div class="search-section" data-astro-cid-ipsxrsrh> <h1 class="title" data-astro-cid-ipsxrsrh>Find a Menu</h1> <p class="subtitle" data-astro-cid-ipsxrsrh>Search restaurants and browse their digital menus</p> <form action="/search" method="get" class="search-form" data-astro-cid-ipsxrsrh> <div class="search-input-wrapper" data-astro-cid-ipsxrsrh> <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ipsxrsrh> <circle cx="11" cy="11" r="8" data-astro-cid-ipsxrsrh></circle> <path d="M21 21l-4.35-4.35" data-astro-cid-ipsxrsrh></path> </svg> <input type="text" name="q"${addAttribute(query, "value")} placeholder="Restaurant name or URL..." class="search-input" autofocus autocomplete="off" data-astro-cid-ipsxrsrh> ${query && renderTemplate`<a href="/search" class="clear-button" aria-label="Clear search" data-astro-cid-ipsxrsrh> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ipsxrsrh> <line x1="18" y1="6" x2="6" y2="18" data-astro-cid-ipsxrsrh></line> <line x1="6" y1="6" x2="18" y2="18" data-astro-cid-ipsxrsrh></line> </svg> </a>`} </div> <button type="submit" class="search-button" data-astro-cid-ipsxrsrh>
Search
</button> </form> </div> <!-- Results Section --> ${query.trim().length >= 2 && renderTemplate`<div class="results-section" data-astro-cid-ipsxrsrh> ${searchError ? renderTemplate`<div class="error-message" data-astro-cid-ipsxrsrh> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ipsxrsrh> <circle cx="12" cy="12" r="10" data-astro-cid-ipsxrsrh></circle> <line x1="12" y1="8" x2="12" y2="12" data-astro-cid-ipsxrsrh></line> <line x1="12" y1="16" x2="12.01" y2="16" data-astro-cid-ipsxrsrh></line> </svg> <p data-astro-cid-ipsxrsrh>Something went wrong. Please try again.</p> </div>` : results.length === 0 ? renderTemplate`<div class="no-results" data-astro-cid-ipsxrsrh> <div class="no-results-icon" data-astro-cid-ipsxrsrh> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ipsxrsrh> <circle cx="11" cy="11" r="8" data-astro-cid-ipsxrsrh></circle> <path d="M21 21l-4.35-4.35" data-astro-cid-ipsxrsrh></path> </svg> </div> <h3 data-astro-cid-ipsxrsrh>No menus found</h3> <p data-astro-cid-ipsxrsrh>We couldn't find any menus matching "<strong data-astro-cid-ipsxrsrh>${query}</strong>"</p> <p class="hint" data-astro-cid-ipsxrsrh>Try a different search term or check the spelling</p> </div>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-ipsxrsrh": true }, { "default": async ($$result2) => renderTemplate` <p class="results-count" data-astro-cid-ipsxrsrh>
Found <strong data-astro-cid-ipsxrsrh>${results.length}</strong> ${results.length === 1 ? "menu" : "menus"} </p> <div class="results-grid" data-astro-cid-ipsxrsrh> ${results.map((result, index) => renderTemplate`<a${addAttribute(getMenuUrl(result), "href")} class="result-card"${addAttribute(`--index: ${index}`, "style")} data-astro-cid-ipsxrsrh> <div class="result-logo" data-astro-cid-ipsxrsrh> ${result.logoUrl ? renderTemplate`<img${addAttribute(result.logoUrl, "src")}${addAttribute(result.accountName, "alt")} data-astro-cid-ipsxrsrh>` : renderTemplate`<div class="logo-placeholder" data-astro-cid-ipsxrsrh> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ipsxrsrh> <path d="M3 11l18-5v12L3 14v-3z" data-astro-cid-ipsxrsrh></path> <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" data-astro-cid-ipsxrsrh></path> </svg> </div>`} </div> <div class="result-info" data-astro-cid-ipsxrsrh> <h3 class="result-name" data-astro-cid-ipsxrsrh>${result.accountName}</h3> <p class="result-menu" data-astro-cid-ipsxrsrh>${result.menuName}</p> ${result.path && renderTemplate`<span class="result-path" data-astro-cid-ipsxrsrh>waitless.tech/v/${result.path}</span>`} </div> <div class="result-arrow" data-astro-cid-ipsxrsrh> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ipsxrsrh> <path d="M5 12h14" data-astro-cid-ipsxrsrh></path> <path d="M12 5l7 7-7 7" data-astro-cid-ipsxrsrh></path> </svg> </div> </a>`)} </div> ` })}`} </div>`} <!-- Empty state when no search --> ${!query && renderTemplate`<div class="empty-state" data-astro-cid-ipsxrsrh> <div class="suggestions" data-astro-cid-ipsxrsrh> <p class="suggestions-label" data-astro-cid-ipsxrsrh>Popular searches</p> <div class="suggestion-tags" data-astro-cid-ipsxrsrh> <a href="/search?q=pizza" class="suggestion-tag" data-astro-cid-ipsxrsrh>Pizza</a> <a href="/search?q=sushi" class="suggestion-tag" data-astro-cid-ipsxrsrh>Sushi</a> <a href="/search?q=cafe" class="suggestion-tag" data-astro-cid-ipsxrsrh>Café</a> <a href="/search?q=burger" class="suggestion-tag" data-astro-cid-ipsxrsrh>Burger</a> </div> </div> </div>`} <!-- Footer --> <footer class="footer" data-astro-cid-ipsxrsrh> <p data-astro-cid-ipsxrsrh>
Powered by <a href="https://waitless.tech" target="_blank" rel="noopener noreferrer" data-astro-cid-ipsxrsrh>Waitless</a> </p> </footer> </div> </div>  </body> </html>`;
}, "/Users/jcmujica/Code/jc/waitless/waitless-menu/src/pages/search.astro", void 0);

const $$file = "/Users/jcmujica/Code/jc/waitless/waitless-menu/src/pages/search.astro";
const $$url = "/search";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Search,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
