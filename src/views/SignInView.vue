<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/AuthStore.js'

const email = ref<string>('');
const password = ref<string>('');

const authStore = useAuthStore();

const submitHandler = async () => {
  await authStore.signIn(email.value, password.value);
}
</script>

<template>
  <div class="surface-ground flex align-items-center justify-content-center min-h-screen overflow-hidden p-4">
    <div class="flex flex-column align-items-center justify-content-center">
      <div class="flex align-items-center justify-content-center gap-3 font-medium mb-5" style="color: #509cf5">
        <img src="@/assets/images/logo.svg" alt="Butterfly logo" class="w-4rem flex-shrink-0" />
        <span class="text-4xl">Butterfly</span>
      </div>
      <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
        <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
          <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">Добро пожаловать!</div>
            <span class="text-600 font-medium">Авторизайтесь чтобы продолжить</span>
          </div>
          <div class="mb-3">
            <label for="email1" class="block text-900 text-lg font-medium mb-2">Email</label>
            <InputText id="email1" type="text" placeholder="Электронный адрес" class="w-full lg:w-30rem mb-5" style="padding: 1rem" v-model="email" />
            <label for="password1" class="block text-900 font-medium text-lg mb-2">Пароль</label>
            <Password id="password1" v-model="password" placeholder="Пароль" :toggleMask="true" class="w-full mb-5" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>
            <Button @click="submitHandler" label="Войти" class="w-full p-3 text-lg"></Button>
          </div>
          <div class="flex flex-column align-items-center justify-content-center">
            <span class="text-600 font-medium mb-2">У вас ещё нет аккаунта?</span>
            <RouterLink to="sign-up" class="text-blue-500">Зарегистрируйтесь бесплатно</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>
