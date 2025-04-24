<script setup>
import FieldError from "~/components/fields/field-error.vue";
import PasswordField from "~/components/fields/password-field.vue";
import * as yup from 'yup';
import StatusPlate from "~/components/status-plate.vue";

useHead({
  title: 'Авторизація',
})
const auth = useAuthStore();

const schema = yup.object({
  email: yup.string()
      .email()
      .required(),
  password: yup.string()
      .required()
      .matches(/^[a-zA-Z\d]+$/)
      .min(6),
})

const {handleSubmit, values, errors, defineField} = useForm({
  validationSchema: schema,
  initialValues: {
    email: '',
    password: '',
  }
})

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');


const state = ref(0)

const onSubmit = handleSubmit(async (values) => {
  state.value = 1
  const response = await auth.login(values)
  if (response) {
    state.value = 2
  } else {
    state.value = 3
  }
  console.log('response', response)
})


</script>

<template>

  <div class="main">

    <form @submit="onSubmit">
      <h3>{{ $t('auth.login')}}</h3>

      <div class="fields-container">

        <label for="email" class="field__label">{{ $t('auth.email')}}</label>
        <input v-model="email"
               v-bind="emailAttrs"
               :class="{'field-error': errors.email}"
               type="email" id="email"
               :placeholder="$t('auth.email')">
        <FieldError type="error" :message="errors.email"/>


        <label for="password" class="field__label">{{ $t('auth.password')}}</label>
        <PasswordField v-model="password"
                       v-bind="passwordAttrs"
                       :class="{'field-error': errors.password}"
                       id="password"
                       :placeholder="$t('auth.password')"/>
        <FieldError type="error" :message="errors.password"/>
      </div>

      <span class="sub-note">{{ $t('auth.noAccount')}} <NuxtLink :to="$localePath('/signup')">{{ $t('auth.toSignup')}}</NuxtLink></span>
      <StatusPlate v-if="state === 3"
                   type="error"
                   title="Помилка"
                   message="Помилка авторизації."
      />


      <!--      <Spinner bg="var(&#45;&#45;white)"-->
      <!--               size="3rem"-->
      <!--               color="var(&#45;&#45;orange)"-->
      <!--               width="75"-->
      <!--               length="33"-->
      <!--               speed="1.5"/>-->


      <button v-if="state !== 1" type="submit" class="style-1">{{ $t('auth.toLogin')}}</button>
      <button v-else type="button" class="style-1" style="height: 3.25rem">
        <Spinner bg="transparent"
                 size="2rem"
                 color="var(--white)"
                 width="75"
                 length="33"
                 speed="1.5"/>
      </button>


    </form>
    <Divider :title="$t('auth.or')" line-color="var(--orange)" width="min(100%, 384px)"/>
    <div class="continue-with">
      <button type="submit" class="continue-with__button" disabled>
        <Icon name="logos:google-icon" size="1.5rem"></Icon>
        <span class="continue-with__text">{{ $t('auth.continueWith', {provider: 'Google'})}}</span>
      </button>

      <button type="submit" class="continue-with__button" disabled>
        <Icon name="logos:google-icon" size="1.5rem"></Icon>
        <span class="continue-with__text">{{ $t('auth.continueWith', {provider: 'Google'})}}</span>
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