<script setup lang="ts">
import { computed, ref, useAttrs, useId, useTemplateRef, watch, onMounted } from "vue";

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  shape?: "circle" | "square";
  color?: "muted" | "primary" | "accent" | "neutral";
}

const props = withDefaults(defineProps<AvatarProps>(), {
  src: undefined,
  alt: undefined,
  name: undefined,
  size: "md",
  shape: "circle",
  color: "muted",
});

const attrs = useAttrs();
const generatedId = useId();

const slots = defineSlots<{
  icon?: () => unknown;
}>();

const avatarRef = useTemplateRef<HTMLElement>("avatarRef");

const avatarId = computed(() => {
  if (attrs.id) return attrs.id as string;
  return generatedId;
});

const imageFailed = ref(false);

watch(
  () => props.src,
  () => {
    imageFailed.value = false;
  },
);

onMounted(() => {
  if (props.src && avatarRef.value) {
    const img = avatarRef.value.querySelector("img");
    if (img && img.complete && (img.naturalWidth === 0 || img.naturalHeight === 0)) {
      imageFailed.value = true;
    }
  }
});

const showImage = computed(() => !!props.src && !imageFailed.value);

function handleImageError() {
  imageFailed.value = true;
}

function handleImageLoad(event: Event) {
  const img = event.target as HTMLImageElement;
  if (img.naturalWidth === 0 || img.naturalHeight === 0) {
    imageFailed.value = true;
  }
}

const initials = computed(() => {
  if (!props.name) return "";
  const words = props.name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
});

const showInitials = computed(
  () => !showImage.value && initials.value.length > 0,
);

const hasIconSlot = computed(() => !!slots.icon);

const showIcon = computed(
  () => !showImage.value && !showInitials.value && hasIconSlot.value,
);

const showDefaultIcon = computed(
  () => !showImage.value && !showInitials.value && !hasIconSlot.value,
);

const avatarClasses = computed(() => {
  const classes = ["mizu-avatar", `mizu-avatar--${props.size}`, `mizu-avatar--${props.shape}`, `mizu-avatar--${props.color}`];

  if (attrs.class) classes.push(attrs.class as string);

  return classes.join(" ");
});

const imageAlt = computed(() => {
  if (props.alt) return props.alt;
  if (props.name) return `${props.name}'s avatar`;
  return "Avatar";
});
</script>

<template>
  <div
    ref="avatarRef"
    :id="avatarId"
    :class="avatarClasses"
    role="img"
    :aria-label="imageAlt"
  >
    <img
      v-if="showImage"
      :src="src"
      :alt="imageAlt"
      class="mizu-avatar__image"
      @error="handleImageError"
      @load="handleImageLoad"
    />
    <span v-else-if="showInitials" class="mizu-avatar__initials" aria-hidden="true">
      {{ initials }}
    </span>
    <span v-else-if="showIcon" class="mizu-avatar__icon" aria-hidden="true">
      <slot name="icon" />
    </span>
    <svg
      v-else-if="showDefaultIcon"
      class="mizu-avatar__icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5" />
      <path
        d="M4 21C4 16.5817 7.58172 13 12 13C16.4183 13 20 16.5817 20 21"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<style>
@reference "../index.css";

.mizu-avatar {
  @apply relative inline-flex items-center justify-center overflow-hidden shrink-0 align-middle;
  border: 1px solid transparent;
}

/* Sizes */
.mizu-avatar--sm {
  width: 24px;
  height: 24px;
  font-size: 10px;
}
.mizu-avatar--md {
  width: 32px;
  height: 32px;
  font-size: 12px;
}
.mizu-avatar--lg {
  width: 40px;
  height: 40px;
  font-size: 14px;
}
.mizu-avatar--xl {
  width: 56px;
  height: 56px;
  font-size: 18px;
}

/* Shapes */
.mizu-avatar--circle {
  border-radius: var(--radius-full, 9999px);
}
.mizu-avatar--square {
  border-radius: var(--radius-default, 8px);
}
.mizu-avatar--square.mizu-avatar--sm { border-radius: 4px; }
.mizu-avatar--square.mizu-avatar--md { border-radius: 6px; }
.mizu-avatar--square.mizu-avatar--lg { border-radius: 8px; }
.mizu-avatar--square.mizu-avatar--xl { border-radius: 10px; }

/* Color variants */
.mizu-avatar--muted {
  background-color: var(--color-surface-muted);
  color: var(--color-foreground-secondary);
  border-color: var(--color-surface-muted);
}
.mizu-avatar--primary {
  background-color: var(--color-brand-primary);
  color: #fff;
    border-color: var(--color-brand-primary);
  }
  .mizu-avatar--accent {
  background-color: var(--color-brand-ycp-subtle);
  color: var(--color-brand-ycp);
  border-color: var(--color-brand-ycp-subtle);
}
.mizu-avatar--neutral {
  background-color: var(--color-brand-neutral);
  color: #fff;
    border-color: var(--color-brand-neutral);
}

/* Image */
.mizu-avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Initials */
.mizu-avatar__initials {
  @apply font-semibold select-none leading-none;
  letter-spacing: var(--tracking-snug, -0.02em);
  text-transform: uppercase;
}

/* Icon */
.mizu-avatar__icon {
  @apply flex items-center justify-center;
}
.mizu-avatar__icon svg {
  width: 60%;
  height: 60%;
}
.mizu-avatar--sm .mizu-avatar__icon svg { width: 70%; height: 70%; }
.mizu-avatar--xl .mizu-avatar__icon svg { width: 50%; height: 50%; }
</style>
