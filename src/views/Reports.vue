<template>
<div class="content pt-3">
    <div class="container-fluid">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Reports</h3>
            </div>

            <div class="card-body table-responsive mt-3">
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Vehicle</th>
                            <th>Driver</th>
                            <th>Total Trips</th>
                            <th>Total Distance (km)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="a in assignments" :key="a.id">
                            <td>{{ getVehicleName(a.vehicle_id) }}</td>
                            <td>{{ getDriverName(a.driver_id) }}</td>
                            <td>{{ countTrips(a.id) }}</td>
                            <td>{{ sumDistance(a.id) }}</td>
                        </tr>
                        <tr v-if="assignments.length===0">
                            <td colspan="4" class="text-center">No assignments yet.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "Reports",
    data() {
        return {
            assignments: JSON.parse(localStorage.getItem('assignments')) || [],
            vehicles: JSON.parse(localStorage.getItem('vehicles')) || [],
            drivers: JSON.parse(localStorage.getItem('drivers')) || [],
            trips: JSON.parse(localStorage.getItem('trips')) || []
        }
    },
    methods: {
        getVehicleName(id) {
            const v = this.vehicles.find(v => v.id === id);
            return v ? v.name : 'Unknown';
        },
        getDriverName(id) {
            const d = this.drivers.find(d => d.id === id);
            return d ? d.name : 'Unknown';
        },
        countTrips(assignment_id) {
            return this.trips.filter(t => t.assignment_id === assignment_id).length;
        },
        sumDistance(assignment_id) {
            return this.trips.filter(t => t.assignment_id === assignment_id).reduce((sum, t) => sum + Number(t.distance || 0), 0);
        }
    }
}
</script>

<style scoped>
.table th,
.table td {
    vertical-align: middle;
}
</style>
