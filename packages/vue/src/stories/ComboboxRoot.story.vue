<script setup lang="ts">
import MizuComboboxRoot from "../components/MizuComboboxRoot.vue";
</script>

<template>
  <Story title="ComboboxRoot" :layout="{ type: 'single', width: 400 }">
    <Variant title="Default">
      <div class="flex flex-col gap-8 not-content">
        <div class="demo-section">
          <h3 class="text-sm font-semibold mb-1">Items API</h3>
          <MizuComboboxRoot
            :items="[
              { value: 'apple', label: 'Apple' },
              { value: 'banana', label: 'Banana' },
              { value: 'blueberry', label: 'Blueberry' },
              { value: 'cherry', label: 'Cherry' },
              { value: 'grape', label: 'Grape' },
              { value: 'orange', label: 'Orange' },
              { value: 'strawberry', label: 'Strawberry' },
            ]"
            placeholder="Search fruits..."
          />
        </div>
      </div>
    </Variant>

    <Variant title="With Groups">
      <div class="flex flex-col gap-8 not-content">
        <div class="demo-section">
          <h3 class="text-sm font-semibold mb-1">Grouped Items</h3>
          <MizuComboboxRoot
            :items="[
              { value: 'apple', label: 'Apple', group: 'Fruits' },
              { value: 'banana', label: 'Banana', group: 'Fruits' },
              { value: 'broccoli', label: 'Broccoli', group: 'Vegetables' },
              { value: 'carrot', label: 'Carrot', group: 'Vegetables' },
            ]"
            placeholder="Search..."
          />
        </div>
      </div>
    </Variant>

    <Variant title="Sizes">
      <div class="flex flex-col gap-8 not-content">
        <div class="demo-section">
          <h3 class="text-sm font-semibold mb-1">Small</h3>
          <MizuComboboxRoot
            :items="[
              { value: 'a', label: 'Option A' },
              { value: 'b', label: 'Option B' },
            ]"
            size="sm"
            placeholder="Small..."
          />
        </div>
        <div class="demo-section">
          <h3 class="text-sm font-semibold mb-1">Medium (default)</h3>
          <MizuComboboxRoot
            :items="[
              { value: 'a', label: 'Option A' },
              { value: 'b', label: 'Option B' },
            ]"
            size="md"
            placeholder="Medium..."
          />
        </div>
        <div class="demo-section">
          <h3 class="text-sm font-semibold mb-1">Large</h3>
          <MizuComboboxRoot
            :items="[
              { value: 'a', label: 'Option A' },
              { value: 'b', label: 'Option B' },
            ]"
            size="lg"
            placeholder="Large..."
          />
        </div>
      </div>
    </Variant>

    <Variant title="States">
      <div class="flex flex-col gap-8 not-content">
        <div class="demo-section">
          <h3 class="text-sm font-semibold mb-1">Error</h3>
          <MizuComboboxRoot
            :items="[
              { value: 'a', label: 'Option A' },
              { value: 'b', label: 'Option B' },
            ]"
            error
            placeholder="Error state..."
          />
        </div>
        <div class="demo-section">
          <h3 class="text-sm font-semibold mb-1">With Helper Text</h3>
          <MizuComboboxRoot
            :items="[
              { value: 'a', label: 'Option A' },
              { value: 'b', label: 'Option B' },
            ]"
            helper-text="Select an option"
            placeholder="Helper text..."
          />
        </div>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.demo-section {
  margin-top: 0;
}

.demo-section > * {
  margin-top: 0;
}

.demo-section h3 {
  all: revert;
}
</style>
