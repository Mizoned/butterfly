import { defineStore } from 'pinia';
import { ref } from 'vue';
import CustomersService from '@/services/CustomersService';
import type { ICreateCustomer, ICustomer } from '@/shared/interfaces';
import type { Ref } from 'vue';

export const useCustomersStore = defineStore('CustomersStore', () => {
  const customers = ref<ICustomer[]>([]);
  const currentCustomer = ref<ICustomer | null>(null);
  const detailCustomer = ref<ICustomer | null>(null); //TODO в будущем будет другой тип. Добавить массив для хранения
  const deleteCustomerId: Ref<number | null> = ref(null);
  const editCustomer: Ref<ICustomer | null> = ref(null);
  const isOpenDeleteCustomerDialog = ref<boolean>(false);
  const isOpenCreateCustomerDialog = ref<boolean>(false);
  const isOpenEditCustomerDialog = ref<boolean>(false);
  const isOpenDetailCustomerDialog = ref<boolean>(false);
  const isLoading = ref<boolean>(false);
  const isLoadingDetail = ref<boolean>(false);

  const confirmDeleteCustomerDialog = (customer: ICustomer) => {
    deleteCustomerId.value = customer.id;
    currentCustomer.value = { ...customer };
    isOpenDeleteCustomerDialog.value = true;
  };

  const openEditCustomerModal = (customer: ICustomer) => {
    editCustomer.value = { ...customer };
    isOpenEditCustomerDialog.value = true;
  };

  const openDetailCustomerModal = async (customer: ICustomer) => {
    isOpenDetailCustomerDialog.value = true;
    await getOneCustomer(customer.id);
  }

  const getOneCustomer = async (id: number) => {
    try {
      isLoadingDetail.value = true;
      const response = await CustomersService.getOne(id);
      detailCustomer.value = response.data as ICustomer;
    } catch (error) {
      console.error('Не удалось получить информацию о клиенте', error);
      throw error;
    } finally {
      isLoadingDetail.value = false;
    }
  }

  const getAllCustomers = async () => {
    try {
      isLoading.value = true;
      const response = await CustomersService.getAll();
      customers.value = response.data;
    } catch (error) {
      console.error('Не удалось получить клиентов', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  const createCustomer = async (customer: ICreateCustomer) => {
    try {
      isLoading.value = true;
      const response = await CustomersService.create(customer);
      const customerData = response.data;
      customers.value.push(customerData);
      isOpenCreateCustomerDialog.value = false;
    } catch (error) {
      console.error('Не удалось создать клиента', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  const updateCustomer = async () => {
    try {
      isLoading.value = true;
      const response = await CustomersService.update(editCustomer.value);
      const index = customers.value.findIndex((c) => c.id === editCustomer.value.id);

      if (index !== -1) {
        customers.value[index] = response.data;
      }

      isOpenEditCustomerDialog.value = false;
      editCustomer.value = null
    } catch (error) {
      console.error('Не удалось обновить данные клиента', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  const deleteCustomer = async () => {
    try {
      isLoading.value = true;
      const response = await CustomersService.delete(deleteCustomerId.value);
      customers.value = customers.value.filter((val) => val.id !== currentCustomer.value.id);
      isOpenDeleteCustomerDialog.value = false;
      deleteCustomerId.value = null;
    } catch (error) {
      console.error('Не удалось удалить клиента', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    getAllCustomers,
    createCustomer,
    deleteCustomer,
    updateCustomer,
    confirmDeleteCustomerDialog,
    openEditCustomerModal,
    openDetailCustomerModal,
    customers,
    isOpenDeleteCustomerDialog,
    isOpenCreateCustomerDialog,
    isOpenEditCustomerDialog,
    currentCustomer,
    editCustomer,
    isLoading
  }
});
