<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useLayout } from '@/layouts/composables/layout'
import { useRouter } from 'vue-router'

const { onMenuToggle } = useLayout()

const outsideClickListener = ref(null)
const topbarMenuActive = ref(false)
const router = useRouter()

onMounted(() => {
	bindOutsideClickListener()
})

onBeforeUnmount(() => {
	unbindOutsideClickListener()
})

const onTopBarMenuButton = () => {
	topbarMenuActive.value = !topbarMenuActive.value
}

const topbarMenuClasses = computed(() => {
	return {
		'layout-topbar-menu-mobile-active': topbarMenuActive.value
	}
})

const bindOutsideClickListener = () => {
	if (!outsideClickListener.value) {
		outsideClickListener.value = (event) => {
			if (isOutsideClicked(event)) {
				topbarMenuActive.value = false
			}
		}
		document.addEventListener('click', outsideClickListener.value)
	}
}
const unbindOutsideClickListener = () => {
	if (outsideClickListener.value) {
		document.removeEventListener('click', outsideClickListener)
		outsideClickListener.value = null
	}
}
const isOutsideClicked = (event) => {
	if (!topbarMenuActive.value) return

	const sidebarEl = document.querySelector('.layout-topbar-menu')
	const topbarEl = document.querySelector('.layout-topbar-menu-button')

	return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target))
}
</script>

<template>
	<div class="layout-topbar">
		<router-link to="/" class="layout-topbar-logo">
			<img src="@/assets/images/logo.svg" alt="logo" />
			<span style="color: rgb(80, 156, 245);">Butterfly</span>
		</router-link>

		<button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
			<i class="pi pi-bars"></i>
		</button>

		<button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
			<i class="pi pi-ellipsis-v"></i>
		</button>

		<div class="layout-topbar-menu" :class="topbarMenuClasses">
      <router-link to="/notifications" class="p-link layout-topbar-button" @click="onTopBarMenuButton()">
        <i class="pi pi-bell"></i>
        <span>Уведомления</span>
      </router-link>

      <router-link to="/calendar" class="p-link layout-topbar-button" @click="onTopBarMenuButton()">
        <i class="pi pi-calendar"></i>
        <span>Журнал записей</span>
      </router-link>

      <router-link to="/settings" class="p-link layout-topbar-button" @click="onTopBarMenuButton()">
        <i class="pi pi-user"></i>
        <span>Имя пользователя</span>
      </router-link>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>