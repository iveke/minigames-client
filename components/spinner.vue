<script setup>
import {defineProps} from 'vue';

const props = defineProps({
  loading: {
    type: Boolean,
    default: true
  },

  size: {
    type: String,
    default: '48px'
  },
  bg: {
    type: String,
    default: 'var(--white)'
  },
  color:{
    type: String,
    default: 'var(--black)'
  },
  width:{
    type: String,
    default: '30'
  },
  length:{
    type: String,
    default: '90'
  },
  speed:{
    type: String,
    default: '1'
  },

  text: {
    type: String,
    default: ''
  },

});
const lengthInDegrees = computed(() => {
  const width = Number(props.length) / 100 * 360;
  return `${width}deg`;

});
const widthInFormatedPercents = computed(() => {
  const width = Number(props.width) / 100 * 66;
  return `${width}%`;

});


</script>
<template>
  <div class="spinner-container" v-if="loading">
    <div class="spinner" :style="{
          height: size,
          '--bg-color': bg,
          '--spinner-color': color,}">
      <div class="spinner-circle"
           :style="{
                '--spinner-length': lengthInDegrees,
                '--spinner-width': widthInFormatedPercents,
                '--speed': speed,
           }"
      ></div>
    </div>
    <label v-if="text" for="">{{ text }}</label>
  </div>
</template>

<style scoped>
label {
  margin: 1rem 0;
}

.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

}

.spinner {
  aspect-ratio: 1;
  --bg-color: var(--white);
  --spinner-color: var(--black);
  position: absolute;
}

.spinner-circle {
  --spinner-width: 30;
  --spinner-length: 90;
  --speed: 1;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
  animation: spin calc(1s / var(--speed)) linear infinite;
}

.spinner-circle::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background: conic-gradient(
      var(--spinner-color) 0deg,
      var(--spinner-color) var(--spinner-length),
      var(--bg-color) var(--spinner-length),
      var(--bg-color) 360deg
  );
  mask: radial-gradient(transparent var(--spinner-width), black var(--spinner-width));
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>