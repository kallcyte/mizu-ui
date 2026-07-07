<script setup lang="ts">
import { MizuMetric } from "@mizu/vue";
import CodeCollapsible from "./CodeCollapsible.vue";

const basicCode = `<MizuMetric label="Total Revenue" value="$128,500" />
<MizuMetric label="Active Users" value="24,521" />
<MizuMetric label="Conversion Rate" value="3.2%" />`;

const sizesCode = `<MizuMetric label="Small" value="1,234" size="sm" />
<MizuMetric label="Medium" value="1,234" size="md" />
<MizuMetric label="Large" value="1,234" size="lg" />`;

const variantsCode = `<MizuMetric label="Default" value="42" variant="default" />
<MizuMetric label="Primary" value="42" variant="primary" />
<MizuMetric label="Accent" value="42" variant="accent" />
<MizuMetric label="Success" value="42" variant="success" />
<MizuMetric label="Warning" value="42" variant="warning" />
<MizuMetric label="Error" value="42" variant="error" />`;

const trendCode = `<MizuMetric label="Revenue" value="$48,250" trend="up" trend-value="+12.5%" />
<MizuMetric label="Bounce Rate" value="24.3%" trend="down" trend-value="-3.2%" />
<MizuMetric label="Impressions" value="142K" trend="neutral" trend-value="0%" />`;

const dashboardCode = `<MizuMetric label="Total Sales" value="$84,250" trend="up" trend-value="+8.2%" variant="primary" size="lg" />
<MizuMetric label="Orders" value="1,842" trend="up" trend-value="+5.7%" variant="accent" />
<MizuMetric label="Returns" value="23" trend="down" trend-value="-2.1%" variant="error" />
<MizuMetric label="Avg. Order Value" value="$46.20" trend="up" trend-value="+1.4%" variant="success" />`;
</script>

<template>
  <div class="metric-examples">
    <section class="example-section">
      <h3>Basic</h3>
      <CodeCollapsible :code="basicCode">
        <div class="metric-grid">
          <MizuMetric label="Total Revenue" value="$128,500" />
          <MizuMetric label="Active Users" value="24,521" />
          <MizuMetric label="Conversion Rate" value="3.2%" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Sizes</h3>
      <CodeCollapsible :code="sizesCode">
        <div class="metric-grid">
          <MizuMetric label="Small" value="1,234" size="sm" />
          <MizuMetric label="Medium" value="1,234" size="md" />
          <MizuMetric label="Large" value="1,234" size="lg" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Variants</h3>
      <CodeCollapsible :code="variantsCode">
        <div class="metric-grid">
          <MizuMetric label="Default" value="42" variant="default" />
          <MizuMetric label="Primary" value="42" variant="primary" />
          <MizuMetric label="Accent" value="42" variant="accent" />
          <MizuMetric label="Success" value="42" variant="success" />
          <MizuMetric label="Warning" value="42" variant="warning" />
          <MizuMetric label="Error" value="42" variant="error" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>With Trend</h3>
      <CodeCollapsible :code="trendCode">
        <div class="metric-grid">
          <MizuMetric label="Revenue" value="$48,250" trend="up" trend-value="+12.5%" />
          <MizuMetric label="Bounce Rate" value="24.3%" trend="down" trend-value="-3.2%" />
          <MizuMetric label="Impressions" value="142K" trend="neutral" trend-value="0%" />
        </div>
      </CodeCollapsible>
    </section>

    <section class="example-section">
      <h3>Dashboard Example</h3>
      <CodeCollapsible :code="dashboardCode">
        <div class="dashboard-grid">
          <div class="dashboard-card">
            <MizuMetric
              label="Total Sales"
              value="$84,250"
              trend="up"
              trend-value="+8.2%"
              variant="primary"
              size="lg"
            />
          </div>
          <div class="dashboard-card">
            <MizuMetric
              label="Orders"
              value="1,842"
              trend="up"
              trend-value="+5.7%"
              variant="accent"
            />
          </div>
          <div class="dashboard-card">
            <MizuMetric
              label="Returns"
              value="23"
              trend="down"
              trend-value="-2.1%"
              variant="error"
            />
          </div>
          <div class="dashboard-card">
            <MizuMetric
              label="Avg. Order Value"
              value="$46.20"
              trend="up"
              trend-value="+1.4%"
              variant="success"
            />
          </div>
        </div>
      </CodeCollapsible>
    </section>
  </div>
</template>

<style scoped>
.metric-examples {
  all: revert;
  display: flex;
  flex-direction: column;
  gap: 32px;
  font-family: inherit;
}

.metric-examples :deep(*) {
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
