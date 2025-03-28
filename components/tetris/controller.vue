<script setup>
const {gameState} = defineProps({
  gameState: Number
})
const NOT_ACTIVE = computed(() => gameState === states.NOT_ACTIVE)

const ACTIVE = computed(() => gameState === states.ACTIVE)
const PAUSED = computed(() => gameState === states.PAUSED)
const GAME_OVER = computed(() => gameState === states.GAME_OVER)

const emit = defineEmits(['left', 'right', 'down', 'drop', 'rotate', 'pause', 'resume', 'reset', 'start'])
</script>

<template>
  <div class="controller">
    <button @click="emit('left')" :disabled="!ACTIVE">Left</button>
    <button @click="emit('right')" :disabled="!ACTIVE">Right</button>
    <button @click="emit('down')" :disabled="!ACTIVE">Down</button>
    <button @click="emit('drop')" :disabled="!ACTIVE">Drop</button>
    <button @click="emit('rotate')" :disabled="!ACTIVE">Rotate</button>
  </div>
  {{ gameState }}<br>
  {{ NOT_ACTIVE }}
  {{ ACTIVE }}
  {{ PAUSED }}
  {{ GAME_OVER }}
  <div class="state-manager">
    <button v-if="ACTIVE" @click="emit('pause')">Pause</button>
    <Modal v-if="PAUSED"
           teleport-to="#board"
           button-text="Resume"
           label-text="Paused!"
           @action="emit('resume')"
    />
<!--    <button v-else-if="PAUSED" @click="emit('resume')">Resume</button>-->
<!--    <div v-else>-->
      <Modal v-if="GAME_OVER"
             teleport-to="#board"
             button-text="Reset"
             label-text="Game over!"
             @action="emit('reset')"
      />
      <Modal v-if="NOT_ACTIVE"
             teleport-to="#board"
             button-text="Start"
             label-text="Play!"
             @action="emit('start')"
      />
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