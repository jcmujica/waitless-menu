// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';


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
  vite: {
    plugins: [tailwindcss()]
  },
  adapter: vercel(),
});