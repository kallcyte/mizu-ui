<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { NavigationMenuLink } from "reka-ui";

export interface NavigationMenuLinkProps {
  active?: boolean;
  asChild?: boolean;
  as?: string;
}

const props = withDefaults(defineProps<NavigationMenuLinkProps>(), {
  active: undefined,
  asChild: undefined,
  as: undefined,
});

const attrs = useAttrs();

const linkClasses = computed(() => {
  const c = ["NavigationMenuLink"];
  if (attrs.class) c.push(attrs.class as string);
  return c.join(" ");
});
</script>

<template>
  <NavigationMenuLink
    :class="linkClasses"
    :active="active"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </NavigationMenuLink>
</template>

<style>
.NavigationMenuLink {
  all: revert;
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  font-family: inherit;
  font-size: 15px;
  font-weight: 500;
  line-height: 1;
  color: #5f6b7c;
  text-decoration: none;
  border-radius: 6px;
  outline: none;
}

.NavigationMenuLink:hover {
  background: #f8f8f8;
}

.NavigationMenuLink:focus-visible {
  box-shadow: 0 0 0 2px #6366f1;
}

.NavigationMenuLink[data-active] {
  color: #1a1a2e;
  background: #f0f0f5;
}
</style>