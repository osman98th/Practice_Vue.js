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
                  <button
                    class="btn btn-sm btn-info"
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
  { id: 1, name: "John Doe", license: "LIC12345", phone: "017XXXXXXX" },
  { id: 2, name: "Jane Smith", license: "LIC67890", phone: "018XXXXXXX" },
]);

function addDriver() {
  alert("Add Driver form will open");
}
function editDriver(driver) {
  alert("Edit Driver ID: " + driver.id);
}
function deleteDriver(id) {
  if (confirm("Are you sure to delete driver #" + id)) {
    drivers.value = drivers.value.filter((d) => d.id !== id);
  }
}
</script>
