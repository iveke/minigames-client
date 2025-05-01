<script setup>
import {matrixMerge} from "~/composables/matrixMerge.js";
import {matrixRotate} from "~/composables/matrixRotate.js";
import {matrixOverlap} from "~/composables/matrixOverlap.js";
import {arrHasEmptyValue} from "~/composables/arrHasEmptyValue.js";
import {tetraminos, points_reward} from "~/utils/constants/tetrisConstants.js";
import {games} from "~/utils/constants/constants.js";
import Queue from "~/utils/queue.js";
import {useGameStore} from "~/stores/game.js";
import {matrixTrim} from "~/composables/matrixTrim.js";

useHead({
  title: 'Тетріс',
})
//
const game = useGameStore()
game.DefineGameID(games.tetris)

function LineReward(lines) {
  if (lines >= 1 && lines <= 4) {
    const lineReward = [
      points_reward.LINE_CLEAR_1,
      points_reward.LINE_CLEAR_2,
      points_reward.LINE_CLEAR_3,
      points_reward.LINE_CLEAR_4
    ]
    game.Reward(lineReward[lines - 1])
  }
}

const clearedLines = ref(0)
const tetraminoCount = ref(0)

// level calculation
watch(tetraminoCount, (newValue) => {
  game.level = Math.floor(newValue / 10) + 1
})


const timer = ref(0)
const board = ref(Array(20).fill().map(() => Array(10).fill(0)))

const currentTetromino = ref({
  x: 0,
  y: 0,
  shape: [[0]]
})
const tetraminoParameters = computed(() => {
  const trimmed = matrixTrim(currentTetromino.value.shape)
  return {
    OffsetY: trimmed.top,
    Height: trimmed.bottom - trimmed.top,
  }
})


const next = ref(new Queue())
next.value.Enqueue({
  x: 0,
  y: 0,
  shape: [[0]]
})


function GetRandomTetramino() {
  const randomTetramino = {
    shape: tetraminos[Math.floor(Math.random() * tetraminos.length)].shape,
    x: 0,
    y: 0,
  }
  randomTetramino.x = 10 / 2 - Math.floor(randomTetramino.shape[0].length / 2)
  return randomTetramino
}
function GenerateNextTetramino() {
  const nextTetramino = GetRandomTetramino()

  next.value.Enqueue(nextTetramino)
  currentTetromino.value = next.value.Dequeue()


  if (tetraminoCollider().Overlap()) {
    game.GameOver()
  }
}


function FixTetramino() {
  board.value = matrixMerge(board.value, currentTetromino.value.shape, currentTetromino.value.x, currentTetromino.value.y)

  const y = currentTetromino.value.y
  tetraminoCount.value++
  ClearLine(y + tetraminoParameters.value.OffsetY, tetraminoParameters.value.Height)
  GenerateNextTetramino()
}

function ClearLine(y, height) {
  let lines = 0
  for (let i = y; i <= y + height; i++) {
    if (!arrHasEmptyValue(board.value[i])) {
      lines++
      clearedLines.value++
      board.value.splice(i, 1)
      board.value.unshift(Array(10).fill(0))
    }
  }
  LineReward(lines)
}


// Tetramino collision functions

function tetraminoCollider() {
  const x = currentTetromino.value.x
  const y = currentTetromino.value.y
  const shape = currentTetromino.value.shape
  const base = board.value

  function Overlap() {
    return matrixOverlap(base, shape, [x, y], [false, true, true, true])
  }

  function CollideTop() {
    return matrixOverlap(base, shape, [x, y - 1], [false, true, true, true])
  }

  function CollideBottom() {
    return matrixOverlap(base, shape, [x, y + 1], [false, true, true, true])
  }

  function CollideLeft() {
    return matrixOverlap(base, shape, [x - 1, y], [false, true, true, true])
  }

  function CollideRight() {
    return matrixOverlap(base, shape, [x + 1, y], [false, true, true, true])
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
  if (!game.isActive) return
  let isCollide = false
  do {
    isCollide = Down()
    game.Reward(points_reward.HARD_DROP)
  } while (isCollide)
  return isCollide
}

function SoftDrop() {
  if (!game.isActive) return
  game.Reward(points_reward.SOFT_DROP)
  return Down()
}

function Down() {
  if (!game.isActive) return
  if (tetraminoCollider().CollideBottom()) {
    FixTetramino()
    return false
  }
  currentTetromino.value.y++
  return true
}

function Right() {
  if (!game.isActive) return
  if (tetraminoCollider().CollideRight()) return false

  currentTetromino.value.x++;
  return true
}

function Left() {
  if (!game.isActive) return
  if (tetraminoCollider().CollideLeft()) return false

  currentTetromino.value.x--;
  return true
}

function Top() {
  if (!game.isActive) return
  if (tetraminoCollider().CollideTop()) return false

  currentTetromino.value.y--;
  return true
}

function Rotate() {
  if (!game.isActive) return
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
        currentTetromino.value.shape = matrixRotate(currentTetromino.value.shape)
      }
    }
  }
}


// Game state functions
game.DefineCustom('Reset', () => {
  for (let i = 0; i < board.value.length; i++) {
    board.value[i].fill(0)
  }
  GenerateNextTetramino()
  GenerateNextTetramino()

  clearInterval(timer.value)
  timer.value = null
  tetraminoCount.value = 0
  clearedLines.value = 0
})





// Game loop

function startLoop() {
  timer.value = setInterval(() => {
    Down()
  }, Math.min(1000, 1000 / Math.sqrt(game.level)))
}

function stopLoop() {
  clearInterval(timer.value)
  timer.value = null

}

watch(() => game.isActive, (newValue) => {

  if (newValue) {
    startLoop()
  } else {
    stopLoop()
  }
})
watch(() => game.level, () => {
  if (game.isActive) {
    stopLoop()
    startLoop()
  }
})


// Safe exit
function safeExit(event) {
  if (game.isNotActive || game.isGameOver) {
    return
  }
  event.preventDefault();
}

onMounted(() => {
  window.addEventListener("beforeunload", safeExit)
})
onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", safeExit)
  game.Reset()
})

onBeforeRouteLeave(() => {
  if (!game.isNotActive && !game.isGameOver) {
    return window.confirm('Ви дійсно хочете покинути цю сторінку?')
  }
  return true
})
</script>


<template>
  <div class="main">

    <div class="tetris">
      <!--      <div class="temp-grid">-->
      <!--        <div class="temp-cell" v-for="i in 20">{{ i - 1 }}</div>-->
      <!--      </div>-->
      <div id="board">
        <FunctionalModal v-if="game.isNotActive"
               button-text="Play"
               @action="() => {
                 game.Reset()
                 game.Play()
               }"
        ><h2>Start</h2></FunctionalModal>
        <FunctionalModal v-if="game.isPaused"
               button-text="Resume"
               @action="game.Play()"
        ><h2>Pause</h2></FunctionalModal>
        <FunctionalModal v-if="game.isGameOver"
               button-text="Reset"
               @action="() => {
                 game.Reset()
                 game.Play()
               }"
        >
          <h2>Game over!</h2>Your points: {{ game.formattedPoints }}
        </FunctionalModal>
        <GamesTetrisGrid :board :currentTetromino/>
      </div>
      <GamesTetrisStats :next-tetramino="next.Peek()">
        points: {{ game.formattedPoints }}<br>
        level: {{ game.level }}<br>
        lines: {{ clearedLines }}

        <!--      {{ NOT_ACTIVE }}-->
        <!--      {{ ACTIVE }}-->
        <!--      {{ PAUSED }}-->
        <!--      {{ GAME_OVER }}-->
        <GamesTetrisController
            @down="SoftDrop"
            @drop="HardDrop"
            @right="Right"
            @left="Left"
            @rotate="Rotate"

            @pause="game.Pause()"
        />
      </GamesTetrisStats>
    </div>
    <!--    <button class="temp" @click="FixTetramino">Fix</button>-->
    <!--    <button class="temp" @click="GenerateNextTetramino">Next</button>-->
  </div>
</template>

<style scoped>


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

</style>