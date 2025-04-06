<script setup>
import Cell from "~/components/tetris/cell.vue";
import {arrSum} from "~/composables/arrSum";

const props = defineProps({
  nextTetramino: Object
})

</script>

<template>
  <div class="stats">
    <div class="next">
      <div class="grid">
        <div v-for="row  in nextTetramino.shape"
             class="row">
          <Cell v-if="arrSum(row) > 0"
                v-for="(cell, i) in row"
                :number="cell"
                :key="i"
          />
        </div>
      </div>
    </div>

    <slot></slot>
  </div>



</template>

<style scoped>
.stats {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

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