<script setup>
import Grid from "~/components/tetris/grid.vue";
import Stats from "~/components/tetris/stats.vue";
import {tetraminos} from "~/utils/constants.js";
import Controller from "~/components/tetris/controller.vue";
import {matrixMerge} from "~/composables/matrixMerge.js";
import {hasEmptyCell} from "~/composables/hasEmptyCell.js";


const gameState = ref(states.NOT_ACTIVE)
const clearedLines = ref(0)

const ACTIVE = computed(() => gameState.value === states.ACTIVE)
const PAUSED = computed(() => gameState.value === states.PAUSED)
const GAME_OVER = computed(() => gameState.value === states.GAME_OVER)
const NOT_ACTIVE = computed(() => gameState.value === states.NOT_ACTIVE)

const board = ref(Array(20).fill().map(() => Array(10).fill(0)))
const currentTetromino = ref({
  x: 0,
  y: 0,
  shape: [[0]]
})
const tetraminoHeigth = computed(() => {
  const shape = currentTetromino.value.shape;
  let height = 0;
  for (let i = 0; i < shape.length; i++) {
    if (arrSum(shape[i]) !== 0) {
      height++
    }
  }
  return height
})
const tetraminoTrueY = computed(() => {
  const shape = currentTetromino.value.shape;
  let trueY = currentTetromino.value.y;
  for (let i = 0; i < shape.length; i++) {
    console.log(shape[i])
    if (arrSum(shape[i]) === 0) {
      trueY++
    } if (arrSum(shape[i]) !== 0) {
      break
    }
  }
  return trueY
})
const nextTetromino = ref({
  x: 0,
  y: 0,
  shape: [[0]]
})


function CalcNewPositionX() {
  nextTetromino.value.x = 10/2 - Math.floor(nextTetromino.value.shape[0].length/2)
}
function NextTetramino() {
  currentTetromino.value = nextTetromino.value
  nextTetromino.value = {
    x: 0,
    y: 0,
    ...tetraminos[Math.floor(Math.random() * tetraminos.length)]
  }
  CalcNewPositionX()

  if (Overlap()) {
    gameOver()
  }
}


function FixTetramino() {
  const newBoard = matrixMerge(board.value, currentTetromino.value.shape, currentTetromino.value.x, currentTetromino.value.y)
  board.value = newBoard
  const y = currentTetromino.value.y
  ClearLine(y, tetraminoHeigth.value)
  NextTetramino()
}

function ClearLine(y, height) {
  for (let i = y; i < y + height; i++) {
    console.log(i)
    if (!hasEmptyCell(board.value[i])) {
      console.log(board.value[i])
      clearedLines.value++
      board.value.splice(i, 1)
      board.value.unshift(Array(10).fill(0))
    }
  }
  // console.log(y, height)
}

// Collision Lambdas
const Overlap = () => {
  const x = currentTetromino.value.x
  const y = currentTetromino.value.y
  const shape = currentTetromino.value.shape
  let isOverlap = false

  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[0].length; j++) {
      if (shape[i][j] !== 0) {
        if (y + i >= 20
            || board.value[y + i][x + j] !== 0) {
          isOverlap = true
        }
      }
    }
  }

  return isOverlap
}
const CollideBottom = () => {
  const x = currentTetromino.value.x
  const y = currentTetromino.value.y
  const shape = currentTetromino.value.shape
  let isCollide = false

  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[0].length; j++) {
      if (shape[i][j] !== 0) {
        if (y + i + 1 >= 20
            || board.value[y + i + 1][x + j] !== 0) {
          isCollide = true
        }
      }
    }
  }

  return isCollide
}
const CollideLeft = () => {
  const x = currentTetromino.value.x
  const y = currentTetromino.value.y
  const shape = currentTetromino.value.shape
  let isCollide = false

  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[0].length; j++) {
      if (shape[i][j] !== 0) {
        if (x + j - 1 < 0
            || board.value[y + i][x + j - 1] !== 0) {
          isCollide = true
        }
      }
    }
  }

  return isCollide
}
const CollideRight = () => {
  const x = currentTetromino.value.x
  const y = currentTetromino.value.y
  const shape = currentTetromino.value.shape
  let isCollide = false

  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[0].length; j++) {
      if (shape[i][j] !== 0) {
        if (x + j + 1 >= 10
            || board.value[y + i][x + j + 1] !== 0) {
          isCollide = true
        }
      }
    }
  }

  return isCollide
}


// Tetramino controller Functions

function drop() {
  if (!ACTIVE.value) return

  for (let i = 0; i < 20; i++) {
    if (CollideBottom()){
      FixTetramino()
      break
    }

    currentTetromino.value.y++;
  }

}

function down() {
  if (!ACTIVE.value) return
  if (CollideBottom()) {
    FixTetramino()
    return
  }

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

  currentTetromino.value.shape = rotateMatrix(currentTetromino.value.shape)

  for (let i = 0; i < 2; i++) {
    if (Overlap()) {
      console.log("overlap")
      if (!CollideRight()) {
        console.log("right")
        currentTetromino.value.x++
        continue
      }
      else if (!CollideLeft()) {
        console.log("left")
        currentTetromino.value.x--
        continue
      }
      currentTetromino.value.y--
      if (!CollideBottom()) {
        currentTetromino.value.y++
        continue
      }
      else {
        currentTetromino.value.shape = rotateMatrix(currentTetromino.value.shape)
      }
    }
  }
}


// Game state functions

function pause() {
  gameState.value = states.PAUSED
}

function resume() {
  gameState.value = states.ACTIVE
}

function reset() {
  gameState.value = states.NOT_ACTIVE
  for (let i = 0; i < board.value.length; i++) {
    board.value[i].fill(0)
  }
  start()
}

function start() {
  NextTetramino()
  NextTetramino()

  gameState.value = states.ACTIVE

}

function gameOver() {
  gameState.value = states.GAME_OVER
}

function keyboardController(event) {
  if (!ACTIVE.value) return

  if (event.ctrlKey || event.altKey || event.metaKey || event.key === ' ') {
    event.preventDefault();
  }
  switch (event.key) {
    case ' ':
      drop()
      break;
    case 'ArrowLeft':
      left()
      break;
    case 'ArrowRight':
      right()
      break;
    case 'ArrowDown':
      down()
      break;
    case 'ArrowUp':
      rotate()
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
  <main>

    <div class="tetris">
      <div class="temp-grid">
        <div class="temp-cell" v-for="i in 20">{{ i - 1}}</div>
      </div>
      <div id="board">
        <Grid :board :currentTetromino/>
      </div>
      <Stats :next-tetramino="nextTetromino">
        ({{ currentTetromino.x }}, {{ currentTetromino.y }})
        <br>
        {{ tetraminoHeigth}} {{ tetraminoTrueY }}
        <br>
        lines: {{ clearedLines }}
        <!--      {{ NOT_ACTIVE }}-->
        <!--      {{ ACTIVE }}-->
        <!--      {{ PAUSED }}-->
        <!--      {{ GAME_OVER }}-->
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
    <button class="temp" @click="FixTetramino">Fix</button>
    <button class="temp" @click="NextTetramino">Next</button>
  </main>
</template>

<style scoped>
.temp-grid {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px;
}
.temp-cell {
  width: 24px;
  height: 24px;
  background-color: #1D1A2D;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
main {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}
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