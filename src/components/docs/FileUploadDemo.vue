<script setup lang="ts">
import { ref } from "vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const singleFile = ref<File | null>(null);
const multipleFiles = ref<File[]>([]);
const imageFile = ref<File | null>(null);
const listLayoutFiles = ref<File[]>([]);
const insidePositionFiles = ref<File[]>([]);
</script>

<template>
  <div class="not-content demo-isolated demo-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <p class="demo-description">Simple file upload with default drop zone. Click or drag files to upload.</p>
      <CodeCollapsible :code="`<UFileUpload v-model=&quot;value&quot; />`">
        <div class="demo-col">
          <UFileUpload v-model="singleFile" class="w-full min-h-48" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Multiple files</h3>
      <p class="demo-description">Allows uploading multiple files at once with the <code>multiple</code> prop.</p>
      <CodeCollapsible :code="`<UFileUpload v-model=&quot;value&quot; multiple />`">
        <div class="demo-col">
          <UFileUpload v-model="multipleFiles" multiple class="w-full min-h-48" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Accept file types</h3>
      <p class="demo-description">Restricts file selection to specific types using the <code>accept</code> prop. Here we only accept image files.</p>
      <CodeCollapsible :code="`<UFileUpload v-model=&quot;value&quot; accept=&quot;image/*&quot; />`">
        <div class="demo-col">
          <UFileUpload v-model="imageFile" accept="image/*" class="w-full min-h-48" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Label and description</h3>
      <p class="demo-description">Adds custom text to guide users on what to upload and any constraints.</p>
      <CodeCollapsible :code="`<UFileUpload label=&quot;Drop your image here&quot; description=&quot;SVG, PNG, JPG or GIF (max. 2MB)&quot; icon=&quot;i-lucide-image&quot; />`">
        <div class="demo-col">
          <UFileUpload
            v-model="singleFile"
            label="Drop your image here"
            description="SVG, PNG, JPG or GIF (max. 2MB)"
            icon="i-lucide-image"
            class="w-full min-h-48"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Dropzone disabled</h3>
      <p class="demo-description">Disables drag-and-drop functionality. Users can only select files by clicking.</p>
      <CodeCollapsible :code="`<UFileUpload :dropzone=&quot;false&quot; label=&quot;Upload files&quot; description=&quot;Click to select files&quot; class=&quot;w-full min-h-48&quot; />`">
        <div class="demo-col">
          <UFileUpload
            v-model="singleFile"
            :dropzone="false"
            label="Upload files"
            description="Click to select files"
            class="w-full min-h-48"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Interactive disabled</h3>
      <p class="demo-description">Disables click interaction on the drop zone. Use the <code>#actions</code> slot to provide a custom upload button.</p>
      <CodeCollapsible :code="`<UFileUpload :interactive=&quot;false&quot; multiple layout=&quot;list&quot; label=&quot;Drop your images here&quot; description=&quot;SVG, PNG, JPG or GIF (max. 2MB)&quot; class=&quot;w-full min-h-48&quot;>
  <template #actions=&quot;{ open }&quot;>
    <UButton label=&quot;Select images&quot; icon=&quot;i-lucide-upload&quot; color=&quot;neutral&quot; variant=&quot;outline&quot; @click=&quot;open()&quot; />
  </template>
</UFileUpload>`">
        <div class="demo-col">
          <UFileUpload
            v-model="multipleFiles"
            :interactive="false"
            multiple
            layout="list"
            label="Drop your images here"
            description="SVG, PNG, JPG or GIF (max. 2MB)"
            class="w-full min-h-48"
          >
            <template #actions="{ open }">
              <UButton label="Select images" icon="i-lucide-upload" color="neutral" variant="outline" @click="open()" />
            </template>
          </UFileUpload>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Sizes</h3>
      <p class="demo-description">Shows all five size variants: extra small, small, medium (default), large, and extra large.</p>
      <CodeCollapsible :code="`<UFileUpload size=&quot;xs&quot; label=&quot;Extra small&quot; />
<UFileUpload size=&quot;sm&quot; label=&quot;Small&quot; />
<UFileUpload size=&quot;md&quot; label=&quot;Medium&quot; />
<UFileUpload size=&quot;lg&quot; label=&quot;Large&quot; />
<UFileUpload size=&quot;xl&quot; label=&quot;Extra large&quot; />`">
        <div class="demo-col">
          <UFileUpload v-model="singleFile" size="xs" label="Extra small" class="w-full min-h-48" />
          <UFileUpload v-model="singleFile" size="sm" label="Small" class="w-full min-h-48" />
          <UFileUpload v-model="singleFile" size="md" label="Medium" class="w-full min-h-48" />
          <UFileUpload v-model="singleFile" size="lg" label="Large" class="w-full min-h-48" />
          <UFileUpload v-model="singleFile" size="xl" label="Extra large" class="w-full min-h-48" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Icon</h3>
      <p class="demo-description">Customizes the upload icon to provide visual context for the file type.</p>
      <CodeCollapsible :code="`<UFileUpload icon=&quot;i-lucide-image&quot; label=&quot;Drop your image here&quot; description=&quot;SVG, PNG, JPG or GIF (max. 2MB)&quot; class=&quot;w-full min-h-48&quot; />`">
        <div class="demo-col">
          <UFileUpload
            v-model="singleFile"
            icon="i-lucide-image"
            label="Drop your image here"
            description="SVG, PNG, JPG or GIF (max. 2MB)"
            class="w-full min-h-48"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Color</h3>
      <p class="demo-description">Changes the color scheme and uses the <code>highlight</code> prop to show the focus state, commonly used for validation errors.</p>
      <CodeCollapsible :code="`<UFileUpload color=&quot;neutral&quot; highlight label=&quot;Drop your image here&quot; description=&quot;SVG, PNG, JPG or GIF (max. 2MB)&quot; class=&quot;w-full min-h-48&quot; />`">
        <div class="demo-col">
          <UFileUpload
            v-model="singleFile"
            color="neutral"
            highlight
            label="Drop your image here"
            description="SVG, PNG, JPG or GIF (max. 2MB)"
            class="w-full min-h-48"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Button variant</h3>
      <p class="demo-description">Alternative button-style upload interface. Use when you want a more compact upload control.</p>
      <CodeCollapsible :code="`<UFileUpload v-model=&quot;value&quot; variant=&quot;button&quot; />`">
        <div class="demo-col">
          <UFileUpload v-model="singleFile" variant="button" class="w-full" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>List layout</h3>
      <p class="demo-description">Displays files in a list instead of the default grid layout. Useful for longer file names or when you want a more traditional file list appearance.</p>
      <CodeCollapsible :code="`<UFileUpload layout=&quot;list&quot; multiple label=&quot;Drop your files here&quot; />`">
        <div class="demo-col">
          <UFileUpload
            v-model="listLayoutFiles"
            layout="list"
            multiple
            label="Drop your files here"
            class="w-full min-h-48"
          />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Position inside</h3>
      <p class="demo-description">Shows files inside the drop zone instead of below it. Only works when <code>variant</code> is <code>area</code> and <code>layout</code> is <code>list</code>.</p>
      <CodeCollapsible :code="`<UFileUpload position=&quot;inside&quot; layout=&quot;list&quot; multiple label=&quot;Drop your files here&quot; />`">
        <div class="demo-col">
          <UFileUpload
            v-model="insidePositionFiles"
            position="inside"
            layout="list"
            multiple
            label="Drop your files here"
            class="w-full min-h-48"
          />
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
  all: revert;
  font-size: 13px;
  color: var(--color-foreground-secondary, #4B5563);
  margin: 0;
  line-height: 1.5;
}
.demo-description code {
  all: revert;
  background: var(--color-surface-muted, #F3F4F6);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  font-family: "JetBrains Mono", "Fira Code", monospace;
}
.demo-row {
  all: revert;
  display: flex;
  align-items: center;
  gap: 8px;
}
.demo-col {
  all: revert;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  max-width: 400px;
}
</style>
