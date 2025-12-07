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
            <thead>
              <tr>
                <th>ID</th>
                <th>Vehicle Name</th>
                <th>Type</th>
                <th>Registration No.</th>
                <th>Status</th>
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
                  <span
                    class="badge"
                    :class="
                      vehicle.status === 'Active'
                        ? 'bg-success'
                        : 'bg-secondary'
                    "
                  >
                    {{ vehicle.status }}
                  </span>
                </td>
                <td>
                  <button
                    class="btn btn-sm btn-info me-1"
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
              <tr v-if="vehicles.length === 0">
                <td colspan="6" class="text-center">No vehicles found.</td>
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
  {
    id: 1,
    name: "Truck 1",
    type: "Truck",
    registration: "AB-1234",
    status: "Active",
  },
  {
    id: 2,
    name: "Car 1",
    type: "Car",
    registration: "CD-5678",
    status: "Active",
  },
  {
    id: 3,
    name: "Micro",
    type: "Microbus",
    registration: "EF-9012",
    status: "Inactive",
  },
]);

const addVehicle = () => {
  alert("Add Vehicle form will open!");
};

const editVehicle = (vehicle) => {
  alert(`Edit Vehicle: ${vehicle.name}`);
};

const deleteVehicle = (id) => {
  if (confirm(`Are you sure to delete vehicle #${id}?`)) {
    vehicles.value = vehicles.value.filter((v) => v.id !== id);
  }
};
</script>

<style scoped>
.content {
  background-color: #f4f6f9;
  min-height: 100vh;
}

/* Table responsive */
.table-responsive {
  overflow-x: auto;
}

.table th,
.table td {
  vertical-align: middle;
}

/* Small button spacing */
.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
}
</style>
