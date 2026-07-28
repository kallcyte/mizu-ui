---
"@mizu-ui/tokens": patch
"@mizu-ui/vue": patch
---

Mark Separator documentation as Ready. Full template rewrite: frontmatter, Demo, Anatomy, Size Specifications (5 sizes → 1-5px border widths), Color Specifications (7-color Mizu token table), Spacing Details (container margin table for orientation × position), Accessibility (decorative prop + ARIA patterns for list/toolbar/section-break), Token Mapping, Vue Component API with 11 props (added `as` and `ui` slot override), 1 slot, and 9 Example Usage snippets. 8 Implementation Notes covering default size, vertical height requirement, accessibility, label positioning, container spacing, compound variants, and comparison to `<hr>`. Demo already had 9 sections covering all use cases; no demo changes needed.

Verified all 24 components still in sync: sidebar (`astro.config.mjs`), docs page (`src/content/docs/components/element/separator.mdx`), and homepage showcase (`src/components/home/ComponentShowcase.vue` does not include Separator since it's a primitive element wrapper).

Components now Ready: 24/52 (up from 23). Element category is now 8/8 complete.
