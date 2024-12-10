import { defineStore } from 'pinia';
import { ref } from 'vue';
import type {
  IAvgBillSchedules,
  ILostRevenueSchedules,
  IPercentCanceledSchedules,
  ISchedule,
  ITotalRevenue,
  ITotalSchedules,
  ITotalScheduleProcessed
} from '@shared/interfaces';
import SchedulesService from '@/services/SchedulesService';

export const useScheduleStatisticsStore = defineStore('ScheduleStatisticsStore', () => {
  const isLoading = ref<boolean>(false);

  //PROCESSED
  const nearestSchedule = ref<ISchedule | null>(null);
  const totalCountToday = ref<ITotalScheduleProcessed>({
    completedTotalCount: 0,
    totalCount: 0
  });
  const totalCountWeek = ref<ITotalScheduleProcessed>({
    completedTotalCount: 0,
    totalCount: 0
  });

  //SUCCESS
  const totalSuccessSchedules = ref<ITotalSchedules>({
    newTotalCount: 0,
    totalCount: 0
  });
  const totalRevenue = ref<ITotalRevenue>({
    newTotalRevenue: 0,
    totalRevenue: 0
  });
  const avgBill = ref<IAvgBillSchedules>({
    newTotalAvg: 0,
    totalAvg: 0
  });

  //CANCELED
  const totalCanceledSchedules = ref<ITotalSchedules>({
    newTotalCount: 0,
    totalCount: 0
  });
  const percentCanceledSchedules = ref<IPercentCanceledSchedules>({
    allTime: 0,
    currentMonth: 0
  });
  const lostRevenue = ref<ILostRevenueSchedules>({
    newTotalLostRevenue: 0,
    totalLostRevenue: 0
  });

  const getProcessedStatistics = async () => {
    try {
      isLoading.value = true;
      const { data } = await SchedulesService.getProcessedStatistics();

      nearestSchedule.value = data.nearestSchedule;
      totalCountToday.value = data.totalCountToday;
      totalCountWeek.value = data.totalCountWeek;
    } catch (error) {
      console.error('Не удалось получить статистику', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  const getSuccessStatistics = async () => {
    try {
      isLoading.value = true;
      const { data } = await SchedulesService.getSuccessStatistics();

      totalSuccessSchedules.value = data.totalSchedules;
      totalRevenue.value = data.totalRevenue;
      avgBill.value = data.avgBill;
    } catch (error) {
      console.error('Не удалось получить статистику', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  const getCanceledStatistics = async () => {
    try {
      isLoading.value = true;
      const { data } = await SchedulesService.getCanceledStatistics();

      percentCanceledSchedules.value = data.percentCanceledSchedules;
      totalCanceledSchedules.value = data.totalSchedules;
      lostRevenue.value = data.lostRevenue;
    } catch (error) {
      console.error('Не удалось получить статистику', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    getProcessedStatistics,
    getSuccessStatistics,
    getCanceledStatistics,
    isLoading,
    nearestSchedule,
    totalCountToday,
    totalCountWeek,
    totalSuccessSchedules,
    totalRevenue,
    avgBill,
    totalCanceledSchedules,
    percentCanceledSchedules,
    lostRevenue
  }
});
