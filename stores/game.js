import {useFormatNumbers} from "~/composables/useFormatNumbers.js";
import {gameStates} from "~/utils/constants/constants.js";

export const useGameStore = defineStore('game', {
    state: () => ({
        gameState: gameStates.NOT_ACTIVE,
        gameID: null,

        points: 0,
        level: 1,

        startTime: null,
        endTime: null,
        duration: 0,
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
            this.duration += Math.floor((this.endTime - this.startTime) / 1000)
        },



        // Game state
        Reset(customLogic = () => {}) {
            this.gameState = gameStates.NOT_ACTIVE

            this.points = 0
            this.level = 1

            this.startTime = null
            this.endTime = null
            this.duration = 0

            customLogic()
        },
        Play(customLogic = () => {}) {
            this.gameState = gameStates.ACTIVE
            this.SetStartTimeStamp()
            customLogic()

        },
        Pause(customLogic = () => {}) {
            this.gameState = gameStates.PAUSED
            this.SetPauseTimeStamp()
            customLogic()
        },
        GameOver(customLogic = () => {}) {
            this.gameState = gameStates.GAME_OVER
            this.SetPauseTimeStamp()
            customLogic()

            const authStore = useAuthStore()

            if (authStore.isAuthorized) {
                const response = this.SaveResult(authStore.token)
                console.log(response)
            }

        },


        // Game loop
        StartGameLoop(customLogic = () => {}) {

        },
        StopLoop(customLogic = () => {}) {

        },
        RestartGameLoop() {
            this.StopLoop()
            this.StartGameLoop()
        },
        ResetGameLoop() {
        },


        // API request
        async SaveResult(token) {
            const dateTime = new Date().toISOString()

            const jwtBearer = `Bearer ${token}`
            const body = {
                gameId: this.gameID,
                userId: this.userId,
                playtime: dateTime,
                points: this.points,
                duration: this.duration,
                level: this.level,
            }


            return({
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': jwtBearer
                },
                data: body,
            })

        }


        // Safe exit

    }
})