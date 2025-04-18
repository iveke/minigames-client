<script setup>
import {useValidation} from "~/composables/useValidation.js";

useHead({
  title: 'Реєстрація',
})

const auth = useAuthStore();

const email = ref('');
const password = ref('');
const username = ref('');

const code = ref('');


const isValidEmail = computed(() => {
  return email.value.includes('@')
})
const isValidPassword = computed(() => {
  return password.value.length >= 6
})
const isValidUsername = computed(() => {
  return username.value.length >= 3
})

const isValidCode = computed(() => {
  return code.value >= 10000 && code.value <= 99999
})


const isValid = computed(() => {
  const validator = useValidation()
  const Email = validator.Email(email.value)
  const Password = validator.Password(password.value)
  const Username = validator.Username(username.value)
  const All = Email && Password && Username

  return {
    All,
    Email,
    Password,
    Username,
  }
})


function SignUp() {
  auth.register(email.value, password.value, username.value)
}

function Confirm() {
  auth.confirmEmail(code.value)
}

function requestCode() {
  auth.requestCode()
  RunTimeoutTimer()
}

const requestTimer = ref(0)
const requestTime = ref(null)
const isAllowedToRequestCode = ref(true)

async function RunTimeoutTimer() {
  isAllowedToRequestCode.value = false

  requestTimer.value = setInterval(() => {
    if (auth.requestCodeTimeout < Date.now()) {
      clearInterval(requestTimer.value)
      requestTime.value = null
      isAllowedToRequestCode.value = true
      return
    }
    requestTime.value = new Date(auth.requestCodeTimeout - Date.now()).getSeconds()
  }, 1000)
}


// TEMP
// TEMP
// TEMP
function SignUpFast() {
  auth.register("pryadka18@gmail.com", "123456", `test${Date.now()}`)
}
</script>

<template>

  <div class="main">
    {{ isValid.Email }}<br>
    {{ isValid.Password }}<br>
    {{ isValid.Username }}<br>
    {{ isValid.All }}<br>

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
    <input v-model="code" type="number" placeholder="Введіть код підтвердження">
    <br>
    <span v-if="!isAllowedToRequestCode" class="validation-note">Кож можна буде відправити ще раз через {{
        requestTime
      }}</span>
    <br>
    <button @click="requestCode" :disabled="!isAllowedToRequestCode">Запросити код ще раз</button>
    <br>
    <button @click="Confirm" :disabled="!isValidCode">Підтвердити емейл</button>
    {{ auth.emailStatus }}
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