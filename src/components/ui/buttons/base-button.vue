<script setup lang="ts">
	type Colors =
		| 'primary'
		| 'secondary'
		| 'tertiary'
		| 'success'
		| 'warning'
		| 'info'
		| 'danger'
		| 'neutral';

	type Size = 'large' | 'base' | 'small';

	type Variants = 'solid' | 'outline' | 'dashed' | 'icon';

	type IconHand = 'left' | 'right';

	interface IProps {
		color?: Colors;
		size?: Size;
		variant?: Variants;
		iconHand?: IconHand;
		useIcon?: boolean;
		rounded?: boolean;
		label?: string;
	}

	withDefaults(defineProps<IProps>(), {
		color: 'primary',
		size: 'base',
		variant: 'solid',
		iconHand: 'right',
		useIcon: false,
		rounded: false,
		label: ''
	});

	interface IEmits {
		(event: 'click'): Event;
	}

	const emit = defineEmits<IEmits>();

	const clickHandler = (): void => {
		emit('click');
	};
</script>

<template>
	<button
		:class="[
			'base-button',
			`base-button--${color}`,
			`base-button--${size}`,
			`base-button--${variant}`,
			{ 'base-button--rounded': rounded }
		]"
		@click="clickHandler"
	>
		{{ label }}
	</button>
</template>

<style scoped lang="scss">
	.base-button {
		$root: #{&};
		border: 1px solid transparent;
		border-radius: 6px;
		transition: all var(--transition-duration);
		cursor: pointer;

		&:disabled {
			opacity: 0.5;
			pointer-events: none;
		}

		&--primary {
			background-color: var(--theme-primary-default-color);
			color: var(--theme-white-color);
			border-color: var(--theme-primary-default-color);

			&:hover {
				background-color: var(--theme-primary-dark-color);
				border-color: var(--theme-primary-dark-color);
			}

			&#{$root}--outline,
			&#{$root}--dashed {
				color: var(--theme-primary-default-color);

				&:hover {
					color: var(--theme-white-color);
					background-color: var(--theme-primary-default-color);
					border-color: var(--theme-primary-default-color);
				}
			}
		}

		&--secondary {
			background-color: var(--theme-secondary-default-color);
			color: var(--theme-dark-light-color);

			&:hover {
				background-color: var(--theme-secondary-dark-color);
				color: var(--theme-white-color);
			}

			&#{$root}--outline,
			&#{$root}--dashed {
				color: var(--theme-dark-light-color);
				border-color: var(--theme-secondary-default-color);

				&:hover {
					background-color: var(--theme-secondary-default-color);
					border-color: var(--theme-secondary-default-color);
				}
			}
		}

		&--tertiary {
			background-color: var(--theme-tertiary-default-color);
			color: var(--theme-white-color);

			&:hover {
				background-color: var(--theme-tertiary-dark-color);
			}

			&#{$root}--outline,
			&#{$root}--dashed {
				color: var(--theme-tertiary-default-color);
				border-color: var(--theme-tertiary-default-color);

				&:hover {
					background-color: var(--theme-tertiary-default-color);
					color: var(--theme-white-color);
				}
			}
		}

		&--success {
			background-color: var(--theme-success-default-color);
			color: var(--theme-white-color);

			&:hover {
				background-color: var(--theme-success-dark-color);
			}

			&#{$root}--outline,
			&#{$root}--dashed {
				color: var(--theme-success-default-color);
				border-color: var(--theme-success-default-color);

				&:hover {
					background-color: var(--theme-success-default-color);
					color: var(--theme-white-color);
				}
			}
		}

		&--warning {
			background-color: var(--theme-warning-default-color);
			color: var(--theme-white-color);

			&:hover {
				background-color: var(--theme-warning-dark-color);
			}

			&#{$root}--outline,
			&#{$root}--dashed {
				color: var(--theme-warning-default-color);
				border-color: var(--theme-warning-default-color);

				&:hover {
					background-color: var(--theme-warning-default-color);
					color: var(--theme-white-color);
				}
			}
		}

		&--info {
			background-color: var(--theme-info-default-color);
			color: var(--theme-white-color);

			&:hover {
				background-color: var(--theme-info-dark-color);
			}

			&#{$root}--outline,
			&#{$root}--dashed {
				color: var(--theme-info-default-color);
				border-color: var(--theme-info-default-color);

				&:hover {
					background-color: var(--theme-info-default-color);
					color: var(--theme-white-color);
				}
			}
		}

		&--danger {
			background-color: var(--theme-danger-default-color);
			color: var(--theme-white-color);

			&:hover {
				background-color: var(--theme-danger-dark-color);
				color: var(--theme-white-color);
			}

			&#{$root}--outline,
			&#{$root}--dashed {
				color: var(--theme-danger-default-color);
				border-color: var(--theme-danger-default-color);

				&:hover {
					background-color: var(--theme-danger-default-color);
					color: var(--theme-white-color);
				}
			}
		}

		&--neutral {
			background-color: var(--theme-white-color);
			color: var(--theme-dark-default-color);
			box-shadow:
				0px 3px 8px -1px rgba(50, 50, 71, 0.05),
				0px 0px 1px 0px rgba(12, 26, 75, 0.24);

			&:hover {
				background-color: var(--border-light-color);
			}

			&#{$root}--outline,
			&#{$root}--dashed {
				border-color: var(--border-light-color);
				box-shadow: unset;

				&:hover {
					border-color: var(--theme-dark-default-color);
				}
			}
		}

		&--large {
			font-size: var(--large-button-size);
			font-weight: var(--font-weight-semiBold);
			line-height: 1;
			padding: 15px 23px;
		}

		&--base {
			font-size: var(--base-button-size);
			font-weight: var(--font-weight-semiBold);
			line-height: 1;
			padding: 11px 19px;
		}

		&--small {
			font-size: var(--small-button-size);
			font-weight: var(--font-weight-semiBold);
			line-height: 1;
			letter-spacing: -0.05px;
			padding: 7px 15px;
		}

		&--outline,
		&--dashed {
			background-color: transparent;
		}

		&--dashed {
			border-style: dashed;
		}

		&--rounded {
			border-radius: 100px;
		}

		&--icon {
			padding: 13px;
		}
	}
</style>
