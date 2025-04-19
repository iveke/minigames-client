<script setup>
const props = defineProps({
  codeMask: {
    type: String,
    default: '00000'
  },
})


const codeLength = props.codeMask.length;
const codeMaxValue = Number(props.codeMask.replace(/0/g, '9'));
const codeMinValue = Number(codeMaxValue / 9) - (codeMaxValue / 9) % (10 ** (codeLength - 1));


const inputCode = ref(null);
const cursorPosition = computed(() => {
  return inputCode.value ? inputCode.value.toString().length : 0
});
const inputFieldID = computed(() => {
  return cursorPosition.value > 0 ? cursorPosition.value : 1
});

const currentInput = computed(() => {
  return document.querySelector(`#code__${inputFieldID.value}`)
});
const definiteInput = (id) => {
  return document.querySelector(`#code__${id}`)
}


function WriteDigit(number) {
  let newCodeValue = inputCode.value * 10 + number

  if (newCodeValue <= codeMaxValue) {
    inputCode.value *= 10;
    inputCode.value += number;

    currentInput.value.value = number
  }
}

function EraseDigit() {
  let newCodeValue = inputCode.value / 10 - inputCode.value / 10 % 1
  if (newCodeValue > 0) {
    inputCode.value /= 10;
    inputCode.value -= inputCode.value % 1;

    currentInput.value.nextSibling.value = ''
  } else {
    inputCode.value = null;
    currentInput.value.value = ''

  }
}


function handleInput(event) {
  const CodeNumber = Number(event.key)
  const input = event.target;

  if (isNaN(CodeNumber)) {
    if (event.key === 'Backspace') {
      EraseDigit()
      moveFocus(-1)
    }
  } else {
    event.target.value = ''
    WriteDigit(CodeNumber)
    moveFocus(1)
  }
}


function moveFocus(indexOffset) {
  if (!currentInput.value) {
    console.error('No current input found')
    return
  }


  if (indexOffset === 0) {
    if (cursorPosition.value === 0 || cursorPosition.value === codeLength) {
      currentInput.value.focus()
    } else {
      const nextInput = currentInput.value.nextElementSibling
      if (nextInput) {
        nextInput.focus()
      }
    }
  } else if (indexOffset === -1) {
    if (cursorPosition.value === 0) {
      currentInput.value.focus()
    } else if (cursorPosition.value === 4) {
      definiteInput(5).focus()
    } else {
      const nextInput = currentInput.value.nextElementSibling
      if (nextInput) {
        nextInput.focus()
      }
    }
  } else if (indexOffset === 1) {
    if (cursorPosition.value >= 0 && cursorPosition.value < codeLength) {
      const nextInput = currentInput.value.nextElementSibling
      if (nextInput) {
        nextInput.focus()
      }
    }
  }


}

function handlePaste(event) {
  console.log('paste', event.clipboardData.getData('text'))

}

</script>

<template>
  <div class="code-field">

    <input v-for="i in codeLength"

           :key="i"
           :id="'code__' + i"

           type="text"
           inputmode="numeric"
           pattern="\d*"
           maxlength="1"

           class="code-field__input"
           placeholder="_"
           @paste="handlePaste"
           @keydown.prevent="handleInput"
           @mousedown.prevent="moveFocus(0)"
    >
  </div>

  {{ inputCode }}<br>
  Cursor: {{ cursorPosition }}<br>
  Field: {{ inputFieldID }}<br>
</template>

<style scoped>

</style>