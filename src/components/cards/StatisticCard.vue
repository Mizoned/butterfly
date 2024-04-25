<script setup lang="ts">
enum IconBackground {
  blue = 'bg-blue-100',
  orange = 'bg-orange-100',
  cyan = 'bg-cyan-100',
  purple = 'bg-purple-100'
}

enum IconColor {
  blue = 'text-blue-500',
  orange = 'text-orange-500',
  cyan = 'text-cyan-500',
  purple = 'text-purple-500'
}

interface IProps {
  title: string,
  numberTitle: string,
  icon: string,
  iconColor?: IconColor,
  iconBackground?: IconBackground,
  number?: string,
  numberDescription: string
}

withDefaults(defineProps<IProps>(), {
    iconColor: IconColor.blue,
    iconBackground: IconBackground.blue
  });
</script>

<template>
  <Card>
    <div class="statistic-card">
      <div class="statistic-card__header">
        <div class="statistic-card__title">
          <div class="text-500 font-medium">{{ title }}</div>
          <div class="text-900 font-medium text-xl">{{ numberTitle }}</div>
        </div>
        <div class="statistic-card__icon border-round" :class="IconBackground[iconBackground]">
          <i class="pi text-xl" :class="[IconColor[iconColor], icon]"></i>
        </div>
      </div>
      <div class="statistic-card__footer">
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
    gap: 1rem
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
    gap: 0.25rem
  }
}
</style>