<script setup lang="ts">
import { onMounted } from 'vue';
import { useCustomersStore } from '@/stores/CustomersStore';
import { formatPhoneNumber } from '@/shared/utils';
import DeleteCustomerModal from '@/components/modals/customers/DeleteCustomerModal.vue';
import CreateCustomerModal from '@/components/modals/customers/CreateCustomerModal.vue';
import EditCustomerModal from '@/components/modals/customers/EditCustomerModal.vue';
import CustomerChip from '@/components/customers/CustomerChip.vue';
import { useToast } from 'primevue/usetoast';

const customersStore = useCustomersStore();
const toast = useToast();

onMounted(() => {
  customersStore.getAllCustomers().catch(() => {
    toast.add({
      severity: 'error',
      summary: 'Произошла ошибка',
      detail: 'Не удалось получить клиентов',
      life: 3000,
      closable: false
    });
  });
});
</script>

<template>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-4">
      <StatisticCard
        title="Всего клиентов"
        number-title="152"
        icon="pi-users"
        icon-color="blue"
        icon-background="blue"
        number="24"
        number-description="новых в этом месяце"
      />
    </div>
    <div class="col-12 lg:col-6 xl:col-4">
      <StatisticCard
        title="Активный клиент"
        number-title="Щербинин Валерий"
        icon="pi-user"
        icon-color="orange"
        icon-background="orange"
        number="12 посещений"
        number-description="в этом месяце"
      />
    </div>
    <div class="col-12 lg:col-12 xl:col-4">
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
    <div class="col-12">
      <Card>
        <div class="flex gap-2 justify-content-between mb-3">
          <div class="text-xl font-medium">Список клиентов</div>
          <Button
            @click="customersStore.isOpenCreateCustomerDialog = true"
            label="Создать"
            icon="pi pi-plus"
          />
        </div>
        <DataTable
          :loading="customersStore.isLoading"
          :value="customersStore.customers"
          :rows="5"
          :paginator="true"
          responsiveLayout="scroll"
        >
          <Column
            field="lastName"
            header="Клиент"
            :sortable="true"
            style="width: 25%"
            headerStyle="min-width:15rem;"
          >
            <template #body="slotProps">
              <CustomerChip
                :name="slotProps.data.lastName + ' ' + slotProps.data.firstName"
                :image="slotProps.data?.image"
              />
            </template>
          </Column>
          <Column field="email" header="Email" style="width: 15%">
            <template #body="slotProps">
              <template v-if="slotProps.data.email">{{ slotProps.data.email }}</template>
              <template v-else>-</template>
            </template>
          </Column>
          <Column
            field="mobilePhone"
            header="Телефон"
            style="width: 15%"
            headerStyle="min-width:12rem;"
          >
            <template #body="slotProps">
              {{ formatPhoneNumber(slotProps.data.mobilePhone) }}
            </template>
          </Column>
          <Column
            field="visits"
            header="Посещений"
            :sortable="true"
            style="width: 15%"
            headerStyle="min-width:10rem;"
          >
            <template #body="slotProps">
              <Chip class="bg-green-100 border-round pr-2 pl-2 pt-0 pb-0 h-2rem">
                <span class="font-semibold">{{ slotProps.data?.visits ?? 0 }}</span>
              </Chip>
            </template>
          </Column>
          <Column
            field="lifeTime"
            header="Суммарная прибыль"
            :sortable="true"
            style="width: 15%"
            headerStyle="min-width:10rem;"
          >
            <template #body="slotProps">
              <Chip class="border-round">
                <span class="font-semibold">{{ (slotProps.data?.lifeTime ?? 0) + ' ₽' }}</span>
              </Chip>
            </template>
          </Column>
          <Column headerStyle="min-width:10rem;">
            <template #body="slotProps">
              <div class="flex align-items-center justify-content-end gap-2">
                <Button
                  icon="pi pi-pencil"
                  rounded
                  @click="customersStore.openEditCustomerModal(slotProps.data)"
                />
                <Button
                  icon="pi pi-trash"
                  severity="danger"
                  rounded
                  @click="customersStore.confirmDeleteCustomerDialog(slotProps.data)"
                />
              </div>
            </template>
          </Column>
          <template #empty>
            <span v-if="!customersStore.isLoading">Список клиентов пуст.</span>
          </template>
        </DataTable>
      </Card>
    </div>
  </div>
  <DeleteCustomerModal />
  <CreateCustomerModal />
  <EditCustomerModal />
</template>

<style scoped lang="scss"></style>