<template>
<div class="content pt-3">
    <div class="container-fluid">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Costing</h3>
            </div>

            <div class="card-body table-responsive mt-3">
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Vehicle</th>
                            <th>Driver</th>
                            <th>Trip Date</th>
                            <th>Distance (km)</th>
                            <th>Rate (per km)</th>
                            <th>Total Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="t in trips" :key="t.id">
                            <td>{{ getVehicleName(getAssignment(t.assignment_id)?.vehicle_id) }}</td>
                            <td>{{ getDriverName(getAssignment(t.assignment_id)?.driver_id) }}</td>
                            <td>{{ t.date }}</td>
                            <td>{{ t.distance }}</td>
                            <td>{{ rate }}</td>
                            <td>{{ t.distance*rate }}</td>
                        </tr>
                        <tr v-if="trips.length===0">
                            <td colspan="6" class="text-center">No trips yet.</td>
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
    name: "Costing",
    data() {
        return {
            assignments: JSON.parse(localStorage.getItem('assignments')) || [],
            vehicles: JSON.parse(localStorage.getItem('vehicles')) || [],
            drivers: JSON.parse(localStorage.getItem('drivers')) || [],
            trips: JSON.parse(localStorage.getItem('trips')) || [],
            rate: 50 // per km
        }
    },
    methods: {
        getAssignment(id) {
            return this.assignments.find(a => a.id === id);
        },
        getVehicleName(id) {
            const v = this.vehicles.find(v => v.id === id);
            return v ? v.name : 'Unknown';
        },
        getDriverName(id) {
            const d = this.drivers.find(d => d.id === id);
            return d ? d.name : 'Unknown';
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
