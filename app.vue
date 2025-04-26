<script setup>
import {useAuthStore} from "~/stores/auth.js";

const authStore = useAuthStore()


onMounted(() => {
  if (authStore.emailStatus === emailConfirmStatus.PENDING) {
    console.log('redirect to confirm email')
    navigateTo({
      path:'/confirm-email',
      query: {
        forcedRedirect: true
      }
    })
  }
})

</script>

<template>
  <NuxtRouteAnnouncer/>
  <div class="__main">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>


