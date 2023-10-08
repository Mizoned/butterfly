<script setup lang="ts">
	interface IProps {
		modelValue: boolean;
	}

	interface IEmits {
		(event: 'update:modelValue', boolean: boolean): void;
	}

	withDefaults(defineProps<IProps>(), {
		modelValue: false
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
	</label>
</template>

<style scoped lang="scss">
	.base-switch {
		$root: #{&};
		position: relative;
		cursor: pointer;

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
	}
</style>
