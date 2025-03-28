<script setup lang="ts">
const emit = defineEmits(['action'])
defineProps({
  teleportTo: {
    type: String,
    require: true,
  },
  buttonText: {
    type: String,
    required: true,
  },
  labelText: {
    type: String,
    required: true,
  }
})
</script>

<template>
  <client-only>
    <Teleport :to="teleportTo">
      <div class="modal">
        <div class="inner">
          <h2>{{ labelText}}</h2>
          <button @click="emit('action')">{{ buttonText }}</button>
        </div>
      </div>
    </Teleport>
  </client-only>
</template>

<style scoped>
.modal {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 0;

  background-color: rgba(0, 0, 0, 0.5);
}
.inner {
  position: relative;
  background-color: #13111E;
  color: white;
  width: 160px;
  height: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
}
</style>