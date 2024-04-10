<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast'

const product = ref({});
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const submitted = ref(false);
const toast = useToast();

const confirmDeleteCustomer = (editProduct) => {
  product.value = editProduct;
  deleteProductDialog.value = true;
};

const deleteCustomer = () => {
  products.value = products.value.filter((val) => val.id !== product.value.id);
  deleteProductDialog.value = false;
  product.value = {};
  toast.add({ severity: 'success', summary: 'Успешно', detail: 'Услуга удалена', life: 3000 });
};

const editCustomer = (editProduct) => {
  product.value = { ...editProduct };
  productDialog.value = true;
};

const openNew = () => {
  product.value = {};
  submitted.value = false;
  productDialog.value = true;
};

const hideDialog = () => {
  productDialog.value = false;
  submitted.value = false;
};

const saveProduct = () => {
  submitted.value = true;
  if (product.value.name && product.value.name.trim()) {
    if (product.value.id) {
      products.value[findIndexById(product.value.id)] = product.value;
      toast.add({ severity: 'success', summary: 'Успешно', detail: 'Услуга обновлена', life: 3000 });
    } else {
      product.value.id = createId();
      products.value.push(product.value);
      toast.add({ severity: 'success', summary: 'Успешно', detail: 'Услуга создана', life: 3000 });
    }
    productDialog.value = false;
    product.value = {};
  }
};

const createId = () => {
  let id = '';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 5; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};

const findIndexById = (id) => {
  let index = -1;
  for (let i = 0; i < products.value.length; i++) {
    if (products.value[i].id === id) {
      index = i;
      break;
    }
  }
  return index;
};

const products = ref([
  {
    id: 1,
    name: 'Депиляция зоны рук',
    price: 399,
    lifeTime: 1456
  },
  {
    id: 2,
    name: 'Депиляция зоны ног',
    price: 899,
    lifeTime: 3956
  },
  {
    id: 3,
    name: 'Депиляция зоны лица',
    price: 499,
    lifeTime: 2356
  },
  {
    id: 4,
    name: 'Депиляция зоны бикини',
    price: 1399,
    lifeTime: 1656
  },
  {
    id: 5,
    name: 'Депиляция зоны подмышек',
    price: 699,
    lifeTime: 2656
  }
]);
</script>

<template>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-4">
      <StatisticCard
        title="Всего услуг"
        number-title="5"
        icon="pi-user"
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
        icon="pi-star"
        icon-color="orange"
        icon-background="orange"
        number="12"
        number-description="раз заказывали"
      />
    </div>
    <div class="col-12 lg:col-6 xl:col-4">
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
          <Button @click="openNew" label="Создать" icon="pi pi-plus" />
        </div>
        <DataTable :value="products" :rows="5" :paginator="true" responsiveLayout="scroll">
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
                <Button icon="pi pi-pencil" rounded @click="editCustomer(slotProps.data)" />
                <Button icon="pi pi-trash" severity="danger" rounded @click="confirmDeleteCustomer(slotProps.data)" />
              </div>
            </template>
          </Column>
        </DataTable>
      </Card>
    </div>
  </div>

  <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Подтвержение" :modal="true">
    <div class="flex align-items-center">
      <i class="pi pi-exclamation-triangle p-error mr-3" style="font-size: 2rem" />
      <span v-if="product">
        Вы уверены, что хотите удалить <b>{{ product.name }}</b>?
      </span>
    </div>
    <template #footer>
      <Button label="Нет" icon="pi pi-times text-red" text @click="deleteProductDialog = false" />
      <Button label="Да" icon="pi pi-check" text @click="deleteCustomer" />
    </template>
  </Dialog>

  <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Услуга" :modal="true" class="p-fluid">
    <div class="field">
      <label for="name">Название</label>
      <InputText id="name" v-model.trim="product.name" required="true" autofocus :invalid="submitted && !product.name" />
      <small class="p-invalid p-error" v-if="submitted && !product.name">Name is required.</small>
    </div>
    <div class="field">
      <label for="name">Стоимость</label>
      <InputText id="name" v-model.trim="product.price" required="true" autofocus :invalid="submitted && !product.price" />
      <small class="p-invalid p-error" v-if="submitted && !product.price">Name is required.</small>
    </div>
    <template #footer>
      <Button label="Отменить" icon="pi pi-times" @click="hideDialog" />
      <Button label="Сохранить" icon="pi pi-check" @click="saveProduct" />
    </template>
  </Dialog>
</template>

<style scoped lang="scss">

</style>