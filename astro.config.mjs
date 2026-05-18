import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://karanspvh-ops.github.io',
  base: '/spvh-group-website',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
