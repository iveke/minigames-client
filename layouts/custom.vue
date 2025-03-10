<script setup>

</script>

<template>

  <div class="container-custom">
    <Navigation/>

    <slot></slot>
  </div>


</template>

<style>
.container-custom {
  border: 32px solid red;
  box-sizing: border-box;
  padding: 32px;
}
</style>