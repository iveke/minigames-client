<script setup>
definePageMeta({
  layout: 'custom'
})

const route = useRoute()

</script>

<template>
  <div>
    <br>
    <h2>Current route: {{ route.path }}</h2>
  </div>

</template>

<style scoped>

</style>