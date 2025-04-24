import {useLocalePath} from "#i18n";

export default defineNuxtRouteMiddleware(() => {
    const authStore = useAuthStore();
    const localePath = useLocalePath();

    if (!authStore.isAuthorized) {
        return navigateTo(localePath({path: '/login'}));
    }
})