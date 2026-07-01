<script setup lang="ts">
import { computed, ref } from "vue";
import { MizuTagsInput } from "@mizu/vue";

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
</script>

<template>
  <div class="tags-input-demo">
    <div class="demo-section">
      <h3>Basic</h3>
      <p class="demo-hint">Type and press Enter or comma to add a tag:</p>
      <MizuTagsInput
        v-model="basicTags"
        placeholder="Add a tag..."
      />
      <p class="demo-hint">Tags: {{ basicTags.length ? basicTags.join(", ") : "none" }}</p>
    </div>

    <div class="demo-section">
      <h3>With Label & Helper</h3>
      <MizuTagsInput
        v-model="skillsTags"
        label="Skills"
        helper-text="Comma or Enter to add"
        placeholder="Add a skill..."
      />
    </div>

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

    <div class="demo-section">
      <h3>Sizes</h3>
      <div class="demo-stack">
        <MizuTagsInput v-model="basicTags" size="sm" placeholder="Small..." />
        <MizuTagsInput v-model="basicTags" size="md" placeholder="Medium (default)..." />
        <MizuTagsInput v-model="basicTags" size="lg" placeholder="Large..." />
      </div>
    </div>

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

    <div class="demo-section">
      <h3>Error State</h3>
      <MizuTagsInput
        v-model="withError"
        :error="!!withError.find((t) => t.toLowerCase() === 'spam')"
        label="Tags"
        helper-text="The 'Spam' tag is rejected"
      />
    </div>

    <div class="demo-section">
      <h3>Disabled</h3>
      <MizuTagsInput
        v-model="readOnlyTags"
        disabled
        label="Read-only system tags"
      />
    </div>

    <div class="demo-section">
      <h3>Read-Only</h3>
      <MizuTagsInput
        v-model="readOnlyTags"
        read-only
        label="Tags (read-only)"
      />
    </div>
  </div>
</template>

<style scoped>
.tags-input-demo {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  background: var(--sl-color-gray-2);
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