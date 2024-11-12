<script setup lang="ts">
interface IProps {
  color: string;
  bg: string;
  percent: number;
}

defineProps<IProps>();
</script>

<template>
  <div class="sales-share-line">
    <div class="sales-share-line__line">
      <div :class="bg" :style="[`width: ${ percent }%;`]"></div>
    </div>
    <span :class="[color, 'sales-share-line__number']">{{ percent }}%</span>
  </div>
</template>

<style scoped lang="scss">
.sales-share-line {
  display: grid;
  align-items: center;
  gap: 1rem;
  grid-template-columns: 1fr 0.5fr;

  &__line {
    width: 100%;
    height: 0.5rem;
    background-color: var(--surface-300);
    border-radius: var(--border-radius);
    overflow: hidden;

    div {
      height: 0.5rem;
    }
  }

  &__number {
    font-weight: 500;
  }
}
</style>