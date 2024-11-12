import { API } from '@/shared/api';
import type {
  ICreateCustomer,
  ICustomer,
  ICustomerOverviewStatistics,
  ICustomerSummaryStatistics,
  ResponseDelete
} from '@/shared/interfaces';
import { normalizePhoneNumber, removeEmptyFields } from '@/shared/utils'
import type { AxiosResponse } from 'axios'

export default class CustomersService {
  static async getAll(): Promise<AxiosResponse<ICustomer[]>> {
    return API.get('/customers');
  }

  static async getOne(id: number): Promise<AxiosResponse<ICustomer>> {
    return API.get(`/customers/${id}`);
  }

  static async delete(id: number): Promise<AxiosResponse<ResponseDelete>> {
    return API.delete(`/customers/${id}`);
  }

  static async create(customer: ICreateCustomer): Promise<AxiosResponse<ICustomer>> {
    const customerData = removeEmptyFields(customer);

    if (customerData?.mobilePhone) {
      customerData['mobilePhone'] = normalizePhoneNumber(customerData?.mobilePhone);
    }
    
    return API.post(`/customers`, customerData);
  }

  static async update(customer: ICustomer): Promise<AxiosResponse<ICustomer>> {
    const customerData = removeEmptyFields(customer);

    if (customerData?.mobilePhone) {
      customerData['mobilePhone'] = normalizePhoneNumber(customerData?.mobilePhone);
    }
    
    return API.put(`/customers/${customer.id}`, customerData);
  }

  //TODO при FSD вынести
  static async getSummaryStatistics(): Promise<AxiosResponse<ICustomerSummaryStatistics>> {
    return API.get('/statistics/customers/summary');
  }

  static async getOverviewStatistics(): Promise<AxiosResponse<ICustomerOverviewStatistics>> {
    return API.get('/statistics/customers/overview');
  }
}