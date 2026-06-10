<script setup lang="ts">
import { MizuTooltipProvider, MizuTooltipRoot, MizuTooltipTrigger, MizuTooltipContent, MizuButton, MizuTag } from "@mizu/vue";
</script>

<template>
  <div class="tooltip-demo">
    <div class="demo-section">
      <h3>Basic</h3>
      <MizuTooltipProvider>
        <MizuTooltipRoot>
          <MizuTooltipTrigger>
            <MizuButton class="w-max" variant="secondary" size="sm">Hover me</MizuButton>
          </MizuTooltipTrigger>
          <MizuTooltipContent>
            <span>Tooltip content</span>
          </MizuTooltipContent>
        </MizuTooltipRoot>
      </MizuTooltipProvider>
    </div>

    <div class="demo-section">
      <h3>On Text Link</h3>
      <p class="demo-text">
        Read the <MizuTooltipProvider>
          <MizuTooltipRoot>
            <MizuTooltipTrigger as-child>
              <a href="#" class="demo-link">documentation</a>
            </MizuTooltipTrigger>
            <MizuTooltipContent>
              <span>View the full API reference guide</span>
            </MizuTooltipContent>
          </MizuTooltipRoot>
        </MizuTooltipProvider> for more details.
      </p>
    </div>

    <div class="demo-section">
      <h3>Abbreviation</h3>
      <p class="demo-text">
        The <MizuTooltipProvider>
          <MizuTooltipRoot>
            <MizuTooltipTrigger as-child>
              <abbr href="#" class="demo-abbr">ERP</abbr>
            </MizuTooltipTrigger>
            <MizuTooltipContent>
              <span>Enterprise Resource Planning</span>
            </MizuTooltipContent>
          </MizuTooltipRoot>
        </MizuTooltipProvider> system manages core business processes.
      </p>
    </div>

    <div class="demo-section">
      <h3>Truncated Text</h3>
      <div class="truncated-row">
        <MizuTooltipProvider>
          <MizuTooltipRoot>
            <MizuTooltipTrigger as-child>
              <span class="truncated-text">Very long invoice description that gets cut off</span>
            </MizuTooltipTrigger>
            <MizuTooltipContent side="bottom">
              <span>Very long invoice description that gets cut off</span>
            </MizuTooltipContent>
          </MizuTooltipRoot>
        </MizuTooltipProvider>
      </div>
    </div>

    <div class="demo-section">
      <h3>Status with Tooltip</h3>
      <div class="status-row">
        <MizuTooltipProvider>
          <MizuTooltipRoot>
            <MizuTooltipTrigger as-child>
              <MizuTag variant="success" size="sm">Paid</MizuTag>
            </MizuTooltipTrigger>
            <MizuTooltipContent>
              <span>Invoice paid on Jun 5, 2026</span>
            </MizuTooltipContent>
          </MizuTooltipRoot>
        </MizuTooltipProvider>

        <MizuTooltipProvider>
          <MizuTooltipRoot>
            <MizuTooltipTrigger as-child>
              <MizuTag variant="warning" size="sm">Pending</MizuTag>
            </MizuTooltipTrigger>
            <MizuTooltipContent>
              <span>Awaiting payment - due Jun 15, 2026</span>
            </MizuTooltipContent>
          </MizuTooltipRoot>
        </MizuTooltipProvider>

        <MizuTooltipProvider>
          <MizuTooltipRoot>
            <MizuTooltipTrigger as-child>
              <MizuTag variant="error" size="sm">Overdue</MizuTag>
            </MizuTooltipTrigger>
            <MizuTooltipContent>
              <span>Payment was due on May 30, 2026</span>
            </MizuTooltipContent>
          </MizuTooltipRoot>
        </MizuTooltipProvider>
      </div>
    </div>

    <div class="demo-section">
      <h3>Keyboard Shortcut</h3>
      <MizuTooltipProvider>
        <MizuTooltipRoot>
          <MizuTooltipTrigger>
            <MizuButton class="w-max" variant="secondary" size="sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>
              </svg>
            </MizuButton>
          </MizuTooltipTrigger>
          <MizuTooltipContent>
            <span>Edit <kbd class="kbd">Ctrl+E</kbd></span>
          </MizuTooltipContent>
        </MizuTooltipRoot>
      </MizuTooltipProvider>
    </div>

    <div class="demo-section">
      <h3>Info Label</h3>
      <div class="info-row">
        <span class="info-label">Payment Terms</span>
        <MizuTooltipProvider>
          <MizuTooltipRoot>
            <MizuTooltipTrigger as-child>
              <span class="info-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 16v-4"/>
                  <path d="M12 8h.01"/>
                </svg>
              </span>
            </MizuTooltipTrigger>
            <MizuTooltipContent side="top">
              <span>Net 30 means payment is due within 30 days of invoice date</span>
            </MizuTooltipContent>
          </MizuTooltipRoot>
        </MizuTooltipProvider>
      </div>
    </div>

    <div class="demo-section">
      <h3>Form Field Help</h3>
      <div class="form-row">
        <label class="form-label">
          Tax ID
          <MizuTooltipProvider>
            <MizuTooltipRoot>
              <MizuTooltipTrigger as-child>
                <span class="help-icon">?</span>
              </MizuTooltipTrigger>
              <MizuTooltipContent side="top">
                <span>Enter your 9-digit Employer Identification Number without dashes</span>
              </MizuTooltipContent>
            </MizuTooltipRoot>
          </MizuTooltipProvider>
        </label>
        <input type="text" class="form-input" placeholder="XX-XXXXXXX" readonly />
      </div>
    </div>

    <div class="demo-section">
      <h3>Badge Count</h3>
      <div class="badge-row">
        <MizuTooltipProvider>
          <MizuTooltipRoot>
            <MizuTooltipTrigger as-child>
              <span class="badge badge--warning">3</span>
            </MizuTooltipTrigger>
            <MizuTooltipContent>
              <span>3 invoices pending review</span>
            </MizuTooltipContent>
          </MizuTooltipRoot>
        </MizuTooltipProvider>

        <MizuTooltipProvider>
          <MizuTooltipRoot>
            <MizuTooltipTrigger as-child>
              <span class="badge badge--error">7</span>
            </MizuTooltipTrigger>
            <MizuTooltipContent>
              <span>7 invoices overdue</span>
            </MizuTooltipContent>
          </MizuTooltipRoot>
        </MizuTooltipProvider>

        <MizuTooltipProvider>
          <MizuTooltipRoot>
            <MizuTooltipTrigger as-child>
              <span class="badge badge--success">12</span>
            </MizuTooltipTrigger>
            <MizuTooltipContent>
              <span>12 invoices paid this month</span>
            </MizuTooltipContent>
          </MizuTooltipRoot>
        </MizuTooltipProvider>
      </div>
    </div>

    <div class="demo-section">
      <h3>Date Display</h3>
      <MizuTooltipProvider>
        <MizuTooltipRoot>
          <MizuTooltipTrigger as-child>
            <span class="date-text w-max">Jun 5, 2026</span>
          </MizuTooltipTrigger>
          <MizuTooltipContent>
            <span>Thursday, June 5, 2026 at 2:30 PM</span>
          </MizuTooltipContent>
        </MizuTooltipRoot>
      </MizuTooltipProvider>
    </div>

    <div class="demo-section">
      <h3>Disabled Action</h3>
      <MizuTooltipProvider>
        <MizuTooltipRoot>
          <MizuTooltipTrigger>
            <MizuButton class="w-max" variant="secondary" size="sm" disabled>Export</MizuButton>
          </MizuTooltipTrigger>
          <MizuTooltipContent>
            <span>Select at least one row to export</span>
          </MizuTooltipContent>
        </MizuTooltipRoot>
      </MizuTooltipProvider>
    </div>

    <div class="demo-section">
      <h3>Placements</h3>
      <div class="placement-grid">
        <MizuTooltipProvider>
          <MizuTooltipRoot>
            <MizuTooltipTrigger>
              <MizuButton variant="secondary" size="sm">Top</MizuButton>
            </MizuTooltipTrigger>
            <MizuTooltipContent side="top">
              <span>Tooltip on top</span>
            </MizuTooltipContent>
          </MizuTooltipRoot>
        </MizuTooltipProvider>

        <MizuTooltipProvider>
          <MizuTooltipRoot>
            <MizuTooltipTrigger>
              <MizuButton variant="secondary" size="sm">Right</MizuButton>
            </MizuTooltipTrigger>
            <MizuTooltipContent side="right">
              <span>Tooltip on right</span>
            </MizuTooltipContent>
          </MizuTooltipRoot>
        </MizuTooltipProvider>

        <MizuTooltipProvider>
          <MizuTooltipRoot>
            <MizuTooltipTrigger>
              <MizuButton variant="secondary" size="sm">Bottom</MizuButton>
            </MizuTooltipTrigger>
            <MizuTooltipContent side="bottom">
              <span>Tooltip on bottom</span>
            </MizuTooltipContent>
          </MizuTooltipRoot>
        </MizuTooltipProvider>

        <MizuTooltipProvider>
          <MizuTooltipRoot>
            <MizuTooltipTrigger>
              <MizuButton variant="secondary" size="sm">Left</MizuButton>
            </MizuTooltipTrigger>
            <MizuTooltipContent side="left">
              <span>Tooltip on left</span>
            </MizuTooltipContent>
          </MizuTooltipRoot>
        </MizuTooltipProvider>
      </div>
    </div>

    <div class="demo-section">
      <h3>Without Arrow</h3>
      <MizuTooltipProvider>
        <MizuTooltipRoot>
          <MizuTooltipTrigger>
            <MizuButton class="w-max" variant="secondary" size="sm">No arrow</MizuButton>
          </MizuTooltipTrigger>
          <MizuTooltipContent :show-arrow="false">
            <span>Content without arrow</span>
          </MizuTooltipContent>
        </MizuTooltipRoot>
      </MizuTooltipProvider>
    </div>

    <div class="demo-section">
      <h3>Custom Delay</h3>
      <MizuTooltipProvider :delay-duration="1000">
        <MizuTooltipRoot>
          <MizuTooltipTrigger>
            <MizuButton class="w-max" variant="secondary" size="sm">Slow tooltip</MizuButton>
          </MizuTooltipTrigger>
          <MizuTooltipContent>
            <span>Appears after 1s delay</span>
          </MizuTooltipContent>
        </MizuTooltipRoot>
      </MizuTooltipProvider>
    </div>

    <div class="demo-section">
      <h3>On Icon</h3>
      <MizuTooltipProvider>
        <MizuTooltipRoot>
          <MizuTooltipTrigger as-child>
            <button class="icon-trigger" aria-label="Info">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4"/>
                <path d="M12 8h.01"/>
              </svg>
            </button>
          </MizuTooltipTrigger>
          <MizuTooltipContent>
            <span>More information</span>
          </MizuTooltipContent>
        </MizuTooltipRoot>
      </MizuTooltipProvider>
    </div>

    <div class="demo-section">
      <h3>Rich Content</h3>
      <MizuTooltipProvider>
        <MizuTooltipRoot>
          <MizuTooltipTrigger>
            <MizuButton class="w-max" variant="secondary" size="sm">Order details</MizuButton>
          </MizuTooltipTrigger>
          <MizuTooltipContent style="padding: 8px 12px;">
            <div style="font-weight: 600; font-size: 13px; line-height: 1.5;">Order #12345</div>
            <div style="font-size: 11px; opacity: 0.75; line-height: 1.4;">Created on Jun 5, 2026 at 2:30 PM</div>
          </MizuTooltipContent>
        </MizuTooltipRoot>
      </MizuTooltipProvider>
    </div>

    <div class="demo-section">
      <h3>Multi-line</h3>
      <MizuTooltipProvider>
        <MizuTooltipRoot>
          <MizuTooltipTrigger>
            <MizuButton class="w-max" variant="secondary" size="sm">Hover me</MizuButton>
          </MizuTooltipTrigger>
          <MizuTooltipContent style="max-width: 200px;">
            <span>This tooltip has a longer message that wraps to multiple lines when there is not enough space.</span>
          </MizuTooltipContent>
        </MizuTooltipRoot>
      </MizuTooltipProvider>
    </div>

    <div class="demo-section">
      <h3>Colored Tooltip</h3>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <MizuTooltipProvider>
          <MizuTooltipRoot>
            <MizuTooltipTrigger>
              <MizuButton class="w-max" variant="secondary" size="sm">Info</MizuButton>
            </MizuTooltipTrigger>
            <MizuTooltipContent style="--color-foreground-primary: #2563eb;">
              <span>This is an informational message</span>
            </MizuTooltipContent>
          </MizuTooltipRoot>
        </MizuTooltipProvider>

        <MizuTooltipProvider>
          <MizuTooltipRoot>
            <MizuTooltipTrigger>
              <MizuButton class="w-max" variant="secondary" size="sm">Warning</MizuButton>
            </MizuTooltipTrigger>
            <MizuTooltipContent style="--color-foreground-primary: #92400e;">
              <span>This is a warning message</span>
            </MizuTooltipContent>
          </MizuTooltipRoot>
        </MizuTooltipProvider>

        <MizuTooltipProvider>
          <MizuTooltipRoot>
            <MizuTooltipTrigger>
              <MizuButton class="w-max" variant="secondary" size="sm">Error</MizuButton>
            </MizuTooltipTrigger>
            <MizuTooltipContent style="--color-foreground-primary: #dc2626;">
              <span>This is an error message</span>
            </MizuTooltipContent>
          </MizuTooltipRoot>
        </MizuTooltipProvider>
      </div>
      <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px;">
        <span style="font-size: 12px; color: var(--sl-color-text); width: 100%;">Dark colored</span>
        <MizuTooltipProvider>
          <MizuTooltipRoot>
            <MizuTooltipTrigger>
              <MizuButton class="w-max" variant="secondary" size="sm">Info</MizuButton>
            </MizuTooltipTrigger>
            <MizuTooltipContent variant="dark" style="--color-foreground-primary: #2563eb;">
              <span>This is an informational message</span>
            </MizuTooltipContent>
          </MizuTooltipRoot>
        </MizuTooltipProvider>

        <MizuTooltipProvider>
          <MizuTooltipRoot>
            <MizuTooltipTrigger>
              <MizuButton class="w-max" variant="secondary" size="sm">Warning</MizuButton>
            </MizuTooltipTrigger>
            <MizuTooltipContent variant="dark" style="--color-foreground-primary: #d97706;">
              <span>This is a warning message</span>
            </MizuTooltipContent>
          </MizuTooltipRoot>
        </MizuTooltipProvider>

        <MizuTooltipProvider>
          <MizuTooltipRoot>
            <MizuTooltipTrigger>
              <MizuButton class="w-max" variant="secondary" size="sm">Error</MizuButton>
            </MizuTooltipTrigger>
            <MizuTooltipContent variant="dark" style="--color-foreground-primary: #dc2626;">
              <span>This is an error message</span>
            </MizuTooltipContent>
          </MizuTooltipRoot>
        </MizuTooltipProvider>
      </div>
    </div>

    <div class="demo-section">
      <h3>Icon in Tooltip</h3>
      <MizuTooltipProvider>
        <MizuTooltipRoot>
          <MizuTooltipTrigger>
            <MizuButton class="w-max" variant="secondary" size="sm">Save</MizuButton>
          </MizuTooltipTrigger>
          <MizuTooltipContent>
            <span style="display: flex; align-items: center; gap: 6px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
              Changes saved successfully
            </span>
          </MizuTooltipContent>
        </MizuTooltipRoot>
      </MizuTooltipProvider>
    </div>

    <div class="demo-section">
      <h3>Variants</h3>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <MizuTooltipProvider>
          <MizuTooltipRoot>
            <MizuTooltipTrigger>
              <MizuButton class="w-max" variant="secondary" size="sm">Light</MizuButton>
            </MizuTooltipTrigger>
            <MizuTooltipContent variant="light">
              <span>Light variant tooltip</span>
            </MizuTooltipContent>
          </MizuTooltipRoot>
        </MizuTooltipProvider>

        <MizuTooltipProvider>
          <MizuTooltipRoot>
            <MizuTooltipTrigger>
              <MizuButton class="w-max" variant="secondary" size="sm">Dark</MizuButton>
            </MizuTooltipTrigger>
            <MizuTooltipContent variant="dark">
              <span>Dark variant tooltip</span>
            </MizuTooltipContent>
          </MizuTooltipRoot>
        </MizuTooltipProvider>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tooltip-demo {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
  background: var(--sl-color-gray-2);
  border-radius: 8px;
}

.demo-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.demo-section h3 {
  font-size: 14px;
  font-weight: 600;
  color: var(--sl-color-text);
  margin-bottom: 0;
}

.demo-section > div {
  margin-top: 0;
}

.placement-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.icon-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid var(--color-surface-muted);
  background: var(--color-surface-base);
  color: var(--color-foreground-secondary);
  cursor: pointer;
  transition: all 150ms;
  padding: 0;
  margin: 0;
  font: inherit;
}
.icon-trigger:hover {
  background: var(--color-surface-subtle);
  color: var(--color-foreground-primary);
}

.demo-text {
  font-size: 14px;
  color: var(--sl-color-text);
  margin: 0;
}

.demo-link {
  color: var(--sl-color-accent);
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;
}
.demo-link:hover {
  color: var(--sl-color-accent-high);
}

.demo-abbr {
  color: var(--sl-color-text);
  font-weight: 600;
  text-decoration: none;
  border-bottom: 1px dashed var(--sl-color-gray-5);
  cursor: help;
}

.truncated-row {
  max-width: 200px;
}

.truncated-text {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  color: var(--sl-color-text);
  cursor: default;
  padding: 6px 10px;
  background: var(--color-surface-base);
  border: 1px solid var(--color-surface-muted);
  border-radius: 6px;
}

.status-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.kbd {
  display: inline-block;
  padding: 2px 6px;
  font-size: 11px;
  font-family: var(--sl-font-mono);
  background: var(--color-surface-muted);
  color: var(--color-foreground-secondary);
  border-radius: 4px;
  border: 1px solid var(--color-surface-muted);
}

.info-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.info-label {
  font-size: 14px;
  color: var(--sl-color-text);
}

.info-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--sl-color-gray-5);
  color: var(--sl-color-gray-2);
  cursor: help;
  transition: background 150ms;
}
.info-icon:hover {
  background: var(--sl-color-gray-4);
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 240px;
}

.form-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--sl-color-text);
  display: flex;
  align-items: center;
  gap: 6px;
}

.help-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--sl-color-gray-5);
  color: var(--sl-color-gray-2);
  font-size: 10px;
  font-weight: 600;
  cursor: help;
  transition: background 150ms;
}
.help-icon:hover {
  background: var(--sl-color-gray-4);
}

.form-input {
  padding: 6px 10px;
  font-size: 13px;
  border: 1px solid var(--sl-color-gray-5);
  border-radius: 6px;
  background: var(--sl-color-bg);
  color: var(--sl-color-text);
}

.badge-row {
  display: flex;
  gap: 8px;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  font-size: 11px;
  font-weight: 600;
  border-radius: 10px;
  cursor: default;
}
.badge--warning {
  background: var(--color-status-warning);
  color: var(--color-status-warning-text);
}
.badge--error {
  background: var(--color-status-error);
  color: var(--color-status-error-text);
}
.badge--success {
  background: var(--color-status-success);
  color: var(--color-status-success-text);
}

.date-text {
  font-size: 14px;
  color: var(--sl-color-text);
  cursor: default;
  padding: 4px 8px;
  background: var(--color-surface-base);
  border: 1px solid var(--color-surface-muted);
  border-radius: 6px;
  font-variant-numeric: tabular-nums;
}
</style>
