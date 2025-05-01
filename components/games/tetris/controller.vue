<script setup>
import {useGameStore} from "~/stores/game.js";

const emit = defineEmits(['left', 'right', 'down', 'drop', 'rotate', 'pause'])

const game = useGameStore()

function keyboardController(event) {
  if (!game.isActive) return

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
<!--  <div class="controller">-->
<!--    <button @click="emit('left')" :disabled="!game.isActive">Left</button>-->
<!--    <button @click="emit('right')" :disabled="!game.isActive">Right</button>-->
<!--    <button @click="emit('down')" :disabled="!game.isActive">Down</button>-->
<!--    <button @click="emit('drop')" :disabled="!game.isActive">Drop</button>-->
<!--    <button @click="emit('rotate')" :disabled="!game.isActive">Rotate</button>-->
<!--  </div>-->
  <div class="state-manager">
    <button @click="emit('pause')" :disabled="!game.isActive">Pause</button>

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