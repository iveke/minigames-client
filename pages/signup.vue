<script setup>
import FieldError from "~/components/fields/field-error.vue";
import PasswordField from "~/components/fields/password-field.vue";
import * as yup from 'yup';

useHead({
  title: 'Реєстрація',
})

const schema = yup.object({
  email: yup.string()
      .email()
      .required(),
  password: yup.string()
      .required()
      .matches(/^[a-zA-Z\d]+$/)
      .min(6),
  username: yup.string()
      .required()
      .matches(/^[a-zA-Z]+$/)
      .min(3)
      .max(50),
})

const {handleSubmit, values, errors, defineField} = useForm({
  validationSchema: schema,
  initialValues: {
    email: '',
    password: '',
    username: ''
  }
})

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
const [username, usernameAttrs] = defineField('username');

const onSubmit = handleSubmit((values) => {
  console.log('Форма відправлена:', values);
  // auth.register(email.value, password.value, username.value)
})


const auth = useAuthStore();


</script>

<template>

  <div class="main">

    <form @submit="onSubmit">
      <h3>Реєстрація</h3>

      <div class="fields-container">

        <label for="email" class="field__label">Електронна пошта</label>
        <input v-model="email"
               v-bind="emailAttrs"
               :class="{'field-error': errors.email}"
               type="email" id="email"
               placeholder="Email">
        <FieldError type="error" :message="errors.email"/>


        <label for="password" class="field__label">Пароль</label>
        <PasswordField v-model="password"
                       v-bind="passwordAttrs"
                       :class="{'field-error': errors.password}"
                       id="password"
                       placeholder="Password"/>
        <FieldError type="error" :message="errors.password"/>


        <label for="username" class="field__label">Ім'я користувача</label>
        <input v-model="username"
               v-bind="usernameAttrs"
               :class="{'field-error': errors.username}"
               type="text"
               id="username"
               placeholder="Username">
        <FieldError type="error" :message="errors.username"/>

      </div>

      <span class="have-account">Вже маєте акаунт? <NuxtLink to="/login" class="signup-with">Увійти</NuxtLink></span>
      <button type="submit" class="style-1">Зареєструватися</button>


    </form>
    <Divider title="Або" line-color="var(--orange)" width="min(100%, 384px)"/>
    <div class="continue-with">
      <button type="submit" class="continue-with__button" disabled>
        <Icon name="logos:google-icon" size="1.5rem"></Icon>
        <span class="continue-with__text">Продовжити з Google</span>
      </button>

      <button type="submit" class="continue-with__button" disabled>
        <Icon name="logos:google-icon" size="1.5rem"></Icon>
        <span class="continue-with__text">Продовжити з Google</span>
      </button>
    </div>


  </div>
</template>

<style scoped>
.main {
  gap: 1.5rem;
  padding: 2rem 1.5rem;
}

form {
  width: min(100%, 480px);
  display: flex;
  flex-direction: column;
  padding: 1.5rem min(3rem, 10%);

  border: 1px solid var(--orange);
  border-radius: 2rem;
}
.fields-container {
  margin-top: 0.5rem;
}

h3 {
  text-align: center;
  color: var(--brown);
}


.have-account {
  text-align: center;
  margin: 2rem 0;
}

.continue-with {
  width: min(100%, 384px);

  display: flex;
  flex-direction: column;
  gap: 1rem;

  .iconify {
    height: 100%;
  }

  .continue-with__text {
    width: 100%;
  }
}
</style>