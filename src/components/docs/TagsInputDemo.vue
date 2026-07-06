<script setup lang="ts">
import { computed, ref } from "vue";
import { MizuTagsInput } from "@mizu/vue";
import DemoTabs from "./DemoTabs.vue";

const basicTags = ref<string[]>(["Vue", "TypeScript"]);

const skillsTags = ref<string[]>(["React", "GraphQL"]);

const limitedTags = ref<string[]>(["Admin"]);
const limitInfo = computed(() => `${limitedTags.value.length}/3 tags used`);

const categoriesTags = ref<string[]>([]);

const separatorTags = ref<string[]>([]);

const withHelper = ref<string[]>([]);
const withHelperTouched = ref(false);
const submitError = computed(() => {
  if (!withHelperTouched.value) return "";
  if (withHelper.value.length < 2) return "Add at least 2 tags.";
  return "";
});

const withError = ref<string[]>(["Spam"]);

const errorFlashCount = ref(0);

const readOnlyTags = ref<string[]>(["Production", "Stable", "v1.0"]);

function handleInvalid(value: string, reason: "duplicate" | "max" | "validation") {
  if (reason === "duplicate") {
    errorFlashCount.value += 1;
    console.warn(`Duplicate tag rejected: ${value}`);
  } else if (reason === "max") {
    console.warn(`Max tags reached, rejected: ${value}`);
  } else if (reason === "validation") {
    console.warn(`Invalid tag rejected: ${value}`);
  }
}

const customValidator = (value: string) => {
  return /^[a-z0-9-]+$/.test(value);
};

const basicCode = `<MizuTagsInput
  v-model="basicTags"
  placeholder="Add a tag..."
/>`;

const labelHelperCode = `<MizuTagsInput
  v-model="skillsTags"
  label="Skills"
  helper-text="Comma or Enter to add"
  placeholder="Add a skill..."
/>`;

const maxTagsCode = `<MizuTagsInput
  v-model="limitedTags"
  :max-tags="3"
  label="Roles"
  :helper-text="limitInfo"
  placeholder="Add a role..."
/>`;

const variantsCode = `<MizuTagsInput v-model="categoriesTags" tag-variant="primary" label="Primary" placeholder="Primary variant..." />
<MizuTagsInput v-model="categoriesTags" tag-variant="accent" label="Accent" placeholder="Accent variant..." />
<MizuTagsInput v-model="categoriesTags" tag-variant="success" label="Success" placeholder="Success variant..." />
<MizuTagsInput v-model="categoriesTags" tag-variant="warning" label="Warning" placeholder="Warning variant..." />
<MizuTagsInput v-model="categoriesTags" tag-variant="error" label="Error" placeholder="Error variant..." />
<MizuTagsInput v-model="categoriesTags" tag-variant="info" label="Info" placeholder="Info variant..." />`;

const sizesCode = `<MizuTagsInput v-model="basicTags" size="sm" placeholder="Small..." />
<MizuTagsInput v-model="basicTags" size="md" placeholder="Medium (default)..." />
<MizuTagsInput v-model="basicTags" size="lg" placeholder="Large..." />`;

const separatorsCode = `<MizuTagsInput
  v-model="separatorTags"
  :separator="['Enter', ',', ';', 'Tab']"
  placeholder="Multi-separator..."
/>`;

const customValidationCode = `<MizuTagsInput
  v-model="basicTags"
  :validate="customValidator"
  helper-text="Lowercase letters, numbers, and dashes only"
  placeholder="kebab-case-only..."
/>`;

const errorStateCode = `<MizuTagsInput
  v-model="withError"
  :error="!!withError.find((t) => t.toLowerCase() === 'spam')"
  label="Tags"
  helper-text="The 'Spam' tag is rejected"
/>`;

const disabledCode = `<MizuTagsInput
  v-model="readOnlyTags"
  disabled
  label="Read-only system tags"
/>`;

const readOnlyCode = `<MizuTagsInput
  v-model="readOnlyTags"
  read-only
  label="Tags (read-only)"
/>`;
</script>

<template>
  <div class="tags-input-demo not-content">
    <DemoTabs :code="basicCode">
      <div class="demo-section">
        <h3>Basic</h3>
        <p class="demo-hint">Type and press Enter or comma to add a tag:</p>
        <MizuTagsInput
          v-model="basicTags"
          placeholder="Add a tag..."
        />
        <p class="demo-hint">Tags: {{ basicTags.length ? basicTags.join(", ") : "none" }}</p>
      </div>
    </DemoTabs>

    <DemoTabs :code="labelHelperCode">
      <div class="demo-section">
        <h3>With Label & Helper</h3>
        <MizuTagsInput
          v-model="skillsTags"
          label="Skills"
          helper-text="Comma or Enter to add"
          placeholder="Add a skill..."
        />
      </div>
    </DemoTabs>

    <DemoTabs :code="maxTagsCode">
      <div class="demo-section">
        <h3>Max Tags</h3>
        <MizuTagsInput
          v-model="limitedTags"
          :max-tags="3"
          label="Roles"
          :helper-text="limitInfo"
          placeholder="Add a role..."
        />
      </div>
    </DemoTabs>

    <DemoTabs :code="variantsCode">
      <div class="demo-section">
        <h3>Variants</h3>
        <div class="demo-stack">
          <MizuTagsInput v-model="categoriesTags" tag-variant="primary" label="Primary" placeholder="Primary variant..." />
          <MizuTagsInput v-model="categoriesTags" tag-variant="accent" label="Accent" placeholder="Accent variant..." />
          <MizuTagsInput v-model="categoriesTags" tag-variant="success" label="Success" placeholder="Success variant..." />
          <MizuTagsInput v-model="categoriesTags" tag-variant="warning" label="Warning" placeholder="Warning variant..." />
          <MizuTagsInput v-model="categoriesTags" tag-variant="error" label="Error" placeholder="Error variant..." />
          <MizuTagsInput v-model="categoriesTags" tag-variant="info" label="Info" placeholder="Info variant..." />
        </div>
      </div>
    </DemoTabs>

    <DemoTabs :code="sizesCode">
      <div class="demo-section">
        <h3>Sizes</h3>
        <div class="demo-stack">
          <MizuTagsInput v-model="basicTags" size="sm" placeholder="Small..." />
          <MizuTagsInput v-model="basicTags" size="md" placeholder="Medium (default)..." />
          <MizuTagsInput v-model="basicTags" size="lg" placeholder="Large..." />
        </div>
      </div>
    </DemoTabs>

    <DemoTabs :code="separatorsCode">
      <div class="demo-section">
        <h3>Separators</h3>
        <p class="demo-hint">Press Enter, comma, semicolon, or Tab to add:</p>
        <MizuTagsInput
          v-model="separatorTags"
          :separator="['Enter', ',', ';', 'Tab']"
          placeholder="Multi-separator..."
        />
        <p class="demo-hint">Tags: {{ separatorTags.length ? separatorTags.join(", ") : "none" }}</p>
      </div>
    </DemoTabs>

    <DemoTabs :code="customValidationCode">
      <div class="demo-section">
        <h3>Custom Validation</h3>
        <p class="demo-hint">Only kebab-case lowercase allowed:</p>
        <MizuTagsInput
          v-model="basicTags"
          :validate="customValidator"
          helper-text="Lowercase letters, numbers, and dashes only"
          placeholder="kebab-case-only..."
        />
      </div>
    </DemoTabs>

    <DemoTabs :code="errorStateCode">
      <div class="demo-section">
        <h3>Error State</h3>
        <MizuTagsInput
          v-model="withError"
          :error="!!withError.find((t) => t.toLowerCase() === 'spam')"
          label="Tags"
          helper-text="The 'Spam' tag is rejected"
        />
      </div>
    </DemoTabs>

    <DemoTabs :code="disabledCode">
      <div class="demo-section">
        <h3>Disabled</h3>
        <MizuTagsInput
          v-model="readOnlyTags"
          disabled
          label="Read-only system tags"
        />
      </div>
    </DemoTabs>

    <DemoTabs :code="readOnlyCode">
      <div class="demo-section">
        <h3>Read-Only</h3>
        <MizuTagsInput
          v-model="readOnlyTags"
          read-only
          label="Tags (read-only)"
        />
      </div>
    </DemoTabs>
  </div>
</template>

<style scoped>
.tags-input-demo {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  background: transparent;

  border: 1px solid var(--color-surface-muted);
  border-radius: 8px;
}

.tags-input-demo :deep(*) {
  margin: 0;
}

.demo-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.demo-section h3 {
  font-size: 14px;
  font-weight: 600;
  color: var(--sl-color-text);
  margin: 0;
}

.demo-section > div {
  margin-top: 0;
}

.demo-hint {
  font-size: 12px;
  color: var(--sl-color-text-light);
  margin: 0;
}

.demo-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
