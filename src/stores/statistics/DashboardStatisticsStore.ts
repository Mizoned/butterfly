import { defineStore } from 'pinia';
import { ref } from 'vue';
import DashboardService from '@/services/DashboardService';
import type {
  IProfitableProduct,
  ISchedule,
  ITotalCustomers,
  ITotalRevenue,
  ITotalSchedules
} from '@shared/interfaces';
import type { IDailyRevenue, ITotalSchedulesByStatuses } from '@shared/interfaces/dashboard';

export const useDashboardStatisticsStore = defineStore('DashboardStatisticsStore', () => {
  const isLoading = ref<boolean>();

  const totalSchedules = ref<ITotalSchedules>({
    newTotalCount: 0,
    totalCount: 0
  });

  const totalRevenue = ref<ITotalRevenue>({
    newTotalRevenue: 0,
    totalRevenue: 0
  });

  const totalCustomers = ref<ITotalCustomers>({
    newTotalCount: 0,
    totalCount: 0
  });

  const profitableProducts = ref<IProfitableProduct[]>([]);

  const todaySchedules = ref<ISchedule[]>([]);

  const dailyRevenue = ref<IDailyRevenue[]>([]);

  const totalSchedulesByStatuses = ref<ITotalSchedulesByStatuses>({
    successCount: 0,
    processedCount: 0,
    canceledCount: 0
  });

  const getStatistics = async () => {
    try {
      isLoading.value = true;
      const { data } = await DashboardService.getOverviewStatistics();
      totalSchedules.value = data.totalSchedules;
      totalRevenue.value = data.totalRevenue;
      totalCustomers.value = data.totalCustomers;
      profitableProducts.value = data.profitableProducts.products;
      todaySchedules.value = data.todaySchedules;
      dailyRevenue.value = data.dailyRevenue;
      totalSchedulesByStatuses.value = data.totalSchedulesByStatuses;
    } catch (error) {
      console.error('Не удалось получить статистику', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    getStatistics,
    isLoading,
    totalSchedules,
    totalRevenue,
    totalCustomers,
    profitableProducts,
    todaySchedules,
    dailyRevenue,
    totalSchedulesByStatuses
  }
});
