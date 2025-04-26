export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore();

    if (to.path === '/account' && !authStore.isAuthorized) {
        return navigateTo('/login');
    }
    if (to.path === '/login' && authStore.isAuthorized) {
        return abortNavigation();
    }
    if (to.path === '/signup' && authStore.isAuthorized) {
        return abortNavigation();
    }

    if (to.path === '/confirm-email' && authStore.emailStatus !== emailConfirmStatus.PENDING) {
        // console.log(1234)
        return abortNavigation();
    }
    if (to.path !== '/confirm-email' && authStore.tempToken && authStore.emailStatus === emailConfirmStatus.PENDING) {
        return navigateTo({
            path:'/confirm-email',
            query: {
                forcedRedirect: true
            }
        });
    }
})