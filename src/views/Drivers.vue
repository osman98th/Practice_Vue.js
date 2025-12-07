<template>
  <div class="content pt-3">
    <div class="container-fluid">
      <div class="card">
        <div
          class="card-header d-flex justify-content-between align-items-center"
        >
          <h3 class="card-title">Drivers</h3>
          <button class="btn btn-primary btn-sm" @click="addDriver">
            Add Driver
          </button>
        </div>
        <div class="card-body table-responsive">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>License No</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="driver in drivers" :key="driver.id">
                <td>{{ driver.id }}</td>
                <td>{{ driver.name }}</td>
                <td>{{ driver.license }}</td>
                <td>{{ driver.phone }}</td>
                <td>
                  <span
                    :class="
                      driver.status === 'Active'
                        ? 'badge bg-success'
                        : 'badge bg-secondary'
                    "
                  >
                    {{ driver.status }}
                  </span>
                </td>
                <td>
                  <button
                    class="btn btn-sm btn-info me-1"
                    @click="editDriver(driver)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-sm btn-danger"
                    @click="deleteDriver(driver.id)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr v-if="drivers.length === 0">
                <td colspan="6" class="text-center">No drivers found.</td>
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

const drivers = ref([
  {
    id: 1,
    name: "John Doe",
    license: "LIC12345",
    phone: "017XXXXXXX",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    license: "LIC67890",
    phone: "018XXXXXXX",
    status: "Inactive",
  },
]);

const addDriver = () => alert("Add Driver form will open!");
const editDriver = (driver) => alert(`Edit Driver: ${driver.name}`);
const deleteDriver = (id) => {
  if (confirm(`Are you sure to delete driver #${id}?`)) {
    drivers.value = drivers.value.filter((d) => d.id !== id);
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
