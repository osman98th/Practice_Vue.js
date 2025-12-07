<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <a href="#" class="brand-link">
      <span class="brand-text font-weight-light">Fleet Management</span>
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
  width: 250px;
  min-height: 100vh;
  position: fixed;
}
.router-link-active {
  background-color: #007bff !important;
  color: #fff !important;
}
</style>
