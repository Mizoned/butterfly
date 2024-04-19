import { API } from '@/shared/api';
import type { ICreateSchedule, ISchedule, ResponseDelete } from '@/shared/interfaces';
import type { AxiosResponse } from 'axios';
import { formatDate, getTimeFromDate } from '@/shared/utils'

export default class SchedulesService {
  static async getAll(): Promise<AxiosResponse<ISchedule[]>> {
    return API.get('/schedules');
  }

  static async getAllCompleted(): Promise<AxiosResponse<ISchedule[]>> {
    return API.get('/schedules/completed');
  }

  static async getAllCanceled(): Promise<AxiosResponse<ISchedule[]>> {
    return API.get('/schedules/canceled');
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

  static async update(id: number, schedule: ICreateSchedule): Promise<AxiosResponse<ISchedule>> {
    schedule.timeStart = getTimeFromDate(schedule.timeStart);
    schedule.timeEnd = getTimeFromDate(schedule.timeEnd);
    return API.put(`/schedules/${id}`, schedule);
  }

  static async complete(id: number) {
    return API.put(`/schedules/complete/${id}`);
  }

  static async cancel(id: number) {
    return API.put(`/schedules/cancel/${id}`);
  }

  static async getFreeTimeSlots(date: Date): Promise<AxiosResponse<Array<string>>> {
    const formatedDate = formatDate(date, 'yy-mm-dd');
    return API.get(`/schedules/slots/free/${formatedDate}`);
  }
}