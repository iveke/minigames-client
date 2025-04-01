<script setup>
defineProps({
  number: Number,
})
</script>

<template>
  <div class="cell"
       :class="number === 0 ? 'empty' : 'piece-' + number"

  >

  </div>
</template>

<style scoped>
.cell {
  width: 24px;
  height: 24px;
  color: white; /* temp */
}

.empty {
  background-color: #1D1A2D;
}

.piece-1 {
  background-color: red;
}

.piece-2 {
  background-color: green;
}

.piece-3 {
  background-color: magenta;
}

.piece-4 {
  background-color: cyan;
}

.piece-5 {
  background-color: yellow;
}

.piece-6 {
  background-color: blue;
}

.piece-7 {
  background-color: purple;
}
</style>