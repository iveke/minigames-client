<script setup>

</script>

<template>

  <div class="stats">
    <slot></slot>
  </div>

</template>

<style scoped>
.stats {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>