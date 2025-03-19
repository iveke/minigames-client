<script setup lang="ts">
useHead({
  title: 'Підтвердження емейлу',
})
const auth = useAuthStore();

const router = useRoute();
const email = router.query.email;

const confirmed = computed(() => {
  return auth.tempCredentials.confirmed
})


function Confirm() {
  auth.confirmEmail(email)
  // api request here
}
</script>

<template>
  <button @click="Confirm">Підтвердити емейл</button>
  <div v-if="confirmed">Емейл підтверджено</div>
</template>

<style scoped>

</style>