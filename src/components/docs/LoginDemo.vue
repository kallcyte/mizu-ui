<script setup lang="ts">
import { ref } from "vue";
import { z } from "zod";
import { useForm, MizuInput, MizuButton, MizuCheckbox, MizuCard, MizuCardContent, MizuAlert } from "@mizu/vue";
import { Mail, Lock } from "@lucide/vue";

const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  remember: z.boolean().optional(),
});

type LoginForm = z.infer<typeof loginSchema>;

const form = useForm(loginSchema);

const loginError = ref<string | undefined>(undefined);
const loginSuccess = ref(false);

async function handleLogin(values: LoginForm) {
  loginError.value = undefined;
  loginSuccess.value = false;
  await new Promise((resolve) => setTimeout(resolve, 1500));
  if (values.email === "admin@mizu.dev" && values.password === "password123") {
    loginSuccess.value = true;
  } else {
    loginError.value = "Invalid email or password. Try admin@mizu.dev / password123";
    throw new Error("Login failed");
  }
}

const submitHandler = form.handleSubmit(handleLogin);
</script>

<template>
  <div class="login-demo-wrapper">
    <div class="login-page">
      <div class="login-container">
        <MizuCard variant="default">
          <MizuCardContent>
            <div class="login-header">
              <h2 class="login-title">Welcome Back</h2>
              <p class="login-subtitle">Sign in to your Mizu account</p>
            </div>

            <MizuAlert
              v-if="loginError"
              variant="error"
              title="Login Failed"
              :closable="true"
              @close="loginError = undefined"
            >
              {{ loginError }}
            </MizuAlert>

            <MizuAlert
              v-if="loginSuccess"
              variant="success"
              title="Success!"
            >
              You have been logged in successfully.
            </MizuAlert>

            <form @submit="submitHandler" novalidate autocomplete="off" class="login-form">
              <MizuInput
                :model-value="form.fields.email.modelValue.value"
                @update:model-value="form.fields.email.onChange"
                :error="!!form.fields.email.error.value"
                :helper-text="form.fields.email.error.value || undefined"
                label="Email"
                type="email"
                placeholder="you@example.com"
                name="email"
                required
                @blur="form.fields.email.onBlur()"
              >
                <template #leading-icon>
                  <Mail />
                </template>
              </MizuInput>

              <MizuInput
                :model-value="form.fields.password.modelValue.value"
                @update:model-value="form.fields.password.onChange"
                :error="!!form.fields.password.error.value"
                :helper-text="form.fields.password.error.value || undefined"
                label="Password"
                type="password"
                placeholder="Enter your password"
                name="password"
                required
                show-password
                @blur="form.fields.password.onBlur()"
              >
                <template #leading-icon>
                  <Lock />
                </template>
              </MizuInput>

              <MizuCheckbox
                :model-value="form.fields.remember.modelValue.value"
                @update:model-value="form.fields.remember.onChange"
                label="Remember me"
              />

              <MizuButton
                type="submit"
                variant="primary"
                size="lg"
                :loading="form.isSubmitting.value"
                :disabled="form.isSubmitting.value"
                class="login-submit-btn"
              >
                {{ form.isSubmitting.value ? "Signing in..." : "Sign In" }}
              </MizuButton>
            </form>

            <div class="login-footer">
              <p class="login-hint">
                Demo credentials: <code>admin@mizu.dev</code> / <code>password123</code>
              </p>
            </div>
          </MizuCardContent>
        </MizuCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-demo-wrapper {
  all: revert;
  margin-top: 0;
}

.login-demo-wrapper * {
  margin-top: 0;
}

.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background-color: var(--color-surface-subtle);
}

.login-container {
  width: 100%;
  max-width: 420px;
}

.login-header {
  text-align: center;
  margin-bottom: 8px;
}

.login-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-foreground-primary);
  margin: 0 0 4px 0;
}

.login-subtitle {
  font-size: 14px;
  color: var(--color-foreground-secondary);
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
}

.login-submit-btn {
  width: 100%;
  margin-top: 8px;
}

.login-footer {
  margin-top: 16px;
  text-align: center;
}

.login-hint {
  font-size: 12px;
  color: var(--color-foreground-tertiary);
  margin: 0;
}

.login-hint code {
  font-family: var(--font-family-mono);
  font-size: 12px;
  background-color: var(--color-surface-subtle);
  padding: 2px 6px;
  border-radius: 4px;
}
</style>
