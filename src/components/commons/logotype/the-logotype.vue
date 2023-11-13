<script setup lang="ts"></script>

<template>
	<div class="logotype">
		<img class="logotype__img" src="@/assets/images/logo.svg" alt="" />
		<div class="logotype__name">Butterfly</div>
	</div>
</template>

<style scoped lang="scss">
	.logotype {
		display: flex;
		align-items: center;
		gap: 12px;

		&__img {}

		&__name {
			background-color: #509cf5;
			background-image: var(--theme-info-gradient-color);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			font-size: 24px;
			font-weight: 700;
		}
	}
</style>
