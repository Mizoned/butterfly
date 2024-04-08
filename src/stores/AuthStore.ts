import { ref } from 'vue';
import { defineStore } from 'pinia';
import { jwtDecode } from "jwt-decode";
import { useUserStore } from '@/stores/UserStore';
import type { JwtPayloadUser } from '@/shared/interfaces';
import AuthService from '@/services/AuthService';


export const useAuthStore = defineStore('Auth', () => {
  const userStore = useUserStore();
  const accessToken = ref<string | null>(localStorage.getItem('accessToken') || null);

  const setAccessToken = (token: string) => {
    localStorage.setItem('accessToken', token);
    accessToken.value = token;
  }

  const removeAccessToken = () => {
    localStorage.removeItem('accessToken');
    accessToken.value = null;
  }

  const signIn = async (email: string, password: string) => {
    return AuthService.signIn(email, password)
      .then((response) => {
        setAccessToken(response.data.accessToken);

        const jwtDecoded = jwtDecode<JwtPayloadUser>(response.data.accessToken);
        userStore.setUser(jwtDecoded);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  const signUp = async (email: string, password: string) => {
    return AuthService.signUp(email, password)
      .then((response) => {
        setAccessToken(response.data.accessToken);

        const jwtDecoded = jwtDecode<JwtPayloadUser>(response.data.accessToken);
        userStore.setUser(jwtDecoded);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  const logout = async () => {
    return AuthService.logout()
      .then(() => {
        removeAccessToken();
        userStore.removeUser();
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  return { signIn, signUp, logout, accessToken }
})
