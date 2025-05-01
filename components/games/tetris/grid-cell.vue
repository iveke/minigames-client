<script setup>
const {number} = defineProps({
  number: Number,
})

const CELL_COLOR_VARS = [
  "--tetromino-s",
  "--tetromino-z",
  "--tetromino-l",
  "--tetromino-j",
  "--tetromino-o",
  "--tetromino-i",
  "--tetromino-t",
]

const cellStyle = computed(() => {
  if (number === 0) {
    return {
      '--t-color': `transparent`,
      '--inner-shadow': `transparent`,
    }
  }
  return {
    '--t-color': `var(${CELL_COLOR_VARS[number - 1]})`,
    '--inner-shadow': `rgba(0, 0, 0, 0.5)`,
  }
})

</script>

<template>
  <div class="tetris-cell" :style="cellStyle"></div>
</template>

<style scoped>
.tetris-cell {
  --t-color: transparent;
  --inner-shadow: transparent;
  width: 1.5rem;
  height: 1.5rem;
  background-color: var(--t-color);
  border: solid 0.2rem var(--t-color);
  border-radius: 0.25rem;
  box-shadow: 0 0 0.25rem 0 color-mix(in srgb, var(--t-color) 75%, transparent), inset 0 0 0.5rem 0.25rem var(--inner-shadow);
}

</style>