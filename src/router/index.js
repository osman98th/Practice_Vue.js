import { createRouter, createWebHistory } from 'vue-router'

// Fleet Pages
import Dashboard from '@/views/Dashboard.vue'
import Vehicles from '@/views/Vehicles.vue'
import Drivers from '@/views/Drivers.vue'
import Trips from '@/views/Trips.vue'
import Reports from '@/views/Reports.vue'
import Settings from '@/views/Settings.vue'
import Contact from '@/views/Contact.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/vehicles', name: 'Vehicles', component: Vehicles },
  { path: '/drivers', name: 'Drivers', component: Drivers },
  { path: '/trips', name: 'Trips', component: Trips },
  { path: '/reports', name: 'Reports', component: Reports },
  { path: '/settings', name: 'Settings', component: Settings },
  { path: '/contact', name: 'Contact', component: Contact },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
