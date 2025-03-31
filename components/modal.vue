<script setup>
const emit = defineEmits(['action'])
defineProps({
  teleportTo: {
    type: String,
    require: true,
  },
  buttonText: {
    type: String,
    required: true,
  }
})
</script>

<template>
<!--  <client-only>-->
<!--    <Teleport :to="teleportTo">-->
      <div class="modal">
        <div class="plate">
          <div class="plate__text">
            <slot>

            </slot>
          </div>
          <button @click="emit('action')">{{ buttonText }}</button>
        </div>
      </div>
<!--    </Teleport>-->
<!--  </client-only>-->
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
.plate__text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px  ;
}
.plate {
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

  border: 2px solid white;
}
</style>