<template>
<div class="wrapper">
    <!-- FIXED NAVBAR -->
    <Navbar @toggleSidebar="toggleSidebar" />

    <!-- SIDEBAR -->
    <Sidebar :isOpen="isSidebarOpen" @toggleSidebar="toggleSidebar" />

    <!-- MAIN CONTENT -->
    <div class="content-wrapper" :class="{ 'sidebar-collapsed': isMobile && !isSidebarOpen }">
        <router-view />
    </div>
</div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";

export default {
    name: "App",
    components: {
        Navbar,
        Sidebar
    },
    data() {
        return {
            isSidebarOpen: true,
            isMobile: false
        };
    },
    methods: {
        toggleSidebar() {
            this.isSidebarOpen = !this.isSidebarOpen;
        },
        checkMobile() {
            this.isMobile = window.innerWidth <= 768;
        }
    },
    mounted() {
        this.checkMobile();
        window.addEventListener("resize", this.checkMobile);
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.checkMobile);
    }
};
</script>

<style>
/* ===== GLOBAL LAYOUT ===== */

.wrapper {
    min-height: 100vh;
}

/* Navbar height = 56px */
.content-wrapper {
    margin-top: 56px;
    /* ✅ VERY IMPORTANT */
    margin-left: 250px;
    /* sidebar width */
    padding: 20px;
    transition: margin-left 0.3s ease;
}

/* Mobile sidebar closed */
.sidebar-collapsed {
    margin-left: 0;
}

/* Mobile */
@media (max-width: 768px) {
    .content-wrapper {
        margin-left: 0;
        padding: 15px;
    }
}
</style>
