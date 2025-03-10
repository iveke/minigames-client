<script setup>

</script>

<template>

  <div class="container-default">
    <Navigation/>

    <slot></slot>
  </div>


</template>

<style>
.container-default {
  border: 32px solid gray;
  box-sizing: border-box;
  padding: 32px;
}
</style>