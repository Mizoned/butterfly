<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import { useUserStore } from '@/stores/UserStore';

  const userStore = useUserStore();

  let accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    userStore.me();
  }
</script>

<template>
  <div
    v-if="userStore.isLoadingMe"
    class="app-loading bg-white flex justify-content-center align-items-center gap-2"
  >
    <div class="flex align-items-center">
      <img src="@/assets/images/logo.svg" alt="logo" />
      <span class="font-medium" style="color: rgb(80, 156, 245);">Butterfly</span>
    </div>
    <i class="flex pi pi-spin pi-spinner" style="font-size: 1.5rem; color: rgb(80, 156, 245);"></i>
  </div>
  <RouterView v-else />
</template>

<style scoped lang="scss">
  .app-loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    font-size: 1.5rem;

    img {
      height: 3.5rem;
      margin-right: 0.5rem;
    }
  }
</style>
