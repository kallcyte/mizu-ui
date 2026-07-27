# @mizu-ui/vue

## 0.18.33

### Patch Changes

- a35b9a4: Test the OIDC Trusted Publishing pipeline end-to-end. Verifies that the `release.yml` workflow can mint an npm OIDC token, authenticate as the Trusted Publisher attached to each package, and publish without a long-lived `NPM_TOKEN` secret.
- Updated dependencies [a35b9a4]
  - @mizu-ui/tokens@0.9.2
