<script setup lang="ts">
import { reactive, ref } from "vue";
import {
  MizuForm,
  MizuFormField,
  MizuInput,
  MizuButton,
  type ValidationError,
} from "@mizu/vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const basicCode = `<MizuForm
  :state="state"
  :validate="validate"
  :submit="submit"
  @submit="(s) => console.log('Submitted:', s)"
>
  <MizuFormField name="email" label="Email" required help="Your work email address">
    <template #default="{ error, id }">
      <MizuInput :id="id" name="email" v-model="state.email" :error="error" placeholder="you@company.com" />
    </template>
  </MizuFormField>

  <MizuFormField name="password" label="Password" required>
    <template #default="{ error, id }">
      <MizuInput :id="id" name="password" v-model="state.password" type="password" :error="error" placeholder="At least 6 characters" />
    </template>
  </MizuFormField>

  <MizuButton variant="primary" size="md" type="submit" class="w-max">
    Log In
  </MizuButton>

  <p v-if="loginSuccess" class="success-text">Login successful!</p>
</MizuForm>`;

interface LoginState {
  email: string;
  password: string;
}

const loginState = reactive<LoginState>({
  email: "",
  password: "",
});

function validateLogin(state: LoginState): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!state.email?.trim()) {
    errors.push({ field: "email", message: "Email is required" });
  } else if (!/\S+@\S+\.\S+/.test(state.email)) {
    errors.push({ field: "email", message: "Enter a valid email address" });
  }
  if (!state.password) {
    errors.push({ field: "password", message: "Password is required" });
  } else if (state.password.length < 6) {
    errors.push({ field: "password", message: "Password must be at least 6 characters" });
  }
  return errors;
}

const loginSuccess = ref(false);

async function submitLogin(state: LoginState) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  loginSuccess.value = true;
  setTimeout(() => (loginSuccess.value = false), 3000);
}
</script>

<template>
  <div class="form-examples">
    <section class="example-section">
      <h3>Basic Login Form</h3>
      <CodeCollapsible :code="basicCode">
        <MizuForm
          :state="loginState"
          :validate="validateLogin"
          :submit="submitLogin"
          @submit="(s) => console.log('Submitted:', s)"
        >
          <MizuFormField name="email" label="Email" required help="Your work email address">
            <template #default="{ error, id }">
              <MizuInput :id="id" name="email" v-model="loginState.email" :error="error" placeholder="you@company.com" />
            </template>
          </MizuFormField>

          <MizuFormField name="password" label="Password" required>
            <template #default="{ error, id }">
              <MizuInput :id="id" name="password" v-model="loginState.password" type="password" :error="error" placeholder="At least 6 characters" />
            </template>
          </MizuFormField>

          <MizuButton variant="primary" size="md" type="submit" class="w-max">
            Log In
          </MizuButton>

          <p v-if="loginSuccess" class="success-text">Login successful!</p>
        </MizuForm>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.form-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
  max-width: 420px;
}

.form-examples :deep(*) {
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

.success-text {
  font-size: 14px;
  color: var(--color-feedback-success-base);
  font-weight: 500;
}
</style>
