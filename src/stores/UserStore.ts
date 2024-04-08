import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { IUser, JwtPayloadUser } from '@/shared/interfaces';

export const useUserStore = defineStore('User', () => {
  const user = ref<IUser | null>(null);

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

  return { setUser, removeUser, user }
});