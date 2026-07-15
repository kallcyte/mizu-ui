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

// -- Async loading example --
const asyncValue = ref("");
const asyncItems = ref<string[]>([]);
const asyncLoading = ref(false);
let asyncTimeout: ReturnType<typeof setTimeout>;

const fruitDb = ["Apple", "Banana", "Blueberry", "Grapes", "Orange", "Pineapple", "Peach", "Pear", "Plum", "Raspberry", "Strawberry", "Watermelon"];

function onAsyncSearch(q: string) {
  clearTimeout(asyncTimeout);
  if (!q) { asyncItems.value = []; asyncLoading.value = false; return; }
  asyncLoading.value = true;
  asyncTimeout = setTimeout(() => {
    asyncItems.value = fruitDb.filter(i => i.toLowerCase().includes(q.toLowerCase()));
    asyncLoading.value = false;
  }, 600);
}

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

const loadingCode = `<script setup lang="ts">
const query = ref("")
const items = ref<string[]>([])
const loading = ref(false)
let timeout: ReturnType<typeof setTimeout>

function onSearch(q: string) {
  clearTimeout(timeout)
  if (!q) { items.value = []; loading.value = false; return }
  loading.value = true
  timeout = setTimeout(() => {
    items.value = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Orange', 'Pineapple']
      .filter(i => i.toLowerCase().includes(q.toLowerCase()))
    loading.value = false
  }, 500)
}
<\/script>

<template>
  <UInputMenu
    v-model="value"
    :items="items"
    :loading="loading"
    placeholder="Search fruit..."
    @update:search-term="onSearch"
  />
</template>`;

</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic autocomplete</h3>
      <CodeCollapsible :code="autocompleteCode">
        <div class="demo-col">
          <UInputMenu class="w-full"
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
          <UInputMenu class="w-full"
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

    <section class="example-section">
      <h3>Loading (async)</h3>
      <CodeCollapsible :code="loadingCode">
        <div class="demo-col">
          <UInputMenu class="w-full"
            v-model="asyncValue"
            :items="asyncItems"
            :loading="asyncLoading"
            placeholder="Type to search fruit..."
            @update:search-term="onAsyncSearch"
          />
          <p v-if="asyncValue" class="mizu-value">Selected: {{ asyncValue }}</p>
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
  max-width: 360px;
}
.mizu-value {
  font-size: 12px;
  color: var(--color-foreground-secondary, #4B5563);
  margin: 0;
}
</style>
