import { readFileSync, writeFileSync } from "node:fs";
const base = "D:/codes/mizu-ui/packages/vue/src/components";

function patch(file, styleContent) {
  const p = `${base}/MizuNavigationMenu${file}.vue`;
  let c = readFileSync(p, "utf8");
  c = c.replace(/<style>[\s\S]*?<\/style>/, `<style>\n${styleContent}\n</style>`);
  writeFileSync(p, c, "utf8");
  console.log(`  ${file}: OK`);
}

console.log("Rewriting NavigationMenu CSS with Mizu tokens + all:revert...\n");

patch("Root", `.NavigationMenuRoot {
  all: revert;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: inherit;
  z-index: 1;
}

.NavigationMenuRoot[data-orientation="vertical"] {
  flex-direction: column;
  align-items: flex-start;
}`);

patch("List", `.NavigationMenuRoot .NavigationMenuList {
  all: revert;
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none !important;
  margin: 0 !important;
  padding: 0 !important;
  font-family: inherit;
}

.NavigationMenuList[data-orientation="vertical"] {
  flex-direction: column;
  align-items: stretch;
}`);

patch("Item", `.NavigationMenuItem {
  all: revert;
  font-family: inherit;
}`);

patch("Trigger", `.NavigationMenuTrigger {
  all: revert;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px 14px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  color: var(--color-foreground-secondary, #5f6b7c);
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  outline: none;
  transition: color 150ms ease, background-color 150ms ease;
}

.NavigationMenuTrigger:hover,
.NavigationMenuTrigger[data-state="open"] {
  color: var(--color-foreground-primary, #1a1a2e);
  background-color: var(--color-surface-subtle, #f8f8f8);
}

.NavigationMenuTrigger:focus-visible {
  outline: 2px solid var(--color-brand-accent, #6366f1);
  outline-offset: 2px;
}

.NavigationMenuTrigger[data-disabled] {
  color: var(--color-foreground-tertiary, #9ca3af);
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}`);

patch("Content", `.NavigationMenuContent {
  all: revert;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  font-family: inherit;
  padding: 16px;
  animation-duration: 250ms;
  animation-timing-function: ease;
}

.NavigationMenuContent[data-motion="from-start"] {
  animation-name: enterFromLeft;
}

.NavigationMenuContent[data-motion="from-end"] {
  animation-name: enterFromRight;
}

.NavigationMenuContent[data-motion="to-start"] {
  animation-name: exitToLeft;
}

.NavigationMenuContent[data-motion="to-end"] {
  animation-name: exitToRight;
}

@keyframes enterFromRight {
  from { opacity: 0; transform: translateX(200px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes enterFromLeft {
  from { opacity: 0; transform: translateX(-200px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes exitToRight {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(200px); }
}

@keyframes exitToLeft {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(-200px); }
}

@media (prefers-reduced-motion: reduce) {
  .NavigationMenuContent {
    animation: none;
  }
}`);

patch("Link", `.NavigationMenuLink {
  all: revert;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  color: var(--color-foreground-secondary, #5f6b7c);
  text-decoration: none;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  outline: none;
  transition: color 150ms ease, background-color 150ms ease;
}

.NavigationMenuLink:hover {
  color: var(--color-foreground-primary, #1a1a2e);
  background-color: var(--color-surface-subtle, #f8f8f8);
}

.NavigationMenuLink:focus-visible {
  outline: 2px solid var(--color-brand-accent, #6366f1);
  outline-offset: 2px;
}

.NavigationMenuLink[data-active] {
  color: var(--color-brand-primary, #001c44);
  background-color: var(--color-brand-accent-subtle, #e8f0ff);
}`);

patch("Indicator", `.NavigationMenuIndicator {
  all: revert;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 10px;
  top: 100%;
  overflow: hidden;
  z-index: 1;
  font-family: inherit;
  transition: width, transform, 250ms ease;
}

.NavigationMenuIndicator::after {
  content: "";
  display: block;
  width: 12px;
  height: 12px;
  background: var(--color-surface-base, white);
  border-radius: 2px;
  border-top-left-radius: 0;
  transform: translateY(70%) rotate(45deg);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.NavigationMenuIndicator[data-state="hidden"] {
  opacity: 0;
  transition: opacity 200ms ease;
}

.NavigationMenuIndicator[data-state="visible"] {
  opacity: 1;
}`);

patch("Viewport", `.NavigationMenuViewport {
  all: revert;
  position: relative;
  width: var(--reka-navigation-menu-viewport-width);
  height: var(--reka-navigation-menu-viewport-height);
  font-family: inherit;
  transition: width, height, 250ms ease;
  overflow: hidden;
  border-radius: 6px;
  background: var(--color-surface-base, white);
  border: 1px solid var(--color-surface-muted, #e0e0e0);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] .NavigationMenuViewport {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2);
}`);

patch("Sub", `.NavigationMenuSub {
  all: revert;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: inherit;
}`);

console.log("\nDone. All 9 components rewritten.");
