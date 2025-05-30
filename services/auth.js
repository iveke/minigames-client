import {apiResponse} from "~/utils/ApiResponse.js";

export const useAuthService = () => {
    const {$axios} = useNuxtApp();

    async function login(values) {
        if (!values || Object.keys(values).length !== 2) {
            throw new Error('Invalid values');
        }

        try {
            const response = await $axios.post('/auth/login', values, {requiresAuth: false})
            return apiResponse(response)
        } catch (error) {
            return apiResponse(error)
        }
    }

    async function register(values) {
        if (!values || Object.keys(values).length !== 3) {
            throw new Error('Invalid values');
        }

        try {
            const response = await $axios.post('/auth/register', values, {requiresAuth: false})
            return apiResponse(response)
        } catch (error) {
            console.log(error)
            return apiResponse(error)
        }
    }

    async function confirmEmail(values) {
        if (!values || Object.keys(values).length !== 1) {
            throw new Error('Invalid values');
        }

        try {
            const response = await $axios.post(`/user/confirmEmail/${values.code}`)
            return apiResponse(response)
        } catch (error) {
            return apiResponse(error)
        }
    }

    async function requestCode() {
        try {
            const response = await $axios.post('/auth/generateConfirmEmailCode')
            return apiResponse(response)
        } catch (error) {
            return apiResponse(error)
        }
    }

    return {
        login,
        register,
        confirmEmail,
        requestCode
    }
}