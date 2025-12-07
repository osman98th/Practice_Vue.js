import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from './views/Dashboard.vue'
import Vehicles from './views/Vehicles.vue'
import Drivers from './views/Drivers.vue'
import Trips from './views/Trips.vue'
import Assignment from './views/Assignment.vue'
import Booking from './views/Booking.vue'
import Costing from './views/Costing.vue'
import Reports from './views/Reports.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'admin-lte/dist/css/adminlte.min.css'
import 'admin-lte/dist/js/adminlte.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './assets/app.css'

const routes = [
  { path: '/', component: Dashboard },
  { path: '/vehicles', component: Vehicles },
  { path: '/drivers', component: Drivers },
  { path: '/trips', component: Trips },
  { path: '/assignment', component: Assignment },
  { path: '/booking', component: Booking },
  { path: '/costing', component: Costing },
  { path: '/reports', component: Reports }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')
