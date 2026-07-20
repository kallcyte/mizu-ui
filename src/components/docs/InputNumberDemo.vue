<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const quantity = ref(1);
const customStep = ref(0);
const minMax = ref(5);
const stepped = ref(5);
const vertical = ref(5);
const placeholder = ref(null);
const colorValue = ref(5);
const variantValue = ref(5);
const sized = ref(5);
const decimal = ref(5);
const percent = ref(0.05);
const currency = ref(1500);
const noButtons = ref(5);
const iconValue = ref(5);
const slotValue = ref(5);

const colors = ["primary", "secondary", "success", "info", "warning", "error", "neutral"] as const;
const variants = ["outline", "soft", "subtle", "ghost"] as const;
const sizes = ["sm", "md", "lg"] as const;
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">A simple number input with increment and decrement buttons managed via <code>v-model</code>.</p>
      <CodeCollapsible :code="`<UInputNumber v-model=&quot;quantity&quot; />`">
        <div class="demo-col">
          <UInputNumber v-model="quantity" />
          <p class="mizu-demo-value">Value: {{ quantity }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Min / Max</h3>
      <p class="demo-description">Use the <code>min</code> and <code>max</code> props to constrain the valid range.</p>
      <CodeCollapsible :code="`<UInputNumber v-model=&quot;minMax&quot; :min=&quot;0&quot; :max=&quot;10&quot; />`">
        <div class="demo-col">
          <UInputNumber v-model="minMax" :min="0" :max="10" />
          <p class="mizu-demo-value">Value: {{ minMax }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Step</h3>
      <p class="demo-description">Use the <code>step</code> prop to control the increment and decrement amount.</p>
      <CodeCollapsible :code="`<UInputNumber v-model=&quot;stepped&quot; :step=&quot;2&quot; />`">
        <div class="demo-col">
          <UInputNumber v-model="stepped" :step="2" />
          <p class="mizu-demo-value">Value: {{ stepped }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Placeholder</h3>
      <p class="demo-description">Use the <code>placeholder</code> prop to show hint text when the input is empty.</p>
      <CodeCollapsible :code="`<UInputNumber v-model=&quot;placeholder&quot; placeholder=&quot;Enter a number&quot; />`">
        <div class="demo-col">
          <UInputNumber v-model="placeholder" placeholder="Enter a number" />
          <p class="mizu-demo-value">Value: {{ placeholder ?? "null" }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Orientation</h3>
      <p class="demo-description">Use the <code>orientation</code> prop to stack the increment and decrement buttons vertically.</p>
      <CodeCollapsible :code="`<UInputNumber v-model=&quot;vertical&quot; orientation=&quot;vertical&quot; />`">
        <div class="demo-col">
          <UInputNumber v-model="vertical" orientation="vertical" />
          <p class="mizu-demo-value">Value: {{ vertical }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Color</h3>
      <p class="demo-description">Use the <code>color</code> prop to change the focus ring color. Pair with <code>highlight</code> to show the ring persistently.</p>
      <CodeCollapsible :code="colors.map(c => `<UInputNumber v-model=&quot;colorValue&quot; color=&quot;${c}&quot; highlight />`).join('\n')">
        <div class="demo-col">
          <UInputNumber
            v-for="c in colors"
            :key="c"
            v-model="colorValue"
            :color="c"
            highlight
          />
          <p class="mizu-demo-value">Value: {{ colorValue }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Variant</h3>
      <p class="demo-description">Use the <code>variant</code> prop to change the visual style of the input.</p>
      <CodeCollapsible :code="variants.map(v => `<UInputNumber v-model=&quot;variantValue&quot; variant=&quot;${v}&quot; color=&quot;neutral&quot; />`).join('\n')">
        <div class="demo-col">
          <UInputNumber
            v-for="v in variants"
            :key="v"
            v-model="variantValue"
            :variant="v"
            color="neutral"
          />
          <p class="mizu-demo-value">Value: {{ variantValue }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Size</h3>
      <p class="demo-description">Use the <code>size</code> prop to change the height and padding of the input.</p>
      <CodeCollapsible :code="sizes.map(s => `<UInputNumber v-model=&quot;sized&quot; size=&quot;${s}&quot; />`).join('\n')">
        <div class="demo-col">
          <UInputNumber
            v-for="s in sizes"
            :key="s"
            v-model="sized"
            :size="s"
          />
          <p class="mizu-demo-value">Value: {{ sized }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Custom Increment / Decrement</h3>
      <p class="demo-description">Customize the appearance of the +/- buttons using the <code>increment</code> and <code>decrement</code> props.</p>
      <CodeCollapsible :code="`<UInputNumber
  v-model=&quot;customStep&quot;
  :step=&quot;10&quot;
  :increment=&quot;{ color: 'neutral', variant: 'solid', size: 'sm' }&quot;
  :decrement=&quot;{ color: 'neutral', variant: 'solid', size: 'sm' }&quot;
/>`">
        <div class="demo-col">
          <UInputNumber
            v-model="customStep"
            :step="10"
            :increment="{ color: 'neutral', variant: 'solid', size: 'sm' }"
            :decrement="{ color: 'neutral', variant: 'solid', size: 'sm' }"
          />
          <p class="mizu-demo-value">Value: {{ customStep }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Custom Icons</h3>
      <p class="demo-description">Use the <code>increment-icon</code> and <code>decrement-icon</code> props to swap the default stepper icons.</p>
      <CodeCollapsible :code="`<UInputNumber
  v-model=&quot;iconValue&quot;
  increment-icon=&quot;i-lucide-arrow-right&quot;
  decrement-icon=&quot;i-lucide-arrow-left&quot;
/>`">
        <div class="demo-col">
          <UInputNumber
            v-model="iconValue"
            increment-icon="i-lucide-arrow-right"
            decrement-icon="i-lucide-arrow-left"
          />
          <p class="mizu-demo-value">Value: {{ iconValue }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Without Buttons</h3>
      <p class="demo-description">Set <code>increment</code> and <code>decrement</code> to <code>false</code> to hide the stepper buttons.</p>
      <CodeCollapsible :code="`<UInputNumber v-model=&quot;noButtons&quot; :increment=&quot;false&quot; :decrement=&quot;false&quot; />`">
        <div class="demo-col">
          <UInputNumber v-model="noButtons" :increment="false" :decrement="false" />
          <p class="mizu-demo-value">Value: {{ noButtons }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Decimal Format</h3>
      <p class="demo-description">Use <code>format-options</code> to control decimal places and sign display.</p>
      <CodeCollapsible :code="`<UInputNumber
  v-model=&quot;decimal&quot;
  :format-options=&quot;{
    signDisplay: 'exceptZero',
    minimumFractionDigits: 1
  }&quot;
/>`">
        <div class="demo-col">
          <UInputNumber
            v-model="decimal"
            :format-options="{
              signDisplay: 'exceptZero',
              minimumFractionDigits: 1
            }"
          />
          <p class="mizu-demo-value">Value: {{ decimal }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Percentage Format</h3>
      <p class="demo-description">Use <code>format-options</code> with <code>style: 'percent'</code> to format the value as a percentage.</p>
      <CodeCollapsible :code="`<UInputNumber
  v-model=&quot;percent&quot;
  :step=&quot;0.01&quot;
  :format-options=&quot;{ style: 'percent' }&quot;
/>`">
        <div class="demo-col">
          <UInputNumber
            v-model="percent"
            :step="0.01"
            :format-options="{ style: 'percent' }"
          />
          <p class="mizu-demo-value">Value: {{ percent }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Currency Format</h3>
      <p class="demo-description">Use <code>format-options</code> with <code>style: 'currency'</code> to format the value as a currency amount.</p>
      <CodeCollapsible :code="`<UInputNumber
  v-model=&quot;currency&quot;
  :format-options=&quot;{
    style: 'currency',
    currency: 'EUR',
    currencyDisplay: 'code',
    currencySign: 'accounting'
  }&quot;
/>`">
        <div class="demo-col">
          <UInputNumber
            v-model="currency"
            :format-options="{
              style: 'currency',
              currency: 'EUR',
              currencyDisplay: 'code',
              currencySign: 'accounting'
            }"
          />
          <p class="mizu-demo-value">Value: {{ currency }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Slots</h3>
      <p class="demo-description">Use the <code>#increment</code> and <code>#decrement</code> slots to fully customize the stepper buttons.</p>
      <CodeCollapsible :code="`<UInputNumber v-model=&quot;slotValue&quot;>
  <template #decrement>
    <UButton size=&quot;sm&quot; icon=&quot;i-lucide-minus&quot; />
  </template>
  <template #increment>
    <UButton size=&quot;sm&quot; icon=&quot;i-lucide-plus&quot; />
  </template>
</UInputNumber>`">
        <div class="demo-col">
          <UInputNumber v-model="slotValue">
            <template #decrement>
              <UButton size="sm" icon="i-lucide-minus" />
            </template>
            <template #increment>
              <UButton size="sm" icon="i-lucide-plus" />
            </template>
          </UInputNumber>
          <p class="mizu-demo-value">Value: {{ slotValue }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With FormField</h3>
      <p class="demo-description">Integrates with UFormField for consistent label, helper text, and error display.</p>
      <CodeCollapsible :code="`<UFormField label=&quot;Quantity&quot; help=&quot;Enter a number between 1 and 99.&quot;>
  <UInputNumber v-model=&quot;quantity&quot; :min=&quot;1&quot; :max=&quot;99&quot; />
</UFormField>`">
        <div class="demo-col">
          <UFormField label="Quantity" help="Enter a number between 1 and 99.">
            <UInputNumber v-model="quantity" :min="1" :max="99" />
          </UFormField>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <p class="demo-description">Prevents user interaction with a muted appearance.</p>
      <CodeCollapsible :code="`<UInputNumber disabled :default-value=&quot;42&quot; />`">
        <div class="demo-col">
          <UInputNumber disabled :default-value="42" />
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
  width: 100%;
  gap: 8px;
  max-width: 280px;
}
.mizu-demo-value {
  font-size: 12px;
  color: var(--color-foreground-secondary, #4B5563);
  margin: 0;
}
</style>
