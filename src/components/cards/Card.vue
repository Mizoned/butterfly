<template>
  <div class="card">
    <slot />
  </div>
</template>

<style scoped lang="scss">
  @import "src/assets/styles/layout/_variables.scss";

  .card {
    background: var(--surface-card);
    border: 1px solid var(--surface-border);
    padding: 2rem;
    box-shadow: var(--card-shadow);
    border-radius: $borderRadius;
  }
</style>