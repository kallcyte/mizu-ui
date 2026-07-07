<script setup lang="ts">
import { computed, useAttrs, type Component } from "vue";
import { TabsRoot } from "reka-ui";
import type { TabsColor } from "./MizuTabsList.vue";
import MizuTabsList from "./MizuTabsList.vue";
import MizuTabsTrigger from "./MizuTabsTrigger.vue";
import MizuTabsContent from "./MizuTabsContent.vue";

export interface TabItem {
  label: string;
  value: string;
  icon?: Component;
  disabled?: boolean;
  content?: string;
}

export interface TabsRootProps {
  modelValue?: string;
  defaultValue?: string;
  orientation?: "horizontal" | "vertical";
  activationMode?: "automatic" | "manual";
  asChild?: boolean;
  as?: string;
  /** Items array for declarative usage — when provided, renders tabs internally */
  tabs?: TabItem[];
  /** Leading icon for all tab triggers (overridden by item.icon) */
  icon?: Component;
  /** Variant for the tabs list (only used when `tabs` is provided) */
  variant?: "underline" | "button";
  /** Size for the tabs list (only used when `tabs` is provided) */
  size?: "sm" | "md" | "lg";
  /** Color for the tabs list (only used when `tabs` is provided) */
  color?: TabsColor;
  /** Loop keyboard navigation (only used when `tabs` is provided) */
  loop?: boolean;
}

const props = withDefaults(defineProps<TabsRootProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  orientation: "horizontal",
  activationMode: "automatic",
  asChild: undefined,
  as: undefined,
  tabs: undefined,
  icon: undefined,
  variant: "underline",
  size: "md",
  color: "primary",
  loop: true,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const attrs = useAttrs();

const rootClasses = computed(() => {
  const classes = ["mizu-tabs"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <TabsRoot
    :class="rootClasses"
    :model-value="modelValue"
    :default-value="defaultValue"
    :orientation="orientation"
    :activation-mode="activationMode"
    :as-child="asChild"
    :as="as"
    @update:model-value="(v: string) => emit('update:modelValue', v)"
  >
    <!-- Items array API -->
    <template v-if="tabs">
      <MizuTabsList :variant="variant" :size="size" :color="color" :loop="loop">
        <MizuTabsTrigger
          v-for="tab in tabs"
          :key="tab.value"
          :value="tab.value"
          :disabled="tab.disabled"
        >
          <component :is="tab.icon || icon" v-if="tab.icon || icon" />
          <span>{{ tab.label }}</span>
        </MizuTabsTrigger>
      </MizuTabsList>
      <MizuTabsContent
        v-for="tab in tabs"
        :key="tab.value"
        :value="tab.value"
      >
        <slot :name="`tab-${tab.value}`" :tab="tab">
          <slot name="content" :tab="tab">
            <span v-if="tab.content">{{ tab.content }}</span>
          </slot>
        </slot>
      </MizuTabsContent>
    </template>
    <!-- Composition API: render slot content as-is -->
    <slot v-else />
  </TabsRoot>
</template>
