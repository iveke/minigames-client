import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
    const api = axios.create({
        baseURL: nuxtApp.$config.public.API_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    api.interceptors.request.use(
        (config) => {
            const authStore = nuxtApp.$authStore;
            const token = authStore?.token;

            const requiresAuth = config.requiresAuth ?? true;

            if (token && requiresAuth) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );


    return {
        provide: {
            axios: api,
            authStore: useAuthStore(),
        },
    };
});