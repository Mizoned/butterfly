<script setup lang="ts">
  import { useCustomersStore } from '@/stores/CustomersStore';
  import { computed } from 'vue';
  import { useToast } from 'primevue/usetoast';

  const customersStore = useCustomersStore();
  const toast = useToast();

  const fullName = computed<string>(() => {
    if (!customersStore.currentCustomer.firstName || !customersStore.currentCustomer.lastName) return '';
    return ' ' + customersStore.currentCustomer.firstName + ' ' + customersStore.currentCustomer.lastName;
  });

  const submitHandler = async () => {
    try {
      await customersStore.deleteCustomer();
      toast.add({ severity: 'success', summary: 'Успешно', detail: 'Клиент удален', life: 3000 });
    } catch (e) {
      const message = e.response.data.message;
      toast.add({ severity: 'error', summary: 'Произошла ошибка', detail: message, life: 3000 });
    }
  }
</script>

<template>
  <Dialog v-model:visible="customersStore.isOpenDeleteCustomerDialog" :style="{ width: '450px' }" header="Подтвержение" :modal="true">
    <div class="flex align-items-center">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="customersStore.currentCustomer">
        Вы уверены, что хотите удалить<b>{{ fullName }}</b>?
      </span>
    </div>
    <template #footer>
      <Button
        @click="customersStore.isOpenDeleteCustomerDialog = false"
        label="Нет"
        icon="pi pi-times text-red"
        text
      />
      <Button
        @click="submitHandler"
        label="Да"
        icon="pi pi-check"
        text
        severity="danger"
        :loading="customersStore.isLoading"
      />
    </template>
  </Dialog>
</template>

<style scoped lang="scss">

</style>