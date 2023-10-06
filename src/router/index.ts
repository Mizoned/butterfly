import { createRouter, createWebHistory } from 'vue-router';

export default createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'UiComponents',
			component: () => import('@/views/ui-components.vue')
		}
	]
});
