<script setup>
import {computed} from "vue";
import {useAuthStore} from "~/stores/auth.js";

useHead({
  title: 'Профіль',
})
definePageMeta({
  middleware: 'auth'
})
</script>

<template>
 <h1>Профіль</h1>
</template>

<style scoped>

</style>