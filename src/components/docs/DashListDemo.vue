<script setup lang="ts">
import { MizuDashList } from "@mizu/vue";
import DemoTabs from "./DemoTabs.vue";

const userInfo = [
  { label: "Full Name", value: "Jane Doe" },
  { label: "Email", value: "jane.doe@example.com" },
  { label: "Role", value: "Senior Designer" },
  { label: "Department", value: "Product Design" },
  { label: "Status", value: "Active", highlighted: true },
];

const analyticsData = [
  { label: "Total Users", value: "24,521", highlighted: true },
  { label: "Active Today", value: "3,847" },
  { label: "Avg. Session", value: "4m 32s" },
  { label: "Bounce Rate", value: "32.1%" },
];

const productSpecs = [
  { label: "Dimensions", value: "120 × 80 × 15 mm" },
  { label: "Weight", value: "245 g" },
  { label: "Material", value: "Aluminum" },
  { label: "Color", value: "Space Gray" },
  { label: "Warranty", value: "2 years", highlighted: true },
];

const verticalCode = `<MizuDashList :items="userInfo" size="md" />`;

const sizesCode = `<MizuDashList :items="analyticsData" size="sm" />
<MizuDashList :items="analyticsData" size="md" />
<MizuDashList :items="analyticsData" size="lg" />`;

const horizontalCode = `<MizuDashList :items="productSpecs" size="md" orientation="horizontal" />`;
</script>

<template>
  <div class="dashlist-demo not-content">
    <div class="demo-section">
      <h3>Vertical (Default)</h3>
      <DemoTabs :code="verticalCode">
      <MizuDashList :items="userInfo" size="md" />
      </DemoTabs>
    </div>

    <div class="demo-section">
      <h3>Sizes</h3>
      <DemoTabs :code="sizesCode">
      <div class="dashlist-grid">
        <div>
          <h4>Small</h4>
          <MizuDashList :items="analyticsData" size="sm" />
        </div>
        <div>
          <h4>Medium</h4>
          <MizuDashList :items="analyticsData" size="md" />
        </div>
        <div>
          <h4>Large</h4>
          <MizuDashList :items="analyticsData" size="lg" />
        </div>
      </div>
      </DemoTabs>
    </div>

    <div class="demo-section">
      <h3>Horizontal</h3>
      <DemoTabs :code="horizontalCode">
      <MizuDashList :items="productSpecs" size="md" orientation="horizontal" />
      </DemoTabs>
    </div>
  </div>
</template>

<style scoped>
.dashlist-demo {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0;
  background: transparent;
}

.dashlist-demo :deep(*) {
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

.demo-section h4 {
  font-size: 12px;
  font-weight: 500;
  color: var(--sl-color-text-light);
  margin-bottom: 8px;
  margin-top: 0;
}

.dashlist-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
</style>
