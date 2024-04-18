<script setup>
import { ref } from 'vue'

import AppMenuItem from './AppMenuItem.vue'

const model = ref([
  {
    label: 'Главная',
    items: [
      { label: 'Общая статистика', icon: 'pi pi-fw pi-th-large', to: '/' },
    ]
  },
  {
    label: 'Услуги',
    items: [
      { label: 'Обзор статистики', icon: 'pi pi-fw pi-chart-bar', to: '/products/overview' },
      { label: 'Список услуг', icon: 'pi pi-fw pi-list', to: '/products' },
    ]
  },
  {
    label: 'Клиенты',
    icon: 'pi pi-fw pi-users',
    to: '/customers',
    items: [
      { label: 'Обзор статистики', icon: 'pi pi-fw pi-chart-bar', to: '/customers/overview' },
      { label: 'Список клиентов', icon: 'pi pi-fw pi-users', to: '/customers' },
    ]
  },
  {
    label: 'Журнал записей',
    items: [
      { label: 'Расписание записей', icon: 'pi pi-fw pi-calendar-clock', to: '/schedule' },
      { label: 'Завершенные записи', icon: 'pi pi-fw pi-calendar-plus', to: '/schedule/completed' },
      { label: 'Отмененные записи', icon: 'pi pi-fw pi-calendar-times', to: '/schedule/canceled' }
    ]
  },
  {
    label: 'Расходы',
    items: [
      { label: 'Обзор статистики', icon: 'pi pi-fw pi-chart-bar', to: '/expenses/overview' },
      { label: 'Список расходов', icon: 'pi pi-fw pi-wallet', to: '/expenses' },
    ]
  },
])
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
    <li>
      <a href="https://www.primefaces.org/primeblocks-vue/#/" target="_blank">
        <!--                <img src="/layouts/images/banner-primeblocks.png" alt="Prime Blocks" class="w-full mt-3" />-->
      </a>
    </li>
  </ul>
</template>

<style lang="scss" scoped></style>
