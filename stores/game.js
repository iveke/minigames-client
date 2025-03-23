export const useGameStore = defineStore('game', {
    state: () => ({
        state: states.NOT_ACTIVE,
        timer: 0,
        score: 0,
    }),
    getters: {
        getTemplate:  (state) => !!state.key
    },
    actions: {

    }
})
