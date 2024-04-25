import { createRouter, createWebHistory } from 'vue-router';
import { pages } from '@/router/pages';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: pages
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.meta.requiresAuth as boolean;
  const isAuth: boolean = !!localStorage.getItem('accessToken');

  if (requiresAuth && !isAuth) {
    next({ name: 'signIn' });
  } else if (!requiresAuth && isAuth) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
});

export default router
