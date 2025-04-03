export default defineNuxtPlugin(() => {
    const authStore = useAuthStore();
    const stateCookie = useCookie('app-state', { path: '/', maxAge: 60 * 60 * 24 * 7 })

    if (import.meta.server) {
        authStore.$patch(stateCookie.value || {})
    }

    if (import.meta.client) {
        watch(() => authStore.$state, (newState) => {
            stateCookie.value = newState
        }, { deep: true })
    }
});

