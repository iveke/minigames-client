export default defineNuxtPlugin(() => {
    const authStore = useAuthStore();
    try {
        authStore.initAuth()
    } catch (e) {
        // console.error(e)
    }
});