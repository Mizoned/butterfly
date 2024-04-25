<script setup lang="ts">
  import { useCustomersStore } from '@/stores/CustomersStore';
  import { computed, ref, watch } from 'vue';
  import { email as emailValidator, helpers, required } from '@vuelidate/validators';
  import { VALIDATION_ERROR } from '@/shared/constants';
  import { type ServerErrors, useVuelidate } from '@vuelidate/core';
  import type { ICreateCustomer, ResponseError } from '@/shared/interfaces';
  import { useToast } from 'primevue/usetoast';
import { AxiosError } from 'axios';

  const customerStore = useCustomersStore();
  const toast = useToast();

  const rules = computed(() => ({
    firstName: {
      required: helpers.withMessage(VALIDATION_ERROR.IS_NOT_EMPTY, required)
    },
    lastName: {
      required: helpers.withMessage(VALIDATION_ERROR.IS_NOT_EMPTY, required)
    },
    fatherName: {},
    mobilePhone: {
      required: helpers.withMessage(VALIDATION_ERROR.IS_NOT_EMPTY, required)
    },
    email: {
      email: helpers.withMessage(VALIDATION_ERROR.IS_EMAIL, emailValidator)
    },
  }));

  const $externalResults = ref<ServerErrors>({
    firstName: '',
    lastName: '',
    fatherName: '',
    mobilePhone: '',
    email: ''
  });

  const customerData = ref<ICreateCustomer>({
    firstName: '',
    lastName: '',
    fatherName: '',
    mobilePhone: '',
    email: ''
  });

  const $v = useVuelidate<ICreateCustomer>(rules, customerData, { $externalResults });

  const submitHandler = async () => {
    if (!(await $v.value.$validate())) return;

    await customerStore.createCustomer(customerData.value)
      .then(() => {
        toast.add({ severity: 'success', summary: 'Успешно', detail: 'Клиент успешно создан', life: 3000 });
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response?.status === 500) {
            const message = error.response?.data.message;
            toast.add({ severity: 'error', summary: 'Произошла ошибка', detail: message, life: 3000 });
          } else {
            const errors: ResponseError[] = error?.response?.data?.errors as ResponseError[];

            errors?.forEach((error: ResponseError) => {
              $externalResults.value[error.property] = error.message;
            });
          }
        }
      });
  }

  const resetExternalResultProperty = (value: string | undefined, propertyName: keyof ICreateCustomer) => {
    if (value && value.length > 0) {
      $externalResults.value[propertyName] = '';
    }
  }

  watch(() => customerStore.isOpenCreateCustomerDialog, (value: boolean) => {
    if (!value) {
      customerData.value = {
        firstName: '',
        lastName: '',
        fatherName: '',
        mobilePhone: '',
        email: ''
      }

      $v.value.$reset();
    }
  });
</script>

<template>
  <Dialog
    v-model:visible="customerStore.isOpenCreateCustomerDialog"
    :style="{ width: '450px' }"
    header="Создать клиента"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="name">Фамилия</label>
      <InputText
        v-model.trim="customerData.lastName"
        id="name"
        @blur="$v.lastName.$touch()"
        :invalid="$v.lastName.$invalid && $v.firstName.$error"
        @update:modelValue="resetExternalResultProperty($event, 'lastName')"
      />
      <small
        v-if="$v.lastName.$errors[0]?.$message"
        class="p-invalid p-error"
      >
        {{ $v.lastName.$errors[0]?.$message }}
      </small>
    </div>
    <div class="field">
      <label for="name">Имя</label>
      <InputText
        v-model.trim="customerData.firstName"
        id="name"
        @blur="$v.firstName.$touch()"
        :invalid="$v.firstName.$invalid && $v.firstName.$error"
        @update:modelValue="resetExternalResultProperty($event, 'firstName')"
      />
      <small
        v-if="$v.firstName.$errors[0]?.$message"
        class="p-invalid p-error"
      >
        {{ $v.firstName.$errors[0]?.$message }}
      </small>
    </div>
    <div class="field">
      <label for="name">Отчество</label>
      <InputText
        v-model.trim="customerData.fatherName"
        id="name"
        @blur="$v.fatherName.$touch()"
        :invalid="$v.fatherName.$invalid && $v.fatherName.$error"
        @update:modelValue="resetExternalResultProperty($event, 'fatherName')"
      />
      <small
        v-if="$v.fatherName.$errors[0]?.$message"
        class="p-invalid p-error"
      >
        {{ $v.fatherName.$errors[0]?.$message }}
      </small>
    </div>
    <div class="field">
      <label for="name">Email</label>
      <InputText
        v-model.trim="customerData.email"
        id="name"
        @blur="$v.email.$touch()"
        :invalid="$v.email.$invalid && $v.email.$error"
        @update:modelValue="resetExternalResultProperty($event, 'email')"
      />
      <small
        v-if="$v.email.$errors[0]?.$message"
        class="p-invalid p-error"
      >
        {{ $v.email.$errors[0]?.$message }}
      </small>
    </div>
    <div class="field">
      <label for="name">Телефон</label>
      <InputMask
        id="mobilePhone"
        v-model="customerData.mobilePhone"
        mask="+7 (999) 999-99-99"
        placeholder="+7 (999)-999-99-99"
        @blur="$v.mobilePhone.$touch()"
        :invalid="$v.mobilePhone.$invalid && $v.mobilePhone.$error"
        @update:modelValue="resetExternalResultProperty($event, 'mobilePhone')"
      />
      <small
        v-if="$v.mobilePhone.$errors[0]?.$message"
        class="p-invalid p-error"
      >
        {{ $v.mobilePhone.$errors[0]?.$message }}
      </small>
    </div>
    <template #footer>
      <Button
        label="Отменить"
        icon="pi pi-times"
        @click="customerStore.isOpenCreateCustomerDialog = false"
        severity="danger"
      />
      <Button
        label="Сохранить"
        icon="pi pi-check"
        @click="submitHandler"
      />
    </template>
  </Dialog>
</template>

<style scoped lang="scss"></style>