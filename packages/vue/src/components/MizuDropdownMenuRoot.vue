<script setup lang="ts">
import { computed, useAttrs, type Component } from "vue";
import { DropdownMenuRoot } from "reka-ui";
import MizuDropdownMenuPortal from "./MizuDropdownMenuPortal.vue";
import MizuDropdownMenuContent from "./MizuDropdownMenuContent.vue";
import MizuDropdownMenuItem from "./MizuDropdownMenuItem.vue";
import MizuDropdownMenuLabel from "./MizuDropdownMenuLabel.vue";
import MizuDropdownMenuSeparator from "./MizuDropdownMenuSeparator.vue";
import MizuDropdownMenuShortcut from "./MizuDropdownMenuShortcut.vue";

export interface DropdownMenuItemType {
  type?: "item" | "label" | "separator";
  label?: string;
  icon?: Component;
  shortcut?: string;
  disabled?: boolean;
  onSelect?: () => void;
  variant?: "default" | "destructive";
}

export interface DropdownMenuRootProps {
  open?: boolean;
  defaultOpen?: boolean;
  modal?: boolean;
  /** Items array for declarative usage — when provided, renders items internally */
  items?: DropdownMenuItemType[];
}

const props = withDefaults(defineProps<DropdownMenuRootProps>(), {
  open: undefined,
  defaultOpen: false,
  modal: true,
  items: undefined,
});

const emit = defineEmits<{
  "update:open": [value: boolean];
}>();

const attrs = useAttrs();

const rootClasses = computed(() => {
  const classes = ["mizu-dropdown-menu"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});
</script>

<template>
  <DropdownMenuRoot
    :class="rootClasses"
    :open="open"
    :default-open="defaultOpen"
    :modal="modal"
    @update:open="(value) => emit('update:open', value)"
  >
    <!-- Items array API -->
    <template v-if="items">
      <MizuDropdownMenuPortal>
        <MizuDropdownMenuContent>
          <template v-for="(item, i) in items" :key="i">
            <MizuDropdownMenuLabel v-if="item.type === 'label'">
              {{ item.label }}
            </MizuDropdownMenuLabel>
            <MizuDropdownMenuSeparator v-else-if="item.type === 'separator'" />
            <MizuDropdownMenuItem
              v-else
              :disabled="item.disabled"
              :variant="item.variant || 'default'"
              @select="item.onSelect && item.onSelect()"
            >
              <template #default>
                <slot name="item-leading" :item="item" :index="i">
                  <component :is="item.icon" v-if="item.icon" />
                </slot>
                <span>{{ item.label }}</span>
                <slot name="item-trailing" :item="item" :index="i">
                  <MizuDropdownMenuShortcut v-if="item.shortcut">
                    {{ item.shortcut }}
                  </MizuDropdownMenuShortcut>
                </slot>
              </template>
            </MizuDropdownMenuItem>
          </template>
        </MizuDropdownMenuContent>
      </MizuDropdownMenuPortal>
    </template>
    <!-- Composition API: render slot content as-is -->
    <slot v-else />
  </DropdownMenuRoot>
</template>
