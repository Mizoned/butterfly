<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import StatisticCard from '@/components/cards/StatisticCard.vue';
import CustomerChip from '@/components/customers/CustomerChip.vue';
import SalesShareLine from '@/components/statistics/SalesShareLine.vue';
import type { ChartOptions } from 'chart.js';
import { useDashboardStatisticsStore } from '@stores/statistics/DashboardStatisticsStore';
import { calculateTotalCostProducts, formatToCurrency, getColorsByNumber, plural } from '@shared/utils';

const dashboardStatisticsStore = useDashboardStatisticsStore();

const lineData = reactive<{
  labels: number[];
  datasets: {
    data: any[];
    fill: boolean;
    backgroundColor: string;
    borderColor: string;
    tension: number;
  }[];
}>({
  labels: dashboardStatisticsStore.dailyRevenue.map((d) => d.revenue),
  datasets: [
    {
      data: [],
      fill: false,
      backgroundColor: '#d0e1fd',
      borderColor: '#3b82f6',
      tension: 0.4
    }
  ]
});
const lineOptions = ref<ChartOptions<'line'>>({
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Текущий месяц'
    },
    tooltip: {
      callbacks: {
        title: (tooltipItems) => {
          return `День: ${tooltipItems[0].label}`;
        },
        label: (tooltipItem) => {
          return `Выручка: ${formatToCurrency(tooltipItem!.raw)}`;
        }
      }
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'День месяца'
      }
    },
    y: {
      title: {
        display: true,
        text: 'Количество'
      },
      suggestedMax: 1
    }
  },
  responsive: true
});

const barData = reactive<{
  labels: string[];
  datasets: any[];
}>({
  labels: ['Количество записей'],
  datasets: []
});

const barOptions = ref<ChartOptions<'bar'>>({
  plugins: {
    legend: {
      position: 'bottom'
    },
    title: {
      display: true,
      text: 'Текущий месяц'
    }
  },
  scales: {
    y: {
      suggestedMax: 1
    }
  },
  responsive: true
});


const expandedRows = ref({});

onMounted(async () => {
  await dashboardStatisticsStore.getStatistics();

  lineData.datasets[0].data = dashboardStatisticsStore.dailyRevenue.map((d) => d.revenue);
  lineData.labels = dashboardStatisticsStore.dailyRevenue.map((d) => d.day);
  lineOptions.value.scales.y.suggestedMax = Math.max(...lineData.datasets[0].data) * 1.1 || 1;

  console.log(lineOptions);

  barData.datasets = [
    {
      label: 'Завершенные записи',
      data: [dashboardStatisticsStore.totalSchedulesByStatuses.successCount],
      backgroundColor: ['#4ade80'],
    },
    {
      label: 'Активные записи',
      data: [dashboardStatisticsStore.totalSchedulesByStatuses.processedCount],
      backgroundColor: ['#60a5fa'],
    },
    {
      label: 'Отмененные записи',
      data: [dashboardStatisticsStore.totalSchedulesByStatuses.canceledCount],
      backgroundColor: ['#f87171'],
    }
  ];

  const allBarDatasets = barData.datasets.flatMap(dataset => dataset.data);

  barOptions.value.scales!.y!.suggestedMax = Math.max(...allBarDatasets) * 1.1 || 1;
});
</script>

<template>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-4">
      <StatisticCard
        title="Записи"
        :number-title="dashboardStatisticsStore.totalSchedules.totalCount"
        icon="pi-book"
        icon-color="blue"
        icon-background="blue"
        :number="String(dashboardStatisticsStore.totalSchedules.newTotalCount)"
        number-description="в этом месяце"
      />
    </div>
    <div class="col-12 lg:col-6 xl:col-4">
      <StatisticCard
        title="Доход"
        :number-title="formatToCurrency(dashboardStatisticsStore.totalRevenue.totalRevenue)"
        icon="pi-dollar"
        icon-color="green"
        icon-background="green"
        :number="formatToCurrency(dashboardStatisticsStore.totalRevenue.newTotalRevenue)"
        number-description="в этом месяце"
      />
    </div>
    <div class="col-12 lg:col-12 xl:col-4">
      <StatisticCard
        title="Клиенты"
        :number-title="dashboardStatisticsStore.totalCustomers.totalCount"
        icon="pi-users"
        icon-color="cyan"
        icon-background="cyan"
        :number="String(dashboardStatisticsStore.totalCustomers.newTotalCount)"
        :number-description="String(plural(['новая', 'новых', 'новых'], dashboardStatisticsStore.totalCustomers.newTotalCount) + ' в этом месяце')"
      />
    </div>
    <div class="col-12 xl:col-6">
      <div class="card">
        <div class="flex gap-2 align-items-start">
          <h5>Записи на сегодня</h5>
        </div>
        <DataTable
          :value="dashboardStatisticsStore.todaySchedules"
          :rows="5"
          v-model:expandedRows="expandedRows"
          dataKey="id"
          :paginator="dashboardStatisticsStore.todaySchedules.length > 5"
          responsiveLayout="scroll"
          :loading="dashboardStatisticsStore.isLoading"
        >
          <Column expander style="width: 1rem" />
          <Column header="Клиент" style="width: 40%">
            <template #body="slotProps">
              <CustomerChip
                :name="slotProps.data.customer.lastName + ' ' + slotProps.data.customer.firstName"
                :image="slotProps.data?.image"
              />
            </template>
          </Column>
          <Column header="Время записи" style="width: 30%">
            <template #body="slotsProps">
              {{ slotsProps.data.timeStart + ' - ' + slotsProps.data.timeEnd }}
            </template>
          </Column>
          <Column header="Общая стоимость" style="width: 30%">
            <template #body="slotsProps">
              <Chip class="border-round">
                <span class="font-semibold">
                  {{ formatToCurrency(calculateTotalCostProducts(slotsProps.data.products)) }}
                </span>
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
            <span v-if="!dashboardStatisticsStore.isLoading">Список записей пуст.</span>
          </template>
        </DataTable>
      </div>
      <div class="card">
        <div class="flex gap-2 align-items-start">
          <h5>Самые продаваемые услуги</h5>
        </div>
        <DataTable
          :value="dashboardStatisticsStore.profitableProducts"
          :rows="5"
          :paginator="dashboardStatisticsStore.profitableProducts.length > 5"
          responsiveLayout="scroll"
          :loading="dashboardStatisticsStore.isLoading"
        >
          <Column header="Название" style="width: 35%">
            <template #body="slotProps">
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0">{{ slotProps.data.product.name }}</span>
            </template>
          </Column>
          <Column header="Прибыль" style="width: 30%">
            <template #body="slotsProps">
              <Chip class="border-round">
                <span class="font-semibold">
                  {{ formatToCurrency(slotsProps.data.totalRevenue) }}
                </span>
              </Chip>
            </template>
          </Column>
          <Column header="Доля продаж за месяц" style="width: 35%">
            <template #body="slotsProps">
              <SalesShareLine
                :color="getColorsByNumber(slotsProps.index).color"
                :bg="getColorsByNumber(slotsProps.index).bg"
                :percent="slotsProps.data.totalRevenuePercent"
              />
            </template>
          </Column>
          <template #empty>
            <span v-if="!dashboardStatisticsStore.isLoading">Список записей пуст.</span>
          </template>
        </DataTable>
      </div>
    </div>
    <div class="col-12 xl:col-6">
      <div class="card">
        <div class="flex gap-2 align-items-start">
          <h5>Обзор продаж</h5>
        </div>
        <Chart type="line" :data="lineData" :options="lineOptions" />
      </div>
      <div class="card">
        <div class="flex gap-2 align-items-start">
          <h5>Состояние записей</h5>
        </div>
        <Chart type="bar" :data="barData" :options="barOptions" />
      </div>
    </div>
  </div>
</template>
