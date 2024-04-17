<script setup lang="ts">
  interface IProps {
    slots: Array<string>,
    loading: boolean,
    itemClass?: string
  }

  const props = defineProps<IProps>();
</script>

<template>
  <Skeleton v-if="loading" height="1.75rem"></Skeleton>
  <Carousel
    v-else
    :value="slots"
    :numVisible="2"
    :numScroll="1"
    :show-indicators="false"
    content-class="justify-content-center"
    container-class="align-items-center gap-2"
    :prev-button-props="{ class: 'm-0' }"
    :next-button-props="{ class: 'm-0' }"
  >
    <template #item="slotProps">
      <Chip :class="itemClass" class="white-space-nowrap" :label="slotProps.data"/>
    </template>
    <template #empty>
      <span class="font-semibold">Свободных слотов нет</span>
    </template>
  </Carousel>
</template>