<script setup lang="ts">
  import { DEFAULT_CUSTOMER_IMAGE } from '@/shared/constants';

  interface IProps {
    image?: string;
    name: string;
  }

  const props = withDefaults(defineProps<IProps>(), {
    image: DEFAULT_CUSTOMER_IMAGE
  });
</script>

<template>
  <Chip>
    <img :src="image" alt="">
    <span>{{ name }}</span>
  </Chip>
</template>

<style scoped lang="scss">

</style>