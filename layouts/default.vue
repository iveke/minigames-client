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

<style>
.container-default {
  border: 32px solid gray;
  box-sizing: border-box;
  padding: 32px;
}
</style>