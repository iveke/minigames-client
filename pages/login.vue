<script setup>
useHead({
  title: 'Авторизація',
})

const auth = useAuthStore();

const email = ref('');
const password = ref('');


// onBeforeMount(() => {
//   if (auth.isAuthorized) {
//     navigateTo('/account')
//   }
// })
function LogIn() {
  auth.login({
    email: email.value,
    password: password.value,
  })
}
</script>

<template>
  <div class="main">
    <form action="" class="login-form" name="login-form">
      <div class="input-fields">
        <label for="email">Email </label>
        <input v-model="email" id="email" type="email">

        <label for="password">Пароль </label>
        <input v-model="password" id="password" type="password">
      </div>

      <div class="login-with">
        <button @click="" type="button"><img src="" alt="">Google</button>
        <button @click="" type="button"><img src="" alt="">Apple</button>
      </div>


<!--      <div class="status-note">-->
<!--        Неправильний логін або пароль-->
<!--      </div>-->

      <span class="">
      Ще не маєте акаунт?
      <NuxtLink to="/signup">Зареєструватися</NuxtLink>
    </span>

      <button @click="LogIn" type="button" :disabled="!(email && password)">Увійти</button>

      <!--    <NuxtLink to="/account"><button @click="LogIn" type="submit">Увійти</button></NuxtLink>-->
    </form>
  </div>

</template>

<style scoped>

</style>