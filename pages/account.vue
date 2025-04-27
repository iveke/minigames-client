<script setup>

import {navigate} from "jsdom/lib/jsdom/living/window/navigation.js";

useHead({
  title: 'Профіль',
})
definePageMeta({
  middleware: ['auth']
})


const auth = useAuthStore();
const route = useRoute();

watch(() => auth.isAuthorized, (newValue) => {
  if (!newValue) {
    navigateTo('/')
  }
})

</script>

<template>
 <h1>Профіль</h1>

<!--  route: {{ route.fullPath }} <br>-->
  <br>
<!--  token: {{ auth.token }} <br>-->
  <br>
  is authorized: {{ auth.isAuthorized }} <br>
  <br>

  <button @click="auth.logout">Logout</button>

</template>

<style scoped>

</style>