<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const page = ref(1);

const colors = ["primary", "secondary", "success", "info", "warning", "error", "neutral"] as const;
const selectedColor = ref<string>("neutral");
const selectedActiveColor = ref<string>("primary");

const variants = ["outline", "solid", "soft", "subtle", "ghost", "link"] as const;
const selectedVariant = ref<string>("outline");
const selectedActiveVariant = ref<string>("solid");

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
const selectedSize = ref<string>("md");

function to(pageNum: number) {
  return { query: { page: pageNum }, hash: "#pagination-demo" };
}
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <!-- Basic -->
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">Standard pagination controlled via <code>v-model:page</code> with <code>:total</code> defining the total number of items.</p>
      <CodeCollapsible :code="`<UPagination v-model:page=&quot;page&quot; :total=&quot;100&quot; />`">
        <div class="demo-col">
          <UPagination v-model:page="page" :total="100" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Items Per Page -->
    <section class="example-section">
      <h3>Items Per Page</h3>
      <p class="demo-description">Use the <code>items-per-page</code> prop to control how many items each page contains. Defaults to <code>10</code>.</p>
      <CodeCollapsible :code="`<UPagination v-model:page=&quot;page&quot; :total=&quot;100&quot; :items-per-page=&quot;20&quot; />`">
        <div class="demo-col">
          <UPagination v-model:page="page" :total="100" :items-per-page="20" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Sibling Count -->
    <section class="example-section">
      <h3>Sibling Count</h3>
      <p class="demo-description">Use <code>sibling-count</code> to set how many page buttons appear on each side of the active page. Defaults to <code>2</code>.</p>
      <CodeCollapsible :code="`<UPagination v-model:page=&quot;page&quot; :total=&quot;100&quot; :sibling-count=&quot;1&quot; />`">
        <div class="demo-col">
          <UPagination v-model:page="page" :total="100" :sibling-count="1" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Show Edges -->
    <section class="example-section">
      <h3>Show Edges</h3>
      <p class="demo-description">Set <code>show-edges</code> to always display the first page, last page, and ellipsis. Defaults to <code>false</code>.</p>
      <CodeCollapsible :code="`<UPagination v-model:page=&quot;page&quot; :total=&quot;100&quot; show-edges :sibling-count=&quot;1&quot; />`">
        <div class="demo-col">
          <UPagination v-model:page="page" :total="100" show-edges :sibling-count="1" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Show Controls -->
    <section class="example-section">
      <h3>Show Controls</h3>
      <p class="demo-description">Toggle <code>show-controls</code> to hide the first, prev, next, and last navigation buttons. Defaults to <code>true</code>.</p>
      <CodeCollapsible :code="`<UPagination v-model:page=&quot;page&quot; :total=&quot;100&quot; :show-controls=&quot;false&quot; show-edges />`">
        <div class="demo-col">
          <UPagination v-model:page="page" :total="100" :show-controls="false" show-edges />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Color -->
    <section class="example-section">
      <h3>Color</h3>
      <p class="demo-description">Sets the color of inactive page controls. Defaults to <code>neutral</code>.</p>
      <CodeCollapsible :code="`<UPagination v-model:page=&quot;page&quot; :total=&quot;100&quot; color=&quot;${selectedColor}&quot; />`">
        <div class="demo-col demo-gap-lg">
          <div class="chip-row">
            <button
              v-for="c in colors"
              :key="c"
              :class="['chip', selectedColor === c && 'chip--active']"
              @click="selectedColor = c"
            >{{ c }}</button>
          </div>
          <UPagination v-model:page="page" :total="100" :color="selectedColor" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Variant -->
    <section class="example-section">
      <h3>Variant</h3>
      <p class="demo-description">Sets the variant of inactive page controls. Defaults to <code>outline</code>.</p>
      <CodeCollapsible :code="`<UPagination v-model:page=&quot;page&quot; :total=&quot;100&quot; color=&quot;neutral&quot; variant=&quot;${selectedVariant}&quot; />`">
        <div class="demo-col demo-gap-lg">
          <div class="chip-row">
            <button
              v-for="v in variants"
              :key="v"
              :class="['chip', selectedVariant === v && 'chip--active']"
              @click="selectedVariant = v"
            >{{ v }}</button>
          </div>
          <UPagination v-model:page="page" :total="100" color="neutral" :variant="selectedVariant" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Active Color -->
    <section class="example-section">
      <h3>Active Color</h3>
      <p class="demo-description">Sets the color of the active page button. Defaults to <code>primary</code>.</p>
      <CodeCollapsible :code="`<UPagination v-model:page=&quot;page&quot; :total=&quot;100&quot; active-color=&quot;${selectedActiveColor}&quot; />`">
        <div class="demo-col demo-gap-lg">
          <div class="chip-row">
            <button
              v-for="c in colors"
              :key="c"
              :class="['chip', selectedActiveColor === c && 'chip--active']"
              @click="selectedActiveColor = c"
            >{{ c }}</button>
          </div>
          <UPagination v-model:page="page" :total="100" :active-color="selectedActiveColor" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Active Variant -->
    <section class="example-section">
      <h3>Active Variant</h3>
      <p class="demo-description">Sets the variant of the active page button. Defaults to <code>solid</code>.</p>
      <CodeCollapsible :code="`<UPagination v-model:page=&quot;page&quot; :total=&quot;100&quot; active-color=&quot;primary&quot; active-variant=&quot;${selectedActiveVariant}&quot; />`">
        <div class="demo-col demo-gap-lg">
          <div class="chip-row">
            <button
              v-for="v in variants"
              :key="v"
              :class="['chip', selectedActiveVariant === v && 'chip--active']"
              @click="selectedActiveVariant = v"
            >{{ v }}</button>
          </div>
          <UPagination v-model:page="page" :total="100" active-color="primary" :active-variant="selectedActiveVariant" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Size -->
    <section class="example-section">
      <h3>Size</h3>
      <p class="demo-description">Control the button size of pagination controls. Defaults to <code>md</code>.</p>
      <CodeCollapsible :code="`<UPagination v-model:page=&quot;page&quot; :total=&quot;100&quot; size=&quot;${selectedSize}&quot; />`">
        <div class="demo-col demo-gap-lg">
          <div class="chip-row">
            <button
              v-for="s in sizes"
              :key="s"
              :class="['chip', selectedSize === s && 'chip--active']"
              @click="selectedSize = s"
            >{{ s }}</button>
          </div>
          <UPagination v-model:page="page" :total="100" :size="selectedSize" />
        </div>
      </CodeCollapsible>
    </section>

    <!-- Disabled -->
    <section class="example-section">
      <h3>Disabled</h3>
      <p class="demo-description">Disable the entire pagination control with the <code>disabled</code> prop.</p>
      <CodeCollapsible :code="`<UPagination v-model:page=&quot;page&quot; :total=&quot;100&quot; disabled />`">
        <div class="demo-col">
          <UPagination v-model:page="page" :total="100" disabled />
        </div>
      </CodeCollapsible>
    </section>

    <!-- With links -->
    <section class="example-section">
      <h3>With links</h3>
      <p class="demo-description">Use the <code>:to</code> prop with a function that returns a route object to render page controls as links instead of buttons.</p>
      <CodeCollapsible :code="`<UPagination\n  v-model:page=&quot;page&quot;\n  :total=&quot;100&quot;\n  :to=&quot;(p) => ({ query: { page: p } })&quot;\n  :sibling-count=&quot;1&quot;\n  show-edges\n/>`">
        <div class="demo-col">
          <UPagination
            v-model:page="page"
            :total="100"
            :to="to"
            :sibling-count="1"
            show-edges
          />
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
.demo-description {
  font-size: 13px;
  color: var(--sl-color-text-light);
  margin: 0;
  line-height: 1.5;
}
.demo-description code {
  font-size: 12px;
  background: var(--color-surface-muted, #F3F4F6);
  padding: 2px 6px;
  border-radius: 4px;
}
.demo-col {
  all: revert;
  display: flex;
  flex-direction: column;
  width: max-content;
  gap: 8px;
}
.demo-gap-lg {
  gap: 16px;
}
.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.chip {
  all: unset;
  cursor: pointer;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  background: var(--color-surface-muted, #F3F4F6);
  color: var(--sl-color-text-light);
  border: 1px solid transparent;
  transition: all 0.15s;
}
.chip:hover {
  background: var(--color-surface-muted-hover, #E5E7EB);
}
.chip--active {
  background: var(--sl-color-text-accent);
  color: var(--sl-color-bg);
  border-color: var(--sl-color-text-accent);
}
</style>
