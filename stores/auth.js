import {useAuthService} from "~/services/auth.js";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null,
        email: null,
        emailStatus: null,
    }),
    getters: {
        isAuthorized: (state) => !!state.token && state.emailStatus === 'CONFIRMED'
    },
    actions: {
        logout() {
            this.token = null;
            this.email = null
            this.emailStatus = null
        },

        async login(values) {
            const {login} = useAuthService()
            const response = await login(values)

            if (response.ok) {
                this.token = response.data.token;
                this.email = values.email
                this.emailStatus = response.data.confirmEmail ? 'CONFIRMED' : 'PENDING'
            } else {
                console.error(response)
            }

            return response
        },
        async register(values) {
            const {register} = useAuthService()
            const response = await register(values)

            if (response.ok) {
                this.token = response.data.token;
                this.email = values.email
                this.emailStatus = 'PENDING'
            } else {
                console.error(response)
            }

            return response
        },
        async confirmEmail(values) {
            if (this.emailStatus !== 'PENDING') {
                throw new Error('Email status in not PENDING')
            }
            if (values.code < 10000 && values.code > 99999) {
                throw new Error('Invalid values');
            }

            const {confirmEmail} = useAuthService()
            const response = await confirmEmail(values)

            if (response.ok) {
                this.emailStatus = 'CONFIRMED'
            } else {
                console.error(response)
            }

            return response
        },

        async requestCode() {
            if (this.emailStatus !== 'PENDING') {
                throw new Error('Email status in not PENDING')
            }

            const {requestCode} = useAuthService()
            const response = await requestCode()

            if (!response.ok) {
                console.error(response)
            }

            return response
        },
    }
})