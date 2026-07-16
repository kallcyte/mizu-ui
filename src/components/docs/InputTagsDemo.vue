<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const tags = ref(["Vue", "Nuxt", "TypeScript"]);
const dupTags = ref(["Vue", "React"]);
const dupError = ref("");
const dupShake = ref(false);

function onDupKeydown(e: KeyboardEvent) {
  if (e.key !== "Enter") return;
  const target = e.target as HTMLInputElement | null;
  const val = target?.value.trim();
  if (!val) return;
  if (dupTags.value.includes(val)) {
    e.preventDefault();
    e.stopPropagation();
    dupError.value = `"${val}" already exists`;
    dupShake.value = true;
    setTimeout(() => { dupShake.value = false; }, 500);
    setTimeout(() => { dupError.value = ""; }, 2000);
  } else {
    dupError.value = "";
  }
}
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Usage</h3>
      <CodeCollapsible code="<UInputTags class=&quot;w-full&quot; v-model=&quot;tags&quot; placeholder=&quot;Add a tag...&quot; />">
        <div class="demo-col">
          <UInputTags class="w-full" v-model="tags" placeholder="Add a tag and press Enter..." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Placeholder</h3>
      <CodeCollapsible code="<UInputTags class=&quot;w-full&quot; placeholder=&quot;Enter tags...&quot; />">
        <div class="demo-col">
          <UInputTags class="w-full" placeholder="Enter tags..." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Max Length</h3>
      <CodeCollapsible code="<UInputTags class=&quot;w-full&quot; :max-length=&quot;4&quot; placeholder=&quot;Max 4 chars...&quot; />">
        <div class="demo-col">
          <UInputTags class="w-full" :max-length="4" placeholder="Max 4 chars per tag..." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Color</h3>
      <CodeCollapsible code="<UInputTags class=&quot;w-full&quot; color=&quot;primary&quot; :model-value=&quot;['Vue']&quot; highlight />
<UInputTags class=&quot;w-full&quot; color=&quot;success&quot; :model-value=&quot;['Vue']&quot; highlight />
<UInputTags class=&quot;w-full&quot; color=&quot;error&quot; :model-value=&quot;['Vue']&quot; highlight />
<UInputTags class=&quot;w-full&quot; color=&quot;neutral&quot; :model-value=&quot;['Vue']&quot; highlight />">
        <div class="demo-col">
          <UInputTags class="w-full" color="primary" :model-value="['Vue']" highlight />
          <UInputTags class="w-full" color="success" :model-value="['Vue']" highlight />
          <UInputTags class="w-full" color="error" :model-value="['Vue']" highlight />
          <UInputTags class="w-full" color="neutral" :model-value="['Vue']" highlight />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Variant</h3>
      <CodeCollapsible code="<UInputTags class=&quot;w-full&quot; variant=&quot;outline&quot; :model-value=&quot;['Vue']&quot; color=&quot;neutral&quot; />
<UInputTags class=&quot;w-full&quot; variant=&quot;soft&quot; :model-value=&quot;['Vue']&quot; color=&quot;neutral&quot; />
<UInputTags class=&quot;w-full&quot; variant=&quot;subtle&quot; :model-value=&quot;['Vue']&quot; color=&quot;neutral&quot; />
<UInputTags class=&quot;w-full&quot; variant=&quot;ghost&quot; :model-value=&quot;['Vue']&quot; color=&quot;neutral&quot; />
<UInputTags class=&quot;w-full&quot; variant=&quot;none&quot; :model-value=&quot;['Vue']&quot; color=&quot;neutral&quot; />">
        <div class="demo-col">
          <UInputTags class="w-full" variant="outline" :model-value="['Vue']" color="neutral" />
          <UInputTags class="w-full" variant="soft" :model-value="['Vue']" color="neutral" />
          <UInputTags class="w-full" variant="subtle" :model-value="['Vue']" color="neutral" />
          <UInputTags class="w-full" variant="ghost" :model-value="['Vue']" color="neutral" />
          <UInputTags class="w-full" variant="none" :model-value="['Vue']" color="neutral" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Size</h3>
      <CodeCollapsible code="<UInputTags class=&quot;w-full&quot; size=&quot;sm&quot; :model-value=&quot;['Vue']&quot; placeholder=&quot;SM&quot; />
<UInputTags class=&quot;w-full&quot; size=&quot;md&quot; :model-value=&quot;['Vue']&quot; placeholder=&quot;MD&quot; />
<UInputTags class=&quot;w-full&quot; size=&quot;lg&quot; :model-value=&quot;['Vue']&quot; placeholder=&quot;LG&quot; />">
        <div class="demo-col">
          <UInputTags class="w-full" size="sm" :model-value="['Vue']" placeholder="SM" />
          <UInputTags class="w-full" size="md" :model-value="['Vue']" placeholder="MD" />
          <UInputTags class="w-full" size="lg" :model-value="['Vue']" placeholder="LG" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Icon</h3>
      <CodeCollapsible code="<UInputTags class=&quot;w-full&quot; icon=&quot;i-ph-tag&quot; placeholder=&quot;Add tags...&quot; />
<UInputTags class=&quot;w-full&quot; icon=&quot;i-ph-envelope&quot; placeholder=&quot;Emails...&quot; trailing />">
        <div class="demo-col">
          <UInputTags class="w-full" icon="i-ph-tag" placeholder="Add tags..." />
          <UInputTags class="w-full" icon="i-ph-envelope" placeholder="Emails..." trailing />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Avatar</h3>
      <CodeCollapsible code="<UInputTags class=&quot;w-full&quot; :avatar=&quot;{ src: 'https://github.com/nuxt.png', size: '2xs' }&quot; placeholder=&quot;Add tags...&quot; />">
        <div class="demo-col">
          <UInputTags class="w-full" :avatar="{ src: 'https://github.com/nuxt.png', size: '2xs' }" placeholder="Add tags..." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Delete Icon</h3>
      <CodeCollapsible code="<UInputTags class=&quot;w-full&quot; delete-icon=&quot;i-ph-x-circle&quot; :model-value=&quot;['Vue', 'Nuxt']&quot; placeholder=&quot;Add tags...&quot; />">
        <div class="demo-col">
          <UInputTags class="w-full" delete-icon="i-ph-x-circle" :model-value="['Vue', 'Nuxt']" placeholder="Add tags..." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Loading</h3>
      <CodeCollapsible code="<UInputTags class=&quot;w-full&quot; loading :model-value=&quot;['Vue', 'Nuxt']&quot; placeholder=&quot;Loading...&quot; />
<UInputTags class=&quot;w-full&quot; loading icon=&quot;i-ph-tag&quot; :model-value=&quot;['Vue']&quot; placeholder=&quot;Loading...&quot; />">
        <div class="demo-col">
          <UInputTags class="w-full" loading :model-value="['Vue', 'Nuxt']" placeholder="Loading..." />
          <UInputTags class="w-full" loading icon="i-ph-tag" :model-value="['Vue']" placeholder="Loading..." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <CodeCollapsible code="<UInputTags class=&quot;w-full&quot; disabled :model-value=&quot;['Vue', 'Nuxt']&quot; />">
        <div class="demo-col">
          <UInputTags class="w-full" disabled :model-value="['Vue', 'Nuxt']" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Duplicate prevention</h3>
      <CodeCollapsible code="<UInputTags class=&quot;w-full&quot; v-model=&quot;tags&quot; @update:model-value=&quot;onDupCheck&quot; placeholder=&quot;Try typing 'Vue' or 'React'...&quot; />">
        <div class="demo-col">
          <div :class="{ shake: dupShake }" class="dup-example">
            <UInputTags
              class="w-full"
              v-model="dupTags"
              placeholder="Try typing 'Vue' or 'React'..."
              @keydown="onDupKeydown"
            />
          </div>
          <p v-if="dupError" class="dup-error">{{ dupError }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Preset tags (default-value)</h3>
      <CodeCollapsible code="<UInputTags class=&quot;w-full&quot; :default-value=&quot;['Vue', 'React']&quot; placeholder=&quot;Add more...&quot; />">
        <div class="demo-col">
          <UInputTags class="w-full" :default-value="['Vue', 'React']" placeholder="Add more..." />
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
  color: var(--sl-color-text);
  margin: 0;
}
.demo-col {
  all: revert;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  max-width: 400px;
}
.dup-error {
  font-size: 12px;
  color: #DC2626;
  margin: 0;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-6px); }
  50% { transform: translateX(6px); }
  75% { transform: translateX(-4px); }
}
.shake {
  animation: shake 0.4s ease-in-out;
}
</style>
