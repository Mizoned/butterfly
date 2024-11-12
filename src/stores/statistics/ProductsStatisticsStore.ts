import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { IProductPerformance, ITotalProducts, IProfitableProduct, IPerDay } from '@shared/interfaces/products';
import ProductsService from '@/services/ProductsService';

export const useProductsStatisticsStore = defineStore('ProductsStatisticsStore', () => {
  const isLoading = ref<boolean>(false);

  const totalProducts = ref<ITotalProducts>({
    newTotalCount: 0,
    totalCount: 0
  });

  const popularProduct = ref<IProductPerformance>({
    name: '',
    income: 0,
    count: 0
  });

  const profitableProduct = ref<IProductPerformance>({
    name: '',
    income: 0,
    count: 0
  });

  const servicesCountPerDay = ref<IPerDay[]>([]);

  const profitableProducts = ref<IProfitableProduct[]>([]);

  const getSummaryStatistics = async () => {
    try {
      isLoading.value = true;
      const { data } = await ProductsService.getSummaryStatistics();

      totalProducts.value = data.totalProducts;
      popularProduct.value = data.popularProduct;
      profitableProduct.value = data.profitableProduct;
    } catch (e) {
      console.error('Не удалось получить статистику', error);
      throw error;
    } finally {
      isLoading.value = false;
    }

  }

  const getOverviewStatistics = async () => {
    try {
      isLoading.value = true;

      const { data } = await ProductsService.getOverviewStatistics();

      totalProducts.value = data.totalProducts;
      popularProduct.value = data.popularProduct;
      profitableProduct.value = data.profitableProduct;
      profitableProducts.value = data.profitableProducts.products;
      servicesCountPerDay.value = data.servicesCountPerDay;
    } catch (e) {
      console.error('Не удалось получить статистику', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    getSummaryStatistics,
    getOverviewStatistics,
    isLoading,
    totalProducts,
    popularProduct,
    profitableProduct,
    profitableProducts,
    servicesCountPerDay
  }
});