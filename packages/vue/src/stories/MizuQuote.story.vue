<script setup lang="ts">
import MizuQuote from "../components/MizuQuote.vue";
</script>

<template>
  <Story title="MizuQuote" :layout="{ type: 'single', width: 600 }">
    <Variant title="Default">
      <MizuQuote>
        <p>The best way to predict the future is to invent it.</p>
      </MizuQuote>
    </Variant>

    <Variant title="Accent">
      <MizuQuote accent>
        <p>Design is not just what it looks like and feels like. Design is how it works.</p>
      </MizuQuote>
    </Variant>

    <Variant title="With Cite">
      <div class="flex flex-col gap-4">
        <MizuQuote cite="Alan Kay">
          <p>Simple things should be simple, complex things should be possible.</p>
        </MizuQuote>
        <MizuQuote cite="Alan Kay" accent>
          <p>The best way to predict the future is to invent it.</p>
        </MizuQuote>
      </div>
    </Variant>
  </Story>
</template>
