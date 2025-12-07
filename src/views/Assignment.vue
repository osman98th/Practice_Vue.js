<template>
  <div class="content pt-3">
    <div class="container-fluid">
      <div class="card">
        <div
          class="card-header d-flex justify-content-between align-items-center"
        >
          <h3 class="card-title">Assignments</h3>
          <button class="btn btn-primary btn-sm" @click="addAssignment">
            Add Assignment
          </button>
        </div>
        <div class="card-body table-responsive">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Driver</th>
                <th>Vehicle</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in assignments" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.driver }}</td>
                <td>{{ item.vehicle }}</td>
                <td>{{ item.date }}</td>
                <td>
                  <span
                    :class="
                      item.status === 'Active'
                        ? 'badge bg-success'
                        : 'badge bg-secondary'
                    "
                  >
                    {{ item.status }}
                  </span>
                </td>
                <td>
                  <button
                    class="btn btn-sm btn-info me-1"
                    @click="editAssignment(item)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-sm btn-danger"
                    @click="deleteAssignment(item.id)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr v-if="assignments.length === 0">
                <td colspan="6" class="text-center">No assignments found.</td>
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

const assignments = ref([
  {
    id: 1,
    driver: "John Doe",
    vehicle: "Truck 1",
    date: "2025-12-07",
    status: "Active",
  },
  {
    id: 2,
    driver: "Jane Smith",
    vehicle: "Car 1",
    date: "2025-12-06",
    status: "Inactive",
  },
]);

const addAssignment = () => alert("Add Assignment form will open!");
const editAssignment = (item) => alert(`Edit Assignment: ${item.id}`);
const deleteAssignment = (id) => {
  if (confirm(`Are you sure to delete assignment #${id}?`)) {
    assignments.value = assignments.value.filter((a) => a.id !== id);
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
