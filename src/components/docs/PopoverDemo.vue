<script setup lang="ts">
import { ref } from "vue";
import {
  MizuPopoverRoot,
  MizuPopoverTrigger,
  MizuPopoverPortal,
  MizuPopoverContent,
  MizuPopoverArrow,
  MizuPopoverClose,
  MizuButton,
  MizuInput,
  MizuAvatar,
} from "@mizu/vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const basicCode = `<MizuPopoverRoot>
  <MizuPopoverTrigger>
    <MizuButton class="w-max" variant="primary" size="sm">Open popover</MizuButton>
  </MizuPopoverTrigger>
  <MizuPopoverPortal>
    <MizuPopoverContent>
      <div class="popover-title">About this feature</div>
      <div class="popover-body">Popovers are great for showing additional content or controls related to a trigger element.</div>
    </MizuPopoverContent>
  </MizuPopoverPortal>
</MizuPopoverRoot>`;

const arrowCode = `<MizuPopoverRoot>
  <MizuPopoverTrigger>
    <MizuButton class="w-max" variant="secondary" size="sm">Show details</MizuButton>
  </MizuPopoverTrigger>
  <MizuPopoverPortal>
    <MizuPopoverContent side="bottom" :side-offset="10">
      <div class="popover-title">Pro tip</div>
      <div class="popover-body">Use the arrow to indicate which element the popover is anchored to.</div>
      <MizuPopoverArrow />
    </MizuPopoverContent>
  </MizuPopoverPortal>
</MizuPopoverRoot>`;

const placementsCode = `<MizuPopoverRoot>
  <MizuPopoverTrigger>
    <MizuButton variant="secondary" size="sm">Top</MizuButton>
  </MizuPopoverTrigger>
  <MizuPopoverPortal>
    <MizuPopoverContent side="top">
      <div class="popover-body">Popover on top</div>
      <MizuPopoverArrow />
    </MizuPopoverContent>
  </MizuPopoverPortal>
</MizuPopoverRoot>

<MizuPopoverRoot>
  <MizuPopoverTrigger>
    <MizuButton variant="secondary" size="sm">Right</MizuButton>
  </MizuPopoverTrigger>
  <MizuPopoverPortal>
    <MizuPopoverContent side="right">
      <div class="popover-body">Popover on right</div>
      <MizuPopoverArrow />
    </MizuPopoverContent>
  </MizuPopoverPortal>
</MizuPopoverRoot>

<MizuPopoverRoot>
  <MizuPopoverTrigger>
    <MizuButton variant="secondary" size="sm">Bottom</MizuButton>
  </MizuPopoverTrigger>
  <MizuPopoverPortal>
    <MizuPopoverContent side="bottom">
      <div class="popover-body">Popover on bottom</div>
      <MizuPopoverArrow />
    </MizuPopoverContent>
  </MizuPopoverPortal>
</MizuPopoverRoot>

<MizuPopoverRoot>
  <MizuPopoverTrigger>
    <MizuButton variant="secondary" size="sm">Left</MizuButton>
  </MizuPopoverTrigger>
  <MizuPopoverPortal>
    <MizuPopoverContent side="left">
      <div class="popover-body">Popover on left</div>
      <MizuPopoverArrow />
    </MizuPopoverContent>
  </MizuPopoverPortal>
</MizuPopoverRoot>`;

const alignmentCode = `<MizuPopoverRoot>
  <MizuPopoverTrigger>
    <MizuButton class="w-max" variant="secondary" size="sm">Start</MizuButton>
  </MizuPopoverTrigger>
  <MizuPopoverPortal>
    <MizuPopoverContent side="bottom" align="start">
      <div class="popover-body">Aligned to start</div>
      <MizuPopoverArrow />
    </MizuPopoverContent>
  </MizuPopoverPortal>
</MizuPopoverRoot>

<MizuPopoverRoot>
  <MizuPopoverTrigger>
    <MizuButton class="w-max" variant="secondary" size="sm">Center</MizuButton>
  </MizuPopoverTrigger>
  <MizuPopoverPortal>
    <MizuPopoverContent side="bottom" align="center">
      <div class="popover-body">Aligned to center</div>
      <MizuPopoverArrow />
    </MizuPopoverContent>
  </MizuPopoverPortal>
</MizuPopoverRoot>

<MizuPopoverRoot>
  <MizuPopoverTrigger>
    <MizuButton class="w-max" variant="secondary" size="sm">End</MizuButton>
  </MizuPopoverTrigger>
  <MizuPopoverPortal>
    <MizuPopoverContent side="bottom" align="end">
      <div class="popover-body">Aligned to end</div>
      <MizuPopoverArrow />
    </MizuPopoverContent>
  </MizuPopoverPortal>
</MizuPopoverRoot>`;

const formCode = `<MizuPopoverRoot>
  <MizuPopoverTrigger>
    <MizuButton class="w-max" variant="secondary" size="sm">Settings</MizuButton>
  </MizuPopoverTrigger>
  <MizuPopoverPortal>
    <MizuPopoverContent side="bottom" align="start" :side-offset="6">
      <div class="popover-title">Filter options</div>
      <div class="form-stack">
        <label class="form-field">
          <span class="form-label">Search</span>
          <MizuInput size="sm" placeholder="Type to search..." />
        </label>
        <label class="form-field">
          <span class="form-label">Sort by</span>
          <select class="form-select">
            <option>Newest first</option>
            <option>Oldest first</option>
            <option>Alphabetical</option>
          </select>
        </label>
        <div class="form-actions">
          <MizuPopoverClose>
            <MizuButton variant="ghost" size="sm">Cancel</MizuButton>
          </MizuPopoverClose>
          <MizuPopoverClose>
            <MizuButton variant="primary" size="sm">Apply</MizuButton>
          </MizuPopoverClose>
        </div>
      </div>
    </MizuPopoverContent>
  </MizuPopoverPortal>
</MizuPopoverRoot>`;

const closeButtonCode = `<MizuPopoverRoot>
  <MizuPopoverTrigger>
    <MizuButton class="w-max" variant="secondary" size="sm">View announcement</MizuButton>
  </MizuPopoverTrigger>
  <MizuPopoverPortal>
    <MizuPopoverContent side="bottom" :side-offset="10">
      <div class="popover-header">
        <div class="popover-title">New Feature Available</div>
        <MizuPopoverClose class="popover-close-btn" aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </MizuPopoverClose>
      </div>
      <div class="popover-body">We've just released batch updates. Check out the changelog for the full list of improvements and bug fixes.</div>
      <MizuPopoverArrow />
    </MizuPopoverContent>
  </MizuPopoverPortal>
</MizuPopoverRoot>`;

const profileCode = `<MizuPopoverRoot>
  <MizuPopoverTrigger>
    <button class="avatar-trigger" aria-label="View profile">
      <MizuAvatar name="Mariko Kobayashi" size="md" color="primary" />
    </button>
  </MizuPopoverTrigger>
  <MizuPopoverPortal>
    <MizuPopoverContent side="bottom" align="start" :side-offset="8">
      <div class="profile-header">
        <MizuAvatar name="Mariko Kobayashi" size="lg" color="primary" />
        <div class="profile-info">
          <div class="profile-name">Mariko Kobayashi</div>
          <div class="profile-email">mariko@example.com</div>
        </div>
      </div>
      <div class="profile-meta">
        <div class="meta-row"><span class="meta-label">Role</span><span class="meta-value">Administrator</span></div>
        <div class="meta-row"><span class="meta-label">Status</span><span class="status-dot">Active</span></div>
      </div>
      <MizuPopoverArrow />
    </MizuPopoverContent>
  </MizuPopoverPortal>
</MizuPopoverRoot>`;

const controlledCode = `<MizuPopoverRoot v-model:open="open">
  <MizuPopoverTrigger>
    <MizuButton class="w-max" variant="secondary" size="sm">Toggle popover</MizuButton>
  </MizuPopoverTrigger>
  <MizuPopoverPortal>
    <MizuPopoverContent>
      <div class="popover-title">Controlled state</div>
      <div class="popover-body">Current open state: <strong>{{ open }}</strong></div>
      <div class="controlled-actions">
        <MizuPopoverClose>
          <MizuButton variant="primary" size="sm">Close</MizuButton>
        </MizuPopoverClose>
      </div>
    </MizuPopoverContent>
  </MizuPopoverPortal>
</MizuPopoverRoot>`;

const widthCode = `<MizuPopoverRoot>
  <MizuPopoverTrigger>
    <MizuButton class="w-max" variant="secondary" size="sm">Wide popover</MizuButton>
  </MizuPopoverTrigger>
  <MizuPopoverPortal>
    <MizuPopoverContent side="bottom" :side-offset="8" :style="{ width: '420px' }">
      <div class="popover-title">Wide layout</div>
      <div class="popover-body">Custom width via inline styles.</div>
    </MizuPopoverContent>
  </MizuPopoverPortal>
</MizuPopoverRoot>`;

const colorPickerCode = `<MizuPopoverRoot>
  <MizuPopoverTrigger>
    <button class="color-swatch" aria-label="Pick color" />
  </MizuPopoverTrigger>
  <MizuPopoverPortal>
    <MizuPopoverContent side="bottom" align="start" :side-offset="8">
      <div class="popover-title">Brand color</div>
      <div class="color-grid">
        <button class="color-chip" style="background: #001C44;" aria-label="Primary" />
        <button class="color-chip" style="background: #4F46E5;" aria-label="Indigo" />
        <button class="color-chip" style="background: #0EA5E9;" aria-label="Sky" />
        <button class="color-chip" style="background: #10B981;" aria-label="Emerald" />
        <button class="color-chip" style="background: #F59E0B;" aria-label="Amber" />
        <button class="color-chip" style="background: #EF4444;" aria-label="Red" />
        <button class="color-chip" style="background: #EC4899;" aria-label="Pink" />
        <button class="color-chip" style="background: #6B7280;" aria-label="Gray" />
      </div>
      <MizuPopoverArrow />
    </MizuPopoverContent>
  </MizuPopoverPortal>
</MizuPopoverRoot>`;

const dateRangeCode = `<MizuPopoverRoot>
  <MizuPopoverTrigger>
    <button class="date-trigger">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M16 2v4" />
        <path d="M8 2v4" />
        <path d="M3 10h18" />
      </svg>
      <span>Select date range</span>
    </button>
  </MizuPopoverTrigger>
  <MizuPopoverPortal>
    <MizuPopoverContent side="bottom" align="start" :side-offset="8">
      <div class="popover-title">Quick ranges</div>
      <div class="date-list">
        <button class="date-option">Today</button>
        <button class="date-option">Yesterday</button>
        <button class="date-option">Last 7 days</button>
        <button class="date-option">Last 30 days</button>
        <button class="date-option">This month</button>
        <button class="date-option">Last month</button>
        <button class="date-option">Custom range...</button>
      </div>
      <MizuPopoverArrow />
    </MizuPopoverContent>
  </MizuPopoverPortal>
</MizuPopoverRoot>`;

const modalCode = `<MizuPopoverRoot :modal="true">
  <MizuPopoverTrigger>
    <MizuButton class="w-max" variant="secondary" size="sm">Modal popover</MizuButton>
  </MizuPopoverTrigger>
  <MizuPopoverPortal>
    <MizuPopoverContent>
      <div class="popover-title">Modal mode</div>
      <div class="popover-body">When modal is true, the rest of the page is inert while the popover is open. The background is not clickable.</div>
      <div class="modal-actions">
        <MizuPopoverClose>
          <MizuButton variant="primary" size="sm">Close</MizuButton>
        </MizuPopoverClose>
      </div>
    </MizuPopoverContent>
  </MizuPopoverPortal>
</MizuPopoverRoot>`;

const controlledOpen = ref(false);
</script>

<template>
  <div class="popover-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="basicCode">
        <MizuPopoverRoot>
          <MizuPopoverTrigger>
            <MizuButton class="w-max" variant="primary" size="sm">Open popover</MizuButton>
          </MizuPopoverTrigger>
          <MizuPopoverPortal>
            <MizuPopoverContent>
              <div class="popover-title">About this feature</div>
              <div class="popover-body">
                Popovers are great for showing additional content or controls related to a trigger
                element.
              </div>
            </MizuPopoverContent>
          </MizuPopoverPortal>
        </MizuPopoverRoot>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Arrow</h3>
      <CodeCollapsible :code="arrowCode">
        <MizuPopoverRoot>
          <MizuPopoverTrigger>
            <MizuButton class="w-max" variant="secondary" size="sm">Show details</MizuButton>
          </MizuPopoverTrigger>
          <MizuPopoverPortal>
            <MizuPopoverContent side="bottom" :side-offset="10">
              <div class="popover-title">Pro tip</div>
              <div class="popover-body">
                Use the arrow to indicate which element the popover is anchored to.
              </div>
              <MizuPopoverArrow />
            </MizuPopoverContent>
          </MizuPopoverPortal>
        </MizuPopoverRoot>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Placements</h3>
      <CodeCollapsible :code="placementsCode">
        <div class="placement-grid">
          <MizuPopoverRoot>
            <MizuPopoverTrigger>
              <MizuButton variant="secondary" size="sm">Top</MizuButton>
            </MizuPopoverTrigger>
            <MizuPopoverPortal>
              <MizuPopoverContent side="top">
                <div class="popover-body">Popover on top</div>
                <MizuPopoverArrow />
              </MizuPopoverContent>
            </MizuPopoverPortal>
          </MizuPopoverRoot>

          <MizuPopoverRoot>
            <MizuPopoverTrigger>
              <MizuButton variant="secondary" size="sm">Right</MizuButton>
            </MizuPopoverTrigger>
            <MizuPopoverPortal>
              <MizuPopoverContent side="right">
                <div class="popover-body">Popover on right</div>
                <MizuPopoverArrow />
              </MizuPopoverContent>
            </MizuPopoverPortal>
          </MizuPopoverRoot>

          <MizuPopoverRoot>
            <MizuPopoverTrigger>
              <MizuButton variant="secondary" size="sm">Bottom</MizuButton>
            </MizuPopoverTrigger>
            <MizuPopoverPortal>
              <MizuPopoverContent side="bottom">
                <div class="popover-body">Popover on bottom</div>
                <MizuPopoverArrow />
              </MizuPopoverContent>
            </MizuPopoverPortal>
          </MizuPopoverRoot>

          <MizuPopoverRoot>
            <MizuPopoverTrigger>
              <MizuButton variant="secondary" size="sm">Left</MizuButton>
            </MizuPopoverTrigger>
            <MizuPopoverPortal>
              <MizuPopoverContent side="left">
                <div class="popover-body">Popover on left</div>
                <MizuPopoverArrow />
              </MizuPopoverContent>
            </MizuPopoverPortal>
          </MizuPopoverRoot>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Alignment</h3>
      <CodeCollapsible :code="alignmentCode">
        <div class="placement-grid">
          <MizuPopoverRoot>
            <MizuPopoverTrigger>
              <MizuButton class="w-max" variant="secondary" size="sm">Start</MizuButton>
            </MizuPopoverTrigger>
            <MizuPopoverPortal>
              <MizuPopoverContent side="bottom" align="start">
                <div class="popover-body">Aligned to start</div>
                <MizuPopoverArrow />
              </MizuPopoverContent>
            </MizuPopoverPortal>
          </MizuPopoverRoot>

          <MizuPopoverRoot>
            <MizuPopoverTrigger>
              <MizuButton class="w-max" variant="secondary" size="sm">Center</MizuButton>
            </MizuPopoverTrigger>
            <MizuPopoverPortal>
              <MizuPopoverContent side="bottom" align="center">
                <div class="popover-body">Aligned to center</div>
                <MizuPopoverArrow />
              </MizuPopoverContent>
            </MizuPopoverPortal>
          </MizuPopoverRoot>

          <MizuPopoverRoot>
            <MizuPopoverTrigger>
              <MizuButton class="w-max" variant="secondary" size="sm">End</MizuButton>
            </MizuPopoverTrigger>
            <MizuPopoverPortal>
              <MizuPopoverContent side="bottom" align="end">
                <div class="popover-body">Aligned to end</div>
                <MizuPopoverArrow />
              </MizuPopoverContent>
            </MizuPopoverPortal>
          </MizuPopoverRoot>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Form Controls</h3>
      <CodeCollapsible :code="formCode">
        <MizuPopoverRoot>
          <MizuPopoverTrigger>
            <MizuButton class="w-max" variant="secondary" size="sm">Settings</MizuButton>
          </MizuPopoverTrigger>
          <MizuPopoverPortal>
            <MizuPopoverContent side="bottom" align="start" :side-offset="6">
              <div class="popover-title">Filter options</div>
              <div class="form-stack">
                <label class="form-field">
                  <span class="form-label">Search</span>
                  <MizuInput size="sm" placeholder="Type to search..." />
                </label>
                <label class="form-field">
                  <span class="form-label">Sort by</span>
                  <select class="form-select">
                    <option>Newest first</option>
                    <option>Oldest first</option>
                    <option>Alphabetical</option>
                  </select>
                </label>
                <div class="form-actions">
                  <MizuPopoverClose>
                    <MizuButton variant="ghost" size="sm">Cancel</MizuButton>
                  </MizuPopoverClose>
                  <MizuPopoverClose>
                    <MizuButton variant="primary" size="sm">Apply</MizuButton>
                  </MizuPopoverClose>
                </div>
              </div>
            </MizuPopoverContent>
          </MizuPopoverPortal>
        </MizuPopoverRoot>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Close Button</h3>
      <CodeCollapsible :code="closeButtonCode">
        <MizuPopoverRoot>
          <MizuPopoverTrigger>
            <MizuButton class="w-max" variant="secondary" size="sm">View announcement</MizuButton>
          </MizuPopoverTrigger>
          <MizuPopoverPortal>
            <MizuPopoverContent side="bottom" :side-offset="10">
              <div class="popover-header">
                <div class="popover-title">New Feature Available</div>
                <MizuPopoverClose class="popover-close-btn" aria-label="Close">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </MizuPopoverClose>
              </div>
              <div class="popover-body">
                We've just released batch updates. Check out the changelog for the full list of
                improvements and bug fixes.
              </div>
              <MizuPopoverArrow />
            </MizuPopoverContent>
          </MizuPopoverPortal>
        </MizuPopoverRoot>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>User Profile Card</h3>
      <CodeCollapsible :code="profileCode">
        <MizuPopoverRoot>
          <MizuPopoverTrigger>
            <button class="avatar-trigger" aria-label="View profile">
              <MizuAvatar name="Mariko Kobayashi" size="md" color="primary" />
            </button>
          </MizuPopoverTrigger>
          <MizuPopoverPortal>
            <MizuPopoverContent side="bottom" align="start" :side-offset="8">
              <div class="profile-header">
                <MizuAvatar name="Mariko Kobayashi" size="lg" color="primary" />
                <div class="profile-info">
                  <div class="profile-name">Mariko Kobayashi</div>
                  <div class="profile-email">mariko@example.com</div>
                </div>
              </div>
              <div class="profile-meta">
                <div class="meta-row">
                  <span class="meta-label">Role</span><span class="meta-value">Administrator</span>
                </div>
                <div class="meta-row">
                  <span class="meta-label">Status</span><span class="status-dot">Active</span>
                </div>
              </div>
              <MizuPopoverArrow />
            </MizuPopoverContent>
          </MizuPopoverPortal>
        </MizuPopoverRoot>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Controlled (v-model:open)</h3>
      <CodeCollapsible :code="controlledCode">
        <div class="controlled-row">
          <MizuPopoverRoot v-model:open="controlledOpen">
            <MizuPopoverTrigger>
              <MizuButton class="w-max" variant="secondary" size="sm">Toggle popover</MizuButton>
            </MizuPopoverTrigger>
            <MizuPopoverPortal>
              <MizuPopoverContent>
                <div class="popover-title">Controlled state</div>
                <div class="popover-body">
                  Current open state: <strong>{{ controlledOpen }}</strong>
                </div>
                <div class="controlled-actions">
                  <MizuPopoverClose>
                    <MizuButton variant="primary" size="sm">Close via sub-component</MizuButton>
                  </MizuPopoverClose>
                </div>
              </MizuPopoverContent>
            </MizuPopoverPortal>
          </MizuPopoverRoot>
          <span class="state-text">open = {{ controlledOpen }}</span>
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Custom Width</h3>
      <CodeCollapsible :code="widthCode">
        <MizuPopoverRoot>
          <MizuPopoverTrigger>
            <MizuButton class="w-max" variant="secondary" size="sm">Wide popover</MizuButton>
          </MizuPopoverTrigger>
          <MizuPopoverPortal>
            <MizuPopoverContent side="bottom" :side-offset="8" :style="{ width: '420px' }">
              <div class="popover-title">Wide layout</div>
              <div class="popover-body">
                This popover demonstrates that the content can be customized with explicit widths
                via inline styles passed through to MizuPopoverContent. Useful for richer content
                like tables, grids, or multi-column forms.
              </div>
            </MizuPopoverContent>
          </MizuPopoverPortal>
        </MizuPopoverRoot>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Color Picker</h3>
      <CodeCollapsible :code="colorPickerCode">
        <MizuPopoverRoot>
          <MizuPopoverTrigger>
            <button class="color-swatch" aria-label="Pick color" />
          </MizuPopoverTrigger>
          <MizuPopoverPortal>
            <MizuPopoverContent side="bottom" align="start" :side-offset="8">
              <div class="popover-title">Brand color</div>
              <div class="color-grid">
                <button class="color-chip" style="background: #001c44" aria-label="Primary" />
                <button class="color-chip" style="background: #4f46e5" aria-label="Indigo" />
                <button class="color-chip" style="background: #0ea5e9" aria-label="Sky" />
                <button class="color-chip" style="background: #10b981" aria-label="Emerald" />
                <button class="color-chip" style="background: #f59e0b" aria-label="Amber" />
                <button class="color-chip" style="background: #ef4444" aria-label="Red" />
                <button class="color-chip" style="background: #ec4899" aria-label="Pink" />
                <button class="color-chip" style="background: #6b7280" aria-label="Gray" />
              </div>
              <MizuPopoverArrow />
            </MizuPopoverContent>
          </MizuPopoverPortal>
        </MizuPopoverRoot>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Date Range</h3>
      <CodeCollapsible :code="dateRangeCode">
        <MizuPopoverRoot>
          <MizuPopoverTrigger>
            <button class="date-trigger">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M16 2v4" />
                <path d="M8 2v4" />
                <path d="M3 10h18" />
              </svg>
              <span>Select date range</span>
            </button>
          </MizuPopoverTrigger>
          <MizuPopoverPortal>
            <MizuPopoverContent side="bottom" align="start" :side-offset="8">
              <div class="popover-title">Quick ranges</div>
              <div class="date-list">
                <button class="date-option">Today</button>
                <button class="date-option">Yesterday</button>
                <button class="date-option">Last 7 days</button>
                <button class="date-option">Last 30 days</button>
                <button class="date-option">This month</button>
                <button class="date-option">Last month</button>
                <button class="date-option">Custom range...</button>
              </div>
              <MizuPopoverArrow />
            </MizuPopoverContent>
          </MizuPopoverPortal>
        </MizuPopoverRoot>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Modal Mode</h3>
      <CodeCollapsible :code="modalCode">
        <MizuPopoverRoot :modal="true">
          <MizuPopoverTrigger>
            <MizuButton class="w-max" variant="secondary" size="sm">Modal popover</MizuButton>
          </MizuPopoverTrigger>
          <MizuPopoverPortal>
            <MizuPopoverContent>
              <div class="popover-title">Modal mode</div>
              <div class="popover-body">
                When modal is true, the rest of the page is inert while the popover is open. The
                background is not clickable.
              </div>
              <div class="modal-actions">
                <MizuPopoverClose>
                  <MizuButton variant="primary" size="sm">Close</MizuButton>
                </MizuPopoverClose>
              </div>
            </MizuPopoverContent>
          </MizuPopoverPortal>
        </MizuPopoverRoot>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.popover-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}
.popover-examples :deep(*) {
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

/* Component-specific styles */
.popover-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-foreground-primary);
  margin: 0 0 6px;
}

.popover-body {
  font-size: 13px;
  color: var(--color-foreground-secondary);
  line-height: 1.5;
  margin: 0;
}

.placement-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.avatar-trigger {
  display: inline-flex;
  align-items: inherit;
  justify-content: inherit;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.popover-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
}

.popover-close-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 4px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-foreground-tertiary);
  padding: 0;
  margin: 0;
  font: inherit;
  transition:
    background 150ms,
    color 150ms;
}

.popover-close-btn:hover {
  background: var(--color-surface-subtle);
  color: var(--color-foreground-primary);
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--color-surface-muted);
  margin-bottom: 10px;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.profile-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-foreground-primary);
}

.profile-email {
  font-size: 11px;
  color: var(--color-foreground-tertiary);
}

.profile-meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.meta-label {
  color: var(--color-foreground-tertiary);
}

.meta-value {
  color: var(--color-foreground-primary);
  font-weight: 500;
}

.status-dot {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: var(--color-feedback-success-base);
  font-weight: 500;
}

.status-dot::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-feedback-success-base);
}

.controlled-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.state-text {
  font-size: 12px;
  color: var(--color-foreground-tertiary);
  font-family: var(--sl-font-mono);
}

.controlled-actions {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}

.form-stack {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 4px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-foreground-secondary);
}

.form-select {
  height: 28px;
  padding: 0 8px;
  border-radius: 6px;
  border: 1px solid var(--color-surface-muted);
  background: var(--color-surface-base);
  color: var(--color-foreground-primary);
  font-size: 13px;
  font-family: inherit;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 6px;
  margin-top: 4px;
}

.color-swatch {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: linear-gradient(135deg, var(--color-brand-primary), var(--color-brand-ycp));
  border: 1px solid var(--color-surface-muted);
  cursor: pointer;
  padding: 0;
  margin: 0;
  font: inherit;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.color-chip {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 6px;
  border: 1px solid var(--color-surface-muted);
  cursor: pointer;
  padding: 0;
  margin: 0;
  font: inherit;
  transition: transform 150ms;
}

.color-chip:hover {
  transform: scale(1.1);
}

.date-trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid var(--color-surface-muted);
  background: var(--color-surface-base);
  color: var(--color-foreground-primary);
  font-size: 13px;
  font-family: inherit;
  cursor: pointer;
}

.date-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 4px;
}

.date-option {
  display: flex;
  align-items: center;
  text-align: left;
  width: 100%;
  padding: 6px 10px;
  border-radius: 6px;
  background: none;
  border: none;
  color: var(--color-foreground-primary);
  font-size: 13px;
  font-family: inherit;
  cursor: pointer;
  transition: background 150ms;
}

.date-option:hover {
  background: var(--color-surface-subtle);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}
</style>
