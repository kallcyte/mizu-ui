import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import ui from "@nuxt/ui/vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    vue(),
    ui({
      // Enable auto-imports so Mizu custom components can use U* components directly
      // at build time. Nuxt UI components are externalized (not bundled) — consumers
      // must install @nuxt/ui separately.
      autoImport: true,
      router: false,
      components: {
        resolvers: [],
      },
    }),
    dts({
      include: ["src/**/*.ts", "src/**/*.vue"],
      outDir: "dist",
    }),
  ],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: "index",
    },
    rollupOptions: {
      external: ["vue", "@nuxt/ui"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
