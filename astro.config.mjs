import { defineConfig } from 'astro/config';

const configuredSite = process.env.SITE_URL;
const configuredBase = process.env.SITE_BASE || '/';

export default defineConfig({
  output: 'static',
  base: configuredBase,
  trailingSlash: 'always',
  ...(configuredSite ? { site: configuredSite } : {}),
});

