<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');

</script>

<template>
  <div class="surface-ground flex align-items-center justify-content-center min-h-screen overflow-hidden p-4">
    <div class="flex flex-column align-items-center justify-content-center">
      <div class="flex align-items-center justify-content-center gap-3 font-medium mb-5" style="color: #509cf5">
        <img src="@/assets/images/logo.svg" alt="Butterfly logo" class="w-4rem flex-shrink-0" />
        <span class="text-4xl">Butterfly</span>
      </div>
      <div class="auth-form" style="">
        <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
          <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">Добро пожаловать!</div>
            <span class="text-600 font-medium">Зарегистрируйтесь чтобы продолжить</span>
          </div>
          <div class="mb-3">
            <label for="email1" class="block text-900 text-lg font-medium mb-2">Email</label>
            <InputText id="email1" type="text" placeholder="Электронный адрес" class="w-full lg:w-30rem mb-5" style="padding: 1rem" v-model="email" />
            <label for="password1" class="block text-900 font-medium text-lg mb-2">Пароль</label>
            <Password id="password1" v-model="password" placeholder="Пароль" :toggleMask="true" class="w-full mb-5" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>
            <Button label="Создать аккаунт" class="w-full p-3 text-lg"></Button>
          </div>
          <div class="flex flex-column align-items-center justify-content-center">
            <span class="text-600 font-medium mb-2">Уже зарегистрированы?</span>
            <RouterLink to="sign-in" class="text-blue-500">Войти в аккаунт</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-form {
  border-radius: 56px;
  padding: 0.3rem;
  background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)
}
</style>
