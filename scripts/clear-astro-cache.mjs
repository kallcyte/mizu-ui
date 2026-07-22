import { watch } from "fs";
import { rmSync, existsSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const astroCache = resolve(root, ".astro");

function clearCache() {
  if (existsSync(astroCache)) {
    rmSync(astroCache, { recursive: true, force: true });
    console.log(`[cache-watch] Cleared .astro cache`);
  }
}

// If --watch is passed, watch for file changes in the background
if (process.argv.includes("--watch")) {
  console.log("[cache-watch] Watching for content changes...");

  const watchers = [
    // Watch content docs directory recursively for .md/.mdx changes
    watch(resolve(root, "src/content/docs"), { recursive: true }, (event, filename) => {
      if (filename && (filename.endsWith(".mdx") || filename.endsWith(".md"))) {
        console.log(`[cache-watch] ${filename} changed (${event}), clearing cache...`);
        clearCache();
      }
    }),
    // Watch project root for astro.config.mjs changes
    watch(resolve(root), { recursive: false }, (event, filename) => {
      if (filename === "astro.config.mjs") {
        console.log(`[cache-watch] astro.config.mjs changed (${event}), clearing cache...`);
        clearCache();
      }
    }),
    // Watch workspace package dist folders — built artifacts, not source,
    // so HMR can't detect them. Invalidate Astro cache on rebuild.
    watch(resolve(root, "packages/vue/dist"), { recursive: true }, (event, filename) => {
      if (filename) {
        console.log(`[cache-watch] packages/vue/dist/${filename} changed (${event}), clearing cache...`);
        clearCache();
      }
    }),
    watch(resolve(root, "packages/tokens/dist"), { recursive: true }, (event, filename) => {
      if (filename) {
        console.log(`[cache-watch] packages/tokens/dist/${filename} changed (${event}), clearing cache...`);
        clearCache();
      }
    }),
  ];

  process.on("SIGINT", () => {
    watchers.forEach((w) => w.close());
    process.exit(0);
  });

  process.on("SIGTERM", () => {
    watchers.forEach((w) => w.close());
    process.exit(0);
  });
} else {
  // Just clear the cache once and exit
  clearCache();
}
