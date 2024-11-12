<script setup lang="ts">
import { ref } from 'vue'

import AppMenuItem from './AppMenuItem.vue'
import type { IMenuItem } from '@/shared/interfaces';

const model = ref<IMenuItem[]>([
  {
    label: 'Главная',
    items: [
      { label: 'Общая статистика', icon: 'pi pi-fw pi-th-large', to: '/' },
    ]
  },
  {
    label: 'Услуги',
    items: [
      { label: 'Обзор статистики', icon: 'pi pi-fw pi-chart-bar', to: '/products/overview', soon: false },
      { label: 'Список услуг', icon: 'pi pi-fw pi-list', to: '/products' },
    ]
  },
  {
    label: 'Клиенты',
    items: [
      { label: 'Обзор статистики', icon: 'pi pi-fw pi-chart-bar', to: '/customers/overview', soon: false },
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
  // {
  //   label: 'Расходы',
  //   items: [
  //     { label: 'Обзор статистики', icon: 'pi pi-fw pi-chart-bar', to: '/expenses/overview', soon: true },
  //     { label: 'Список расходов', icon: 'pi pi-fw pi-wallet', to: '/expenses', soon: true }
  //   ]
  // },
])
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item :item="item" :index="i"></app-menu-item>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
