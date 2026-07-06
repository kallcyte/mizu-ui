<script setup lang="ts">
import { MizuAvatar } from "@mizu/vue";
import DemoTabs from "./DemoTabs.vue";

const user = {
    name: "Mariko Tanaka",
    role: "Product Manager",
    src: "https://i.pravatar.cc/96?img=47",
};

const team = [
    { name: "Aria Patel", src: "https://i.pravatar.cc/96?img=32" },
    { name: "Daichi Suzuki", src: "https://i.pravatar.cc/96?img=12" },
    { name: "Elena Rossi", src: "https://i.pravatar.cc/96?img=49" },
    { name: "Mateo Alvarez" },
    { name: "Hina Yamamoto" },
    { name: "" },
];

const basicCode = `<MizuAvatar name="Mariko Tanaka" />
<MizuAvatar name="Daichi Suzuki" />
<MizuAvatar name="Elena Rossi" />
<MizuAvatar name="Mateo Alvarez" />
<MizuAvatar name="Hina Yamamoto" />`;

const withImageCode = `<MizuAvatar name="Aria Patel" src="https://i.pravatar.cc/96?img=32" />
<MizuAvatar name="Daichi Suzuki" src="https://i.pravatar.cc/96?img=12" />
<MizuAvatar name="Elena Rossi" src="https://i.pravatar.cc/96?img=49" />
<MizuAvatar name="Broken Image" />`;

const sizesCode = `<MizuAvatar name="Small" size="sm" />
<MizuAvatar name="Medium" size="md" />
<MizuAvatar name="Large" size="lg" />
<MizuAvatar name="Xtra Large" size="xl" />`;

const sizesWithImageCode = `<MizuAvatar name="Small" size="sm" src="https://i.pravatar.cc/96?img=12" />
<MizuAvatar name="Medium" size="md" src="https://i.pravatar.cc/96?img=12" />
<MizuAvatar name="Large" size="lg" src="https://i.pravatar.cc/96?img=12" />
<MizuAvatar name="Eli Lin" size="xl" src="https://i.pravatar.cc/96?img=12" />`;

const shapesCode = `<MizuAvatar name="Circle" shape="circle" />
<MizuAvatar name="Square" shape="square" />
<MizuAvatar name="Circle" shape="circle" size="lg" src="https://i.pravatar.cc/96?img=49" />
<MizuAvatar name="Square" shape="square" size="lg" src="https://i.pravatar.cc/96?img=49" />`;

const colorVariantsCode = `<MizuAvatar name="Muted" color="muted" />
<MizuAvatar name="Primary" color="primary" />
<MizuAvatar name="Accent" color="accent" />
<MizuAvatar name="Neutral" color="neutral" />`;

const anonymousCode = `<MizuAvatar size="sm" />
<MizuAvatar size="md" />
<MizuAvatar size="lg" />
<MizuAvatar size="xl" />`;

const customIconSlotCode = `<MizuAvatar size="md">
  <template #icon>
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
      <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
      <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
    </svg>
  </template>
</MizuAvatar>
<MizuAvatar size="lg" color="primary">
  <template #icon>
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" />
    </svg>
  </template>
</MizuAvatar>
<MizuAvatar size="md" color="accent">
  <template #icon>
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 2L14 8H20L15 12L17 18L12 14L7 18L9 12L4 8H10L12 2Z" fill="currentColor" />
    </svg>
  </template>
</MizuAvatar>`;

const teamListCode = `<div v-for="member in team" :key="member.name || 'anon'" class="team-row">
  <MizuAvatar :name="member.name" :src="member.src" size="md" />
  <div class="team-info">
    <div class="team-name">
      {{ member.name || "Anonymous User" }}
    </div>
    <div class="team-meta">
      {{ member.src ? "Has photo" : "No photo" }}
    </div>
  </div>
</div>`;

const commentThreadCode = `<div class="comment">
  <MizuAvatar name="Aria Patel" src="https://i.pravatar.cc/96?img=32" size="md" />
  <div class="comment-body">
    <div class="comment-header">
      <span class="comment-author">Aria Patel</span>
      <span class="comment-time">2 hours ago</span>
    </div>
    <p class="comment-text">
      Pulled the latest design tokens into the shared package — let me know if anything in the dashboard layout feels off.
    </p>
  </div>
</div>`;

const profileHeaderCode = `<MizuAvatar :name="user.name" :src="user.src" size="xl" />
<div class="profile-info">
  <div class="profile-name">{{ user.name }}</div>
  <div class="profile-role">{{ user.role }}</div>
</div>`;
</script>

<template>
    <div class="avatar-demo not-content">
        <DemoTabs :code="basicCode">
        <div class="demo-section">
            <h3>Basic</h3>
            <div class="avatar-row">
                <MizuAvatar name="Mariko Tanaka" />
                <MizuAvatar name="Daichi Suzuki" />
                <MizuAvatar name="Elena Rossi" />
                <MizuAvatar name="Mateo Alvarez" />
                <MizuAvatar name="Hina Yamamoto" />
            </div>
        </div>
        </DemoTabs>

        <DemoTabs :code="withImageCode">
        <div class="demo-section">
            <h3>With Image</h3>
            <div class="avatar-row">
                <MizuAvatar
                    name="Aria Patel"
                    src="https://i.pravatar.cc/96?img=32"
                />
                <MizuAvatar
                    name="Daichi Suzuki"
                    src="https://i.pravatar.cc/96?img=12"
                />
                <MizuAvatar
                    name="Elena Rossi"
                    src="https://i.pravatar.cc/96?img=49"
                />
                <MizuAvatar
                    name="Broken Image"
                />
            </div>
        </div>
        </DemoTabs>

        <DemoTabs :code="sizesCode">
        <div class="demo-section">
            <h3>Sizes</h3>
            <div class="avatar-row avatar-row--baseline">
                <MizuAvatar name="Small" size="sm" />
                <MizuAvatar name="Medium" size="md" />
                <MizuAvatar name="Large" size="lg" />
                <MizuAvatar name="Xtra Large" size="xl" />
            </div>
        </div>
        </DemoTabs>

        <DemoTabs :code="sizesWithImageCode">
        <div class="demo-section">
            <h3>Sizes With Image</h3>
            <div class="avatar-row avatar-row--baseline">
                <MizuAvatar
                    name="Small"
                    size="sm"
                    src="https://i.pravatar.cc/96?img=12"
                />
                <MizuAvatar
                    name="Medium"
                    size="md"
                    src="https://i.pravatar.cc/96?img=12"
                />
                <MizuAvatar
                    name="Large"
                    size="lg"
                    src="https://i.pravatar.cc/96?img=12"
                />
                <MizuAvatar
                    name="Eli Lin"
                    size="xl"
                    src="https://i.pravatar.cc/96?img=12"
                />
            </div>
        </div>
        </DemoTabs>

        <DemoTabs :code="shapesCode">
        <div class="demo-section">
            <h3>Shapes</h3>
            <div class="avatar-row avatar-row--baseline">
                <MizuAvatar name="Circle" shape="circle" />
                <MizuAvatar name="Square" shape="square" />
                <MizuAvatar name="Circle" shape="circle" size="lg" src="https://i.pravatar.cc/96?img=49" />
                <MizuAvatar name="Square" shape="square" size="lg" src="https://i.pravatar.cc/96?img=49" />
            </div>
        </div>
        </DemoTabs>

        <DemoTabs :code="colorVariantsCode">
        <div class="demo-section">
            <h3>Color Variants</h3>
            <div class="avatar-row avatar-row--baseline">
                <MizuAvatar name="Muted" color="muted" />
                <MizuAvatar name="Primary" color="primary" />
                <MizuAvatar name="Accent" color="accent" />
                <MizuAvatar name="Neutral" color="neutral" />
            </div>
        </div>
        </DemoTabs>

        <DemoTabs :code="anonymousCode">
        <div class="demo-section">
            <h3>Anonymous (Default Icon)</h3>
            <div class="avatar-row avatar-row--baseline">
                <MizuAvatar size="sm" />
                <MizuAvatar size="md" />
                <MizuAvatar size="lg" />
                <MizuAvatar size="xl" />
            </div>
        </div>
        </DemoTabs>

        <DemoTabs :code="customIconSlotCode">
        <div class="demo-section">
            <h3>Custom Icon Slot</h3>
            <div class="avatar-row avatar-row--baseline">
                <MizuAvatar size="md">
                    <template #icon>
                        <svg viewBox="0 0 24 24" fill="none">
                            <path
                                d="M12 2L2 7L12 12L22 7L12 2Z"
                                fill="currentColor"
                            />
                            <path
                                d="M2 17L12 22L22 17"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M2 12L12 17L22 12"
                                stroke="currentColor"
                                stroke-width="1.5"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </template>
                </MizuAvatar>
                <MizuAvatar size="lg" color="primary">
                    <template #icon>
                        <svg viewBox="0 0 24 24" fill="none">
                            <path
                                d="M9 12L11 14L15 10"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5" />
                        </svg>
                    </template>
                </MizuAvatar>
                <MizuAvatar size="md" color="accent">
                    <template #icon>
                        <svg viewBox="0 0 24 24" fill="none">
                            <path
                                d="M12 2L14 8H20L15 12L17 18L12 14L7 18L9 12L4 8H10L12 2Z"
                                fill="currentColor"
                            />
                        </svg>
                    </template>
                </MizuAvatar>
            </div>
        </div>
        </DemoTabs>

        <DemoTabs :code="teamListCode">
        <div class="demo-section">
            <h3>Team List (Real-world)</h3>
            <div class="team-list">
                <div v-for="member in team" :key="member.name || 'anon'" class="team-row">
                    <MizuAvatar
                        :name="member.name"
                        :src="member.src"
                        size="md"
                    />
                    <div class="team-info">
                        <div class="team-name">
                            {{ member.name || "Anonymous User" }}
                        </div>
                        <div class="team-meta">
                            {{ member.src ? "Has photo" : "No photo" }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </DemoTabs>

        <DemoTabs :code="commentThreadCode">
        <div class="demo-section">
            <h3>Comment Thread</h3>
            <div class="comment">
                <MizuAvatar
                    name="Aria Patel"
                    src="https://i.pravatar.cc/96?img=32"
                    size="md"
                />
                <div class="comment-body">
                    <div class="comment-header">
                        <span class="comment-author">Aria Patel</span>
                        <span class="comment-time">2 hours ago</span>
                    </div>
                    <p class="comment-text">
                        Pulled the latest design tokens into the shared package — let me know if anything in the dashboard layout feels off.
                    </p>
                </div>
            </div>
        </div>
        </DemoTabs>

        <DemoTabs :code="profileHeaderCode">
        <div class="demo-section">
            <h3>Profile Header (Large)</h3>
            <div class="profile">
                <MizuAvatar
                    :name="user.name"
                    :src="user.src"
                    size="xl"
                />
                <div class="profile-info">
                    <div class="profile-name">{{ user.name }}</div>
                    <div class="profile-role">{{ user.role }}</div>
                </div>
            </div>
        </div>
        </DemoTabs>
    </div>
</template>

<style scoped>
.avatar-demo {
    all: revert;
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 24px;
    background: transparent;

    border: 1px solid var(--color-surface-muted);
    border-radius: 8px;
}

.avatar-demo :deep(*) {
    margin: 0;
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
    margin-top: 0;
}
.demo-section > div {
  margin-top: 0;
}

.avatar-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
}

.avatar-row--baseline {
    align-items: baseline;
}

/* Team list */
.team-list {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--sl-color-gray-4);
    border-radius: 8px;
    background: var(--sl-color-white);
    overflow: hidden;
}
:global(html[data-theme="dark"] .team-list) {
    background: var(--sl-color-black);
    border-color: var(--sl-color-gray-5);
}

.team-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    border-bottom: 1px solid var(--sl-color-gray-4);
}
.team-row:last-child { border-bottom: none; }
:global(html[data-theme="dark"] .team-row) {
    border-bottom-color: var(--sl-color-gray-5);
}

.team-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
}

.team-name {
    font-size: 13px;
    font-weight: 500;
    color: var(--sl-color-text);
}

.team-meta {
    font-size: 11px;
    color: var(--sl-color-text-light);
}

/* Comment */
.comment {
    display: flex;
    gap: 12px;
    padding: 12px;
    background: var(--sl-color-white);
    border: 1px solid var(--sl-color-gray-4);
    border-radius: 8px;
}
:global(html[data-theme="dark"] .comment) {
    background: var(--sl-color-black);
    border-color: var(--sl-color-gray-5);
}

.comment-body {
    flex: 1;
    min-width: 0;
}

.comment-header {
    display: flex;
    gap: 8px;
    align-items: baseline;
    margin-bottom: 4px;
}

.comment-author {
    font-size: 13px;
    font-weight: 600;
    color: var(--sl-color-text);
}

.comment-time {
    font-size: 11px;
    color: var(--sl-color-text-light);
}

.comment-text {
    font-size: 13px;
    line-height: 1.5;
    color: var(--sl-color-text);
}

/* Profile */
.profile {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: var(--sl-color-white);
    border: 1px solid var(--sl-color-gray-4);
    border-radius: 8px;
}
:global(html[data-theme="dark"] .profile) {
    background: var(--sl-color-black);
    border-color: var(--sl-color-gray-5);
}

.profile-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.profile-name {
    font-size: 16px;
    font-weight: 600;
    color: var(--sl-color-text);
}

.profile-role {
    font-size: 12px;
    color: var(--sl-color-text-light);
}
</style>
