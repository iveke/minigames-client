<script setup>
import {useTimer} from "~/composables/useTimer.js";

useHead({
  title: 'GMini - Головна',
})
definePageMeta({
  middleware: [],
})
const isRunning = ref(false)
const timestamp = ref(performance.now())

watch(isRunning, (newValue) => {
  if (newValue) {
    requestAnimationFrame(UpdateTimeStamp)
  }
})

function UpdateTimeStamp() {
  timestamp.value = performance.now()
  if (isRunning.value) {
    requestAnimationFrame(UpdateTimeStamp)
  }
}
const timer = useTimer()
const pr = ref(null)
</script>

<template>

  <div class="main">

    time: {{ timer.time }} <br>
    precision: {{ timer.timePrecision }} <br>
    formated: {{ timer.formatedTime }} <br>

    <button @click="timer.startTimer()">Start</button>
    <button @click="timer.stopTimer()">Stop</button>
    <input v-model="pr" type="number">
    <button @click="timer.setPrecision(pr)">Add precision</button>

<!--    <button @click="isRunning = !isRunning">Stop/play</button>-->
<!--    {{ timestamp }}-->
<!--    {{ isRunning }}-->
  </div>

</template>


<style scoped>
input {
  width: 50px;
  height: 20px;
  padding: 2px;
}
</style>