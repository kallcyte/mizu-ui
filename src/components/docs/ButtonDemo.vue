<script setup lang="ts">
import { ref } from "vue";
import { MizunagiButton } from "@mizunagi/vue";
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
import "@mizunagi/vue/style.css";

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
                <MizunagiButton variant="primary">Primary</MizunagiButton>
                <MizunagiButton variant="accent">Accent</MizunagiButton>
                <MizunagiButton variant="ghost">Ghost</MizunagiButton>
                <MizunagiButton variant="outline">Outline</MizunagiButton>
            </div>
        </div>

        <div class="demo-section">
            <h3>Sizes</h3>
            <div class="button-row">
                <MizunagiButton variant="primary" size="sm"
                    >Small</MizunagiButton
                >
                <MizunagiButton variant="primary" size="md"
                    >Medium</MizunagiButton
                >
                <MizunagiButton variant="primary" size="lg"
                    >Large</MizunagiButton
                >
            </div>
        </div>

        <div class="demo-section">
            <h3>States</h3>
            <div class="button-row">
                <MizunagiButton variant="primary" disabled
                    >Disabled</MizunagiButton
                >
                <MizunagiButton
                    variant="primary"
                    :loading="loading"
                    @click="handleClick"
                >
                    {{ loading ? "Loading..." : "Click me" }}
                </MizunagiButton>
            </div>
        </div>

        <div class="demo-section">
            <h3>With Icons</h3>
            <div class="button-row">
                <MizunagiButton variant="primary">
                    <template #leading-icon>
                        <Plus />
                    </template>
                    Add Item
                </MizunagiButton>
                <MizunagiButton variant="accent">
                    Save
                    <template #trailing-icon>
                        <ArrowRight />
                    </template>
                </MizunagiButton>
            </div>
        </div>

        <div class="demo-section">
            <h3>Feedback</h3>
            <div class="button-row">
                <MizunagiButton variant="success">
                    <template #leading-icon>
                        <CheckCircle />
                    </template>
                    Success
                </MizunagiButton>
                <MizunagiButton variant="warning">
                    <template #leading-icon>
                        <AlertTriangle />
                    </template>
                    Warning
                </MizunagiButton>
                <MizunagiButton variant="error">
                    <template #leading-icon>
                        <XCircle />
                    </template>
                    Error
                </MizunagiButton>
                <MizunagiButton variant="info">
                    <template #leading-icon>
                        <Info />
                    </template>
                    Info
                </MizunagiButton>
            </div>
            <div class="button-row">
                <MizunagiButton variant="outline-success">
                    <template #leading-icon>
                        <CheckCircle />
                    </template>
                    Success
                </MizunagiButton>
                <MizunagiButton variant="outline-warning">
                    <template #leading-icon>
                        <AlertTriangle />
                    </template>
                    Warning
                </MizunagiButton>
                <MizunagiButton variant="outline-error">
                    <template #leading-icon>
                        <XCircle />
                    </template>
                    Error
                </MizunagiButton>
                <MizunagiButton variant="outline-info">
                    <template #leading-icon>
                        <Info />
                    </template>
                    Info
                </MizunagiButton>
            </div>
        </div>

        <div class="demo-section">
            <h3>Combinations</h3>

            <div class="combo-group">
                <span class="combo-label">Form Actions</span>
                <div class="button-row">
                    <MizunagiButton variant="ghost">
                        <template #leading-icon>
                            <X />
                        </template>
                        Cancel
                    </MizunagiButton>
                    <MizunagiButton variant="primary">
                        <template #leading-icon>
                            <Check />
                        </template>
                        Submit
                    </MizunagiButton>
                </div>
            </div>

            <div class="combo-group">
                <span class="combo-label">Dialog Actions</span>
                <div class="button-row">
                    <MizunagiButton variant="outline">Cancel</MizunagiButton>
                    <MizunagiButton variant="primary">
                        <template #leading-icon>
                            <Save />
                        </template>
                        Save Changes
                    </MizunagiButton>
                </div>
            </div>

            <div class="combo-group">
                <span class="combo-label">Destructive</span>
                <div class="button-row">
                    <MizunagiButton variant="ghost"
                        >Keep Original</MizunagiButton
                    >
                    <MizunagiButton variant="outline-error">
                        <template #leading-icon>
                            <X />
                        </template>
                        Delete
                    </MizunagiButton>
                </div>
            </div>

            <div class="combo-group">
                <span class="combo-label">Icon Only</span>
                <div class="button-row">
                    <MizunagiButton variant="ghost" size="sm">
                        <template #leading-icon>
                            <Plus />
                        </template>
                    </MizunagiButton>
                    <MizunagiButton variant="outline" size="md">
                        <template #leading-icon>
                            <Plus />
                        </template>
                    </MizunagiButton>
                    <MizunagiButton variant="primary" size="lg">
                        <template #leading-icon>
                            <Plus />
                        </template>
                    </MizunagiButton>
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
