import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/thank-you',
      name: 'ThankYou',
      component: () => import('@/views/ThankYouPage.vue')
    }
  ]
})

export default router
