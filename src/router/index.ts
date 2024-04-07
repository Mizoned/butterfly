import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '/',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue')
        }
      ]
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: () => import('@/views/SignInView.vue')
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: () => import('@/views/SignUpView.vue')
    }
  ]
})

export default router
