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
                <th>Vehicle</th>
                <th>Driver</th>
                <th>Start</th>
                <th>End</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="trip in trips" :key="trip.id">
                <td>{{ trip.id }}</td>
                <td>{{ trip.vehicle }}</td>
                <td>{{ trip.driver }}</td>
                <td>{{ trip.start }}</td>
                <td>{{ trip.end }}</td>
                <td>{{ trip.status }}</td>
                <td>
                  <button class="btn btn-sm btn-info" @click="editTrip(trip)">
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
    vehicle: "Truck A",
    driver: "John Doe",
    start: "2025-12-01",
    end: "2025-12-02",
    status: "Completed",
  },
  {
    id: 2,
    vehicle: "Bus B",
    driver: "Jane Smith",
    start: "2025-12-03",
    end: "2025-12-04",
    status: "Ongoing",
  },
]);

function addTrip() {
  alert("Add Trip form will open");
}
function editTrip(trip) {
  alert("Edit Trip ID: " + trip.id);
}
function deleteTrip(id) {
  if (confirm("Are you sure to delete trip #" + id)) {
    trips.value = trips.value.filter((t) => t.id !== id);
  }
}
</script>
