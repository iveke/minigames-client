<script setup>

const route = useRoute()
const counter = useCounterStore();

</script>

<template>
  <br>
  <h2>Current route: {{ route.path }}</h2>

  <br>
  <NuxtLink to="/">/main</NuxtLink>
  <br>
  <a href="./">/main A-Href</a>

  <br>
  <br>
  <p>Counter: {{ counter.count }}</p>
  <p>Double counter: {{ counter.doubleCount }}</p>

  <button @click="counter.increment()">Increment</button>
  <button @click="counter.decrement()">Decrement</button>
  <button @click="counter.multiply()">Multiply</button>


</template>

<style scoped>

</style>