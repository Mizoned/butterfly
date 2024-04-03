import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => {}
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
