import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/about.vue')
  },
  {
    path: '/api/:key',
    name: 'api',
    component: () => import('@/views/api.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
