<template>
<div class="wrapper">
    <Navbar @toggleSidebar="toggleSidebar" />
    <Sidebar :isOpen="isSidebarOpen" @toggleSidebar="toggleSidebar" />
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
.wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.content-wrapper {
    margin-left: 250px;
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
