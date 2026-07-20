<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const pin = ref<string[]>([]);
const numericPin = ref<string[]>([]);
const maskedPin = ref<string[]>([]);
const otpPin = ref<string[]>([]);
const lengthPin = ref<string[]>([]);
const separatorPin = ref<string[]>([]);
const arraySeparatorPin = ref<string[]>([]);
const colorPin = ref<string[]>([]);
const variantPin = ref<string[]>([]);
const sizePin = ref<string[]>([]);
const slotPin = ref<string[]>([]);

const colors = ["primary", "secondary", "success", "info", "warning", "error", "neutral"] as const;
const variants = ["outline", "soft", "subtle", "ghost"] as const;
const sizes = ["sm", "md", "lg"] as const;
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">A 5-character pin input with <code>v-model</code> binding and a custom placeholder character for each digit.</p>
      <CodeCollapsible :code="`<UPinInput v-model=&quot;pin&quot; :length=&quot;5&quot; placeholder=&quot;·&quot; />`">
        <div class="demo-row">
          <UPinInput v-model="pin" :length="5" placeholder="·" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Type</h3>
      <p class="demo-description">Use the <code>type=&quot;number&quot;</code> prop to restrict input to numeric characters only.</p>
      <CodeCollapsible :code="`<UPinInput v-model=&quot;numericPin&quot; type=&quot;number&quot; placeholder=&quot;·&quot; />`">
        <div class="demo-row">
          <UPinInput v-model="numericPin" type="number" placeholder="·" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Length</h3>
      <p class="demo-description">Use the <code>length</code> prop to change the number of input fields.</p>
      <CodeCollapsible :code="`<UPinInput v-model=&quot;lengthPin&quot; :length=&quot;6&quot; placeholder=&quot;·&quot; />`">
        <div class="demo-row">
          <UPinInput v-model="lengthPin" :length="6" placeholder="·" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Mask</h3>
      <p class="demo-description">Use the <code>mask</code> prop to hide the input values like a password field.</p>
      <CodeCollapsible :code="`<UPinInput v-model=&quot;maskedPin&quot; :length=&quot;6&quot; mask placeholder=&quot;·&quot; />`">
        <div class="demo-row">
          <UPinInput v-model="maskedPin" :length="6" mask placeholder="·" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>OTP</h3>
      <p class="demo-description">Use the <code>otp</code> prop to enable native OTP autofill on mobile devices.</p>
      <CodeCollapsible :code="`<UPinInput v-model=&quot;otpPin&quot; :length=&quot;6&quot; otp placeholder=&quot;·&quot; />`">
        <div class="demo-row">
          <UPinInput v-model="otpPin" :length="6" otp placeholder="·" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Separator</h3>
      <p class="demo-description">Use the <code>separator</code> prop to insert a visual separator after every Nth input, or at specific positions.</p>
      <CodeCollapsible :code="`<UPinInput v-model=&quot;separatorPin&quot; :length=&quot;6&quot; :separator=&quot;3&quot; placeholder=&quot;·&quot; />`">
        <div class="demo-row">
          <UPinInput v-model="separatorPin" :length="6" :separator="3" placeholder="·" />
        </div>
        <div class="demo-row" style="margin-top: 8px;">
          <UPinInput v-model="arraySeparatorPin" :length="7" :separator="[3, 4]" placeholder="·" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Color</h3>
      <p class="demo-description">Use the <code>color</code> prop to change the focus ring color. Pair with <code>highlight</code> to show the ring persistently.</p>
      <CodeCollapsible :code="colors.map(c => `<UPinInput v-model=&quot;colorPin&quot; color=&quot;${c}&quot; highlight placeholder=&quot;·&quot; />`).join('\n')">
        <div class="demo-col">
          <UPinInput
            v-for="c in colors"
            :key="c"
            v-model="colorPin"
            :color="c"
            highlight
            placeholder="·"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Variant</h3>
      <p class="demo-description">Use the <code>variant</code> prop to change the visual style of the input fields.</p>
      <CodeCollapsible :code="variants.map(v => `<UPinInput v-model=&quot;variantPin&quot; variant=&quot;${v}&quot; color=&quot;neutral&quot; placeholder=&quot;·&quot; />`).join('\n')">
        <div class="demo-col">
          <UPinInput
            v-for="v in variants"
            :key="v"
            v-model="variantPin"
            :variant="v"
            color="neutral"
            placeholder="·"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Size</h3>
      <p class="demo-description">Use the <code>size</code> prop to change the size of the input fields.</p>
      <CodeCollapsible :code="sizes.map(s => `<UPinInput v-model=&quot;sizePin&quot; :size=&quot;${s}&quot; placeholder=&quot;·&quot; />`).join('\n')">
        <div class="demo-col">
          <UPinInput
            v-for="s in sizes"
            :key="s"
            v-model="sizePin"
            :size="s"
            placeholder="·"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Custom Separator Slot</h3>
      <p class="demo-description">Use the <code>#separator</code> slot to customize the separator appearance.</p>
      <CodeCollapsible :code="`<UPinInput v-model=&quot;slotPin&quot; :length=&quot;6&quot; :separator=&quot;3&quot; placeholder=&quot;·&quot;>
  <template #separator>
    <UIcon name=&quot;i-lucide-minus&quot; class=&quot;size-4&quot; />
  </template>
</UPinInput>`">
        <div class="demo-row">
          <UPinInput v-model="slotPin" :length="6" :separator="3" placeholder="·">
            <template #separator>
              <UIcon name="i-lucide-minus" class="size-4" />
            </template>
          </UPinInput>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <p class="demo-description">Use the <code>disabled</code> prop to prevent interaction with a muted appearance.</p>
      <CodeCollapsible :code="`<UPinInput disabled :length=&quot;5&quot; placeholder=&quot;·&quot; />`">
        <div class="demo-row">
          <UPinInput disabled :length="5" placeholder="·" />
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
</style>
