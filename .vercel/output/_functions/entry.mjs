import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_TqJnu0rS.mjs';
import { manifest } from './manifest_9g0gk868.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/preview/_menuid_/_page_.astro.mjs');
const _page2 = () => import('./pages/preview/_menuid_.astro.mjs');
const _page3 = () => import('./pages/_type_/_identifier_/_page_.astro.mjs');
const _page4 = () => import('./pages/_type_/_identifier_.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.13.5_@types+node@24.3.0_@vercel+functions@2.2.13_jiti@2.5.1_lightningcss@1.30.1_rollup@4.49.0_typescript@5.9.2/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/preview/[menuId]/[page]/index.astro", _page1],
    ["src/pages/preview/[menuId]/index.astro", _page2],
    ["src/pages/[type]/[identifier]/[page]/index.astro", _page3],
    ["src/pages/[type]/[identifier]/index.astro", _page4]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "45816fd3-dc5b-40d1-96c8-01a72d8cfaae",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
