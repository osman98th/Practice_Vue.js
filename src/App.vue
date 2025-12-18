<template>
<div class="wrapper">
    <!-- Show Navbar + Sidebar ONLY if authenticated -->
    <Navbar v-if="isAuth" @toggleSidebar="toggleSidebar" />
    <Sidebar v-if="isAuth" :isOpen="isSidebarOpen" @toggleSidebar="toggleSidebar" />

    <!-- Main content -->
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
            isMobile: false,
            isAuth: false
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
        this.isAuth = localStorage.getItem("isAuth") === "true"; // ✅ check auth
    },
    watch: {
        '$route'(to) {
            // update isAuth on route change
            this.isAuth = localStorage.getItem("isAuth") === "true";
        }
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.checkMobile);
    }
};
</script>

<style>
.wrapper {
    min-height: 100vh;
}

.content-wrapper {
    margin-top: 56px;
    /* navbar height */
    margin-left: 250px;
    /* sidebar width */
    padding: 20px;
    transition: margin-left 0.3s ease;
}

.sidebar-collapsed {
    margin-left: 0;
}

@media (max-width: 768px) {
    .content-wrapper {
        margin-left: 0;
        padding: 15px;
    }
}
</style>
