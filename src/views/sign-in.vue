<template>
	<div class="authorization">
		<div class="authorization__main">
			<div class="authorization__logo">
				<the-logotype />
			</div>
			<div class="authorization__header">
				<div class="authorization__title">Sign in your account</div>
				<div class="authorization__description">Let's build someting great</div>
			</div>
			<div class="authorization__form">
				<a-form
					:model="formState"
					layout="vertical"
					name="basic"
					autocomplete="off"
					@finish="onFinish"
					@finishFailed="onFinishFailed"
				>
					<a-form-item label="E-mail" name="username" :rules="[]">
						<a-input
							v-model:value="formState.email"
							size="large"
							placeholder="Type your e-mail"
						/>
					</a-form-item>

					<a-form-item label="Password" name="password" :rules="[]">
						<a-input-password
							v-model:value="formState.password"
							size="large"
							placeholder="Type your password"
						/>
					</a-form-item>

					<a-form-item>
						<a-button type="primary" html-type="submit" size="large" block>
							Sign in
						</a-button>
					</a-form-item>
				</a-form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { reactive } from 'vue';
	import TheLogotype from '@/components/commons/logotype/the-logotype.vue';

	interface FormState {
		email: string;
		password: string;
		remember: boolean;
	}

	const formState = reactive<FormState>({
		email: '',
		password: '',
		remember: true
	});
	const onFinish = (values: any) => {
		console.log('Success:', values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};
</script>

<style scoped lang="scss">
	.authorization {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		min-height: 100vh;
		padding: 12px;
		background-color: var(--theme-white-color);

		&__main {
			display: flex;
			flex-direction: column;
			justify-content: center;
			gap: 30px;
			width: 100%;
			max-width: 424px;
			margin: 0 auto;
			padding: 40px;
			background-color: var(--gray-100-color);
			border-radius: 16px;
			box-shadow:
				0 3px 8px -1px rgba(50, 50, 71, 0.05),
				0px 0px 1px 0px rgba(12, 26, 75, 0.24);
		}

		&__logo {
			align-self: center;
		}

		&__header {
			display: flex;
			flex-direction: column;
			align-self: center;
			gap: 12px;
			color: var(--text-heading-dark-color);
			text-align: center;
		}

		&__title {
			font-size: 28px;
			font-weight: 600;
			line-height: 1.36;
		}

		&__description {
			font-size: 16px;
			line-height: 1.62;
		}
	}
</style>
