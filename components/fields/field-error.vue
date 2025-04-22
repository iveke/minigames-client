<script setup>
const {message, type} = defineProps({
  message: {
    default: false,
    required: false,
  },
  type: {
    type: String,
    required: true,
    validator: (value) => ['error', 'warn', 'success'].includes(value)
  }
})

const iconName = computed(() => {
  if (type === 'error') {
    return 'material-symbols:error'
  }
  if (type === 'warn') {
    return 'material-symbols:warning'
  }
  if (type === 'success') {
    return 'material-symbols:check'
  }
})
</script>

<template>
  <span v-if="message"
      :class="{
    'field__status-note': true,
    'error': type === 'error',
    'warn': type === 'warn',
    'success': type === 'success',
  } ">
    <Icon :name="iconName" size="1rem"/>
    {{ message }}
  </span>

</template>

<style scoped>
.field__status-note {
  width: 100%;
  margin-top: 0.25rem;
  display: inline-flex;
  gap: 0.25rem;
  margin-bottom: -0.25rem;

  &.error {
    color: var(--error);
  }

  &.warn {
    color: var(--warn);
  }

  &.success {
    color: var(--success);
  }

  & .iconify {
    margin-top: -0.25rem;
    transform: translate(0, 33%);
  }

}
</style>