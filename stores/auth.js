import {emailConfirmStatus} from "~/utils/constants/constants.js";
import {BaseResponse} from "~/utils/BaseResponse.js";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
        tempToken: null,
        email: null,
        emailStatus: null,
    }),
    getters: {
        isAuthorized: (state) => !!state.token
    },
    actions: {
        async register(values) {
            const response = BaseResponse()

            if (!values) {
                response.statusText = "Values is empty"
                response.status = undefined
                console.error(response.statusText, values)
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
            const response = BaseResponse()

            if (code < 10000 && code > 99999) {
                response.statusText = "Code is not valid"
                response.status = undefined
                console.error(response.statusText, values)
                return response
            }
            if (this.emailStatus !== emailConfirmStatus.PENDING) {
                response.statusText = "Email is not in pending state"
                response.status = undefined
                console.error(response.statusText)
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
            const response = BaseResponse()

            if (this.emailStatus !== emailConfirmStatus.PENDING) {
                response.statusText = "Email is not in pending state"
                response.status = undefined
                console.error(response.statusText)
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
            const response = BaseResponse()

            if (!values) {
                response.statusText = "Values is empty"
                response.status = undefined
                console.error(response.statusText, values)
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
        },
    }
})