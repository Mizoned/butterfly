<script setup>
import { ref } from 'vue'

import AppMenuItem from './AppMenuItem.vue'

const model = ref([
  {
    label: '',
    items: [
      { label: 'Главная', icon: 'pi pi-fw pi-th-large', to: '/' },
      { label: 'Услуги', icon: 'pi pi-fw pi-star', to: '/products' },
      { label: 'Клиенты', icon: 'pi pi-fw pi-users', to: '/customers' },
      { label: 'Журнал записей', icon: 'pi pi-fw pi-calendar', to: '/calendar' },
      { label: 'Расходы', icon: 'pi pi-fw pi-wallet', to: '/expenses' }
    ]
  }
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
