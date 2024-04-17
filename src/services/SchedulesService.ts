import { API } from '@/shared/api';
import type { ICreateSchedule, ISchedule, ResponseDelete } from '@/shared/interfaces';
import type { AxiosResponse } from 'axios';
import { formatDate, getTimeFromDate } from '@/shared/utils'

export default class SchedulesService {
  static async getAll(): Promise<AxiosResponse<ISchedule[]>> {
    return API.get('/schedules');
  }

  static async getOne(id: number): Promise<AxiosResponse<ISchedule>> {
    return API.get(`/schedules/${id}`);
  }

  static async delete(id: number): Promise<AxiosResponse<ResponseDelete>> {
    return API.delete(`/schedules/${id}`);
  }

  static async create(schedule: ICreateSchedule): Promise<AxiosResponse<ISchedule>> {
    schedule.timeStart = getTimeFromDate(schedule.timeStart);
    schedule.timeEnd = getTimeFromDate(schedule.timeEnd);
    return API.post(`/schedules`, schedule);
  }

  static async update(schedule: ISchedule): Promise<AxiosResponse<ISchedule>> {
    return API.put(`/schedules/${schedule.id}`, schedule);
  }

  static async getFreeTimeSlots(date: Date): Promise<AxiosResponse<Array<string>>> {
    const formatedDate = formatDate(date, 'yy-mm-dd');
    return API.get(`/schedules/slots/free/${formatedDate}`);
  }
}