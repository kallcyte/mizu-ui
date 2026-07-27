# @mizu-ui/vue

## 0.18.34

### Patch Changes

- d19b0f0: Mark Banner documentation as Ready. The docs page was already complete to the Mizu standard template from the 0.18.29 rewrite (frontmatter, Demo, Anatomy, Color Specifications, Transitions, Accessibility, Token Mapping, Vue Component API, Implementation Notes). Only the status badge needed flipping from Pending to Ready. Verified all 22 components still in sync: sidebar (`astro.config.mjs`), docs page (`src/content/docs/components/element/banner.mdx`), and homepage (`src/components/home/ComponentsSection.astro` if present).

  Components now Ready: 22/52 (up from 21).

- Updated dependencies [d19b0f0]
  - @mizu-ui/tokens@0.9.3

## 0.18.33

### Patch Changes

- a35b9a4: Test the OIDC Trusted Publishing pipeline end-to-end. Verifies that the `release.yml` workflow can mint an npm OIDC token, authenticate as the Trusted Publisher attached to each package, and publish without a long-lived `NPM_TOKEN` secret.
- Updated dependencies [a35b9a4]
  - @mizu-ui/tokens@0.9.2
