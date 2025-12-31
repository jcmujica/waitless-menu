import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate } from '../../chunks/astro/server_BXBsx2gE.mjs';
import { c as checkAccountAccess, f as fetchMenu } from '../../chunks/check-account-access_B-mJzBkY.mjs';
import { c as fetchRestaurantSettingsByPath, f as fetchRestaurantSettings, $ as $$MenuLayout, a as $$AccountUnavailable, M as MenuCache, b as $$Menu } from '../../chunks/MenuCache_B5cElaqR.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { type, identifier } = Astro2.params;
  const PATH_TYPES = {
    ACCOUNT_ID: "qr",
    ACCOUNT_PATH: "v"
  };
  let accountId;
  let accountSettings;
  let accountAccess = { hasAccess: true, level: "active" };
  let menu;
  const isValidRouteType = type === PATH_TYPES.ACCOUNT_ID || type === PATH_TYPES.ACCOUNT_PATH;
  if (!isValidRouteType) {
    accountAccess = {
      hasAccess: false,
      level: "not_found",
      message: "This page doesn't exist. Please check the URL and try again."
    };
  } else if (type === PATH_TYPES.ACCOUNT_ID) {
    accountId = identifier;
    accountAccess = await checkAccountAccess(accountId);
    if (!accountAccess.hasAccess && accountAccess.level === "inactive" && accountAccess.message === "Account not found") {
      accountAccess.level = "not_found";
      accountAccess.message = "This menu doesn't exist. Please check the URL and try again.";
    }
  } else if (type === PATH_TYPES.ACCOUNT_PATH) {
    const settingsResponse = await fetchRestaurantSettingsByPath(identifier);
    accountSettings = settingsResponse.data;
    accountId = accountSettings?.account_id;
    if (!accountId) {
      accountAccess = {
        hasAccess: false,
        level: "not_found",
        message: "This menu doesn't exist. Please check the URL and try again."
      };
    } else {
      accountAccess = await checkAccountAccess(accountId);
    }
  }
  if (accountAccess.hasAccess && accountId) {
    if (type === PATH_TYPES.ACCOUNT_ID) {
      const [menuResponse, settingsResponse] = await Promise.all([
        fetchMenu(accountId),
        fetchRestaurantSettings(accountId)
      ]);
      menu = menuResponse.data;
      accountSettings = settingsResponse.data;
      if (!menu && !menuResponse.error) {
        accountAccess = {
          hasAccess: false,
          level: "not_found",
          message: "This restaurant hasn't set up their menu yet. Please check back later."
        };
      }
    } else if (type === PATH_TYPES.ACCOUNT_PATH) {
      const menuResponse = await fetchMenu(accountId);
      menu = menuResponse.data;
      if (!menu && !menuResponse.error) {
        accountAccess = {
          hasAccess: false,
          level: "not_found",
          message: "This restaurant hasn't set up their menu yet. Please check back later."
        };
      }
    }
  }
  const theme = menu?.appearance?.theme || "light";
  if (menu && accountAccess.hasAccess) {
    Astro2.response.headers.set(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=300"
    );
  } else {
    Astro2.response.headers.set("Cache-Control", "no-store");
  }
  return renderTemplate`${!accountAccess.hasAccess ? renderTemplate`${renderComponent($$result, "MenuLayout", $$MenuLayout, { "menu": menu, "accountSettings": accountSettings }, { "default": async ($$result2) => renderTemplate`${renderComponent($$result2, "AccountUnavailable", $$AccountUnavailable, { "accountSettings": accountSettings, "theme": theme, "level": accountAccess.level, "message": accountAccess.message })}` })}` : renderTemplate`${renderComponent($$result, "MenuLayout", $$MenuLayout, { "menu": menu, "accountSettings": accountSettings }, { "default": async ($$result2) => renderTemplate`${menu && renderTemplate`${renderComponent($$result2, "MenuCache", MenuCache, { "client:load": true, "type": type, "identifier": identifier, "menu": menu, "accountSettings": accountSettings, "client:component-hydration": "load", "client:component-path": "@/components/MenuCache", "client:component-export": "MenuCache" })}`}${renderComponent($$result2, "Menu", $$Menu, { "menu": menu, "account": type === PATH_TYPES.ACCOUNT_ID ? identifier : void 0, "accountPath": type === PATH_TYPES.ACCOUNT_PATH ? identifier : void 0, "accountSettings": accountSettings })}` })}`}`;
}, "/Users/jcmujica/Code/jc/waitless/waitless-menu/src/pages/[type]/[identifier]/index.astro", void 0);

const $$file = "/Users/jcmujica/Code/jc/waitless/waitless-menu/src/pages/[type]/[identifier]/index.astro";
const $$url = "/[type]/[identifier]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
