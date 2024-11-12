import { API } from '@/shared/api';
import type { AxiosResponse } from 'axios'
import type { IDashboardStatistics } from '@shared/interfaces/dashboard';

export default class DashboardService {
  static async getOverviewStatistics(): Promise<AxiosResponse<IDashboardStatistics>> {
    return API.get('/statistics/overview');
  }
}