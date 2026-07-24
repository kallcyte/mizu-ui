<script setup lang="ts">
import CodeCollapsible from "./CodeCollapsible.vue";
import { h, ref } from 'vue'

const toast = useToast();
const { add: toastAdd, update: toastUpdate } = toast;
const stackedMode = ref(false);
const toastPosition = ref<string | undefined>(undefined);

const positions = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const;

function showToast(opts: Record<string, any>) {
  toastAdd({
    title: opts.title ?? "Toast notification",
    description: opts.description ?? "This is a toast notification.",
    color: opts.color ?? "primary",
    ...opts,
  });
}
</script>

<template>
  <UToaster :expand="!stackedMode" :position="toastPosition">
    <div class="not-content demo-isolated demo-examples">
      <!-- Colors -->
      <section class="example-section">
        <h3>Colors</h3>
        <p class="demo-description">Display temporary notifications with the <code>color</code> prop — supports <code>success</code>, <code>error</code>, <code>info</code>, <code>warning</code>, and <code>neutral</code>.</p>
        <CodeCollapsible :code="`const toast = useToast()

toast.add({
  title: 'Success',
  description: 'Operation completed successfully.',
  color: 'success'
})`">
          <div class="demo-row">
            <UButton label="Success" color="success" @click="showToast({ title: 'Success', description: 'Operation completed successfully.', color: 'success' })" />
            <UButton label="Error" color="error" @click="showToast({ title: 'Error', description: 'Something went wrong.', color: 'error' })" />
            <UButton label="Info" color="info" @click="showToast({ title: 'Info', description: 'Here is some information.', color: 'info' })" />
            <UButton label="Warning" color="warning" @click="showToast({ title: 'Warning', description: 'Please be careful.', color: 'warning' })" />
            <UButton label="Neutral" color="neutral" @click="showToast({ title: 'Neutral', description: 'A neutral notification.', color: 'neutral' })" />
          </div>
        </CodeCollapsible>
      </section>

      <!-- With Icon -->
      <section class="example-section">
        <h3>With Icon</h3>
        <p class="demo-description">Add a leading icon via the <code>icon</code> field to give visual context to the notification.</p>
        <CodeCollapsible :code="`toast.add({
  title: 'Event added to calendar',
  description: 'This event is scheduled for Mar 15, 2025.',
  icon: 'i-lucide-calendar-days'
})`">
          <div class="demo-row">
            <UButton label="Calendar" color="neutral" variant="outline" icon="i-lucide-calendar-days" @click="showToast({ title: 'Event added to calendar', description: 'This event is scheduled for Mar 15, 2025.', icon: 'i-lucide-calendar-days' })" />
            <UButton label="Upload" color="neutral" variant="outline" icon="i-lucide-cloud-upload" @click="showToast({ title: 'Upload started', description: 'Your file is being uploaded.', icon: 'i-lucide-cloud-upload' })" />
            <UButton label="Trash" color="neutral" variant="outline" icon="i-lucide-trash-2" @click="showToast({ title: 'Item deleted', description: 'The item has been removed.', icon: 'i-lucide-trash-2' })" />
          </div>
        </CodeCollapsible>
      </section>

      <!-- Avatar -->
      <section class="example-section">
        <h3>Avatar</h3>
        <p class="demo-description">Show a leading avatar via the <code>avatar</code> field — useful for user-related notifications.</p>
        <CodeCollapsible :code="`toast.add({
  title: 'User invited',
  description: 'User was invited to the team.',
  avatar: { src: 'https://github.com/nuxt.png', alt: 'User' }
})`">
          <div class="demo-row">
            <UButton label="Invite User" color="neutral" variant="outline" icon="i-lucide-user-plus" @click="showToast({ title: 'User invited', description: 'User was invited to the team.', avatar: { src: 'https://github.com/nuxt.png', alt: 'User' } })" />
          </div>
        </CodeCollapsible>
      </section>

      <!-- With Actions -->
      <section class="example-section">
        <h3>With Actions</h3>
        <p class="demo-description">Add interactive buttons via the <code>actions</code> field, useful for undo or retry operations.</p>
        <CodeCollapsible :code="`toast.add({
  title: 'Uh oh! Something went wrong.',
  description: 'There was a problem with your request.',
  actions: [{
    label: 'Retry',
    color: 'neutral',
    variant: 'outline',
    onClick: () => { /* retry logic */ }
  }]
})`">
          <div class="demo-row">
            <UButton label="Toast with Action" color="neutral" variant="outline" @click="showToast({ title: 'Item saved', description: 'Your changes have been saved.', actions: [{ label: 'Undo', color: 'neutral', variant: 'ghost', onClick: () => {} }] })" />
          </div>
        </CodeCollapsible>
      </section>

      <!-- Orientation -->
      <section class="example-section">
        <h3>Orientation</h3>
        <p class="demo-description">Change layout between content and actions via <code>orientation</code> — <code>vertical</code> places actions below, <code>horizontal</code> places them beside the close button.</p>
        <CodeCollapsible :code="`toast.add({
  title: 'File saved',
  description: 'Your changes have been saved.',
  orientation: 'horizontal',
  actions: [{ label: 'Undo', color: 'neutral', variant: 'ghost' }]
})`">
          <div class="demo-row">
            <UButton label="Horizontal" color="neutral" variant="outline" @click="showToast({ title: 'File saved', description: 'Your changes have been saved.', orientation: 'horizontal', actions: [{ label: 'Undo', color: 'neutral', variant: 'ghost', onClick: () => {} }] })" />
            <UButton label="Vertical" color="neutral" variant="outline" @click="showToast({ title: 'File saved', description: 'Your changes have been saved.', orientation: 'vertical', actions: [{ label: 'Undo', color: 'neutral', variant: 'ghost', onClick: () => {} }] })" />
          </div>
        </CodeCollapsible>
      </section>

      <!-- Duration -->
      <section class="example-section">
        <h3>Duration</h3>
        <p class="demo-description">Control how long the toast stays visible via <code>duration</code> (in ms). Set to <code>0</code> for persistent toasts that require manual dismissal.</p>
        <CodeCollapsible :code="`// Auto-dismiss after 2 seconds
toast.add({ title: 'Quick toast', duration: 2000 })

// Persistent (must be manually closed)
toast.add({ title: 'Persistent toast', duration: 0 })`">
          <div class="demo-row">
            <UButton label="2s duration" color="neutral" variant="outline" @click="showToast({ title: 'Quick toast', description: 'Dismisses in 2 seconds.', duration: 2000 })" />
            <UButton label="Persistent" color="neutral" variant="outline" @click="showToast({ title: 'Persistent toast', description: 'Click X to dismiss.', duration: 0 })" />
          </div>
        </CodeCollapsible>
      </section>

      <!-- Progress -->
      <section class="example-section">
        <h3>Progress</h3>
        <p class="demo-description">Show or hide the progress bar via <code>progress</code>. Set to <code>false</code> to hide, or pass an object to customize the progress color.</p>
        <CodeCollapsible :code="`// Hide progress bar
toast.add({ title: 'No progress', progress: false })

// Custom progress color
toast.add({ title: 'Custom', progress: { color: 'success' } })`">
          <div class="demo-row">
            <UButton label="No Progress" color="neutral" variant="outline" @click="showToast({ title: 'No progress bar', description: 'No progress indicator.', progress: false })" />
            <UButton label="Custom Progress" color="neutral" variant="outline" @click="showToast({ title: 'Custom progress', description: 'Custom progress color.', progress: { color: 'success' } })" />
          </div>
        </CodeCollapsible>
      </section>

      <!-- Close Button -->
      <section class="example-section">
        <h3>Close Button</h3>
        <p class="demo-description">Customize the close button via the <code>close</code> field. Pass an object to customize <code>UButton</code> props, or <code>false</code> to hide.</p>
        <CodeCollapsible :code="`toast.add({
  title: 'Custom close',
  close: { color: 'primary', variant: 'outline', class: 'rounded-full' }
})`">
          <div class="demo-row">
            <UButton label="Custom Close" color="neutral" variant="outline" @click="showToast({ title: 'Custom close', description: 'Close button is customized.', close: { color: 'primary', variant: 'outline', class: 'rounded-full' } })" />
          </div>
        </CodeCollapsible>
      </section>

      <!-- Close Icon -->
      <section class="example-section">
        <h3>Close Icon</h3>
        <p class="demo-description">Customize the close button icon via the <code>closeIcon</code> field. Defaults to <code>i-lucide-x</code>.</p>
        <CodeCollapsible :code="`toast.add({
  title: 'Custom close icon',
  closeIcon: 'i-lucide-x-circle'
})`">
          <div class="demo-row">
            <UButton label="Custom Close Icon" color="neutral" variant="outline" @click="showToast({ title: 'Custom close icon', description: 'Close icon is customized.', closeIcon: 'i-lucide-x-circle' })" />
          </div>
        </CodeCollapsible>
      </section>

      <!-- Deduplicated Toasts -->
      <section class="example-section">
        <h3>Deduplicated Toasts</h3>
        <p class="demo-description">Pass an <code>id</code> field to <code>toast.add()</code>. If a toast with that <code>id</code> already exists, it pulses instead of creating a duplicate.</p>
        <CodeCollapsible :code="`toast.add({
  id: 'copy',
  title: 'Copied to clipboard',
  icon: 'i-lucide-circle-check',
  duration: 0
})`">
          <div class="demo-row">
            <UButton label="Copy" color="neutral" variant="outline" icon="i-lucide-copy" @click="toastAdd({ id: 'copy', title: 'Copied to clipboard', icon: 'i-lucide-circle-check', duration: 0 })" />
          </div>
        </CodeCollapsible>
      </section>

      <!-- With Callback -->
      <section class="example-section">
        <h3>With Callback</h3>
        <p class="demo-description">Pass an <code>onUpdate:open</code> callback to react when the toast closes. Use <code>toast.update()</code> to transform the toast content after it expires.</p>
        <CodeCollapsible :code="`const t = toast.add({
  title: 'Uploading file...',
  description: 'Your file is being uploaded.',
  icon: 'i-lucide-cloud-upload',
  duration: 3000,
  'onUpdate:open': (open: boolean) => {
    if (open) return
    toast.update(t.id, {
      title: 'File uploaded!',
      description: 'Your file has been successfully uploaded.',
      icon: 'i-lucide-check',
      color: 'success',
      'onUpdate:open': undefined
    })
  }
})`">
          <div class="demo-row">
            <UButton label="Upload" color="neutral" variant="outline" icon="i-lucide-cloud-upload" @click="(() => { const t = toastAdd({ title: 'Uploading file...', description: 'Your file is being uploaded.', icon: 'i-lucide-cloud-upload', duration: 3000, 'onUpdate:open': (open: boolean) => { if (open) return; toastUpdate(t.id, { title: 'File uploaded!', description: 'Your file has been successfully uploaded.', icon: 'i-lucide-check', color: 'success', 'onUpdate:open': undefined }); } }); })()" />
          </div>
        </CodeCollapsible>
      </section>

      <!-- With HTML Content -->
      <section class="example-section">
        <h3>With HTML Content</h3>
        <p class="demo-description">Use Vue's <code>h()</code> render function in <code>title</code> or <code>description</code> to render styled HTML elements or Vue components.</p>
        <CodeCollapsible :code="`import { h } from 'vue'

toast.add({
  title: h('span', {}, [
    'Item ',
    h('span', { class: 'text-primary font-bold' }, '#15'),
    ' deleted'
  ]),
  description: h('span', {}, [
    'You have successfully deleted the item from your ',
    h('span', { class: 'font-bold' }, 'account'),
    '.'
  ]),
  icon: 'i-lucide-trash-2'
})`">
          <div class="demo-row">
            <UButton label="Delete Item" color="error" variant="outline" icon="i-lucide-trash-2" @click="toastAdd({ title: h('span', {}, ['Item ', h('span', { class: 'text-primary font-bold' }, '#15'), ' deleted']), description: h('span', {}, ['You have successfully deleted the item from your ', h('span', { class: 'font-bold' }, 'account'), '.']), icon: 'i-lucide-trash-2' })" />
          </div>
        </CodeCollapsible>
      </section>

      <!-- Stacked Toasts (expand: false) -->
      <section class="example-section">
        <h3>Stacked Toasts (Sonner-style)</h3>
        <p class="demo-description">Toggle <code>:expand</code> on <code>UToaster</code> to switch between expanded and stacked modes. In stacked mode, toasts overlap with a scale/translate effect (inspired by Sonner). Hover over the toasts area to expand them and pause the timer.</p>
        <CodeCollapsible :code="`<UToaster :expand='false'>
  <UButton label='Add toast' @click='toast.add({
    title: 'Stacked toast',
    description: 'This toast is stacked.',
    icon: 'i-lucide-layers'
  })' />
</UToaster>`">
          <div class="demo-row">
            <UButton
              :label="stackedMode ? 'Disable Stacked Mode' : 'Enable Stacked Mode'"
              :color="stackedMode ? 'primary' : 'neutral'"
              variant="outline"
              :icon="stackedMode ? 'i-lucide-layers' : 'i-lucide-list'"
              @click="stackedMode = !stackedMode"
            />
            <UButton label="Show Toast" color="neutral" variant="outline" icon="i-lucide-plus" @click="toastAdd({ title: 'Stacked toast', description: 'Toasts stack with overlap when :expand=false.', icon: 'i-lucide-layers' })" />
          </div>
        </CodeCollapsible>
      </section>

      <!-- Position -->
      <section class="example-section">
        <h3>Position</h3>
        <p class="demo-description">Change the toast viewport position via the <code>position</code> prop on <code>UToaster</code>. Valid values: <code>top-left</code>, <code>top-center</code>, <code>top-right</code>, <code>bottom-left</code>, <code>bottom-center</code>, <code>bottom-right</code>.</p>
        <CodeCollapsible :code="`<UToaster position='bottom-right'>
  <UButton label='Show toast' @click='toast.add({
    title: 'Bottom-right toast',
    description: 'This toast appears at the bottom right.',
    icon: 'i-lucide-map-pin'
  })' />
</UToaster>`">
          <div class="demo-positions">
            <UButton
              v-for="pos in positions"
              :key="pos"
              :label="pos"
              :color="toastPosition === pos ? 'primary' : 'neutral'"
              :variant="toastPosition === pos ? 'solid' : 'outline'"
              size="sm"
              class="position-btn"
              @click="toastPosition = toastPosition === pos ? undefined : pos"
            />
          </div>
          <div class="demo-row" style="margin-top: 8px;">
            <UButton label="Show Toast" color="neutral" variant="outline" icon="i-lucide-map-pin" @click="toastAdd({ title: 'Positioned toast', description: `Toast at ${toastPosition || 'default'} position.`, icon: 'i-lucide-map-pin' })" />
            <UButton
              v-if="toastPosition"
              label="Reset Position"
              color="neutral"
              variant="ghost"
              size="sm"
              icon="i-lucide-rotate-ccw"
              @click="toastPosition = undefined"
            />
          </div>
        </CodeCollapsible>
      </section>
    </div>
  </UToaster>
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
.demo-row {
  all: revert;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}
.demo-positions {
  all: revert;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  max-width: 420px;
}
.demo-positions .position-btn {
  text-transform: capitalize;
  font-size: 11px;
}
</style>
