import { defineStore } from 'pinia';
import { ref } from 'vue';
import ProductsService from '@/services/ProductsService';
import type { ICreateProduct, IProduct } from '@/shared/interfaces';
import type { Ref } from 'vue';

export const useProductsStore = defineStore('ProductsStore', () => {
  const products = ref<IProduct[]>([]);
  const currentProduct = ref<IProduct | null>(null);
  const detailProduct = ref<IProduct | null>(null); //TODO в будущем будет другой тип. Добавить массив для хранения
  const deleteProductId: Ref<number | null> = ref(null);
  const editProduct: Ref<IProduct | null> = ref(null);
  const isOpenDeleteProductDialog = ref<boolean>(false);
  const isOpenCreateProductDialog = ref<boolean>(false);
  const isOpenEditProductDialog = ref<boolean>(false);
  const isOpenDetailProductDialog = ref<boolean>(false);
  const isLoading = ref<boolean>(false);
  const isLoadingDetail = ref<boolean>(false);

  const confirmDeleteProductDialog = (product: IProduct) => {
    deleteProductId.value = product.id;
    currentProduct.value = { ...product };
    isOpenDeleteProductDialog.value = true;
  };

  const openEditProductModal = (product: IProduct) => {
    editProduct.value = { ...product };
    isOpenEditProductDialog.value = true;
  };

  const openDetailProductModal = async (product: IProduct) => {
    isOpenDetailProductDialog.value = true;
    await getOneProduct(product.id);
  }

  const getOneProduct = async (id: number) => {
    try {
      isLoadingDetail.value = true;
      const response = await ProductsService.getOne(id);
      detailProduct.value = response.data;
    } catch (error) {
      console.error('Не удалось получить информацию об услуге', error);
      throw error;
    } finally {
      isLoadingDetail.value = false;
    }
  }

  const getAllProducts = async () => {
    try {
      isLoading.value = true;
      const response = await ProductsService.getAll();
      products.value = response.data;
    } catch (error) {
      console.error('Не удалось получить услуги', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  const createProduct = async (product: ICreateProduct) => {
    try {
      isLoading.value = true;
      const response = await ProductsService.create(product);
      const productData = response.data;
      products.value.push(productData);
      isOpenCreateProductDialog.value = false;
    } catch (error) {
      console.error('Не удалось создать услугу', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  const updateProduct = async () => {
    try {
      isLoading.value = true;
      const response = await ProductsService.update(editProduct.value as IProduct);
      const index = products.value.findIndex((c) => c.id === editProduct.value!.id);

      if (index !== -1) {
        products.value[index] = response.data;
      }

      isOpenEditProductDialog.value = false;
      editProduct.value = null;
    } catch (error) {
      console.error('Не удалось обновить данные услуги', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  const deleteProduct = async () => {
    try {
      isLoading.value = true;
      await ProductsService.delete(deleteProductId.value as number);
      products.value = products.value.filter((val) => val.id !== currentProduct.value!.id);
      isOpenDeleteProductDialog.value = false;
      deleteProductId.value = null;
    } catch (error) {
      console.error('Не удалось удалить услуги', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    confirmDeleteProductDialog,
    openEditProductModal,
    openDetailProductModal,
    products,
    isOpenDeleteProductDialog,
    isOpenCreateProductDialog,
    isOpenEditProductDialog,
    currentProduct,
    editProduct,
    isLoading
  }
});
