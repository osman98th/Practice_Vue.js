<template>
  <div class="content pt-3">
    <div class="container-fluid">
      <div class="card">
        <div
          class="card-header d-flex justify-content-between align-items-center"
        >
          <h3 class="card-title">Bookings</h3>
          <button class="btn btn-primary btn-sm" @click="addBooking">
            Add Booking
          </button>
        </div>
        <div class="card-body table-responsive">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in bookings" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.customer }}</td>
                <td>{{ item.vehicle }}</td>
                <td>{{ item.date }}</td>
                <td>
                  <span
                    :class="
                      item.status === 'Confirmed'
                        ? 'badge bg-success'
                        : 'badge bg-warning'
                    "
                  >
                    {{ item.status }}
                  </span>
                </td>
                <td>
                  <button
                    class="btn btn-sm btn-info me-1"
                    @click="editBooking(item)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-sm btn-danger"
                    @click="deleteBooking(item.id)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr v-if="bookings.length === 0">
                <td colspan="6" class="text-center">No bookings found.</td>
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

const bookings = ref([
  {
    id: 1,
    customer: "Ali Khan",
    vehicle: "Truck 1",
    date: "2025-12-07",
    status: "Confirmed",
  },
  {
    id: 2,
    customer: "Sara Rahman",
    vehicle: "Car 1",
    date: "2025-12-06",
    status: "Pending",
  },
]);

const addBooking = () => alert("Add Booking form will open!");
const editBooking = (item) => alert(`Edit Booking: ${item.id}`);
const deleteBooking = (id) => {
  if (confirm(`Are you sure to delete booking #${id}?`)) {
    bookings.value = bookings.value.filter((b) => b.id !== id);
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
