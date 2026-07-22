# User-confirmed release gate

**Effective date:** 2026-07-21 (after reverted v0.18.16 incident).

The user has been explicit: **never tag, push a version commit, or `gh release create` without explicit per-release approval.**

This applies to ALL of:
- `git tag v*` / `git push origin v*`
- `gh release create` / `gh release edit`
- Force-pushing a release commit (only safe with explicit go)
- Bumping versions in `package.json` / `packages/vue/package.json` immediately followed by a release-tag operation

Companion skills/memory:
- `.agents/skills/mizu-skill/SKILL.md` rule #14 (commit/push/release on explicit request)
- `.agents/skills/mizu-skill/SKILL.md` rule #1 under "Don'ts" (don't push updates automatically)

Safe defaults before any release-shaped action:
1. Confirm in the user's message.
2. If unsure, ask. A 5-second question is cheaper than a reverted release.
3. Once approved, still follow skill rule #15 for notes shape.
