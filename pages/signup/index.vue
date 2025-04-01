<script setup>
useHead({
  title: 'Реєстрація',
})

const auth = useAuthStore();

const email = ref('');
const password = ref('');
const nick = ref('');

// const approveHref = computed(() => {
//   return `/signup/approve?email=${email.value}`
// });

function SignUp() {
  auth.register({
    email: email.value,
    password: password.value,
    nick: nick.value
  })
}

function Confirm() {
  auth.confirmEmail(email.value)
}
</script>

<template>

  <div class="main">
    <form action="" class="signup-form" name="signup-form">
      <div class="input-fields">
        <label for="email">Email</label>
        <input v-model="email" id="email" type="email">
<!--        <span class="validation-note">Емейл повинен містити @</span>-->

        <label for="password">Пароль</label>
        <input v-model="password" id="password" type="password">
<!--        <span class="validation-note">Пароль має бути мінімум 8 символів</span>-->

        <label for="nickname">Нікнейм</label>
        <input v-model="nick" id="nickname" type="text">
<!--        <span class="validation-note">Такий нікнейм уже зайнятий</span>-->
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


      <button @click="SignUp" type="button" :disabled="!(email && password && nick)">Зареєструватися</button>


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
    <br>
    {{ email }}<br>
    {{ password }}<br>
    {{ nick }}<br>

  </div>
</template>

<style scoped>


</style>