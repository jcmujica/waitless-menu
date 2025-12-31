import { createClient } from '@supabase/supabase-js';
import { c as createComponent, s as spreadAttributes, u as unescapeHTML, b as renderTemplate, a as createAstro, m as maybeRenderHead, d as addAttribute, r as renderComponent, e as renderScript, F as Fragment, f as renderTransition, g as renderSlot, h as defineScriptVars, i as renderHead } from './astro/server_BXBsx2gE.mjs';
import './index_DPYU2bcR.mjs';
import { $ as $$Image } from './_astro_assets_uIj0YvjL.mjs';
import { g as getEnv$1, s as setOnSetGetEnv } from './runtime_1tkDUGik.mjs';
/* empty css                         */
import { jsx } from 'react/jsx-runtime';
import { useEffect } from 'react';
import { QueryClientProvider, QueryClient, useQueryClient } from '@tanstack/react-query';

/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-check

// @ts-expect-error
/** @returns {string} */
// used while generating the virtual module
// biome-ignore lint/correctness/noUnusedFunctionParameters: `key` is used by the generated code
const getEnv = (key) => {
	return getEnv$1(key);
};

const getSecret = (key) => {
	return getEnv(key);
};

setOnSetGetEnv(() => {
	
});

const supabase = () => {
  const supabaseUrl = getSecret("SUPABASE_URL");
  const supabaseAnonKey = getSecret("SUPABASE_ANON_KEY");
  const supabase2 = createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      global: {
        fetch: (...args) => fetch(...args)
      }
    }
  );
  return supabase2;
};

const fetchRestaurantSettings = async (account) => {
  try {
    const supabaseClient = supabase();
    const { data: accountData, error: accountError } = await supabaseClient.from("account_settings").select("*").eq("account_id", account).single();
    if (accountError || !accountData) {
      console.error("Error fetching account settings:", accountError);
      return { error: accountError || new Error("Account settings not found") };
    }
    return { data: accountData };
  } catch (error) {
    console.error("Error fetching account settings:", error);
    return { error: error instanceof Error ? error : new Error("Unknown error") };
  }
};
const fetchRestaurantSettingsByPath = async (path) => {
  try {
    const supabaseClient = supabase();
    const { data: accountData, error: accountError } = await supabaseClient.from("account_settings").select("*").eq("path", path).single();
    if (accountError || !accountData) {
      console.error("Error fetching account settings by path:", accountError);
      return { error: accountError || new Error("Account settings not found") };
    }
    return { data: accountData };
  } catch (error) {
    console.error("Error fetching account settings by path:", error);
    return { error: error instanceof Error ? error : new Error("Unknown error") };
  }
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
  }).format(price);
};

const ITEM_CLASSES = [
  {},
  {
    "id": "spicy"
  },
  {
    "id": "vegan"
  },
  {
    "id": "gluten-free"
  }
];

function createSvgComponent({ meta, attributes, children }) {
  const Component = createComponent((_, props) => {
    const normalizedProps = normalizeProps(attributes, props);
    return renderTemplate`<svg${spreadAttributes(normalizedProps)}>${unescapeHTML(children)}</svg>`;
  });
  Object.defineProperty(Component, "toJSON", {
    value: () => meta,
    enumerable: false
  });
  return Object.assign(Component, meta);
}
const ATTRS_TO_DROP = ["xmlns", "xmlns:xlink", "version"];
const DEFAULT_ATTRS = {};
function dropAttributes(attributes) {
  for (const attr of ATTRS_TO_DROP) {
    delete attributes[attr];
  }
  return attributes;
}
function normalizeProps(attributes, props) {
  return dropAttributes({ ...DEFAULT_ATTRS, ...attributes, ...props });
}

const SpicySvg = createSvgComponent({"meta":{"src":"/_astro/spicy.DCgTOGN1.svg","width":24,"height":24,"format":"svg"},"attributes":{"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","class":"icon icon-tabler icons-tabler-outline icon-tabler-pepper"},"children":"<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /><path d=\"M13 11c0 2.21 -2.239 4 -5 4s-5 -1.79 -5 -4a8 8 0 1 0 16 0a3 3 0 0 0 -6 0\" /><path d=\"M16 8c0 -2 2 -4 4 -4\" />"});

const VeganSvg = createSvgComponent({"meta":{"src":"/_astro/vegan.CgFPQ2A2.svg","width":24,"height":24,"format":"svg"},"attributes":{"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","class":"icon icon-tabler icons-tabler-outline icon-tabler-leaf"},"children":"<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /><path d=\"M5 21c.5 -4.5 2.5 -8 7 -10\" /><path d=\"M9 18c6.218 0 10.5 -3.288 11 -12v-2h-4.014c-9 0 -11.986 4 -12 9c0 1 0 3 2 5h3z\" />"});

const GlutenFreeSvg = createSvgComponent({"meta":{"src":"/_astro/gluten-free.BLxbQfKU.svg","width":24,"height":24,"format":"svg"},"attributes":{"width":"24","height":"24","viewBox":"0 0 24 24","fill":"none","stroke":"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","class":"icon icon-tabler icons-tabler-outline icon-tabler-wheat-off"},"children":"<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /><path d=\"M3 3l18 18\" /><path d=\"M12 21.5v-3.75\" /><path d=\"M5.916 9.49l-.43 1.604c-.712 2.659 .866 5.392 3.524 6.104c.997 .268 1.994 .535 2.99 .802v-3.44c-.164 -2.105 -1.637 -3.879 -3.677 -4.426l-2.407 -.644z\" /><path d=\"M10.249 4.251c.007 -.007 .014 -.014 .021 -.021l1.73 -1.73\" /><path d=\"M10.27 11.15c-.589 -.589 -1.017 -1.318 -1.246 -2.118\" /><path d=\"M14.988 8.988c.229 -.834 .234 -1.713 .013 -2.549c-.221 -.836 -.659 -1.598 -1.271 -2.209l-1.73 -1.73\" /><path d=\"M16.038 10.037l2.046 -.547l.431 1.604c.142 .53 .193 1.063 .162 1.583\" /><path d=\"M16.506 16.505c-.45 .307 -.959 .544 -1.516 .694c-.997 .268 -1.994 .535 -2.99 .801v-3.44c.055 -.708 .259 -1.379 .582 -1.978\" />"});

const $$Astro$c = createAstro();
const $$ItemModal = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$ItemModal;
  const { item } = Astro2.props;
  const { name, price, image_url, description, classes } = item || {};
  return renderTemplate`${maybeRenderHead()}<dialog${addAttribute(`item-modal-${item.id}`, "id")} class="modal rounded-lg overflow-hidden shadow-xl" data-astro-cid-mq5vgy2k> <div class="w-full max-w-md text-white p-0 rounded-lg overflow-hidden relative" data-astro-cid-mq5vgy2k> <button type="button" class="close-modal absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-black/80 text-white shadow-lg border border-black/10 transition-all duration-200 z-10" aria-label="Close modal" data-astro-cid-mq5vgy2k> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-mq5vgy2k> <line x1="18" y1="6" x2="6" y2="18" data-astro-cid-mq5vgy2k></line> <line x1="6" y1="6" x2="18" y2="18" data-astro-cid-mq5vgy2k></line> </svg> </button> ${image_url && renderTemplate`<div class="w-full h-48 overflow-hidden relative" data-astro-cid-mq5vgy2k> ${renderComponent($$result, "Image", $$Image, { "src": image_url, "alt": name || "", "width": 400, "height": 300, "class": "w-full h-full object-cover", "data-astro-cid-mq5vgy2k": true })} </div>`} <div class="description p-4" data-astro-cid-mq5vgy2k> <div class="flex justify-between items-start mb-4" data-astro-cid-mq5vgy2k> <h2 class="text-xl font-bold" data-astro-cid-mq5vgy2k>${name}</h2> ${price !== null && price !== void 0 && renderTemplate`<p class="text-lg font-bold" data-astro-cid-mq5vgy2k>${formatPrice(price)}</p>`} </div> ${classes && classes.length > 0 && renderTemplate`<div class="flex gap-3 mb-4 flex-wrap" data-astro-cid-mq5vgy2k> ${classes.map((classId) => {
    const itemClass = ITEM_CLASSES[parseInt(classId)];
    switch (itemClass?.id) {
      case "spicy":
        return renderTemplate`<div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20" data-astro-cid-mq5vgy2k> ${renderComponent($$result, "SpicySvg", SpicySvg, { "class": "w-4 h-4 fill-current", "data-astro-cid-mq5vgy2k": true })} <span class="text-sm font-medium" data-astro-cid-mq5vgy2k>Picante</span> </div>`;
      case "vegan":
        return renderTemplate`<div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20" data-astro-cid-mq5vgy2k> ${renderComponent($$result, "VeganSvg", VeganSvg, { "class": "w-4 h-4 fill-current", "data-astro-cid-mq5vgy2k": true })} <span class="text-sm font-medium" data-astro-cid-mq5vgy2k>Vegano</span> </div>`;
      case "gluten-free":
        return renderTemplate`<div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20" data-astro-cid-mq5vgy2k> ${renderComponent($$result, "GlutenFreeSvg", GlutenFreeSvg, { "class": "w-4 h-4 fill-current", "data-astro-cid-mq5vgy2k": true })} <span class="text-sm font-medium" data-astro-cid-mq5vgy2k>Sin gluten</span> </div>`;
      default:
        return null;
    }
  })} </div>`} ${description && renderTemplate`<p class="text-sm opacity-80" data-astro-cid-mq5vgy2k>${description}</p>`} </div> </div> </dialog> `;
}, "/Users/jcmujica/Code/jc/waitless/waitless-menu/src/components/ItemModal.astro", void 0);

const $$Astro$b = createAstro();
const $$Section = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$Section;
  const { name } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<li class="section-item section-nav-item relative w-full overflow-hidden rounded-lg p-2" data-astro-cid-sh445jdo> <h3 class="font-bold text-2xl tracking-wide" data-astro-cid-sh445jdo>${name}</h3> </li> `;
}, "/Users/jcmujica/Code/jc/waitless/waitless-menu/src/components/Section.astro", void 0);

const $$Astro$a = createAstro();
const $$Item = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Item;
  const { item, settings, hasItemsWithClasses = false, menuId, accountId } = Astro2.props;
  const menuItemId = item?.id || "";
  const trackingItemId = item?.item_id || item?.id || "";
  const supabaseUrl = (() => {
    try {
      return getSecret("SUPABASE_URL");
    } catch (error) {
      console.warn("SUPABASE_URL not configured for analytics tracking");
      return "";
    }
  })();
  const supabaseAnonKey = (() => {
    try {
      return getSecret("SUPABASE_ANON_KEY");
    } catch (error) {
      console.warn("SUPABASE_ANON_KEY not configured for analytics tracking");
      return "";
    }
  })();
  const { name, price, image_url, description, classes } = item || {};
  const { showPrices, showImages, showDescriptions } = settings;
  const extraSpace = hasItemsWithClasses && (!classes || classes.length === 0);
  const itemData = item ? JSON.stringify({
    name,
    price,
    image_url,
    description,
    showPrices,
    showImages,
    showDescriptions
  }) : null;
  return renderTemplate`${renderScript($$result, "/Users/jcmujica/Code/jc/waitless/waitless-menu/src/components/Item.astro?astro&type=script&index=0&lang.ts")} ${item?.type === "item" && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-eugdkh75": true }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<li${addAttribute(`item-${item.id}`, "id")} class="menu-item relative flex w-full justify-between items-center gap-4 rounded-lg border shadow-xs overflow-hidden cursor-pointer"${addAttribute(menuItemId, "data-menu-item-id")}${addAttribute(trackingItemId, "data-item-id")}${addAttribute(itemData, "data-item-data")}${addAttribute(menuId, "data-menu-id")}${addAttribute(accountId, "data-account-id")}${addAttribute(supabaseUrl, "data-supabase-url")}${addAttribute(supabaseAnonKey, "data-supabase-anon-key")} data-astro-cid-eugdkh75>${showImages && image_url && renderTemplate`<div class="rounded-l-lg overflow-hidden shrink-0 self-stretch" data-astro-cid-eugdkh75>${renderComponent($$result2, "Image", $$Image, { "class": "object-cover object-center h-full w-[80px]", "src": image_url, "alt": name || "", "width": 80, "height": 80, "loading": "eager", "inferSize": true, "data-astro-cid-eugdkh75": true })}</div>`}<div${addAttribute(`flex flex-col gap-1 grow py-3`, "class")} data-astro-cid-eugdkh75>${extraSpace && renderTemplate`<div class="h-2.5 mt-1" data-astro-cid-eugdkh75></div>`}<h3 class="font-bold text-md line-clamp-1" data-astro-cid-eugdkh75>${name}</h3>${showDescriptions && description && renderTemplate`<p class="text-xs line-clamp-1 opacity-70" data-astro-cid-eugdkh75>${description}</p>`}${classes && classes.length > 0 && renderTemplate`<div class="flex gap-2 mt-1" data-astro-cid-eugdkh75>${classes.map((classId) => {
    const itemClass = ITEM_CLASSES[parseInt(classId)];
    switch (itemClass.id) {
      case "spicy":
        return renderTemplate`${renderComponent($$result2, "SpicySvg", SpicySvg, { "class": "w-5 h-5 opacity-70 fill-amber-50", "data-astro-cid-eugdkh75": true })}`;
      case "vegan":
        return renderTemplate`${renderComponent($$result2, "VeganSvg", VeganSvg, { "class": "w-5 h-5 opacity-70 fill-amber-50", "data-astro-cid-eugdkh75": true })}`;
      case "gluten-free":
        return renderTemplate`${renderComponent($$result2, "GlutenFreeSvg", GlutenFreeSvg, { "class": "w-5 h-5 opacity-70 fill-amber-50", "data-astro-cid-eugdkh75": true })}`;
      default:
        return null;
    }
  })}</div>`}${extraSpace && renderTemplate`<div class="h-2.5 mt-1" data-astro-cid-eugdkh75></div>`}</div>${showPrices && price !== null && price !== void 0 && renderTemplate`<div class="flex flex-col gap-2 items-center shrink-0 pr-4" data-astro-cid-eugdkh75><p class="price text-sm font-bold" data-astro-cid-eugdkh75>${formatPrice(price)}</p></div>`}</li>${renderComponent($$result2, "ItemModal", $$ItemModal, { "item": item, "data-astro-cid-eugdkh75": true })}` })}`}${item?.type === "section" && renderTemplate`${renderComponent($$result, "Section", $$Section, { "name": item.name, "data-astro-cid-eugdkh75": true })}`}`;
}, "/Users/jcmujica/Code/jc/waitless/waitless-menu/src/components/Item.astro", void 0);

const ChevronLeft = createSvgComponent({"meta":{"src":"/_astro/ChevronLeft.BWAWr1kh.svg","width":24,"height":24,"format":"svg"},"attributes":{"width":"24","height":"24","viewBox":"0 0 15 15","fill":"none"},"children":"<path d=\"M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z\" fill=\"currentColor\" fill-rule=\"evenodd\" clip-rule=\"evenodd\"></path>"});

const $$Astro$9 = createAstro();
const $$FloatingButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$FloatingButton;
  const { href } = Astro2.props;
  return renderTemplate`<!-- Use 'viewport' for instant prefetch on both mobile and desktop -->${maybeRenderHead()}<a${addAttribute(href, "href")} data-astro-prefetch="viewport"> <button type="button"${addAttribute("fixed bottom-4 left-4 cursor-pointer rounded-full bg-primary-500 [&_svg]:size-8 [&_svg]:text-primary-50 flex items-center justify-center h-12 w-12", "class")}> ${renderComponent($$result, "ChevronLeft", ChevronLeft, {})} </button> </a>`;
}, "/Users/jcmujica/Code/jc/waitless/waitless-menu/src/components/Buttons/FloatingButton.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$Astro$8 = createAstro();
const $$Navigation = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Navigation;
  const { sections = [], accountSettings } = Astro2.props;
  const hasSections = sections.length > 0;
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", '<div class="glassmorphism border-b border-[var(--glass-border)] sticky top-0 z-10 w-full" data-astro-transition-persist="navigation" data-astro-cid-pux6a34n> <nav class="" data-astro-cid-pux6a34n> <div class="overflow-x-auto scrollbar-hide" id="nav-container" data-astro-cid-pux6a34n> <ul class="flex whitespace-nowrap py-3 px-3 gap-3 items-center" data-astro-cid-pux6a34n> ', " ", ' </ul> </div> </nav> </div>  <script>\n  // Function to initialize navigation\n  function initializeNavigation() {\n    // Clean up any previous observers to avoid duplicates\n    if (window.currentNavObserver) {\n      window.currentNavObserver.disconnect();\n    }\n\n    const navContainer = document.getElementById("nav-container");\n    const navButtons = Array.from(\n      document.querySelectorAll(".section-nav-item"),\n    );\n    const sections = Array.from(document.querySelectorAll(\'[id^="section-"]\'));\n\n    if (!sections.length || !navButtons.length || !navContainer) return;\n\n    const navByTarget = new Map();\n    let userClicking = false;\n\n    // Remove any previous event listeners\n    navButtons.forEach((btn) => {\n      const newBtn = btn.cloneNode(true);\n      if (btn.parentNode) {\n        btn.parentNode.replaceChild(newBtn, btn);\n      }\n    });\n\n    // Get fresh references after replacing\n    const freshNavButtons = Array.from(\n      document.querySelectorAll(".section-nav-item"),\n    );\n\n    freshNavButtons.forEach((btn, i) => {\n      const target = btn.dataset.sectionTarget;\n      if (target) navByTarget.set(target, btn);\n      if (!btn.id) btn.id = `section-nav-item-${i}`;\n\n      btn.addEventListener("click", () => {\n        const section = document.getElementById(target);\n        if (!section) return;\n        userClicking = true;\n        section.scrollIntoView({ behavior: "smooth", inline: "start" });\n\n        // Reset the flag after the smooth scroll is likely finished\n        setTimeout(() => (userClicking = false), 800);\n      });\n    });\n\n    function clearActive() {\n      freshNavButtons.forEach((b) => b.classList.remove("active"));\n    }\n\n    function setActive(sectionId, fromScroll = false) {\n      const btn = navByTarget.get(sectionId);\n      if (!btn) return;\n      clearActive();\n      btn.classList.add("active");\n\n      if (fromScroll && !userClicking) {\n        const containerRect = navContainer.getBoundingClientRect();\n        const btnRect = btn.getBoundingClientRect();\n\n        const fullyVisible =\n          btnRect.left >= containerRect.left &&\n          btnRect.right <= containerRect.right;\n\n        if (!fullyVisible) {\n          // Instant scroll when triggered by normal scrolling\n          btn.scrollIntoView({ behavior: "auto", inline: "center" });\n        }\n      }\n    }\n\n    const observer = new IntersectionObserver(\n      (entries) => {\n        const visible = entries.filter((e) => e.isIntersecting);\n        if (!visible.length) return;\n\n        // Pick the section closest to the top (lowest boundingClientRect.top)\n        const topMost = visible.reduce((prev, curr) => {\n          return prev.boundingClientRect.top < curr.boundingClientRect.top\n            ? prev\n            : curr;\n        });\n\n        setActive(topMost.target.id, true);\n      },\n      {\n        rootMargin: "0px 0px -80% 0px",\n        threshold: 0,\n      },\n    );\n\n    // Store the observer in a global variable so we can disconnect it later\n    window.currentNavObserver = observer;\n\n    sections.forEach((s) => observer.observe(s));\n  }\n\n  // Run on initial page load\n  document.addEventListener("DOMContentLoaded", initializeNavigation);\n\n  // Also run when the page content changes (e.g., after navigation)\n  document.addEventListener("astro:page-load", initializeNavigation);\n  document.addEventListener("astro:after-swap", initializeNavigation);\n<\/script>'], ["", '<div class="glassmorphism border-b border-[var(--glass-border)] sticky top-0 z-10 w-full" data-astro-transition-persist="navigation" data-astro-cid-pux6a34n> <nav class="" data-astro-cid-pux6a34n> <div class="overflow-x-auto scrollbar-hide" id="nav-container" data-astro-cid-pux6a34n> <ul class="flex whitespace-nowrap py-3 px-3 gap-3 items-center" data-astro-cid-pux6a34n> ', " ", ' </ul> </div> </nav> </div>  <script>\n  // Function to initialize navigation\n  function initializeNavigation() {\n    // Clean up any previous observers to avoid duplicates\n    if (window.currentNavObserver) {\n      window.currentNavObserver.disconnect();\n    }\n\n    const navContainer = document.getElementById("nav-container");\n    const navButtons = Array.from(\n      document.querySelectorAll(".section-nav-item"),\n    );\n    const sections = Array.from(document.querySelectorAll(\'[id^="section-"]\'));\n\n    if (!sections.length || !navButtons.length || !navContainer) return;\n\n    const navByTarget = new Map();\n    let userClicking = false;\n\n    // Remove any previous event listeners\n    navButtons.forEach((btn) => {\n      const newBtn = btn.cloneNode(true);\n      if (btn.parentNode) {\n        btn.parentNode.replaceChild(newBtn, btn);\n      }\n    });\n\n    // Get fresh references after replacing\n    const freshNavButtons = Array.from(\n      document.querySelectorAll(".section-nav-item"),\n    );\n\n    freshNavButtons.forEach((btn, i) => {\n      const target = btn.dataset.sectionTarget;\n      if (target) navByTarget.set(target, btn);\n      if (!btn.id) btn.id = \\`section-nav-item-\\${i}\\`;\n\n      btn.addEventListener("click", () => {\n        const section = document.getElementById(target);\n        if (!section) return;\n        userClicking = true;\n        section.scrollIntoView({ behavior: "smooth", inline: "start" });\n\n        // Reset the flag after the smooth scroll is likely finished\n        setTimeout(() => (userClicking = false), 800);\n      });\n    });\n\n    function clearActive() {\n      freshNavButtons.forEach((b) => b.classList.remove("active"));\n    }\n\n    function setActive(sectionId, fromScroll = false) {\n      const btn = navByTarget.get(sectionId);\n      if (!btn) return;\n      clearActive();\n      btn.classList.add("active");\n\n      if (fromScroll && !userClicking) {\n        const containerRect = navContainer.getBoundingClientRect();\n        const btnRect = btn.getBoundingClientRect();\n\n        const fullyVisible =\n          btnRect.left >= containerRect.left &&\n          btnRect.right <= containerRect.right;\n\n        if (!fullyVisible) {\n          // Instant scroll when triggered by normal scrolling\n          btn.scrollIntoView({ behavior: "auto", inline: "center" });\n        }\n      }\n    }\n\n    const observer = new IntersectionObserver(\n      (entries) => {\n        const visible = entries.filter((e) => e.isIntersecting);\n        if (!visible.length) return;\n\n        // Pick the section closest to the top (lowest boundingClientRect.top)\n        const topMost = visible.reduce((prev, curr) => {\n          return prev.boundingClientRect.top < curr.boundingClientRect.top\n            ? prev\n            : curr;\n        });\n\n        setActive(topMost.target.id, true);\n      },\n      {\n        rootMargin: "0px 0px -80% 0px",\n        threshold: 0,\n      },\n    );\n\n    // Store the observer in a global variable so we can disconnect it later\n    window.currentNavObserver = observer;\n\n    sections.forEach((s) => observer.observe(s));\n  }\n\n  // Run on initial page load\n  document.addEventListener("DOMContentLoaded", initializeNavigation);\n\n  // Also run when the page content changes (e.g., after navigation)\n  document.addEventListener("astro:page-load", initializeNavigation);\n  document.addEventListener("astro:after-swap", initializeNavigation);\n<\/script>'])), maybeRenderHead(), accountSettings?.logo_url && renderTemplate`<li${addAttribute("flex-shrink-0 " + (!hasSections ? "mx-auto" : ""), "class")} data-astro-cid-pux6a34n> ${renderComponent($$result, "Image", $$Image, { "src": accountSettings.logo_url, "width": 64, "height": 64, "alt": "Logo", "class": "w-16 h-16", "data-astro-cid-pux6a34n": true })} </li>`, hasSections && sections.map((section, index) => {
    if (section.pageId === "home") {
      return null;
    }
    return renderTemplate`<li class="flex-shrink-0" data-astro-cid-pux6a34n> <button class="section-nav-item text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2"${addAttribute(`section-${section.id.replace("section-", "")}`, "data-section-target")}${addAttribute(section.pageId, "data-page-id")} data-astro-cid-pux6a34n> <span data-astro-cid-pux6a34n>${section.name}</span> </button> </li>`;
  }));
}, "/Users/jcmujica/Code/jc/waitless/waitless-menu/src/components/Navigation.astro", "self");

const $$Astro$7 = createAstro();
const $$Page = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Page;
  const {
    id,
    items = [],
    menu,
    baseUrl,
    showNavigation = true,
    accountSettings
  } = Astro2.props;
  const settings = {
    showPrices: menu?.settings?.showPrices ?? true,
    showImages: menu?.settings?.showImages ?? true,
    showDescriptions: menu?.settings?.showDescriptions ?? true
  };
  const isSinglePage = menu?.type === "single-page";
  const allSections = menu?.pages?.flatMap((page) => {
    return page.items.filter((item) => item.type === "section").map((section) => ({
      id: `section-${section.id}`,
      name: section.name,
      pageId: page.id
    }));
  }) || [];
  const pageSections = items.filter((item) => item.type === "section");
  const pageSectionIds = pageSections.map((section) => ({
    id: `section-${section.id}`,
    name: section.name,
    pageId: id
  }));
  const navigationSections = isSinglePage ? allSections : pageSectionIds;
  const hasItemsWithClasses = items.some(
    (item) => item.type === "item" && item.classes && item.classes.length > 0
  );
  return renderTemplate`${maybeRenderHead()}<main${addAttribute(`page-${id}`, "id")} class="min-h-screen flex flex-col" data-astro-cid-yzdvavkq> ${showNavigation && renderTemplate`${renderComponent($$result, "Navigation", $$Navigation, { "sections": navigationSections, "accountSettings": accountSettings, "data-astro-cid-yzdvavkq": true })}`} <ul class="menu-items-list flex flex-col gap-3 p-3" data-astro-cid-yzdvavkq> ${items.map((item, index) => {
    const sectionId = item.type === "section" ? `section-${item.id}` : "";
    const isSection = item.type === "section";
    return renderTemplate`<div${addAttribute(sectionId, "id")}${addAttribute(`menu-item-wrapper ${isSection ? "scroll-mt-16 not-first:mt-4" : ""}`, "class")}${addAttribute(`--item-index: ${index}`, "style")} data-astro-cid-yzdvavkq${addAttribute(renderTransition($$result, "tmdsdgmn", "slide", `item-${item.id}`), "data-astro-transition-scope")}> ${renderComponent($$result, "Item", $$Item, { "item": item, "settings": settings, "hasItemsWithClasses": hasItemsWithClasses, "menuId": menu.id, "accountId": accountSettings?.account_id, "data-astro-cid-yzdvavkq": true })} </div>`;
  })} </ul> ${!isSinglePage && renderTemplate`${renderComponent($$result, "FloatingButton", $$FloatingButton, { "href": baseUrl, "data-astro-cid-yzdvavkq": true })}`} </main>  `;
}, "/Users/jcmujica/Code/jc/waitless/waitless-menu/src/components/Page.astro", "self");

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer data-astro-cid-sz7xmlte> <p data-astro-cid-sz7xmlte>Powered by <a href="https://waitless.tech" target="_blank" rel="noopener noreferrer" class="text-rose-500 hover:underline" data-astro-cid-sz7xmlte>Waitless</a></p> </footer> `;
}, "/Users/jcmujica/Code/jc/waitless/waitless-menu/src/components/Footer.astro", void 0);

const $$Astro$6 = createAstro();
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Button;
  const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 px-4 py-2 has-[>svg]:px-3";
  const variantClasses = {
    primary: "bg-[var(--primary-500)] text-[var(--primary-500-contrast)] shadow-xs hover:bg-[var(--primary-600)] hover:text-[var(--primary-600-contrast)]",
    secondary: "bg-[var(--primary-100)] text-[var(--primary-100-contrast)] shadow-xs hover:bg-[var(--primary-200)] hover:text-[var(--primary-200-contrast)]",
    outline: "border border-[var(--primary-500)] text-[var(--primary-500)] bg-background shadow-xs hover:bg-[var(--primary-50)] dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
    ghost: "text-[var(--primary-600)] hover:bg-[var(--primary-50)] hover:text-[var(--primary-700)] dark:hover:bg-accent/50"
  };
  const { href, variant = "primary", prefetch = "viewport" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute(prefetch ? prefetch : void 0, "data-astro-prefetch")}> <button type="button"${addAttribute(`cursor-pointer w-full max-w-xs mx-auto ${baseClasses} ${variantClasses[variant]}`, "class")}> ${renderSlot($$result, $$slots["default"])} </button> </a>`;
}, "/Users/jcmujica/Code/jc/waitless/waitless-menu/src/components/Buttons/Button.astro", void 0);

const $$Astro$5 = createAstro();
const $$Home = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Home;
  const { menu, baseUrl, accountSettings } = Astro2.props;
  const hasLogo = !!accountSettings?.logo_url;
  return renderTemplate`${maybeRenderHead()}<main class="h-screen flex flex-col gap-4 justify-center"${addAttribute(renderTransition($$result, "mgjyzdw6", "fade", ""), "data-astro-transition-scope")}> <div class="mt-[-148px]"> <header class="p-4 w-full"> <div class="flex items-center justify-center"> ${hasLogo && renderTemplate`<img${addAttribute(accountSettings?.logo_url, "src")} alt="Logo" class="w-48 h-48"${addAttribute(renderTransition($$result, "nugvfi4g", "", "logo"), "data-astro-transition-scope")}>`} </div> ${!hasLogo && renderTemplate`<h1 class="text-2xl font-bold text-center"${addAttribute(renderTransition($$result, "oqkuh6kv", "", "menu-title"), "data-astro-transition-scope")}> ${menu?.name || "Menu"} </h1>`} </header> <nav class="flex flex-col gap-4 mb-4 text-center px-4"> ${menu.pages.map((page, index) => renderTemplate`<div${addAttribute(`animation-delay: ${(index + 1) * 50}ms`, "style")}> ${renderComponent($$result, "Button", $$Button, { "href": `${baseUrl}/${page.id}` }, { "default": ($$result2) => renderTemplate`${page.name}` })} </div>`)} </nav> </div> </main>`;
}, "/Users/jcmujica/Code/jc/waitless/waitless-menu/src/components/Home.astro", "self");

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a, _b;
const $$Astro$4 = createAstro();
const $$Menu = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Menu;
  const {
    menu,
    currentPage: currentPageProp,
    account,
    accountPath,
    accountSettings,
    error,
    menuId
  } = Astro2.props;
  const isSinglePage = menu?.type === "single-page";
  const isMultiPage = menu?.type === "multi-page";
  let currentPage = currentPageProp || isSinglePage && menu?.pages?.find((page) => page.id === menu?.mainPageId);
  const isQrRoute = !!account;
  const isPreviewRoute = !!menuId;
  const isPageView = !!currentPage || isSinglePage && !menu?.mainPageId;
  const routeType = isPreviewRoute ? "preview" : isQrRoute ? "qr" : "v";
  const identifier = isPreviewRoute ? menuId : isQrRoute ? account : accountPath;
  const baseUrl = identifier && routeType ? `/${routeType}/${identifier}` : "";
  const isPageNotFound = isPageView && !currentPage && menu;
  const shouldRedirect = isPageNotFound || error;
  const shouldShowHome = isMultiPage && !isPageView;
  const shouldShowPage = isPageView && currentPage;
  const supabaseUrl = (() => {
    try {
      return getSecret("SUPABASE_URL") || "";
    } catch (error2) {
      console.warn("SUPABASE_URL not configured for analytics tracking");
      return "";
    }
  })();
  const supabaseAnonKey = (() => {
    try {
      return getSecret("SUPABASE_ANON_KEY") || "";
    } catch (error2) {
      console.warn("SUPABASE_ANON_KEY not configured for analytics tracking");
      return "";
    }
  })();
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${menu?.id && accountSettings?.account_id && supabaseUrl && supabaseAnonKey && !isPreviewRoute && renderTemplate(_a || (_a = __template(["<script>(function(){", "\n      (function() {\n        // Only track once per page load\n        if (document.documentElement.hasAttribute('data-menu-view-tracked')) {\n          return;\n        }\n        \n        // Mark as tracked\n        document.documentElement.setAttribute('data-menu-view-tracked', 'true');\n        \n        // Track the view (fire and forget)\n        if (menuId && accountId && supabaseUrl && supabaseAnonKey) {\n          fetch(`${supabaseUrl}/functions/v1/trackMenuView`, {\n            method: 'POST',\n            headers: {\n              'Content-Type': 'application/json',\n              'Authorization': `Bearer ${supabaseAnonKey}`,\n            },\n            body: JSON.stringify({\n              menu_id: menuId,\n              account_id: accountId,\n            }),\n          }).catch((err) => {\n            console.debug('Menu view tracking error:', err);\n          });\n        }\n      })();\n    })();<\/script>"], ["<script>(function(){", "\n      (function() {\n        // Only track once per page load\n        if (document.documentElement.hasAttribute('data-menu-view-tracked')) {\n          return;\n        }\n        \n        // Mark as tracked\n        document.documentElement.setAttribute('data-menu-view-tracked', 'true');\n        \n        // Track the view (fire and forget)\n        if (menuId && accountId && supabaseUrl && supabaseAnonKey) {\n          fetch(\\`\\${supabaseUrl}/functions/v1/trackMenuView\\`, {\n            method: 'POST',\n            headers: {\n              'Content-Type': 'application/json',\n              'Authorization': \\`Bearer \\${supabaseAnonKey}\\`,\n            },\n            body: JSON.stringify({\n              menu_id: menuId,\n              account_id: accountId,\n            }),\n          }).catch((err) => {\n            console.debug('Menu view tracking error:', err);\n          });\n        }\n      })();\n    })();<\/script>"])), defineScriptVars({ menuId: menu.id, accountId: accountSettings.account_id, supabaseUrl, supabaseAnonKey }))}${maybeRenderHead()}<div class="w-full"><div class="max-w-2xl mx-auto">${menu && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${shouldShowHome && renderTemplate`${renderComponent($$result3, "Home", $$Home, { "menu": menu, "baseUrl": baseUrl, "accountSettings": accountSettings })}`}${shouldShowPage && renderTemplate`${renderComponent($$result3, "Page", $$Page, { "baseUrl": baseUrl, "id": currentPage.id, "items": currentPage.items, "menu": menu, "accountSettings": accountSettings })}`}${renderComponent($$result3, "Footer", $$Footer, {})}` })}`}</div></div>`, "head": ($$result2) => renderTemplate(_b || (_b = __template(['<title slot="head">', '</title><script slot="head">(function(){', "\n    if (shouldRedirect) {\n      window.location.href = baseUrl;\n    }\n  })();<\/script>"])), menu?.name || "Menu", defineScriptVars({ baseUrl, shouldRedirect })) })}`;
}, "/Users/jcmujica/Code/jc/waitless/waitless-menu/src/components/Menu.astro", void 0);

const TAILWIND_COLORS = {
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617"
  },
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
    950: "#030712"
  },
  zinc: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
    950: "#09090b"
  },
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    950: "#0a0a0a"
  },
  stone: {
    50: "#fafaf9",
    100: "#f5f5f4",
    200: "#e7e5e4",
    300: "#d6d3d1",
    400: "#a8a29e",
    500: "#78716c",
    600: "#57534e",
    700: "#44403c",
    800: "#292524",
    900: "#1c1917",
    950: "#0c0a09"
  },
  red: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
    950: "#450a0a"
  },
  orange: {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12",
    950: "#431407"
  },
  amber: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
    950: "#451a03"
  },
  yellow: {
    50: "#fefce8",
    100: "#fef9c3",
    200: "#fef08a",
    300: "#fde047",
    400: "#facc15",
    500: "#eab308",
    600: "#ca8a04",
    700: "#a16207",
    800: "#854d0e",
    900: "#713f12",
    950: "#422006"
  },
  lime: {
    50: "#f7fee7",
    100: "#ecfccb",
    200: "#d9f99d",
    300: "#bef264",
    400: "#a3e635",
    500: "#84cc16",
    600: "#65a30d",
    700: "#4d7c0f",
    800: "#3f6212",
    900: "#365314",
    950: "#1a2e05"
  },
  green: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
    950: "#052e16"
  },
  emerald: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
    950: "#022c22"
  },
  teal: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6",
    600: "#0d9488",
    700: "#0f766e",
    800: "#115e59",
    900: "#134e4a",
    950: "#042f2e"
  },
  cyan: {
    50: "#ecfeff",
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
    950: "#083344"
  },
  sky: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
    950: "#082f49"
  },
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554"
  },
  indigo: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
    950: "#1e1b4b"
  },
  violet: {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9",
    800: "#5b21b6",
    900: "#4c1d95",
    950: "#2e1065"
  },
  purple: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7e22ce",
    800: "#6b21a8",
    900: "#581c87",
    950: "#3b0764"
  },
  fuchsia: {
    50: "#fdf4ff",
    100: "#fae8ff",
    200: "#f5d0fe",
    300: "#f0abfc",
    400: "#e879f9",
    500: "#d946ef",
    600: "#c026d3",
    700: "#a21caf",
    800: "#86198f",
    900: "#701a75",
    950: "#4a044e"
  },
  pink: {
    50: "#fdf2f8",
    100: "#fce7f3",
    200: "#fbcfe8",
    300: "#f9a8d4",
    400: "#f472b6",
    500: "#ec4899",
    600: "#db2777",
    700: "#be185d",
    800: "#9d174d",
    900: "#831843",
    950: "#500724"
  },
  rose: {
    50: "#fff1f2",
    100: "#ffe4e6",
    200: "#fecdd3",
    300: "#fda4af",
    400: "#fb7185",
    500: "#f43f5e",
    600: "#e11d48",
    700: "#be123c",
    800: "#9f1239",
    900: "#881337",
    950: "#4c0519"
  }
};

function generateThemeVariables(primaryColor) {
  const colorPalette = TAILWIND_COLORS[primaryColor] || TAILWIND_COLORS.slate;
  const cssVars = {};
  Object.entries(colorPalette).forEach(([shade, value]) => {
    cssVars[`--primary-${shade}`] = value;
    cssVars[`--primary-${shade}-rgb`] = hexToRgb(value);
  });
  return cssVars;
}
function hexToRgb(hex) {
  const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!match) return "0, 0, 0";
  const [, r, g, b] = match;
  return `${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)}`;
}

const $$Astro$3 = createAstro();
const $$ClientRouter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ClientRouter;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>${renderScript($$result, "/Users/jcmujica/Code/jc/waitless/waitless-menu/node_modules/.pnpm/astro@5.13.5_@types+node@24.3.0_@vercel+functions@2.2.13_jiti@2.5.1_lightningcss@1.30.1_rollup@4.49.0_typescript@5.9.2/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/jcmujica/Code/jc/waitless/waitless-menu/node_modules/.pnpm/astro@5.13.5_@types+node@24.3.0_@vercel+functions@2.2.13_jiti@2.5.1_lightningcss@1.30.1_rollup@4.49.0_typescript@5.9.2/node_modules/astro/components/ClientRouter.astro", void 0);

const $$Astro$2 = createAstro();
const $$LoadingOverlay = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$LoadingOverlay;
  const { accountSettings, theme = "light" } = Astro2.props;
  const logoUrl = accountSettings?.logo_url;
  return renderTemplate`<!-- Loading Overlay - Shows during View Transitions -->${maybeRenderHead()}<div id="loading-overlay" class="loading-overlay"${addAttribute(theme, "data-theme")} aria-hidden="true" role="presentation" data-astro-cid-7p2d43sv> <!-- Animated backdrop --> <div class="loading-backdrop" data-astro-cid-7p2d43sv> <!-- Radial gradient orbs --> <div class="orb orb-1" data-astro-cid-7p2d43sv></div> <div class="orb orb-2" data-astro-cid-7p2d43sv></div> <div class="orb orb-3" data-astro-cid-7p2d43sv></div> </div> <!-- Glass container --> <div class="loading-content" data-astro-cid-7p2d43sv> ${logoUrl ? renderTemplate`<div class="logo-container" data-astro-cid-7p2d43sv> <img${addAttribute(logoUrl, "src")} alt="Loading..." class="loading-logo" data-astro-cid-7p2d43sv> <div class="logo-ring" data-astro-cid-7p2d43sv></div> </div>` : renderTemplate`<div class="loading-spinner" data-astro-cid-7p2d43sv> <div class="spinner-ring" data-astro-cid-7p2d43sv></div> <div class="spinner-ring spinner-ring-2" data-astro-cid-7p2d43sv></div> </div>`} <!-- Loading dots --> <div class="loading-dots" data-astro-cid-7p2d43sv> <span class="dot" data-astro-cid-7p2d43sv></span> <span class="dot" data-astro-cid-7p2d43sv></span> <span class="dot" data-astro-cid-7p2d43sv></span> </div> </div> </div> `;
}, "/Users/jcmujica/Code/jc/waitless/waitless-menu/src/components/LoadingOverlay.astro", void 0);

const $$Astro$1 = createAstro();
const $$MenuLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$MenuLayout;
  const parseJSON = (obj) => {
    try {
      return typeof obj === "string" ? JSON.parse(obj) : obj;
    } catch {
      return {};
    }
  };
  const { menu, accountSettings } = Astro2.props;
  const theme = menu?.appearance?.theme || "light";
  const styleData = parseJSON(menu?.appearance?.style);
  const primaryColor = styleData?.colors?.primary?.id?.split("-")[0] || "slate";
  const themeVariables = generateThemeVariables(primaryColor);
  const customBgImg = menu?.appearance?.custom_bg_img;
  const customBgProps = parseJSON(menu?.appearance?.custom_bg_props);
  const hasCustomBg = customBgImg && customBgProps?.mode !== "none";
  const implementation = styleData?.background?.implementation;
  const container = {
    className: implementation?.container?.className || "",
    style: parseJSON(implementation?.container?.style) || {}
  };
  const background = {
    className: implementation?.background?.className || "",
    style: parseJSON(implementation?.background?.style) || {}
  };
  const animation = implementation?.animation;
  const primaryColorStyles = Object.entries(themeVariables).map(([key, value]) => `${key}: ${value};`).join("\n        ");
  return renderTemplate`<html lang="es"${addAttribute(theme === "dark" ? "dark-mode" : "light-mode", "class")} data-astro-cid-vrixsjww> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="color-scheme"${addAttribute(theme, "content")}>${renderComponent($$result, "ClientRouter", $$ClientRouter, { "fallback": "swap", "data-astro-cid-vrixsjww": true })}<title>${menu?.name || "Menu"}</title><meta name="view-transition" content="same-origin"><!-- Dynamic favicon from restaurant logo -->${accountSettings?.logo_url && renderTemplate`<link rel="icon" type="image/png"${addAttribute(accountSettings.logo_url, "href")}>`}<!-- Inject primary color variables --><style>${unescapeHTML(`
      :root {
        ${primaryColorStyles}
      }
      ${animation?.keyframes ? animation.keyframes : ""}
    `)}</style>${renderSlot($$result, $$slots["head"])}${renderHead()}</head> <body id="root"${addAttribute(`${hasCustomBg ? "min-h-screen w-full relative" : container?.className || "min-h-screen w-full relative"}`, "class")}${addAttribute(container?.style, "style")} data-astro-cid-vrixsjww>  ${!hasCustomBg && background.style && Object.keys(background.style).length > 0 && renderTemplate`<div class="fixed inset-0 z-0"${addAttribute({
    ...background.style,
    ...animation?.name ? { animation: animation.name } : {}
  }, "style")} data-astro-transition-persist="background" data-astro-cid-vrixsjww></div>`}  ${hasCustomBg && renderTemplate`<div class="fixed inset-0 z-0"${addAttribute({
    backgroundImage: `url(${customBgImg})`,
    backgroundSize: customBgProps.mode === "pattern" ? "50px" : customBgProps.mode === "centered" ? "auto 80%" : "cover",
    backgroundPosition: "center",
    backgroundRepeat: customBgProps.mode === "pattern" ? "repeat" : "no-repeat"
  }, "style")} data-astro-transition-persist="background" data-astro-cid-vrixsjww></div>`}  <div data-astro-transition-persist="loading-overlay" data-astro-cid-vrixsjww> ${renderComponent($$result, "LoadingOverlay", $$LoadingOverlay, { "accountSettings": accountSettings, "theme": theme, "data-astro-cid-vrixsjww": true })} </div> <main${addAttribute(`${theme} min-h-screen w-full relative`, "class")} data-astro-cid-vrixsjww> <div class="relative z-10" data-astro-cid-vrixsjww> ${renderSlot($$result, $$slots["default"])} </div> </main>  </body></html>`;
}, "/Users/jcmujica/Code/jc/waitless/waitless-menu/src/layouts/MenuLayout.astro", "self");

const $$Astro = createAstro();
const $$AccountUnavailable = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AccountUnavailable;
  const {
    accountSettings,
    level = "inactive",
    message = "This menu is currently unavailable"
  } = Astro2.props;
  const logoUrl = accountSettings?.logo_url;
  const accountName = accountSettings?.name;
  const getDisplayMessage = () => {
    switch (level) {
      case "not_found":
        return {
          title: "Menu Not Found",
          subtitle: message || "The menu you're looking for doesn't exist or may have been moved.",
          icon: "search"
        };
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
  return renderTemplate`${maybeRenderHead()}<div class="unavailable-container" data-astro-cid-3a36hfiz> <!-- Animated gradient background --> <div class="background-gradient" data-astro-cid-3a36hfiz></div> <!-- Dot pattern overlay --> <div class="background-pattern" data-astro-cid-3a36hfiz></div> <!-- Glow effect --> <div class="glow-effect" data-astro-cid-3a36hfiz></div> <!-- Content --> <div class="content" data-astro-cid-3a36hfiz> <!-- Logo or Icon --> <div class="logo-section" data-astro-cid-3a36hfiz> ${logoUrl ? renderTemplate`<div class="logo-wrapper" data-astro-cid-3a36hfiz> <img${addAttribute(logoUrl, "src")}${addAttribute(accountName || "Restaurant", "alt")} class="logo" data-astro-cid-3a36hfiz> </div>` : renderTemplate`<div class="icon-container" data-astro-cid-3a36hfiz> ${displayInfo.icon === "search" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon" data-astro-cid-3a36hfiz> <circle cx="11" cy="11" r="8" data-astro-cid-3a36hfiz></circle> <path d="M21 21l-4.35-4.35" data-astro-cid-3a36hfiz></path> </svg>`} ${displayInfo.icon === "pause" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon" data-astro-cid-3a36hfiz> <circle cx="12" cy="12" r="10" data-astro-cid-3a36hfiz></circle> <line x1="10" y1="15" x2="10" y2="9" data-astro-cid-3a36hfiz></line> <line x1="14" y1="15" x2="14" y2="9" data-astro-cid-3a36hfiz></line> </svg>`} ${displayInfo.icon === "clock" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon" data-astro-cid-3a36hfiz> <circle cx="12" cy="12" r="10" data-astro-cid-3a36hfiz></circle> <polyline points="12 6 12 12 16 14" data-astro-cid-3a36hfiz></polyline> </svg>`} ${displayInfo.icon === "info" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon" data-astro-cid-3a36hfiz> <circle cx="12" cy="12" r="10" data-astro-cid-3a36hfiz></circle> <line x1="12" y1="16" x2="12" y2="12" data-astro-cid-3a36hfiz></line> <line x1="12" y1="8" x2="12.01" y2="8" data-astro-cid-3a36hfiz></line> </svg>`} </div>`} </div> <!-- Restaurant Name (if available) --> ${accountName && renderTemplate`<h2 class="restaurant-name" data-astro-cid-3a36hfiz>${accountName}</h2>`} <!-- Message --> <div class="message-section" data-astro-cid-3a36hfiz> <h1 class="title" data-astro-cid-3a36hfiz>${displayInfo.title}</h1> <p class="subtitle" data-astro-cid-3a36hfiz>${displayInfo.subtitle}</p> </div> <!-- Contact Info (if available) --> ${(accountSettings?.contact_email || accountSettings?.contact_phone) && renderTemplate`<div class="contact-section" data-astro-cid-3a36hfiz> <p class="contact-label" data-astro-cid-3a36hfiz>For inquiries, please contact:</p> ${accountSettings.contact_phone && renderTemplate`<a${addAttribute(`tel:${accountSettings.contact_phone}`, "href")} class="contact-link" data-astro-cid-3a36hfiz> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="contact-icon" data-astro-cid-3a36hfiz> <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" data-astro-cid-3a36hfiz></path> </svg> ${accountSettings.contact_phone} </a>`} ${accountSettings.contact_email && renderTemplate`<a${addAttribute(`mailto:${accountSettings.contact_email}`, "href")} class="contact-link" data-astro-cid-3a36hfiz> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="contact-icon" data-astro-cid-3a36hfiz> <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" data-astro-cid-3a36hfiz></path> <polyline points="22,6 12,13 2,6" data-astro-cid-3a36hfiz></polyline> </svg> ${accountSettings.contact_email} </a>`} </div>`} <!-- Footer --> <div class="footer" data-astro-cid-3a36hfiz> <p class="powered-by" data-astro-cid-3a36hfiz>
Powered by <a href="https://waitless.tech" target="_blank" rel="noopener noreferrer" data-astro-cid-3a36hfiz>Waitless</a> </p> </div> </div> </div> `;
}, "/Users/jcmujica/Code/jc/waitless/waitless-menu/src/components/AccountUnavailable.astro", void 0);

let globalQueryClient = null;
function getQueryClient() {
  if (typeof window === "undefined") {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 10 * 60 * 1e3,
          gcTime: 30 * 60 * 1e3,
          refetchOnWindowFocus: false,
          refetchOnReconnect: true,
          retry: 1
        }
      }
    });
  }
  if (!globalQueryClient) {
    globalQueryClient = new QueryClient({
      defaultOptions: {
        queries: {
          // Menu data doesn't change often - keep it cached for 10 minutes
          staleTime: 10 * 60 * 1e3,
          // Keep cached data for 30 minutes
          gcTime: 30 * 60 * 1e3,
          // Don't refetch on window focus for menu viewing
          refetchOnWindowFocus: false,
          // Do refetch if connection was lost
          refetchOnReconnect: true,
          // Retry failed requests once
          retry: 1
        }
      }
    });
  }
  return globalQueryClient;
}
function QueryProvider({ children }) {
  const queryClient = getQueryClient();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children });
}

function getMenuQueryKey(params) {
  return ["menu", params.type, params.identifier];
}
function usePrefetchMenu() {
  const queryClient = useQueryClient();
  return (params, menuData) => {
    queryClient.setQueryData(getMenuQueryKey(params), menuData);
  };
}

function MenuCacheInner({ type, identifier, menu, accountSettings }) {
  const prefetchMenu = usePrefetchMenu();
  useEffect(() => {
    const params = { type, identifier };
    const menuData = { menu, accountSettings };
    prefetchMenu(params, menuData);
  }, [type, identifier, menu, accountSettings, prefetchMenu]);
  return null;
}
function MenuCache(props) {
  return /* @__PURE__ */ jsx(QueryProvider, { children: /* @__PURE__ */ jsx(MenuCacheInner, { ...props }) });
}

export { $$MenuLayout as $, MenuCache as M, $$AccountUnavailable as a, $$Menu as b, fetchRestaurantSettingsByPath as c, fetchRestaurantSettings as f, supabase as s };
