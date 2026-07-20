<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const rating = ref(3);
const halfRating = ref(2.5);
const hoverRating = ref(0);
const clearableRating = ref(3);
const lengthRating = ref(7);
const iconRating = ref(4);
const emptyIconRating = ref(3);
const colorRating = ref(4);
const sizeRating = ref(4);
const verticalRating = ref(4);

const colors = ["primary", "secondary", "success", "info", "warning", "error", "neutral"] as const;
const sizes = ["sm", "md", "lg"] as const;
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">A 5-star rating input with <code>v-model</code> binding for numeric values.</p>
      <CodeCollapsible :code="`<UInputRating v-model=&quot;rating&quot; />`">
        <div class="demo-row">
          <UInputRating v-model="rating" />
          <span class="rating-value">{{ rating }} / 5</span>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Step</h3>
      <p class="demo-description">Allows half-star precision using <code>step=&quot;0.5&quot;</code> for more granular ratings.</p>
      <CodeCollapsible :code="`<UInputRating v-model=&quot;halfRating&quot; :step=&quot;0.5&quot; />`">
        <div class="demo-row">
          <UInputRating v-model="halfRating" :step="0.5" />
          <span class="rating-value">{{ halfRating }} / 5</span>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Length</h3>
      <p class="demo-description">Use the <code>length</code> prop to change the number of rating items.</p>
      <CodeCollapsible :code="`<UInputRating v-model=&quot;lengthRating&quot; :length=&quot;10&quot; />`">
        <div class="demo-row">
          <UInputRating v-model="lengthRating" :length="10" />
          <span class="rating-value">{{ lengthRating }} / 10</span>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Hoverable</h3>
      <p class="demo-description">Enables hover preview of the candidate value as the pointer moves over the items.</p>
      <CodeCollapsible :code="`<UInputRating v-model=&quot;hoverRating&quot; hoverable />`">
        <div class="demo-row">
          <UInputRating v-model="hoverRating" hoverable />
          <span class="rating-value">{{ hoverRating || "Click to rate" }}</span>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Clearable</h3>
      <p class="demo-description">Allows users to clear the rating by clicking the currently selected value again.</p>
      <CodeCollapsible :code="`<UInputRating v-model=&quot;clearableRating&quot; clearable />`">
        <div class="demo-row">
          <UInputRating v-model="clearableRating" clearable />
          <span class="rating-value">{{ clearableRating || "Cleared" }}</span>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Icon</h3>
      <p class="demo-description">Use the <code>icon</code> prop to customize the icon used for filled rating items.</p>
      <CodeCollapsible :code="`<UInputRating v-model=&quot;iconRating&quot; icon=&quot;i-lucide-heart&quot; />`">
        <div class="demo-row">
          <UInputRating v-model="iconRating" icon="i-lucide-heart" />
          <span class="rating-value">{{ iconRating }} / 5</span>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Empty Icon</h3>
      <p class="demo-description">Use the <code>empty-icon</code> prop to customize the icon for empty rating items.</p>
      <CodeCollapsible :code="`<UInputRating v-model=&quot;emptyIconRating&quot; icon=&quot;i-ph-star-fill&quot; empty-icon=&quot;i-ph-star&quot; />`">
        <div class="demo-row">
          <UInputRating v-model="emptyIconRating" icon="i-ph-star-fill" empty-icon="i-ph-star" />
          <span class="rating-value">{{ emptyIconRating }} / 5</span>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Color</h3>
      <p class="demo-description">Use the <code>color</code> prop to change the color of the filled stars.</p>
      <CodeCollapsible :code="colors.map(c => `<UInputRating v-model=&quot;colorRating&quot; color=&quot;${c}&quot; />`).join('\n')">
        <div class="demo-col">
          <UInputRating
            v-for="c in colors"
            :key="c"
            v-model="colorRating"
            :color="c"
          />
          <span class="rating-value">Value: {{ colorRating }}</span>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Size</h3>
      <p class="demo-description">Use the <code>size</code> prop to change the size of the rating icons.</p>
      <CodeCollapsible :code="sizes.map(s => `<UInputRating v-model=&quot;sizeRating&quot; size=&quot;${s}&quot; />`).join('\n')">
        <div class="demo-col">
          <UInputRating
            v-for="s in sizes"
            :key="s"
            v-model="sizeRating"
            :size="s"
          />
          <span class="rating-value">Value: {{ sizeRating }}</span>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Orientation</h3>
      <p class="demo-description">Use the <code>orientation</code> prop to stack the rating items vertically.</p>
      <CodeCollapsible :code="`<UInputRating v-model=&quot;verticalRating&quot; orientation=&quot;vertical&quot; />`">
        <div class="demo-row">
          <UInputRating v-model="verticalRating" orientation="vertical" />
          <span class="rating-value">{{ verticalRating }} / 5</span>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Readonly</h3>
      <p class="demo-description">Display a rating without allowing user interaction, while keeping the normal appearance.</p>
      <CodeCollapsible :code="`<UInputRating :default-value=&quot;4.5&quot; readonly />`">
        <div class="demo-row">
          <UInputRating :default-value="4.5" readonly />
          <span class="rating-value">4.5 / 5</span>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <p class="demo-description">Prevents user interaction with a muted appearance.</p>
      <CodeCollapsible :code="`<UInputRating disabled :default-value=&quot;3&quot; />`">
        <div class="demo-row">
          <UInputRating disabled :default-value="3" />
          <span class="rating-value">3 / 5</span>
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
.demo-row {
  all: revert;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.demo-col {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}
.rating-value {
  font-size: 13px;
  color: var(--color-foreground-secondary, #4B5563);
}
</style>
