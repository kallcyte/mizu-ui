---
"@mizu-ui/tokens": patch
"@mizu-ui/vue": patch
---

Test the OIDC Trusted Publishing pipeline end-to-end. Verifies that the `release.yml` workflow can mint an npm OIDC token, authenticate as the Trusted Publisher attached to each package, and publish without a long-lived `NPM_TOKEN` secret.
