<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";

const squircleSvg =
  "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><path d=\"M50 0C25 0 0 25 0 50c0 25 25 50 50 50s50-25 50-50C100 25 75 0 50 0z\"/></svg>')";

const squircleUi = {
  root: {
    maskImage: squircleSvg,
    maskRepeat: "no-repeat",
    maskPosition: "center",
    maskSize: "100% 100%"
  }
};

const maskCode = `<UAvatar
  src="https://i.pravatar.cc/120"
  alt="User"
  :ui="{
    root: {
      maskImage: 'url(\\'data:image/svg+xml;utf8,<svg ...>\\')',
      maskRepeat: 'no-repeat',
      maskPosition: 'center',
      maskSize: '100% 100%'
    }
  }
/>`;
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Sizes</h3>
      <p class="demo-description">
        Nine sizes from <code>3xs</code> (16px) to <code>3xl</code> (48px), with <code>md</code> as the default (32px).
      </p>
      <CodeCollapsible
        :code="`<UAvatar size=&quot;3xs&quot; src=&quot;...&quot; alt=&quot;User&quot; />
<UAvatar size=&quot;2xs&quot; src=&quot;...&quot; alt=&quot;User&quot; />
<UAvatar size=&quot;xs&quot; src=&quot;...&quot; alt=&quot;User&quot; />
<UAvatar size=&quot;sm&quot; src=&quot;...&quot; alt=&quot;User&quot; />
<UAvatar size=&quot;md&quot; src=&quot;...&quot; alt=&quot;User&quot; />
<UAvatar size=&quot;lg&quot; src=&quot;...&quot; alt=&quot;User&quot; />
<UAvatar size=&quot;xl&quot; src=&quot;...&quot; alt=&quot;User&quot; />
<UAvatar size=&quot;2xl&quot; src=&quot;...&quot; alt=&quot;User&quot; />
<UAvatar size=&quot;3xl&quot; src=&quot;...&quot; alt=&quot;User&quot; />`"
      >
        <div class="demo-row demo-row-align-end">
          <UAvatar size="3xs" src="https://i.pravatar.cc/120?img=11" alt="User" />
          <UAvatar size="2xs" src="https://i.pravatar.cc/120?img=12" alt="User" />
          <UAvatar size="xs" src="https://i.pravatar.cc/120?img=13" alt="User" />
          <UAvatar size="sm" src="https://i.pravatar.cc/120?img=14" alt="User" />
          <UAvatar size="md" src="https://i.pravatar.cc/120?img=15" alt="User" />
          <UAvatar size="lg" src="https://i.pravatar.cc/120?img=16" alt="User" />
          <UAvatar size="xl" src="https://i.pravatar.cc/120?img=17" alt="User" />
          <UAvatar size="2xl" src="https://i.pravatar.cc/120?img=18" alt="User" />
          <UAvatar size="3xl" src="https://i.pravatar.cc/120?img=19" alt="User" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Image</h3>
      <p class="demo-description">
        Pass <code>src</code> to render an image. Falls back to initials if the image fails to load.
      </p>
      <CodeCollapsible
        :code="`<UAvatar src=&quot;https://i.pravatar.cc/120?img=1&quot; alt=&quot;John Doe&quot; />
<UAvatar src=&quot;https://i.pravatar.cc/120?img=2&quot; alt=&quot;Jane Smith&quot; />
<UAvatar src=&quot;https://i.pravatar.cc/120?img=3&quot; alt=&quot;Mike Johnson&quot; />`"
      >
        <div class="demo-row">
          <UAvatar src="https://i.pravatar.cc/120?img=1" alt="John Doe" />
          <UAvatar src="https://i.pravatar.cc/120?img=2" alt="Jane Smith" />
          <UAvatar src="https://i.pravatar.cc/120?img=3" alt="Mike Johnson" />
          <UAvatar src="https://i.pravatar.cc/120?img=4" alt="Sarah Lee" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Fallback</h3>
      <p class="demo-description">
        When no <code>src</code> is provided, avatars show text initials. Pass <code>text</code> to override, or omit it and Nuxt UI auto-generates initials from <code>alt</code>.
      </p>
      <CodeCollapsible
        :code="`<UAvatar alt=&quot;John Doe&quot; />
<UAvatar text=&quot;JS&quot; alt=&quot;Jane Smith&quot; />
<UAvatar text=&quot;AB&quot; alt=&quot;Alex Brown&quot; />`"
      >
        <div class="demo-row">
          <UAvatar alt="John Doe" />
          <UAvatar text="JS" alt="Jane Smith" />
          <UAvatar text="AB" alt="Alex Brown" />
          <UAvatar text="XY" alt="User" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Icon</h3>
      <p class="demo-description">
        Use <code>icon</code> with an Iconify class to render an icon as the fallback (e.g. <code>i-lucide-user</code>).
      </p>
      <CodeCollapsible :code="`<UAvatar icon=&quot;i-lucide-user&quot; alt=&quot;User&quot; />
<UAvatar icon=&quot;i-lucide-user-cog&quot; alt=&quot;Settings&quot; />
<UAvatar icon=&quot;i-lucide-user-plus&quot; alt=&quot;Add user&quot; />`">
        <div class="demo-row">
          <UAvatar icon="i-lucide-user" alt="User" />
          <UAvatar icon="i-lucide-user-cog" alt="Settings" />
          <UAvatar icon="i-lucide-user-plus" alt="Add user" />
          <UAvatar icon="i-lucide-users" alt="Group" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Color</h3>
      <p class="demo-description">
        Use <code>color</code> to tint the fallback background and text. Falls back to <code>neutral</code> by default.
      </p>
      <CodeCollapsible
        :code="`<UAvatar text=&quot;PR&quot; color=&quot;primary&quot; alt=&quot;Primary&quot; />
<UAvatar text=&quot;SE&quot; color=&quot;secondary&quot; alt=&quot;Secondary&quot; />
<UAvatar text=&quot;SU&quot; color=&quot;success&quot; alt=&quot;Success&quot; />
<UAvatar text=&quot;IN&quot; color=&quot;info&quot; alt=&quot;Info&quot; />
<UAvatar text=&quot;WA&quot; color=&quot;warning&quot; alt=&quot;Warning&quot; />
<UAvatar text=&quot;ER&quot; color=&quot;error&quot; alt=&quot;Error&quot; />`"
      >
        <div class="demo-row">
          <UAvatar text="PR" color="primary" alt="Primary" />
          <UAvatar text="SE" color="secondary" alt="Secondary" />
          <UAvatar text="SU" color="success" alt="Success" />
          <UAvatar text="IN" color="info" alt="Info" />
          <UAvatar text="WA" color="warning" alt="Warning" />
          <UAvatar text="ER" color="error" alt="Error" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Chip</h3>
      <p class="demo-description">
        Set <code>chip</code> to render a small status indicator. Pass a boolean for the default chip, or a <code>ChipProps</code> object to customize position and color.
      </p>
      <CodeCollapsible
        :code="`<UAvatar src=&quot;...&quot; alt=&quot;User&quot; chip />
<UAvatar src=&quot;...&quot; alt=&quot;User&quot; chip-color=&quot;success&quot; chip-position=&quot;top-right&quot; />`"
      >
        <div class="demo-row">
          <UAvatar src="https://i.pravatar.cc/120?img=5" alt="User" chip />
          <UAvatar src="https://i.pravatar.cc/120?img=6" alt="User" chip-color="success" />
          <UAvatar src="https://i.pravatar.cc/120?img=7" alt="User" :chip="{ color: 'warning', position: 'bottom-right' }" />
          <UAvatar src="https://i.pravatar.cc/120?img=8" alt="User" :chip="{ color: 'error', position: 'top-right' }" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Mask</h3>
      <p class="demo-description">
        Override the shape with the <code>ui</code> prop and a custom <code>mask-image</code>. The example uses a squircle SVG mask.
      </p>
      <CodeCollapsible :code="maskCode">
        <div class="demo-row">
          <UAvatar src="https://i.pravatar.cc/120?img=9" alt="User" :ui="squircleUi" />
          <UAvatar src="https://i.pravatar.cc/120?img=10" alt="User" :ui="squircleUi" />
        </div>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.demo-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}
.example-section {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.example-section h3 {
  all: revert;
  font-size: 14px;
  font-weight: 600;
  color: inherit;
  margin: 0;
}
.demo-description {
  font-size: 13px;
  color: var(--sl-color-text-light);
  margin: 0;
  line-height: 1.5;
}
.demo-description code {
  font-size: 12px;
  background: var(--color-surface-muted, #f3f4f6);
  padding: 2px 6px;
  border-radius: 4px;
}
.demo-row {
  all: revert;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.demo-row-align-end {
  align-items: flex-end;
}
</style>