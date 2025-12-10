import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Vehicles from "@/views/Vehicles.vue";
import Drivers from "@/views/Drivers.vue";
import Assignment from "@/views/Assignment.vue";
import Bookings from "@/views/Bookings.vue";
import Trips from "@/views/Trips.vue";
import Reports from "@/views/Reports.vue";
import Costing from "@/views/Costing.vue";
import Settings from "@/views/Settings.vue";

const routes = [
  { path: "/", name: "Dashboard", component: Dashboard },
  { path: "/vehicles", name: "Vehicles", component: Vehicles },
  { path: "/drivers", name: "Drivers", component: Drivers },
  { path: "/assignment", name: "Assignment", component: Assignment },
  { path: "/booking", name: "Bookings", component: Bookings },
  { path: "/trips", name: "Trips", component: Trips },
  { path: "/reports", name: "Reports", component: Reports },
  { path: "/costing", name: "Costing", component: Costing },
  { path: "/settings", name: "Settings", component: Settings },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
