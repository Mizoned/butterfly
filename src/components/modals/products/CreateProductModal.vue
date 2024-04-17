<script setup lang="ts">
import { computed, ref, watch } from 'vue'
  import { helpers, required } from '@vuelidate/validators';
  import { VALIDATION_ERROR } from '@/shared/constants';
  import { type ServerErrors, useVuelidate } from '@vuelidate/core'
import type { ICreateProduct, ResponseError } from '@/shared/interfaces'
  import { useToast } from 'primevue/usetoast';
  import { useProductsStore } from '@/stores/ProductsStore';

  const productStore = useProductsStore();
  const toast = useToast();

  const rules = computed(() => ({
    name: {
      required: helpers.withMessage(VALIDATION_ERROR.IS_NOT_EMPTY, required)
    },
    price: {
      required: helpers.withMessage(VALIDATION_ERROR.IS_NOT_EMPTY, required)
    }
  }));

  const $externalResults = ref<ServerErrors>({
    name: '',
    price: ''
  });

  const productData = ref<ICreateProduct>({
    name: '',
    price: 0
  });

  const $v = useVuelidate<ICreateProduct>(rules, productData, { $externalResults });

  const submitHandler = async () => {
    if (!(await $v.value.$validate())) return;

    await productStore.createProduct(productData.value)
      .then(() => {
        toast.add({ severity: 'success', summary: 'Успешно', detail: 'Услуга успешно создана', life: 3000 });
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

  const resetExternalResultProperty = (value: string | number, propertyName: keyof ICreateProduct) => {
    if (
      (typeof value === 'string' && value?.length > 0)
      || (typeof value === 'number' && value >= 0)
    ) {
      $externalResults.value[propertyName] = '';
    }
  }

  watch(() => productStore.isOpenCreateProductDialog, (value: boolean) => {
    if (!value) {
      productData.value = {
        name: '',
        price: 0
      }

      $v.value.$reset();
    }
  });
</script>

<template>
  <Dialog
    v-model:visible="productStore.isOpenCreateProductDialog"
    :style="{ width: '450px' }"
    header="Создать клиента"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="name">Название</label>
      <InputText
        v-model.trim="productData.name"
        id="name"
        @blur="$v.name.$touch()"
        :invalid="$v.name.$invalid && $v.name.$error"
        @update:modelValue="resetExternalResultProperty($event, 'name')"
      />
      <small
        v-if="$v.name.$errors[0]?.$message"
        class="p-invalid p-error"
      >
        {{ $v.name.$errors[0]?.$message }}
      </small>
    </div>
    <div class="field">
      <label for="name">Стоимость</label>
      <InputNumber
        v-model.trim="productData.price"
        id="name"
        @blur="$v.price.$touch()"
        currency="RUB"
        mode="currency"
        :invalid="$v.price.$invalid && $v.price.$error"
        @update:modelValue="resetExternalResultProperty($event, 'price')"
      />
      <small
        v-if="$v.price.$errors[0]?.$message"
        class="p-invalid p-error"
      >
        {{ $v.price.$errors[0]?.$message }}
      </small>
    </div>
    <template #footer>
      <Button
        label="Отменить"
        icon="pi pi-times"
        @click="productStore.isOpenCreateProductDialog = false"
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