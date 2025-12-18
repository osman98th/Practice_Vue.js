import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
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
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },

  { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/vehicles", component: Vehicles, meta: { requiresAuth: true } },
  { path: "/drivers", component: Drivers, meta: { requiresAuth: true } },
  { path: "/assignment", component: Assignment, meta: { requiresAuth: true } },
  { path: "/bookings", component: Bookings, meta: { requiresAuth: true } },
  { path: "/trips", component: Trips, meta: { requiresAuth: true } },
  { path: "/reports", component: Reports, meta: { requiresAuth: true } },
  { path: "/costing", component: Costing, meta: { requiresAuth: true } },
  { path: "/settings", component: Settings, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Route guard
router.beforeEach((to, from, next) => {
  const isAuth = localStorage.getItem("isAuth") === "true";

  if (to.meta.requiresAuth && !isAuth) return next("/login");
  if (to.path === "/login" && isAuth) return next("/dashboard");
  return next();
});

export default router;
