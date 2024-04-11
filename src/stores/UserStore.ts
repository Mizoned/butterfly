import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { IUser, JwtPayloadUser } from '@/shared/interfaces';
import { jwtDecode } from 'jwt-decode';
import type { Ref } from 'vue';

export const useUserStore = defineStore('User', () => {
  const user: Ref<IUser | null> = ref(null);

  const setUser = (data: JwtPayloadUser) => {
    user.value = {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      fatherName: data.fatherName,
      mobilePhone: data.mobilePhone,
      email: data.email
    }
  }

  const removeUser = () => {
    user.value = null;
  }

  const token: string = localStorage.getItem('accessToken');

  if (token) {
    const jwtDecoded = jwtDecode<JwtPayloadUser>(token);

    setUser(jwtDecoded);
  }


  return { setUser, removeUser, user }
});