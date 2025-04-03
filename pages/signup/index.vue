<script setup>
useHead({
  title: 'Реєстрація',
})

const auth = useAuthStore();

const email = ref('');
const password = ref('');
const username = ref('');




const isValidEmail = computed(() => {
  return email.value.includes('@')
})
const isValidPassword = computed(() => {
  return password.value.length >= 6
})
const isValidUsername = computed(() => {
  return username.value.length >= 3
})



const isValid = computed(() => {
  return isValidEmail.value && isValidPassword.value && isValidUsername
})


function SignUp() {
  auth.register(email.value, password.value, username.value)
}

function Confirm() {
  auth.confirmEmail(email.value)
}

// TEMP
// TEMP
// TEMP
function SignUpFast() {
  auth.register("pryadka18@gmail.com","123456", `test${Date.now()}`)
}
</script>

<template>

  <div class="main">

    <form action="" class="signup-form" name="signup-form">
      <div class="input-fields">
        <label for="email">Email</label>
        <input v-model="email" id="email" type="email">
        <span v-if="!isValidEmail" class="validation-note">Емейл повинен містити @</span>

        <label for="password">Пароль</label>
        <input v-model="password" id="password" type="password">
        <span v-if="!isValidPassword" class="validation-note">Пароль має містити хоча б 6 символів</span>

        <label for="nickname">Нікнейм</label>
        <input v-model="username" id="nickname" type="text">
        <span v-if="!isValidUsername" class="validation-note">Ім'я користувача має містити хоча б 3 символи</span>
      </div>


      <div class="signup-with">
        <button @click="" type="button"><img src="" alt="">Google</button>
        <button @click="" type="button"><img src="" alt="">Apple</button>
      </div>


<!--      <div class="status-note">-->
<!--        Користувач з таким емейлом вже зареєстрований-->
<!--      </div>-->


      <span class="">
      Вже маєте акаунт?
      <NuxtLink to="/login">Увійти</NuxtLink>
    </span>


      <button @click="SignUp" type="button" :disabled="!isValid">Зареєструватися</button>


      <!--    <NuxtLink :to="approveHref" target="_blank">-->
      <!--      <button @click="SignUp" type="button" :disabled="!(email && password && nick)">Зареєструватися</button>-->
      <!--    </NuxtLink>-->

      <!--    <NuxtLink to="/account">-->
      <!--      <button @click="SignUp">Зареєструватися</button>-->
      <!--    </NuxtLink>-->


    </form>
    <br>
    <NuxtLink to="/account">
      <button @click="Confirm">Підтвердити емейл</button>
    </NuxtLink>
    <button @click="SignUpFast" type="button">Шустрий рег</button> <!-- TEMP -->

    <br>
<!--    {{ isValidUsername}}-->
<!--    <br>-->
<!--    {{ isValidEmail}}-->
<!--    <br>-->
<!--    {{ isValidPassword}}-->


  </div>
</template>

<style scoped>


</style>