<script setup>

import {navigate} from "jsdom/lib/jsdom/living/window/navigation.js";
import {useTranslateApiResponse} from "~/composables/useTranslateApiResponse.js";
import {useLocalePath} from "#i18n";
import {useUserService} from "~/services/user.js";

useHead({
  title: 'Профіль',
})
definePageMeta({
  middleware: ['auth']
})
const auth = useAuthStore();
const route = useRoute();


const {translate} = useTranslateApiResponse()
const {t} = useI18n();
const localePath = useLocalePath();
const yup = configureYup({t});

const schema = yup.object({
  age: yup.number()
      .integer()
      .nullable()
      .min(0)
      .max(120),
  country: yup.string()
      .min(3)
      .nullable(),
  phone: yup.string()
      .matches(/\+?\d+/, t('validation.phone'))
      .min(3)
      .nullable()
})

const {handleSubmit, values, errors, defineField} = useForm({
  validationSchema: schema,
  initialValues: {
    age: auth.userData?.age,
    country: auth.userData?.country,
    phone: auth.userData?.phone
  }
})

const [age, ageAttrs] = defineField('age');
const [country, countryAttrs] = defineField('country');
const [phone, phoneAttrs] = defineField('phone');


const isSameValues = computed(() => {
  return auth.userData?.age === values.age &&
      auth.userData?.country === values.country &&
      auth.userData?.phone === values.phone;
});

const state = ref(0)
const user = useUserService()
const onSubmit = handleSubmit(async (values) => {
  console.log(values)
  state.value = 1

  await user.updateUser(values);
  await auth.updateUserData()

  state.value = 0
});


watch(() => auth.isAuthorized, (newValue) => {
  if (!newValue) {
    navigateTo('/')
  }
})

onMounted(() => {
  age.value = auth.userData?.age ? auth.userData.age : null;
  country.value = auth.userData?.country ? auth.userData.country : '';
  phone.value = auth.userData?.phone ? auth.userData.phone : '';
})
</script>

<template>
  <div class="main">
    <h1>{{ t('account.profile') }}</h1>
    <!--  route: {{ route.fullPath }} <br>-->
    <br>
    <h2>{{ auth.userData.username }}</h2>
    <label>Email: {{ auth.userData.email }}</label><br>
<!--    <label>Age: {{ auth.userData.age }}</label><br>-->
<!--    <label>Country: {{ auth.userData.country }}</label><br>-->
<!--    <label>Phone: {{ auth.userData.phone }}</label><br>-->

    <h4></h4>
    <form @submit="onSubmit">

      <label for="age" class="field__label">{{ t('field.age') }}</label>
      <input v-model="age"
             v-bind="ageAttrs"
             :class="{'field-error': errors.age}"
             type="number" id="age"
             :placeholder="t('field.age')">
      <FieldsError type="error" :message="errors.age"/>

      <label for="country" class="field__label">{{ t('field.country') }}</label>
      <input v-model="country"
             v-bind="countryAttrs"
             :class="{'field-error': errors.country}"
             type="text" id="country"
             :placeholder="t('field.country')">
      <FieldsError type="error" :message="errors.country"/>


      <label for="phone" class="field__label">{{ t('field.phone') }}</label>
      <input v-model="phone"
             v-bind="phoneAttrs"
             :class="{'field-error': errors.phone}"
             type="text" id="phone"
             :placeholder="t('field.phone')">
      <FieldsError type="error" :message="errors.phone"/>

      <FunctionalStatusPlate ref="statusPlate"/>

      <br>
      <br>
      <button v-if="state !== 1" type="submit" class="style-1" :disabled="isSameValues">{{
          t('account.confirm')
        }}
      </button>
      <button v-else type="button" class="style-1" style="height: 3.25rem">
        <CommonSpinner bg="transparent"
                       size="2rem"
                       color="var(--white)"
                       width="75"
                       length="33"
                       speed="1.5"/>
      </button>
    </form>
    <br>
    <!--  token: {{ auth.token }} <br>-->

    <br><br><br><br>
    <button class="style-3" @click="auth.logout">Logout</button>
  </div>


</template>

<style scoped>
.main {
  display: block;
  padding-left: 128px;
}

input {
  max-width: 320px;
}

form {
  width: min(100%, 480px);
  display: flex;
  flex-direction: column;

  border-radius: 2rem;
}

.style-1 {
  max-width: 120px;
}
</style>