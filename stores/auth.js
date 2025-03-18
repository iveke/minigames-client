export const useAuthStore = defineStore('authorization', {
    state: () => ({
        isAuthorized: false,
    }),
    getters: {},
    actions: {
        authorize() {
            this.isAuthorized = true;
        },
        deauthorize() {
            this.isAuthorized = false;
        }
    }
})