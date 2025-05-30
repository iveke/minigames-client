import {useLocalePath} from "#i18n";

export default defineNuxtRouteMiddleware((to) => {
    const authStore = useAuthStore();
    const localePath = useLocalePath();

    if (to.path === localePath('/account') && !authStore.isAuthorized) {
        return navigateTo(localePath('/login'))
    }
    if (to.path === localePath('/login') && authStore.isAuthorized) {
        return abortNavigation();
    }
    if (to.path === localePath('/signup') && authStore.isAuthorized) {
        return abortNavigation();
    }

    if (to.path === localePath('/confirm-email') && authStore.emailStatus !== 'PENDING') {
        // console.log(1234)
        return abortNavigation();
    }
    if (to.path !== localePath('/confirm-email') && authStore.token && authStore.emailStatus === 'PENDING') {
        return navigateTo({
            path: localePath('/confirm-email'),
            query: {
                forcedRedirect: 'true'
            }
        });
    }
})