import {config} from "@vue/test-utils";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,

        // {nickname: '', email: '', password: '', token: ''}
    }),
    getters: {
        isAuthorized: (state) => !!state.token
    },
    actions: {
        async register(email, password, username) {
            if (email && password && username) {
                const apiUrl = useRuntimeConfig().public.API_URL
                const body = {
                    "username": username,
                    "email": email,
                    "password": password,
                    "phone": "+380 12 345 67 89"
                };
                try {
                    const response = await fetch(`${apiUrl}/auth/register`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body)
                    })
                    if (!response.ok) {
                        const errorData = await response.json();
                        console.error(errorData)
                    }
                    const data = await response.json();
                    this.token = data.token;

                    navigateTo('/account');
                } catch (e) {
                    console.error("Error during registration", e)
                }
            }
        },
        confirmEmail(email) {

            // if (email === this.tempCredentials.email) {
            //     this.tempCredentials.confirmed = true
            //     this.tempCredentials.token = 'test-token'
            //
            //     this.login(this.tempCredentials)
            //
            //     // this.initAuth()
            //
            // }
        },

        async login(email, password) {
            if (email && password) {
                const apiUrl = useRuntimeConfig().public.API_URL
                const body = {
                    "email": email,
                    "password": password
                };
                console.log("Login", body)
                try {
                    const response = await fetch(`${apiUrl}/auth/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(body)
                    })
                    if (!response.ok) {
                        const errorData = await response.json();
                        console.error(errorData)
                    }
                    const data = await response.json();
                    this.token = data.token;

                    navigateTo('/account');
                } catch (e) {
                    console.error("Error during registration", e)
                }

            }
        },

        logout() {
            this.token = null;
            navigateTo('/');
        },

        // initAuth() {
        //     const token = localStorage.getItem('token')
        //     if (token) {
        //         this.token = token;
        //     }
        // }
    }
})