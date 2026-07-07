<script setup lang="ts">
import { ref } from "vue";
import {
  MizuNavigationMenuRoot,
  MizuNavigationMenuList,
  MizuNavigationMenuItem,
  MizuNavigationMenuTrigger,
  MizuNavigationMenuContent,
  MizuNavigationMenuLink,
  MizuNavigationMenuViewport,
} from "@mizu/vue";
import { ChevronDown, File, Settings, Users, BarChart3 } from "@lucide/vue";

const active = ref("home");
</script>

<template>
  <div class="nav-menu-demo">
    <div class="demo-section">
      <h3>Basic Navigation</h3>
      <p class="demo-note">
        Horizontal menu with dropdown content. Hover or click triggers to reveal panels.
      </p>
      <MizuNavigationMenuRoot orientation="horizontal">
        <MizuNavigationMenuList>
          <MizuNavigationMenuItem value="home">
            <MizuNavigationMenuTrigger>Home</MizuNavigationMenuTrigger>
            <MizuNavigationMenuContent>
              <div class="content-grid">
                <MizuNavigationMenuLink href="#overview"
                  ><File :size="16" /> Overview</MizuNavigationMenuLink
                >
                <MizuNavigationMenuLink href="#getting-started"
                  ><File :size="16" /> Getting Started</MizuNavigationMenuLink
                >
                <MizuNavigationMenuLink href="#faq"><File :size="16" /> FAQ</MizuNavigationMenuLink>
              </div>
            </MizuNavigationMenuContent>
          </MizuNavigationMenuItem>
          <MizuNavigationMenuItem value="components">
            <MizuNavigationMenuTrigger
              >Components <ChevronDown :size="14"
            /></MizuNavigationMenuTrigger>
            <MizuNavigationMenuContent>
              <div class="content-grid">
                <MizuNavigationMenuLink href="#accordion">Accordion</MizuNavigationMenuLink>
                <MizuNavigationMenuLink href="#button">Button</MizuNavigationMenuLink>
                <MizuNavigationMenuLink href="#card">Card</MizuNavigationMenuLink>
                <MizuNavigationMenuLink href="#dialog">Dialog</MizuNavigationMenuLink>
                <MizuNavigationMenuLink href="#input">Input</MizuNavigationMenuLink>
                <MizuNavigationMenuLink href="#select">Select</MizuNavigationMenuLink>
              </div>
            </MizuNavigationMenuContent>
          </MizuNavigationMenuItem>
          <MizuNavigationMenuItem value="docs">
            <MizuNavigationMenuTrigger>Docs <ChevronDown :size="14" /></MizuNavigationMenuTrigger>
            <MizuNavigationMenuContent>
              <div class="content-grid">
                <MizuNavigationMenuLink href="#tokens">Tokens</MizuNavigationMenuLink>
                <MizuNavigationMenuLink href="#changelog">Changelog</MizuNavigationMenuLink>
              </div>
            </MizuNavigationMenuContent>
          </MizuNavigationMenuItem>
        </MizuNavigationMenuList>
        <MizuNavigationMenuViewport />
      </MizuNavigationMenuRoot>
    </div>

    <div class="demo-section">
      <h3>With Active Link</h3>
      <p class="demo-note">
        Use the <code>active</code> prop on links to highlight the current page.
      </p>
      <MizuNavigationMenuRoot orientation="horizontal">
        <MizuNavigationMenuList>
          <MizuNavigationMenuItem>
            <MizuNavigationMenuLink
              href="#"
              :active="active === 'home'"
              @click.prevent="active = 'home'"
              >Home</MizuNavigationMenuLink
            >
          </MizuNavigationMenuItem>
          <MizuNavigationMenuItem>
            <MizuNavigationMenuLink
              href="#"
              :active="active === 'about'"
              @click.prevent="active = 'about'"
              >About</MizuNavigationMenuLink
            >
          </MizuNavigationMenuItem>
          <MizuNavigationMenuItem>
            <MizuNavigationMenuLink
              href="#"
              :active="active === 'contact'"
              @click.prevent="active = 'contact'"
              >Contact</MizuNavigationMenuLink
            >
          </MizuNavigationMenuItem>
        </MizuNavigationMenuList>
      </MizuNavigationMenuRoot>
    </div>
    <div class="demo-section">
      <h3>Icon Triggers</h3>
      <p class="demo-note">
        Triggers can include icons. Content panels support rich multi-column layouts.
      </p>
      <MizuNavigationMenuRoot orientation="horizontal">
        <MizuNavigationMenuList>
          <MizuNavigationMenuItem value="analytics">
            <MizuNavigationMenuTrigger
              ><BarChart3 :size="16" /> Analytics <ChevronDown :size="14"
            /></MizuNavigationMenuTrigger>
            <MizuNavigationMenuContent>
              <div class="rich-panel">
                <div class="panel-section">
                  <h4>Reports</h4>
                  <MizuNavigationMenuLink href="#sales"
                    ><File :size="14" /> Sales Report</MizuNavigationMenuLink
                  >
                  <MizuNavigationMenuLink href="#traffic"
                    ><File :size="14" /> Traffic Report</MizuNavigationMenuLink
                  >
                </div>
                <div class="panel-section">
                  <h4>Insights</h4>
                  <MizuNavigationMenuLink href="#trends"
                    ><File :size="14" /> Trends</MizuNavigationMenuLink
                  >
                  <MizuNavigationMenuLink href="#funnels"
                    ><File :size="14" /> Funnels</MizuNavigationMenuLink
                  >
                </div>
              </div>
            </MizuNavigationMenuContent>
          </MizuNavigationMenuItem>
          <MizuNavigationMenuItem value="team">
            <MizuNavigationMenuTrigger
              ><Users :size="16" /> Team <ChevronDown :size="14"
            /></MizuNavigationMenuTrigger>
            <MizuNavigationMenuContent>
              <div class="content-grid">
                <MizuNavigationMenuLink href="#members"
                  ><Users :size="16" /> Members</MizuNavigationMenuLink
                >
                <MizuNavigationMenuLink href="#invites"
                  ><File :size="16" /> Invitations</MizuNavigationMenuLink
                >
                <MizuNavigationMenuLink href="#roles"
                  ><Settings :size="16" /> Roles &amp; Permissions</MizuNavigationMenuLink
                >
              </div>
            </MizuNavigationMenuContent>
          </MizuNavigationMenuItem>
        </MizuNavigationMenuList>
        <MizuNavigationMenuViewport />
      </MizuNavigationMenuRoot>
    </div>

    <div class="demo-section">
      <h3>Vertical Orientation</h3>
      <p class="demo-note">Use <code>orientation="vertical"</code> for sidebar-style navigation.</p>
      <MizuNavigationMenuRoot orientation="vertical" class="vertical-nav">
        <MizuNavigationMenuList>
          <MizuNavigationMenuItem>
            <MizuNavigationMenuLink href="#" :active="true"
              ><File :size="16" /> Dashboard</MizuNavigationMenuLink
            >
          </MizuNavigationMenuItem>
          <MizuNavigationMenuItem>
            <MizuNavigationMenuLink href="#"><Users :size="16" /> Users</MizuNavigationMenuLink>
          </MizuNavigationMenuItem>
          <MizuNavigationMenuItem>
            <MizuNavigationMenuLink href="#"
              ><Settings :size="16" /> Settings</MizuNavigationMenuLink
            >
          </MizuNavigationMenuItem>
        </MizuNavigationMenuList>
      </MizuNavigationMenuRoot>
    </div>
  </div>
</template>

<style scoped>
.nav-menu-demo {
  all: revert;
}
.nav-menu-demo {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  background: var(--sl-color-gray-2);
  border-radius: 8px;
}
.nav-menu-demo :deep(*) {
  margin: 0;
}
.demo-section {
  margin-top: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.demo-section > * {
  margin-top: 0;
}
.demo-section h3 {
  all: revert;
  font-size: 14px;
  font-weight: 600;
  color: var(--sl-color-text);
  margin: 0;
}
.demo-note {
  font-size: 12px;
  color: var(--sl-color-text-light);
  margin: 0;
}
.demo-note code {
  font-size: 11px;
}
.content-grid {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 200px;
}
.rich-panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  min-width: 420px;
}
.panel-section {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.panel-section h4 {
  all: revert;
  font-size: 13px;
  font-weight: 600;
  color: var(--sl-color-text);
  margin: 0 0 8px 0;
}
.vertical-nav {
  width: 200px;
}
</style>
