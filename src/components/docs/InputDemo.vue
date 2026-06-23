<script setup lang="ts">
import { ref } from "vue";
import { MizuInput } from "@mizu/vue";

const searchValue = ref("");
const emailValue = ref("");
const passwordValue = ref("");
const nameValue = ref("");
const disabledValue = ref("locked-user");
const errorValue = ref("invalid-email");
const successValue = ref("user@example.com");
</script>

<template>
    <div class="input-demo">
        <div class="demo-section">
            <h3>Sizes</h3>
            <div class="input-row">
                <MizuInput size="sm" placeholder="Small input" />
                <MizuInput size="md" placeholder="Medium input" />
                <MizuInput size="lg" placeholder="Large input" />
            </div>
        </div>

        <div class="demo-section">
            <h3>With Labels</h3>
            <div class="input-row">
                <MizuInput label="Username" placeholder="Enter username" />
                <MizuInput label="Email" type="email" placeholder="Enter email" />
            </div>
        </div>

        <div class="demo-section">
            <h3>With Icons</h3>
            <div class="input-row">
                <MizuInput v-model="searchValue" placeholder="Search...">
                    <template #leading-icon>
                        <Search />
                    </template>
                </MizuInput>
                <MizuInput v-model="emailValue" type="email" placeholder="Email address">
                    <template #leading-icon>
                        <Mail />
                    </template>
                </MizuInput>
                <MizuInput v-model="passwordValue" type="password" placeholder="Password">
                    <template #leading-icon>
                        <Lock />
                    </template>
                </MizuInput>
            </div>
        </div>

        <div class="demo-section">
            <h3>States</h3>
            <div class="input-row">
                <MizuInput
                    v-model="disabledValue"
                    label="Username"
                    disabled
                    helper-text="This field is locked"
                >
                    <template #trailing-icon>
                        <Lock />
                    </template>
                </MizuInput>
                <MizuInput
                    v-model="errorValue"
                    label="Email"
                    error
                    helper-text="Please enter a valid email address"
                />
                <MizuInput
                    v-model="successValue"
                    label="Email"
                    helper-text="Email is available"
                />
            </div>
        </div>

        <div class="demo-section">
            <h3>With Helper Text</h3>
            <div class="input-row">
                <MizuInput
                    v-model="nameValue"
                    label="Full Name"
                    placeholder="John Doe"
                    helper-text="Enter your first and last name"
                />
                <MizuInput
                    label="Password"
                    type="password"
                    placeholder="Minimum 8 characters"
                    helper-text="Must include at least one number"
                />
            </div>
        </div>

        <div class="demo-section">
            <h3>Required</h3>
            <div class="input-row">
                <MizuInput label="Email" type="email" required placeholder="required@example.com" />
                <MizuInput label="Password" type="password" required placeholder="Enter password" />
            </div>
        </div>

        <div class="demo-section">
            <h3>Login Form</h3>
            <div class="input-row">
                <MizuInput label="Email" type="email" required placeholder="you@example.com" />
                <MizuInput label="Password" type="password" required placeholder="Enter password" />
            </div>
        </div>

        <div class="demo-section">
            <h3>Trailing Icon</h3>
            <div class="input-row">
                <MizuInput v-model="nameValue" placeholder="Enter name">
                    <template #trailing-icon>
                        <User />
                    </template>
                </MizuInput>
            </div>
        </div>

        <div class="demo-section">
            <h3>Error with Trailing Icon</h3>
            <div class="input-row">
                <MizuInput
                    v-model="errorValue"
                    label="Email"
                    error
                    helper-text="Invalid email format"
                >
                    <template #trailing-icon>
                        <AlertCircle />
                    </template>
                </MizuInput>
                <MizuInput
                    v-model="successValue"
                    label="Email"
                    helper-text="Email is valid"
                >
                    <template #trailing-icon>
                        <CheckCircle />
                    </template>
                </MizuInput>
            </div>
        </div>
    </div>
</template>

<style scoped>
.input-demo {
    all: revert;
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 24px;
    background: var(--sl-color-gray-2);
    border-radius: 8px;
}

.input-demo :deep(*) {
    margin: 0;
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
.demo-section > div {
  margin-top: 0;
}

.input-row {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 16px;
    margin: 0;
    padding: 0;
}
</style>
