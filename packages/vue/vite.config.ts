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
      //autoImport: true,
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
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        theme: resolve(__dirname, "src/theme.ts"),
      },
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["vue", "@nuxt/ui"],
      output: {
        globals: {
          vue: "Vue",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.names?.some((n) => n.endsWith(".css"))) return "index.css";
          return "[name].[ext]";
        },
      },
      onwarn(warning, warn) {
        // Vue compiler may emit an unused `resolveComponent` import when
        // components are auto-imported via unplugin-vue-components. The call
        // is tree-shaken, producing a harmless Rollup warning.
        if (
          warning.code === "UNUSED_EXTERNAL_IMPORT" &&
          warning.message?.includes("resolveComponent")
        ) {
          return;
        }
        warn(warning);
      },
    },
  },
});
