<script setup lang="ts">
import MizuMetric from "../components/MizuMetric.vue";
</script>

<template>
  <Story title="MizuMetric" :layout="{ type: 'single', width: 400 }">
    <Variant title="Sizes">
      <div class="flex flex-wrap gap-6 items-end">
        <MizuMetric label="Revenue" value="$12,450" size="sm" />
        <MizuMetric label="Revenue" value="$12,450" size="md" />
        <MizuMetric label="Revenue" value="$12,450" size="lg" />
      </div>
    </Variant>

    <Variant title="Variants">
      <div class="flex flex-wrap gap-6 items-end">
        <MizuMetric label="Downloads" value="8,241" variant="default" />
        <MizuMetric label="Active Users" value="1,204" variant="primary" />
        <MizuMetric label="New Signups" value="342" variant="accent" />
        <MizuMetric label="Conversions" value="12.4%" variant="success" />
        <MizuMetric label="Latency" value="320ms" variant="warning" />
        <MizuMetric label="Errors" value="47" variant="error" />
      </div>
    </Variant>

    <Variant title="Trends">
      <div class="flex flex-wrap gap-6 items-end">
        <MizuMetric label="Revenue" value="$12,450" trend="up" trend-value="+12.5%" />
        <MizuMetric label="Churn" value="2.1%" trend="down" trend-value="-0.8%" />
        <MizuMetric label="Sessions" value="45.2K" trend="neutral" trend-value="No change" />
      </div>
    </Variant>

    <Variant title="Combined">
      <div class="flex flex-wrap gap-6 items-end">
        <MizuMetric
          label="MRR"
          value="$52,400"
          size="lg"
          variant="primary"
          trend="up"
          trend-value="+18.2%"
        />
        <MizuMetric
          label="Support Tickets"
          value="23"
          size="sm"
          variant="warning"
          trend="down"
          trend-value="-5 since last week"
        />
      </div>
    </Variant>
  </Story>
</template>
