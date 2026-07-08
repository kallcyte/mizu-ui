import "./histoire.css";

export function setupVue3(_ctx: { app: unknown; story: unknown; variant: unknown }) {
  // Nuxt UI vue-plugin not loaded here to avoid #imports resolution issues.
  // Mizu components kept in the library use their own styles and do not depend
  // on globally registered U* components at the story level.
}

export function setupVanilla() {
  // No-op for vanilla setup
}
