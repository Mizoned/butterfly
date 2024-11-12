<script setup lang="ts">
import { formatToCurrency, getColorsByNumber, plural } from '@shared/utils';
import { onMounted, reactive, ref } from 'vue';
import type { ChartData, ChartOptions } from 'chart.js';
import { useProductsStatisticsStore } from '@stores/statistics/ProductsStatisticsStore';
import SalesShareLine from '@/components/statistics/SalesShareLine.vue';

const productsStatisticsStore = useProductsStatisticsStore();

const lineData = reactive<ChartData<'line', number[], number>>({
  labels: [],
  datasets: [
    {
      data: [],
      fill: false,
      backgroundColor: '#d0e1fd',
      borderColor: '#3b82f6',
      tension: 0.4,
    },
  ],
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
          return `Количество: ${tooltipItem.raw}`;
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
      }
    }
  },
  responsive: true
});

onMounted(async () => {
  await productsStatisticsStore.getOverviewStatistics();

  lineData.labels = productsStatisticsStore.servicesCountPerDay.map((p) => p.day);
  lineData.datasets[0].data = productsStatisticsStore.servicesCountPerDay.map((p) => p.count);
  lineOptions.value.scales.y.suggestedMax = Math.max(...lineData.datasets[0].data) * 1.1;
});
</script>

<template>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-4">
      <StatisticCard
        title="Всего услуг"
        :number-title="productsStatisticsStore.totalProducts.totalCount"
        icon="pi-star"
        icon-color="blue"
        icon-background="blue"
        :number="String(productsStatisticsStore.totalProducts.newTotalCount)"
        :number-description="plural(['новая', 'новых', 'новых'], productsStatisticsStore.totalProducts.newTotalCount) + ' в этом месяце'"
        :is-loading="productsStatisticsStore.isLoading"
      />
    </div>
    <div class="col-12 lg:col-6 xl:col-4">
      <StatisticCard
        title="Популярная услуга"
        :number-title="productsStatisticsStore.popularProduct.name"
        icon="pi-star-fill"
        icon-color="orange"
        icon-background="orange"
        :number="productsStatisticsStore.popularProduct.count"
        number-description="раз заказывали в этом месяце"
        :is-loading="productsStatisticsStore.isLoading"
      />
    </div>
    <div class="col-12 lg:col-12 xl:col-4">
      <StatisticCard
        title="Прибыльная услуга"
        :number-title="productsStatisticsStore.profitableProduct.name"
        icon="pi-dollar"
        icon-color="cyan"
        icon-background="cyan"
        :number="formatToCurrency(productsStatisticsStore.profitableProduct.income)"
        number-description="в этом месяце"
        :is-loading="productsStatisticsStore.isLoading"
      />
    </div>
    <div class="col-12 xl:col-6">
      <div class="card">
        <div class="flex gap-2 align-items-start">
          <h5>Самые продаваемые услуги</h5>
        </div>
        <DataTable
          :value="productsStatisticsStore.profitableProducts"
          :rows="5"
          :paginator="true"
          responsiveLayout="scroll"
          :loading="productsStatisticsStore.isLoading"
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
        </DataTable>
      </div>
    </div>
    <div class="col-12 xl:col-6">
      <div class="card">
        <div class="flex gap-2 align-items-start">
          <h5>Количество оказанных услуг</h5>
        </div>
        <Chart
          type="line"
          :data="lineData"
          :options="lineOptions"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>