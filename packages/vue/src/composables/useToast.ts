import { inject, ref, type InjectionKey, type Ref } from "vue";

export interface ToastItem {
  id: string;
  title?: string;
  description?: string;
  variant?: "info" | "success" | "warning" | "error";
  duration?: number;
  showTimer?: boolean;
  action?: {
    label: string;
    altText: string;
    onClick: () => void;
  };
  open: Ref<boolean>;
}

export interface ToastContext {
  addToast: (options: Omit<ToastItem, "id" | "open">) => string;
  dismissToast: (id: string) => void;
}

export const TOAST_CONTEXT_KEY: InjectionKey<ToastContext> =
  Symbol("mizu-toast-context");

export function useToast(): ToastContext {
  const context = inject(TOAST_CONTEXT_KEY);
  if (!context) {
    throw new Error(
      "useToast() must be used within a <MizuToastProvider> component."
    );
  }
  return context;
}

export function createToastItem(
  options: Omit<ToastItem, "id" | "open">
): ToastItem {
  const id = `toast-${++nextId}`;
  return { ...options, id, open: ref(true) };
}

let nextId = 0;
