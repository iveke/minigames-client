<script setup>
import {matrixTrim} from "~/composables/matrixTrim.js";

const props = defineProps({
  nextTetramino: {
    type: Object,
    required: false,
  }
})

const trimmedShape = computed(() => matrixTrim(props.nextTetramino.shape).newMatrix)


</script>

<template>
  next

  <div class="next">
    <div class="grid">
      <div v-for="row in trimmedShape" class="row">
        <GamesTetrisGridCell v-for="(cell, i) in row"
                             :number="cell"
                             :key="i"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid {
  width: fit-content;
  height: fit-content;

  display: flex;
  flex-direction: column;

  padding: 4px;
  gap: 4px;
}

.row {
  display: flex;
  flex-direction: row;
  gap: 4px;
}

.next {
  background-color: var(--grid-bg);
  display: flex;
  width: calc(24px * 4 + 4px * 6 + 8px * 2);
  aspect-ratio: 1/1;

  justify-content: center;
  align-items: center;


}
</style>