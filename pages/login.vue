<script setup>
useHead({
  title: 'Авторизація',
})

const auth = useAuthStore();

const email = ref('');
const password = ref('');

const isValidEmail = computed(() => {
  return email.value.includes('@')
})
const isValidPassword = computed(() => {
  return password.value.length >= 6
})


const isValid = computed(() => {
  return isValidEmail.value && isValidPassword.value
})


// onBeforeMount(() => {
//   if (auth.isAuthorized) {
//     navigateTo('/account')
//   }
// })
function LogIn() {
  auth.login(email.value, password.value)
}
</script>

<template>
  <div class="main">
    <form action="" class="login-form" name="login-form">
      <div class="input-fields">
        <label for="email">Email </label>
        <input v-model="email" id="email" type="email">
        <span v-if="!isValidEmail" class="validation-note">Емейл повинен містити @</span>

        <label for="password">Пароль </label>
        <input v-model="password" id="password" type="password">
        <span v-if="!isValidPassword" class="validation-note">Пароль має містити хоча б 6 символів</span>
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

      <button @click="LogIn" type="button" :disabled="!isValid">Увійти</button>

      <!--    <NuxtLink to="/account"><button @click="LogIn" type="submit">Увійти</button></NuxtLink>-->
    </form>
  </div>

</template>

<style scoped>

</style>