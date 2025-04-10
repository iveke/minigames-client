<script setup>

import Footer from "~/components/Footer.vue";
import Header from "~/components/Header.vue";


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