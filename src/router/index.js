import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: () => {
        const token = localStorage.getItem('access_token')
        return token ? '/inventories' : '/login'
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: { guest: true },
    },
    {
      path: '/',
      component: () => import('../layouts/DashboardLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'inventories',
          name: 'inventories',
          component: () => import('../views/Inventories.vue'),
        },
        {
          path: 'members',
          name: 'members',
          component: () => import('../views/Members.vue'),
        },
        {
          path: 'analytics',
          name: 'analytics',
          alias: '/analytics',
          component: () => import('../views/Analytics.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token')
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const isGuest = to.matched.some((record) => record.meta.guest)

  if (requiresAuth && !token) {
    next('/login')
  } else if (isGuest && token) {
    next('/inventories')
  } else {
    next()
  }
})

export default router
