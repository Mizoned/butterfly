<script setup lang="ts">
import { reactive, ref } from 'vue';
import StatisticCard from '@/components/cards/StatisticCard.vue';

const products = ref([
  {
    img: '',
    name: '',
    price: ''
  },
  {
    img: '',
    name: '',
    price: ''
  },
  {
    img: '',
    name: '',
    price: ''
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
const lineOptions = ref({});

const bestSellingProducts = ref([
  {
    bg: 'bg-orange-500',
    color: 'text-orange-500'
  },
  {
    bg: 'bg-cyan-500',
    color: 'text-cyan-500'
  },
  {
    bg: 'bg-pink-500',
    color: 'text-pink-500'
  },
  {
    bg: 'bg-green-500',
    color: 'text-green-500'
  },
  {
    bg: 'bg-purple-500',
    color: 'text-purple-500'
  },
  {
    bg: 'bg-teal-500',
    color: 'text-teal-500'
  }
]);
</script>

<template>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-4">
      <StatisticCard
        title="Заказы"
        number-title="152"
        icon="pi-shopping-cart"
        icon-color="blue"
        icon-background="blue"
        number="24"
        number-description="новых"
      />
    </div>
    <div class="col-12 lg:col-6 xl:col-4">
      <StatisticCard
        title="Доход"
        number-title="2 100 ₽"
        icon="pi-dollar"
        icon-color="orange"
        icon-background="orange"
        number="%52+"
        number-description="с прошлой недели"
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
          <h5>Недавние продажи</h5>
          <Tag value="Скоро" severity="secondary" />
        </div>

        <DataTable :value="products" :rows="5" :paginator="false" responsiveLayout="scroll">
          <Column header="Изображение" style="width: 25%">
            <template #body>
              <Skeleton></Skeleton>
              <!-- <img
                :src="'demo/images/product/' + slotProps.data.image"
                :alt="slotProps.data.image"
                width="50"
                class="shadow-2"
              /> -->
            </template>
          </Column>
          <Column field="name" header="Назавние" :sortable="true" style="width: 40%">
            <template #body>
              <Skeleton></Skeleton>
            </template>
          </Column>
          <Column field="price" header="Стоимость" :sortable="true" style="width: 35%">
            <template #body>
              <Skeleton></Skeleton>
            </template>
            <!-- <template #body="slotProps">
              {{ formatCurrency(slotProps.data.price) }}
            </template> -->
          </Column>
        </DataTable>
      </div>
      <div class="card">
        <div class="flex gap-2 align-items-start">
          <h5>Самые продаваемые продукты</h5>
          <Tag value="Скоро" severity="secondary" />
        </div>
        <ul class="list-none p-0 m-0">
          <li
            v-for="(product, index) in bestSellingProducts"
            :key="index"
            class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4"
          >
            <div>
              <Skeleton width="12rem" class="mr-2 mb-1 md:mb-0"></Skeleton>
              <Skeleton width="6rem" class="mt-1"></Skeleton>
              <!-- <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Space T-Shirt</span>
              <div class="mt-1 text-600">Clothing</div> -->
            </div>
            <div class="mt-2 md:mt-0 flex align-items-center">
              <div
                class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                style="height: 8px"
              >
                <Skeleton class="h-full"></Skeleton>
                <!-- <div :class="[product.bg, 'h-full']" style="width: 50%"></div> -->
              </div>
              <Skeleton width="2rem" class="ml-3"></Skeleton>
              <!-- <span :class="[product.color, 'ml-3 font-medium']">%50</span> -->
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-12 xl:col-6">
      <div class="card">
        <div class="flex gap-2 align-items-start">
          <h5>Обзор продаж</h5>
          <Tag value="Скоро" severity="secondary" />
        </div>
        <Chart type="line" :data="lineData" :options="lineOptions" />
      </div>
      <div class="card">
        <div class="flex gap-2 align-items-start">
          <h5>Уведомления</h5>
          <Tag value="Скоро" severity="secondary" />
        </div>
        <span class="block text-600 font-medium mb-3 text-uppercase">Сегодня</span>
        <ul class="p-0 mx-0 mt-0 mb-4 list-none">
          <li class="flex align-items-center py-2 border-bottom-1 surface-border">
            <div class="flex gap-3 align-items-center w-full">
                <Skeleton shape="circle" size="3rem" class="flex-shrink-0"></Skeleton>
                <Skeleton></Skeleton>
            </div>
            <!-- <div
              class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0"
            >
              <i class="pi pi-dollar text-xl text-blue-500"></i>
            </div>
            <span class="text-900 line-height-3">
              Ричард Джонс
              <span class="text-700"
                >купил синюю футболку за <span class="text-blue-500">79$</span></span
              >
            </span> -->
          </li>
          <li class="flex align-items-center py-2 border-bottom-1 surface-border">
            <div class="flex gap-3 align-items-center w-full">
                <Skeleton shape="circle" size="3rem" class="flex-shrink-0"></Skeleton>
                <Skeleton></Skeleton>
            </div>
          </li>
        </ul>

        <span class="block text-600 font-medium mb-3">Вчера</span>
        <ul class="p-0 m-0 list-none">
          <li class="flex align-items-center py-2 border-bottom-1 surface-border">
            <div class="flex gap-3 align-items-center w-full">
                <Skeleton shape="circle" size="3rem" class="flex-shrink-0"></Skeleton>
                <Skeleton></Skeleton>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
