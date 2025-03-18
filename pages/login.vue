<script setup>
useHead({
  title: 'Авторизація',
})
definePageMeta({
  layout: 'auth',
})
const auth = useAuthStore();
</script>

<template>
  <br>
  <form action="">

    <label for="email">Email </label>
    <input id="email" type="email"><br>

    <label for="password">Пароль </label>
    <input id="password" type="password"><br>

    <NuxtLink to="/account"><button @click="auth.authorize" type="submit">Увійти</button></NuxtLink>
  </form>

</template>

<style scoped>

</style>