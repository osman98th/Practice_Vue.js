<template>
  <div class="content pt-3">
    <div class="container-fluid">
      <div class="card">
        <div
          class="card-header d-flex justify-content-between align-items-center"
        >
          <h3 class="card-title">Costing</h3>
          <button class="btn btn-primary btn-sm" @click="addCost">
            Add Cost
          </button>
        </div>
        <div class="card-body table-responsive">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Vehicle</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in costs" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.vehicle }}</td>
                <td>{{ item.description }}</td>
                <td>{{ item.amount }}</td>
                <td>{{ item.date }}</td>
                <td>
                  <button
                    class="btn btn-sm btn-info me-1"
                    @click="editCost(item)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-sm btn-danger"
                    @click="deleteCost(item.id)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr v-if="costs.length === 0">
                <td colspan="6" class="text-center">No costs found.</td>
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

const costs = ref([
  {
    id: 1,
    vehicle: "Truck 1",
    description: "Fuel",
    amount: 5000,
    date: "2025-12-07",
  },
  {
    id: 2,
    vehicle: "Car 1",
    description: "Maintenance",
    amount: 2000,
    date: "2025-12-06",
  },
]);

const addCost = () => alert("Add Cost form will open!");
const editCost = (item) => alert(`Edit Cost: ${item.id}`);
const deleteCost = (id) => {
  if (confirm(`Are you sure to delete cost #${id}?`)) {
    costs.value = costs.value.filter((c) => c.id !== id);
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
