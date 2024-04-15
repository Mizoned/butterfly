import { API } from '@/shared/api';
import type { ICreateProduct, IProduct, ResponseDelete } from '@/shared/interfaces'
import { removeEmptyFields } from '@/shared/utils'
import type { AxiosResponse } from 'axios'

export default class CustomersService {
  static async getAll(): Promise<AxiosResponse<IProduct[]>> {
    return API.get('/products');
  }

  static async getOne(id: number): Promise<AxiosResponse<IProduct>> {
    return API.get(`/products/${id}`);
  }

  static async delete(id: number): Promise<AxiosResponse<ResponseDelete>> {
    return API.delete(`/products/${id}`);
  }

  static async create(product: ICreateProduct): Promise<AxiosResponse<IProduct>> {
    const customerData = removeEmptyFields(product);
    return API.post(`/products`, customerData);
  }

  static async update(product: IProduct): Promise<AxiosResponse<IProduct>> {
    const productData = removeEmptyFields(product);
    return API.put(`/products/${product.id}`, productData);
  }
}