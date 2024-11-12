<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import CustomerChip from '@/components/customers/CustomerChip.vue';
import { formatDate, formatPhoneNumber, calculateTotalCostProducts, plural, formatToCurrency } from '@/shared/utils';
import StatisticCard from '@/components/cards/StatisticCard.vue';
import { useScheduleStore } from '@/stores/ScheduleStore';
import CreateScheduleModal from '@/components/modals/schedules/CreateScheduleModal.vue';
import EditScheduleModal from '@/components/modals/schedules/EditScheduleModal.vue';
import CancelScheduleModal from '@/components/modals/schedules/CancelScheduleModal.vue';
import CompleteScheduleModal from '@/components/modals/schedules/CompleteScheduleModal.vue';
import { useToast } from 'primevue/usetoast';
import { useScheduleStatisticsStore } from '@stores/statistics/SchedulesStatisticsStore';

const scheduleStore = useScheduleStore();
const schedulesStatisticsStore = useScheduleStatisticsStore();
const toast = useToast();

onMounted(() => {
  scheduleStore.getAllSchedulesProcessed().catch(() => {
    toast.add({ severity: 'error', summary: 'Произошла ошибка', detail: 'Не удалось получить записи', life: 3000, closable: false });
  });

  schedulesStatisticsStore.getProcessedStatistics();
});

const expandedRows = ref({});

const nearestScheduleSmallText = computed(() => {
  if (schedulesStatisticsStore.nearestSchedule === null) return 'Назначьте запись';

  return 'с ' + schedulesStatisticsStore.nearestSchedule.timeStart + ' до ' +schedulesStatisticsStore.nearestSchedule.timeEnd;
})
</script>

<template>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-4">
      <StatisticCard
        title="Записи на сегодня"
        :number-title="schedulesStatisticsStore.totalCountToday.totalCount"
        icon="pi-play"
        icon-color="blue"
        icon-background="blue"
        :number="String(schedulesStatisticsStore.totalCountToday.completedTotalCount)"
        number-description="завершено"
        :is-loading="schedulesStatisticsStore.isLoading"
      />
    </div>
    <div class="col-12 lg:col-6 xl:col-4">
      <StatisticCard
        title="Записей на неделе"
        :number-title="schedulesStatisticsStore.totalCountWeek.totalCount"
        icon="pi-book"
        icon-color="orange"
        icon-background="orange"
        :number="String(schedulesStatisticsStore.totalCountWeek.completedTotalCount)"
        number-description="завершено"
        :is-loading="schedulesStatisticsStore.isLoading"
      />
    </div>
    <div class="col-12 lg:col-12 xl:col-4">
      <StatisticCard
        title="Ближайшая запись"
        :number-title="schedulesStatisticsStore.nearestSchedule?.date || 'Нет записи'"
        icon="pi-star-fill"
        icon-color="cyan"
        icon-background="cyan"
        :number-description="nearestScheduleSmallText"
        :is-loading="schedulesStatisticsStore.isLoading"
      />
    </div>
    <div class="col-12 xl:col-12">
      <Card>
        <div class="flex gap-2 justify-content-between mb-3">
          <div class="text-xl font-medium">Список записей</div>
          <Button
            @click="scheduleStore.isOpenCreateScheduleDialog = true"
            label="Создать"
            icon="pi pi-plus"
          />
        </div>
        <DataTable
          :value="scheduleStore.schedulesProcessed"
          v-model:expandedRows="expandedRows"
          :rows="7"
          :paginator="true"
          responsiveLayout="scroll"
          dataKey="id"
          :loading="scheduleStore.isLoading"
        >
          <Column expander style="width: 1rem" />
          <Column
            field="customer"
            header="Клиент"
            style="width: 20%"
            headerStyle="min-width:15rem;"
          >
            <template #body="slotProps">
              <CustomerChip
                :name="slotProps.data.customer.lastName + ' ' + slotProps.data.customer.firstName"
                :image="slotProps.data?.image"
              />
            </template>
          </Column>
          <Column
            field="customer"
            header="Номер телефона"
            style="width: 15%"
            headerStyle="min-width:12rem;"
          >
            <template #body="slotProps">
              {{ formatPhoneNumber(slotProps.data.customer.mobilePhone) }}
            </template>
          </Column>
          <Column
            field="date"
            header="Дата записи"
            :sortable="true"
            style="width: 10%"
            headerStyle="min-width:12rem;"
          >
            <template #body="slotProps">
              {{ formatDate(new Date(slotProps.data.date), 'dd.mm.yy') }}
            </template>
          </Column>
          <Column
            field="timeStart"
            header="Время начала"
            style="width: 5%"
            headerStyle="min-width:12rem;"
          ></Column>
          <Column
            field="timeEnd"
            header="Время окончания"
            style="width: 5%"
            headerStyle="min-width:12rem;"
          ></Column>
          <Column
            field="products"
            header="Общая стоимость"
            style="width: 5%"
            headerStyle="min-width:12rem;"
          >
            <template #body="slotProps">
              <Chip class="border-round">
                <span class="font-semibold">{{ formatToCurrency(calculateTotalCostProducts(slotProps.data.products)) }}</span>
              </Chip>
            </template>
          </Column>
          <Column headerStyle="min-width:10rem;">
            <template #body="slotProps">
              <div class="flex align-items-center justify-content-end gap-2">
                <Button
                  @click="scheduleStore.openEditScheduleModal(slotProps.data)"
                  icon="pi pi-pencil"
                  severity="secondary"
                  rounded
                />
                <Button
                  @click="scheduleStore.confirmCancelScheduleDialog(slotProps.data)"
                  icon="pi pi-times"
                  severity="danger"
                  rounded
                />
                <Button
                  @click="scheduleStore.confirmCompleteScheduleDialog(slotProps.data)"
                  icon="pi pi-check"
                  rounded
                />
              </div>
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
            <span v-if="!scheduleStore.isLoadingCustomers">Список записей пуст.</span>
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
