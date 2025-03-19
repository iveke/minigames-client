export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,

        tempCredentials: {
            nickname: null,
            email: null,
            password: null,
            confirmed: false,
            token: null
        },
        // {nickname: '', email: '', password: '', token: ''}
    }),
    getters: {
        isAuthorized:  (state) => !!state.token
    },
    actions: {
        register(userData) {
            if (userData) {
                this.tempCredentials = userData
            }
        },
        confirmEmail(email) {

            if (email === this.tempCredentials.email) {
                this.tempCredentials.confirmed = true
                this.tempCredentials.token = 'test-token'

                this.login(this.tempCredentials)

                // this.initAuth()

            }
        },

        login(credentials) {
            if (credentials.email === this.tempCredentials.email
                && credentials.password === this.tempCredentials.password) {

                this.user = credentials.email;
                this.token = this.tempCredentials.token;

                navigateTo('/account');

                // localStorage.setItem('token', this.tempCredentials.token)

            }
        },

        logout() {
            this.user = null;
            this.token = null;
            // localStorage.removeItem('token');
            navigateTo('/');
        },

        // initAuth() {
        //     const token = localStorage.getItem('token')
        //     if (token) {
        //         this.token = token;
        //     }
        // }
    }
}, {
    persist: true
})