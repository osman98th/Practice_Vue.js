<template>
  <div class="wrapper">
    <Navbar />
    <Sidebar />
    <div class="content-wrapper">
      <router-view />
    </div>
    <footer class="main-footer text-center">
      <strong>&copy; 2025 Fleet Management.</strong> All rights reserved.
    </footer>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
}
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
.content-wrapper {
  flex: 1;
  padding: 20px;
  background-color: #f4f6f9;
  margin-left: 250px; /* sidebar width */
}
.main-footer {
  background: #343a40;
  color: #fff;
  padding: 10px 0;
}
</style>
