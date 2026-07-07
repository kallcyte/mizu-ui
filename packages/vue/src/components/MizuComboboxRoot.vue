<script setup lang="ts">
import type { AcceptableValue } from "reka-ui";
import { computed, useAttrs } from "vue";
import { ComboboxRoot } from "reka-ui";
import MizuComboboxAnchor from "./MizuComboboxAnchor.vue";
import MizuComboboxInput from "./MizuComboboxInput.vue";
import MizuComboboxTrigger from "./MizuComboboxTrigger.vue";
import MizuComboboxPortal from "./MizuComboboxPortal.vue";
import MizuComboboxContent from "./MizuComboboxContent.vue";
import MizuComboboxEmpty from "./MizuComboboxEmpty.vue";
import MizuComboboxViewport from "./MizuComboboxViewport.vue";
import MizuComboboxGroup from "./MizuComboboxGroup.vue";
import MizuComboboxLabel from "./MizuComboboxLabel.vue";
import MizuComboboxItem from "./MizuComboboxItem.vue";
import MizuComboboxItemIndicator from "./MizuComboboxItemIndicator.vue";

export interface ComboboxItem {
  value: AcceptableValue;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface ComboboxRootProps {
  modelValue?: AcceptableValue | AcceptableValue[];
  defaultValue?: AcceptableValue | AcceptableValue[];
  multiple?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  disabled?: boolean;
  name?: string;
  ignoreFilter?: boolean;
  by?: string;
  /** Items array for declarative usage — when provided, renders items internally */
  items?: ComboboxItem[];
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  error?: boolean;
  helperText?: string;
  emptyText?: string;
}

const props = withDefaults(defineProps<ComboboxRootProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  multiple: false,
  open: undefined,
  defaultOpen: false,
  disabled: false,
  name: undefined,
  ignoreFilter: false,
  by: undefined,
  items: undefined,
  placeholder: "Search...",
  size: "md",
  error: false,
  helperText: undefined,
  emptyText: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value: AcceptableValue | AcceptableValue[] | undefined];
  "update:open": [value: boolean];
}>();

const attrs = useAttrs();

const rootClasses = computed(() => {
  const classes = ["mizu-combobox"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});

// Group items by their `group` property
const groupedItems = computed(() => {
  if (!props.items) return { groups: [] as { name: string; items: ComboboxItem[] }[], ungrouped: [] as ComboboxItem[] };

  const groupMap = new Map<string, ComboboxItem[]>();
  const ungrouped: ComboboxItem[] = [];

  for (const item of props.items) {
    if (item.group) {
      const existing = groupMap.get(item.group) ?? [];
      existing.push(item);
      groupMap.set(item.group, existing);
    } else {
      ungrouped.push(item);
    }
  }

  const groups = Array.from(groupMap.entries()).map(([name, items]) => ({ name, items }));
  return { groups, ungrouped };
});
</script>

<template>
  <ComboboxRoot
    :class="rootClasses"
    :model-value="modelValue"
    :default-value="defaultValue"
    :multiple="multiple"
    :open="open"
    :default-open="defaultOpen"
    :disabled="disabled"
    :name="name"
    :ignore-filter="ignoreFilter"
    :by="by"
    @update:model-value="
      (v: AcceptableValue | AcceptableValue[] | undefined) => emit('update:modelValue', v)
    "
    @update:open="(v: boolean) => emit('update:open', v)"
  >
    <!-- Items array API -->
    <template v-if="items">
      <MizuComboboxAnchor :size="size" :error="error" :disabled="disabled" :helper-text="helperText">
        <MizuComboboxInput :placeholder="placeholder" :size="size" />
        <MizuComboboxTrigger>
          <svg class="mizu-combobox__chevron" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 8L10 13L15 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </MizuComboboxTrigger>
      </MizuComboboxAnchor>

      <MizuComboboxPortal>
        <MizuComboboxContent position="popper">
          <MizuComboboxEmpty>
            <slot name="empty">
              <span>{{ emptyText || "No results found" }}</span>
            </slot>
          </MizuComboboxEmpty>

          <MizuComboboxViewport>
            <!-- Grouped items -->
            <MizuComboboxGroup v-for="group in groupedItems.groups" :key="group.name">
              <MizuComboboxLabel>{{ group.name }}</MizuComboboxLabel>
              <MizuComboboxItem
                v-for="item in group.items"
                :key="String(item.value)"
                :value="item.value"
                :disabled="item.disabled"
              >
                <MizuComboboxItemIndicator>
                  <svg viewBox="0 0 20 20" fill="none" class="mizu-combobox__check">
                    <path d="M4 10L8 14L16 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </MizuComboboxItemIndicator>
                <slot name="item" :item="item">
                  <span>{{ item.label }}</span>
                </slot>
              </MizuComboboxItem>
            </MizuComboboxGroup>

            <!-- Ungrouped items -->
            <MizuComboboxItem
              v-for="item in groupedItems.ungrouped"
              :key="String(item.value)"
              :value="item.value"
              :disabled="item.disabled"
            >
              <MizuComboboxItemIndicator>
                <svg viewBox="0 0 20 20" fill="none" class="mizu-combobox__check">
                  <path d="M4 10L8 14L16 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </MizuComboboxItemIndicator>
              <slot name="item" :item="item">
                <span>{{ item.label }}</span>
              </slot>
            </MizuComboboxItem>
          </MizuComboboxViewport>
        </MizuComboboxContent>
      </MizuComboboxPortal>
    </template>
    <!-- Composition API: render slot content as-is -->
    <slot v-else />
  </ComboboxRoot>
</template>

<style>
.mizu-combobox__chevron {
  width: 16px;
  height: 16px;
}

.mizu-combobox__check {
  width: 16px;
  height: 16px;
}
</style>
