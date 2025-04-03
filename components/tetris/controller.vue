<script setup>
const {gameState} = defineProps({
  gameState: Number
})
const NOT_ACTIVE = computed(() => gameState === states.NOT_ACTIVE)

const ACTIVE = computed(() => gameState === states.ACTIVE)
const PAUSED = computed(() => gameState === states.PAUSED)
const GAME_OVER = computed(() => gameState === states.GAME_OVER)

const emit = defineEmits(['left', 'right', 'down', 'drop', 'rotate'])

function keyboardController(event) {
  if (!ACTIVE.value) return

  event.preventDefault()
  // if (event.ctrlKey || event.altKey || event.metaKey || event.key === ' ') {
  //   event.preventDefault();
  // }
  switch (event.key) {
    case ' ':
      emit('drop')
      break;
    case 'ArrowLeft':
      emit('left')
      break;
    case 'ArrowRight':
      emit('right')
      break;
    case 'ArrowDown':
      emit('down')
      break;
    case 'ArrowUp':
      emit('rotate')
      break;
  }
}

onMounted(() => {
  window.addEventListener('keydown', keyboardController)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', keyboardController)
})
</script>

<template>
  <div class="controller">
    <button @click="emit('left')" :disabled="!ACTIVE">Left</button>
    <button @click="emit('right')" :disabled="!ACTIVE">Right</button>
    <button @click="emit('down')" :disabled="!ACTIVE">Down</button>
    <button @click="emit('drop')" :disabled="!ACTIVE">Drop</button>
    <button @click="emit('rotate')" :disabled="!ACTIVE">Rotate</button>
  </div>
  <div class="state-manager">
    <button v-if="ACTIVE" @click="emit('pause')">Pause</button>

<!--    </div>-->
  </div>
</template>

<style scoped>
.controller {
  display: flex;
  flex-direction: column;
  gap: 4px;
}


</style>