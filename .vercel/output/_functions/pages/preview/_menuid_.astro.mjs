import { c as createComponent, a as createAstro, r as renderComponent, b as renderTemplate } from '../../chunks/astro/server_BXBsx2gE.mjs';
import { f as fetchMenuById } from '../../chunks/fetch-menu-by-id_aTgnlTAI.mjs';
import { f as fetchRestaurantSettings, $ as $$MenuLayout, M as MenuCache, a as $$Menu } from '../../chunks/MenuCache_DVQknVYD.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { menuId } = Astro2.params;
  const response = await fetchMenuById(menuId);
  const menu = response.data;
  const error = response.error;
  const accountId = response.accountId;
  let accountSettings = null;
  if (accountId) {
    const settingsResponse = await fetchRestaurantSettings(accountId);
    accountSettings = settingsResponse.data;
  }
  Astro2.response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  return renderTemplate`${renderComponent($$result, "MenuLayout", $$MenuLayout, { "menu": menu, "accountSettings": accountSettings }, { "default": async ($$result2) => renderTemplate`${menu && renderTemplate`${renderComponent($$result2, "MenuCache", MenuCache, { "client:load": true, "type": "preview", "identifier": menuId, "menu": menu, "accountSettings": accountSettings ?? void 0, "client:component-hydration": "load", "client:component-path": "@/components/MenuCache", "client:component-export": "MenuCache" })}`}${renderComponent($$result2, "Menu", $$Menu, { "menu": menu, "accountSettings": accountSettings, "error": error, "menuId": menuId })} ` })}`;
}, "/Users/jcmujica/Code/jc/waitless/waitless-menu/src/pages/preview/[menuId]/index.astro", void 0);

const $$file = "/Users/jcmujica/Code/jc/waitless/waitless-menu/src/pages/preview/[menuId]/index.astro";
const $$url = "/preview/[menuId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
