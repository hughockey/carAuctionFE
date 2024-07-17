import VehiculeCalculator from '@/components/VehiculeCalculator.vue'
import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'vehicule-calculator',
      component: VehiculeCalculator
    }
  ]
})

export default router
