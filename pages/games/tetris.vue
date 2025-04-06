<script setup>
import Grid from "~/components/tetris/grid.vue";
import Stats from "~/components/tetris/stats.vue";
import Controller from "~/components/tetris/controller.vue";
import {matrixMerge} from "~/composables/matrixMerge.js";
import {matrixRotate} from "~/composables/matrixRotate.js";
import {MatrixOverlap} from "~/composables/matrixOverlap.js";
import {arrHasEmptyValue} from "~/composables/arrHasEmptyValue.js";

import {gameStates} from "~/utils/constants/constants.js";
import {tetraminos} from "~/utils/constants/tetrisConstants.js";
import {score_reward} from "~/utils/constants/tetrisConstants.js";

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
const tetraminoHeight = computed(() => {
  const shape = currentTetromino.value.shape;
  let height = 0;
  for (let i = 0; i < shape.length; i++) {
    if (arrSum(shape[i]) !== 0) {
      height++
    }
  }
  return height
})

const nextTetromino = ref({
  x: 0,
  y: 0,
  shape: [[0]]
})


function CalcNewPositionX() {
  nextTetromino.value.x = 10 / 2 - Math.floor(nextTetromino.value.shape[0].length / 2)
}

function GenerateNextTetramino() {
  currentTetromino.value = nextTetromino.value
  nextTetromino.value = {
    x: 0,
    y: 0,
    ...tetraminos[Math.floor(Math.random() * tetraminos.length)]
  }
  CalcNewPositionX()

  if (tetraminoCollider().Overlap()) {
    gameOver()
  }
}


function FixTetramino() {
  board.value = matrixMerge(board.value, currentTetromino.value.shape, currentTetromino.value.x, currentTetromino.value.y)

  const y = currentTetromino.value.y
  tetraminoCount.value++

  ClearLine(y, tetraminoHeight.value)
  GenerateNextTetramino()
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
  LineReward(lines)
}

// score reward system

function Reward(baseScores) {
  score.value += baseScores * level.value
}

function LineReward(lines) {
  if (lines >= 1 && lines <= 4) {
    const lineReward = [
      score_reward.LINE_CLEAR_1,
      score_reward.LINE_CLEAR_2,
      score_reward.LINE_CLEAR_3,
      score_reward.LINE_CLEAR_4
    ]
    Reward(lineReward[lines - 1])
  }
}


// Tetramino collision functions

function tetraminoCollider() {
  const x = currentTetromino.value.x
  const y = currentTetromino.value.y
  const shape = currentTetromino.value.shape
  const base = board.value

  function Overlap() {
    return MatrixOverlap(base, shape, [x, y], [false, true, true, true])
  }

  function CollideTop() {
    return MatrixOverlap(base, shape, [x, y - 1], [false, true, true, true])
  }

  function CollideBottom() {
    return MatrixOverlap(base, shape, [x, y + 1], [false, true, true, true])
  }

  function CollideLeft() {
    return MatrixOverlap(base, shape, [x - 1, y], [false, true, true, true])
  }

  function CollideRight() {
    return MatrixOverlap(base, shape, [x + 1, y], [false, true, true, true])
  }

  return {
    Overlap,
    CollideTop,
    CollideBottom,
    CollideLeft,
    CollideRight
  }
}


// Tetramino controller Functions

function HardDrop() {
  if (!ACTIVE.value) return
  let isCollide = false
  do {
    isCollide = Down()
    Reward(score_reward.HARD_DROP)
  } while (isCollide)
  return isCollide
}

function SoftDrop() {
  if (!ACTIVE.value) return
  Reward(score_reward.SOFT_DROP)
  return Down()
}

function Down() {
  if (!ACTIVE.value) return
  if (tetraminoCollider().CollideBottom()) {
    FixTetramino()
    return false
  }
  currentTetromino.value.y++
  return true
}

function Right() {
  if (!ACTIVE.value) return
  if (tetraminoCollider().CollideRight()) return false

  currentTetromino.value.x++;
  return true
}

function Left() {
  if (!ACTIVE.value) return
  if (tetraminoCollider().CollideLeft()) return false

  currentTetromino.value.x--;
  return true
}

function Top() {
  if (!ACTIVE.value) return
  if (tetraminoCollider().CollideTop()) return false

  currentTetromino.value.y--;
  return true
}

function Rotate() {
  if (!ACTIVE.value) return
  currentTetromino.value.shape = matrixRotate(currentTetromino.value.shape)

  for (let i = 0; i < 4; i++) {
    if (tetraminoCollider().Overlap()) {
      if (Right()) {
        break
      } else if (Left()) {
        break
      } else if (Top()) {
        break
      } else {
        Down()
        currentTetromino.value.shape = matrixRotate(currentTetromino.value.shape)
      }
    }
  }
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
  GenerateNextTetramino()
  GenerateNextTetramino()

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
    Down()
  }, Math.min(1000, 1000 / Math.sqrt(level.value)))
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
            @down="SoftDrop"
            @drop="HardDrop"
            @right="Right"
            @left="Left"
            @rotate="Rotate"

            @pause="pause"
        />
      </Stats>
    </div>
    <!--    <button class="temp" @click="FixTetramino">Fix</button>-->
    <!--    <button class="temp" @click="GenerateNextTetramino">Next</button>-->
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