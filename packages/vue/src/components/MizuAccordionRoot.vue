<script setup lang="ts">
import { computed, useAttrs, type Component } from "vue";
import { AccordionRoot } from "reka-ui";
import MizuAccordionItem from "./MizuAccordionItem.vue";
import MizuAccordionHeader from "./MizuAccordionHeader.vue";
import MizuAccordionTrigger from "./MizuAccordionTrigger.vue";
import MizuAccordionContent from "./MizuAccordionContent.vue";

export interface AccordionItem {
  label: string;
  /** Leading icon component (e.g. Lucide icon) */
  icon?: Component;
  /** Custom trailing icon to replace the default chevron */
  trailingIcon?: Component;
  content?: string;
  value?: string;
  disabled?: boolean;
}

export interface AccordionRootProps {
  modelValue?: string | string[];
  type?: "single" | "multiple";
  collapsible?: boolean;
  disabled?: boolean;
  dir?: "ltr" | "rtl";
  orientation?: "vertical" | "horizontal";
  unmountOnHide?: boolean;
  asChild?: boolean;
  as?: string;
  /** Items array for declarative usage — when provided, renders items internally */
  items?: AccordionItem[];
  /** Custom trailing icon for all items (overridden by item.trailingIcon) */
  trailingIcon?: Component;
}

const props = withDefaults(defineProps<AccordionRootProps>(), {
  modelValue: undefined,
  type: "single",
  collapsible: false,
  disabled: false,
  dir: undefined,
  orientation: "vertical",
  unmountOnHide: true,
  asChild: undefined,
  as: undefined,
  items: undefined,
  trailingIcon: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: string | string[] | undefined];
}>();

const attrs = useAttrs();

const rootClasses = computed(() => {
  const classes = ["mizu-accordion"];
  if (props.orientation === "horizontal") classes.push("mizu-accordion--horizontal");
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});

function getItemValue(item: AccordionItem, index: number): string {
  if (item.value !== undefined) return item.value;
  return String(index);
}
</script>

<template>
  <AccordionRoot
    :class="rootClasses"
    :model-value="modelValue"
    :type="type"
    :collapsible="collapsible"
    :disabled="disabled"
    :dir="dir"
    :orientation="orientation"
    :unmount-on-hide="unmountOnHide"
    :as-child="asChild"
    :as="as"
    @update:model-value="(v: string | string[] | undefined) => emit('update:modelValue', v)"
  >
    <!-- Items array API -->
    <template v-if="items">
      <MizuAccordionItem
        v-for="(item, index) in items"
        :key="getItemValue(item, index)"
        :value="getItemValue(item, index)"
        :disabled="item.disabled"
      >
        <MizuAccordionHeader>
          <MizuAccordionTrigger>
            <template v-if="item.trailingIcon || trailingIcon || $slots.trailing" #trailing-icon>
              <slot name="trailing" :item="item" :index="index">
                <component
                  :is="item.trailingIcon || trailingIcon"
                  class="mizu-accordion__trailing-icon"
                />
              </slot>
            </template>
            <slot name="leading" :item="item" :index="index">
              <component :is="item.icon" v-if="item.icon" class="mizu-accordion__leading-icon" />
            </slot>
            <span class="mizu-accordion__label">{{ item.label }}</span>
          </MizuAccordionTrigger>
        </MizuAccordionHeader>
        <MizuAccordionContent>
          <slot name="body" :item="item" :index="index">
            <slot name="content" :item="item" :index="index">
              <span v-if="item.content" class="mizu-accordion__body-text">{{ item.content }}</span>
            </slot>
          </slot>
        </MizuAccordionContent>
      </MizuAccordionItem>
    </template>
    <!-- Composition API: render slot content as-is -->
    <slot v-else />
  </AccordionRoot>
</template>

<style>
.mizu-accordion {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  font-family: inherit;
}

.mizu-accordion--horizontal {
  flex-direction: row;
  gap: 1px;
}

/* Items API styles */
.mizu-accordion__leading-icon {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  color: var(--color-foreground-secondary);
}

.mizu-accordion__trailing-icon {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  color: var(--color-foreground-secondary);
  transition: transform 200ms ease;
}

.mizu-accordion__trigger[data-state="open"] .mizu-accordion__trailing-icon {
  transform: rotate(180deg);
}

.mizu-accordion__label {
  flex: 1;
  min-width: 0;
}

.mizu-accordion__body-text {
  color: var(--color-foreground-secondary);
}
</style>
