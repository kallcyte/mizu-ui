<script setup lang="ts">
import { ref } from "vue";
import { BlueprintButton } from "@blueprint/vue";
import {
    Plus,
    ArrowRight,
    X,
    Check,
    Save,
    CheckCircle,
    AlertTriangle,
    XCircle,
    Info,
} from "@lucide/vue";
import "@blueprint/vue/style.css";

const loading = ref(false);

const handleClick = () => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
    }, 2000);
};
</script>

<template>
    <div class="button-demo">
        <div class="demo-section">
            <h3>Variants</h3>
            <div class="button-row">
                <BlueprintButton variant="primary">Primary</BlueprintButton>
                <BlueprintButton variant="accent">Accent</BlueprintButton>
                <BlueprintButton variant="ghost">Ghost</BlueprintButton>
                <BlueprintButton variant="outline">Outline</BlueprintButton>
            </div>
        </div>

        <div class="demo-section">
            <h3>Sizes</h3>
            <div class="button-row">
                <BlueprintButton variant="primary" size="sm"
                    >Small</BlueprintButton
                >
                <BlueprintButton variant="primary" size="md"
                    >Medium</BlueprintButton
                >
                <BlueprintButton variant="primary" size="lg"
                    >Large</BlueprintButton
                >
            </div>
        </div>

        <div class="demo-section">
            <h3>States</h3>
            <div class="button-row">
                <BlueprintButton variant="primary" disabled
                    >Disabled</BlueprintButton
                >
                <BlueprintButton
                    variant="primary"
                    :loading="loading"
                    @click="handleClick"
                >
                    {{ loading ? "Loading..." : "Click me" }}
                </BlueprintButton>
            </div>
        </div>

        <div class="demo-section">
            <h3>With Icons</h3>
            <div class="button-row">
                <BlueprintButton variant="primary">
                    <template #leading-icon>
                        <Plus />
                    </template>
                    Add Item
                </BlueprintButton>
                <BlueprintButton variant="accent">
                    Save
                    <template #trailing-icon>
                        <ArrowRight />
                    </template>
                </BlueprintButton>
            </div>
        </div>

        <div class="demo-section">
            <h3>Feedback</h3>
            <div class="button-row">
                <BlueprintButton variant="success">
                    <template #leading-icon>
                        <CheckCircle />
                    </template>
                    Success
                </BlueprintButton>
                <BlueprintButton variant="warning">
                    <template #leading-icon>
                        <AlertTriangle />
                    </template>
                    Warning
                </BlueprintButton>
                <BlueprintButton variant="error">
                    <template #leading-icon>
                        <XCircle />
                    </template>
                    Error
                </BlueprintButton>
                <BlueprintButton variant="info">
                    <template #leading-icon>
                        <Info />
                    </template>
                    Info
                </BlueprintButton>
            </div>
            <div class="button-row">
                <BlueprintButton variant="outline-success">
                    <template #leading-icon>
                        <CheckCircle />
                    </template>
                    Success
                </BlueprintButton>
                <BlueprintButton variant="outline-warning">
                    <template #leading-icon>
                        <AlertTriangle />
                    </template>
                    Warning
                </BlueprintButton>
                <BlueprintButton variant="outline-error">
                    <template #leading-icon>
                        <XCircle />
                    </template>
                    Error
                </BlueprintButton>
                <BlueprintButton variant="outline-info">
                    <template #leading-icon>
                        <Info />
                    </template>
                    Info
                </BlueprintButton>
            </div>
        </div>

        <div class="demo-section">
            <h3>Combinations</h3>

            <div class="combo-group">
                <span class="combo-label">Form Actions</span>
                <div class="button-row">
                    <BlueprintButton variant="ghost">
                        <template #leading-icon>
                            <X />
                        </template>
                        Cancel
                    </BlueprintButton>
                    <BlueprintButton variant="primary">
                        <template #leading-icon>
                            <Check />
                        </template>
                        Submit
                    </BlueprintButton>
                </div>
            </div>

            <div class="combo-group">
                <span class="combo-label">Dialog Actions</span>
                <div class="button-row">
                    <BlueprintButton variant="outline">Cancel</BlueprintButton>
                    <BlueprintButton variant="primary">
                        <template #leading-icon>
                            <Save />
                        </template>
                        Save Changes
                    </BlueprintButton>
                </div>
            </div>

            <div class="combo-group">
                <span class="combo-label">Destructive</span>
                <div class="button-row">
                    <BlueprintButton variant="ghost"
                        >Keep Original</BlueprintButton
                    >
                    <BlueprintButton variant="outline-error">
                        <template #leading-icon>
                            <X />
                        </template>
                        Delete
                    </BlueprintButton>
                </div>
            </div>

            <div class="combo-group">
                <span class="combo-label">Icon Only</span>
                <div class="button-row">
                    <BlueprintButton variant="ghost" size="sm">
                        <template #leading-icon>
                            <Plus />
                        </template>
                    </BlueprintButton>
                    <BlueprintButton variant="outline" size="md">
                        <template #leading-icon>
                            <Plus />
                        </template>
                    </BlueprintButton>
                    <BlueprintButton variant="primary" size="lg">
                        <template #leading-icon>
                            <Plus />
                        </template>
                    </BlueprintButton>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.button-demo {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 24px;
    background: var(--sl-color-gray-2);
    border-radius: 8px;
}

.demo-section {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.demo-section h3 {
    font-size: 14px;
    font-weight: 600;
    color: var(--sl-color-text);
    margin-bottom: 0;
    margin-top: 0;
}

.button-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin: 0;
    padding: 0;
}

.combo-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.combo-label {
    font-size: 12px;
    color: var(--sl-color-text-light);
    font-weight: 500;
}
</style>
