<script setup>
import {piecesIDs, tetrominoStates} from "~/utils/constants.js";
import {computed} from "vue";

useHead({
  title: 'Тетріс',
})
// import constants
// states
// pieces
// piecesIDs


const board = ref(new Array(20).fill(new Array(10).fill(0)))
const displayedBoard = ref(new Array(20).fill(new Array(10).fill(0)))
const currentTetramino = ref()
const nextTetramino = ref()
const gameState = ref(states.NOT_ACTIVE)
const timer = ref()
const time = ref()
const speed = ref()
const lines = ref(0)



// Game state controls
function Reset() {
  board.value = new Array(20).fill(new Array(10).fill(0))
  displayedBoard.value = new Array(20).fill(new Array(10).fill(0))

  currentTetramino.value = RandomTetramino()
  nextTetramino.value = RandomTetramino()



  timer.value = null
  time.value = 0
  speed.value = 1000

  let newPosX = 10 / 2 - Math.floor(currentTetramino.value.shape[0].length / 2)
  pos.value = {_x: newPosX, _y: 0}
  Run()
}

function Run() {

  gameState.value = states.ACTIVE


}

function Stop() {
  gameState.value = states.PAUSED


}

function End() {
  gameState.value = states.GAME_OVER
}


// Input control
function Controller(event) {
  if (event.ctrlKey || event.altKey || event.metaKey) {
    event.preventDefault();
  }
  switch (event.key) {
    case ' ':
      Drop()
      break;
    case 'ArrowLeft':
      Left()
      break;
    case 'ArrowRight':
      Right()
      break;
    case 'ArrowDown':
      Fall()
      break;
    case 'ArrowUp':
      Rotate()
      break;
  }
}


const position = reactive({
  _x: 0,
  _y: 0
})
const posX = computed({
  get: () => {
    return position._x
  },
  set: (newValue) => {
    const Validated = ValidatePosition(newValue, position._y)
    if (Validated === tetrominoStates.PASS) {
      position._x = newValue
      DrawBoard()
    } else if (Validated === tetrominoStates.BOTTOM_COLLIDE) {

      FixTetramino()
    }
  }
})
const posY = computed({
  get: () => {
    return position._y
  },
  set: (newValue) => {
    const Validated = ValidatePosition(position._x, newValue)
    if (Validated === tetrominoStates.PASS) {
      position._y = newValue
      DrawBoard()
    } else if (Validated === tetrominoStates.BOTTOM_COLLIDE) {
      FixTetramino()
    }
  }
})
const pos = computed({
  get() {
    return position
  },
  set(newValue) {
    const Validated = ValidatePosition(newValue._x, newValue._y)
    if (Validated === tetrominoStates.PASS) {
      position._x = newValue._x
      position._y = newValue._y
      DrawBoard()
    } else if (Validated === tetrominoStates.BOTTOM_COLLIDE) {
      FixTetramino()
    }
  }
})

// Tetramino logic

function Drop() {
  for (let y = posY.value; y < 20; y++) {
    posY.value++;
    if (posY.value === 0) {
      break
    }
  }
}

function Fall() {
  posY.value++;
}

function Left() {
  posX.value--;
}

function Right() {
  posX.value++;
}

function Rotate() {
  currentTetramino.value.shape = currentTetramino.value.shape[0].map((_, index) => currentTetramino.value.shape.map(row => row[index]).reverse())
  let validation = ValidatePosition(posX.value, posY.value)
  if (validation === tetrominoStates.PASS) {
    posX.value = posX.value
    posY.value = posY.value
  } else {
    validation = ValidatePosition(posX.value - 1, posY.value)
    if (validation === tetrominoStates.PASS) {
      posX.value = posX.value - 1
      posY.value = posY.value
      return
    }
    validation = ValidatePosition(posX.value + 1, posY.value)
    if (validation === tetrominoStates.PASS) {
      posX.value = posX.value + 1
      posY.value = posY.value
    }

  }

}


function RandomTetramino() {
  const name = piecesIDs[Math.floor(Math.random() * 7 + 1)]
  const tetramino = pieces[name]
  return tetramino

}

function GetNextTetramino() {

  currentTetramino.value = JSON.parse(JSON.stringify(nextTetramino.value))
  nextTetramino.value = RandomTetramino()

  let newPosX = 10 / 2 - Math.floor(currentTetramino.value.shape[0].length / 2)
  pos.value = {_x: newPosX, _y: 0}

}


function ValidatePosition(newX, newY) {
  let state = tetrominoStates.PASS;
  for (let y = 0; y < currentTetramino.value.shape.length; y++) {
    for (let x = 0; x < currentTetramino.value.shape[y].length; x++) {
      if (currentTetramino.value.shape[y][x] === 1) {

        if (newY + y >= 20) {
          state = tetrominoStates.BOTTOM_COLLIDE
        } else if (newX + x < 0 || newX + x >= 10) {
          state = tetrominoStates.SIDE_COLLIDE
        } else {
          if (newY === 0 && board.value[newY + y][newX + x] !== 0) {
            gameState.value = states.GAME_OVER
            return
          }
          if (board.value[newY + y][newX + x] !== 0) {
            if (newY === posY.value) {
              state = tetrominoStates.SIDE_COLLIDE
            }
            if (newX === posX.value) {
              state = tetrominoStates.BOTTOM_COLLIDE
            }
          }

        }
      }
    }
  }
  console.log(state)
  return state
}

function FixTetramino() {
  board.value = displayedBoard.value.map(row => row.map(cell => cell))

  ClearLine()
  GetNextTetramino()

}
function ClearLine() {
  let linesCleared = 0
  for (let y = 0; y < board.value.length; y++) {
    if (board.value[y].every(cell => cell !== 0)) {
      board.value.splice(y, 1)
      board.value.unshift(new Array(10).fill(0))
      linesCleared++
    }
  }
  lines.value += linesCleared
}

function DrawBoard() {

  displayedBoard.value = board.value.map(row => row.map(cell => cell))


  for (let x = 0; x < currentTetramino.value.shape[0].length; x++) {
    for (let y = 0; y < currentTetramino.value.shape.length; y++) {
      if (currentTetramino.value.shape[y][x] === 1) {
        displayedBoard.value[posY.value + y][posX.value + x] = currentTetramino.value.id
      }
    }
  }
}






onMounted(() => {
  Reset()

})

// watch(position, (newPosition) => {
//   DrawBoard()
// })
watch(time, (newTime) => {
  Fall()
})
watch(gameState, (state) => {
  if (state === states.ACTIVE) {
    window.addEventListener('keydown', Controller)
    if (timer.value) {
      return;
    }
    timer.value = setInterval(() => {
      time.value += speed.value;

    }, speed.value);
  } else {
    window.removeEventListener('keydown', Controller)
    clearInterval(timer.value)
    timer.value = null
  }

  // switch (newState) {
  //   case states.ACTIVE:
  //     break
  //   case states.PAUSED:
  //     break
  //   case states.GAME_OVER:
  //     break
  //   case states.NOT_ACTIVE:
  //     break
  // }
})
</script>
<template>

  <main>
    <div class="game-board">
      <div class="row" v-for="row in displayedBoard">
        <div v-for="cell in row"
             class="cell"
             :class="cell === 0 ? 'empty' : 'piece-' + piecesIDs[cell]"
        >
        </div>
      </div>
    </div>
    <div class="side-bar">


      <button @click="Stop">Stop</button>
      <button @click="Run">Run</button>
      <br>
      <button @click="Reset">Reset</button>
      <br>
      <button @click="Drop">Drop</button>
      <button @click="Fall">Fall</button>
      <button @click="Left">Left</button>
      <button @click="Right">Right</button>
      <button @click="Rotate">Rotate</button>
      <br>
      Натсупний: br
      <div class="game-board">
        <div class="row" v-for="row in nextTetramino?.shape">
          <div v-for="cell in row"
               class="cell"
               :class="cell === 0 ? 'empty' : 'piece-' + piecesIDs[nextTetramino.id]"
          ></div>
        </div>
      </div>


      {{ gameState === 3 ? 'Game over' : gameState === 2 ? 'Pause' : ''}}<br>
      <br>

      ({{ posX }}, {{ posY }})<br>
      <br>

      Час: {{ time / 1000 }}<br>
      Швидкість: {{ speed }}<br>

      Ліній: {{lines}}
    </div>

    <!--    <client-only>-->

    <!--    </client-only>-->

  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.game-board {
  background-color: #13111E;
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  gap: 4px;
  padding: 4px;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(20, 1fr);
}

.row {
  display: flex;
  flex-direction: row;
  gap: 4px;
}

.cell {
  width: 24px;
  height: 24px;
  color: white; /* temp */
}


.empty {
  background-color: #1D1A2D;
}

.piece-S {
  background-color: red;
}

.piece-Z {
  background-color: green;
}

.piece-L {
  background-color: magenta;
}

.piece-J {
  background-color: cyan;
}

.piece-O {
  background-color: yellow;
}

.piece-I {
  background-color: blue;
}

.piece-T {
  background-color: purple;
}

.side-bar {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px;
  border-radius: 4px;
  margin-top: 4px;
}
</style>