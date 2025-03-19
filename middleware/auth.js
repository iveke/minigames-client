export default defineNuxtRouteMiddleware(() => {
    const authStore = useAuthStore();

    if (!authStore.isAuthorized) {
        console.log('Not authorized');
        return navigateTo('/login');
    }
})