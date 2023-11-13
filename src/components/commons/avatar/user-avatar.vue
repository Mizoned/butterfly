<script setup lang="ts">
	import { Ref, ref, watch } from 'vue';

	interface IProps {
		src?: string;
		size?: '2xl' | 'xl' | 'large' | 'base' | 'small' | 'extra-small';
		rounded?: boolean;
		indicator?: boolean;
		fullName?: string;
	}

	const props = withDefaults(defineProps<IProps>(), {
		src: '',
		size: 'base',
		rounded: false,
		indicator: false,
		fullName: ''
	});

	let path: Ref<string> = ref(props.src);

	watch(path, (newValue) => {
		path.value = newValue;
	});

	const loadingErrorHandler = (): void => {
		path.value = new URL('@/assets/images/user.jpg', import.meta.url).href;
	};
</script>

<template>
	<div
		:class="[
			'user-avatar',
			`user-avatar--${size}`,
			{ 'user-avatar--rounded': rounded },
			{ 'user-avatar--indicator': indicator },
			{ 'user-avatar--image': src }
		]"
	>
		<div class="user-avatar__indicator"></div>
		<div class="user-avatar__box">
			<img v-if="src" :src="path" alt="avatar" @error="loadingErrorHandler" />
			<div v-else class="user-avatar__username">{{ fullName }}</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.user-avatar {
		$root: #{&};
		position: relative;

		&__indicator {
			position: absolute;
			top: -3px;
			right: -3px;
			display: none;
			width: 27px;
			height: 27px;
			background-color: var(--theme-success-default-color);
			border: 3px solid var(--theme-white-color);
			border-radius: 100%;
		}

		&__box {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;
			border-radius: 14px;
			background-color: var(--theme-primary-default-color);
			overflow: hidden;

			img {
				display: block;
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		&__username {
			color: var(--theme-white-color);
		}

		&--2xl {
			width: 116px;
			height: 116px;

			#{$root}__username {
				font-size: var(--heading-1-size);
				font-weight: var(--font-weight-bold);
			}
		}

		&--xl {
			width: 82px;
			height: 82px;

			#{$root}__indicator {
				width: 21px;
				height: 21px;
			}

			&#{$root}--rounded {
				#{$root}__indicator {
					top: 1px;
					right: 1px;
				}
			}

			#{$root}__username {
				font-size: var(--heading-2-size);
				font-weight: var(--font-weight-semiBold);
			}
		}

		&--large {
			width: 64px;
			height: 64px;

			#{$root}__indicator {
				width: 18px;
				height: 18px;
			}

			&#{$root}--rounded {
				#{$root}__indicator {
					top: 0px;
					right: 0px;
				}
			}

			#{$root}__username {
				font-size: var(--heading-3-size);
				font-weight: var(--font-weight-semiBold);
			}
		}

		&--base {
			width: 46px;
			height: 46px;

			#{$root}__indicator {
				width: 14px;
				height: 14px;
				border-width: 2.5px;
			}

			&#{$root}--rounded {
				#{$root}__indicator {
					top: -1px;
					right: -1px;
				}
			}

			#{$root}__box {
				border-radius: 10px;
			}

			#{$root}__username {
				font-size: var(--heading-4-size);
				font-weight: var(--font-weight-semiBold);
			}
		}

		&--small {
			width: 36px;
			height: 36px;

			#{$root}__indicator {
				width: 10px;
				height: 10px;
				border-width: 2px;
			}

			&#{$root}--rounded {
				#{$root}__indicator {
					top: -1.5px;
					right: -1.5px;
				}
			}

			#{$root}__box {
				border-radius: 8px;
			}

			#{$root}__username {
				font-size: var(--base-text-size);
				font-weight: var(--font-weight-bold);
			}
		}

		&--extra-small {
			width: 24px;
			height: 24px;

			#{$root}__indicator {
				width: 8px;
				height: 8px;
				border-width: 2px;
			}

			&#{$root}--rounded {
				#{$root}__indicator {
					top: -2px;
					right: -2px;
				}
			}

			#{$root}__box {
				border-radius: 6px;
			}

			#{$root}__username {
				font-size: var(--small-text-size);
				font-weight: var(--font-weight-semiBold);
			}
		}

		&--rounded {
			#{$root}__indicator {
				top: 2px;
				right: 2px;
			}

			#{$root}__box {
				border-radius: 100%;
			}
		}

		&--indicator {
			#{$root}__indicator {
				display: block;
			}
		}

		&--image {
			#{$root}__box {
				background-color: transparent;
			}
		}
	}
</style>
