import type {
  IProfitableProduct,
  ISchedule,
  ITotalCustomers,
  ITotalRevenue,
  ITotalSchedules
} from '@shared/interfaces';

interface IDailyRevenue {
  day: number;
  revenue: number;
}

interface ITotalSchedulesByStatuses {
  successCount: number;
  processedCount: number;
  canceledCount: number;
}

interface IDashboardStatistics {
  totalSchedules: ITotalSchedules;
  totalRevenue: ITotalRevenue;
  totalCustomers: ITotalCustomers;
  profitableProducts: {
    products: IProfitableProduct[],
    totalRevenue: number;
  },
  todaySchedules: ISchedule[];
  dailyRevenue: IDailyRevenue[];
  totalSchedulesByStatuses: ITotalSchedulesByStatuses;
}

export type {
  IDailyRevenue,
  ITotalSchedulesByStatuses,
  IDashboardStatistics
}