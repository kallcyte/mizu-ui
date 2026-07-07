<script setup lang="ts">
import { ref } from "vue";
import { MizuInput } from "@mizu/vue";
import { Search, Mail, Lock, User, AlertCircle, CheckCircle } from "@lucide/vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const sizesCode = `<MizuInput size="sm" placeholder="Small input" />
<MizuInput size="md" placeholder="Medium input" />
<MizuInput size="lg" placeholder="Large input" />`;

const labelsCode = `<MizuInput label="Username" placeholder="Enter username" />
<MizuInput label="Email" type="email" placeholder="Enter email" />`;

const iconsCode = `<MizuInput v-model="value" placeholder="Search...">
  <template #leading-icon>
    <Search />
  </template>
</MizuInput>
<MizuInput v-model="value" type="email" placeholder="Email address">
  <template #leading-icon>
    <Mail />
  </template>
</MizuInput>
<MizuInput v-model="value" type="password" placeholder="Password">
  <template #leading-icon>
    <Lock />
  </template>
</MizuInput>`;

const statesCode = `<MizuInput v-model="locked" label="Username" disabled helper-text="This field is locked">
  <template #trailing-icon>
    <Lock />
  </template>
</MizuInput>
<MizuInput v-model="value" label="Email" error helper-text="Please enter a valid email address" />
<MizuInput v-model="value" label="Email" helper-text="Email is available" />`;

const helperCode = `<MizuInput v-model="name" label="Full Name" placeholder="John Doe" helper-text="Enter your first and last name" />
<MizuInput label="Password" type="password" placeholder="Minimum 8 characters" helper-text="Must include at least one number" />`;

const requiredCode = `<MizuInput label="Email" type="email" required placeholder="required@example.com" />
<MizuInput label="Password" type="password" required placeholder="Enter password" />`;

const loginCode = `<MizuInput label="Email" type="email" required placeholder="you@example.com" />
<MizuInput label="Password" type="password" required placeholder="Enter password" />`;

const showPasswordCode = `<MizuInput v-model="value" label="Password" type="password" show-password placeholder="Enter password" />
<MizuInput v-model="value" label="New Password" type="password" show-password placeholder="Create password" helper-text="Click the eye icon to toggle" />`;

const trailingIconCode = `<MizuInput v-model="name" placeholder="Enter name">
  <template #trailing-icon>
    <User />
  </template>
</MizuInput>`;

const errorTrailingCode = `<MizuInput v-model="value" label="Email" error helper-text="Invalid email format">
  <template #trailing-icon>
    <AlertCircle />
  </template>
</MizuInput>
<MizuInput v-model="value" label="Email" helper-text="Email is valid">
  <template #trailing-icon>
    <CheckCircle />
  </template>
</MizuInput>`;

const searchValue = ref("");
const emailValue = ref("");
const passwordValue = ref("");
const nameValue = ref("");
const disabledValue = ref("locked-user");
const errorValue = ref("invalid-email");
const successValue = ref("user@example.com");
const passwordDemoValue = ref("");
</script>

<template>
  <div class="input-examples">
    <section class="example-section">
      <h3>Sizes</h3>
      <CodeCollapsible :code="sizesCode">
        <div class="input-row">
          <MizuInput size="sm" placeholder="Small input" />
          <MizuInput size="md" placeholder="Medium input" />
          <MizuInput size="lg" placeholder="Large input" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Labels</h3>
      <CodeCollapsible :code="labelsCode">
        <div class="input-row">
          <MizuInput label="Username" placeholder="Enter username" />
          <MizuInput label="Email" type="email" placeholder="Enter email" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Icons</h3>
      <CodeCollapsible :code="iconsCode">
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
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>States</h3>
      <CodeCollapsible :code="statesCode">
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
          <MizuInput v-model="successValue" label="Email" helper-text="Email is available" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Helper Text</h3>
      <CodeCollapsible :code="helperCode">
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
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Required</h3>
      <CodeCollapsible :code="requiredCode">
        <div class="input-row">
          <MizuInput label="Email" type="email" required placeholder="required@example.com" />
          <MizuInput label="Password" type="password" required placeholder="Enter password" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Login Form</h3>
      <CodeCollapsible :code="loginCode">
        <div class="input-row">
          <MizuInput label="Email" type="email" required placeholder="you@example.com" />
          <MizuInput label="Password" type="password" required placeholder="Enter password" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Show Password</h3>
      <CodeCollapsible :code="showPasswordCode">
        <div class="input-row">
          <MizuInput
            v-model="passwordDemoValue"
            label="Password"
            type="password"
            show-password
            placeholder="Enter password"
          />
          <MizuInput
            v-model="passwordDemoValue"
            label="New Password"
            type="password"
            show-password
            placeholder="Create password"
            helper-text="Click the eye icon to toggle"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Trailing Icon</h3>
      <CodeCollapsible :code="trailingIconCode">
        <div class="input-row">
          <MizuInput v-model="nameValue" placeholder="Enter name">
            <template #trailing-icon>
              <User />
            </template>
          </MizuInput>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Error with Trailing Icon</h3>
      <CodeCollapsible :code="errorTrailingCode">
        <div class="input-row">
          <MizuInput v-model="errorValue" label="Email" error helper-text="Invalid email format">
            <template #trailing-icon>
              <AlertCircle />
            </template>
          </MizuInput>
          <MizuInput v-model="successValue" label="Email" helper-text="Email is valid">
            <template #trailing-icon>
              <CheckCircle />
            </template>
          </MizuInput>
        </div>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.input-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}

.input-examples :deep(*) {
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

.input-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 16px;
  margin: 0;
  padding: 0;
}
</style>
