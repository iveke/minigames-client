<script setup>
const auth = useAuthStore();
</script>

<template>

  <header>
    <div class="logo">
      <NuxtLink to="/">
        <img src="~/assets/svg/logo.svg" alt="" height="56">
      </NuxtLink>
    </div>
    <nav>
      <NuxtLink to="/games/tetris">
        <button>Тетріс</button>
      </NuxtLink>
      <NuxtLink to="/games/memory">
        <button>Меморі</button>
      </NuxtLink>
      <NuxtLink to="/games/snake">
        <button>Змійка</button>
      </NuxtLink>
    </nav>



    <div class="auth-block">
      <div class="non-authorized" v-if="!auth.isAuthorized">
        <NuxtLink to="/login">
          <button>Увійти</button>
        </NuxtLink>
        <NuxtLink to="/signup">
          <button>Зареєструватися</button>
        </NuxtLink>
      </div>


      <div class="account" v-else>
        <NuxtLink to="/account">
          <button>Акаунт</button>
        </NuxtLink>
        <button @click="auth.logout">Вийти</button>
      </div>

    </div>


  </header>
</template>

<style scoped>
header {
  width: 100%;
  height: 80px;
  background-color: var(--header-color);


  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--default-section-padding-X);
}


</style>