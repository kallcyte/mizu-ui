<script setup lang="ts">
import { DropdownMenuGroup } from "reka-ui";

defineProps();
</script>

<template>
  <DropdownMenuGroup>
    <slot />
  </DropdownMenuGroup>
</template>
