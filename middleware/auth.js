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

    if (to.path === localePath('/confirm-email') && authStore.emailStatus !== emailConfirmStatus.PENDING) {
        // console.log(1234)
        return abortNavigation();
    }
    if (to.path !== localePath('/confirm-email') && authStore.tempToken && authStore.emailStatus === emailConfirmStatus.PENDING) {
        return navigateTo({
            path: localePath('/confirm-email'),
            query: {
                forcedRedirect: 'true'
            }
        });
    }
})