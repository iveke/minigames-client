import {config} from "@vue/test-utils";
import {emailConfirmStatus} from "~/utils/constants/constants.js";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
        tempToken: null,
        emailStatus: emailConfirmStatus.NOT_CONFIRMED,
        requestCodeTimeout: null

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
                    "password": password
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
                    this.tempToken = data.token;

                    this.emailStatus = emailConfirmStatus.PENDING

                    // navigateTo('/account');
                } catch (e) {
                    console.error("Error during registration", e)
                }
            }
        },
        async confirmEmail(code) {
            if (code < 10000 && code > 99999) {
                console.error("Code is not valid")
                return
            }
            if (this.emailStatus === emailConfirmStatus.PENDING) {


            }

            const apiUrl = useRuntimeConfig().public.API_URL
            const jwtBearer = `Bearer ${this.tempToken}`
            try {
                const response = await fetch(`${apiUrl}/user/confirmEmail/${code}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': jwtBearer
                    },
                })
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error(errorData)
                }
                const data = await response.json();
                console.log(data)

                this.emailStatus = emailConfirmStatus.CONFIRMED
                this.token = this.tempToken;
                this.tempToken = null;

                navigateTo('/account');
            } catch (e) {
                console.error("Error during registration", e)
            }


        },

        async requestCode() {
            if (this.emailStatus === emailConfirmStatus.PENDING) {
                if (this.requestCodeTimeout < Date.now()) {
                    this.setRequestCodeTimeout(1)
                    this.emailStatus = emailConfirmStatus.PENDING

                    const apiUrl = useRuntimeConfig().public.API_URL
                    const jwtBearer = `Bearer ${this.tempToken}`
                    try {
                        const response = await fetch(`${apiUrl}/auth/generateConfirmEmailCode`, {
                            method: 'POST',
                            headers: {
                                'Authorization': jwtBearer
                            },
                        })
                    } catch (e) {
                        console.error("Error during asking request", e)
                    }

                }
            }
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
            this.isConfirmedEmail = null
            this.requestCodeTimeout = null;
            navigateTo('/');
        },


        setRequestCodeTimeout(minutes = 1) {
            const nextAllowedTime = Date.now() + 1000 * 60 * minutes
            this.requestCodeTimeout = nextAllowedTime
        }
    }
})