import {useLocalePath} from "#i18n";

export default defineNuxtRouteMiddleware(() => {
    const authStore = useAuthStore();

    const route = useRoute();
    const localePath = useLocalePath();

    if (route.path === '/confirm-email') {
        if (authStore.emailStatus !== emailConfirmStatus.PENDING) {
            return navigateTo(localePath({path: '/signup'}));
        }
    } else {
        if (authStore.tempToken && authStore.emailStatus === emailConfirmStatus.PENDING) {
            return navigateTo(localePath({path: '/confirm-email'}));
        }
    }

})