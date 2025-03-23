<script setup>

import getKey from "~/composables/getKey.js";
import {Piece} from "~/composables/tetris/piece.js";
import {TetrisLogic} from "~/composables/tetris/tetrisLogic.js";
import {onMounted} from "vue";

const tetrisStore = useTetrisStore()
const tetrisLogic = ref(new TetrisLogic())


// console.log(piece)


// console.log(tetris.board)
// console.log(tetris.getCell(3, 6))

// Controller
onMounted(() => {
  window.addEventListener('keydown', KeyReader)

})

watch(() => tetrisStore.state, (value) => {
  switch (value) {
    case states.ACTIVE:
      window.addEventListener('keydown', KeyReader)
      tetrisLogic.value.DrawBoard()
      break;
    case states.PAUSED:
      window.removeEventListener('keydown', KeyReader)
      break;
    case states.GAME_OVER:
      window.removeEventListener('keydown', KeyReader)
      break;
    default:
      break
  }
  if (value === states.ACTIVE) {
  } else {
  }
})

function KeyReader(event) {
  if (event.ctrlKey || event.altKey || event.metaKey) {
    event.preventDefault();
  }
  switch (event.key) {
    case 'ArrowLeft':
      tetrisLogic.value.Left()
      break;
    case 'ArrowRight':
      tetrisLogic.value.Right()
      break;
    case 'ArrowDown':
      tetrisLogic.value.Drop()
      break;
    case 'ArrowUp':
      tetrisLogic.value.Rotate()
      break;
  }
  // this.key = event.key;

}

watch(() => tetrisStore.pieceCount, () => {
  tetrisLogic.value.DrawBoard()
})


// Time flow
watch(() => tetrisStore.time, () => {
  tetrisLogic.value.Fall()
})


</script>

<template>
  <div class="main">
    <div v-for="i in tetrisStore.board"
         class="cell"
         :class="i === 0 ? 'empty' : 'piece-' + pieces[i-1].name"
    ></div>
  </div>
  <button @click="tetrisLogic.Rotate">Rotate</button>
  <button @click="tetrisLogic.Left">Left</button>
  <button @click="tetrisLogic.Right">Right</button>
  <button @click="tetrisLogic.Drop">Drop</button>
  <button @click="() => {
    tetrisStore.generateNextPiece()
    piece = new Piece()
  }">Random
  </button>


</template>

<style scoped>
.main {
  background-color: #13111E;
  display: grid;
  width: fit-content;
  height: fit-content;
  gap: 4px;
  padding: 4px;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(20, 1fr);
}

.cell {
  width: 24px;
  height: 24px;
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

</style>