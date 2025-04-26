import {config} from "@vue/test-utils";
import {emailConfirmStatus} from "~/utils/constants/constants.js";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
        tempToken: null,
        email: null,
        emailStatus: null,

        // {nickname: '', email: '', password: '', token: ''}
    }),
    getters: {
        isAuthorized: (state) => !!state.token
    },
    actions: {
        async register(values) {
            const response = {
                ok: false,
                status: undefined,
                statusText: undefined,
                data: undefined,
            }

            if (!values) {
                console.error("Values is empty", values)
                return response
            }


            const apiUrl = useRuntimeConfig().public.API_URL
            try {
                const fetchResponse = await fetch(`${apiUrl}/auth/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                })
                response.ok = fetchResponse.ok
                response.status = fetchResponse.status
                response.statusText = fetchResponse.statusText
                response.data = await fetchResponse.json()

                if (fetchResponse.ok) {
                    this.tempToken = response.data.token;
                    this.email = values.email
                    this.emailStatus = emailConfirmStatus.PENDING
                } else {
                    console.error(response.data)
                }
            } catch (e) {
                console.error("Error during registration", e)
            }

            return response
        },
        async confirmEmail(values) {
            const {code} = values
            const response = {
                ok: false,
                status: undefined,
                statusText: undefined,
                data: undefined,
            }

            if (code < 10000 && code > 99999) {
                console.error("Code is not valid")
                return response
            }
            if (this.emailStatus !== emailConfirmStatus.PENDING) {
                console.error("Email is not in pending state")
                return response
            }

            const apiUrl = useRuntimeConfig().public.API_URL
            const jwtBearer = `Bearer ${this.tempToken}`
            try {
                const fetchResponse = await fetch(`${apiUrl}/user/confirmEmail/${code}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': jwtBearer
                    },
                })
                response.ok = fetchResponse.ok
                response.status = fetchResponse.status
                response.statusText = fetchResponse.statusText
                response.data = await fetchResponse.json()

                if (response.ok) {
                    this.token = this.tempToken;
                    this.tempToken = null;
                    this.emailStatus = emailConfirmStatus.CONFIRMED
                } else {
                    console.error(response.data)
                }
            } catch (e) {
                console.error("Error during registration", e)
            }

            return response
        },

        async requestCode() {
            const response = {
                ok: false,
                status: undefined,
                statusText: undefined,
                data: undefined,
            }

            if (this.emailStatus !== emailConfirmStatus.PENDING) {
                console.error("Email is not in pending state")
                return response
            }

            const apiUrl = useRuntimeConfig().public.API_URL
            const jwtBearer = `Bearer ${this.tempToken}`
            try {
                const fetchResponse = await fetch(`${apiUrl}/auth/generateConfirmEmailCode`, {
                    method: 'POST',
                    headers: {
                        'Authorization': jwtBearer
                    },
                })
                response.ok = fetchResponse.ok
                response.status = fetchResponse.status
                response.statusText = fetchResponse.statusText
                response.data = await fetchResponse.json()

                if (response.ok) {

                } else {
                    console.error(response.data)
                }

            } catch (e) {
                console.error("Error during asking request", e)
            }

            return response
        },

        async login(values) {
            const response = {
                ok: false,
                status: undefined,
                statusText: undefined,
                data: { undefined },
            }

            if (!values) {
                console.error("Values is empty", values)
                return response
            }

            const apiUrl = useRuntimeConfig().public.API_URL
            try {
                const fetchResponse = await fetch(`${apiUrl}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                })
                response.ok = fetchResponse.ok
                response.status = fetchResponse.status
                response.statusText = fetchResponse.statusText
                response.data = await fetchResponse.json()

                if (response.ok) {
                    if (response.data.confirmEmail) {
                        this.token = response.data.token;
                    } else {
                        this.tempToken = response.data.token;
                        this.email = values.email
                        this.emailStatus = emailConfirmStatus.PENDING
                    }

                } else {
                    console.error(response.data)
                }
            } catch (e) {
                console.error("Error during registration", e)
            }

            return response
        },

        logout() {
            this.token = null;
            this.tempToken = null;
            this.email = null
            this.emailStatus = null
            navigateTo('/');
        },
    }
})