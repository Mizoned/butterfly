<script setup>
import { reactive, ref } from 'vue'
import StatisticCard from '@/components/cards/StatisticCard.vue'

const products = ref(null)
const lineData = reactive({
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: '#2f4860',
      borderColor: '#2f4860',
      tension: 0.4
    },
    {
      label: 'Second Dataset',
      data: [28, 48, 40, 19, 86, 27, 90],
      fill: false,
      backgroundColor: '#00bb7e',
      borderColor: '#00bb7e',
      tension: 0.4
    }
  ]
})
const lineOptions = ref(null)

const formatCurrency = (value) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}
</script>

<template>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-3">
      <StatisticCard
        title="Заказы"
        :number-title="152"
        icon="pi-shopping-cart"
        icon-color="blue"
        icon-background="blue"
        :number="24"
        number-description="новых"
      />
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <StatisticCard
        title="Доход"
        number-title="2 100 ₽"
        icon="pi-map-marker"
        icon-color="orange"
        icon-background="orange"
        number="%52+"
        number-description="с прошлой недели"
      />
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <StatisticCard
        title="Клиенты"
        number-title="28441"
        icon="pi-inbox"
        icon-color="cyan"
        icon-background="cyan"
        number="520"
        number-description="новых созданных"
      />
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <StatisticCard
        title="Комментарии"
        number-title="152 непрочитанных"
        icon="pi-comment"
        icon-color="purple"
        icon-background="purple"
        number="85"
        number-description="отвеченных"
      />
    </div>

    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>Недавние продажи</h5>
        <DataTable :value="products" :rows="5" :paginator="true" responsiveLayout="scroll">
          <Column style="width: 25%">
            <template #header>Изображение</template>
            <template #body="slotProps">
              <img :src="'demo/images/product/' + slotProps.data.image" :alt="slotProps.data.image" width="50"
                   class="shadow-2" />
            </template>
          </Column>
          <Column field="name" header="Назавние" :sortable="true" style="width: 40%"></Column>
          <Column field="price" header="Стоимость" :sortable="true" style="width: 35%">
            <template #body="slotProps">
              {{ formatCurrency(slotProps.data.price) }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="card">
        <h5>Самые продаваемые продукты</h5>
        <ul class="list-none p-0 m-0">
          <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Space T-Shirt</span>
              <div class="mt-1 text-600">Clothing</div>
            </div>
            <div class="mt-2 md:mt-0 flex align-items-center">
              <div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height: 8px">
                <div class="bg-orange-500 h-full" style="width: 50%"></div>
              </div>
              <span class="text-orange-500 ml-3 font-medium">%50</span>
            </div>
          </li>
          <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Portal Sticker</span>
              <div class="mt-1 text-600">Accessories</div>
            </div>
            <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
              <div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height: 8px">
                <div class="bg-cyan-500 h-full" style="width: 16%"></div>
              </div>
              <span class="text-cyan-500 ml-3 font-medium">%16</span>
            </div>
          </li>
          <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Supernova Sticker</span>
              <div class="mt-1 text-600">Accessories</div>
            </div>
            <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
              <div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height: 8px">
                <div class="bg-pink-500 h-full" style="width: 67%"></div>
              </div>
              <span class="text-pink-500 ml-3 font-medium">%67</span>
            </div>
          </li>
          <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Wonders Notebook</span>
              <div class="mt-1 text-600">Office</div>
            </div>
            <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
              <div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height: 8px">
                <div class="bg-green-500 h-full" style="width: 35%"></div>
              </div>
              <span class="text-green-500 ml-3 font-medium">%35</span>
            </div>
          </li>
          <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Mat Black Case</span>
              <div class="mt-1 text-600">Accessories</div>
            </div>
            <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
              <div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height: 8px">
                <div class="bg-purple-500 h-full" style="width: 75%"></div>
              </div>
              <span class="text-purple-500 ml-3 font-medium">%75</span>
            </div>
          </li>
          <li class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
            <div>
              <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Robots T-Shirt</span>
              <div class="mt-1 text-600">Clothing</div>
            </div>
            <div class="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
              <div class="surface-300 border-round overflow-hidden w-10rem lg:w-6rem" style="height: 8px">
                <div class="bg-teal-500 h-full" style="width: 40%"></div>
              </div>
              <span class="text-teal-500 ml-3 font-medium">%40</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>Обзор продаж</h5>
        <Chart type="line" :data="lineData" :options="lineOptions" />
      </div>
      <div class="card">
        <h5>Уведомления</h5>
        <span class="block text-600 font-medium mb-3 text-uppercase">Сегодня</span>
        <ul class="p-0 mx-0 mt-0 mb-4 list-none">
          <li class="flex align-items-center py-2 border-bottom-1 surface-border">
            <div
              class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
              <i class="pi pi-dollar text-xl text-blue-500"></i>
            </div>
            <span class="text-900 line-height-3">
                          Ричард Джонс
                            <span class="text-700">купил синюю футболку за <span class="text-blue-500">79$</span></span>
                        </span>
          </li>
        </ul>

        <span class="block text-600 font-medium mb-3">Вчера</span>
        <ul class="p-0 m-0 list-none">
          <li class="flex align-items-center py-2 border-bottom-1 surface-border">
            <div
              class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
              <i class="pi pi-dollar text-xl text-blue-500"></i>
            </div>
            <span class="text-900 line-height-3"
            >Кейзер Уик
                            <span class="text-700">купил черную куртку за <span class="text-blue-500">59$</span></span>
                        </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
