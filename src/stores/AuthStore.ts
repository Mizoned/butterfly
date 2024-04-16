import { ref } from 'vue';
import { defineStore } from 'pinia';
import { jwtDecode } from "jwt-decode";
import { useUserStore } from '@/stores/UserStore';
import type { JwtPayloadUser } from '@/shared/interfaces';
import AuthService from '@/services/AuthService';


export const useAuthStore = defineStore('AuthStore', () => {
  const userStore = useUserStore();
  const accessToken = ref<string | null>(localStorage.getItem('accessToken') || null);
  const isLoading = ref<boolean>(false);

  const setAccessToken = (token: string) => {
    localStorage.setItem('accessToken', token);
    accessToken.value = token;
  }

  const removeAccessToken = () => {
    localStorage.removeItem('accessToken');
    accessToken.value = null;
  }

  const signIn = async (email: string, password: string) => {
    try {
      isLoading.value = true;
      const response = await AuthService.signIn(email, password);
      setAccessToken(response.data.accessToken);

      const jwtDecoded = jwtDecode<JwtPayloadUser>(response.data.accessToken);
      userStore.setUser(jwtDecoded);
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false;
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      const response = await AuthService.signUp(email, password);
      setAccessToken(response.data.accessToken);
      const jwtDecoded = jwtDecode<JwtPayloadUser>(response.data.accessToken);
      userStore.setUser(jwtDecoded);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const logout = async () => {
    try {
      removeAccessToken();
      userStore.removeUser();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return { signIn, signUp, logout, accessToken, isLoading }
})
