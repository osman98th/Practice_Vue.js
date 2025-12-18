<template>
<nav class="navbar">
    <div class="nav-left">
        <button class="menu-btn" @click="$emit('toggleSidebar')">☰</button>
        <span class="navbar-title">Fleet Admin Panel</span>
    </div>

    <div class="nav-right">
        <div class="user-info">
            <div class="user-name">{{ user.name }}</div>
            <div class="user-email">{{ user.email }}</div>
        </div>

        <button class="logout-btn" @click="logout">Logout</button>
    </div>
</nav>
</template>

<script>
export default {
    name: "Navbar",
    data() {
        return {
            user: {
                name: "",
                email: ""
            }
        };
    },
    mounted() {
        const storedUser = localStorage.getItem("user");
        if (storedUser) this.user = JSON.parse(storedUser);
    },
    methods: {
        logout() {
            localStorage.removeItem("isAuth");
            localStorage.removeItem("user");
            this.$router.replace("/login");
        }
    }
};
</script>

<style scoped>
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 56px;
    background: #007bff;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    z-index: 1100;
}

.nav-left {
    display: flex;
    align-items: center;
}

.menu-btn {
    background: transparent;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
}

.navbar-title {
    margin-left: 16px;
    font-weight: bold;
}

.nav-right {
    display: flex;
    align-items: center;
    gap: 15px;
}

.user-info {
    text-align: right;
    line-height: 1.1;
}

.user-name {
    font-size: 13px;
    font-weight: 600;
}

.user-email {
    font-size: 11px;
    opacity: 0.85;
}

.logout-btn {
    background: #dc3545;
    border: none;
    color: white;
    padding: 6px 14px;
    border-radius: 6px;
    font-size: 13px;
    cursor: pointer;
    font-weight: 600;
}

.logout-btn:hover {
    background: #bb2d3b;
}
</style>
