<script setup>

const route = useRoute()

</script>

<template>
  <div>
    <br>
    <h2>Current route: {{ route.path }}</h2>
    <br>

<!--
NuxtLink - without reload, pinia store is not reset
a href - with reload, pinia store reset
-->
    <NuxtLink to="/some_page">/some page</NuxtLink><br>
    <a href="./some_page">/some page A-Href</a>


  </div>

</template>
