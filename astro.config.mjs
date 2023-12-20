import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";
import yaml from '@rollup/plugin-yaml';

// https://astro.build/config
export default defineConfig({
  site: 'https://beta.web3privacy.info',
  integrations: [tailwind()],
  vite: {
    plugins: [yaml()],
    server: {
      watch: {
        ignored: ["**/.sl/**/*", "**/.watchman-**"],
      },
    },
  },
});