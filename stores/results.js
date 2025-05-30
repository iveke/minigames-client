import {apiResponse} from "~/utils/ApiResponse.js";

export const useAuthService = () => {
  const {$axios} = useNuxtApp();


  async function GetGames() {
    try {
      const response = await $axios.get('/game', {requiresAuth: false});
      return apiResponse(response);
    } catch (error) {
      return apiResponse(error);
    }
  }





}