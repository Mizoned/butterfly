import type { ICustomer, IProduct } from '@/shared/interfaces'

interface ICreateSchedule {
  date: Date | null;
  timeStart: Date | null;
  timeEnd: Date | null;
  customerId: number | null;
  products: Array<{ id: number; quantity: number }> | [];
}

interface ISchedule {
  id: number;
  date: string;
  timeStart: string;
  timeEnd: string;
  userId: number;
  customerId: number;
  createdAt: string;
  updatedAt: string;
  customer: ICustomer;
  products: IProduct[];
}

interface ITotalScheduleProcessed {
  completedTotalCount: number;
  totalCount: number;
}

interface ITotalSchedules {
  newTotalCount: number;
  totalCount: number;
}

interface ITotalRevenue {
  newTotalRevenue: number;
  totalRevenue: number;
}

interface IAvgBillSchedules {
  newTotalAvg: number;
  totalAvg: number;
}

interface IPercentCanceledSchedules {
  allTime: number;
  currentMonth: number;
}

interface ILostRevenueSchedules {
  newTotalLostRevenue: number;
  totalLostRevenue: number;
}

interface ISchedulesProcessedStatistics {
  nearestSchedule: ISchedule | null;
  totalCountToday: ITotalScheduleProcessed;
  totalCountWeek: ITotalScheduleProcessed;
}

interface IScheduleSuccessStatistics {
  totalSchedules: ITotalSchedules;
  totalRevenue: ITotalRevenue;
  avgBill: IAvgBillSchedules;
}

interface ISchedulesCanceledStatistics {
  totalSchedules: ITotalSchedules;
  percentCanceledSchedules: IPercentCanceledSchedules;
  lostRevenue: ILostRevenueSchedules;
}

export type {
  ICreateSchedule,
  ISchedule,
  ITotalScheduleProcessed,
  ITotalSchedules,
  ITotalRevenue,
  IAvgBillSchedules,
  IPercentCanceledSchedules,
  ILostRevenueSchedules,
  ISchedulesProcessedStatistics,
  IScheduleSuccessStatistics,
  ISchedulesCanceledStatistics
}