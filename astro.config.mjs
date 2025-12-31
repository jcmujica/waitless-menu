// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Enable SSR mode
  output: 'server',
  redirects: {
    "/": {
      status: 302,
      destination: "https://waitless.tech"
    }
  },
  // Enable prefetching for faster navigation
  prefetch: {
    // Prefetch links on hover for near-instant navigation
    defaultStrategy: 'hover',
    // Also prefetch links when they enter the viewport
    prefetchAll: false,
  },
  vite: {
    plugins: [tailwindcss()]
  },
  adapter: vercel(),
  integrations: [react()],
});