import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://courtneyroot.dev',
  integrations: [sitemap()],
  // Keep CSS in external files so the Content-Security-Policy can stay strict (no 'unsafe-inline').
  build: { inlineStylesheets: 'never' },
});
