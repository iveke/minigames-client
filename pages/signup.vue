<script setup>
import {useLocalePath} from "#i18n";
import {useTranslateApiResponse} from "~/composables/useTranslateApiResponse.js";

useHead({
  title: 'Реєстрація',
})
definePageMeta({
  middleware: ['auth']
})

const {translate} = useTranslateApiResponse()
const { t } = useI18n();
const localePath = useLocalePath();
const yup = configureYup({ t });

const schema = yup.object({
  email: yup.string()
      .email()
      .required(),
  password: yup.string()
      .required()
      .matches(/^[a-zA-Z\d]+$/, t('validation.password'))
      .min(6),
  username: yup.string()
      .required()
      .matches(/^[a-zA-Z]+$/, t('validation.username'))
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
      navigateTo(localePath('/confirm-email'));
    }
  } else {
    const message = translate(response, '/auth/register')
    statusPlate.value.SetMessage('error', message)
  }
  state.value = 0

  console.log('response', response)
})


</script>

<template>

  <div class="main">

    <form @submit="onSubmit">
      <h3>{{ t('auth.signup')}}</h3>

      <div class="fields-container">

        <label for="email" class="field__label">{{ t('field.email')}}</label>
        <input v-model="email"
               v-bind="emailAttrs"
               :class="{'field-error': errors.email}"
               type="email" id="email"
               :placeholder="t('field.email')">
        <FieldsError type="error" :message="errors.email"/>


        <label for="password" class="field__label">{{ t('field.password')}}</label>
        <FieldsPassword v-model="password"
                       v-bind="passwordAttrs"
                       :class="{'field-error': errors.password}"
                       id="password"
                       minlength="6"
                       :placeholder="t('field.password')"/>
        <FieldsError type="error" :message="errors.password"/>


        <label for="username" class="field__label">{{ t('field.username')}}</label>
        <input v-model="username"
               v-bind="usernameAttrs"
               :class="{'field-error': errors.username}"
               type="text"
               id="username"
               minlength="3"
               maxlength="50"
               :placeholder="t('field.username')">
        <FieldsError type="error" :message="errors.username"/>
      </div>

      <span class="sub-note">{{ t('auth.hasAccount')}} <NuxtLink :to="localePath('/login')">{{ t('auth.toLogin')}}</NuxtLink></span>
      <FunctionalStatusPlate ref="statusPlate"/>


      <button v-if="state !== 1" type="submit" class="style-1">{{ t('auth.toSignup')}}</button>
      <button v-else type="button" class="style-1" style="height: 3.25rem">
        <CommonSpinner bg="transparent"
                 size="2rem"
                 color="var(--white)"
                 width="75"
                 length="33"
                 speed="1.5"/>
      </button>



    </form>
    <CommonDivider :title="t('auth.or')" line-color="var(--orange)" width="min(100%, 384px)"/>
    <div class="continue-with">
      <button type="submit" class="continue-with__button" disabled>
        <Icon name="logos:google-icon" size="1.5rem"></Icon>
        <span class="continue-with__text">{{ t('auth.continueWith', {provider: 'Google'})}}</span>
      </button>

      <button type="submit" class="continue-with__button" disabled>
        <Icon name="logos:google-icon" size="1.5rem"></Icon>
        <span class="continue-with__text">{{ t('auth.continueWith', {provider: 'Google'})}}</span>
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