<script setup lang="ts">
  import { computed, type ComputedRef, ref, watch } from 'vue';
  import { helpers, required } from '@vuelidate/validators';
  import { VALIDATION_ERROR } from '@/shared/constants';
  import { type ServerErrors, useVuelidate } from '@vuelidate/core';
  import type { ICreateSchedule, ICustomer, IProduct, ResponseError } from '@/shared/interfaces';
  import { useToast } from 'primevue/usetoast';
  import { useScheduleStore } from '@/stores/ScheduleStore';
  import InputIcon from 'primevue/inputicon';
  import CustomerChip from '@/components/customers/CustomerChip.vue';
  import { createDateWithTime, plural } from '@/shared/utils';
  import FreeTimeSlots from '@/components/schedules/FreeTimeSlots.vue';
  import { isDate } from '@/shared/validators';

  const scheduleStore = useScheduleStore()
  const toast = useToast()

  const rules = computed(() => ({
    date: {
      required: helpers.withMessage(VALIDATION_ERROR.IS_NOT_EMPTY, required),
      date: helpers.withMessage(VALIDATION_ERROR.IS_DATE, isDate)
    },
    timeStart: {
      required: helpers.withMessage(VALIDATION_ERROR.IS_NOT_EMPTY, required),
      date: helpers.withMessage(VALIDATION_ERROR.IS_TIME, isDate)
    },
    timeEnd: {
      required: helpers.withMessage(VALIDATION_ERROR.IS_NOT_EMPTY, required),
      date: helpers.withMessage(VALIDATION_ERROR.IS_TIME, isDate)
    },
    customerId: {
      required: helpers.withMessage(VALIDATION_ERROR.IS_NOT_EMPTY, required)
    },
    products: {
      required: helpers.withMessage(VALIDATION_ERROR.IS_NOT_EMPTY, required)
    }
  }))

  const $externalResults = ref<ServerErrors>({
    date: '',
    timeStart: '',
    timeEnd: '',
    customerId: '',
    products: ''
  })

  const scheduleData = ref<ICreateSchedule>({
    date: null,
    timeStart: null,
    timeEnd: null,
    customerId: null,
    products: []
  })

  const selectedCustomer: ComputedRef<ICustomer | null> = computed(() => {
    if (scheduleData.value.customerId) {
      return scheduleStore.customers.find((c) => c.id === scheduleData.value.customerId);
    } else {
      return null;
    }
  });

  let $v = useVuelidate<ICreateSchedule>(rules, scheduleData, { $externalResults });

  const showDialogHandler = async () => {
    await scheduleStore.getAllProducts();
    await scheduleStore.getAllCustomers();
    await scheduleStore.getFreeTimeSlots(new Date(scheduleStore.editSchedule.date));

    scheduleData.value = {
      date: new Date(scheduleStore.editSchedule.date),
      timeStart: createDateWithTime(scheduleStore.editSchedule.timeStart),
      timeEnd: createDateWithTime(scheduleStore.editSchedule.timeEnd),
      customerId: scheduleStore.editSchedule.customerId,
      products: scheduleStore.editSchedule.products.map((p) => ({ id: p.id, quantity: p.additional.quantity }))
    }
  }

  const hideDialogHandler = () => {
    scheduleStore.editSchedule = null;

    scheduleData.value = {
      date: null,
      timeStart: null,
      timeEnd: null,
      customerId: null,
      products: []
    }

    $v.value.$reset();
  }

  const submitHandler = async () => {
    if (!(await $v.value.$validate())) return;

    await scheduleStore.updateSchedule({ ...scheduleData.value })
      .then(() => {
        toast.add({ severity: 'success', summary: 'Успешно', detail: 'Запись успешно обновлена', life: 3000 })
      })
      .catch((error) => {
        if (error.response.status === 500) {
          const message = error.response.data.message
          toast.add({ severity: 'error', summary: 'Произошла ошибка', detail: message, life: 3000 })
        } else {
          const errors: ResponseError[] = error?.response?.data?.errors as ResponseError[]

          errors?.forEach((error: ResponseError) => {
            $externalResults.value[error.property] = error.message
          });
        }
      });
  }

  const resetExternalResultProperty = (propertyName: keyof ICreateSchedule) => {
    $externalResults.value[propertyName] = ''
  }

  watch(() => scheduleData.value.date, async (value: Date) => {
    if (scheduleStore.isOpenCreateScheduleDialog) {
      await scheduleStore.getFreeTimeSlots(value);
    }
  });
</script>

<template>
  <Dialog
    v-model:visible="scheduleStore.isOpenEditScheduleDialog"
    :style="{ width: '450px' }"
    @show="showDialogHandler"
    @afterHide="hideDialogHandler"
    header="Обновить запись"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="date">Дата приема</label>
      <Calendar
        id="date"
        v-model.trim="scheduleData.date"
        @dateSelect="$v.date.$touch()"
        :invalid="$v.date.$invalid && $v.date.$error"
        hide-on-date-time-select
        @update:modelValue="resetExternalResultProperty('date')"
        showIcon
        iconDisplay="input"
        :min-date="new Date()"
        date-format="dd.mm.yy"
      />
      <small
        v-if="$v.date.$errors[0]?.$message"
        class="p-invalid p-error"
      >
        {{ $v.date.$errors[0]?.$message }}
      </small>
    </div>
    <div v-if="scheduleData.date" class="field">
      <label for="freeSlots">Свободные слоты</label>
      <FreeTimeSlots id="freeSlots" item-class="flex justify-content-center m-1" :slots="scheduleStore.freeTimeSlots"
                     :loading="scheduleStore.isLoadingSlots" />
    </div>
    <div class="field">
      <label for="timeStart">Начало приема</label>
      <Calendar
        id="timeStart"
        v-model="scheduleData.timeStart"
        showIcon iconDisplay="input"
        timeOnly
        placeholder="10:00"
        @dateSelect="$v.timeStart.$touch()"
        :invalid="$v.timeStart.$invalid && $v.timeStart.$error"
        @update:modelValue="resetExternalResultProperty('timeStart')"
      >
        <template #inputicon="{ clickCallback }">
          <InputIcon class="pi pi-clock cursor-pointer" @click="clickCallback" />
        </template>
      </Calendar>
      <small
        v-if="$v.timeStart.$errors[0]?.$message"
        class="p-invalid p-error"
      >
        {{ $v.timeStart.$errors[0]?.$message }}
      </small>
    </div>
    <div class="field">
      <label for="name">Окончание приема</label>
      <Calendar
        v-model="scheduleData.timeEnd"
        showIcon
        iconDisplay="input"
        timeOnly
        placeholder="20:00"
        @dateSelect="$v.timeEnd.$touch()"
        :invalid="$v.timeEnd.$invalid && $v.timeEnd.$error"
        @update:modelValue="resetExternalResultProperty('timeEnd')"
      >
        <template #inputicon="{ clickCallback }">
          <InputIcon class="pi pi-clock cursor-pointer" @click="clickCallback" />
        </template>
      </Calendar>
      <small
        v-if="$v.timeEnd.$errors[0]?.$message"
        class="p-invalid p-error"
      >
        {{ $v.timeEnd.$errors[0]?.$message }}
      </small>
    </div>
    <div class="field">
      <label for="customerId">Клиент</label>
      <Dropdown
        @beforeShow="scheduleStore.getAllCustomers()"
        :loading="scheduleStore.isLoadingCustomers"
        v-model="scheduleData.customerId"
        :options="scheduleStore.customers"
        filter
        id="customerId"
        optionLabel="lastName"
        placeholder="Выберите клиента"
        optionValue="id"
        class="w-full"
        @change="$v.customerId.$touch()"
        :invalid="$v.customerId.$invalid && $v.customerId.$error"
        @update:modelValue="resetExternalResultProperty('customerId')"
      >
        <template #value="slotProps">
          <div v-if="slotProps.value && selectedCustomer" class="flex align-items-center">
            <div>{{ selectedCustomer.lastName + ' ' + selectedCustomer.firstName }}</div>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <template #option="slotProps">
          <div class="flex align-items-center">
            <CustomerChip :name="slotProps.option.lastName + ' ' + slotProps.option.firstName" />
          </div>
        </template>
        <template #empty>
          Список пуст
        </template>
        <template #emptyfilter>
          Нет результатов
        </template>
      </Dropdown>
      <small
        v-if="$v.customerId.$errors[0]?.$message"
        class="p-invalid p-error"
      >
        {{ $v.customerId.$errors[0]?.$message }}
      </small>
    </div>
    <div class="field">
      <label for="products">Услуги</label>
      <MultiSelect
        @beforeShow="scheduleStore.getAllProducts()"
        v-model="scheduleData.products"
        :options="scheduleStore.products"
        filter
        id="products"
        optionLabel="name"
        placeholder="Выберите услуги"
        :maxSelectedLabels="3"
        class="w-full"
        :option-value="(product: IProduct) => {
          return { id: product.id, quantity: 1 }
        }"
        :loading="scheduleStore.isLoadingProducts"
        @change="$v.products.$touch()"
        :invalid="$v.products.$invalid && $v.products.$error"
        @update:modelValue="resetExternalResultProperty('products')"
      >
        <template #empty>
          Список пуст
        </template>
        <template #emptyfilter>
          Нет результатов
        </template>
        <template #value="slotProps">
          <div v-if="slotProps.value.length" class="flex align-items-center">
            <div>{{ plural(['Выбрана', 'Выбрано', 'Выбрано'], slotProps.value.length) }} {{ slotProps.value.length }}
              {{ plural(['услуга', 'услуги', 'услуг'], slotProps.value.length) }}
            </div>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
      </MultiSelect>
      <small
        v-if="$v.products.$errors[0]?.$message"
        class="p-invalid p-error"
      >
        {{ $v.products.$errors[0]?.$message }}
      </small>
    </div>
    <template #footer>
      <Button
        label="Отменить"
        icon="pi pi-times"
        @click="scheduleStore.isOpenEditScheduleDialog = false"
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