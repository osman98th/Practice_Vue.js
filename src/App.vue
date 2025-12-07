<template>
  <div class="wrapper">
    <!-- Navbar -->
    <Navbar @toggleSidebar="toggleSidebar" />

    <!-- Sidebar -->
    <Sidebar :isMobileOpen="isSidebarOpen" @closeSidebar="toggleSidebar" />

    <!-- Content -->
    <div
      class="content-wrapper"
      :class="{ 'sidebar-collapsed': !isSidebarOpen }"
    >
      <router-view />
    </div>

    <!-- Footer -->
    <footer class="main-footer">
      <strong>&copy; 2025 Fleet Management.</strong> All rights reserved.
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";

const isSidebarOpen = ref(true);

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}
</script>

<style>
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Navbar, Sidebar, Footer fixed naturally by AdminLTE CSS */
.content-wrapper {
  margin-left: 250px; /* Sidebar width */
  padding: 20px;
  transition: margin-left 0.3s;
  min-height: calc(100vh - 56px - 40px); /* navbar + footer */
}

.sidebar-collapsed {
  margin-left: 0;
}

/* Footer fixed bottom */
.main-footer {
  background: #f8f9fa;
  padding: 10px 20px;
  text-align: center;
  flex-shrink: 0;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .content-wrapper {
    margin-left: 0;
    padding: 15px;
  }
}
</style>
