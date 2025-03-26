<script setup>
const { gameState } = defineProps({
  gameState: Number
})
const ACTIVE = computed(() => gameState === states.ACTIVE)
const PAUSED = computed(() => gameState === states.PAUSED)
const GAME_OVER = computed(() => gameState === states.GAME_OVER)
const NOT_ACTIVE = computed(() => gameState === states.NOT_ACTIVE)

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
  {{gameState}}<br>
  {{ACTIVE}}
  {{PAUSED}}
  {{GAME_OVER}}
  {{NOT_ACTIVE}}
  <div class="state-manager">
    <button v-if="ACTIVE" @click="emit('pause')">Pause</button>
    <button v-else-if="PAUSED" @click="emit('resume')">Resume</button>
    <div v-else>
      <Teleport to="#board">
        <div class="modal">
          <div v-if="GAME_OVER" class="inner">
            <h2>Game Over!</h2>
            <button @click="emit('reset')">Reset</button>
          </div>
          <div v-else-if="NOT_ACTIVE" class="inner">
            <h2>Play!</h2>
            <button @click="emit('reset')">Start</button>
          </div>
        </div>
      </Teleport>
    </div>
  </div>
</template>

<style scoped>
.controller {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

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