<script setup>
import { useLayout } from '@/layouts/composables/layout';
import { computed } from 'vue';

const { layoutConfig } = useLayout();

const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});
</script>

<template>
    <div class="layout-footer">
        <img src="@/assets/images/logo.svg" alt="Logo" height="20" class="mr-2" />
        <span class="font-medium" style="color: rgb(80, 156, 245);">Butterfly</span>
    </div>
</template>
<style lang="scss" scoped></style>
