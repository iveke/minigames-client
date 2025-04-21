<script setup>

import PasswordField from "~/components/fields/password-field.vue";
import FieldError from "~/components/fields/field-error.vue";
import CodeInput from "~/components/fields/code-input.vue";
import * as yup from 'yup';

useHead({
  title: 'Підтвердження e-mail',
})
const auth = useAuthStore();

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

const requestCode = () => {
  console.log('request code');
}
const onSubmit = handleSubmit((values) => {
  console.log('submit', values);
})
</script>

<template>
  <div class="main">

    <form @submit="onSubmit">
      <h3>Підтвердження e-mail</h3>

      <div class="code-fields-container">
        <label for="email" class="field__label">Код верифікації відправлено на {{auth.email}}</label>
        <input v-model="code" type="hidden">
        <CodeInput v-model="receivedCode" code-mask="10000-99999" :class="{'field-error': errors.code}"/>
        <FieldError type="error" :message="errors.code"/>
        <span class="field__note">Якщо не бачите листа, перевірте спам.</span>

      </div>
      <button type="button" class="link sub-note" @click="requestCode">Відправити код повторно</button>

      <button type="submit" class="style-1">Зареєструватися</button>


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