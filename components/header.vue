<script setup>
const auth = useAuthStore();
</script>

<template>
  <header>
    <div class="header-container">
      <div class="logo">
        <NuxtLink to="/">
          <img src="~/assets/svg/logo.svg" alt="" height="56">
        </NuxtLink>
      </div>

      <div class="nav-container">
        <nav>
          <NuxtLink class="nav-link" to="/games/tetris">Тетріс</NuxtLink>
          <NuxtLink class="nav-link" to="/games/memory">Memory Game</NuxtLink>
          <NuxtLink class="nav-link" to="/games/snake">Змійка</NuxtLink>
        </nav>


        <div class="auth-block">
          <NuxtLink class="button style-3" to="/login" v-if="!auth.isAuthorized">Увійти</NuxtLink>

          <NuxtLink class="button style-2" to="/signup" v-if="!auth.isAuthorized">Зареєструватися</NuxtLink>

          <NuxtLink to="/account" v-if="auth.isAuthorized">
            <Icon class="style-1" role="button" name="material-symbols:person-rounded" size="3rem"></Icon>
          </NuxtLink>


          <select class="header-dropdown" name="locale" id="locale">
            <option value="1">UA</option>
            <option value="1">EN</option>
          </select>




        </div>

      </div>
    </div>
    <div class="header-figure"></div>
  </header>
</template>

<style scoped>

.logo {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-container {
  display: flex;
  align-items: center;
  gap: 3rem;

  a {
    height: 3rem;
  }
}

nav, .auth-block {
  display: flex;
  gap: 1rem;
  padding: 0 1rem;

}

.button.style-2 {
  color: var(--orange-light);
}


header {
  width: 100%;
  height: 4.5rem;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.header-container {
  width: 100%;
  height: 4.5rem;

  display: flex;
  justify-content: space-between;

  background-color: var(--orange-light);
  padding: 0 var(--default-section-padding-X);

}

.header-figure {
  width: 100%;
  height: 1.5rem;
  position: absolute;
  bottom: -1.5rem;


  background: var(--orange);

  clip-path: polygon(0 100%, 0 0, 100% 0, 100% 100%, 66% 0, 33% 0);
}

</style>