<script setup lang="ts">
	interface IProps {
		modelValue: boolean;
		label?: string;
	}

	interface IEmits {
		(event: 'update:modelValue', boolean: boolean): void;
	}

	withDefaults(defineProps<IProps>(), {
		modelValue: false,
		label: ''
	});

	const emit = defineEmits<IEmits>();

	const changeHandler = (event: Event): void => {
		emit('update:modelValue', (event.target as HTMLInputElement).checked);
	};
</script>

<template>
	<label class="base-switch">
		<input
			class="base-switch__input"
			v-bind="$attrs"
			:checked="modelValue"
			@change="changeHandler"
			type="checkbox"
		/>
		<span class="base-switch__box"></span>
		<span v-if="label.length" class="base-switch__label">{{ label }}</span>
	</label>
</template>

<style scoped lang="scss">
	.base-switch {
		$root: #{&};
		position: relative;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 12px;

		&__input {
			appearance: none;
			position: absolute;
			width: 0;
			height: 0;

			&:checked + #{$root}__box {
				background-color: var(--theme-primary-default-color);

				&:before {
					transform: translate(18px, -50%);
				}
			}
		}

		&__box {
			position: relative;
			display: inline-flex;
			background-color: var(--theme-secondary-default-color);
			border-radius: 100px;
			transition: background-color var(--transition-duration);
			width: 40px;
			height: 22px;

			&:before {
				content: '';
				position: absolute;
				width: 16px;
				height: 16px;
				top: 50%;
				left: 3px;
				border-radius: 100%;
				background-color: var(--theme-white-color);
				transform: translateY(-50%);
				transition: transform var(--transition-duration);
			}
		}

		&__label {
			color: var(--theme-dark-default-color);
			font-weight: var(--font-weight-medium);
			font-size: var(--large-text-size);
			transition: color var(--transition-duration);
		}
	}
</style>
