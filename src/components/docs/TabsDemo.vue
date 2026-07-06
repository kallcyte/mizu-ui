<script setup lang="ts">
import { ref, watch } from "vue";
import {
  MizuTabsRoot,
  MizuTabsList,
  MizuTabsTrigger,
  MizuTabsContent,
  MizuButton,
  MizuSelect,
} from "@mizu/vue";
import DemoTabs from "./DemoTabs.vue";

const activeProfileTab = ref("general");

const selectedColor = ref("primary");
const colorOptions = [
  { value: "primary", label: "Primary" },
  { value: "accent", label: "Accent" },
  { value: "error", label: "Error" },
  { value: "success", label: "Success" },
  { value: "warning", label: "Warning" },
  { value: "info", label: "Info" },
  { value: "neutral", label: "Neutral" },
];

const asyncTab = ref("users");
const asyncData = ref<Record<string, string[]>>({});
const asyncLoading = ref(false);

watch(asyncTab, (tab) => {
  if (asyncData.value[tab]) return;
  asyncLoading.value = true;
  setTimeout(() => {
    const mock: Record<string, string[]> = {
      users: ["Alice Chen — Admin", "Bob Martinez — Editor", "Carol Johnson — Viewer"],
      projects: ["Mizu Design System — Active", "Customer Portal — Review", "Mobile App — Archived"],
      reports: ["Q2 Revenue: $142K ↑12%", "User Growth: 8,420 ↑5%", "Churn Rate: 2.1% ↓0.3%"],
    };
    asyncData.value = { ...asyncData.value, [tab]: mock[tab] };
    asyncLoading.value = false;
  }, 1200);
});

const horizontalCode = `<MizuTabsRoot default-value="account">
  <MizuTabsList>
    <MizuTabsTrigger value="account">Account</MizuTabsTrigger>
    <MizuTabsTrigger value="password">Password</MizuTabsTrigger>
    <MizuTabsTrigger value="settings">Settings</MizuTabsTrigger>
  </MizuTabsList>
  <MizuTabsContent value="account">
    <p>Manage your account details and preferences.</p>
  </MizuTabsContent>
  <MizuTabsContent value="password">
    <p>Update your password and security settings.</p>
  </MizuTabsContent>
  <MizuTabsContent value="settings">
    <p>Configure application-wide settings.</p>
  </MizuTabsContent>
</MizuTabsRoot>`;

const verticalCode = `<MizuTabsRoot default-value="tab1" orientation="vertical">
  <MizuTabsList>
    <MizuTabsTrigger value="tab1">Tab One</MizuTabsTrigger>
    <MizuTabsTrigger value="tab2">Tab Two</MizuTabsTrigger>
    <MizuTabsTrigger value="tab3">Tab Three</MizuTabsTrigger>
  </MizuTabsList>
  <MizuTabsContent value="tab1">
    <p>Content for tab one.</p>
  </MizuTabsContent>
  <MizuTabsContent value="tab2">
    <p>Content for tab two.</p>
  </MizuTabsContent>
  <MizuTabsContent value="tab3">
    <p>Content for tab three.</p>
  </MizuTabsContent>
</MizuTabsRoot>`;

const disabledTabCode = `<MizuTabsRoot default-value="billing">
  <MizuTabsList>
    <MizuTabsTrigger value="billing">Billing</MizuTabsTrigger>
    <MizuTabsTrigger value="invoices">Invoices</MizuTabsTrigger>
    <MizuTabsTrigger value="history" disabled>History</MizuTabsTrigger>
  </MizuTabsList>
  <MizuTabsContent value="billing">
    <p>View and manage your billing information.</p>
  </MizuTabsContent>
  <MizuTabsContent value="invoices">
    <p>Access your past and current invoices.</p>
  </MizuTabsContent>
  <MizuTabsContent value="history">
    <p class="tab-body">This tab is disabled and cannot be accessed.</p>
  </MizuTabsContent>
</MizuTabsRoot>`;

const buttonGroupCode = `<MizuTabsRoot default-value="monthly">
  <MizuTabsList variant="button">
    <MizuTabsTrigger value="daily">Daily</MizuTabsTrigger>
    <MizuTabsTrigger value="weekly">Weekly</MizuTabsTrigger>
    <MizuTabsTrigger value="monthly">Monthly</MizuTabsTrigger>
    <MizuTabsTrigger value="yearly">Yearly</MizuTabsTrigger>
  </MizuTabsList>
  <MizuTabsContent value="daily">
    <p class="tab-body">View daily usage statistics and activity reports.</p>
  </MizuTabsContent>
  <MizuTabsContent value="weekly">
    <p class="tab-body">Review weekly performance summaries and team progress.</p>
  </MizuTabsContent>
  <MizuTabsContent value="monthly">
    <p class="tab-body">Analyze monthly trends, revenue, and growth metrics.</p>
  </MizuTabsContent>
  <MizuTabsContent value="yearly">
    <p class="tab-body">Access annual reports and year-over-year comparisons.</p>
  </MizuTabsContent>
</MizuTabsRoot>`;

const sizesUnderlineCode = `<div>
  <span class="size-label">Small</span>
  <MizuTabsRoot default-value="us-sm">
    <MizuTabsList size="sm">
      <MizuTabsTrigger value="us-sm">Account</MizuTabsTrigger>
      <MizuTabsTrigger value="us-sm2">Security</MizuTabsTrigger>
    </MizuTabsList>
    <MizuTabsContent value="us-sm">
      <p class="tab-body">Small underline content.</p>
    </MizuTabsContent>
    <MizuTabsContent value="us-sm2">
      <p class="tab-body">Small underline content two.</p>
    </MizuTabsContent>
  </MizuTabsRoot>
</div>
<div>
  <span class="size-label">Medium (default)</span>
  <MizuTabsRoot default-value="us-md">
    <MizuTabsList size="md">
      <MizuTabsTrigger value="us-md">Account</MizuTabsTrigger>
      <MizuTabsTrigger value="us-md2">Security</MizuTabsTrigger>
    </MizuTabsList>
    <MizuTabsContent value="us-md">
      <p class="tab-body">Medium underline content.</p>
    </MizuTabsContent>
    <MizuTabsContent value="us-md2">
      <p class="tab-body">Medium underline content two.</p>
    </MizuTabsContent>
  </MizuTabsRoot>
</div>
<div>
  <span class="size-label">Large</span>
  <MizuTabsRoot default-value="us-lg">
    <MizuTabsList size="lg">
      <MizuTabsTrigger value="us-lg">Account</MizuTabsTrigger>
      <MizuTabsTrigger value="us-lg2">Security</MizuTabsTrigger>
    </MizuTabsList>
    <MizuTabsContent value="us-lg">
      <p class="tab-body">Large underline content.</p>
    </MizuTabsContent>
    <MizuTabsContent value="us-lg2">
      <p class="tab-body">Large underline content two.</p>
    </MizuTabsContent>
  </MizuTabsRoot>
</div>`;

const sizesButtonCode = `<div>
  <span class="size-label">Small</span>
  <MizuTabsRoot default-value="bs-sm">
    <MizuTabsList size="sm" variant="button">
      <MizuTabsTrigger value="bs-sm">Tab One</MizuTabsTrigger>
      <MizuTabsTrigger value="bs-sm2">Tab Two</MizuTabsTrigger>
      <MizuTabsTrigger value="bs-sm3">Tab Three</MizuTabsTrigger>
    </MizuTabsList>
    <MizuTabsContent value="bs-sm">
      <p class="tab-body">Small size content.</p>
    </MizuTabsContent>
    <MizuTabsContent value="bs-sm2">
      <p class="tab-body">Small size content two.</p>
    </MizuTabsContent>
    <MizuTabsContent value="bs-sm3">
      <p class="tab-body">Small size content three.</p>
    </MizuTabsContent>
  </MizuTabsRoot>
</div>
<div>
  <span class="size-label">Medium (default)</span>
  <MizuTabsRoot default-value="bs-md">
    <MizuTabsList size="md" variant="button">
      <MizuTabsTrigger value="bs-md">Tab One</MizuTabsTrigger>
      <MizuTabsTrigger value="bs-md2">Tab Two</MizuTabsTrigger>
      <MizuTabsTrigger value="bs-md3">Tab Three</MizuTabsTrigger>
    </MizuTabsList>
    <MizuTabsContent value="bs-md">
      <p class="tab-body">Medium size content.</p>
    </MizuTabsContent>
    <MizuTabsContent value="bs-md2">
      <p class="tab-body">Medium size content two.</p>
    </MizuTabsContent>
    <MizuTabsContent value="bs-md3">
      <p class="tab-body">Medium size content three.</p>
    </MizuTabsContent>
  </MizuTabsRoot>
</div>
<div>
  <span class="size-label">Large</span>
  <MizuTabsRoot default-value="bs-lg">
    <MizuTabsList size="lg" variant="button">
      <MizuTabsTrigger value="bs-lg">Tab One</MizuTabsTrigger>
      <MizuTabsTrigger value="bs-lg2">Tab Two</MizuTabsTrigger>
      <MizuTabsTrigger value="bs-lg3">Tab Three</MizuTabsTrigger>
    </MizuTabsList>
    <MizuTabsContent value="bs-lg">
      <p class="tab-body">Large size content.</p>
    </MizuTabsContent>
    <MizuTabsContent value="bs-lg2">
      <p class="tab-body">Large size content two.</p>
    </MizuTabsContent>
    <MizuTabsContent value="bs-lg3">
      <p class="tab-body">Large size content three.</p>
    </MizuTabsContent>
  </MizuTabsRoot>
</div>`;

const profileSettingsCode = `<MizuTabsRoot v-model="activeProfileTab">
  <MizuTabsList>
    <MizuTabsTrigger value="general">General</MizuTabsTrigger>
    <MizuTabsTrigger value="notifications">
      Notifications
      <span class="tab-badge">3</span>
    </MizuTabsTrigger>
    <MizuTabsTrigger value="security">Security</MizuTabsTrigger>
    <MizuTabsTrigger value="integrations">Integrations</MizuTabsTrigger>
  </MizuTabsList>

  <MizuTabsContent value="general">
    <div class="tab-panel">
      <h4>General Settings</h4>
      <p>Manage your public profile information and how others see you on the platform.</p>

      <div class="field-group">
        <label class="field-label">Display Name</label>
        <p class="field-hint">This is the name that will be displayed across the platform and in your public profile.</p>
      </div>

      <div class="field-group">
        <label class="field-label">Email Address</label>
        <p class="field-hint">Your primary email is used for notifications and account recovery. You can add additional emails in Security settings.</p>
      </div>

      <div class="field-group">
        <label class="field-label">Bio</label>
        <p class="field-hint">Write a short bio about yourself. This will appear on your public profile and can be up to 160 characters.</p>
      </div>

      <div class="field-group">
        <label class="field-label">Language</label>
        <p class="field-hint">Select your preferred language for the interface. This affects all menus, buttons, and system messages.</p>
      </div>

      <div class="field-group">
        <label class="field-label">Timezone</label>
        <p class="field-hint">Used for scheduling, timestamps, and notification delivery times across the platform.</p>
      </div>

      <div class="actions">
        <MizuButton variant="outline" size="md">Cancel</MizuButton>
        <MizuButton size="md">Save Changes</MizuButton>
      </div>
    </div>
  </MizuTabsContent>

  <MizuTabsContent value="notifications">
    <div class="tab-panel">
      <h4>Notification Preferences</h4>
      <p>Control which notifications you receive and how they are delivered to you.</p>

      <div class="field-group">
        <label class="field-label">Email Notifications</label>
        <p class="field-hint">Receive email digests for important activity. You can choose between real-time, daily, or weekly summaries.</p>
      </div>

      <div class="field-group">
        <label class="field-label">Push Notifications</label>
        <p class="field-hint">Get browser push notifications for mentions, assignments, and direct messages. Requires browser permission.</p>
      </div>

      <div class="field-group">
        <label class="field-label">In-App Notifications</label>
        <p class="field-hint">Show a notification badge and dropdown panel within the application. These are always synced in real-time.</p>
      </div>

      <div class="field-group">
        <label class="field-label">Weekly Digest</label>
        <p class="field-hint">Receive a weekly summary of activity, new followers, and recommended content every Monday at 9:00 AM.</p>
      </div>

      <div class="field-group">
        <label class="field-label">Marketing Emails</label>
        <p class="field-hint">Occasional updates about new features, product announcements, and tips for getting the most out of the platform.</p>
      </div>

      <div class="actions">
        <MizuButton variant="outline" size="md">Cancel</MizuButton>
        <MizuButton size="md">Save Changes</MizuButton>
      </div>
    </div>
  </MizuTabsContent>

  <MizuTabsContent value="security">
    <div class="tab-panel">
      <h4>Security &amp; Privacy</h4>
      <p>Manage your password, two-factor authentication, and active sessions.</p>

      <div class="field-group">
        <label class="field-label">Password</label>
        <p class="field-hint">Last changed 45 days ago. We recommend updating your password every 90 days for security. Use a strong, unique password.</p>
      </div>

      <div class="field-group">
        <label class="field-label">Two-Factor Authentication</label>
        <p class="field-hint">Add an extra layer of security to your account. When enabled, you will need to enter a code from your authenticator app in addition to your password.</p>
      </div>

      <div class="field-group">
        <label class="field-label">Active Sessions</label>
        <p class="field-hint">You are currently signed in on 2 devices. Review and revoke any sessions you do not recognize. Sessions expire after 30 days of inactivity.</p>
      </div>

      <div class="field-group">
        <label class="field-label">Login Notifications</label>
        <p class="field-hint">Get notified when a new device signs into your account. Notifications are sent to your primary email address immediately.</p>
      </div>

      <div class="field-group">
        <label class="field-label">API Keys</label>
        <p class="field-hint">Manage API keys for programmatic access. Each key can be scoped to specific permissions and revoked independently.</p>
      </div>

      <div class="actions">
        <MizuButton variant="outline" size="md">Cancel</MizuButton>
        <MizuButton size="md">Save Changes</MizuButton>
      </div>
    </div>
  </MizuTabsContent>

  <MizuTabsContent value="integrations">
    <div class="tab-panel">
      <h4>Connected Integrations</h4>
      <p>Connect your account with third-party services and manage OAuth permissions.</p>

      <div class="field-group">
        <label class="field-label">GitHub</label>
        <p class="field-hint">Sync repositories, pull requests, and commit history. Enables code review features and automatic linking of PRs to tasks.</p>
      </div>

      <div class="field-group">
        <label class="field-label">Slack</label>
        <p class="field-hint">Receive notifications in Slack channels. Supports thread replies, mentions, and interactive slash commands.</p>
      </div>

      <div class="field-group">
        <label class="field-label">Google Calendar</label>
        <p class="field-hint">Sync deadlines and milestones with your calendar. Events are created automatically when tasks are assigned due dates.</p>
      </div>

      <div class="field-group">
        <label class="field-label">Figma</label>
        <p class="field-hint">Embed design files directly in tasks and receive updates when designs are modified. Supports real-time collaboration.</p>
      </div>

      <div class="field-group">
        <label class="field-label">Zapier</label>
        <p class="field-hint">Create custom workflows connecting to 5,000+ apps. Use triggers and actions to automate repetitive tasks.</p>
      </div>

      <div class="actions">
        <MizuButton variant="outline" size="md">Cancel</MizuButton>
        <MizuButton size="md">Save Changes</MizuButton>
      </div>
    </div>
  </MizuTabsContent>
</MizuTabsRoot>`;

const colorVariantsCode = `<MizuTabsRoot :key="selectedColor" defaultValue="tab1">
  <MizuTabsList :color="selectedColor">
    <MizuTabsTrigger value="tab1">Account</MizuTabsTrigger>
    <MizuTabsTrigger value="tab2">Password</MizuTabsTrigger>
    <MizuTabsTrigger value="tab3">Settings</MizuTabsTrigger>
  </MizuTabsList>
  <MizuTabsContent value="tab1">
    <p class="tab-body">Manage your account details using the <strong>{{ selectedColor }}</strong> color scheme.</p>
  </MizuTabsContent>
  <MizuTabsContent value="tab2">
    <p class="tab-body">Update your password and security settings.</p>
  </MizuTabsContent>
  <MizuTabsContent value="tab3">
    <p class="tab-body">Configure application settings and preferences.</p>
  </MizuTabsContent>
</MizuTabsRoot>`;

const asyncContentCode = `<MizuTabsRoot v-model="asyncTab" defaultValue="users">
  <MizuTabsList>
    <MizuTabsTrigger value="users">Users</MizuTabsTrigger>
    <MizuTabsTrigger value="projects">Projects</MizuTabsTrigger>
    <MizuTabsTrigger value="reports">Reports</MizuTabsTrigger>
  </MizuTabsList>
  <MizuTabsContent value="users">
    <div v-if="asyncLoading" class="async-loading">Loading…</div>
    <ul v-else-if="asyncData.users" class="async-list">
      <li v-for="item in asyncData.users" :key="item">{{ item }}</li>
    </ul>
    <p v-else class="tab-body">Select this tab to load data.</p>
  </MizuTabsContent>
  <MizuTabsContent value="projects">
    <div v-if="asyncLoading" class="async-loading">Loading…</div>
    <ul v-else-if="asyncData.projects" class="async-list">
      <li v-for="item in asyncData.projects" :key="item">{{ item }}</li>
    </ul>
    <p v-else class="tab-body">Select this tab to load data.</p>
  </MizuTabsContent>
  <MizuTabsContent value="reports">
    <div v-if="asyncLoading" class="async-loading">Loading…</div>
    <ul v-else-if="asyncData.reports" class="async-list">
      <li v-for="item in asyncData.reports" :key="item">{{ item }}</li>
    </ul>
    <p v-else class="tab-body">Select this tab to load data.</p>
  </MizuTabsContent>
</MizuTabsRoot>`;
</script>

<template>
  <div class="tabs-demo not-content">
    <DemoTabs :code="horizontalCode">
      <div class="demo-section">
        <h3>Horizontal</h3>
        <MizuTabsRoot default-value="account">
          <MizuTabsList>
            <MizuTabsTrigger value="account">Account</MizuTabsTrigger>
            <MizuTabsTrigger value="password">Password</MizuTabsTrigger>
            <MizuTabsTrigger value="settings">Settings</MizuTabsTrigger>
          </MizuTabsList>
          <MizuTabsContent value="account">
            <p class="tab-body">Manage your account details and preferences.</p>
          </MizuTabsContent>
          <MizuTabsContent value="password">
            <p class="tab-body">Update your password and security settings.</p>
          </MizuTabsContent>
          <MizuTabsContent value="settings">
            <p class="tab-body">Configure application-wide settings.</p>
          </MizuTabsContent>
        </MizuTabsRoot>
      </div>
    </DemoTabs>

    <DemoTabs :code="verticalCode">
      <div class="demo-section">
        <h3>Vertical</h3>
        <div class="vertical-tabs">
          <MizuTabsRoot default-value="tab1" orientation="vertical">
            <MizuTabsList>
              <MizuTabsTrigger value="tab1">Tab One</MizuTabsTrigger>
              <MizuTabsTrigger value="tab2">Tab Two</MizuTabsTrigger>
              <MizuTabsTrigger value="tab3">Tab Three</MizuTabsTrigger>
            </MizuTabsList>
            <MizuTabsContent value="tab1">
              <p class="tab-body">Content for tab one.</p>
            </MizuTabsContent>
            <MizuTabsContent value="tab2">
              <p class="tab-body">Content for tab two.</p>
            </MizuTabsContent>
            <MizuTabsContent value="tab3">
              <p class="tab-body">Content for tab three.</p>
            </MizuTabsContent>
          </MizuTabsRoot>
        </div>
      </div>
    </DemoTabs>

    <DemoTabs :code="disabledTabCode">
      <div class="demo-section">
        <h3>With Disabled Tab</h3>
        <MizuTabsRoot default-value="billing">
          <MizuTabsList>
            <MizuTabsTrigger value="billing">Billing</MizuTabsTrigger>
            <MizuTabsTrigger value="invoices">Invoices</MizuTabsTrigger>
            <MizuTabsTrigger value="history" disabled>History</MizuTabsTrigger>
          </MizuTabsList>
          <MizuTabsContent value="billing">
            <p class="tab-body">View and manage your billing information.</p>
          </MizuTabsContent>
          <MizuTabsContent value="invoices">
            <p class="tab-body">Access your past and current invoices.</p>
          </MizuTabsContent>
          <MizuTabsContent value="history">
            <p class="tab-body">This tab is disabled and cannot be accessed.</p>
          </MizuTabsContent>
        </MizuTabsRoot>
      </div>
    </DemoTabs>

    <DemoTabs :code="buttonGroupCode">
      <div class="demo-section">
        <h3>Button Group</h3>
        <MizuTabsRoot default-value="monthly">
          <MizuTabsList variant="button">
            <MizuTabsTrigger value="daily">Daily</MizuTabsTrigger>
            <MizuTabsTrigger value="weekly">Weekly</MizuTabsTrigger>
            <MizuTabsTrigger value="monthly">Monthly</MizuTabsTrigger>
            <MizuTabsTrigger value="yearly">Yearly</MizuTabsTrigger>
          </MizuTabsList>
          <MizuTabsContent value="daily">
            <p class="tab-body">View daily usage statistics and activity reports.</p>
          </MizuTabsContent>
          <MizuTabsContent value="weekly">
            <p class="tab-body">Review weekly performance summaries and team progress.</p>
          </MizuTabsContent>
          <MizuTabsContent value="monthly">
            <p class="tab-body">Analyze monthly trends, revenue, and growth metrics.</p>
          </MizuTabsContent>
          <MizuTabsContent value="yearly">
            <p class="tab-body">Access annual reports and year-over-year comparisons.</p>
          </MizuTabsContent>
        </MizuTabsRoot>
      </div>
    </DemoTabs>

    <DemoTabs :code="sizesUnderlineCode">
      <div class="demo-section">
        <h3>Sizes — Underline</h3>
        <div class="sizes-stack">
          <div>
            <span class="size-label">Small</span>
            <MizuTabsRoot default-value="us-sm">
              <MizuTabsList size="sm">
                <MizuTabsTrigger value="us-sm">Account</MizuTabsTrigger>
                <MizuTabsTrigger value="us-sm2">Security</MizuTabsTrigger>
              </MizuTabsList>
              <MizuTabsContent value="us-sm">
                <p class="tab-body">Small underline content.</p>
              </MizuTabsContent>
              <MizuTabsContent value="us-sm2">
                <p class="tab-body">Small underline content two.</p>
              </MizuTabsContent>
            </MizuTabsRoot>
          </div>
          <div>
            <span class="size-label">Medium (default)</span>
            <MizuTabsRoot default-value="us-md">
              <MizuTabsList size="md">
                <MizuTabsTrigger value="us-md">Account</MizuTabsTrigger>
                <MizuTabsTrigger value="us-md2">Security</MizuTabsTrigger>
              </MizuTabsList>
              <MizuTabsContent value="us-md">
                <p class="tab-body">Medium underline content.</p>
              </MizuTabsContent>
              <MizuTabsContent value="us-md2">
                <p class="tab-body">Medium underline content two.</p>
              </MizuTabsContent>
            </MizuTabsRoot>
          </div>
          <div>
            <span class="size-label">Large</span>
            <MizuTabsRoot default-value="us-lg">
              <MizuTabsList size="lg">
                <MizuTabsTrigger value="us-lg">Account</MizuTabsTrigger>
                <MizuTabsTrigger value="us-lg2">Security</MizuTabsTrigger>
              </MizuTabsList>
              <MizuTabsContent value="us-lg">
                <p class="tab-body">Large underline content.</p>
              </MizuTabsContent>
              <MizuTabsContent value="us-lg2">
                <p class="tab-body">Large underline content two.</p>
              </MizuTabsContent>
            </MizuTabsRoot>
          </div>
        </div>
      </div>
    </DemoTabs>

    <DemoTabs :code="sizesButtonCode">
      <div class="demo-section">
        <h3>Sizes — Button Group</h3>
        <div class="sizes-stack">
          <div>
            <span class="size-label">Small</span>
            <MizuTabsRoot default-value="bs-sm">
              <MizuTabsList size="sm" variant="button">
                <MizuTabsTrigger value="bs-sm">Tab One</MizuTabsTrigger>
                <MizuTabsTrigger value="bs-sm2">Tab Two</MizuTabsTrigger>
                <MizuTabsTrigger value="bs-sm3">Tab Three</MizuTabsTrigger>
              </MizuTabsList>
              <MizuTabsContent value="bs-sm">
                <p class="tab-body">Small size content.</p>
              </MizuTabsContent>
              <MizuTabsContent value="bs-sm2">
                <p class="tab-body">Small size content two.</p>
              </MizuTabsContent>
              <MizuTabsContent value="bs-sm3">
                <p class="tab-body">Small size content three.</p>
              </MizuTabsContent>
            </MizuTabsRoot>
          </div>
          <div>
            <span class="size-label">Medium (default)</span>
            <MizuTabsRoot default-value="bs-md">
              <MizuTabsList size="md" variant="button">
                <MizuTabsTrigger value="bs-md">Tab One</MizuTabsTrigger>
                <MizuTabsTrigger value="bs-md2">Tab Two</MizuTabsTrigger>
                <MizuTabsTrigger value="bs-md3">Tab Three</MizuTabsTrigger>
              </MizuTabsList>
              <MizuTabsContent value="bs-md">
                <p class="tab-body">Medium size content.</p>
              </MizuTabsContent>
              <MizuTabsContent value="bs-md2">
                <p class="tab-body">Medium size content two.</p>
              </MizuTabsContent>
              <MizuTabsContent value="bs-md3">
                <p class="tab-body">Medium size content three.</p>
              </MizuTabsContent>
            </MizuTabsRoot>
          </div>
          <div>
            <span class="size-label">Large</span>
            <MizuTabsRoot default-value="bs-lg">
              <MizuTabsList size="lg" variant="button">
                <MizuTabsTrigger value="bs-lg">Tab One</MizuTabsTrigger>
                <MizuTabsTrigger value="bs-lg2">Tab Two</MizuTabsTrigger>
                <MizuTabsTrigger value="bs-lg3">Tab Three</MizuTabsTrigger>
              </MizuTabsList>
              <MizuTabsContent value="bs-lg">
                <p class="tab-body">Large size content.</p>
              </MizuTabsContent>
              <MizuTabsContent value="bs-lg2">
                <p class="tab-body">Large size content two.</p>
              </MizuTabsContent>
              <MizuTabsContent value="bs-lg3">
                <p class="tab-body">Large size content three.</p>
              </MizuTabsContent>
            </MizuTabsRoot>
          </div>
        </div>
      </div>
    </DemoTabs>

    <DemoTabs :code="profileSettingsCode">
      <div class="demo-section">
        <h3>Complex — Profile Settings</h3>
        <MizuTabsRoot v-model="activeProfileTab">
          <MizuTabsList>
            <MizuTabsTrigger value="general">General</MizuTabsTrigger>
            <MizuTabsTrigger value="notifications">
                Notifications
                <span class="tab-badge">3</span>
              </MizuTabsTrigger>
            <MizuTabsTrigger value="security">Security</MizuTabsTrigger>
            <MizuTabsTrigger value="integrations">Integrations</MizuTabsTrigger>
          </MizuTabsList>

          <MizuTabsContent value="general">
            <div class="tab-panel">
              <h4>General Settings</h4>
              <p>Manage your public profile information and how others see you on the platform.</p>

              <div class="field-group">
                <label class="field-label">Display Name</label>
                <p class="field-hint">This is the name that will be displayed across the platform and in your public profile.</p>
              </div>

              <div class="field-group">
                <label class="field-label">Email Address</label>
                <p class="field-hint">Your primary email is used for notifications and account recovery. You can add additional emails in Security settings.</p>
              </div>

              <div class="field-group">
                <label class="field-label">Bio</label>
                <p class="field-hint">Write a short bio about yourself. This will appear on your public profile and can be up to 160 characters.</p>
              </div>

              <div class="field-group">
                <label class="field-label">Language</label>
                <p class="field-hint">Select your preferred language for the interface. This affects all menus, buttons, and system messages.</p>
              </div>

              <div class="field-group">
                <label class="field-label">Timezone</label>
                <p class="field-hint">Used for scheduling, timestamps, and notification delivery times across the platform.</p>
              </div>

              <div class="actions">
                <MizuButton variant="outline" size="md">Cancel</MizuButton>
                <MizuButton size="md">Save Changes</MizuButton>
              </div>
            </div>
          </MizuTabsContent>

          <MizuTabsContent value="notifications">
            <div class="tab-panel">
              <h4>Notification Preferences</h4>
              <p>Control which notifications you receive and how they are delivered to you.</p>

              <div class="field-group">
                <label class="field-label">Email Notifications</label>
                <p class="field-hint">Receive email digests for important activity. You can choose between real-time, daily, or weekly summaries.</p>
              </div>

              <div class="field-group">
                <label class="field-label">Push Notifications</label>
                <p class="field-hint">Get browser push notifications for mentions, assignments, and direct messages. Requires browser permission.</p>
              </div>

              <div class="field-group">
                <label class="field-label">In-App Notifications</label>
                <p class="field-hint">Show a notification badge and dropdown panel within the application. These are always synced in real-time.</p>
              </div>

              <div class="field-group">
                <label class="field-label">Weekly Digest</label>
                <p class="field-hint">Receive a weekly summary of activity, new followers, and recommended content every Monday at 9:00 AM.</p>
              </div>

              <div class="field-group">
                <label class="field-label">Marketing Emails</label>
                <p class="field-hint">Occasional updates about new features, product announcements, and tips for getting the most out of the platform.</p>
              </div>

              <div class="actions">
                <MizuButton variant="outline" size="md">Cancel</MizuButton>
                <MizuButton size="md">Save Changes</MizuButton>
              </div>
            </div>
          </MizuTabsContent>

          <MizuTabsContent value="security">
            <div class="tab-panel">
              <h4>Security &amp; Privacy</h4>
              <p>Manage your password, two-factor authentication, and active sessions.</p>

              <div class="field-group">
                <label class="field-label">Password</label>
                <p class="field-hint">Last changed 45 days ago. We recommend updating your password every 90 days for security. Use a strong, unique password.</p>
              </div>

              <div class="field-group">
                <label class="field-label">Two-Factor Authentication</label>
                <p class="field-hint">Add an extra layer of security to your account. When enabled, you will need to enter a code from your authenticator app in addition to your password.</p>
              </div>

              <div class="field-group">
                <label class="field-label">Active Sessions</label>
                <p class="field-hint">You are currently signed in on 2 devices. Review and revoke any sessions you do not recognize. Sessions expire after 30 days of inactivity.</p>
              </div>

              <div class="field-group">
                <label class="field-label">Login Notifications</label>
                <p class="field-hint">Get notified when a new device signs into your account. Notifications are sent to your primary email address immediately.</p>
              </div>

              <div class="field-group">
                <label class="field-label">API Keys</label>
                <p class="field-hint">Manage API keys for programmatic access. Each key can be scoped to specific permissions and revoked independently.</p>
              </div>

              <div class="actions">
                <MizuButton variant="outline" size="md">Cancel</MizuButton>
                <MizuButton size="md">Save Changes</MizuButton>
              </div>
            </div>
          </MizuTabsContent>

          <MizuTabsContent value="integrations">
            <div class="tab-panel">
              <h4>Connected Integrations</h4>
              <p>Connect your account with third-party services and manage OAuth permissions.</p>

              <div class="field-group">
                <label class="field-label">GitHub</label>
                <p class="field-hint">Sync repositories, pull requests, and commit history. Enables code review features and automatic linking of PRs to tasks.</p>
              </div>

              <div class="field-group">
                <label class="field-label">Slack</label>
                <p class="field-hint">Receive notifications in Slack channels. Supports thread replies, mentions, and interactive slash commands.</p>
              </div>

              <div class="field-group">
                <label class="field-label">Google Calendar</label>
                <p class="field-hint">Sync deadlines and milestones with your calendar. Events are created automatically when tasks are assigned due dates.</p>
              </div>

              <div class="field-group">
                <label class="field-label">Figma</label>
                <p class="field-hint">Embed design files directly in tasks and receive updates when designs are modified. Supports real-time collaboration.</p>
              </div>

              <div class="field-group">
                <label class="field-label">Zapier</label>
                <p class="field-hint">Create custom workflows connecting to 5,000+ apps. Use triggers and actions to automate repetitive tasks.</p>
              </div>

              <div class="actions">
                <MizuButton variant="outline" size="md">Cancel</MizuButton>
                <MizuButton size="md">Save Changes</MizuButton>
              </div>
            </div>
          </MizuTabsContent>
        </MizuTabsRoot>
      </div>
    </DemoTabs>

    <DemoTabs :code="colorVariantsCode">
      <div class="demo-section">
        <h3>Color Variants</h3>
        <div class="color-select-row">
          <MizuSelect v-model="selectedColor" :options="colorOptions" label="Color" size="sm" class="color-select" />
        </div>
        <MizuTabsRoot :key="selectedColor" defaultValue="tab1">
          <MizuTabsList :color="selectedColor">
            <MizuTabsTrigger value="tab1">Account</MizuTabsTrigger>
            <MizuTabsTrigger value="tab2">Password</MizuTabsTrigger>
            <MizuTabsTrigger value="tab3">Settings</MizuTabsTrigger>
          </MizuTabsList>
          <MizuTabsContent value="tab1">
            <p class="tab-body">Manage your account details using the <strong>{{ selectedColor }}</strong> color scheme.</p>
          </MizuTabsContent>
          <MizuTabsContent value="tab2">
            <p class="tab-body">Update your password and security settings.</p>
          </MizuTabsContent>
          <MizuTabsContent value="tab3">
            <p class="tab-body">Configure application settings and preferences.</p>
          </MizuTabsContent>
        </MizuTabsRoot>
      </div>
    </DemoTabs>

    <DemoTabs :code="asyncContentCode">
      <div class="demo-section">
        <h3>Async Content</h3>
        <MizuTabsRoot v-model="asyncTab" defaultValue="users">
          <MizuTabsList>
            <MizuTabsTrigger value="users">Users</MizuTabsTrigger>
            <MizuTabsTrigger value="projects">Projects</MizuTabsTrigger>
            <MizuTabsTrigger value="reports">Reports</MizuTabsTrigger>
          </MizuTabsList>
          <MizuTabsContent value="users">
            <div v-if="asyncLoading" class="async-loading">Loading…</div>
            <ul v-else-if="asyncData.users" class="async-list">
              <li v-for="item in asyncData.users" :key="item">{{ item }}</li>
            </ul>
            <p v-else class="tab-body">Select this tab to load data.</p>
          </MizuTabsContent>
          <MizuTabsContent value="projects">
            <div v-if="asyncLoading" class="async-loading">Loading…</div>
            <ul v-else-if="asyncData.projects" class="async-list">
              <li v-for="item in asyncData.projects" :key="item">{{ item }}</li>
            </ul>
            <p v-else class="tab-body">Select this tab to load data.</p>
          </MizuTabsContent>
          <MizuTabsContent value="reports">
            <div v-if="asyncLoading" class="async-loading">Loading…</div>
            <ul v-else-if="asyncData.reports" class="async-list">
              <li v-for="item in asyncData.reports" :key="item">{{ item }}</li>
            </ul>
            <p v-else class="tab-body">Select this tab to load data.</p>
          </MizuTabsContent>
        </MizuTabsRoot>
      </div>
    </DemoTabs>
  </div>
</template>

<style scoped>
.tabs-demo {
  all: revert;
  font-family: var(--font-family-sans);
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
  background: transparent;

  border: 1px solid var(--color-surface-muted);
  border-radius: 8px;
}

.tabs-demo :deep(*) {
  margin: 0;
}

.demo-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 0;
}

.demo-section > * {
  margin-top: 0;
}

.demo-section h3 {
  font-size: 14px;
  font-weight: 600;
  color: var(--sl-color-text);
  margin-bottom: 0;
  margin-top: 0;
}

.vertical-tabs {
  display: flex;
  align-items: flex-start;
}

.vertical-tabs > div {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.tab-body {
  font-size: 13px;
  color: var(--sl-color-text);
  line-height: 1.5;
  margin: 0;
}

.sizes-stack {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.size-label {
  display: block;
  font-size: 11px;
  font-weight: 500;
  color: var(--sl-color-text-light);
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.tab-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 999px;
  background: var(--sl-color-accent);
  color: white;
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
}

.tab-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tab-panel h4 {
  font-size: 15px;
  font-weight: 600;
  color: var(--sl-color-text);
  margin: 0;
}

.tab-panel > p {
  font-size: 13px;
  color: var(--sl-color-text-light);
  margin: 0;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.field-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--sl-color-text);
  margin: 0;
}

.field-hint {
  font-size: 12px;
  color: var(--sl-color-text-light);
  margin: 0;
  line-height: 1.4;
}

.actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  padding-top: 8px;
}

.color-select-row {
  display: flex;
  margin-bottom: 4px;
}

.color-select {
  width: 160px;
}

.async-loading {
  font-size: 13px;
  color: var(--sl-color-text-light);
  font-style: italic;
}

.async-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.async-list li {
  font-size: 13px;
  color: var(--sl-color-text);
}
</style>
