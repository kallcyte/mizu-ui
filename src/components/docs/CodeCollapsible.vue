<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";

const props = defineProps<{
  code: string;
}>();

const open = ref(false);
const copied = ref(false);
const highlightedHtml = ref("");
const currentTheme = ref("light");

function escapeHtml(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

let highlighter: any = null;

async function getHighlighter() {
  if (!highlighter) {
    const { createHighlighter } = await import("shiki/bundle/web");
    highlighter = await createHighlighter({
      themes: ["github-dark", "github-light"],
      langs: ["html"],
    });
  }
  return highlighter;
}

async function highlightCode(code: string) {
  try {
    await getHighlighter();
    highlightedHtml.value = highlighter.codeToHtml(code.trim(), {
      lang: "html",
      theme: currentTheme.value === "dark" ? "github-dark" : "github-light",
    });
  } catch {
    highlightedHtml.value = `<pre class="code-collapsible__block shiki-fallback"><code>${escapeHtml(code)}</code></pre>`;
  }
}

let themeObserver: MutationObserver | null = null;

onMounted(() => {
  const html = document.documentElement;
  currentTheme.value = html.getAttribute("data-theme") || "light";

  themeObserver = new MutationObserver(() => {
    const newTheme = html.getAttribute("data-theme") || "light";
    if (newTheme !== currentTheme.value) {
      currentTheme.value = newTheme;
      highlightCode(props.code);
    }
  });
  themeObserver.observe(html, { attributes: true, attributeFilter: ["data-theme"] });

  if (props.code) {
    highlightCode(props.code);
  }
});

onUnmounted(() => {
  if (themeObserver) themeObserver.disconnect();
});

watch(
  () => props.code,
  (newCode) => {
    if (newCode) highlightCode(newCode);
  }
);

function toggle() {
  open.value = !open.value;
}

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.code.trim());
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = props.code.trim();
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  }
}
</script>

<template>
  <div class="code-collapsible">
    <div class="code-collapsible__preview">
      <slot />
    </div>
    <button
      class="code-collapsible__toggle"
      :class="{ 'code-collapsible__toggle--open': open }"
      @click="toggle"
    >
      <svg
        class="code-collapsible__chevron"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
      <span>{{ open ? "Hide code" : "Show code" }}</span>
    </button>
    <div
      class="code-collapsible__code-wrapper"
      :class="{ 'code-collapsible__code-wrapper--open': open }"
    >
      <div class="code-collapsible__content">
        <button
          class="code-collapsible__copy-btn"
          :class="{ 'code-collapsible__copy-btn--copied': copied }"
          :aria-label="copied ? 'Copied' : 'Copy code'"
          @click="copyCode"
        >
          <svg
            v-if="copied"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <svg
            v-else
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
          </svg>
        </button>
        <div v-if="highlightedHtml" class="code-collapsible__html" v-html="highlightedHtml"></div>
        <pre v-else class="code-collapsible__block"><code>{{ escapeHtml(code) }}</code></pre>
      </div>
    </div>
  </div>
</template>

<style>
.code-collapsible {
  all: revert;
  border: 1px solid var(--color-surface-muted);
  border-radius: 8px;
  overflow: hidden;
  font-family: inherit;
}

.code-collapsible__preview {
  all: revert;
  padding: 16px;
}

.code-collapsible__preview > * {
  margin-top: 0;
}

.code-collapsible__code-wrapper {
  all: revert;
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 250ms ease-out;
}

.code-collapsible__code-wrapper--open {
  grid-template-rows: 1fr;
}

.code-collapsible__toggle {
  all: revert;
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 10px 16px;
  border: none;
  border-top: 1px solid var(--color-surface-muted);
  background: var(--color-surface-subtle);
  color: var(--color-foreground-secondary);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  transition:
    color 150ms,
    background 150ms;
}

.code-collapsible__toggle:hover {
  color: var(--color-foreground-primary);
  background: var(--color-surface-muted);
}

.code-collapsible__chevron {
  transition: transform 200ms;
}

.code-collapsible__toggle--open .code-collapsible__chevron {
  transform: rotate(180deg);
}

.code-collapsible__content {
  all: revert;
  position: relative;
  padding: 16px;
  border-top: 1px solid var(--color-surface-muted);
  background: var(--color-surface-base);
  overflow: hidden;
}

.code-collapsible__content > * {
  margin-top: 0;
}

.code-collapsible__code-wrapper--open .code-collapsible__content {
  border-top: 1px solid var(--color-surface-muted);
}

/* Shiki highlighted output */
.code-collapsible__html {
  all: revert;
}

.code-collapsible__html .shiki {
  all: revert;
  margin: 0;
  padding: 16px;
  border-radius: 6px;
  background: var(--color-surface-subtle) !important;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.6;
  font-family: "JetBrains Mono", "Fira Code", monospace;
  white-space: pre;
}

.code-collapsible__html .shiki code {
  all: revert;
  background: transparent !important;
  color: inherit !important;
  font-size: inherit !important;
  font-family: inherit !important;
  border-radius: 0 !important;
  padding: 0 !important;
  line-height: inherit !important;
}

/* Fallback plain text block */
.code-collapsible__block {
  all: revert;
  margin: 0;
  padding: 16px;
  border-radius: 6px;
  background: var(--color-surface-subtle);
  color: var(--color-foreground-primary);
  white-space: pre;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.6;
  font-family: "JetBrains Mono", "Fira Code", monospace;
}

.code-collapsible__block code {
  all: revert;
  background: transparent !important;
  color: inherit !important;
  font-size: inherit !important;
  font-family: inherit !important;
  border-radius: 0 !important;
  padding: 0 !important;
  line-height: inherit !important;
}

.code-collapsible__copy-btn {
  position: absolute;
  top: 24px;
  right: 24px;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid var(--color-surface-muted);
  border-radius: 6px;
  background: var(--color-surface-base);
  color: var(--color-foreground-secondary);
  cursor: pointer;
  padding: 0;
  font: inherit;
  transition:
    color 150ms,
    background 150ms,
    border-color 150ms;
}

.code-collapsible__copy-btn:hover {
  color: var(--color-foreground-primary);
  border-color: var(--color-foreground-secondary);
}

.code-collapsible__copy-btn--copied {
  color: var(--color-feedback-success-base, #22c55e);
  border-color: var(--color-feedback-success-base, #22c55e);
}
</style>
