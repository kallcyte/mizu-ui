import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import vue from "@astrojs/vue";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },

  integrations: [vue()],
});
