<script setup>
const {number} = defineProps({
  number: Number,
})
const colorVars = [
  '--empty-color',
  '--S-color',
  '--Z-color',
  '--J-color',
  '--L-color',
  '--O-color',
  '--I-color',
  '--T-color'
]
const cell = ref(null)
const cellStyle = computed(() => {
  return {
    backgroundColor: `var(${colorVars[number]})`
  }
})

</script>

<template>
  <div ref="cell" class="cell" :style="cellStyle"></div>
</template>

<style scoped>
.cell {
  width: 24px;
  height: 24px;
}
</style>