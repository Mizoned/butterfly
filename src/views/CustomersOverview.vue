<script setup lang="ts">
import { formatPhoneNumber, formatToCurrency, getColorsByNumber, plural } from '@shared/utils';
import CustomerChip from '@/components/customers/CustomerChip.vue';
import { computed, onMounted, reactive, ref } from 'vue';
import type { ChartData, ChartOptions } from 'chart.js';
import StatisticCard from '@/components/cards/StatisticCard.vue';
import { useCustomersStatisticStore } from '@stores/statistics/CustomersStatisticsStore';
import SalesShareLine from '@/components/statistics/SalesShareLine.vue';

const customersStatisticsStore = useCustomersStatisticStore();

const plugin = ref({
  id: 'emptyDoughnut',
  afterDraw(chart: any, args: any, options: any) {
    const {datasets} = chart.data;
    let hasData = datasets[0].data.every((value: number) => value === 0);

    const {color, lineWidth, width, radiusDecrease, backgroundColor} = options;
    if (hasData) {
      const {chartArea: {left, top, right, bottom}, ctx} = chart;
      const centerX = (left + right) / 2;
      const centerY = (top + bottom) / 2;
      const r = Math.min(right - left, bottom - top) / 2;

      // Рисуем заливку фона
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.arc(centerX, centerY, r - radiusDecrease, 0, 2 * Math.PI);
      ctx.stroke();

      // Рисуем внешнюю обводку
      ctx.beginPath();
      ctx.lineWidth = width - lineWidth * 2;
      ctx.strokeStyle = backgroundColor;
      ctx.arc(centerX, centerY, r - radiusDecrease, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }
});

const pieData = reactive<ChartData<'doughnut'>>({
  labels: ['Новые клиенты', 'Старые клиенты'],
  datasets: [
    {
      data: [],
      backgroundColor: ['#dcfce7', '#dbeafe'],
      borderColor: ['#4ade80', '#60a5fa']
    }
  ]
});

const pieEmptyColors = {
  color: '#94a3b8',
  backgroundColor: '#cbd5e1',
}

const pieOptions = ref<ChartOptions<'doughnut'>>({
  plugins: {
    legend: {
      position: 'bottom',
      display: true,
      labels: {
        padding: 15
      }
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => {
          const value = tooltipItem.raw || 0;
          return `Количество: ${value}`;
        }
      }
    },
    emptyDoughnut: {
      color: pieEmptyColors.color,
      backgroundColor: pieEmptyColors.backgroundColor,
      lineWidth: 2,
      width: 24,
      radiusDecrease: 20
    },
  },
  responsive: true,
  cutout: '80%',
  maintainAspectRatio: false
});

onMounted(async () => {
  await customersStatisticsStore.getOverviewStatistics();

  pieData.datasets[0].data = [customersStatisticsStore.totalCustomers.newTotalCount, customersStatisticsStore.totalCustomers.totalCount - customersStatisticsStore.totalCustomers.newTotalCount]

  if (pieData.datasets[0].data.every((value: number) => value === 0)) {
    pieData.labels = ['Нет данных']
    pieData.datasets[0].backgroundColor = [pieEmptyColors.backgroundColor]
    pieData.datasets[0].borderColor = [pieEmptyColors.color]
  }
});

const activeCustomerName = computed(() => customersStatisticsStore.activeCustomer
    ? customersStatisticsStore.activeCustomer.customer.lastName + ' ' + customersStatisticsStore.activeCustomer.customer.firstName
    : 'Данных пока нет'
);
</script>

<template>
<div class="grid">
  <div class="col-12 lg:col-6 xl:col-4">
    <StatisticCard
      title="Всего клиентов"
      :number-title="customersStatisticsStore.totalCustomers.totalCount"
      icon="pi-users"
      icon-color="blue"
      icon-background="blue"
      :number="String(customersStatisticsStore.totalCustomers.newTotalCount)"
      :number-description="String(plural(['новая', 'новых', 'новых'], customersStatisticsStore.totalCustomers.newTotalCount) + ' в этом месяце')"
      :is-loading="customersStatisticsStore.isLoading"
    />
  </div>
  <div class="col-12 lg:col-6 xl:col-4">
    <StatisticCard
      title="Активный клиент"
      :number-title="activeCustomerName"
      icon="pi-user"
      icon-color="orange"
      icon-background="orange"
      :number="String(customersStatisticsStore.activeCustomer?.visits || 0)"
      :number-description="plural(['посещение', 'посещения', 'посещений'], customersStatisticsStore.activeCustomer?.visits || 0) + ' в этом месяце'"
      :is-loading="customersStatisticsStore.isLoading"
    />
  </div>
  <div class="col-12 lg:col-12 xl:col-4">
    <StatisticCard
      title="Посещений"
      :number-title="customersStatisticsStore.totalVisits.totalCount"
      icon="pi-calendar"
      icon-color="purple"
      icon-background="purple"
      :number="String(customersStatisticsStore.totalVisits.newTotalCount)"
      number-description="в этом месяце"
      :is-loading="customersStatisticsStore.isLoading"
    />
  </div>
  <div class="col-12">
    <div class="card">
      <div class="flex gap-2 align-items-start">
        <h5>Ненадежные клиенты</h5>
      </div>
      <DataTable
        :value="customersStatisticsStore.untrustedCustomers"
        :rows="5"
        :paginator="customersStatisticsStore.untrustedCustomers.length > 5"
        responsiveLayout="scroll"
        :loading="customersStatisticsStore.isLoading"
      >
        <Column header="Клиент" style="width: 35%">
          <template #body="slotProps">
            <CustomerChip
              :name="slotProps.data.customer.lastName + ' ' + slotProps.data.customer.firstName"
              :image="slotProps.data.customer?.image"
            />
          </template>
        </Column>
        <Column header="Email" style="width: 20%">
          <template #body="slotProps">
            <template v-if="slotProps.data.customer.email">{{ slotProps.data.customer.email }}</template>
            <template v-else>-</template>
          </template>
        </Column>
        <Column header="Телефон" style="width: 25%">
          <template #body="slotProps">
            {{ formatPhoneNumber(slotProps.data.customer.mobilePhone) }}
          </template>
        </Column>
        <Column header="Количество отмен" style="width: 20%; white-space: nowrap;">
          <template #body="slotProps">
            <Chip class="bg-red-100 border-round pr-2 pl-2 pt-0 pb-0 h-2rem">
              <span class="font-semibold">{{ slotProps.data.totalCanceled  }}</span>
            </Chip>
          </template>
        </Column>
        <template #empty>
          <span v-if="!customersStatisticsStore.isLoading">Список записей пуст.</span>
        </template>
      </DataTable>
    </div>
  </div>
  <div class="col-12 xl:col-6">
    <div class="card">
      <div class="flex gap-2 align-items-start">
        <h5>Самые прибыльные клиенты</h5>
      </div>
      <DataTable
        :value="customersStatisticsStore.profitableCustomers"
        :rows="5"
        :paginator="customersStatisticsStore.profitableCustomers.length > 5"
        responsiveLayout="scroll"
        :loading="customersStatisticsStore.isLoading"
      >
        <Column header="Клиент" style="width: 35%">
          <template #body="slotProps">
            <CustomerChip
              :name="slotProps.data.customer.lastName + ' ' + slotProps.data.customer.firstName"
              :image="slotProps.data.customer?.image"
            />
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
        <Column header="Доля продаж за месяц" style="width: 35%; white-space: nowrap;">
          <template #body="slotsProps">
            <SalesShareLine
              :color="getColorsByNumber(slotsProps.index).color"
              :bg="getColorsByNumber(slotsProps.index).bg"
              :percent="slotsProps.data.totalRevenuePercent"
            />
          </template>
        </Column>
        <template #empty>
          <span v-if="!customersStatisticsStore.isLoading">Список записей пуст.</span>
        </template>
      </DataTable>
    </div>
  </div>
  <div class="col-12 xl:col-6">
    <div class="card">
      <div class="flex gap-2 align-items-start">
        <h5>Новых клиентов</h5>
      </div>
      <Chart type="doughnut" :height="300" :data="pieData" :options="pieOptions" :plugins="[plugin]"/>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss"></style>
