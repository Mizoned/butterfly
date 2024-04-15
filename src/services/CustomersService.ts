import { API } from '@/shared/api';
import type { ICreateCustomer, ICustomer } from '@/shared/interfaces'
import { normalizePhoneNumber, removeEmptyFields } from '@/shared/utils'

export default class CustomersService {
  static async getAll() {
    return API.get('/customers');
  }

  static async getOne(id: number) {
    return API.get(`/customers/${id}`);
  }

  static async delete(id: number) {
    return API.delete(`/customers/${id}`);
  }

  static async create(customer: ICreateCustomer) {
    const customerData: ICreateCustomer = removeEmptyFields(customer);
    customerData.mobilePhone = normalizePhoneNumber(customerData.mobilePhone);
    return API.post(`/customers`, customerData);
  }

  static async update(customerId: number, customer: ICreateCustomer) {
    const customerData: ICreateCustomer = removeEmptyFields(customer);
    customerData.mobilePhone = normalizePhoneNumber(customerData.mobilePhone);
    return API.put(`/customers/${customerId}`, customerData);
  }
}