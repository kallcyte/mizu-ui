<script setup lang="ts">
import { computed, useAttrs } from "vue";

export interface QuoteProps {
  cite?: string;
  accent?: boolean;
}

const props = withDefaults(defineProps<QuoteProps>(), {
  cite: undefined,
  accent: false,
});

const attrs = useAttrs();

const quoteClasses = computed(() => {
  const classes = ["bp-quote"];
  if (props.accent) classes.push("bp-quote--accent");
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <blockquote :class="quoteClasses">
    <div class="bp-quote__content">
      <slot />
    </div>
    <footer v-if="cite" class="bp-quote__cite">
      <cite>{{ cite }}</cite>
    </footer>
  </blockquote>
</template>

<style>
@reference "../index.css";

.bp-quote {
  @apply relative;
  margin: 0;
  padding: 12px 16px;
  border-left: 3px solid var(--color-surface-muted);
  background-color: transparent;
  font-style: normal;
}

.bp-quote--accent {
  border-left-color: var(--color-brand-accent);
  background-color: var(--color-brand-accent-subtle);
}

.bp-quote__content {
  @apply text-sm leading-relaxed;
  color: var(--color-foreground-primary);
}

.bp-quote__content > * {
  margin: 0;
}

.bp-quote__content > * + * {
  margin-top: 8px;
}

.bp-quote__cite {
  @apply text-xs mt-2;
  color: var(--color-foreground-tertiary);
  font-style: normal;
}

.bp-quote__cite cite {
  font-style: italic;
}
</style>
