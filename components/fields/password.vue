<script setup>
defineProps({
  modelValue: {
    type: String,
    default: '',
    required: false,
  },
})
defineEmits(['update:modelValue']);

const passwordVisible = ref(false);
const passwordType = computed(() => {
  return passwordVisible.value ? 'text' : 'password';
});
const passwordIcon = computed(() => {
  return {
    name: passwordVisible.value ? 'material-symbols:visibility-outline' : 'material-symbols:visibility-off-outline',
    // background: 'var(--orange)'
  }
});

function TurnPasswordVisibility() {
  passwordVisible.value = !passwordVisible.value;
}


const attrs = useAttrs()
</script>

<template>
  <div class="field__input">
    <input :type="passwordType"
           id="password"
           v-bind="$attrs"
           @input="$emit('update:modelValue', $event.target.value)"/>

    <Icon class="field__icon-button" role="button" :name="passwordIcon.name" size="24px" @mousedown.prevent="TurnPasswordVisibility"/>
  </div>
</template>

<style scoped>
.field__input {
  position: relative;
}
.field__icon-button {
  width: 1.5rem;
  height: 1.5rem;

  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translate(0, -50%);

  cursor: pointer;

  color: var(--brown);
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }

}
.field__input:focus-within .field__icon-button {
  color: var(--orange);
}

</style>