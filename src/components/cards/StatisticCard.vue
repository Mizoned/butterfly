<script setup lang="ts">
enum IconBackground {
  red = 'bg-red-100',
  green = 'bg-green-100',
  blue = 'bg-blue-100',
  orange = 'bg-orange-100',
  cyan = 'bg-cyan-100',
  purple = 'bg-purple-100'
}

enum IconColor {
  red = 'text-red-500',
  green = 'text-green-500',
  blue = 'text-blue-500',
  orange = 'text-orange-500',
  cyan = 'text-cyan-500',
  purple = 'text-purple-500'
}

interface IProps {
  title: string;
  numberTitle: string | number;
  icon: string;
  iconColor?: keyof typeof IconColor;
  iconBackground?: keyof typeof IconBackground;
  number?: string | number;
  numberDescription: string;
  isLoading?: boolean;
}

withDefaults(defineProps<IProps>(), {
  iconColor: 'blue',
  iconBackground: 'blue',
  isLoading: false
});
</script>

<template>
  <Card class="relative">
    <div class="statistic-card">
      <div class="statistic-card__header">
        <div class="statistic-card__title">
          <div class="flex align-items-center gap-2">
            <span class="text-500 font-medium">{{ title }}</span>
            <Tag v-if="false" value="Скоро" severity="secondary" />
          </div>
          <Skeleton v-if="isLoading" height="1.4rem" class="mb-2"></Skeleton>
          <div v-else class="text-900 font-medium text-xl">{{ numberTitle }}</div>
        </div>
        <div class="statistic-card__icon border-round" :class="IconBackground[iconBackground]">
          <i class="pi text-xl" :class="[IconColor[iconColor], icon]"></i>
        </div>
      </div>
      <Skeleton v-if="isLoading" height="1rem" class="mb-2"></Skeleton>
      <div v-else class="statistic-card__footer">
        <span v-if="number" class="text-green-500 font-medium">{{ number }}</span>
        <span class="text-500">{{ numberDescription }}</span>
      </div>
    </div>
  </Card>
</template>

<style scoped lang="scss">
.statistic-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__header {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }

  &__title {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 2.5rem;
    height: 2.5rem;
  }

  &__footer {
    display: flex;
    gap: 0.25rem;
  }
}
</style>
