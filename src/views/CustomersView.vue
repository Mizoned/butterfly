<script setup lang="ts">
import { onMounted } from 'vue'
import { useCustomersStore } from '@/stores/CustomersStore';
import { DEFAULT_CUSTOMER_IMAGE } from '@/shared/constants';
import { formatPhoneNumber } from '@/shared/utils';
import DeleteCustomerModal from '@/components/modals/customers/DeleteCustomerModal.vue'
import CreateCustomerModal from '@/components/modals/customers/CreateCustomerModal.vue'
import EditCustomerModal from '@/components/modals/customers/EditCustomerModal.vue'

const customersStore = useCustomersStore();

onMounted(() => {
  customersStore.getAllCustomers();
});
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
          <Button @click="customersStore.isOpenCreateCustomerDialog = true" label="Создать" icon="pi pi-plus" />
        </div>
        <DataTable :loading="customersStore.isLoading" :value="customersStore.customers" :rows="5" :paginator="true" responsiveLayout="scroll">
          <Column
            field="lastName"
            header="Клиент"
            :sortable="true"
            style="width: 25%"
            headerStyle="min-width:15rem;"
          >
            <template #body="slotProps">
              <Chip>
                <img :src="slotProps.data?.image ?? DEFAULT_CUSTOMER_IMAGE" alt="">
                <span>{{ slotProps.data.lastName + ' ' + slotProps.data.firstName }}</span>
              </Chip>
            </template>
          </Column>
          <Column field="email" header="Email" style="width: 15%"></Column>
          <Column field="mobilePhone" header="Телефон" style="width: 15%;" headerStyle="min-width:12rem;">
            <template #body="slotProps">
              {{ formatPhoneNumber(slotProps.data.mobilePhone) }}
            </template>
          </Column>
          <Column field="visits" header="Посещений" :sortable="true"  style="width: 15%" headerStyle="min-width:10rem;">
            <template #body="slotProps">
              <Chip class="bg-green-100 border-round pr-2 pl-2 pt-0 pb-0 h-2rem">
                <span class="font-semibold">{{ slotProps.data?.visits ?? 0 }}</span>
              </Chip>
            </template>
          </Column>
          <Column field="lifeTime" header="Суммарная прибыль" :sortable="true" style="width: 15%" headerStyle="min-width:10rem;">
            <template #body="slotProps">
              <Chip class="border-round">
                <span class="font-semibold">{{ (slotProps.data?.lifeTime ?? 0) + ' ₽' }}</span>
              </Chip>
            </template>
          </Column>
          <Column headerStyle="min-width:10rem;">
            <template #body="slotProps">
              <div class="flex align-items-center justify-content-end gap-2">
                <Button icon="pi pi-pencil" rounded @click="customersStore.openEditCustomerModal(slotProps.data)" />
                <Button icon="pi pi-trash" severity="danger" rounded @click="customersStore.confirmDeleteCustomerDialog(slotProps.data)" />
              </div>
            </template>
          </Column>
          <template #empty> Список клиентов пуст. </template>
        </DataTable>
      </Card>
    </div>
  </div>
  <DeleteCustomerModal />
  <CreateCustomerModal />
  <EditCustomerModal />
</template>

<style scoped lang="scss">

</style>