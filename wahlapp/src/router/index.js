import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/bundestagswahl-2025',
      name: 'bundestagswahl-2025',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/WahlView.vue'),
    },
    {
      path: '/ergebnisse',
      name: 'ergebnisse',
      component: () => import('../views/ErgebnisseView.vue'),
    },
    {
      path: '/verifizierung',
      name: 'verifizierung',
      component: () => import('../views/VerifizierungView.vue'),
    }
  ],
})

export default router
