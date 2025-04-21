<script setup>
const props = defineProps({
  message: {
    default: false,
    required: false,
  },
  type: {
    type: String,
    default: 'error' | 'warn' | 'success',
    required: true,
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
    <Icon name="material-symbols:error" size="1rem"/>
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