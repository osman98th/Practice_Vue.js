<template>
<div class="d-flex" style="min-height: 100vh;">

    <!-- Main content -->
    <div class="flex-fill">
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom px-4">
            <div class="container-fluid">
                <span class="navbar-brand mb-0 h1">Dashboard</span>
                <form class="d-flex ms-auto">
                    <input class="form-control me-2" type="search" placeholder="Search..." />
                    <button class="btn btn-outline-primary" type="submit">Search</button>
                </form>
            </div>
        </nav>

        <!-- Content -->
        <div class="container-fluid p-4">
            <!-- KPI Cards -->
            <div class="row mb-4">
                <div class="col-md-3 mb-3" v-for="card in kpiCards" :key="card.title">
                    <div :class="['card text-white', card.bg]">
                        <div class="card-body">
                            <h5 class="card-title">{{ card.title }}</h5>
                            <p class="card-text display-6">{{ card.value }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Charts Row -->
            <div class="row mb-4">
                <div class="col-md-6 mb-3">
                    <div class="card h-100">
                        <div class="card-header">Trips Overview</div>
                        <div class="card-body">
                            <canvas ref="tripsChart"></canvas>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 mb-3">
                    <div class="card h-100">
                        <div class="card-header">Fuel vs Maintenance</div>
                        <div class="card-body">
                            <canvas ref="costChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import {
    ref,
    onMounted
} from 'vue';
import {
    Chart,
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default {
    setup() {
        const kpiCards = ref([{
                title: 'Vehicles',
                value: 120,
                bg: 'bg-primary'
            },
            {
                title: 'Drivers',
                value: 65,
                bg: 'bg-success'
            },
            {
                title: 'Trips',
                value: 42,
                bg: 'bg-warning'
            },
            {
                title: 'Bookings',
                value: 18,
                bg: 'bg-danger'
            },
        ]);

        const tripsChart = ref(null);
        const costChart = ref(null);

        onMounted(() => {
            new Chart(tripsChart.value, {
                type: 'bar',
                data: {
                    labels: ['Bus', 'Car', 'Micro', 'Ambulance'],
                    datasets: [{
                        label: 'Trips Completed',
                        data: [12, 19, 7, 14],
                        backgroundColor: '#0d6efd'
                    }],
                },
                options: {
                    responsive: true
                }
            });

            new Chart(costChart.value, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                    datasets: [{
                            label: 'Fuel',
                            data: [12, 19, 7, 14, 10],
                            backgroundColor: '#198754'
                        },
                        {
                            label: 'Maintenance',
                            data: [8, 14, 6, 12, 9],
                            backgroundColor: '#dc3545'
                        }
                    ],
                },
                options: {
                    responsive: true
                }
            });
        });

        return {
            kpiCards,
            tripsChart,
            costChart
        };
    }
};
</script>

<style scoped>
body {
    margin: 0;
}

.circle-box {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: #0d6efd;
    color: white;
    font-size: 32px;
    font-weight: bold;
}

.circle-text {
    text-transform: uppercase;
}

.sidebar-menu {
    padding-left: 0;
    margin-top: 20px;
}

.sidebar-menu li {
    margin-bottom: 10px;
}

.sidebar-menu a {
    text-decoration: none;
    display: block;
    padding: 10px 20px;
    color: #000;
    border-radius: 5px;
}

.sidebar-menu a.router-link-exact-active {
    background: #0d6efd;
    color: white;
    font-weight: 600;
}
</style>
