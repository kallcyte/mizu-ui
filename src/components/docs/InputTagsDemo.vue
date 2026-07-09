<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const tags = ref(["Vue", "Nuxt", "TypeScript"]);
const frameworkTags = ref([{ value: "Vue" }, { value: "React" }]);

const basicCode = `<UInputTags
  v-model="tags"
  placeholder="Add a tag and press Enter..."
  add-on-tab
  add-on-blur
/>`;

const customCode = `<UInputTags
  v-model="tags"
  :items="[
    { value: 'Vue' },
    { value: 'React' },
    { value: 'Svelte' },
    { value: 'Angular' },
  ]"
  value-key="value"
  placeholder="Select frameworks..."
  autofocus
>
  <template #item-leading="{ item }">
    <UBadge :label="item.value" size="xs" />
  </template>
</UInputTags>`;
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic tags</h3>
      <CodeCollapsible :code="basicCode">
        <div class="demo-col">
          <UInputTags
            v-model="tags"
            placeholder="Add a tag and press Enter..."
            add-on-tab
            add-on-blur
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With suggestions</h3>
      <CodeCollapsible :code="customCode">
        <div class="demo-col">
          <UInputTags
            v-model="frameworkTags"
            :items="[
              { value: 'Vue' },
              { value: 'React' },
              { value: 'Svelte' },
              { value: 'Angular' },
            ]"
            value-key="value"
            placeholder="Select frameworks..."
            autofocus
          >
            <template #item-leading="{ item }">
              <UBadge :label="item.value" size="xs" />
            </template>
          </UInputTags>
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
  width: max-content;
  gap: 8px;
  max-width: 400px;
}
</style>
