<template>
<nav class="navbar">
    <button class="btn" @click="$emit('toggleSidebar')">☰</button>
    <span class="navbar-title">Fleet Admin Panel</span>
</nav>
</template>

<script>
export default {
    name: "Navbar"
};
</script>

<style scoped>
.navbar {
    height: 56px;
    background: #007bff;
    color: white;
    display: flex;
    align-items: center;
    padding: 0 20px;
}

.btn {
    background: transparent;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
}

.navbar-title {
    margin-left: 20px;
    font-weight: bold;
}
</style>
