<script setup lang="ts">
import { ref } from "vue";
import { NagiButton } from "@nagi/vue";
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
import "@nagi/vue/style.css";

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
                <NagiButton variant="primary">Primary</NagiButton>
                <NagiButton variant="accent">Accent</NagiButton>
                <NagiButton variant="ghost">Ghost</NagiButton>
                <NagiButton variant="outline">Outline</NagiButton>
            </div>
        </div>

        <div class="demo-section">
            <h3>Sizes</h3>
            <div class="button-row">
                <NagiButton variant="primary" size="sm"
                    >Small</NagiButton
                >
                <NagiButton variant="primary" size="md"
                    >Medium</NagiButton
                >
                <NagiButton variant="primary" size="lg"
                    >Large</NagiButton
                >
            </div>
        </div>

        <div class="demo-section">
            <h3>States</h3>
            <div class="button-row">
                <NagiButton variant="primary" disabled
                    >Disabled</NagiButton
                >
                <NagiButton
                    variant="primary"
                    :loading="loading"
                    @click="handleClick"
                >
                    {{ loading ? "Loading..." : "Click me" }}
                </NagiButton>
            </div>
        </div>

        <div class="demo-section">
            <h3>With Icons</h3>
            <div class="button-row">
                <NagiButton variant="primary">
                    <template #leading-icon>
                        <Plus />
                    </template>
                    Add Item
                </NagiButton>
                <NagiButton variant="accent">
                    Save
                    <template #trailing-icon>
                        <ArrowRight />
                    </template>
                </NagiButton>
            </div>
        </div>

        <div class="demo-section">
            <h3>Feedback</h3>
            <div class="button-row">
                <NagiButton variant="success">
                    <template #leading-icon>
                        <CheckCircle />
                    </template>
                    Success
                </NagiButton>
                <NagiButton variant="warning">
                    <template #leading-icon>
                        <AlertTriangle />
                    </template>
                    Warning
                </NagiButton>
                <NagiButton variant="error">
                    <template #leading-icon>
                        <XCircle />
                    </template>
                    Error
                </NagiButton>
                <NagiButton variant="info">
                    <template #leading-icon>
                        <Info />
                    </template>
                    Info
                </NagiButton>
            </div>
            <div class="button-row">
                <NagiButton variant="outline-success">
                    <template #leading-icon>
                        <CheckCircle />
                    </template>
                    Success
                </NagiButton>
                <NagiButton variant="outline-warning">
                    <template #leading-icon>
                        <AlertTriangle />
                    </template>
                    Warning
                </NagiButton>
                <NagiButton variant="outline-error">
                    <template #leading-icon>
                        <XCircle />
                    </template>
                    Error
                </NagiButton>
                <NagiButton variant="outline-info">
                    <template #leading-icon>
                        <Info />
                    </template>
                    Info
                </NagiButton>
            </div>
        </div>

        <div class="demo-section">
            <h3>Combinations</h3>

            <div class="combo-group">
                <span class="combo-label">Form Actions</span>
                <div class="button-row">
                    <NagiButton variant="ghost">
                        <template #leading-icon>
                            <X />
                        </template>
                        Cancel
                    </NagiButton>
                    <NagiButton variant="primary">
                        <template #leading-icon>
                            <Check />
                        </template>
                        Submit
                    </NagiButton>
                </div>
            </div>

            <div class="combo-group">
                <span class="combo-label">Dialog Actions</span>
                <div class="button-row">
                    <NagiButton variant="outline">Cancel</NagiButton>
                    <NagiButton variant="primary">
                        <template #leading-icon>
                            <Save />
                        </template>
                        Save Changes
                    </NagiButton>
                </div>
            </div>

            <div class="combo-group">
                <span class="combo-label">Destructive</span>
                <div class="button-row">
                    <NagiButton variant="ghost"
                        >Keep Original</NagiButton
                    >
                    <NagiButton variant="outline-error">
                        <template #leading-icon>
                            <X />
                        </template>
                        Delete
                    </NagiButton>
                </div>
            </div>

            <div class="combo-group">
                <span class="combo-label">Icon Only</span>
                <div class="button-row">
                    <NagiButton variant="ghost" size="sm">
                        <template #leading-icon>
                            <Plus />
                        </template>
                    </NagiButton>
                    <NagiButton variant="outline" size="md">
                        <template #leading-icon>
                            <Plus />
                        </template>
                    </NagiButton>
                    <NagiButton variant="primary" size="lg">
                        <template #leading-icon>
                            <Plus />
                        </template>
                    </NagiButton>
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
