<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { IProduct } from '@/shared/interfaces';
import CustomerChip from '@/components/customers/CustomerChip.vue';
import { formatDate, formatPhoneNumber, formatToCurrency } from '@/shared/utils';
import StatisticCard from '@/components/cards/StatisticCard.vue';
import { useScheduleStore } from '@/stores/ScheduleStore';
import CreateScheduleModal from '@/components/modals/schedules/CreateScheduleModal.vue';
import EditScheduleModal from '@/components/modals/schedules/EditScheduleModal.vue';
import CancelScheduleModal from '@/components/modals/schedules/CancelScheduleModal.vue';
import CompleteScheduleModal from '@/components/modals/schedules/CompleteScheduleModal.vue';
import { useScheduleStatisticsStore } from '@stores/statistics/SchedulesStatisticsStore';

const scheduleStore = useScheduleStore();
const schedulesStatisticsStore = useScheduleStatisticsStore();

onMounted(() => {
  scheduleStore.getAllSchedulesCanceled();
  schedulesStatisticsStore.getCanceledStatistics();
});

const calculateTotalCostProducts = (products: IProduct[]) => {
  let totalCost = 0;

  products.forEach(product => {
    totalCost += product.details.priceAtSale * product.details.quantity;
  });

  return totalCost;
}

const expandedRows = ref({});

</script>

<template>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-4">
      <StatisticCard
        title="Отменено записей"
        :number-title="schedulesStatisticsStore.totalCanceledSchedules.totalCount || 0"
        icon="pi-times"
        icon-color="red"
        icon-background="red"
        :number="String(schedulesStatisticsStore.totalCanceledSchedules.newTotalCount || 0)"
        number-description="в этом месяце"
      />
    </div>
    <div class="col-12 lg:col-6 xl:col-4">
      <StatisticCard
        title="Процент отмененных записей"
        :number-title="schedulesStatisticsStore.percentCanceledSchedules.allTime || 0 + '%'"
        icon="pi-percentage"
        icon-color="orange"
        icon-background="orange"
        :number="schedulesStatisticsStore.percentCanceledSchedules.currentMonth || 0 + '%'"
        number-description="в этом месяце"
      />
    </div>
    <div class="col-12 lg:col-12 xl:col-4">
      <StatisticCard
        title="Упущенная прибыль"
        :number-title="formatToCurrency(schedulesStatisticsStore.lostRevenue.totalLostRevenue || 0)"
        icon="pi-star-fill"
        icon-color="cyan"
        icon-background="cyan"
        :number="formatToCurrency(schedulesStatisticsStore.lostRevenue.newTotalLostRevenue || 0)"
        number-description="в этом месяце"
      />
    </div>
    <div class="col-12 xl:col-12">
      <Card>
        <div class="flex gap-2 justify-content-between mb-3">
          <div class="text-xl font-medium">Список отмененных записей</div>
        </div>
        <DataTable
          :value="scheduleStore.schedulesCanceled"
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
                <span class="font-semibold">{{ formatToCurrency(calculateTotalCostProducts(slotProps.data.products)) }}</span>
              </Chip>
            </template>
          </Column>
          <template #expansion="slotProps">
            <div class="p-3">
              <h5 class="text-lg font-semibold">Выставленные услуги</h5>
              <DataTable :value="slotProps.data.products">
                <Column field="name" header="Название"></Column>
                <Column field="price" header="Стоимость продажи">
                  <template #body="slotProps">
                    <Chip class="border-round">
                      <span class="font-semibold">{{ formatToCurrency(slotProps.data.details.priceAtSale || 0) }}</span>
                    </Chip>
                  </template>
                </Column>
                <Column field="details" header="Количество">
                  <template #body="slotProps">
                    <Chip class="bg-green-100 border-round pr-2 pl-2 pt-0 pb-0 h-2rem">
                      <span class="font-semibold">{{ slotProps.data.details.quantity }}</span>
                    </Chip>
                  </template>
                </Column>
              </DataTable>
            </div>
          </template>
          <template #empty>
            <span v-if="!scheduleStore.isLoadingCustomers">Список отмененных записей пуст.</span>
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
