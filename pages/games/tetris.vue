<script setup>
import Grid from "~/components/tetris/grid.vue";
import Stats from "~/components/tetris/stats.vue";
import {tetraminos} from "~/utils/constants.js";
import Controller from "~/components/tetris/controller.vue";


const gameState = ref(states.NOT_ACTIVE)
const board = ref(Array(20).fill().map(() => Array(10).fill(0)))
const currentTetromino = ref({
  x: 0,
  y: 0,
  ...tetraminos[0]
})
const nextTetromino = ref({
  x: 0,
  y: 0,
  ...tetraminos[0]
})


function NextTetramino() {
  currentTetromino.value = nextTetromino.value
  nextTetromino.value = {
    x: 0,
    y: 0,
    ...tetraminos[Math.floor(Math.random() * tetraminos.length)]
  }
}
function down() {}
function drop() {}
function right() {}
function left() {}
function rotate() {}
function pause() {gameState.value = states.PAUSED}
function resume() {gameState.value = states.ACTIVE}
function reset() {gameState.value = states.NOT_ACTIVE}
function start() {gameState.value = states.ACTIVE}
</script>


<template>
  <div class="tetris">
    <div id="board">
      <Grid :board :currentTetromino/>
    </div>
    <Stats :next-tetramino="nextTetromino">
      <Controller
          :gameState
          @down="down"
          @drop="drop"
          @right="right"
          @left="left"
          @rotate="rotate"

          @pause="pause"
          @resume="resume"
          @reset="reset"
          @start="start"
      />
    </Stats>
  </div>
  <button class="temp" @click="NextTetramino">Next</button>
</template>

<style scoped>
#board {
  position: relative;
  width: fit-content;
  height: fit-content;
}
.tetris {
  display: flex;
  gap: 16px;
}
.temp {
  background-color: #333333;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>