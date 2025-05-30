import {apiResponse} from "~/utils/ApiResponse.js";

export const useUserService = () => {
  const {$axios} = useNuxtApp();



  async function getUsers() {
    try {
      const response = await $axios.get('/user/list');
      return apiResponse(response);
    } catch (error) {
      return apiResponse(error);
    }
  }
  async function getUserById(id) {
    try {
      const response = await $axios.get(`/user/getInfo/${id}`);
      return apiResponse(response);
    } catch (error) {
      return apiResponse(error);
    }
  }
  async function deleteUser(id) {
    try {
      const response = await $axios.delete(`/user/delete/${id}`);
      return apiResponse(response);
    } catch (error) {
      return apiResponse(error);
    }
  }

  async function updateUser(values) {
    try {
      const response = await $axios.patch(`/user/update`, values);
      return apiResponse(response);
    } catch (error) {
      return apiResponse(error);
    }
  }


  return {
    getUsers,
    getUserById,
    deleteUser,
    updateUser
  }
}