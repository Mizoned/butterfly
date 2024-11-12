<script setup lang="ts">
  import { useToast } from 'primevue/usetoast';
  import { useProductsStore } from '@/stores/ProductsStore'
  import { AxiosError } from 'axios';
  import { useProductsStatisticsStore } from '@stores/statistics/ProductsStatisticsStore';

  const productsStore = useProductsStore();
  const productsStatisticsStore = useProductsStatisticsStore();
  const toast = useToast();

  const submitHandler = async () => {
    await productsStore.deleteProduct()
      .then(async () => {
        toast.add({ severity: 'success', summary: 'Успешно', detail: 'Услуга удалена', life: 3000 });
        await productsStatisticsStore.getSummaryStatistics();
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          const message = error.response?.data.message;
          toast.add({ severity: 'error', summary: 'Произошла ошибка', detail: message, life: 3000 });
        }
      });
  }
</script>

<template>
  <Dialog v-model:visible="productsStore.isOpenDeleteProductDialog" :style="{ width: '450px' }" header="Подтверждение" :modal="true">
    <div class="flex align-items-center">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="productsStore.currentProduct">
        Вы уверены, что хотите удалить <b>{{ productsStore.currentProduct.name }}</b>?
      </span>
    </div>
    <template #footer>
      <Button
        @click="productsStore.isOpenDeleteProductDialog = false"
        label="Нет"
        icon="pi pi-times text-red"
        text
      />
      <Button
        @click="submitHandler"
        label="Да"
        icon="pi pi-check"
        text
        severity="danger"
        :loading="productsStore.isLoading"
      />
    </template>
  </Dialog>
</template>

<style scoped lang="scss">

</style>