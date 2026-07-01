<script setup lang="ts">
import { MizuMetric } from "@mizu/vue";
</script>

<template>
  <div class="metric-demo">
    <div class="demo-section">
      <h3>Basic</h3>
      <div class="metric-grid">
        <MizuMetric label="Total Revenue" value="$128,500" />
        <MizuMetric label="Active Users" value="24,521" />
        <MizuMetric label="Conversion Rate" value="3.2%" />
      </div>
    </div>

    <div class="demo-section">
      <h3>Sizes</h3>
      <div class="metric-grid">
        <MizuMetric label="Small" value="1,234" size="sm" />
        <MizuMetric label="Medium" value="1,234" size="md" />
        <MizuMetric label="Large" value="1,234" size="lg" />
      </div>
    </div>

    <div class="demo-section">
      <h3>Variants</h3>
      <div class="metric-grid">
        <MizuMetric label="Default" value="42" variant="default" />
        <MizuMetric label="Primary" value="42" variant="primary" />
        <MizuMetric label="Accent" value="42" variant="accent" />
        <MizuMetric label="Success" value="42" variant="success" />
        <MizuMetric label="Warning" value="42" variant="warning" />
        <MizuMetric label="Error" value="42" variant="error" />
      </div>
    </div>

    <div class="demo-section">
      <h3>With Trend</h3>
      <div class="metric-grid">
        <MizuMetric label="Revenue" value="$48,250" trend="up" trend-value="+12.5%" />
        <MizuMetric label="Bounce Rate" value="24.3%" trend="down" trend-value="-3.2%" />
        <MizuMetric label="Impressions" value="142K" trend="neutral" trend-value="0%" />
      </div>
    </div>

    <div class="demo-section">
      <h3>Dashboard Example</h3>
      <div class="dashboard-grid">
        <div class="dashboard-card">
          <MizuMetric label="Total Sales" value="$84,250" trend="up" trend-value="+8.2%" variant="primary" size="lg" />
        </div>
        <div class="dashboard-card">
          <MizuMetric label="Orders" value="1,842" trend="up" trend-value="+5.7%" variant="accent" />
        </div>
        <div class="dashboard-card">
          <MizuMetric label="Returns" value="23" trend="down" trend-value="-2.1%" variant="error" />
        </div>
        <div class="dashboard-card">
          <MizuMetric label="Avg. Order Value" value="$46.20" trend="up" trend-value="+1.4%" variant="success" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.metric-demo {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  background: var(--sl-color-gray-2);
  border-radius: 8px;
}

.metric-demo :deep(*) {
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

.metric-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.dashboard-card {
  background: var(--sl-color-gray-3);
  padding: 16px;
  border-radius: 8px;
  border: 1px solid var(--sl-color-gray-4);
}
</style>
