<script setup lang="ts">
	interface IProps {
		modelValue: boolean;
		label?: string;
	}

	interface IEmits {
		(event: 'update:modelValue', boolean: boolean): void;
	}

	withDefaults(defineProps<IProps>(), {
		name: '',
		label: ''
	});

	const emit = defineEmits<IEmits>();

	const updateHandler = (event: Event): void => {
		emit('update:modelValue', (event.target as HTMLInputElement).checked);
	};
</script>

<template>
	<label class="base-checkbox">
		<input
			class="base-checkbox__input"
			@v-bind="$attrs"
			:checked="modelValue"
			@input="updateHandler"
			type="checkbox"
		/>
		<span class="base-checkbox__box"></span>
		<span v-if="label.length" class="base-checkbox__label">{{ label }}</span>
	</label>
</template>

<style scoped lang="scss">
	.base-checkbox {
		$root: #{&};

		position: relative;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 10px;

		&__input {
			appearance: none;
			position: absolute;
			width: 0;
			height: 0;

			&:checked + #{$root}__box {
				background-color: var(--theme-primary-default-color);
				border-color: var(--theme-primary-default-color);

				&:after {
					opacity: 1;
					visibility: visible;
				}
			}

			&:checked ~ #{$root}__label {
				color: var(--theme-dark-default-color);
			}
		}

		&__box {
			position: relative;
			display: inline-flex;
			justify-content: center;
			align-items: center;
			width: 20px;
			height: 20px;
			border: 2px solid var(--surface-light-color);
			border-radius: 4px;
			transition:
				background-color var(--transition-duration),
				border-color var(--transition-duration);

			&::after {
				content: '';
				position: absolute;
				top: -2px;
				left: -2px;
				width: 20px;
				height: 20px;
				background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMy44MTQxIDYuMjkyODlDMTQuMjA0NyA1LjkwMjM3IDE0LjgzNzggNS45MDIzNyAxNS4yMjg0IDYuMjkyODlDMTUuNjE4OSA2LjY4MzQyIDE1LjYxODkgNy4zMTY1OCAxNS4yMjg0IDcuNzA3MTFMOS4yMjgzNiAxMy43MDcxQzguODM3ODMgMTQuMDk3NiA4LjIwNDY3IDE0LjA5NzYgNy44MTQxNCAxMy43MDcxTDUuMjkyODkgMTEuMTg1OUM0LjkwMjM3IDEwLjc5NTMgNC45MDIzNyAxMC4xNjIyIDUuMjkyODkgOS43NzE2NEM1LjY4MzQyIDkuMzgxMTIgNi4zMTY1OCA5LjM4MTEyIDYuNzA3MTEgOS43NzE2NEw4LjUyMTI1IDExLjU4NThMMTMuODE0MSA2LjI5Mjg5WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==);
				opacity: 0;
				visibility: hidden;
				transition:
					opacity var(--transition-duration),
					visibility var(--transition-duration);
				background-position: center;
			}
		}

		&__label {
			color: var(--text-body-light-color);
			font-weight: var(--font-weight-medium);
			transition: color var(--transition-duration);
		}

		&:hover {
			#{$root}__box {
				border-color: var(--theme-primary-default-color);
			}
		}
	}
</style>
