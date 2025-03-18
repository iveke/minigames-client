<script setup>
useHead({
  title: 'Реєстрація',
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

    <label for="nickname">Нікнейм </label>
    <input id="nickname" type="text"><br>

    <NuxtLink to="/account"><button @click="auth.authorize" type="submit">Зареєструватися</button></NuxtLink>
  </form>

</template>

<style scoped>

</style>