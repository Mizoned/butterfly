<script setup lang="ts">
	import BaseButton from '@/components/ui/buttons/base-button.vue';
	import BaseCheckbox from '@/components/ui/checkboxes/base-checkbox.vue';
	import BaseSwitch from '@/components/ui/switches/base-switch.vue';
	import { ref } from 'vue';
	import UserAvatar from '@/components/commons/avatar/user-avatar.vue';

	const checkboxArray = ref<Array<any>>([]);
	const checkboxValue = ref<boolean>(false);
	const switchValue = ref<boolean>(false);
</script>

<template>
	<div class="ui-components">
		<div class="ui-components__layout">
			<div class="ui-components__header heading-1">Button</div>
			<div class="ui-components__items">
				<div class="ui-components__title heading-2">Colors</div>
				<div class="ui-components__line">
					<base-button
						label="Button"
						color="primary"
						variant="solid"
						size="base"
						:rounded="false"
					/>
					<base-button
						label="Button"
						color="secondary"
						variant="solid"
						size="base"
						:rounded="false"
					/>
					<base-button
						label="Button"
						color="tertiary"
						variant="solid"
						size="base"
						:rounded="false"
					/>
					<base-button
						label="Button"
						color="success"
						variant="solid"
						size="base"
						:rounded="false"
					/>
					<base-button
						label="Button"
						color="warning"
						variant="solid"
						size="base"
						:rounded="false"
					/>
					<base-button
						label="Button"
						color="info"
						variant="solid"
						size="base"
						:rounded="false"
					/>
					<base-button
						label="Button"
						color="danger"
						variant="solid"
						size="base"
						:rounded="false"
					/>
					<base-button
						label="Button"
						color="neutral"
						variant="solid"
						size="base"
						:rounded="false"
					/>
				</div>
				<div class="ui-components__title heading-2">Disabled</div>
				<div class="ui-components__line">
					<base-button
						label="Button"
						color="primary"
						variant="solid"
						size="base"
						:rounded="false"
						disabled
					/>
					<base-button
						label="Button"
						color="secondary"
						variant="solid"
						size="base"
						:rounded="false"
						disabled
					/>
					<base-button
						label="Button"
						color="tertiary"
						variant="solid"
						size="base"
						:rounded="false"
						disabled
					/>
					<base-button
						label="Button"
						color="success"
						variant="solid"
						size="base"
						:rounded="false"
						disabled
					/>
					<base-button
						label="Button"
						color="warning"
						variant="solid"
						size="base"
						:rounded="false"
						disabled
					/>
					<base-button
						label="Button"
						color="info"
						variant="solid"
						size="base"
						:rounded="false"
						disabled
					/>
					<base-button
						label="Button"
						color="danger"
						variant="solid"
						size="base"
						:rounded="false"
						disabled
					/>
					<base-button
						label="Button"
						color="neutral"
						variant="solid"
						size="base"
						:rounded="false"
						disabled
					/>
				</div>
				<div class="ui-components__title heading-2">Rounded</div>
				<div class="ui-components__line">
					<base-button
						label="Button"
						color="primary"
						variant="solid"
						size="base"
						:rounded="true"
					/>
					<base-button
						label="Button"
						color="secondary"
						variant="solid"
						size="base"
						:rounded="true"
					/>
					<base-button
						label="Button"
						color="tertiary"
						variant="solid"
						size="base"
						:rounded="true"
					/>
					<base-button
						label="Button"
						color="success"
						variant="solid"
						size="base"
						:rounded="true"
					/>
					<base-button
						label="Button"
						color="warning"
						variant="solid"
						size="base"
						:rounded="true"
					/>
					<base-button
						label="Button"
						color="info"
						variant="solid"
						size="base"
						:rounded="true"
					/>
					<base-button
						label="Button"
						color="danger"
						variant="solid"
						size="base"
						:rounded="true"
					/>
					<base-button
						label="Button"
						color="neutral"
						variant="solid"
						size="base"
						:rounded="true"
					/>
				</div>
				<div class="ui-components__title heading-2">Outlined</div>
				<div class="ui-components__line">
					<base-button
						label="Button"
						color="primary"
						variant="outline"
						size="base"
						:rounded="false"
					/>
					<base-button
						label="Button"
						color="secondary"
						variant="outline"
						size="base"
						:rounded="false"
					/>
					<base-button
						label="Button"
						color="tertiary"
						variant="outline"
						size="base"
						:rounded="false"
					/>
					<base-button
						label="Button"
						color="success"
						variant="outline"
						size="base"
						:rounded="false"
					/>
					<base-button
						label="Button"
						color="warning"
						variant="outline"
						size="base"
						:rounded="false"
					/>
					<base-button
						label="Button"
						color="info"
						variant="outline"
						size="base"
						:rounded="false"
					/>
					<base-button
						label="Button"
						color="danger"
						variant="outline"
						size="base"
						:rounded="false"
					/>
					<base-button
						label="Button"
						color="neutral"
						variant="outline"
						size="base"
						:rounded="false"
					/>
				</div>
				<div class="ui-components__title heading-2">Dashed</div>
				<div class="ui-components__line">
					<base-button
						label="Button"
						color="primary"
						variant="dashed"
						size="base"
						:rounded="false"
					/>
					<base-button
						label="Button"
						color="secondary"
						variant="dashed"
						size="base"
						:rounded="false"
					/>
					<base-button
						label="Button"
						color="tertiary"
						variant="dashed"
						size="base"
						:rounded="false"
					/>
					<base-button
						label="Button"
						color="success"
						variant="dashed"
						size="base"
						:rounded="false"
					/>
					<base-button
						label="Button"
						color="warning"
						variant="dashed"
						size="base"
						:rounded="false"
					/>
					<base-button
						label="Button"
						color="info"
						variant="dashed"
						size="base"
						:rounded="false"
					/>
					<base-button
						label="Button"
						color="danger"
						variant="dashed"
						size="base"
						:rounded="false"
					/>
					<base-button
						label="Button"
						color="neutral"
						variant="dashed"
						size="base"
						:rounded="false"
					/>
				</div>
			</div>
		</div>
		<div class="ui-components__layout">
			<div class="ui-components__header heading-1">Checkbox</div>
			<div class="ui-components__items">
				<div class="ui-components__title heading-2">Without label</div>
				<div class="ui-components__line">
					<base-checkbox
						v-model="checkboxArray"
						name="checkbox-1"
						value="checkbox-1"
					/>
					<base-checkbox
						v-model="checkboxArray"
						name="checkbox-2"
						value="checkbox-2"
					/>
				</div>
				<div class="ui-components__title heading-2">With label</div>
				<div class="ui-components__line">
					<base-checkbox
						v-model="checkboxValue"
						:label="checkboxValue ? 'Checked' : 'Unchecked'"
						name="checkbox-1"
						value="checkbox-1"
					/>
				</div>
			</div>
		</div>
		<div class="ui-components__layout">
			<div class="ui-components__header heading-1">Switch</div>
			<div class="ui-components__items">
				<div class="ui-components__line">
					<base-switch
						v-model="switchValue"
						:label="switchValue ? 'Active' : 'Default'"
					/>
				</div>
			</div>
		</div>
		<div class="ui-components__layout">
			<div class="ui-components__header heading-1">Avatar</div>
			<div class="ui-components__items">
				<div class="ui-components__title heading-2">Sizes</div>
				<div class="ui-components__line">
					<user-avatar src="@/assets/images/user.jpg" size="2xl" />
					<user-avatar src="@/assets/images/user.jpg" size="xl" />
					<user-avatar src="@/assets/images/user.jpg" size="large" />
					<user-avatar src="@/assets/images/user.jpg" size="base" />
					<user-avatar src="@/assets/images/user.jpg" size="small" />
					<user-avatar src="@/assets/images/user.jpg" size="extra-small" />
				</div>
				<div class="ui-components__title heading-2">Rounded</div>
				<div class="ui-components__line">
					<user-avatar
						src="@/assets/images/user.jpg"
						size="2xl"
						:rounded="true"
					/>
					<user-avatar
						src="@/assets/images/user.jpg"
						size="xl"
						:rounded="true"
					/>
					<user-avatar
						src="@/assets/images/user.jpg"
						size="large"
						:rounded="true"
					/>
					<user-avatar
						src="@/assets/images/user.jpg"
						size="base"
						:rounded="true"
					/>
					<user-avatar
						src="@/assets/images/user.jpg"
						size="small"
						:rounded="true"
					/>
					<user-avatar
						src="@/assets/images/user.jpg"
						size="extra-small"
						:rounded="true"
					/>
				</div>
				<div class="ui-components__title heading-2">Square with indicator</div>
				<div class="ui-components__line">
					<user-avatar
						src="@/assets/images/user.jpg"
						size="2xl"
						:indicator="true"
					/>
					<user-avatar
						src="@/assets/images/user.jpg"
						size="xl"
						:indicator="true"
					/>
					<user-avatar
						src="@/assets/images/user.jpg"
						size="large"
						:indicator="true"
					/>
					<user-avatar
						src="@/assets/images/user.jpg"
						size="base"
						:indicator="true"
					/>
					<user-avatar
						src="@/assets/images/user.jpg"
						size="small"
						:indicator="true"
					/>
					<user-avatar
						src="@/assets/images/user.jpg"
						size="extra-small"
						:indicator="true"
					/>
				</div>
				<div class="ui-components__title heading-2">Rounded with indicator</div>
				<div class="ui-components__line">
					<user-avatar
						src="@/assets/images/user.jpg"
						size="2xl"
						:rounded="true"
						:indicator="true"
					/>
					<user-avatar
						src="@/assets/images/user.jpg"
						size="xl"
						:rounded="true"
						:indicator="true"
					/>
					<user-avatar
						src="@/assets/images/user.jpg"
						size="large"
						:rounded="true"
						:indicator="true"
					/>
					<user-avatar
						src="@/assets/images/user.jpg"
						size="base"
						:rounded="true"
						:indicator="true"
					/>
					<user-avatar
						src="@/assets/images/user.jpg"
						size="small"
						:rounded="true"
						:indicator="true"
					/>
					<user-avatar
						src="@/assets/images/user.jpg"
						size="extra-small"
						:rounded="true"
						:indicator="true"
					/>
				</div>
				<div class="ui-components__title heading-2">Square no image</div>
				<div class="ui-components__line">
					<user-avatar full-name="MJ" size="2xl" />
					<user-avatar full-name="MJ" size="xl" />
					<user-avatar full-name="MJ" size="large" />
					<user-avatar full-name="MJ" size="base" />
					<user-avatar full-name="MJ" size="small" />
					<user-avatar full-name="MJ" size="extra-small" />
				</div>
				<div class="ui-components__title heading-2">
					Square no image with indicator
				</div>
				<div class="ui-components__line">
					<user-avatar full-name="MJ" size="2xl" :indicator="true" />
					<user-avatar full-name="MJ" size="xl" :indicator="true" />
					<user-avatar full-name="MJ" size="large" :indicator="true" />
					<user-avatar full-name="MJ" size="base" :indicator="true" />
					<user-avatar full-name="MJ" size="small" :indicator="true" />
					<user-avatar full-name="MJ" size="extra-small" :indicator="true" />
				</div>
				<div class="ui-components__title heading-2">Rounded no image</div>
				<div class="ui-components__line">
					<user-avatar full-name="MJ" size="2xl" :rounded="true" />
					<user-avatar full-name="MJ" size="xl" :rounded="true" />
					<user-avatar full-name="MJ" size="large" :rounded="true" />
					<user-avatar full-name="MJ" size="base" :rounded="true" />
					<user-avatar full-name="MJ" size="small" :rounded="true" />
					<user-avatar full-name="MJ" size="extra-small" :rounded="true" />
				</div>
				<div class="ui-components__title heading-2">
					Rounded no image with indicator
				</div>
				<div class="ui-components__line">
					<user-avatar
						full-name="MJ"
						size="2xl"
						:rounded="true"
						:indicator="true"
					/>
					<user-avatar
						full-name="MJ"
						size="xl"
						:rounded="true"
						:indicator="true"
					/>
					<user-avatar
						full-name="MJ"
						size="large"
						:rounded="true"
						:indicator="true"
					/>
					<user-avatar
						full-name="MJ"
						size="base"
						:rounded="true"
						:indicator="true"
					/>
					<user-avatar
						full-name="MJ"
						size="small"
						:rounded="true"
						:indicator="true"
					/>
					<user-avatar
						full-name="MJ"
						size="extra-small"
						:rounded="true"
						:indicator="true"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.ui-components {
		display: flex;
		flex-direction: column;
		gap: 30px;
		max-width: 1380px;
		padding: 30px;
		margin: 0 auto;
		height: 100%;
		overflow: auto;

		&__layout {
			display: flex;
			flex-direction: column;
			gap: 20px;
		}

		&__items {
			padding: 40px;
			border-radius: 10px;
			border: 1px dashed var(--theme-dark-default-color);
		}

		&__header {
			padding-left: 41px;
		}

		&__title {
			padding: 20px 0;

			&:first-child {
				padding-top: 0;
			}

			&:last-child {
				padding-bottom: 0;
			}
		}

		&__line {
			display: flex;
			flex-wrap: wrap;
			gap: 20px;
		}
	}
</style>
