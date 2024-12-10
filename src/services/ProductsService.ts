import { API } from '@/shared/api';
import type {
  ICreateProduct,
  IProduct,
  IProductOverviewStatistics,
  IProductSummaryStatistics,
  ResponseDelete
} from '@/shared/interfaces';
import { removeEmptyFields } from '@/shared/utils'
import type { AxiosResponse } from 'axios'

export default class ProductsService {
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
    const productData = removeEmptyFields(product);
    return API.post(`/products`, productData);
  }

  static async update(product: IProduct): Promise<AxiosResponse<IProduct>> {
    const productData = removeEmptyFields(product);
    return API.put(`/products/${product.id}`, productData);
  }

  static async getSummaryStatistics(): Promise<AxiosResponse<IProductSummaryStatistics>> {
    return API.get('/statistics/products/summary');
  }

  static async getOverviewStatistics(): Promise<AxiosResponse<IProductOverviewStatistics>> {
    return API.get('/statistics/products/overview');
  }
}
