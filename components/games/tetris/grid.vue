<script setup>
import {matrixMerge} from "~/composables/matrixMerge.js";

const {board, currentTetromino} = defineProps({
  board: {
    type: Array,
    required: true,
    validator(value) {
      return value.length !== 0
    }
  },
  currentTetromino: {
    type: Object,
    required: true
  },
})

const displayedBoard = computed(() => {
  const newBoard = matrixMerge(board, currentTetromino.shape, currentTetromino.x, currentTetromino.y)
  return newBoard.flat()
})

</script>

<template>
  <div class="grid">
    <GamesTetrisGridCell v-for="(cell, i) in displayedBoard"
          :key="i"
          :number="cell"
    />
  </div>
</template>

<style scoped>
.grid {
  --cell-size: 1.5rem;
  --gap: 0.125rem;

  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(20, 1fr);
  gap: var(--gap);

  background-image: linear-gradient(to left, var(--grid-color) var(--gap), transparent var(--gap)),
  linear-gradient(to top, var(--grid-color) var(--gap), transparent var(--gap));
  background-size: calc(var(--cell-size) + var(--gap)) calc(var(--cell-size) + var(--gap));
  background-color: var(--grid-bg);


}

</style>