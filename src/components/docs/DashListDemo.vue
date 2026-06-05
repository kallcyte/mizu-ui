<script setup lang="ts">
import { MizuDashList } from "@mizu/vue";

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
</script>

<template>
  <div class="dashlist-demo">
    <div class="demo-section">
      <h3>Vertical (Default)</h3>
      <MizuDashList :items="userInfo" size="md" />
    </div>

    <div class="demo-section">
      <h3>Sizes</h3>
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
    </div>

    <div class="demo-section">
      <h3>Horizontal</h3>
      <MizuDashList :items="productSpecs" size="md" orientation="horizontal" />
    </div>
  </div>
</template>

<style scoped>
.dashlist-demo {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  background: var(--sl-color-gray-2);
  border-radius: 8px;
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
