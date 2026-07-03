import "./index.css";
import type { App } from "vue";

export function setupVue3({ app }: { app: App; story: any; variant: any }) {
  // App-level setup for Vue 3
  // Register global plugins or components here if needed
  // e.g. app.use(SomePlugin)
}

export function setupVanilla() {
  // No-op for vanilla setup
}
