<template>
  <div class="content pt-3">
    <div class="container-fluid">
      <div class="card">
        <div
          class="card-header d-flex justify-content-between align-items-center"
        >
          <h3 class="card-title">Trips</h3>
          <button class="btn btn-primary btn-sm" @click="addTrip">
            Add Trip
          </button>
        </div>
        <div class="card-body table-responsive">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Driver</th>
                <th>Vehicle</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="trip in trips" :key="trip.id">
                <td>{{ trip.id }}</td>
                <td>{{ trip.driver }}</td>
                <td>{{ trip.vehicle }}</td>
                <td>{{ trip.start }}</td>
                <td>{{ trip.end }}</td>
                <td>
                  <span
                    :class="
                      trip.status === 'Completed'
                        ? 'badge bg-success'
                        : 'badge bg-warning'
                    "
                  >
                    {{ trip.status }}
                  </span>
                </td>
                <td>
                  <button
                    class="btn btn-sm btn-info me-1"
                    @click="editTrip(trip)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-sm btn-danger"
                    @click="deleteTrip(trip.id)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr v-if="trips.length === 0">
                <td colspan="7" class="text-center">No trips found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const trips = ref([
  {
    id: 1,
    driver: "John Doe",
    vehicle: "Truck 1",
    start: "2025-12-07",
    end: "2025-12-07",
    status: "Completed",
  },
  {
    id: 2,
    driver: "Jane Smith",
    vehicle: "Car 1",
    start: "2025-12-06",
    end: "2025-12-06",
    status: "Pending",
  },
]);

const addTrip = () => alert("Add Trip form will open!");
const editTrip = (trip) => alert(`Edit Trip: ${trip.id}`);
const deleteTrip = (id) => {
  if (confirm(`Are you sure to delete trip #${id}?`)) {
    trips.value = trips.value.filter((t) => t.id !== id);
  }
};
</script>

<style scoped>
.content {
  background-color: #f4f6f9;
  min-height: 100vh;
}
.table-responsive {
  overflow-x: auto;
}
.table th,
.table td {
  vertical-align: middle;
}
.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
}
</style>
