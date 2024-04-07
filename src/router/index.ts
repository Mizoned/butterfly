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
        },
        {
          path: '/products',
          name: 'products',
          component: () => import('@/views/ProductsView.vue')
        },
        {
          path: '/customers',
          name: 'customers',
          component: () => import('@/views/CustomersView.vue')
        },
        {
          path: '/expenses',
          name: 'expenses',
          component: () => import('@/views/ExpensesView.vue')
        },
        {
          path: '/calendar',
          name: 'calendar',
          component: () => import('@/views/CalendarView.vue')
        },
        {
          path: '/notifications',
          name: 'notifications',
          component: () => import('@/views/NotificationView.vue')
        },
        {
          path: '/settings',
          name: 'settings',
          component: () => import('@/views/SettingsView.vue')
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
