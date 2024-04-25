import { defineStore } from 'pinia';
import { computed, ref } from 'vue'
import { UserService } from '@/services/UserService';
import type { IUpdatePassword, IUpdateWorkspace, IUser } from '@/shared/interfaces';
import type { Ref } from 'vue';
import type { IUpdateProfile } from '@/shared/interfaces/users';

export const useUserStore = defineStore('User', () => {
  const user: Ref<IUser | null> = ref(null);
  const isLoadingMe = ref<boolean>(false);
  const isLoadingProfile = ref<boolean>(false);
  const isLoadingPassword = ref<boolean>(false);

  const setUser = (data: IUser) => {
    user.value = {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      fatherName: data.fatherName,
      mobilePhone: data.mobilePhone,
      email: data.email,
      settings: data.settings
    }
  }

  const fullName = computed(() => {
    if (!user.value?.lastName || !user.value?.firstName) return false;

    return user.value?.lastName + ' ' + user.value?.firstName;
  });

  const removeUser = () => {
    user.value = null;
  }

  const me = async () => {
    try {
      isLoadingMe.value = true;
      const { data: user } = await UserService.me();
      setUser(user);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      //TODO Убрать искуственную задаржку
      setTimeout(() => {
        isLoadingMe.value = false;
      }, 1000);
    }
  }

  const updateProfile = async (profileData: IUpdateProfile) => {
    try {
      isLoadingProfile.value = true;
      const { data: user } = await UserService.update(profileData);
      setUser(user);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      isLoadingProfile.value = false;
    }
  }

  const updatePassword = async (settings: IUpdatePassword) => {
    try {
      isLoadingPassword.value = true;
      const { data: user } = await UserService.updatePassword(settings);
      setUser(user);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      isLoadingPassword.value = false;
    }
  }

  const isLoadingWorkspace = ref<boolean>(false);

  const updateWorkspace = async (settings: IUpdateWorkspace) => {
    try {
      isLoadingWorkspace.value = true;
      const { data: user } = await UserService.updateWorkspace(settings);
      setUser(user);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      isLoadingWorkspace.value = false;
    }
  }

  return {
    me,
    setUser,
    removeUser,
    updateProfile,
    updatePassword,
    updateWorkspace,
    user,
    fullName,
    isLoadingMe,
    isLoadingProfile,
    isLoadingPassword,
    isLoadingWorkspace
  }
});