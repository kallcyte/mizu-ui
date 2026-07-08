import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      globals: true,
      include: ["src/**/*.test.ts"],
      setupFiles: ["src/__tests__/setup.ts"],
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html"],
        include: ["src/**/*.{ts,vue}"],
        exclude: ["src/**/*.test.ts", "src/index.ts"],
      },
    },
  })
);
