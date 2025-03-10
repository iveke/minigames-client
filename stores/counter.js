export const useCounterStore = defineStore('counter', {
    state: () => ({
        count: 0,
    }),
    getters: {
        doubleCount: (state) => state.count * 2,
    },
    actions: {
        increment() {
            this.count++;
        },
        decrement() {
            this.count--;
        },
        multiply() {
            this.count *= 2;
        }
    }
})