<script setup>
import FieldError from "~/components/fields/field-error.vue";
import PasswordField from "~/components/fields/password-field.vue";
import * as yup from 'yup';
import StatusPlate from "~/components/status-plate.vue";

useHead({
  title: 'Реєстрація',
})
definePageMeta({
  middleware: ['auth']
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


const state = ref(0)
const auth = useAuthStore();
const statusPlate = ref()

const onSubmit = handleSubmit(async (values) => {
  state.value = 1

  const response = await auth.register(values)
  if (response.ok) {
    statusPlate.value.Display(false)

    if (response.status === 200) {
      navigateTo('/confirm-email');
    }
  } else {
    statusPlate.value.SetMessage('error', response.statusText)
  }
  state.value = 0

  console.log('response', response)
})



// email.value = 'pryadka18@gmail.com';
// password.value = '123456';
// username.value = 'testuser';

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

      <span class="sub-note">Вже маєте акаунт? <NuxtLink to="/login">Увійти</NuxtLink></span>
      <StatusPlate ref="statusPlate"/>


      <button v-if="state !== 1" type="submit" class="style-1">Зареєструватися</button>
      <button v-else type="button" class="style-1" style="height: 3.25rem">
        <Spinner bg="transparent"
                 size="2rem"
                 color="var(--white)"
                 width="75"
                 length="33"
                 speed="1.5"/>
      </button>



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


.sub-note {
  text-align: center;
  margin: 2rem 0;
  font-size: 0.875rem;
}

.status-plate {
  margin-bottom: 2rem;
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