<template>
  <aside
    :class="[
      'main-sidebar sidebar-dark-primary elevation-4',
      { 'sidebar-mobile-open': isMobileOpen },
    ]"
  >
    <a class="brand-link d-flex justify-content-between align-items-center">
      <span class="brand-text font-weight-light">Fleet Management</span>
      <button
        class="btn btn-sm btn-light d-md-none"
        @click="$emit('closeSidebar')"
      >
        <i class="fas fa-times"></i>
      </button>
    </a>
    <div class="sidebar">
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column">
          <li class="nav-item" v-for="item in menuItems" :key="item.name">
            <router-link
              :to="item.route"
              class="nav-link"
              active-class="active"
            >
              <i :class="['nav-icon', item.icon]"></i>
              <p>{{ item.name }}</p>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script setup>
const menuItems = [
  { name: "Dashboard", route: "/", icon: "fas fa-tachometer-alt" },
  { name: "Vehicles", route: "/vehicles", icon: "fas fa-truck" },
  { name: "Drivers", route: "/drivers", icon: "fas fa-user" },
  { name: "Trips", route: "/trips", icon: "fas fa-route" },
  { name: "Assignment", route: "/assignment", icon: "fas fa-random" },
  { name: "Booking", route: "/booking", icon: "fas fa-calendar-check" },
  { name: "Costing", route: "/costing", icon: "fas fa-dollar-sign" },
  { name: "Reports", route: "/reports", icon: "fas fa-chart-pie" },
];
</script>

<style scoped>
.main-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  z-index: 999;
  transition: transform 0.3s ease;
}

/* Mobile */
@media (max-width: 768px) {
  .main-sidebar {
    transform: translateX(-100%);
  }
  .sidebar-mobile-open {
    transform: translateX(0);
    background-color: #343a40;
  }
}

/* Active link highlight */
.router-link-active {
  background-color: #007bff !important;
  color: #fff !important;
}
</style>
