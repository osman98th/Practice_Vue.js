<template>
<div class="d-flex" style="min-height: 100vh;">
    <!-- Sidebar -->
    <nav class="bg-light border-end vh-100" style="width: 250px;">
        <div class="sidebar-header p-3 border-bottom">
            <h5 class="m-0">Fleet Manager</h5>
        </div>
        <ul class="nav flex-column p-2">
            <li class="nav-item mb-1">
                <a class="nav-link active" href="#">Dashboard</a>
            </li>
            <li class="nav-item mb-1"><a class="nav-link" href="#">Vehicles</a></li>
            <li class="nav-item mb-1"><a class="nav-link" href="#">Drivers</a></li>
            <li class="nav-item mb-1"><a class="nav-link" href="#">Assignments</a></li>
            <li class="nav-item mb-1"><a class="nav-link" href="#">Bookings</a></li>
            <li class="nav-item mb-1"><a class="nav-link" href="#">Trips</a></li>
            <li class="nav-item mb-1"><a class="nav-link" href="#">Reports</a></li>
            <li class="nav-item mb-1"><a class="nav-link" href="#">Costing</a></li>
        </ul>
    </nav>

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

            <!-- Tables -->
            <div class="row">
                <div class="col-md-6 mb-4">
                    <div class="card">
                        <div class="card-header">Vehicles</div>
                        <div class="card-body table-responsive">
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="v in vehicles" :key="v.id">
                                        <td>{{ v.id }}</td>
                                        <td>{{ v.name }}</td>
                                        <td>{{ v.type }}</td>
                                        <td>{{ v.status }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 mb-4">
                    <div class="card">
                        <div class="card-header">Drivers</div>
                        <div class="card-body table-responsive">
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>License</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="d in drivers" :key="d.id">
                                        <td>{{ d.id }}</td>
                                        <td>{{ d.name }}</td>
                                        <td>{{ d.license }}</td>
                                        <td>{{ d.status }}</td>
                                    </tr>
                                </tbody>
                            </table>
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

const kpiCards = [{
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
];

const vehicles = [{
        id: 1,
        name: 'Truck 1',
        type: 'Truck',
        status: 'Active'
    },
    {
        id: 2,
        name: 'Car 1',
        type: 'Car',
        status: 'Active'
    },
    {
        id: 3,
        name: 'Van 1',
        type: 'Van',
        status: 'Maintenance'
    },
];

const drivers = [{
        id: 1,
        name: 'John Doe',
        license: 'ABC123',
        status: 'Active'
    },
    {
        id: 2,
        name: 'Jane Smith',
        license: 'XYZ456',
        status: 'Active'
    },
    {
        id: 3,
        name: 'Mike Ross',
        license: 'LMN789',
        status: 'On Leave'
    },
];

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
            responsive: true,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
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
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    });
});
</script>

<style>
body {
    margin: 0;
}

.sidebar-header {
    font-weight: 600;
}

.nav-link.active {
    font-weight: 600;
}
</style>
