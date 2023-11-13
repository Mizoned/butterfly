<script setup lang="ts">
	interface IProps {
		to: string;
	}

	defineProps<IProps>();
</script>

<template>
	<router-link :to="to" class="nav-link" exact-active-class="nav-link--active">
		<span class="nav-link__icon">
			<slot name="icon" />
		</span>
		<span class="nav-link__text">Test</span>
	</router-link>
</template>

<style scoped lang="scss">
	.nav-link {
		$root: #{&};
		position: relative;
		display: flex;
		align-items: center;
		gap: 20px;
		padding: 16px 24px;
		font-size: 14px;
		font-weight: 600;
		text-decoration: none;
		color: var(--text-body-light-color);

		&__icon {
			display: flex;
			color: var(--gray-500-color);
		}

		&--active {
			color: var(--theme-primary-default-color);

			#{$root}__icon {
				color: var(--theme-primary-default-color);
			}

			&:before {
				position: absolute;
				content: '';
				width: 2px;
				height: 24px;
				top: 50%;
				left: 0;
				transform: translateY(-50%);
				background-color: var(--theme-primary-default-color);
			}
		}
	}
</style>
