import { API } from '@/shared/api';
import type { AxiosResponse } from 'axios';
import type { IUpdatePassword, IUser, IUpdateProfile, IUpdateWorkspace } from '@/shared/interfaces';
import { getTimeFromDate } from '@/shared/utils';

export class UserService {
  static async me(): Promise<AxiosResponse<IUser>> {
    return API.get('/user/profile/me');
  }

  static async update(userData: IUpdateProfile): Promise<AxiosResponse<IUser>> {
    return API.put('/user/profile', userData);
  }

  static async updatePassword(passwordsData: IUpdatePassword): Promise<AxiosResponse<IUser>> {
    return API.put('/user/profile/password', passwordsData);
  }

  static async updateWorkspace(times: IUpdateWorkspace): Promise<AxiosResponse<IUser>> {
    const data = {
      workdayStartTime: getTimeFromDate(times.workdayStartTime),
      workdayEndTime: getTimeFromDate(times.workdayEndTime)
    }
    return API.put('/user/profile/workspace', data);
  }

  static async updateAvatar(data: FormData): Promise<AxiosResponse<IUser>> {
    return API.post('/user/profile/avatar', data);
  }

  static async removeAvatar(): Promise<AxiosResponse<IUser>> {
    return API.delete('/user/profile/avatar');
  }
}