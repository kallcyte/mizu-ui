import type { InjectionKey } from "vue";

export interface SkeletonThemeProps {
  width?: string | number;
  height?: string | number;
  radius?: string | number;
  baseColor?: string;
  highlightColor?: string;
  animationDuration?: number;
  animationDirection?: "normal" | "reverse";
  enableAnimation?: boolean;
  customHighlightBackground?: string;
}

export const SKELETON_THEME_KEY: InjectionKey<SkeletonThemeProps> = Symbol("mizu-skeleton-theme");

export interface SkeletonProps extends SkeletonThemeProps {
  variant?: "text" | "circle" | "rect";
  animation?: "shimmer" | "pulse" | "none";
  lines?: number;
  loading?: boolean;
}
