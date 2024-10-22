<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { IProduct } from '@/shared/interfaces';
import CustomerChip from '@/components/customers/CustomerChip.vue';
import { formatDate, formatPhoneNumber } from '@/shared/utils';
import StatisticCard from '@/components/cards/StatisticCard.vue';
import { useScheduleStore } from '@/stores/ScheduleStore';
import CreateScheduleModal from '@/components/modals/schedules/CreateScheduleModal.vue';
import EditScheduleModal from '@/components/modals/schedules/EditScheduleModal.vue';
import CancelScheduleModal from '@/components/modals/schedules/CancelScheduleModal.vue';
import CompleteScheduleModal from '@/components/modals/schedules/CompleteScheduleModal.vue';

const scheduleStore = useScheduleStore();

onMounted(() => {
  scheduleStore.getAllSchedulesCompleted()
});

const calculateTotalCostProducts = (products: IProduct[]) => {
  let totalCost = 0;

  products.forEach(product => {
    totalCost += product.additional.priceAtSale * product.additional.quantity;
  });

  return totalCost;
}

const expandedRows = ref({});

</script>

<template>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-4">
      <StatisticCard
        title="Завершенные записи"
        number-title="152"
        icon="pi-check"
        icon-color="blue"
        icon-background="blue"
        number="12"
        number-description="за этот месяц"
      />
    </div>
    <div class="col-12 lg:col-6 xl:col-4">
      <StatisticCard
        title="Доход"
        number-title="15 439 ₽"
        icon="pi-dollar"
        icon-color="green"
        icon-background="green"
        number="4 320 ₽"
        number-description="в этом месяце"
      />
    </div>
    <div class="col-12 lg:col-12 xl:col-4">
      <StatisticCard
        title="Средний чек за все время"
        number-title="3 453 ₽"
        icon="pi-wallet"
        icon-color="cyan"
        icon-background="cyan"
        number="4 567 ₽"
        number-description="в этом месяце"
      />
    </div>
    <div class="col-12 xl:col-12">
      <Card>
        <div class="flex gap-2 justify-content-between mb-3">
          <div class="text-xl font-medium">Список завершенных записей</div>
        </div>
        <DataTable
          :value="scheduleStore.schedulesCompleted"
          v-model:expandedRows="expandedRows"
          :rows="7"
          :paginator="true"
          responsiveLayout="scroll"
          dataKey="id"
          :loading="scheduleStore.isLoadingCustomers"
        >
          <Column expander style="width: 1rem" />
          <Column field="customer" header="Клиент" style="width: 20%" headerStyle="min-width:15rem;">
            <template #body="slotProps">
              <CustomerChip
                :name="slotProps.data.customer.lastName + ' ' + slotProps.data.customer.firstName"
                :image="slotProps.data?.image"
              />
            </template>
          </Column>
          <Column field="customer" header="Номер телефона" style="width: 15%" headerStyle="min-width:12rem;">
            <template #body="slotProps">
              {{ formatPhoneNumber(slotProps.data.customer.mobilePhone) }}
            </template>
          </Column>
          <Column field="date" header="Дата записи" :sortable="true" style="width: 15%" headerStyle="min-width:12rem;">
            <template #body="slotProps">
              {{ formatDate(new Date(slotProps.data.date), 'dd.mm.yy') }}
            </template>
          </Column>
          <Column field="timeStart" header="Время начала" style="width: 15%" headerStyle="min-width:12rem;"></Column>
          <Column field="timeEnd" header="Время окончания" style="width: 15%" headerStyle="min-width:12rem;"></Column>
          <Column field="products" header="Общая стоимость" style="width: 15%" headerStyle="min-width:12rem;">
            <template #body="slotProps">
              <Chip class="border-round">
                <span class="font-semibold">{{ calculateTotalCostProducts(slotProps.data.products) + ' ₽' }}</span>
              </Chip>
            </template>
          </Column>
          <template #expansion="slotProps">
            <div class="p-3">
              <h5 class="text-lg font-semibold">Выставленные услуги</h5>
              <DataTable :value="slotProps.data.products">
                <Column field="name" header="Название"></Column>
                <Column field="price" header="Текущая стоимость">
                  <template #body="slotProps">
                    <Chip class="border-round">
                      <span class="font-semibold">{{ (slotProps.data.price ?? 0) + ' ₽' }}</span>
                    </Chip>
                  </template>
                </Column>
                <Column field="price" header="Стоимость продажи">
                  <template #body="slotProps">
                    <Chip class="border-round">
                      <span class="font-semibold">{{ (slotProps.data.additional.priceAtSale ?? 0) + ' ₽' }}</span>
                    </Chip>
                  </template>
                </Column>
                <Column field="additional" header="Количество">
                  <template #body="slotProps">
                    <Chip class="bg-green-100 border-round pr-2 pl-2 pt-0 pb-0 h-2rem">
                      <span class="font-semibold">{{ slotProps.data.additional.quantity }}</span>
                    </Chip>
                  </template>
                </Column>
              </DataTable>
            </div>
          </template>
          <template #empty>
            <span v-if="!scheduleStore.isLoadingCustomers">Список завершенных записей пуст.</span>
          </template>
        </DataTable>
      </Card>
    </div>
  </div>
  <CreateScheduleModal />
  <EditScheduleModal />
  <CancelScheduleModal />
  <CompleteScheduleModal />
</template>

<style scoped lang="scss"></style>