<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductsStore } from '@/stores/ProductsStore'
import DeleteProductModal from '@/components/modals/products/DeleteProductModal.vue';
import EditProductModal from '@/components/modals/products/EditProductModal.vue';
import CreateProductModal from '@/components/modals/products/CreateProductModal.vue';

const productsStore = useProductsStore();

onMounted(() => {
  productsStore.getAllProducts();
})
</script>

<template>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-4">
      <StatisticCard
        title="Всего услуг"
        number-title="5"
        icon="pi-star"
        icon-color="blue"
        icon-background="blue"
        number="3"
        number-description="новых в этом месяце"
      />
    </div>
    <div class="col-12 lg:col-6 xl:col-4">
      <StatisticCard
        title="Популярная услуга"
        number-title="Депиляция зоны рук"
        icon="pi-star-fill"
        icon-color="orange"
        icon-background="orange"
        number="12"
        number-description="раз заказывали"
      />
    </div>
    <div class="col-12 lg:col-12 xl:col-4">
      <StatisticCard
        title="Прибыльная услуга"
        number-title="Депиляция зоны ног"
        icon="pi-dollar"
        icon-color="cyan"
        icon-background="cyan"
        number="4877 ₽"
        number-description="в этом месяце"
      />
    </div>
    <div class="col-12 xl:col-12">
      <Card>
        <div class="flex gap-2 justify-content-between mb-3">
          <div class="text-xl font-medium">Список услуг</div>
          <Button @click="productsStore.isOpenCreateProductDialog = true" label="Создать" icon="pi pi-plus" />
        </div>
        <DataTable :value="productsStore.products" :rows="5" :paginator="true" responsiveLayout="scroll">
          <Column field="name" header="Название" :sortable="true" style="width: 25%" headerStyle="min-width:12rem;"></Column>
          <Column field="price" header="Стоимость" :sortable="true" style="width: 15%" headerStyle="min-width:10rem;">
            <template #body="slotProps">
              <Chip class="border-round">
                <span class="font-semibold">{{ (slotProps.data.price ?? 0) + ' ₽' }}</span>
              </Chip>
            </template>
          </Column>
          <Column field="lifeTime" header="Суммарная прибыль" :sortable="true" style="width: 15%" headerStyle="min-width:10rem;">
            <template #body="slotProps">
              <Chip class="border-round">
                <span class="font-semibold">{{ (slotProps.data.lifeTime ?? 0) + ' ₽' }}</span>
              </Chip>
            </template>
          </Column>
          <Column headerStyle="min-width:10rem;">
            <template #body="slotProps">
              <div class="flex align-items-center justify-content-end gap-2">
                <Button icon="pi pi-pencil" rounded @click="productsStore.openEditProductModal(slotProps.data)" />
                <Button icon="pi pi-trash" severity="danger" rounded @click="productsStore.confirmDeleteProductDialog(slotProps.data)" />
              </div>
            </template>
          </Column>
          <template #empty> Список услуг пуст. </template>
        </DataTable>
      </Card>
    </div>
  </div>
  <DeleteProductModal />
  <CreateProductModal />
  <EditProductModal />
</template>

<style scoped lang="scss"></style>