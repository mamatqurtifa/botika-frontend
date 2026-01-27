import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/',
      component: () => import('../layouts/DashboardLayout.vue'),
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
          component: () => import('../views/Analytics.vue'),
        },
      ],
    },
  ],
})

export default router
