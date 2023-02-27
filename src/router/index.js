import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/CreateView.vue')
    },
    {
      path: '/join',
      name: 'join',
      component: () => import('../views/JoinView.vue')
    },
    {
      path: '/finish',
      name: 'finish',
      component: () => import('../views/FinishView.vue')
    },
    {
      path: '/reservations',
      name: 'reservations',
      component: () => import('../views/ReservationsView.vue')
    }
  ]
})

export default router
