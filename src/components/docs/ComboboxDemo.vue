<script setup lang="ts">
import { ref, computed } from "vue";
import { ChevronDown, X, Check, LoaderCircle } from "@lucide/vue";
import {
  MizuComboboxRoot,
  MizuComboboxAnchor,
  MizuComboboxInput,
  MizuComboboxTrigger,
  MizuComboboxCancel,
  MizuComboboxPortal,
  MizuComboboxContent,
  MizuComboboxViewport,
  MizuComboboxItem,
  MizuComboboxItemIndicator,
  MizuComboboxEmpty,
  MizuComboboxGroup,
  MizuComboboxLabel,
  MizuComboboxSeparator,
  MizuTag,
} from "@mizu/vue";
import DemoTabs from "./DemoTabs.vue";

const firstNames = [
  "James", "Mary", "Robert", "Patricia", "Michael", "Jennifer", "David", "Linda",
  "William", "Elizabeth", "Richard", "Barbara", "Joseph", "Susan", "Thomas", "Jessica",
  "Christopher", "Sarah", "Charles", "Karen", "Daniel", "Lisa", "Matthew", "Nancy",
  "Anthony", "Betty", "Mark", "Margaret", "Donald", "Sandra", "Steven", "Ashley",
  "Paul", "Dorothy", "Andrew", "Kimberly", "Joshua", "Emily", "Kenneth", "Donna",
  "Kevin", "Michelle", "Brian", "Carol", "George", "Amanda", "Timothy", "Melissa",
  "Ronald", "Deborah",
];

const lastNames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
  "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson",
  "Thomas", "Taylor", "Moore", "Jackson", "Martin",
];

function generatePeople(count: number) {
  const result = [];
  for (let i = 0; i < count; i++) {
    const first = firstNames[i % firstNames.length];
    const last = lastNames[i % lastNames.length];
    result.push({ id: i + 1, name: `${first} ${last}` });
  }
  return result;
}

const allPeople = generatePeople(100);

const people = allPeople.slice(0, 9);

const basicSelected = ref<any>(undefined);
const basicSearch = ref("");
const basicShowChevron = ref(true);
const filteredBasic = computed(() =>
  people.filter((p) =>
    p.name.toLowerCase().includes(basicSearch.value.toLowerCase())
  )
);

const searchSelected = ref<any>(undefined);
const searchSearch = ref("");
const filteredSearch = computed(() =>
  people.filter((p) =>
    p.name.toLowerCase().includes(searchSearch.value.toLowerCase())
  )
);

const groupSelected = ref<any>(undefined);
const groupSearch = ref("");
const filteredGroupA = computed(() =>
  people.slice(0, 3).filter((p) =>
    p.name.toLowerCase().includes(groupSearch.value.toLowerCase())
  )
);
const filteredGroupB = computed(() =>
  people.slice(3, 5).filter((p) =>
    p.name.toLowerCase().includes(groupSearch.value.toLowerCase())
  )
);

const multipleSelected = ref<any[]>([]);
const multipleSearch = ref("");
const filteredMultiple = computed(() =>
  people.filter((p) =>
    p.name.toLowerCase().includes(multipleSearch.value.toLowerCase())
  )
);

function removePerson(person: any) {
  multipleSelected.value = multipleSelected.value.filter((p: any) => p.id !== person.id);
}

const lazySelected = ref<any>(undefined);
const lazySearch = ref("");
const LAZY_BATCH = 20;
const visibleCount = ref(LAZY_BATCH);
const loadingMore = ref(false);
let observer: IntersectionObserver | null = null;

const filteredLazy = computed(() =>
  allPeople.filter((p) =>
    p.name.toLowerCase().includes(lazySearch.value.toLowerCase())
  )
);

const visibleLazy = computed(() =>
  filteredLazy.value.slice(0, visibleCount.value)
);

const hasMoreLazy = computed(() => visibleCount.value < filteredLazy.value.length);

function loadMore() {
  if (loadingMore.value || !hasMoreLazy.value) return;
  loadingMore.value = true;
  setTimeout(() => {
    visibleCount.value += LAZY_BATCH;
    loadingMore.value = false;
  }, 300);
}

function setupSentinel(el: Element | null) {
  observer?.disconnect();
  if (!el) return;
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) loadMore();
    },
    { rootMargin: "200px" }
  );
  observer.observe(el);
}

const basicCode = `<MizuComboboxRoot v-model="selected" ignore-filter>
  <MizuComboboxAnchor>
    <MizuComboboxInput
      v-model="search"
      :display-value="(v) => v?.name ?? ''"
      placeholder="Select a person..."
    />
    <MizuComboboxTrigger>
      <ChevronDown :size="16" />
    </MizuComboboxTrigger>
    <MizuComboboxCancel v-if="selected" @click="selected = undefined">
      <X :size="16" />
    </MizuComboboxCancel>
  </MizuComboboxAnchor>
  <MizuComboboxPortal>
    <MizuComboboxContent position="popper" :side-offset="4">
      <MizuComboboxViewport>
        <MizuComboboxItem
          v-for="person in filteredPeople"
          :key="person.id"
          :value="person"
        >
          <MizuComboboxItemIndicator>
            <Check :size="16" />
          </MizuComboboxItemIndicator>
          {{ person.name }}
        </MizuComboboxItem>
      </MizuComboboxViewport>
    </MizuComboboxContent>
  </MizuComboboxPortal>
</MizuComboboxRoot>`;

const groupsCode = `<MizuComboboxRoot v-model="selected" ignore-filter>
  <MizuComboboxAnchor>
    <MizuComboboxInput v-model="search" placeholder="Select..." />
    <MizuComboboxTrigger><ChevronDown :size="16" /></MizuComboboxTrigger>
  </MizuComboboxAnchor>
  <MizuComboboxPortal>
    <MizuComboboxContent position="popper" :side-offset="4">
      <MizuComboboxViewport>
        <MizuComboboxGroup>
          <MizuComboboxLabel>Team A</MizuComboboxLabel>
          <MizuComboboxItem v-for="p in groupA" :key="p.id" :value="p">
            <MizuComboboxItemIndicator><Check :size="16" /></MizuComboboxItemIndicator>
            {{ p.name }}
          </MizuComboboxItem>
        </MizuComboboxGroup>
        <MizuComboboxSeparator />
        <MizuComboboxGroup>
          <MizuComboboxLabel>Team B</MizuComboboxLabel>
          <MizuComboboxItem v-for="p in groupB" :key="p.id" :value="p">
            {{ p.name }}
          </MizuComboboxItem>
        </MizuComboboxGroup>
      </MizuComboboxViewport>
    </MizuComboboxContent>
  </MizuComboboxPortal>
</MizuComboboxRoot>`;

const multipleCode = `<MizuComboboxRoot v-model="selected" multiple ignore-filter>
  <MizuComboboxAnchor class="multi">
    <MizuTag
      v-for="person in selected"
      :key="person.id"
      closable
      @close="removePerson(person)"
    >
      {{ person.name }}
    </MizuTag>
    <MizuComboboxInput v-model="search" placeholder="Select people..." />
    <MizuComboboxTrigger><ChevronDown :size="16" /></MizuComboboxTrigger>
  </MizuComboboxAnchor>
  <MizuComboboxPortal>
    <MizuComboboxContent position="popper" :side-offset="4">
      <MizuComboboxViewport>
        <MizuComboboxItem v-for="p in filtered" :key="p.id" :value="p">
          <MizuComboboxItemIndicator><Check :size="16" /></MizuComboboxItemIndicator>
          {{ p.name }}
        </MizuComboboxItem>
      </MizuComboboxViewport>
    </MizuComboboxContent>
  </MizuComboboxPortal>
</MizuComboboxRoot>`;

const lazyCode = `<MizuComboboxRoot v-model="selected" ignore-filter>
  <MizuComboboxAnchor>
    <MizuComboboxInput v-model="search" placeholder="Type to search..." />
    <MizuComboboxTrigger><ChevronDown :size="16" /></MizuComboboxTrigger>
  </MizuComboboxAnchor>
  <MizuComboboxPortal>
    <MizuComboboxContent position="popper" :side-offset="4">
      <MizuComboboxViewport>
        <MizuComboboxItem v-for="p in visibleItems" :key="p.id" :value="p">
          <MizuComboboxItemIndicator><Check :size="16" /></MizuComboboxItemIndicator>
          {{ p.name }}
        </MizuComboboxItem>
        <div v-if="hasMore" ref="setupSentinel">
          <LoaderCircle v-if="loading" class="spinner" />
          <span v-else>{{ remaining }} more...</span>
        </div>
      </MizuComboboxViewport>
    </MizuComboboxContent>
  </MizuComboboxPortal>
</MizuComboboxRoot>`;
</script>

<template>
  <div class="combobox-demo not-content">
    <DemoTabs :code="basicCode">
      <div class="demo-section">
        <h3>Basic</h3>
        <MizuComboboxRoot v-model="basicSelected" ignore-filter>
          <MizuComboboxAnchor class="combobox-anchor">
            <MizuComboboxInput
              v-model="basicSearch"
              :display-value="(v: any) => v?.name ?? ''"
              placeholder="Select a person..."
            />
            <MizuComboboxTrigger v-if="basicShowChevron" class="combobox-trigger-btn">
              <ChevronDown :size="16" />
            </MizuComboboxTrigger>
            <MizuComboboxCancel v-if="basicSelected" class="combobox-cancel-btn" @click="basicSelected = undefined">
              <X :size="16" />
            </MizuComboboxCancel>
          </MizuComboboxAnchor>
          <MizuComboboxPortal>
            <MizuComboboxContent position="popper" :side-offset="4">
              <MizuComboboxViewport>
                <MizuComboboxEmpty>No results found.</MizuComboboxEmpty>
                <MizuComboboxItem
                  v-for="person in filteredBasic"
                  :key="person.id"
                  :value="person"
                >
                  <MizuComboboxItemIndicator>
                    <Check :size="16" />
                  </MizuComboboxItemIndicator>
                  {{ person.name }}
                </MizuComboboxItem>
              </MizuComboboxViewport>
            </MizuComboboxContent>
          </MizuComboboxPortal>
        </MizuComboboxRoot>
        <div class="demo-footer">
          <p class="demo-hint">Selected: {{ basicSelected?.name ?? "None" }}</p>
          <label class="demo-toggle">
            <input type="checkbox" v-model="basicShowChevron" />
            <span>Show chevron</span>
          </label>
        </div>
      </div>
    </DemoTabs>

    <DemoTabs :code="basicCode">
      <div class="demo-section">
        <h3>With Search</h3>
        <MizuComboboxRoot v-model="searchSelected" ignore-filter>
          <MizuComboboxAnchor class="combobox-anchor">
            <MizuComboboxInput
              v-model="searchSearch"
              :display-value="(v: any) => v?.name ?? ''"
              placeholder="Search people..."
            />
            <MizuComboboxTrigger class="combobox-trigger-btn">
              <ChevronDown :size="16" />
            </MizuComboboxTrigger>
            <MizuComboboxCancel v-if="searchSelected" class="combobox-cancel-btn" @click="searchSelected = undefined">
              <X :size="16" />
            </MizuComboboxCancel>
          </MizuComboboxAnchor>
          <MizuComboboxPortal>
            <MizuComboboxContent position="popper" :side-offset="4">
              <MizuComboboxViewport>
                <MizuComboboxEmpty>No results found.</MizuComboboxEmpty>
                <MizuComboboxItem
                  v-for="person in filteredSearch"
                  :key="person.id"
                  :value="person"
                >
                  <MizuComboboxItemIndicator>
                    <Check :size="16" />
                  </MizuComboboxItemIndicator>
                  {{ person.name }}
                </MizuComboboxItem>
              </MizuComboboxViewport>
            </MizuComboboxContent>
          </MizuComboboxPortal>
        </MizuComboboxRoot>
        <div class="demo-footer">
          <p class="demo-hint">Selected: {{ searchSelected?.name ?? "None" }}</p>
        </div>
      </div>
    </DemoTabs>

    <DemoTabs :code="groupsCode">
      <div class="demo-section">
        <h3>With Groups</h3>
        <MizuComboboxRoot v-model="groupSelected" ignore-filter>
          <MizuComboboxAnchor class="combobox-anchor">
            <MizuComboboxInput
              v-model="groupSearch"
              :display-value="(v: any) => v?.name ?? ''"
              placeholder="Select a person..."
            />
            <MizuComboboxTrigger class="combobox-trigger-btn">
              <ChevronDown :size="16" />
            </MizuComboboxTrigger>
            <MizuComboboxCancel v-if="groupSelected" class="combobox-cancel-btn" @click="groupSelected = undefined">
              <X :size="16" />
            </MizuComboboxCancel>
          </MizuComboboxAnchor>
          <MizuComboboxPortal>
            <MizuComboboxContent position="popper" :side-offset="4">
              <MizuComboboxViewport>
                <MizuComboboxGroup>
                  <MizuComboboxLabel>Team A</MizuComboboxLabel>
                  <MizuComboboxItem
                    v-for="person in filteredGroupA"
                    :key="person.id"
                    :value="person"
                  >
                    <MizuComboboxItemIndicator>
                      <Check :size="16" />
                    </MizuComboboxItemIndicator>
                    {{ person.name }}
                  </MizuComboboxItem>
                </MizuComboboxGroup>
                <MizuComboboxSeparator />
                <MizuComboboxGroup>
                  <MizuComboboxLabel>Team B</MizuComboboxLabel>
                  <MizuComboboxItem
                    v-for="person in filteredGroupB"
                    :key="person.id"
                    :value="person"
                  >
                    <MizuComboboxItemIndicator>
                      <Check :size="16" />
                    </MizuComboboxItemIndicator>
                    {{ person.name }}
                  </MizuComboboxItem>
                </MizuComboboxGroup>
              </MizuComboboxViewport>
            </MizuComboboxContent>
          </MizuComboboxPortal>
        </MizuComboboxRoot>
        <div class="demo-footer">
          <p class="demo-hint">Selected: {{ groupSelected?.name ?? "None" }}</p>
        </div>
      </div>
    </DemoTabs>

    <DemoTabs :code="multipleCode">
      <div class="demo-section">
        <h3>Multiple Selection</h3>
        <MizuComboboxRoot v-model="multipleSelected" multiple ignore-filter>
          <MizuComboboxAnchor class="combobox-anchor multi">
            <template v-for="person in multipleSelected" :key="person.id">
              <MizuTag closable @close="removePerson(person)">
                {{ person.name }}
              </MizuTag>
            </template>
            <MizuComboboxInput
              v-model="multipleSearch"
              placeholder="Select people..."
              class="multi-input"
            />
            <MizuComboboxTrigger class="combobox-trigger-btn">
              <ChevronDown :size="16" />
            </MizuComboboxTrigger>
            <MizuComboboxCancel v-if="multipleSelected.length" class="combobox-cancel-btn" @click="multipleSelected = []">
              <X :size="16" />
            </MizuComboboxCancel>
          </MizuComboboxAnchor>
          <MizuComboboxPortal>
            <MizuComboboxContent position="popper" :side-offset="4">
              <MizuComboboxViewport>
                <MizuComboboxEmpty>No results found.</MizuComboboxEmpty>
                <MizuComboboxItem
                  v-for="person in filteredMultiple"
                  :key="person.id"
                  :value="person"
                >
                  <MizuComboboxItemIndicator>
                    <Check :size="16" />
                  </MizuComboboxItemIndicator>
                  {{ person.name }}
                </MizuComboboxItem>
              </MizuComboboxViewport>
            </MizuComboboxContent>
          </MizuComboboxPortal>
        </MizuComboboxRoot>
        <div class="demo-footer">
          <p class="demo-hint">Selected: {{ multipleSelected.length ? multipleSelected.map((p: any) => p.name).join(", ") : "None" }}</p>
        </div>
      </div>
    </DemoTabs>

    <DemoTabs :code="lazyCode">
      <div class="demo-section">
        <h3>Lazy Load (100 items)</h3>
        <MizuComboboxRoot v-model="lazySelected" ignore-filter>
          <MizuComboboxAnchor class="combobox-anchor">
            <MizuComboboxInput
              v-model="lazySearch"
              :display-value="(v: any) => v?.name ?? ''"
              placeholder="Type to search 100 people..."
            />
            <MizuComboboxTrigger class="combobox-trigger-btn">
              <ChevronDown :size="16" />
            </MizuComboboxTrigger>
            <MizuComboboxCancel v-if="lazySelected" class="combobox-cancel-btn" @click="lazySelected = undefined">
              <X :size="16" />
            </MizuComboboxCancel>
          </MizuComboboxAnchor>
          <MizuComboboxPortal>
            <MizuComboboxContent position="popper" :side-offset="4">
              <MizuComboboxViewport>
                <MizuComboboxEmpty>No results found.</MizuComboboxEmpty>
                <MizuComboboxItem
                  v-for="person in visibleLazy"
                  :key="person.id"
                  :value="person"
                >
                  <MizuComboboxItemIndicator>
                    <Check :size="16" />
                  </MizuComboboxItemIndicator>
                  {{ person.name }}
                </MizuComboboxItem>
                <div
                  v-if="hasMoreLazy"
                  :ref="setupSentinel"
                  class="lazy-sentinel"
                >
                  <LoaderCircle v-if="loadingMore" :size="14" class="lazy-spinner" />
                  <span v-else>{{ filteredLazy.length - visibleCount }} more...</span>
                </div>
              </MizuComboboxViewport>
            </MizuComboboxContent>
          </MizuComboboxPortal>
        </MizuComboboxRoot>
        <div class="demo-footer">
          <p class="demo-hint">Selected: {{ lazySelected?.name ?? "None" }}</p>
        </div>
      </div>
    </DemoTabs>
  </div>
</template>

<style scoped>
.combobox-demo {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
  background: transparent;

  border: 1px solid var(--color-surface-muted);
  border-radius: 8px;
}

.demo-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 0;
}

.demo-section > * {
  margin-top: 0;
}

.demo-section h3 {
  font-size: 14px;
  font-weight: 600;
  color: var(--sl-color-text);
  margin-bottom: 0;
  margin-top: 0;
}

.demo-toggle {
  all: revert;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--sl-color-text);
  cursor: pointer;
  user-select: none;
}

.demo-toggle input {
  all: revert;
  margin: 0;
  cursor: pointer;
  width: 14px;
  height: 14px;
  accent-color: var(--sl-color-accent);
}

.demo-toggle span {
  all: revert;
  font-size: 12px;
  color: var(--sl-color-text) !important;
}

.demo-hint {
  all: revert;
  font-size: 12px;
  color: var(--sl-color-text) !important;
  margin: 0;
}

.demo-footer {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.combobox-anchor {
  all: revert;
  display: flex;
  align-items: center;
  gap: 2px;
  border: 1px solid var(--color-surface-border);
  border-radius: 8px;
  background: var(--color-surface-base);
  overflow: hidden;
  width: 300px;
}

.combobox-anchor.multi {
  flex-wrap: wrap;
  overflow: visible;
  padding: 2px 0 2px 4px;
  gap: 4px;
  width: 400px;
}

.multi-input {
  flex: 1;
  min-width: 80px;
}

.combobox-trigger-btn {
  all: revert;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 6px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-foreground-muted);
  outline: none;
}

.combobox-trigger-btn:hover {
  color: var(--color-foreground-primary);
}

.combobox-cancel-btn {
  all: revert;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 6px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-foreground-muted);
  outline: none;
}

.combobox-cancel-btn:hover {
  color: var(--color-foreground-primary);
}

.lazy-sentinel {
  all: revert;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  font-size: 12px;
  color: var(--color-foreground-muted);
  cursor: default;
}

.lazy-spinner {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
