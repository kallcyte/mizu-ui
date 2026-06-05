<script setup lang="ts">
import { ref } from "vue";
import { MizuButton, MizuTag } from "@mizu/vue";
import "@mizu/vue/style.css";
import { Plus } from "@lucide/vue";

const initialTags = ["Design", "Engineering", "Production", "Beta", "Deprecated"];
const tags = ref<string[]>([...initialTags]);

const randomWords = [
    "Alpha", "Gamma", "Stable", "Experimental", "Internal",
    "Public", "Legacy", "Archived", "Preview", "Custom",
    "Feature", "Release", "Patch", "Hotfix", "Canary",
    "Nightly", "Edge", "LTS", "RC", "Snapshot",
];

const addTag = () => {
    const available = randomWords.filter((w) => !tags.value.includes(w));
    if (available.length === 0) return;
    const word = available[Math.floor(Math.random() * available.length)];
    tags.value = [...tags.value, word];
};

const removeTag = (tag: string) => {
    tags.value = tags.value.filter((t) => t !== tag);
};

const resetTags = () => {
    tags.value = [...initialTags];
};
</script>

<template>
    <div class="tag-demo">
        <div class="demo-section">
            <h3>Variants</h3>
            <div class="tag-row">
                <MizuTag variant="primary">Primary</MizuTag>
                <MizuTag variant="accent">Accent</MizuTag>
                <MizuTag variant="success">Success</MizuTag>
                <MizuTag variant="warning">Warning</MizuTag>
                <MizuTag variant="error">Error</MizuTag>
                <MizuTag variant="info">Info</MizuTag>
            </div>
        </div>

        <div class="demo-section">
            <h3>Status</h3>
            <div class="tag-row">
                <MizuTag variant="warning">Pending</MizuTag>
                <MizuTag variant="info">Draft</MizuTag>
                <MizuTag variant="accent">In Progress</MizuTag>
                <MizuTag variant="success">Success</MizuTag>
                <MizuTag variant="primary">Done</MizuTag>
                <MizuTag variant="error">Rejected</MizuTag>
                <MizuTag variant="info">Cancelled</MizuTag>
            </div>
        </div>

        <div class="demo-section">
            <h3>Closable</h3>
            <div class="tag-row">
                <MizuTag variant="primary" closable>Closable</MizuTag>
                <MizuTag variant="accent" closable>Draft</MizuTag>
                <MizuTag variant="success" closable>Approved</MizuTag>
                <MizuTag variant="warning" closable>Pending</MizuTag>
                <MizuTag variant="error" closable>Failed</MizuTag>
            </div>
        </div>

        <div class="demo-section">
            <h3>Interactive</h3>
            <p class="demo-hint">Click Add to generate a new tag, click × to remove:</p>
            <div class="add-form">
                <MizuButton variant="primary" @click="addTag" >
                    <template #leading-icon><Plus /></template>
                    Add
                </MizuButton>
                <MizuButton variant="outline" @click="resetTags" >
                    Reset
                </MizuButton>
            </div>
            <div class="tag-row">
                <MizuTag
                    v-for="tag in tags"
                    :key="tag"
                    variant="primary"
                    closable
                    @close="removeTag(tag)"
                >
                    {{ tag }}
                </MizuTag>
                <MizuTag v-if="tags.length === 0" variant="info">
                    No tags — add one above
                </MizuTag>
            </div>
        </div>
    </div>
</template>

<style scoped>
.tag-demo {
    all: revert;
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 24px;
    background: var(--sl-color-gray-2);
    border-radius: 8px;
}

.tag-demo :deep(*) {
    margin: 0;
}

.demo-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.demo-section h3 {
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

.add-form {
    display: flex;
    align-items: center;
    gap: 8px;
}

.tag-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin: 0;
    padding: 0;
}
</style>
