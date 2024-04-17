<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import { helpers, required } from '@vuelidate/validators'
  import { VALIDATION_ERROR } from '@/shared/constants'
  import { type ServerErrors, useVuelidate } from '@vuelidate/core'
  import type { ICreateProduct, IProduct, ResponseError } from '@/shared/interfaces'
  import { useToast } from 'primevue/usetoast'
  import { useProductsStore } from '@/stores/ProductsStore'

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

  let $v = null;

  watch(() => productStore.isOpenEditProductDialog, (value: boolean) => {
    if (value) {
      $v = useVuelidate<IProduct>(rules, productStore.editProduct, { $externalResults });
    } else {
      productStore.editProduct = null;
    }
  });

  const submitHandler = async () => {
    if (!(await $v.value.$validate())) return;

    await productStore.updateProduct()
      .then(() => {
        toast.add({ severity: 'success', summary: 'Успешно', detail: 'Услуга успешно обновлена', life: 3000 });
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
</script>

<template>
  <Dialog
    v-model:visible="productStore.isOpenEditProductDialog"
    :style="{ width: '450px' }"
    header="Обновить клиента"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="name">Название</label>
      <InputText
        v-model.trim="productStore.editProduct.name"
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
        v-model.trim="productStore.editProduct.price"
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
        @click="productStore.isOpenEditProductDialog = false"
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