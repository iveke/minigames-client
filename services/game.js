import {apiResponse} from "~/utils/ApiResponse.js";

export const useGameService = () => {
  const {$axios} = useNuxtApp();



  async function getResults() {
    try {
      const response = await $axios.get('/result', {requiresAuth: false});
      return apiResponse(response);
    } catch (error) {
      return apiResponse(error);
    }
  }

  async function postResult(values) {
    try {
      const response = await $axios.post('/result', values);
      return apiResponse(response);
    } catch (error) {
      return apiResponse(error);
    }
  }

  return {
    postResult,
    getResults
  }
}