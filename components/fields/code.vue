<script setup>
const props = defineProps({
  codeMask: {
    type: String,
    default: '10000-99999' // min and max value length have to be equal
  },
  modelValue: {
    type: [String, Number],
    default: null
  }
})
const emit = defineEmits(['update:modelValue'])

const codeMinValue = Number(props.codeMask.split('-')[0])
const codeMaxValue = Number(props.codeMask.split('-')[1])
const codeLength = (props.codeMask.length - 1) / 2


const inputRefs = ref([])
const inputVModels = ref(Array.from({length: codeLength}, () => ''))

watchEffect(() => {
  const joinedCode = inputVModels.value.join('')
  if (isValid(joinedCode)) {
    emit('update:modelValue', Number(joinedCode))
  } else {
    emit('update:modelValue', null)

  }
})
const code = computed(() => inputVModels.value.join(''))

function isValid(code) {
  return code.length === codeLength && Number(code) >= codeMinValue && Number(code) <= codeMaxValue
}


function handlePaste(event) {
  const pastedCode = event.clipboardData.getData('text')
  if (isValid(pastedCode)) {
    inputVModels.value = pastedCode.split('').slice(0, codeLength)
  } else {
  }
}

function handleInput(index, event) {
  const input = event.target
  if (isNaN(Number(input.value))) {
    inputVModels.value[index] = ''
  } else {
    focusLastEmpty(true)
  }
}

function handleBackspace(index, event) {
  if (event.key === 'Backspace') {
    if (code.value.length === 0) {
      inputRefs.value[0].blur()
    } else if (code.value.length === codeLength) {
      inputVModels.value[codeLength - 1] = ''
    } else if (index > 0 && inputVModels.value[index] === '') {
      inputVModels.value[index - 1] = ''
      focusLastEmpty()
    }
  }
}

function focusLastEmpty(blur = false) {
  if (code.value.length === codeLength) {
    inputRefs.value[codeLength - 1].focus()
    if (blur) {
      inputRefs.value[codeLength - 1].blur()
    }
  } else {
    for (let i = 0; i < inputVModels.value.length; i++) {
      if (inputVModels.value[i] === '') {
        inputRefs.value[i].focus()
        break
      }
    }
  }
}

</script>

<template>
  <div class="code-field">

    <input v-for="i in codeLength"
           :key="i"
           :id="'code__' + i"
           :ref="el => inputRefs[i-1] = el"
           v-model="inputVModels[i-1]"
           v-bind="$attrs"

           type="text"
           inputmode="numeric"
           pattern="\d*"
           maxlength="1"
           placeholder="_"

           class="code-field__input"


           @paste="handlePaste"
           @input="handleInput(i-1, $event)"
           @keydown="handleBackspace(i-1, $event)"
           @focus="focusLastEmpty()"
    >
    <!--    {{ code }}-->
  </div>

</template>

<style scoped>
input {
  width: 100%;
}
</style>