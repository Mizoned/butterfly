import AppLayout from '@/layouts/AppLayout.vue'

export const pages = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '/',
        name: 'dashboard',
        component: () => import('@/views/DashboardView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/products',
        name: 'products',
        component: () => import('@/views/ProductsView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/customers',
        name: 'customers',
        component: () => import('@/views/CustomersView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/expenses',
        name: 'expenses',
        component: () => import('@/views/ExpensesView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/schedule',
        name: 'schedule',
        component: () => import('@/views/SchedulesView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/schedule/completed',
        name: 'scheduleCompleted',
        component: () => import('@/views/SchedulesCompletedView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/schedule/canceled',
        name: 'scheduleCanceled',
        component: () => import('@/views/SchedulesCanceledView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/notifications',
        name: 'notifications',
        component: () => import('@/views/NotificationView.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('@/views/SettingsView.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/sign-in',
    name: 'signIn',
    component: () => import('@/views/SignInView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/sign-up',
    name: 'signUp',
    component: () => import('@/views/SignUpView.vue'),
    meta: { requiresAuth: false }
  }
]