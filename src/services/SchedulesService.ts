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
    const scheduleData = {
      ...schedule,
      timeStart: getTimeFromDate(schedule.timeStart as Date),
      timeEnd: getTimeFromDate(schedule.timeEnd as Date)
    }
    return API.post(`/schedules`, scheduleData);
  }

  static async update(id: number, schedule: ICreateSchedule): Promise<AxiosResponse<ISchedule>> {
    const scheduleData = {
      ...schedule,
      timeStart: getTimeFromDate(schedule.timeStart as Date),
      timeEnd: getTimeFromDate(schedule.timeEnd as Date)
    }
    return API.put(`/schedules/${id}`, scheduleData);
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