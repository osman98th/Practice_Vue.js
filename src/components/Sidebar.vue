<template>
<div>
    <!-- Mobile overlay -->
    <div v-if="isOpen && isMobile" class="overlay" @click="$emit('toggleSidebar')"></div>

    <aside :class="['sidebar', { open: isOpen || !isMobile }]">
        <ul>
            <li>
                <router-link to="/" exact-active-class="active">Dashboard</router-link>
            </li>
            <li>
                <router-link to="/vehicles" exact-active-class="active">Vehicles</router-link>
            </li>
            <li>
                <router-link to="/drivers" exact-active-class="active">Drivers</router-link>
            </li>
            <li>
                <router-link to="/assignment" exact-active-class="active">Assignment</router-link>
            </li>
            <li>
                <router-link to="/booking" exact-active-class="active">Bookings</router-link>
            </li>
            <li>
                <router-link to="/trips" exact-active-class="active">Trips</router-link>
            </li>
            <li>
                <router-link to="/reports" exact-active-class="active">Reports</router-link>
            </li>
            <li>
                <router-link to="/costing" exact-active-class="active">Costing</router-link>
            </li>
            <li>
                <router-link to="/settings" exact-active-class="active">Settings</router-link>
            </li>
        </ul>
    </aside>
</div>
</template>

<script>
export default {
    name: "Sidebar",
    props: {
        isOpen: Boolean
    },
    data() {
        return {
            isMobile: false
        };
    },
    methods: {
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

<style scoped>
.sidebar {
    position: fixed;
    top: 56px;
    left: 0;
    width: 250px;
    height: calc(100vh - 56px);
    background: #343a40;
    color: white;
    padding: 20px;
    overflow-y: auto;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 1001;
}

.sidebar.open {
    transform: translateX(0);
}

.sidebar ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.sidebar li {
    padding: 10px 0;
}

.sidebar li a {
    color: white;
    text-decoration: none;
    display: block;
    padding: 5px 10px;
    border-radius: 4px;
}

.sidebar li a:hover {
    background: #495057;
}

.active {
    font-weight: bold;
    background: #007bff;
    color: white;
}

.overlay {
    position: fixed;
    top: 56px;
    left: 0;
    width: 100vw;
    height: calc(100vh - 56px);
    background: rgba(0, 0, 0, 0.4);
    z-index: 1000;
}

@media (min-width: 769px) {
    .sidebar {
        transform: translateX(0) !important;
    }

    .overlay {
        display: none;
    }
}
</style>
