<script setup lang="ts">
import { reactive, ref } from 'vue';
import StatisticCard from '@/components/cards/StatisticCard.vue';
import CustomerChip from '@/components/customers/CustomerChip.vue';
import { calculateTotalCostProducts } from '@shared/utils';

const products = ref([
  {
    firstName: 'Валерий',
    lastName: 'Щербинин',
    timeStart: '10:00',
    timeEnd: '12:00',
    total: 1000
  },
  {
    firstName: 'Владислав',
    lastName: 'Щербинин',
    timeStart: '14:00',
    timeEnd: '15:00',
    total: 1267
  },
  {
    firstName: 'Семен',
    lastName: 'Шмаков',
    timeStart: '17:00',
    timeEnd: '18:00',
    total: 3567
  }
]);
const lineData = reactive({
  labels: Array.from({length: new Date().getDate()}, (_, i) => i + 1),
  datasets: [
    {
      label: 'Март',
      data: [6559, 4539, 10559, 3659, 6559, 456, 123, 2539, 4586, 5674, 2315, 12356, 250, 698, 6559, 4539, 10559, 3659, 6559, 0, 0, 2539, 4586, 5674, 2315, 12356, 777, 898, 6559, 4539],
      fill: false,
      backgroundColor: '#feddc7',
      borderColor: '#f97316',
      tension: 0.4
    },
    {
      label: 'Апрель',
      data: [7559, 14539, 8559, 9659, 5559, 156, 923, 9539, 3586, 9674, 1315, 15356, 1250, 3698, 12559, 3539, 7559, 7659, 8559, 1230, 5550, 2539, 4586, 8674, 4315, 14356, 7777, 2898, 16559, 3539],
      fill: false,
      backgroundColor: '#d0e1fd',
      borderColor: '#3b82f6',
      tension: 0.4
    }
  ]
});
const pieData = reactive({
  labels: ['Депиляция зоны лица', 'Депиляция зоны рук', 'Депиляция ног', 'Депиляция зоны бикини'],
  datasets: [
    {
      data: [6559, 7381, 4506, 2346],
      backgroundColor: ['#fef9c3', '#dbeafe', '#fee2e2', '#dcfce7'],
      borderColor: ['#facc15', '#60a5fa', '#f87171', '#4ade80']
    }
  ]
});
const pieOptions = ref({
  labels: {
    display: false
  },
  responsive: true,
});
const barData = reactive({
  labels: ['Март', 'Апрель', 'Май', 'Июнь', 'Июль'],
  datasets: [
    {
      label: 'Завершенные записи',
      data: [38, 24, 18, 14, 31],
      backgroundColor: ['#60a5fa'],
    },
    {
      label: 'Отмененные записи',
      data: [11, 5, 8, 4, 8],
      backgroundColor: ['#f87171'],
    }
  ]
});
let delayed: boolean;

const barOptions = ref({
  indexAxis: 'y',
  responsive: true,
});
// 100, 400
//backgroundColor: ['#fef9c3', '#dbeafe', '#fee2e2', '#dcfce7', '#ffedd5']
//borderColor: ['#facc15', '#60a5fa', '#f87171', '#4ade80', '#fb923c']
const lineOptions = ref({});

const bestSellingProducts = ref([
  {
    name: 'Депиляция зоны лица',
    percent: 50,
    total: 5533,
    bg: 'bg-orange-500',
    color: 'text-orange-500'
  },
  {
    name: 'Депиляция зоны рук',
    percent: 30,
    total: 4533,
    bg: 'bg-cyan-500',
    color: 'text-cyan-500'
  },
  {
    name: 'Депиляция зоны ног',
    percent: 10,
    total: 3533,
    bg: 'bg-pink-500',
    color: 'text-pink-500'
  },
  {
    name: 'Депиляция зоны бикини',
    percent: 10,
    total: 3533,
    bg: 'bg-green-500',
    color: 'text-green-500'
  },
  // {
  //   bg: 'bg-purple-500',
  //   color: 'text-purple-500'
  // },
  // {
  //   bg: 'bg-teal-500',
  //   color: 'text-teal-500'
  // }
]);
</script>

<template>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-4">
      <StatisticCard
        title="Записи"
        number-title="152"
        icon="pi-book"
        icon-color="blue"
        icon-background="blue"
        number="24"
        number-description="в этом месяце"
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
        title="Клиенты"
        number-title="28441"
        icon="pi-users"
        icon-color="cyan"
        icon-background="cyan"
        number="520"
        number-description="новых созданных"
      />
    </div>

    <div class="col-12 xl:col-6">
      <div class="card">
        <div class="flex gap-2 align-items-start">
          <h5>Записи на сегодня</h5>
<!--          <Tag value="Скоро" severity="secondary" />-->
        </div>

        <DataTable :value="products" :rows="5" :paginator="false" responsiveLayout="scroll">
          <Column header="Клиент" style="width: 40%">
            <template #body="slotProps">
              <CustomerChip
                :name="slotProps.data.lastName + ' ' + slotProps.data.firstName"
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
                  {{ slotsProps.data.total.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' }) }}
                </span>
              </Chip>
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="card">
        <div class="flex gap-2 align-items-start">
          <h5>Самые продаваемые услуги</h5>
        </div>
        <DataTable :value="bestSellingProducts" :rows="5" :paginator="false" responsiveLayout="scroll">
          <Column header="Название" style="width: 35%">
            <template #body="slotProps">
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0">{{ slotProps.data.name }}</span>
            </template>
          </Column>
          <Column header="Прибыль" style="width: 30%">
            <template #body="slotsProps">
              <Chip class="border-round">
                <span class="font-semibold">
                  {{ slotsProps.data.total.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' }) }}
                </span>
              </Chip>
            </template>
          </Column>
          <Column header="Доля продаж за месяц" style="width: 35%">
            <template #body="slotsProps">
              <div class="mt-1 flex align-items-center justify-content-end">
                <div
                  class="surface-300 border-round overflow-hidden w-12"
                  style="height: 8px"
                >
                  <div :class="[slotsProps.data.bg, 'h-full']" :style="[`width: ${slotsProps.data.percent}%;`]"></div>
                </div>
                <span :class="[slotsProps.data.color, 'ml-3 font-medium']">{{ slotsProps.data.percent }}%</span>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
<!--      <div class="card">-->
<!--        <div class="flex gap-2 align-items-start">-->
<!--          <h5>Отмененные и завершенные записи</h5>-->
<!--        </div>-->
<!--        <Chart type="bar" :data="barData" />-->
<!--      </div>-->
<!--      <div class="card">-->
<!--        <div class="flex gap-2 align-items-start">-->
<!--          <h5>Отмененные и завершенные записи</h5>-->
<!--        </div>-->
<!--        <Chart type="bar" :data="barData" :options="barOptions" />-->
<!--      </div>-->
    </div>
    <div class="col-12 xl:col-6">
      <div class="card">
        <div class="flex gap-2 align-items-start">
          <h5>Обзор продаж</h5>
        </div>
        <Chart type="line" :data="lineData" :options="lineOptions" />
      </div>
<!--      <div class="card">-->
<!--        <div class="flex gap-2 align-items-start">-->
<!--          <h5>Прибыль по услугам</h5>-->
<!--          &lt;!&ndash;          <Tag value="Скоро" severity="secondary" />&ndash;&gt;-->
<!--        </div>-->
<!--        <Chart type="pie" :data="pieData" :options="pieOptions" />-->
<!--      </div>-->
<!--      <div class="card">-->
<!--        <div class="flex gap-2 align-items-start">-->
<!--          <h5>Уведомления</h5>-->
<!--          <Tag value="Скоро" severity="secondary" />-->
<!--        </div>-->
<!--        <span class="block text-600 font-medium mb-3 text-uppercase">Сегодня</span>-->
<!--        <ul class="p-0 mx-0 mt-0 mb-4 list-none">-->
<!--          <li class="flex align-items-center py-2 border-bottom-1 surface-border">-->
<!--            <div class="flex gap-3 align-items-center w-full">-->
<!--                <Skeleton shape="circle" size="3rem" class="flex-shrink-0"></Skeleton>-->
<!--                <Skeleton></Skeleton>-->
<!--            </div>-->
<!--            &lt;!&ndash; <div-->
<!--              class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0"-->
<!--            >-->
<!--              <i class="pi pi-dollar text-xl text-blue-500"></i>-->
<!--            </div>-->
<!--            <span class="text-900 line-height-3">-->
<!--              Ричард Джонс-->
<!--              <span class="text-700"-->
<!--                >купил синюю футболку за <span class="text-blue-500">79$</span></span-->
<!--              >-->
<!--            </span> &ndash;&gt;-->
<!--          </li>-->
<!--          <li class="flex align-items-center py-2 border-bottom-1 surface-border">-->
<!--            <div class="flex gap-3 align-items-center w-full">-->
<!--                <Skeleton shape="circle" size="3rem" class="flex-shrink-0"></Skeleton>-->
<!--                <Skeleton></Skeleton>-->
<!--            </div>-->
<!--          </li>-->
<!--        </ul>-->

<!--        <span class="block text-600 font-medium mb-3">Вчера</span>-->
<!--        <ul class="p-0 m-0 list-none">-->
<!--          <li class="flex align-items-center py-2 border-bottom-1 surface-border">-->
<!--            <div class="flex gap-3 align-items-center w-full">-->
<!--                <Skeleton shape="circle" size="3rem" class="flex-shrink-0"></Skeleton>-->
<!--                <Skeleton></Skeleton>-->
<!--            </div>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </div>-->
    </div>
  </div>
</template>
