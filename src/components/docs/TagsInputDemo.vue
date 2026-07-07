<script setup lang="ts">
import { computed, ref } from "vue";
import { MizuTagsInput } from "@mizu/vue";
import CodeCollapsible from "./CodeCollapsible.vue";

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
  <div class="tags-input-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="basicCode">
        <p class="demo-hint">Type and press Enter or comma to add a tag:</p>
        <MizuTagsInput
          v-model="basicTags"
          placeholder="Add a tag..."
        />
        <p class="demo-hint">Tags: {{ basicTags.length ? basicTags.join(", ") : "none" }}</p>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Label & Helper</h3>
      <CodeCollapsible :code="labelHelperCode">
        <MizuTagsInput
          v-model="skillsTags"
          label="Skills"
          helper-text="Comma or Enter to add"
          placeholder="Add a skill..."
        />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Max Tags</h3>
      <CodeCollapsible :code="maxTagsCode">
        <MizuTagsInput
          v-model="limitedTags"
          :max-tags="3"
          label="Roles"
          :helper-text="limitInfo"
          placeholder="Add a role..."
        />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Variants</h3>
      <CodeCollapsible :code="variantsCode">
        <div class="demo-stack">
          <MizuTagsInput v-model="categoriesTags" tag-variant="primary" label="Primary" placeholder="Primary variant..." />
          <MizuTagsInput v-model="categoriesTags" tag-variant="accent" label="Accent" placeholder="Accent variant..." />
          <MizuTagsInput v-model="categoriesTags" tag-variant="success" label="Success" placeholder="Success variant..." />
          <MizuTagsInput v-model="categoriesTags" tag-variant="warning" label="Warning" placeholder="Warning variant..." />
          <MizuTagsInput v-model="categoriesTags" tag-variant="error" label="Error" placeholder="Error variant..." />
          <MizuTagsInput v-model="categoriesTags" tag-variant="info" label="Info" placeholder="Info variant..." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Sizes</h3>
      <CodeCollapsible :code="sizesCode">
        <div class="demo-stack">
          <MizuTagsInput v-model="basicTags" size="sm" placeholder="Small..." />
          <MizuTagsInput v-model="basicTags" size="md" placeholder="Medium (default)..." />
          <MizuTagsInput v-model="basicTags" size="lg" placeholder="Large..." />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Separators</h3>
      <CodeCollapsible :code="separatorsCode">
        <p class="demo-hint">Press Enter, comma, semicolon, or Tab to add:</p>
        <MizuTagsInput
          v-model="separatorTags"
          :separator="['Enter', ',', ';', 'Tab']"
          placeholder="Multi-separator..."
        />
        <p class="demo-hint">Tags: {{ separatorTags.length ? separatorTags.join(", ") : "none" }}</p>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Custom Validation</h3>
      <CodeCollapsible :code="customValidationCode">
        <p class="demo-hint">Only kebab-case lowercase allowed:</p>
        <MizuTagsInput
          v-model="basicTags"
          :validate="customValidator"
          helper-text="Lowercase letters, numbers, and dashes only"
          placeholder="kebab-case-only..."
        />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Error State</h3>
      <CodeCollapsible :code="errorStateCode">
        <MizuTagsInput
          v-model="withError"
          :error="!!withError.find((t) => t.toLowerCase() === 'spam')"
          label="Tags"
          helper-text="The 'Spam' tag is rejected"
        />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Disabled</h3>
      <CodeCollapsible :code="disabledCode">
        <MizuTagsInput
          v-model="readOnlyTags"
          disabled
          label="Read-only system tags"
        />
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Read-Only</h3>
      <CodeCollapsible :code="readOnlyCode">
        <MizuTagsInput
          v-model="readOnlyTags"
          read-only
          label="Tags (read-only)"
        />
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.tags-input-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}

.tags-input-examples :deep(*) {
  margin: 0;
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
