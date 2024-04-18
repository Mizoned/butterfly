import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { ICreateSchedule, ICustomer, IProduct, ISchedule } from '@/shared/interfaces'
import SchedulesService from '@/services/SchedulesService';
import CustomersService from '@/services/CustomersService';
import ProductsService from '@/services/ProductsService'

export const useScheduleStore = defineStore('ScheduleStore', () => {
  const schedules = ref<ISchedule[]>([]);
  const customers = ref<ICustomer[]>([]);
  const products = ref<IProduct[]>([]);
  const freeTimeSlots = ref<Array<string>>([]);
  const currentSchedule = ref<ISchedule | null>(null);
  const editSchedule = ref<ISchedule | null>(null);
  const isOpenCancelScheduleDialog = ref<boolean>(false);
  const isOpenAcceptScheduleDialog = ref<boolean>(false);
  const isOpenCreateScheduleDialog = ref<boolean>(false);
  const isOpenEditScheduleDialog = ref<boolean>(false);
  const isLoading = ref<boolean>(false);
  const isLoadingCustomers = ref<boolean>(false);
  const isLoadingProducts = ref<boolean>(false);
  const isLoadingSlots = ref<boolean>(false);

  const confirmCancelScheduleDialog = (schedule: ISchedule) => {
    currentSchedule.value = { ...schedule };
    isOpenCancelScheduleDialog.value = true;
  };

  const confirmAcceptScheduleDialog = (schedule: ISchedule) => {
    currentSchedule.value = { ...schedule };
    isOpenAcceptScheduleDialog.value = true;
  }

  const openEditScheduleModal = (schedule: ISchedule) => {
    editSchedule.value = { ...schedule };
    isOpenEditScheduleDialog.value = true;
  };

  const getAllCustomers = async () => {
    try {
      isLoadingCustomers.value = true;
      const response = await CustomersService.getAll();
      customers.value = response.data;
    } catch (error) {
      console.error('Не удалось получить клиентов', error);
      throw error;
    } finally {
      isLoadingCustomers.value = false;
    }
  }

  const getAllSchedules = async () => {
    try {
      isLoadingCustomers.value = true;
      const response = await SchedulesService.getAll();
      schedules.value = response.data;
    } catch (error) {
      console.error('Не удалось получить записи', error);
      throw error;
    } finally {
      isLoadingCustomers.value = false;
    }
  }

  const getFreeTimeSlots = async (date: Date) => {
    try {
      isLoadingSlots.value = true;
      const response = await SchedulesService.getFreeTimeSlots(date);
      freeTimeSlots.value = response.data;
    } catch (error) {
      console.error('Не удалось получить свободные слоты', error);
      throw error;
    } finally {
      isLoadingSlots.value = false;
    }
  }

  const getAllProducts = async () => {
    try {
      isLoadingProducts.value = true;
      const response = await ProductsService.getAll();
      products.value = response.data;
    } catch (error) {
      console.error('Не удалось получить продукты', error);
      throw error;
    } finally {
      isLoadingProducts.value = false;
    }
  }

  const createSchedule = async (schedule: ICreateSchedule) => {
    try {
      isLoading.value = true;
      const response = await SchedulesService.create(schedule);

      const productData = response.data;
      schedules.value.push(productData);
      isOpenCreateScheduleDialog.value = false;
    } catch (error) {
      console.error('Не удалось создать запись', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  const updateSchedule = async (schedule: ICreateSchedule) => {
    try {
      isLoading.value = true;
      const response = await SchedulesService.update(editSchedule.value.id, schedule);
      const index = schedules.value.findIndex((c) => c.id === editSchedule.value.id);

      if (index !== -1) {
        schedules.value[index] = response.data;
      }

      isOpenEditScheduleDialog.value = false;
      editSchedule.value = null;
    } catch (error) {
      console.error('Не удалось обновить данные записи', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  const acceptSchedule = async () => {
    try {
      isLoading.value = true;
      const response = await SchedulesService.accept(currentSchedule.value.id);
      schedules.value = [...schedules.value].filter((s) => s.id !== currentSchedule.value.id);
      isOpenAcceptScheduleDialog.value = false;
      currentSchedule.value = null;
    } catch (error) {
      console.error(error)
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  const cancelSchedule = async () => {
    try {
      isLoading.value = true;
      const response = await SchedulesService.cancel(currentSchedule.value.id);
      schedules.value = [...schedules.value].filter((val) => val.id !== currentSchedule.value.id);
      isOpenCancelScheduleDialog.value = false;
      currentSchedule.value = null;
    } catch (error) {
      console.error('Не удалось отменить запись', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    getAllSchedules,
    createSchedule,
    updateSchedule,
    cancelSchedule,
    acceptSchedule,
    confirmCancelScheduleDialog,
    confirmAcceptScheduleDialog,
    openEditScheduleModal,
    getAllCustomers,
    getAllProducts,
    getFreeTimeSlots,
    schedules,
    customers,
    products,
    freeTimeSlots,
    isOpenCancelScheduleDialog,
    isOpenAcceptScheduleDialog,
    isOpenCreateScheduleDialog,
    isOpenEditScheduleDialog,
    currentSchedule,
    editSchedule,
    isLoading,
    isLoadingCustomers,
    isLoadingProducts,
    isLoadingSlots
  }
})
