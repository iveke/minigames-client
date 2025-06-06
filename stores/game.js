import {useFormatNumbers} from "~/composables/useFormatNumbers.js";
import {gameStates} from "~/utils/constants/constants.js";
import {useGameService} from "~/services/game.js";

export const useGameStore = defineStore('game', {
    state: () => ({
        gameState: gameStates.NOT_ACTIVE,
        gameID: null,

        points: 0,
        level: 1,

        startTime: null,
        endTime: null,
        duration: 0,


        speed: 1000,
        // customReset: () => {},
    }),
    getters: {
        isActive: (state) => state.gameState === gameStates.ACTIVE,
        isPaused: (state) => state.gameState === gameStates.PAUSED,
        isGameOver: (state) => state.gameState === gameStates.GAME_OVER,
        isNotActive: (state) => state.gameState === gameStates.NOT_ACTIVE,

        // getGameDuration: (state) => {
        //
        // },


        formattedPoints: (state) => useFormatNumbers(state.points)
    },
    actions: {
        // custom functions
        CustomReset() {
        },
        CustomPlay() {
        },
        CustomPause() {
        },
        CustomGameOver() {
        },


        CustomStartLoop() {
        },
        CustomStopLoop() {
        },
        CustomResetLoop() {
        },

        DefineCustom(name, func = () => {
        }) {
            switch (name) {
                case 'Reset':
                case 'Play':
                case 'Pause':
                case 'GameOver':
                case 'StartLoop':
                case 'StopLoop':
                case 'ResetLoop':
                    const key = 'Custom' + name
                    this[key] = func.bind(this)
                    break
                default:
                    console.error(`Unknown custom function name: ${name}`)
                    break
            }
        },

        // Define static info
        DefineGameID(gameID) {
            this.gameID = gameID
        },

        // Points
        Reward(basePoints) {
            this.points += basePoints * this.level
        },


        // Duration
        SetStartTimeStamp() {
            this.startTime = new Date()
        },
        SetPauseTimeStamp() {
            this.endTime = new Date()
            this.duration += Math.floor((this.endTime - this.startTime))
        },


        // Game state

        Reset() {
            this.gameState = gameStates.NOT_ACTIVE

            this.points = 0
            this.level = 1

            this.startTime = null
            this.endTime = null
            this.duration = 0

            this.CustomReset()
        },
        Play() {
            this.gameState = gameStates.ACTIVE
            this.SetStartTimeStamp()
            this.CustomPlay()
        },
        Pause() {
            this.gameState = gameStates.PAUSED
            this.SetPauseTimeStamp()
            this.CustomPause()
        },
        async GameOver() {
            this.gameState = gameStates.GAME_OVER
            this.SetPauseTimeStamp()
            this.CustomGameOver()

            const authStore = useAuthStore()

            if (authStore.isAuthorized) {
                const response = await this.SaveResult(authStore.token)
                console.log(response)
            }
        },


        // Tick game loop
        // CustomPreventTick() {},
        // CustomNextTick() {},
        //
        // PreventTick() {
        //     let ifPrevent = !this.isActive
        //
        //     if (!ifPrevent) {
        //         ifPrevent = this.CustomPreventTick()
        //     }
        //     return ifPrevent
        // },
        //
        // NextTick(time = 1000) {
        //     if (!this.PreventTick()) return false
        //
        //     this.CustomNextTick()
        //
        //     setTimeout(() => {
        //         this.NextTick()
        //     }, time)
        // },

        // Game loop

        NextTick() {
            const startTime = performance.now()

            this.CustomStartLoop()

            const executionTime = performance.now() - startTime
            let delay = this.speed - executionTime
            if (delay < 0) {
                delay = 0;
            }

            setTimeout(this.NextTick, delay);

        },

        StartLoop() {
        },
        StopLoop() {
            this.CustomStopLoop()
        },
        RestartLoop() {
            this.StopLoop()
            this.StartLoop()
        },
        ResetLoop() {
            this.CustomResetLoop()
        },


        // API request
        async SaveResult(token) {
            const dateTime = new Date().toISOString()

            const jwtBearer = `Bearer ${token}`
            // const body = {
            //     gameId: this.gameID,
            //     playTime: dateTime,
            //     points: this.points,
            //     duration: this.duration,
            //     level: this.level,
            // }
            const body = {
                gameId: this.gameID,
                playTime: dateTime,
                points: this.points,
                duration: this.duration,
                level: this.level,
            }
            console.log(body)
            const game = useGameService()
            const response = await game.postResult(body)

            if (!response.ok) {
                console.error(response)
            }

            return response

        },


        // Safe exit


    }
})