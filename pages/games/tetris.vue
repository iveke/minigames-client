<script setup>
useHead({
  title: 'Тетріс',
})




</script>
<template>

  <main>
    <div class="game-board">
  <!--    <client-only>-->
        <TetrisBoard/>
        <TetrisInfoPanel/>
  <!--    </client-only>-->
    </div>

  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.game-board {
  display: flex;
  flex-direction: row;
}
</style>