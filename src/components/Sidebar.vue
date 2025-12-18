<template>
<aside class="sidebar" :class="{ open: isOpen }">
    <ul>
        <li>
            <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li>
            <router-link to="/vehicles">Vehicles</router-link>
        </li>
        <li>
            <router-link to="/drivers">Drivers</router-link>
        </li>
        <li>
            <router-link to="/assignment">Assignment</router-link>
        </li>
        <li>
            <router-link to="/bookings">Bookings</router-link>
        </li>
        <li>
            <router-link to="/trips">Trips</router-link>
        </li>
        <li>
            <router-link to="/reports">Reports</router-link>
        </li>
        <li>
            <router-link to="/costing">Costing</router-link>
        </li>
        <li>
            <router-link to="/settings">Settings</router-link>
        </li>
    </ul>
</aside>
</template>

<script>
export default {
    name: "Sidebar",
    props: ["isOpen"]
};
</script>

<style scoped>
.sidebar {
    position: fixed;
    top: 56px;
    left: 0;
    width: 250px;
    height: 100%;
    background: #343a40;
    color: white;
    padding-top: 20px;
    transition: transform 0.3s ease;
    overflow-y: auto;
}

.sidebar.open {
    transform: translateX(0);
}

.sidebar:not(.open) {
    transform: translateX(-100%);
}

.sidebar ul {
    list-style: none;
    padding: 0;
}

.sidebar li {
    margin: 10px 0;
}

.sidebar a {
    color: white;
    text-decoration: none;
    padding: 10px 20px;
    display: block;
    border-radius: 6px;
}

.sidebar a.router-link-exact-active {
    background: #007bff;
}
</style>
