<template>
  <div class="content pt-3">
    <div class="container-fluid">
      <div class="card">
        <div
          class="card-header d-flex justify-content-between align-items-center"
        >
          <h3 class="card-title">Vehicles</h3>
          <button class="btn btn-primary btn-sm" @click="addVehicle">
            Add Vehicle
          </button>
        </div>
        <div class="card-body table-responsive">
          <table class="table table-bordered table-hover">
            <thead class="thead-light">
              <tr>
                <th>ID</th>
                <th>Vehicle Name</th>
                <th>Type</th>
                <th>Registration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="vehicle in vehicles" :key="vehicle.id">
                <td>{{ vehicle.id }}</td>
                <td>{{ vehicle.name }}</td>
                <td>{{ vehicle.type }}</td>
                <td>{{ vehicle.registration }}</td>
                <td>
                  <button
                    class="btn btn-sm btn-info"
                    @click="editVehicle(vehicle)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-sm btn-danger"
                    @click="deleteVehicle(vehicle.id)"
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

const vehicles = ref([
  { id: 1, name: "Truck A", type: "Truck", registration: "ABC-123" },
  { id: 2, name: "Bus B", type: "Bus", registration: "DEF-456" },
]);

function addVehicle() {
  alert("Add Vehicle form will open");
}
function editVehicle(vehicle) {
  alert("Edit Vehicle ID: " + vehicle.id);
}
function deleteVehicle(id) {
  if (confirm("Are you sure to delete vehicle #" + id)) {
    vehicles.value = vehicles.value.filter((v) => v.id !== id);
  }
}
</script>
