<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast'

const customer = ref({});
const customerDialog = ref(false);
const deleteCustomerDialog = ref(false);
const submitted = ref(false);
const toast = useToast();

const confirmDeleteCustomer = (editProduct) => {
  customer.value = editProduct;
  deleteCustomerDialog.value = true;
};

const deleteCustomer = () => {
  customers.value = customers.value.filter((val) => val.id !== customer.value.id);
  deleteCustomerDialog.value = false;
  customer.value = {};
  toast.add({ severity: 'success', summary: 'Успешно', detail: 'Клиент удален', life: 3000 });
};

const editCustomer = (editProduct) => {
  customer.value = { ...editProduct };
  customerDialog.value = true;
};

const openNew = () => {
  customer.value = {};
  submitted.value = false;
  customerDialog.value = true;
};

const hideDialog = () => {
  customerDialog.value = false;
  submitted.value = false;
};

const saveCustomer = () => {
  submitted.value = true;
  if (customer.value.firstName && customer.value.firstName.trim()) {
    if (customer.value.id) {
      customers.value[findIndexById(customer.value.id)] = customer.value;
      toast.add({ severity: 'success', summary: 'Успешно', detail: 'Клиент обновлен', life: 3000 });
    } else {
      customer.value.id = createId();
      customer.value.image = 'demo/images/customers/default.jpg';
      customers.value.push(customer.value);
      toast.add({ severity: 'success', summary: 'Успешно', detail: 'Клиент создан', life: 3000 });
    }
    customerDialog.value = false;
    customer.value = {};
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
  for (let i = 0; i < customers.value.length; i++) {
    if (customers.value[i].id === id) {
      index = i;
      break;
    }
  }
  return index;
};

const customers = ref([
  {
    id: 1,
    email: 'pavel@mail.ru',
    phone: '+7 (902) 000-00-01',
    firstName: 'Павел',
    lastName: 'Меньших',
    fatherName: 'Евгеньевич',
    visits: 8,
    lifeTime: 2356,
    image: 'demo/images/customers/customer-2.jpg'
  },
  {
    id: 2,
    email: 'irina@mail.ru',
    phone: '+7 (902) 000-00-02',
    firstName: 'Ирина',
    lastName: 'Куликова',
    fatherName: 'Павловна',
    visits: 19,
    lifeTime: 9756,
    image: 'demo/images/customers/customer-1.jpg'
  },
  {
    id: 3,
    email: 'ksenya@mail.ru',
    phone: '+7 (902) 000-00-03',
    firstName: 'Ксения',
    lastName: 'Попова',
    fatherName: 'Сергеевна',
    visits: 12,
    lifeTime: 5356,
    image: 'demo/images/customers/customer-3.jpg'
  },
  {
    id: 4,
    email: 'svetlana@mail.ru',
    phone: '+7 (902) 000-00-04',
    firstName: 'Светлана',
    lastName: 'Гришина',
    fatherName: 'Игнатьевна',
    visits: 25,
    lifeTime: 12356,
    image: 'demo/images/customers/customer-4.jpg'
  },
  {
    id: 5,
    email: 'egor@mail.ru',
    phone: '+7 (902) 000-00-05',
    firstName: 'Егор',
    lastName: 'Ворошинин',
    fatherName: 'Сергеевич',
    visits: 2,
    lifeTime: 1499,
    image: 'demo/images/customers/default.jpg'
  }
]);
</script>

<template>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-4">
      <StatisticCard
        title="Всего клиентов"
        number-title="152"
        icon="pi-user"
        icon-color="blue"
        icon-background="blue"
        number="24"
        number-description="новых в этом месяце"
      />
    </div>
    <div class="col-12 lg:col-6 xl:col-4">
      <StatisticCard
        title="Прибыль"
        number-title="4359 ₽"
        icon="pi-dollar"
        icon-color="orange"
        icon-background="orange"
        number="%12+"
        number-description="с прошлого месяца"
      />
    </div>
    <div class="col-12 lg:col-6 xl:col-4">
      <StatisticCard
        title="Посещений"
        number-title="66"
        icon="pi-calendar"
        icon-color="purple"
        icon-background="purple"
        number="5"
        number-description="в этом месяце"
      />
    </div>
    <div class="col-12 xl:col-12">
      <Card>
        <div class="flex gap-2 justify-content-between mb-3">
          <div class="text-xl font-medium">Список клиентов</div>
          <Button @click="openNew" label="Создать" icon="pi pi-plus" />
        </div>
        <DataTable :value="customers" :rows="5" :paginator="true" responsiveLayout="scroll">
          <Column
            field="lastName"
            header="Клиент"
            :sortable="true"
            style="width: 25%"
            headerStyle="min-width:15rem;"
          >
            <template #body="slotProps">
              <Chip
                :image="slotProps.data.image"
              >
                <img :src="slotProps.data.image" alt="">
                <span>{{ slotProps.data.lastName + ' ' + slotProps.data.firstName }}</span>
              </Chip>
            </template>
          </Column>
          <Column field="email" header="Email" style="width: 15%"></Column>
          <Column field="phone" header="Телефон" style="width: 15%;" headerStyle="min-width:12rem;"></Column>
          <Column field="visits" header="Посещений" :sortable="true"  style="width: 15%" headerStyle="min-width:10rem;">
            <template #body="slotProps">
              <Chip class="bg-green-100 border-round pr-2 pl-2 pt-0 pb-0 h-2rem">
                <span class="font-semibold">{{ slotProps.data.visits ?? 0 }}</span>
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

  <Dialog v-model:visible="deleteCustomerDialog" :style="{ width: '450px' }" header="Подтвержение" :modal="true">
    <div class="flex align-items-center">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="customer">
        Вы уверены, что хотите удалить <b>{{ customer.firstName + ' ' + customer.lastName }}</b>?
      </span>
    </div>
    <template #footer>
      <Button label="Нет" icon="pi pi-times text-red" text @click="deleteCustomerDialog = false" />
      <Button label="Да" icon="pi pi-check" text @click="deleteCustomer" />
    </template>
  </Dialog>

  <Dialog v-model:visible="customerDialog" :style="{ width: '450px' }" header="Клиент" :modal="true" class="p-fluid">
    <img :src="customer.image" :alt="customer.image" v-if="customer.image" width="150" class="mt-0 mx-auto mb-5 block shadow-2" />
    <div class="field">
      <label for="name">Фамилия</label>
      <InputText id="name" v-model.trim="customer.lastName" required="true" autofocus :invalid="submitted && !customer.lastName" />
      <small class="p-invalid p-error" v-if="submitted && !customer.lastName">Name is required.</small>
    </div>
    <div class="field">
      <label for="name">Имя</label>
      <InputText id="name" v-model.trim="customer.firstName" required="true" autofocus :invalid="submitted && !customer.firstName" />
      <small class="p-invalid p-error" v-if="submitted && !customer.firstName">Name is required.</small>
    </div>
    <div class="field">
      <label for="name">Отчество</label>
      <InputText id="name" v-model.trim="customer.fatherName" required="true" autofocus :invalid="submitted && !customer.fatherName" />
      <small class="p-invalid p-error" v-if="submitted && !customer.fatherName">Name is required.</small>
    </div>
    <div class="field">
      <label for="name">Email</label>
      <InputText id="name" v-model.trim="customer.email" required="true" autofocus :invalid="submitted && !customer.email" />
      <small class="p-invalid p-error" v-if="submitted && !customer.email">Name is required.</small>
    </div>
    <div class="field">
      <label for="name">Телефон</label>
      <InputText id="name" v-model.trim="customer.phone" required="true" autofocus :invalid="submitted && !customer.phone" />
      <small class="p-invalid p-error" v-if="submitted && !customer.phone">Name is required.</small>
    </div>
    <template #footer>
      <Button label="Отменить" icon="pi pi-times" @click="hideDialog" />
      <Button label="Сохранить" icon="pi pi-check" @click="saveCustomer" />
    </template>
  </Dialog>
</template>

<style scoped lang="scss">

</style>