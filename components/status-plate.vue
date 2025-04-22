<script setup>
const {type, title} = defineProps({
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
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

  <div class="status-plate"
       :class="{
        'error': type === 'error',
        'warn': type === 'warn',
        'success': type === 'success',
      }">
    <label>
      <Icon :name="iconName" size="1.25rem"/>
      {{ title }}
    </label>
    <p v-if="message">{{message}}</p>
  </div>
</template>

<style scoped>
label {
  display: inline-flex;
  align-items: center;
  font-weight: 700;
  margin: 0;
  gap: 0.25rem;
}
.status-plate {
  width: 100%;
  padding: 1rem 0.5rem;
  display: flex;
  flex-direction: column;


  border: 1px solid var(--black);
  border-radius: 0.5rem;
;
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

</style>