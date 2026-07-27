# Plan: Publish @mizu/vue and @mizu/tokens to npm

## Overview

Set up automated publishing for `@mizu/tokens` and `@mizu/vue` to npmjs.org
using changesets for version management, authenticated via npm's OIDC
**Trusted Publishing** (no long-lived `NPM_TOKEN` stored in CI).

## Prerequisites (Manual)

### 1. npm Setup
- Go to https://www.npmjs.com and log in
- Create an `@mizu` organization at https://www.npmjs.com/settings/mizu/organizations/new
  (or publish directly as the existing `mizu` user)
- **One-time manual publish required first:** npm requires a package to
  already exist before you can attach a Trusted Publisher to it. Publish
  `@mizu/tokens` and `@mizu/vue` once from your local machine
  (`npm login` → `npm publish --access public` from each package dir)
  before wiring up CI.

### 2. Configure Trusted Publishing (per package)

For **each** package (`@mizu/tokens`, `@mizu/vue`) on npmjs.com:
- Go to the package's Settings → Trusted Publishing
- Add a GitHub Actions publisher with:
  - Organization/user + repository (case-sensitive)
  - Workflow filename: `release.yml`
  - Environment: leave blank unless you're using a GitHub Environment
- Both packages can point at the same workflow file.
- Optionally, under Settings → Publishing access, enable "Require two-factor
  authentication and disallow tokens" once Trusted Publishing is confirmed
  working, to close off classic-token publishing entirely.

No `NPM_TOKEN` secret is needed with this approach — skip the GitHub Secrets
step entirely. (If you'd rather ship faster and add OIDC later, see the
**Fallback: classic token auth** section at the bottom — but budget time to
redo the auth wiring when you migrate.)

## Code Changes

### Step 1: Install @changesets/cli

```bash
pnpm add -Dw @changesets/cli
pnpm changeset init
```

### Step 2: Update root package.json

Add `"private": true` and these scripts:

```jsonc
{
  "private": true,
  "scripts": {
    // ... existing scripts ...
    "changeset": "changeset",
    "version-packages": "changeset version",
    "release": "changeset publish"
  }
}
```

### Step 3: Configure .changeset/config.json

```json
{
  "$schema": "https://unpkg.com/@changesets/config@3.1.1/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "master",
  "updateInternalDependencies": "patch",
  "ignore": ["@mizu/mcp-server"]
}
```

### Step 4: Audit each package's package.json

Before the first automated publish, confirm `@mizu/tokens` and `@mizu/vue`
each have:
- `"publishConfig": { "access": "public" }` (belt-and-suspenders alongside
  the changesets config's `access: "public"`)
- A `"files"` array (or `.npmignore`) that includes only build output
  (e.g. `["dist"]`) — not `src/`, tests, or config files
- Correct `"main"` / `"module"` / `"exports"` / `"types"` fields pointing at
  the built output, not source
- `"repository"`, `"license"`, and `"description"` fields set

### Step 5: Update .github/workflows/release.yml

```yaml
name: Release

on:
  push:
    branches: [master]

permissions:
  contents: write
  pull-requests: write
  id-token: write # required for npm OIDC Trusted Publishing

concurrency: ${{ github.workflow }}-${{ github.ref }}

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0 # full history so changesets can detect all changes

      - uses: pnpm/action-setup@v4
        # version omitted on purpose — resolved from the "packageManager"
        # field in root package.json; verify that field is set correctly

      - uses: actions/setup-node@v4
        with:
          node-version: 22 # bump to 24+ if you rely on npm v11 OIDC locally too
          cache: pnpm
          registry-url: https://registry.npmjs.org

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Lint & test
        run: |
          pnpm -r lint
          pnpm -r test

      - name: Build all packages
        run: pnpm -r build

      - name: Create Release Pull Request or Publish
        id: changesets
        uses: changesets/action@v1
        with:
          publish: pnpm changeset publish
          version: pnpm changeset version
          title: "chore: version packages"
          commit: "chore: version packages"
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Notes on this workflow vs. the original draft:
- `id-token: write` is what lets npm's CLI mint an OIDC token — this is the
  actual auth mechanism now, so no `NPM_TOKEN` env var is needed on the
  publish step.
- `registry-url` on `setup-node` is required for the OIDC flow to engage.
- `fetch-depth: 0` avoids changesets missing changes due to a shallow clone.
- The `concurrency` group prevents two merges landing close together from
  racing each other through `changeset version` / `changeset publish`.
- A lint/test step gates the build so a broken package can't get versioned
  and published automatically.
- Provenance attestations are generated automatically under Trusted
  Publishing — no `--provenance` flag needed.

### Step 6: (Optional) Create .npmrc

Only needed if you go the classic-token route (see fallback below); not
required for Trusted Publishing.

## Developer Workflow

### Before merging a PR

```bash
pnpm changeset          # select packages, bump type, write summary
git add .changeset/     # commit the changeset file with your PR
```

### Publishing

1. PRs with changesets merge to `master`
2. GitHub Action lints, tests, and builds
3. GitHub Action opens a "Version Packages" PR (bumps versions + changelogs)
4. Review and merge the version PR
5. GitHub Action publishes to npm automatically via OIDC

### Manual publish (fallback)

Requires a local `npm login` session (Trusted Publishing only works from CI):

```bash
pnpm changeset version
pnpm changeset publish
```

## Fallback: classic token auth (skip if using Trusted Publishing)

If you want to ship now and adopt OIDC later:

1. Generate an Automation token at https://www.npmjs.com/settings/tokens
2. Add it as a GitHub repo secret named `NPM_TOKEN`
   (Settings → Secrets and variables → Actions → New repository secret)
3. Create `.npmrc` at the repo root:
   ```
   //registry.npmjs.org/:_authToken=${NPM_TOKEN}
   @mizu:registry=https://registry.npmjs.org/
   ```
4. In the workflow, drop `id-token: write` and `registry-url`, and instead
   set `NPM_TOKEN: ${{ secrets.NPM_TOKEN }}` in the `env:` block of the
   `changesets/action@v1` step.

This is the simpler path but leaves a long-lived publish credential sitting
in GitHub Secrets — migrate to Trusted Publishing when you have a spare hour.

## Files Changed

| File | Action |
|---|---|
| `package.json` (root) | Add `private: true`, add changeset scripts |
| `package.json` (each publishable package) | Verify `publishConfig`, `files`, entry fields |
| `.changeset/config.json` | Create |
| `.github/workflows/release.yml` | Rewrite |
| `.npmrc` | Create — only if using classic-token fallback |
