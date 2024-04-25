<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useLayout } from '@/layouts/composables/layout';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore';
import { useUserStore } from '@/stores/UserStore'

const authStore = useAuthStore();
const userStore = useUserStore();

const { onMenuToggle } = useLayout();
const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const router = useRouter();

onMounted(() => {
	bindOutsideClickListener()
})

onBeforeUnmount(() => {
	unbindOutsideClickListener()
  window.removeEventListener('resize', onResize);
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
		document.removeEventListener('click', outsideClickListener.value)
		outsideClickListener.value = null
	}
}
const isOutsideClicked = (event) => {
	if (!topbarMenuActive.value) return

	const sidebarEl = document.querySelector('.layout-topbar-menu')
	const topbarEl = document.querySelector('.layout-topbar-menu-button')

	return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target))
}

const windowWidth = ref<number>(window.innerWidth);

const onResize = () => {
  windowWidth.value = window.innerWidth;
}

window.addEventListener('resize', onResize);

const isMobile = computed(() => {
  return !(windowWidth.value > 991);
})

const op = ref(null);

const toggle = (event) => {
  if (!isMobile.value) {
    op.value.toggle(event);
  }
};

const logoutHandler  = async () => {
  await authStore.logout();
  await router.push({ name: 'signIn'});
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

      <router-link to="/notifications" class="p-link layout-topbar-button" @click="onTopBarMenuButton">
        <i class="pi pi-bell" />
        <span>Уведомления</span>
      </router-link>

      <router-link
        v-if="isMobile"
        to="/settings"
        class="p-link layout-topbar-button"
        @click="toggle, onTopBarMenuButton()"
      >
        <i class="pi pi-cog"></i>
        <span>Настройки</span>
      </router-link>

      <Button
        v-if="isMobile"
        @click="logoutHandler"
        class="p-link layout-topbar-button layout-topbar-logout-button"
        label="Выйти"
        icon="pi pi-sign-out"
        text
        severity="danger"
      />

      <Button
        v-if="!isMobile"
        class="p-link layout-topbar-button"
        text
        @click="toggle($event), onTopBarMenuButton()"
        severity="secondary"
      >
        <i class="pi pi-user"></i>
        <span>{{ userStore.fullName ?? userStore.user?.email ?? '' }}</span>
      </Button>
      <OverlayPanel ref="op" appendTo="body">
        <div class="flex flex-column">
          <router-link
            @click="toggle"
            to="/settings"
            class="p-link layout-topbar-button"
          >
            <Button
              type="button"
              text
              label="Настройки"
              severity="secondary"
              icon="pi pi-cog"
            />
          </router-link>
          <Button
            class="p-link layout-topbar-button"
            @click="logoutHandler"
            type="button"
            text
            label="Выйти"
            severity="danger"
            icon="pi pi-sign-out"/>
        </div>
      </OverlayPanel>
    </div>
	</div>
</template>

<style lang="scss" scoped></style>
