<template>
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <ul class="navbar-nav">
      <li class="nav-item">
        <button class="nav-link btn" @click="$emit('toggleSidebar')">
          <i class="fas fa-bars"></i>
        </button>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <span class="nav-link">Fleet Management</span>
      </li>
    </ul>
  </nav>
</template>

<script setup></script>

<style scoped>
.main-header {
  position: fixed;
  width: 100%;
  z-index: 1000;
}
.nav-link.btn {
  border: none;
  background: transparent;
}
</style>
