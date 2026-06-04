<script setup lang="ts">
import { ref } from "vue";
import { MizuButton } from "@mizu/vue";
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
import "@mizu/vue/style.css";

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
                <MizuButton variant="primary">Primary</MizuButton>
                <MizuButton variant="accent">Accent</MizuButton>
                <MizuButton variant="ghost">Ghost</MizuButton>
                <MizuButton variant="outline">Outline</MizuButton>
            </div>
        </div>

        <div class="demo-section">
            <h3>Sizes</h3>
            <div class="button-row">
                <MizuButton variant="primary" size="sm"
                    >Small</MizuButton
                >
                <MizuButton variant="primary" size="md"
                    >Medium</MizuButton
                >
                <MizuButton variant="primary" size="lg"
                    >Large</MizuButton
                >
            </div>
        </div>

        <div class="demo-section">
            <h3>States</h3>
            <div class="button-row">
                <MizuButton variant="primary" disabled
                    >Disabled</MizuButton
                >
                <MizuButton
                    variant="primary"
                    :loading="loading"
                    @click="handleClick"
                >
                    {{ loading ? "Loading..." : "Click me" }}
                </MizuButton>
            </div>
        </div>

        <div class="demo-section">
            <h3>With Icons</h3>
            <div class="button-row">
                <MizuButton variant="primary">
                    <template #leading-icon>
                        <Plus />
                    </template>
                    Add Item
                </MizuButton>
                <MizuButton variant="accent">
                    Save
                    <template #trailing-icon>
                        <ArrowRight />
                    </template>
                </MizuButton>
            </div>
        </div>

        <div class="demo-section">
            <h3>Feedback</h3>
            <div class="button-row">
                <MizuButton variant="success">
                    <template #leading-icon>
                        <CheckCircle />
                    </template>
                    Success
                </MizuButton>
                <MizuButton variant="warning">
                    <template #leading-icon>
                        <AlertTriangle />
                    </template>
                    Warning
                </MizuButton>
                <MizuButton variant="error">
                    <template #leading-icon>
                        <XCircle />
                    </template>
                    Error
                </MizuButton>
                <MizuButton variant="info">
                    <template #leading-icon>
                        <Info />
                    </template>
                    Info
                </MizuButton>
            </div>
            <div class="button-row">
                <MizuButton variant="outline-success">
                    <template #leading-icon>
                        <CheckCircle />
                    </template>
                    Success
                </MizuButton>
                <MizuButton variant="outline-warning">
                    <template #leading-icon>
                        <AlertTriangle />
                    </template>
                    Warning
                </MizuButton>
                <MizuButton variant="outline-error">
                    <template #leading-icon>
                        <XCircle />
                    </template>
                    Error
                </MizuButton>
                <MizuButton variant="outline-info">
                    <template #leading-icon>
                        <Info />
                    </template>
                    Info
                </MizuButton>
            </div>
        </div>

        <div class="demo-section">
            <h3>Combinations</h3>

            <div class="combo-group">
                <span class="combo-label">Form Actions</span>
                <div class="button-row">
                    <MizuButton variant="ghost">
                        <template #leading-icon>
                            <X />
                        </template>
                        Cancel
                    </MizuButton>
                    <MizuButton variant="primary">
                        <template #leading-icon>
                            <Check />
                        </template>
                        Submit
                    </MizuButton>
                </div>
            </div>

            <div class="combo-group">
                <span class="combo-label">Dialog Actions</span>
                <div class="button-row">
                    <MizuButton variant="outline">Cancel</MizuButton>
                    <MizuButton variant="primary">
                        <template #leading-icon>
                            <Save />
                        </template>
                        Save Changes
                    </MizuButton>
                </div>
            </div>

            <div class="combo-group">
                <span class="combo-label">Destructive</span>
                <div class="button-row">
                    <MizuButton variant="ghost"
                        >Keep Original</MizuButton
                    >
                    <MizuButton variant="outline-error">
                        <template #leading-icon>
                            <X />
                        </template>
                        Delete
                    </MizuButton>
                </div>
            </div>

            <div class="combo-group">
                <span class="combo-label">Icon Only</span>
                <div class="button-row">
                    <MizuButton variant="ghost" size="sm">
                        <template #leading-icon>
                            <Plus />
                        </template>
                    </MizuButton>
                    <MizuButton variant="outline" size="md">
                        <template #leading-icon>
                            <Plus />
                        </template>
                    </MizuButton>
                    <MizuButton variant="primary" size="lg">
                        <template #leading-icon>
                            <Plus />
                        </template>
                    </MizuButton>
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
