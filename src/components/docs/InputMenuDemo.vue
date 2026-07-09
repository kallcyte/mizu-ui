<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const selectedPerson = ref(null);
const selectedPeople = ref([]);

const people = [
  { id: 1, name: "Alice Johnson", role: "Engineering" },
  { id: 2, name: "Bob Smith", role: "Design" },
  { id: 3, name: "Carol White", role: "Product" },
  { id: 4, name: "Dave Brown", role: "Engineering" },
  { id: 5, name: "Eve Davis", role: "Marketing" },
];

const autocompleteCode = `<UInputMenu
  v-model="selected"
  :items="people"
  value-key="id"
  label-key="name"
  placeholder="Search a person..."
  search-term
  search-term-placeholder="Type to search..."
>
  <template #item="{ item }">
    <div class="flex items-center gap-3">
      <UAvatar :text="item.name" size="sm" />
      <div>
        <p class="text-sm font-medium">{{ item.name }}</p>
        <p class="text-xs text-dimmed">{{ item.role }}</p>
      </div>
    </div>
  </template>
</UInputMenu>`;

const multipleCode = `<UInputMenu
  v-model="selected"
  :items="people"
  value-key="id"
  label-key="name"
  multiple
  placeholder="Select team members..."
>
  <template #item-leading="{ item }">
    <UAvatar :text="item.name" size="sm" />
  </template>
  <template #item-description="{ item }">
    <span class="text-xs text-dimmed">{{ item.role }}</span>
  </template>
</UInputMenu>`;
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic autocomplete</h3>
      <CodeCollapsible :code="autocompleteCode">
        <div class="demo-col">
          <UInputMenu
            v-model="selectedPerson"
            :items="people"
            value-key="id"
            label-key="name"
            placeholder="Search a person..."
            search-term
            search-term-placeholder="Type to search..."
          >
            <template #item="{ item }">
              <div class="flex items-center gap-3">
                <UAvatar :text="item.name" size="sm" />
                <div>
                  <p class="text-sm font-medium">{{ item.name }}</p>
                  <p class="text-xs text-dimmed">{{ item.role }}</p>
                </div>
              </div>
            </template>
          </UInputMenu>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Multiple selection</h3>
      <CodeCollapsible :code="multipleCode">
        <div class="demo-col">
          <UInputMenu
            v-model="selectedPeople"
            :items="people"
            value-key="id"
            label-key="name"
            multiple
            placeholder="Select team members..."
          >
            <template #item-leading="{ item }">
              <UAvatar :text="item.name" size="sm" />
            </template>
            <template #item-description="{ item }">
              <span class="text-xs text-dimmed">{{ item.role }}</span>
            </template>
          </UInputMenu>
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
  max-width: 360px;
}
</style>
