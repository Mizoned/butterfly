import { defineStore } from 'pinia';
import { ref } from 'vue';
import CustomersService from '@/services/CustomersService';
import type {
  IActiveCustomer,
  IUntrustedCustomers,
  IProfitableCustomer,
  ITotalCustomers,
  ITotalVisits
} from '@shared/interfaces';

export const useCustomersStatisticStore = defineStore('CustomersStatisticsStore', () => {
  const isLoading = ref<boolean>(false);

  const totalCustomers = ref<ITotalCustomers>({
    newTotalCount: 0,
    totalCount: 0
  });

  const activeCustomer = ref<IActiveCustomer | null>(null);

  const totalVisits = ref<ITotalVisits>({
    newTotalCount: 0,
    totalCount: 0
  });

  const profitableCustomers = ref<IProfitableCustomer[]>([]);

  const untrustedCustomers = ref<IUntrustedCustomers[]>([]);

  const getSummaryStatistics = async () => {
    try {
      isLoading.value = true;
      const { data } = await CustomersService.getSummaryStatistics();
      totalCustomers.value = data.totalCustomers;
      activeCustomer.value = data.activeCustomer;
      totalVisits.value = data.totalVisits;
    } catch (e) {
      console.error('Не удалось получить статистику', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  const getOverviewStatistics = async () => {
    try {
      isLoading.value = true;
      const { data } = await CustomersService.getOverviewStatistics();
      totalCustomers.value = data.totalCustomers;
      activeCustomer.value = data.activeCustomer;
      totalVisits.value = data.totalVisits;
      profitableCustomers.value = data.profitableCustomers.customers;
      untrustedCustomers.value = data.untrustedCustomers;
    } catch (e) {
      console.error('Не удалось получить статистику', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    getSummaryStatistics,
    getOverviewStatistics,
    isLoading,
    totalCustomers,
    activeCustomer,
    totalVisits,
    profitableCustomers,
    untrustedCustomers
  }
});