<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore.js';
import { useVuelidate } from '@vuelidate/core';
import { required, email as emailValidator, minLength, maxLength, helpers } from '@vuelidate/validators';
import { VALIDATION_ERROR } from '@/shared/constants'
import type { ResponseError } from '@/shared/interfaces'

const email = ref<string>('');
const password = ref<string>('');

const authStore = useAuthStore();
const router = useRouter();

const rules = computed(() => ({
  email: {
    required: helpers.withMessage(VALIDATION_ERROR.IS_NOT_EMPTY, required),
    email: helpers.withMessage(VALIDATION_ERROR.IS_EMAIL, emailValidator)
  },
  password: {
    required: helpers.withMessage(VALIDATION_ERROR.IS_NOT_EMPTY, required),
    minLength: helpers.withMessage(VALIDATION_ERROR.IS_PASSWORD_MIN_LENGTH, minLength(8)),
    maxLength: helpers.withMessage(VALIDATION_ERROR.IS_PASSWORD_MAX_LENGTH, maxLength(32))
  }
}));

interface ExternalResults {
  email: string;
  password: string;
}

const $externalResults = ref<ExternalResults>({
  email: '',
  password: ''
});

const $v = useVuelidate(rules, { email, password }, { $externalResults });

const submitHandler = async () => {
  if (!(await $v.value.$validate())) return;

  await authStore.signIn(email.value, password.value)
    .then(() => {
      router.push({ name: 'dashboard' })
    })
    .catch((e) => {
      const errors: ResponseError[] = e?.response?.data?.errors as ResponseError[];
      errors?.forEach((error: ResponseError) => {
        $externalResults.value[error.property] = error.message;
      });
    });
}

const resetExternalResultProperty = (value: string | undefined, propertyName: keyof ExternalResults) => {
  if (value?.length > 0) {
    $externalResults.value[propertyName] = '';
  }
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
            <div class="flex flex-column gap-2 mb-5">
              <label for="email" class="block text-900 text-lg font-medium">Email</label>
              <InputText
                id="email1"
                type="text"
                placeholder="Электронный адрес"
                class="w-full lg:w-30rem"
                style="padding: 1rem"
                v-model="email"
                @blur="$v.email.$touch()"
                :invalid="$v.email.$invalid && $v.email.$error"
                @update:modelValue="resetExternalResultProperty($event, 'email')"
              />
              <small
                v-if="$v.email?.$errors[0]?.$message"
                id="email-help"
                class="p-error"
              >
                {{ $v.email?.$errors[0]?.$message }}
              </small>
            </div>
            <div class="flex flex-column gap-2 mb-5">
              <label for="password" class="block text-900 font-medium text-lg">Пароль</label>
              <Password
                id="password"
                v-model="password"
                placeholder="Пароль"
                toggleMask
                :feedback="false"
                class="w-full"
                aria-describedby="password-help"
                inputClass="w-full"
                :inputStyle="{ padding: '1rem' }"
                @blur="$v.password.$touch()"
                @update:modelValue="resetExternalResultProperty($event, 'password')"
                :invalid="$v.password.$invalid && $v.password.$error"
              />
              <small
                v-if="$v.password?.$errors[0]?.$message"
                id="password-help"
                class="p-error"
              >
                {{ $v.password?.$errors[0]?.$message }}
              </small>
            </div>

            <Button
              @click="submitHandler"
              label="Войти"
              class="w-full p-3 text-lg"
              :loading="authStore.isLoading"
              :disabled="($v.email.$invalid && $v.email.$error) || ($v.password.$invalid && $v.password.$error)"
            />
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

<style scoped></style>
