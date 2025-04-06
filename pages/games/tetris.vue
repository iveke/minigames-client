<script setup>
import Grid from "~/components/tetris/grid.vue";
import Stats from "~/components/tetris/stats.vue";
import Controller from "~/components/tetris/controller.vue";
import {matrixMerge} from "~/composables/matrixMerge.js";
import {arrHasEmptyValue} from "~/composables/arrHasEmptyValue.js";

import {gameStates} from "~/utils/constants/constants.js";
import {tetraminos} from "~/utils/constants/tetrisConstants.js";

useHead({
  title: 'Тетріс',
})

const gameState = ref(gameStates.NOT_ACTIVE)
const clearedLines = ref(0)
const tetraminoCount = ref(0)
const level = computed(() => {
  return Math.floor(tetraminoCount.value / 10) + 1
})
const score = ref(0)

const timer = ref(0)

const ACTIVE = computed(() => gameState.value === gameStates.ACTIVE)
const PAUSED = computed(() => gameState.value === gameStates.PAUSED)
const GAME_OVER = computed(() => gameState.value === gameStates.GAME_OVER)
const NOT_ACTIVE = computed(() => gameState.value === gameStates.NOT_ACTIVE)

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
    if (arrSum(shape[i]) === 0) {
      trueY++
    }
    if (arrSum(shape[i]) !== 0) {
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
  nextTetromino.value.x = 10 / 2 - Math.floor(nextTetromino.value.shape[0].length / 2)
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
  board.value = matrixMerge(board.value, currentTetromino.value.shape, currentTetromino.value.x, currentTetromino.value.y)

  const y = currentTetromino.value.y
  tetraminoCount.value++

  ClearLine(y, tetraminoHeigth.value)
  NextTetramino()
}

function ClearLine(y, height) {
  console.log(`y: ${y}\n height: ${height}`)
  // temp
  y = 0
  height = 20
  //
  let lines = 0
  for (let i = y; i < y + height; i++) {
    if (!arrHasEmptyValue(board.value[i])) {
      lines++
      clearedLines.value++
      board.value.splice(i, 1)
      board.value.unshift(Array(10).fill(0))
    }
  }
  CalculateScore(lines)
}

function CalculateScore(lines) {
  if (lines >= 1 && lines <= 4) {
    const lineReward = [100, 300, 500, 800]
    score.value += lineReward[lines - 1] * level.value
  }
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
    score.value += 2
    if (CollideBottom()) {
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

  for (let i = 0; i < 4; i++) {
    if (Overlap()) {
      if (!CollideRight()) {
        currentTetromino.value.x++
        break
      } else if (!CollideLeft()) {
        currentTetromino.value.x--
        break
      } else {
        currentTetromino.value.y--
        if (!Overlap()) {
          break
        } else {
          currentTetromino.value.y++
          currentTetromino.value.shape = rotateMatrix(currentTetromino.value.shape)
        }
      }
    }
  }
  // currentTetromino.value.y--
  // if (!CollideBottom()) {
  //   currentTetromino.value.y++
  // // }
  // else {
  //   currentTetromino.value.shape = rotateMatrix(currentTetromino.value.shape)
  // }
}


// Game state functions

function pause() {
  gameState.value = gameStates.PAUSED
}

function resume() {
  gameState.value = gameStates.ACTIVE
}

function reset() {
  gameState.value = gameStates.NOT_ACTIVE
  for (let i = 0; i < board.value.length; i++) {
    board.value[i].fill(0)
  }
  NextTetramino()
  NextTetramino()

  //
  timer.value = null
  score.value = 0
  tetraminoCount.value = 0
  clearedLines.value = 0
}

function start() {

  gameState.value = gameStates.ACTIVE
}

function gameOver() {
  gameState.value = gameStates.GAME_OVER
}

function startLoop() {
  timer.value = setInterval(() => {
    down()
  }, Math.max(100, 1000 - 75 * level.value))
}

function stopLoop() {
  clearInterval(timer.value)
  timer.value = null

}

watch(ACTIVE, (newValue) => {

  if (newValue) {
    startLoop()
  } else {
    stopLoop()
  }
})
watch(level, (newValue) => {
  if (ACTIVE) {
    stopLoop()
    startLoop()
  }
})

// Safe exit

function safeExit(event) {
  if (NOT_ACTIVE.value || GAME_OVER.value) {
    return
  }
  event.preventDefault();
}
onMounted(() => {
  window.addEventListener("beforeunload", safeExit)
})
onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", safeExit)
  reset()
})

onBeforeRouteLeave((to, from, next) => {
  if (!NOT_ACTIVE.value) {
    const answer = window.confirm('Ви дійсно хочете покинути цю сторінку?')
    if (answer) {
      next() // Разрешаем переход
    } else {
      next(false) // Отменяем переход
    }
  } else {
    next()
  }
})
</script>


<template>
  <div class="main">

    <div class="tetris">
<!--      <div class="temp-grid">-->
<!--        <div class="temp-cell" v-for="i in 20">{{ i - 1 }}</div>-->
<!--      </div>-->
      <div id="board">
        <Modal v-if="NOT_ACTIVE"
               button-text="Play"
               @action="() => {
                 reset()
                 start()
               }"
        ><h2>Start</h2></Modal>
        <Modal v-if="PAUSED"
               button-text="Resume"
               @action="resume"
        ><h2>Pause</h2></Modal>
        <!--    <button v-else-if="PAUSED" @click="emit('resume')">Resume</button>-->
        <!--    <div v-else>-->
        <Modal v-if="GAME_OVER"
               button-text="Reset"
               @action="() => {
                 reset()
                 start()
               }"
        >
          <h2>Game over!</h2>Your score: {{ score }}
        </Modal>
        <Grid :board :currentTetromino/>
      </div>
      <Stats :next-tetramino="nextTetromino">
        score: {{ score }}<br>
        level: {{ level }}<br>
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
        />
      </Stats>
    </div>
    <!--    <button class="temp" @click="FixTetramino">Fix</button>-->
    <!--    <button class="temp" @click="NextTetramino">Next</button>-->
  </div>
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