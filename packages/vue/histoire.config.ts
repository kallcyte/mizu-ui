import { defineConfig } from "histoire";
import { HstVue } from "@histoire/plugin-vue";

export default defineConfig({
  plugins: [HstVue()],
  setupFile: "src/histoire.setup.ts",
  storyDir: "src/stories",
  vite: {
    build: {
      lib: false,
    },
  },
});
