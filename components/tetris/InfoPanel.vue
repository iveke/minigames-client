<script setup>
import getKey from "../../composables/getKey.js";

const tetris = useTetrisStore()

</script>

<template>
  <div class="main">
      <div>State: {{ getKey(states, tetris.state) }}</div>
      <div>Score: {{ tetris.score }}</div>
      <div>Time: {{ tetris.time / 1000 }}</div>
      <div>Timer: {{ tetris.timer }}</div>
      <div>Key: {{ tetris.key }}</div>

      <button @click="tetris.StartTimer">Start</button>
      <button @click="tetris.StopTimer">Stop</button>
  </div>
</template>

<style scoped>
.main {
  width: 200px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>