<script setup lang="ts">
import MizuDashList from "../components/MizuDashList.vue";

const items = [
  { label: "Status", value: "Active" },
  { label: "Region", value: "us-east-1" },
  { label: "Instances", value: "3", highlighted: true },
  { label: "CPU Usage", value: "42%" },
  { label: "Uptime", value: "99.9%" },
];
</script>

<template>
  <Story title="MizuDashList" :layout="{ type: 'single', width: 400 }">
    <Variant title="Sizes">
      <div class="flex flex-col gap-8">
        <div>
          <p class="text-xs font-semibold text-foreground-secondary mb-2">Small</p>
          <MizuDashList :items="items" size="sm" />
        </div>
        <div>
          <p class="text-xs font-semibold text-foreground-secondary mb-2">Medium</p>
          <MizuDashList :items="items" size="md" />
        </div>
        <div>
          <p class="text-xs font-semibold text-foreground-secondary mb-2">Large</p>
          <MizuDashList :items="items" size="lg" />
        </div>
      </div>
    </Variant>

    <Variant title="Orientation">
      <div class="flex flex-col gap-8">
        <div>
          <p class="text-xs font-semibold text-foreground-secondary mb-2">Vertical</p>
          <MizuDashList :items="items" orientation="vertical" />
        </div>
        <div>
          <p class="text-xs font-semibold text-foreground-secondary mb-2">Horizontal</p>
          <MizuDashList :items="items" orientation="horizontal" />
        </div>
      </div>
    </Variant>

    <Variant title="Highlighted">
      <MizuDashList :items="items" />
    </Variant>
  </Story>
</template>
