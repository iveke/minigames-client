<script setup>
import Grid from "~/components/tetris/grid.vue";
import Stats from "~/components/tetris/stats.vue";
import {tetraminos} from "~/utils/constants.js";
import Controller from "~/components/tetris/controller.vue";


const gameState = ref(states.NOT_ACTIVE)

const ACTIVE = computed(() => gameState.value === states.ACTIVE)
const PAUSED = computed(() => gameState.value === states.PAUSED)
const GAME_OVER = computed(() => gameState.value === states.GAME_OVER)
const NOT_ACTIVE = computed(() => gameState.value === states.NOT_ACTIVE)

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

function FixTetramino() {
  console.log("fix")
}


// Collision Lambdas

const CollideBottom = () => {
  const x = currentTetromino.value.x
  const y = currentTetromino.value.y
  let isCollide = false

  if (y + 1 >= 20
      || board.value[y + 1][x] !== 0) {
    isCollide = true
  }
  return isCollide
}
const CollideLeft = () => {
  const x = currentTetromino.value.x
  const y = currentTetromino.value.y
  let isCollide = false

  if (x - 1 < 0
      || board.value[y][x - 1] !== 0) {
    isCollide = true
  }
  return isCollide
}
const CollideRight = () => {
  const x = currentTetromino.value.x
  const y = currentTetromino.value.y
  let isCollide = false

  if (x + 1 >= 10
      || board.value[y][x + 1] !== 0) {
    isCollide = true
  }
  return isCollide
}



// Tetramino controller Functions

function drop() {
  if (!ACTIVE.value) return

  for (let i = 0; i < 20; i++) {
    if (CollideBottom()) break;

    currentTetromino.value.y++;
  }

}
function down() {
  if (!ACTIVE.value) return
  if (CollideBottom()) return

  currentTetromino.value.y++;
}

function right() {
  if (!ACTIVE.value) return
  if (CollideRight()) return

  currentTetromino.value.x++;
}
function left() {
  if (!ACTIVE.value) return
  if (CollideLeft()) return

  currentTetromino.value.x--;
}
function rotate() {
  if (!ACTIVE.value) return
  if (CollideRight()) {}
  if (CollideLeft()) {}
  if (CollideBottom()) {}

  console.log("rotate")
}


// Game state functions

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
      ({{ currentTetromino.x }}, {{ currentTetromino.y }})
      {{ NOT_ACTIVE }}
      {{ ACTIVE }}
      {{ PAUSED }}
      {{ GAME_OVER }}
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