<script setup>
import Cell from "~/components/tetris/cell.vue";
import {matrixMerge} from "~/composables/matrixMerge.js";

const {board, currentTetromino} = defineProps({
  board: {
    type: Array,
    required: true
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
    <Cell v-for="(cell, i) in displayedBoard"
          :number="cell"
          :key="i"
    />
  </div>
</template>

<style scoped>
.grid {
  background-color: var(--grid-bg);

  width: fit-content;
  height: fit-content;

  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(20, 1fr);
  padding: 4px;
  gap: 4px;
}


</style>