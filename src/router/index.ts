import { createRouter, createWebHistory } from 'vue-router'
import TodoView from '../views/TodoView.vue'
import HubtelAPIVue from '@/views/HubtelAPI.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TodoView
    },
    {
      path: '/hubtel',
      name: 'hubtel',
      component: HubtelAPIVue
    }
  ]
})

export default router
