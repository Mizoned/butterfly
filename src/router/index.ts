import { createRouter, createWebHistory } from 'vue-router';
import SignUp from '@/views/sign-up.vue';
import SignIn from '@/views/sign-in.vue';

export default createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'UiComponents',
			component: () => import('@/views/ui-components.vue')
		},
		{
			path: '/sign-in',
			name: 'SignIn',
			component: SignIn
		},
		{
			path: '/sign-up',
			name: 'SignUp',
			component: SignUp
		}
	]
});
