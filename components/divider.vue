<script setup>
defineProps({
  title: {
    type: String,
    default: 'Default Title',
    required: false
  },
  titleColor: {
    type: String,
    default: 'black',
    required: false
  },
  lineColor: {
    type: String,
    default: 'black',
    required: false
  },
  width: {
    type: String,
    default: '100%',
    required: false
  }
})
</script>

<template>
  <div class="divider" :style="{ width: width }">
    <div class="divider__line" :style="{ backgroundColor: lineColor }"></div>
    <span class="divider__title" :style="{ color: titleColor }">{{ title }}</span>
    <div class="divider__line" :style="{ backgroundColor: lineColor }"></div>
  </div>
</template>

<style scoped>
.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

}
.divider__line {
  flex: 1;
  height: 1px;
  background-color: var(--black);
}

.divider__title {
  font-size: 1rem;
  font-weight: 400;
}
</style>