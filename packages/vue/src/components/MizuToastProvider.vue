<script setup lang="ts">
import { provide, ref, reactive, computed, useAttrs, onMounted, type Ref } from "vue";
import { ToastProvider } from "reka-ui";
import { TOAST_CONTEXT_KEY } from "../composables/useToast";
import MizuToastViewport from "./MizuToastViewport.vue";
import MizuToastRoot from "./MizuToastRoot.vue";
import MizuToastTitle from "./MizuToastTitle.vue";
import MizuToastDescription from "./MizuToastDescription.vue";
import MizuToastAction from "./MizuToastAction.vue";
import MizuButton from "./MizuButton.vue";
import { CheckCircle, AlertTriangle, XCircle, Info } from "@lucide/vue";

const mounted = ref(false);

onMounted(() => {
  mounted.value = true;
});


export interface ToastProviderProps {
  label?: string;
  duration?: number;
  swipeDirection?: "up" | "down" | "left" | "right";
  swipeThreshold?: number;
  position?: "top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center";
}

const props = withDefaults(defineProps<ToastProviderProps>(), {
  label: "Notification",
  duration: 3000,
  swipeDirection: "right",
  swipeThreshold: 50,
  position: "top-right",
});

const attrs = useAttrs();

const providerClasses = computed(() => {
  const classes = ["bp-toast-provider"];
  if (attrs.class) classes.push(attrs.class as string);
  return classes.join(" ");
});

let nextId = 0;

interface InternalToast {
  id: string;
  title?: string;
  description?: string;
  variant?: "info" | "success" | "warning" | "error";
  duration?: number;
  showTimer?: boolean;
  timerElapsed?: number;
  action?: {
    label: string;
    altText: string;
    onClick: () => void;
  };
  open: boolean;
}

const toasts = ref<InternalToast[]>([]);
const toastTimers = new Map<string, { timerId: number; remaining: number; startedAt: number }>();
const timerIntervals = new Map<string, number>();

function updateTimerElapsed(toast: InternalToast) {
  const entry = toastTimers.get(toast.id);
  if (!entry) return;
  const elapsed = Date.now() - entry.startedAt;
  const totalDuration = toast.duration ?? props.duration;
  const totalElapsed = totalDuration - entry.remaining + elapsed;
  toast.timerElapsed = Math.min(totalElapsed, totalDuration);
}

function scheduleDismiss(toast: InternalToast, delay: number) {
  const timerId = window.setTimeout(() => {
    toast.open = false;
    toastTimers.delete(toast.id);
    stopTimerInterval(toast.id);
    window.setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== toast.id);
    }, 200);
  }, delay);
  toastTimers.set(toast.id, { timerId, remaining: delay, startedAt: Date.now() });

  if (toast.showTimer) {
    startTimerInterval(toast);
  }
}

function startTimerInterval(toast: InternalToast) {
  stopTimerInterval(toast.id);
  const intervalId = window.setInterval(() => {
    updateTimerElapsed(toast);
  }, 50);
  timerIntervals.set(toast.id, intervalId);
}

function stopTimerInterval(id: string) {
  const intervalId = timerIntervals.get(id);
  if (intervalId !== undefined) {
    window.clearInterval(intervalId);
    timerIntervals.delete(id);
  }
}

function startTimer(toast: InternalToast) {
  const dur = toast.duration ?? props.duration;
  toast.timerElapsed = 0;
  scheduleDismiss(toast, dur);
}

function pauseTimer(id: string) {
  const entry = toastTimers.get(id);
  if (!entry) return;
  window.clearTimeout(entry.timerId);
  const elapsed = Date.now() - entry.startedAt;
  const remaining = Math.max(0, entry.remaining - elapsed);
  toastTimers.set(id, { ...entry, remaining, startedAt: Date.now() });
  stopTimerInterval(id);
}

function resumeTimer(toast: InternalToast) {
  const entry = toastTimers.get(toast.id);
  if (!entry || entry.remaining <= 0) return;
  scheduleDismiss(toast, entry.remaining);
}

function clearTimer(id: string) {
  const entry = toastTimers.get(id);
  if (!entry) return;
  window.clearTimeout(entry.timerId);
  toastTimers.delete(id);
  stopTimerInterval(id);
}

function addToast(
  options: Omit<InternalToast, "id" | "open">
): string {
  const id = `toast-${++nextId}`;
  const toast = reactive<InternalToast>({ ...options, id, open: true });
  toasts.value.push(toast);
  startTimer(toast);
  return id;
}

function dismissToast(id: string) {
  clearTimer(id);
  const toast = toasts.value.find((t) => t.id === id);
  if (toast) {
    toast.open = false;
    window.setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id);
    }, 200);
  }
}

function onToastUpdate(toast: InternalToast, v: boolean) {
  toast.open = v;
  if (!v) {
    clearTimer(toast.id);
    window.setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== toast.id);
    }, 200);
  }
}

function handleActionClick(toast: InternalToast) {
  if (toast.action?.onClick) toast.action.onClick();
  dismissToast(toast.id);
}

provide(TOAST_CONTEXT_KEY, { addToast, dismissToast });
</script>

<template>
  <ToastProvider
    :class="providerClasses"
    :label="label"
    :duration="0"
    :swipe-direction="swipeDirection"
    :swipe-threshold="swipeThreshold"
  >
    <slot />
    <Teleport to="body" v-if="mounted">
      <MizuToastViewport :position="position">
        <template v-for="toast in toasts" :key="toast.id">
          <slot name="toast" :toast="toast">
            <MizuToastRoot
                :open="toast.open"
                :variant="toast.variant"
                :position="position"
                @update:open="(v: boolean) => onToastUpdate(toast, v)"
              @mouseenter="pauseTimer(toast.id)"
              @mouseleave="resumeTimer(toast)"
            >
              <div class="bp-toast__inner">
                <component
                  :is="toast.variant === 'success' ? CheckCircle : toast.variant === 'warning' ? AlertTriangle : toast.variant === 'error' ? XCircle : Info"
                  :size="18"
                  :class="['bp-toast__icon', `bp-toast__icon--${toast.variant}`]"
                />
                <div class="bp-toast__content">
                  <MizuToastTitle v-if="toast.title">{{ toast.title }}</MizuToastTitle>
                  <MizuToastDescription v-if="toast.description">
                    {{ toast.description }}
                  </MizuToastDescription>
                </div>
                <MizuToastAction
                  v-if="toast.action"
                  :alt-text="toast.action.altText"
                  as-child
                  @click="handleActionClick(toast)"
                >
                  <MizuButton variant="outline" size="md" class="w-max">{{ toast.action.label }}</MizuButton>
                </MizuToastAction>
                <span v-if="toast.showTimer" class="bp-toast__timer">
                  {{ (((toast.duration ?? 3000) - (toast.timerElapsed ?? 0)) / 1000).toFixed(2) }}s
                </span>
              </div>
            </MizuToastRoot>
          </slot>
        </template>
      </MizuToastViewport>
    </Teleport>
  </ToastProvider>
</template>

<style>
.bp-toast__inner {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
}

.bp-toast__icon {
  flex-shrink: 0;
  margin-top: 2px;
}

.bp-toast__icon--success {
  color: var(--color-feedback-success-base);
}

.bp-toast__icon--warning {
  color: var(--color-feedback-warning-base);
}

.bp-toast__icon--error {
  color: var(--color-feedback-error-base);
}

.bp-toast__icon--info {
  color: var(--color-feedback-info-base);
}

.bp-toast__content {
  flex: 1;
  min-width: 0;
}

.bp-toast__timer {
  flex-shrink: 0;
  font-size: 12px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: var(--color-foreground-muted);
  margin-top: 2px;
}
</style>
