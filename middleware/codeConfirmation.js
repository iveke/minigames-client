export default defineNuxtRouteMiddleware(() => {
    const authStore = useAuthStore();

    const route = useRoute();

    if (route.path === '/confirm-email') {
        if (authStore.emailStatus !== emailConfirmStatus.PENDING) {
            return navigateTo('/register');
        }
    } else {
        if (authStore.tempToken && authStore.emailStatus === emailConfirmStatus.PENDING) {
            return navigateTo('/confirm-email');
        }
    }

})