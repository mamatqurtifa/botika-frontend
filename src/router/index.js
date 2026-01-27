import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import Inventories from '../views/Inventories.vue'
import Members from '../views/Members.vue'
import Analysis from '../views/Analysis.vue'

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
      component: Login,
    },
    {
      path: '/',
      component: DashboardLayout,
      children: [
        {
          path: 'inventories',
          name: 'inventories',
          component: Inventories,
        },
        {
          path: 'members',
          name: 'members',
          component: Members,
        },
        {
          path: 'analysis',
          name: 'analysis',
          component: Analysis,
        },
      ],
    },
  ],
})

export default router
