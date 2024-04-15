<script setup lang="ts">
import { useCustomersStore } from '@/stores/CustomersStore'
import { computed, ref, watch } from 'vue'
import { email as emailValidator, helpers, required } from '@vuelidate/validators'
import { VALIDATION_ERROR } from '@/shared/constants'
import { type ServerErrors, useVuelidate } from '@vuelidate/core'
import type { ICreateCustomer, ICustomer, ResponseError } from '@/shared/interfaces'
import { useToast } from 'primevue/usetoast'

const customersStore = useCustomersStore();
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

let $v = null;

watch(() => customersStore.isOpenEditCustomerDialog, (value: boolean) => {
  if (value) {
    $v = useVuelidate<ICustomer>(rules, customersStore.editCustomer, { $externalResults });
  } else {
    customersStore.editCustomer = null;
  }
});

const submitHandler = async () => {
  if (!(await $v.value.$validate())) return;

  await customersStore.updateCustomer()
    .then(() => {
      toast.add({ severity: 'success', summary: 'Успешно', detail: 'Клиент успешно обновлен', life: 3000 });
    })
    .catch((error) => {
      if (error.response.status === 500) {
        const message = error.response.data.message;
        toast.add({ severity: 'error', summary: 'Произошла ошибка', detail: message, life: 3000 });
      } else {
        const errors: ResponseError[] = error?.response?.data?.errors as ResponseError[];

        errors?.forEach((error: ResponseError) => {
          $externalResults.value[error.property] = error.message;
        });
      }
    });
}

const resetExternalResultProperty = (value: string | undefined, propertyName: keyof ICreateCustomer) => {
  if (value?.length > 0) {
    $externalResults.value[propertyName] = '';
  }
}
</script>

<template>
  <Dialog
    v-model:visible="customersStore.isOpenEditCustomerDialog"
    :style="{ width: '450px' }"
    header="Обновить клиента"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="name">Фамилия</label>
      <InputText
        v-model.trim="customersStore.editCustomer.lastName"
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
        v-model.trim="customersStore.editCustomer.firstName"
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
        v-model.trim="customersStore.editCustomer.fatherName"
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
        v-model.trim="customersStore.editCustomer.email"
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
        v-model="customersStore.editCustomer.mobilePhone"
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
        @click="customersStore.isOpenEditCustomerDialog = false"
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