<script setup>

import Footer from "~/components/common/footer.vue";
import Header from "~/components/common/header.vue";



</script>

<template>

  <Header/>

  <main>
    <slot></slot>
  </main>

  <Footer/>


</template>

<style scoped>
main {
  display: flex;
  flex: 1;
}
</style>