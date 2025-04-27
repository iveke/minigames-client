<script setup>
// const {status, message, type} = defineProps({
//   status: {
//     type: Number,
//     required: true
//   },
//   statusText: {
//     type: String,
//     required: false,
//   },
//   type: {
//     type: String,
//     required: true,
//     validator: (value) => ['error', 'warn', 'success'].includes(value)
//   }
// })
const statusType = ref('error')
const statusPlateText = ref('Error')

function SetMessage(type, statusText, display=true) {
  if (!['error', 'warn', 'success'].includes(type)) {
    console.error('Unresolved status type')
    return
  }

  statusType.value = type
  statusPlateText.value = statusText
  Display(display)
}

const iconName = computed(() => {
  if (statusType.value === 'error') {
    return 'material-symbols:error'
  }
  if (statusType.value === 'warn') {
    return 'material-symbols:warning'
  }
  if (statusType.value === 'success') {
    return 'material-symbols:check'
  }
})

const toDisplay = ref(false)
function Display(show) {
  if (show === undefined) {
    toDisplay.value = !toDisplay.value
  } else {
    toDisplay.value = show
  }
}


defineExpose({
  Display,
  SetMessage
})
</script>

<template>

  <div v-if="toDisplay"
       class="status-plate"
       :class="statusType">
    <label>
      <Icon :name="iconName" size="1.25rem"/>
      {{ statusPlateText }}
    </label>
    <button type="button" @click="Display(false)" class="close-plate">
      <Icon name="material-symbols:close" :class="statusType" size="1.5rem"></Icon>
    </button>
  </div>
</template>

<style scoped>
label {
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  margin: 0;
  gap: 0.5rem;
}

.status-plate {
  width: 100%;
  padding: 0.85rem 0.5rem;
  display: flex;


  border: 1px solid var(--black);
  border-radius: 0.5rem;;
  color: var(--black);

  gap: 0.5rem;

  &.error {
    background-color: var(--error-bg);
    color: var(--error);
    border-color: var(--error);
  }

  &.warn {
    background-color: var(--warn-bg);
    color: var(--warn);
    border-color: var(--warn);
  }

  &.success {
    background-color: var(--success-bg);
    color: var(--success);
    border-color: var(--success);
  }

  p {
    color: var(--black);
  }
}

button.close-plate {
  background: none;
  border: none;
  padding: 0;
  width: fit-content;
  aspect-ratio: 1/1;

  display: inline-flex;
  margin-left: auto;


  .iconify {
    transition: opacity 50ms ease-in-out;

    &.error {
      color: var(--error);
    }

    &.warn {
      color: var(--warn);
    }

    &.success {
      color: var(--success);
    }

    &:hover {
      opacity: 0.5;
    }
  }

}

</style>