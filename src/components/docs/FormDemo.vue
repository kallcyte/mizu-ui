<script setup lang="ts">
import { reactive, ref, useTemplateRef } from "vue";
import * as z from "zod";
import CodeCollapsible from "./CodeCollapsible.vue";
import type { FormError, FormSubmitEvent, FormErrorEvent } from "@nuxt/ui";

// Basic / custom validation
const basicState = reactive({
  email: undefined as string | undefined,
  password: undefined as string | undefined,
});
const basicSubmitted = ref("");
function validateBasic(state: Partial<typeof basicState>): FormError[] {
  const errors: FormError[] = [];
  if (!state.email) errors.push({ name: "email", message: "Email is required" });
  else if (!state.email.includes("@")) errors.push({ name: "email", message: "Invalid email" });
  if (!state.password) errors.push({ name: "password", message: "Password is required" });
  return errors;
}
async function onBasicSubmit(event: FormSubmitEvent<typeof basicState>) {
  basicSubmitted.value = JSON.stringify(event.data);
}
const basicCode = `<script setup lang="ts">
import { reactive } from 'vue'
import type { FormError, FormSubmitEvent } from '@nuxt/ui'

const state = reactive({ email: undefined, password: undefined })

function validate(state: Partial<typeof state>): FormError[] {
  const errors: FormError[] = []
  if (!state.email) errors.push({ name: 'email', message: 'Email is required' })
  if (!state.password) errors.push({ name: 'password', message: 'Password is required' })
  return errors
}

async function onSubmit(event: FormSubmitEvent<typeof state>) {
  console.log(event.data)
}
</` + `script>

<template>
  <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField size="xs" label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormField>
    <UFormField size="xs" label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormField>
    <UButton type="submit">Submit</UButton>
  </UForm>
</template>`;

// Schema validation (Zod)
const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});
type LoginSchema = z.output<typeof loginSchema>;
const loginState = reactive<Partial<LoginSchema>>({
  email: undefined,
  password: undefined,
});
const loginSubmitted = ref("");
async function onLoginSubmit(event: FormSubmitEvent<LoginSchema>) {
  loginSubmitted.value = JSON.stringify(event.data);
}
const schemaCode = `<script setup lang="ts">
import { reactive } from 'vue'
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({ email: undefined, password: undefined })

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data)
}
</` + `script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField size="xs" label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormField>
    <UFormField size="xs" label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormField>
    <UButton type="submit">Submit</UButton>
  </UForm>
</template>`;

// Error pattern with InputTags
const tagsSchema = z.object({
  email: z.string().email("Invalid email"),
  tags: z.array(z.string().regex(/^[a-z-]+$/, "Lowercase letters and dashes only")).min(1, "Add at least one tag"),
});
type TagsSchema = z.output<typeof tagsSchema>;
const tagsState = reactive<Partial<TagsSchema>>({
  email: undefined,
  tags: [],
});
const tagsSubmitted = ref("");
async function onTagsSubmit(event: FormSubmitEvent<TagsSchema>) {
  tagsSubmitted.value = JSON.stringify(event.data);
}
const errorPatternCode = `<UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
  <UFormField size="xs" label="Email" name="email">
    <UInput v-model="state.email" />
  </UFormField>
  <UFormField size="xs" label="Tags" name="tags" :error-pattern="/^tags\\..+/">
    <UInputTags v-model="state.tags" />
  </UFormField>
  <UButton type="submit">Submit</UButton>
</UForm>`;

// Validate-on
const validateOnSchema = z.object({
  input: z.string({ message: 'Please enter your email' }).min(10, 'Must be at least 10 characters'),
  inputNumber: z.number({ message: 'Please enter a number' }).min(10, 'Must be at least 10'),
  textarea: z.string({ message: 'Please enter a message' }).min(10, 'Must be at least 10 characters'),
  select: z.string({ message: 'Please select an option' }).refine(value => value === 'option-2', {
    message: 'Please select Option 2'
  }),
  switch: z.boolean().refine(value => value === true, {
    message: 'Must be enabled'
  }),
  checkbox: z.boolean().refine(value => value === true, {
    message: 'Must be checked'
  }),
  inputTags: z.array(z.string(), { message: 'Please add at least one tag' }).min(1, 'Please add at least one tag'),
  slider: z.number().min(1, 'Must be greater than 0').max(20, 'Must be less than 20')
});
type ValidateOnSchema = z.input<typeof validateOnSchema>;
const validateOnState = reactive<Partial<ValidateOnSchema>>({
  switch: false,
  checkbox: false,
  slider: 0
});
const validateOnEvents = ref<string[]>(["input", "change", "blur"]);
const validateOnForm = useTemplateRef("validateOnForm");
const validateOnSubmitted = ref("");
const validateOnItems = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' }
];
async function onValidateOnSubmit(event: FormSubmitEvent<ValidateOnSchema>) {
  validateOnSubmitted.value = JSON.stringify(event.data);
}
const validateOnCode = `<script setup lang="ts">
import { reactive, ref, useTemplateRef } from 'vue'
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  input: z.string({ message: 'Please enter your email' }).min(10, 'Must be at least 10 characters'),
  inputNumber: z.number({ message: 'Please enter a number' }).min(10, 'Must be at least 10'),
  textarea: z.string({ message: 'Please enter a message' }).min(10, 'Must be at least 10 characters'),
  select: z.string({ message: 'Please select an option' }).refine(value => value === 'option-2', { message: 'Please select Option 2' }),
  switch: z.boolean().refine(value => value === true, { message: 'Must be enabled' }),
  checkbox: z.boolean().refine(value => value === true, { message: 'Must be checked' }),
  inputTags: z.array(z.string(), { message: 'Please add at least one tag' }).min(1, 'Please add at least one tag'),
  slider: z.number().min(1, 'Must be greater than 0').max(20, 'Must be less than 20')
})

type Schema = z.input<typeof schema>

const state = reactive<Partial<Schema>>({
  switch: false,
  checkbox: false,
  slider: 0
})

const validateOn = ref<string[]>(['input', 'change', 'blur'])
const form = useTemplateRef('form')
const items = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' }
]

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data)
}
</` + `script>

<template>
  <UForm ref="form" :schema="schema" :state="state" :validate-on="validateOn" class="w-full" @submit="onSubmit">
    <div class="grid sm:grid-cols-2 gap-4">
      <UFormField size="xs" label="Input" name="input">
        <UInput v-model="state.input" placeholder="you@example.com" class="w-full" />
      </UFormField>

      <UFormField size="xs" name="inputNumber" label="InputNumber">
        <UInputNumber v-model="state.inputNumber" placeholder="Enter a number" class="w-full" />
      </UFormField>

      <UFormField size="xs" label="Textarea" name="textarea">
        <UTextarea v-model="state.textarea" placeholder="Write your message..." class="w-full" :rows="1" />
      </UFormField>

      <UFormField size="xs" name="select" label="Select">
        <USelect v-model="state.select" :items="items" placeholder="Choose an option" class="w-full" />
      </UFormField>

      <UFormField size="xs" name="switch" label="Switch">
        <USwitch v-model="state.switch" label="Switch me" />
      </UFormField>

      <UFormField size="xs" name="checkbox" label="Checkbox">
        <UCheckbox v-model="state.checkbox" label="Check me" />
      </UFormField>

      <UFormField size="xs" name="inputTags" label="InputTags">
        <UInputTags v-model="state.inputTags" placeholder="Add a tag..." class="w-full" />
      </UFormField>

      <UFormField size="xs" name="slider" label="Slider">
        <USlider v-model="state.slider" class="mt-2.5" />
      </UFormField>
    </div>

    <div class="flex gap-2 mt-4">
      <USelect v-model="validateOn" :items="['input','change','blur']" multiple placeholder="Validate on" class="w-48" />
      <UButton type="submit">Submit</UButton>
      <UButton variant="outline" @click="form?.clear()">Clear</UButton>
    </div>
  </UForm>
</template>`;

// Error event
const errorEventState = reactive({
  email: undefined as string | undefined,
  password: undefined as string | undefined,
});
const errorEventMessage = ref("");
function validateErrorEvent(state: Partial<typeof errorEventState>): FormError[] {
  const errors: FormError[] = [];
  if (!state.email) errors.push({ name: "email", message: "Email is required" });
  if (!state.password) errors.push({ name: "password", message: "Password is required" });
  return errors;
}
async function onErrorEventSubmit(event: FormSubmitEvent<typeof errorEventState>) {
  errorEventMessage.value = `Submitted: ${JSON.stringify(event.data)}`;
}
async function onErrorEvent(event: FormErrorEvent) {
  const first = event?.errors?.[0];
  if (first?.id) {
    const element = document.getElementById(first.id);
    element?.focus();
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
    errorEventMessage.value = `Focused first error: ${first.message}`;
  }
}
const errorEventCode = `<script setup lang="ts">
import { reactive } from 'vue'
import type { FormError, FormErrorEvent, FormSubmitEvent } from '@nuxt/ui'

const state = reactive({ email: undefined, password: undefined })

function validate(state: Partial<typeof state>): FormError[] {
  const errors: FormError[] = []
  if (!state.email) errors.push({ name: 'email', message: 'Required' })
  if (!state.password) errors.push({ name: 'password', message: 'Required' })
  return errors
}

async function onSubmit(event: FormSubmitEvent<typeof state>) {
  console.log(event.data)
}

async function onError(event: FormErrorEvent) {
  if (event?.errors?.[0]?.id) {
    const element = document.getElementById(event.errors[0].id)
    element?.focus()
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
</` + `script>

<template>
  <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit" @error="onError">
    <UFormField size="xs" label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormField>
    <UFormField size="xs" label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormField>
    <UButton type="submit">Submit</UButton>
  </UForm>
</template>`;

// HTML5 validation
const html5State = reactive({
  email: undefined as string | undefined,
  age: undefined as number | undefined,
});
const html5Form = useTemplateRef<HTMLFormElement>("html5Form");
const html5Submitted = ref("");
async function onHtml5Submit(event: FormSubmitEvent<typeof html5State>) {
  html5Submitted.value = JSON.stringify(event.data);
}
const html5Code = `<script setup lang="ts">
import { reactive, useTemplateRef } from 'vue'
import type { FormSubmitEvent } from '@nuxt/ui'

const state = reactive({ email: undefined, age: undefined })
const form = useTemplateRef('form')

async function onSubmit(event: FormSubmitEvent<typeof state>) {
  console.log(event.data)
}
</` + `script>

<template>
  <div class="space-y-4">
    <UForm ref="form" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField size="xs" label="Email" name="email">
        <UInput v-model="state.email" type="email" required />
      </UFormField>
      <UFormField size="xs" label="Age" name="age">
        <UInput v-model="state.age" type="number" min="18" max="100" required />
      </UFormField>
    </UForm>
    <UButton @click="form?.submit()">Submit</UButton>
  </div>
</template>`;

// Nested forms
const nestedSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  news: z.boolean().default(false),
});
type NestedSchema = z.output<typeof nestedSchema>;
const nestedEmailSchema = z.object({
  email: z.string().email("Invalid email"),
});
type NestedEmailSchema = z.output<typeof nestedEmailSchema>;
const nestedState = reactive<Partial<NestedSchema & NestedEmailSchema>>({});
const nestedSubmitted = ref("");
async function onNestedSubmit(event: FormSubmitEvent<NestedSchema>) {
  nestedSubmitted.value = JSON.stringify(event.data);
}
const nestedCode = `<UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
  <UFormField size="xs" label="Name" name="name">
    <UInput v-model="state.name" />
  </UFormField>

  <UCheckbox v-model="state.news" name="news" label="Subscribe to newsletter" />

  <UForm v-if="state.news" :schema="emailSchema" nested>
    <UFormField size="xs" label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormField>
  </UForm>

  <UButton type="submit">Submit</UButton>
</UForm>`;
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">A simple form using the <code>validate</code> prop with custom validation logic and the <code>@submit</code> event.</p>
      <CodeCollapsible :code="basicCode">
        <div class="demo-col">
          <UForm :validate="validateBasic" :state="basicState" class="space-y-4" @submit="onBasicSubmit">
            <UFormField size="xs" label="Email" name="email">
              <UInput v-model="basicState.email" />
            </UFormField>
            <UFormField size="xs" label="Password" name="password">
              <UInput v-model="basicState.password" type="password" />
            </UFormField>
            <UButton type="submit">Submit</UButton>
          </UForm>
          <p v-if="basicSubmitted" class="demo-result">Submitted: {{ basicSubmitted }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Schema validation</h3>
      <p class="demo-description">Use a <a href="https://github.com/standard-schema/standard-schema" target="_blank" rel="noopener">Standard Schema</a> library like Zod to validate the form state.</p>
      <CodeCollapsible :code="schemaCode">
        <div class="demo-col">
          <UForm :schema="loginSchema" :state="loginState" class="space-y-4" @submit="onLoginSubmit">
            <UFormField size="xs" label="Email" name="email">
              <UInput v-model="loginState.email" />
            </UFormField>
            <UFormField size="xs" label="Password" name="password">
              <UInput v-model="loginState.password" type="password" />
            </UFormField>
            <UButton type="submit">Submit</UButton>
          </UForm>
          <p v-if="loginSubmitted" class="demo-result">Submitted: {{ loginSubmitted }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Error pattern</h3>
      <p class="demo-description">Use <code>error-pattern</code> on <code>UFormField</code> to capture array-item errors (e.g. <code>tags.0</code>) under a single field.</p>
      <CodeCollapsible :code="errorPatternCode">
        <div class="demo-col">
          <UForm :schema="tagsSchema" :state="tagsState" class="space-y-4" @submit="onTagsSubmit">
            <UFormField size="xs" label="Email" name="email">
              <UInput v-model="tagsState.email" />
            </UFormField>
            <UFormField size="xs" label="Tags" name="tags" :error-pattern="/^tags\..+/">
              <UInputTags v-model="tagsState.tags" />
            </UFormField>
            <UButton type="submit">Submit</UButton>
          </UForm>
          <p v-if="tagsSubmitted" class="demo-result">Submitted: {{ tagsSubmitted }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Validate on</h3>
      <p class="demo-description">Control which input events trigger validation with the <code>validate-on</code> prop. The form always validates on submit.</p>
      <CodeCollapsible :code="validateOnCode">
        <div class="demo-col demo-col-wide">
          <USelect v-model="validateOnEvents" :items="['input','change','blur']" multiple placeholder="Select events" class="w-48" />
          <UForm ref="validateOnForm" :schema="validateOnSchema" :state="validateOnState" :validate-on="validateOnEvents as any" class="w-full" @submit="onValidateOnSubmit">
            <div class="grid sm:grid-cols-2 gap-4">
              <UFormField size="xs" label="Input" name="input">
                <UInput v-model="validateOnState.input" placeholder="you@example.com" class="w-full" />
              </UFormField>

              <UFormField size="xs" name="inputNumber" label="InputNumber">
                <UInputNumber v-model="validateOnState.inputNumber" placeholder="Enter a number" class="w-full" />
              </UFormField>

              <UFormField size="xs" label="Textarea" name="textarea">
                <UTextarea v-model="validateOnState.textarea" placeholder="Write your message..." class="w-full" :rows="1" />
              </UFormField>

              <UFormField size="xs" name="select" label="Select">
                <USelect v-model="validateOnState.select" :items="validateOnItems" placeholder="Choose an option" class="w-full" />
              </UFormField>

              <UFormField size="xs" name="switch" label="Switch">
                <USwitch v-model="validateOnState.switch" label="Switch me" />
              </UFormField>

              <UFormField size="xs" name="checkbox" label="Checkbox">
                <UCheckbox v-model="validateOnState.checkbox" label="Check me" />
              </UFormField>

              <UFormField size="xs" name="inputTags" label="InputTags">
                <UInputTags v-model="validateOnState.inputTags" placeholder="Add a tag..." class="w-full" />
              </UFormField>

              <UFormField size="xs" name="slider" label="Slider">
                <USlider v-model="validateOnState.slider" class="mt-2.5" />
              </UFormField>
            </div>

            <div class="flex gap-2 mt-4">
              <UButton type="submit">Submit</UButton>
              <UButton variant="outline" @click="validateOnForm?.clear()">Clear</UButton>
            </div>
          </UForm>
          <p v-if="validateOnSubmitted" class="demo-result">Submitted: {{ validateOnSubmitted }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Error event</h3>
      <p class="demo-description">Listen to the <code>@error</code> event to react when validation fails, such as focusing the first invalid field.</p>
      <CodeCollapsible :code="errorEventCode">
        <div class="demo-col">
          <UForm :validate="validateErrorEvent" :state="errorEventState" class="space-y-4" @submit="onErrorEventSubmit" @error="onErrorEvent">
            <UFormField size="xs" label="Email" name="email">
              <UInput v-model="errorEventState.email" />
            </UFormField>
            <UFormField size="xs" label="Password" name="password">
              <UInput v-model="errorEventState.password" type="password" />
            </UFormField>
            <UButton type="submit">Submit</UButton>
          </UForm>
          <p v-if="errorEventMessage" class="demo-result">{{ errorEventMessage }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>HTML5 validation</h3>
      <p class="demo-description">Call the exposed <code>submit()</code> method programmatically to trigger native HTML5 validation before submission.</p>
      <CodeCollapsible :code="html5Code">
        <div class="demo-col">
          <div class="space-y-4">
            <UForm ref="html5Form" :state="html5State" class="space-y-4" @submit="onHtml5Submit">
              <UFormField size="xs" label="Email" name="email">
                <UInput v-model="html5State.email" type="email" required />
              </UFormField>
              <UFormField size="xs" label="Age" name="age">
                <UInput v-model="html5State.age" type="number" min="18" max="100" required />
              </UFormField>
            </UForm>
            <UButton @click="html5Form?.submit()">Submit</UButton>
          </div>
          <p v-if="html5Submitted" class="demo-result">Submitted: {{ html5Submitted }}</p>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Nested forms</h3>
      <p class="demo-description">Use <code>nested</code> and <code>name</code> to link child forms to a parent form's validation and state.</p>
      <CodeCollapsible :code="nestedCode">
        <div class="demo-col">
          <UForm :schema="nestedSchema" :state="nestedState" class="space-y-4" @submit="onNestedSubmit">
            <UFormField size="xs" label="Name" name="name">
              <UInput v-model="nestedState.name" />
            </UFormField>
            <UCheckbox v-model="nestedState.news" name="news" label="Subscribe to newsletter" />
            <UForm v-if="nestedState.news" :schema="nestedEmailSchema" nested>
              <UFormField size="xs" label="Email" name="email">
                <UInput v-model="nestedState.email" />
              </UFormField>
            </UForm>
            <UButton type="submit">Submit</UButton>
          </UForm>
          <p v-if="nestedSubmitted" class="demo-result">Submitted: {{ nestedSubmitted }}</p>
        </div>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.demo-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
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
.demo-description {
  font-size: 13px;
  color: var(--sl-color-text-light);
  margin: 0;
  line-height: 1.5;
}
.demo-description code {
  font-size: 12px;
  background: var(--color-surface-muted, #F3F4F6);
  padding: 2px 6px;
  border-radius: 4px;
}
.demo-col {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 320px;
}
.demo-result {
  font-size: 13px;
  color: var(--color-foreground-secondary, #4B5563);
  word-break: break-all;
}
</style>
