export default defineNuxtPlugin((nuxtApp) => {
    const authStore = useAuthStore();
    // try {
    //     authStore.initAuth()
    // } catch (e) {
    //     // console.error(e)
    // }
    const stateCookie = useCookie('app-state', { path: '/', maxAge: 60 * 60 * 24 }) // Храним в куках

    if (import.meta.server) {
        // На сервере перед рендерингом загружаем состояние из кук
        authStore.$patch(stateCookie.value || {})
    }

    if (import.meta.client) {
        // На клиенте сохраняем состояние после изменений
        watch(() => authStore.$state, (newState) => {
            stateCookie.value = newState
        }, { deep: true })
    }
});

