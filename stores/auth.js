import {config} from "@vue/test-utils";
import {emailConfirmStatus} from "~/utils/constants/constants.js";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
        tempToken: null,
        email: null,
        emailStatus: null,
        requestCodeTimeout: null

        // {nickname: '', email: '', password: '', token: ''}
    }),
    getters: {
        isAuthorized: (state) => !!state.token
    },
    actions: {
        async register(values) {
            if (!values) {
                console.error("Values is empty", values)
                return false
            }
            let success = false

            const apiUrl = useRuntimeConfig().public.API_URL
            try {
                const response = await fetch(`${apiUrl}/auth/register`, {
                    method: 'POST',
                    headers: {
                        'mode': 'no-cors',
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                })
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error(errorData)
                }
                const data = await response.json();

                this.tempToken = data.token;
                this.email = values.email
                this.emailStatus = emailConfirmStatus.PENDING
                success = true

                console.log('Success', data)

                // navigateTo('/account');
            } catch (e) {
                console.error("Error during registration", e)
            }

            return success
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

        async login(values) {
            if (!values) {
                console.error("Values is empty", values)
                return false
            }
            let success = false

            const apiUrl = useRuntimeConfig().public.API_URL
            try {
                const response = await fetch(`${apiUrl}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                })
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error(errorData)
                }
                const data = await response.json();
                this.token = data.token;
                success = true

                console.log('Success', data)

                // navigateTo('/account');
            } catch (e) {
                console.error("Error during registration", e)
            }

            return success
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