<script setup>
import {useLocalePath} from "#i18n";
import {useTranslateApiResponse} from "~/composables/useTranslateApiResponse.js";

useHead({
  title: 'Підтвердження e-mail',
})
definePageMeta({
  middleware: ['auth']
})

const {translate} = useTranslateApiResponse()
const { t } = useI18n();
const localePath = useLocalePath();
const yup = configureYup({ t });

const schema = yup.object({
  code: yup.number()
      .required()
      .min(10000)
      .max(99999)
})

const {handleSubmit, values, errors, defineField} = useForm({
  validationSchema: schema,
  initialValues: {
    code: '',
  }
})

const [code, codeAttrs] = defineField('code');
const receivedCode = ref();

watch(receivedCode, (newValue) => {
  code.value = newValue;
})

// Submit
const state = ref(0)
const auth = useAuthStore();
const statusPlate = ref()

const onSubmit = handleSubmit(async (values) => {
  state.value = 1

  const response = await auth.confirmEmail(values)
  if (response.ok) {
    statusPlate.value.Display(false)

    if (response.status === 200) {
      navigateTo(localePath('/account'));
    }
  } else {
    const message = translate(response, '/user/confirmEmail')
    statusPlate.value.SetMessage('error', message)

    if (response.status === 404) {
      auth.logout()
    }
  }
  state.value = 0

  console.log('response', response)
})


// Time out

const duration = ref(60 * 1000)
const restTime = ref(duration.value + 100)
const restTimeSeconds = computed(() => {
  return Math.floor(duration.value / 1000 - restTime.value / 1000)
})
let lastTime
let handle

const update = () => {
  restTime.value = Math.floor(performance.now() - lastTime)
  if (restTime.value >= duration.value) {
    cancelAnimationFrame(handle)
  } else {
    handle = requestAnimationFrame(update)
  }
}

const requestCode = () => {
  if (restTime.value < duration.value) return

  auth.requestCode()
  reset()
  update()
}
const reset = () => {
  restTime.value = 0
  lastTime = performance.now()
  update()
}

// Show warn plate if user didn't confirm email
const route = useRoute()
const forcedRedirect = computed(() => route.query.forcedRedirect
)
onMounted(() => {
  if (forcedRedirect.value === "true") {
    statusPlate.value.SetMessage('warn', t('statusMessages.warning.confirmEmail'))
  }
})
</script>

<template>
  <div class="main">
    <form @submit="onSubmit">
      <h3>{{ t('auth.emailConfirmation:')}}</h3>

      <div class="code-fields-container">
        <label for="email" class="field__label">{{ t('auth.emailConfirmation:label', {email: auth.email})}}</label>
        <input v-model="code" type="hidden">
        <FieldsCode v-bind="codeAttrs" v-model="receivedCode" code-mask="10000-99999" :class="{'field-error': errors.code}"/>
        <FieldsError type="error" :message="errors.code"/>
        <span class="field__note">{{ t('auth.emailConfirmation:note')}}</span>

      </div>
      <span class="sub-note">
        <button v-if="restTime >= duration" type="button" class="link" @click="requestCode">{{ t('auth.emailConfirmation:resend')}}</button>
        <span v-else>{{ t('auth.emailConfirmation:resend:timeout', {time: restTimeSeconds})}}</span>
      </span>
      <FunctionalStatusPlate ref="statusPlate"/>


      <button v-if="state !== 1" type="submit" class="style-1">{{ t('auth.emailConfirmation:approve')}}</button>
      <button v-else type="button" class="style-1" style="height: 3.25rem">
        <CommonSpinner bg="transparent"
                 size="2rem"
                 color="var(--white)"
                 width="75"
                 length="33"
                 speed="1.5"/>
      </button>


    </form>

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

.code-fields-container {
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
}

h3 {
  text-align: center;
  color: var(--brown);
}

.status-plate {
  margin-bottom: 2rem;
}


.code-field {
  margin-top: 1.5rem;
}

.field__status-note {
  margin-top: 1rem;
}

.field__note {
  margin-top: 1.5rem;
}

.sub-note {
  text-align: left;
  margin: 2rem 0;
  font-size: 0.875rem;
}
</style>