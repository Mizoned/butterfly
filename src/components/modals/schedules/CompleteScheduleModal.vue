<script setup lang="ts">
  import { useToast } from 'primevue/usetoast';
  import { useScheduleStore } from '@/stores/ScheduleStore';

  const scheduleStore = useScheduleStore();
  const toast = useToast();

  const submitHandler = async () => {
    try {
      await scheduleStore.completeSchedule();
      toast.add({ severity: 'success', summary: 'Успешно', detail: 'Запись завершена', life: 3000 });
    } catch (e) {
      const message = e.response.data.message;
      toast.add({ severity: 'error', summary: 'Произошла ошибка', detail: message, life: 3000 });
    }
  }
</script>

<template>
  <Dialog v-model:visible="scheduleStore.isOpenCompleteScheduleDialog" :style="{ width: '450px' }" header="Подтвержение" :modal="true">
    <div class="flex align-items-center">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="scheduleStore.currentSchedule">
        Вы уверены, что хотите завершить зпись?
      </span>
    </div>
    <template #footer>
      <Button
        @click="scheduleStore.isOpenCompleteScheduleDialog = false"
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
        :loading="scheduleStore.isLoading"
      />
    </template>
  </Dialog>
</template>

<style scoped lang="scss"></style>