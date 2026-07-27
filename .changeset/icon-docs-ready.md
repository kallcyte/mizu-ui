---
"@mizu-ui/tokens": patch
"@mizu-ui/vue": patch
---

Mark Icon documentation as Ready. Full template rewrite: frontmatter, Demo, Anatomy, Size Specifications (8 sizes), Color Specifications (currentColor + customize callback), Accessibility (decorative vs semantic), Token Mapping, Vue Component API with 8 Example Usage snippets, and 8 Implementation Notes. Demo expanded from 4 to 6 sections adding Colors (5 semantic variants via Tailwind text classes) and Customize Callback (per-segment recolor via `:customize` prop).

Verified all 23 components still in sync: sidebar (`astro.config.mjs`), docs page (`src/content/docs/components/element/icon.mdx`), and homepage showcase (`src/components/home/ComponentShowcase.vue` does not include Icon since it's a primitive element wrapper).

Components now Ready: 23/52 (up from 22).
