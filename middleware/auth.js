export default defineNuxtRouteMiddleware(() => {
    const authStore = useAuthStore();

    if (!authStore.isAuthorized) {
        return navigateTo('/login');
    }
})