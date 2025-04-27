<script setup>
import {useAuthStore} from "~/stores/auth.js";
import {useLocalePath} from "#i18n";

const authStore = useAuthStore()
const localePath = useLocalePath();


onMounted(() => {

  if (authStore.emailStatus === emailConfirmStatus.PENDING) {
    navigateTo({
      path: localePath('/confirm-email'),
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


