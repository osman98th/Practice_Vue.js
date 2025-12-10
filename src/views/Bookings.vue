<template>
<div class="content pt-3">
    <div class="container-fluid">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h3 class="card-title">Bookings</h3>
                <button class="btn btn-primary btn-sm" @click="openModal">Add Booking</button>
            </div>

            <!-- Modal -->
            <div v-if="showModal" class="modal-backdrop">
                <div class="modal-box">
                    <h5>{{ isEdit ? "Edit Booking" : "Add Booking" }}</h5>

                    <div class="mb-2">
                        <label>Customer Name</label>
                        <input type="text" v-model="form.customer" class="form-control" />
                    </div>
                    <div class="mb-2">
                        <label>Vehicle</label>
                        <input type="text" v-model="form.vehicle" class="form-control" />
                    </div>
                    <div class="mb-2">
                        <label>Driver</label>
                        <input type="text" v-model="form.driver" class="form-control" />
                    </div>
                    <div class="mb-2">
                        <label>Date</label>
                        <input type="date" v-model="form.date" class="form-control" />
                    </div>
                    <div class="mb-2">
                        <label>Status</label>
                        <select v-model="form.status" class="form-select">
                            <option>Confirmed</option>
                            <option>Pending</option>
                            <option>Cancelled</option>
                        </select>
                    </div>

                    <div class="d-flex justify-content-end gap-2 mt-2">
                        <button class="btn btn-secondary btn-sm" @click="closeModal">Cancel</button>
                        <button class="btn btn-success btn-sm" @click="saveBooking">
                            {{ isEdit ? "Update" : "Add" }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Table -->
            <div class="card-body table-responsive mt-3">
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Vehicle</th>
                            <th>Driver</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="b in bookings" :key="b.id">
                            <td>{{ b.id }}</td>
                            <td>{{ b.customer }}</td>
                            <td>{{ b.vehicle }}</td>
                            <td>{{ b.driver }}</td>
                            <td>{{ b.date }}</td>
                            <td>
                                <span :class="b.status==='Confirmed' ? 'badge bg-success' : 'badge bg-warning'">{{ b.status }}</span>
                            </td>
                            <td>
                                <button class="btn btn-sm btn-info me-1" @click="editBooking(b)">Edit</button>
                                <button class="btn btn-sm btn-danger" @click="deleteBooking(b.id)">Delete</button>
                            </td>
                        </tr>
                        <tr v-if="bookings.length === 0">
                            <td colspan="7" class="text-center">No bookings found.</td>
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
    name: "Bookings",
    data() {
        return {
            bookings: [{
                    id: 1,
                    customer: 'Osman Goni',
                    vehicle: 'Truck 1',
                    driver: 'John Doe',
                    date: '2025-12-10',
                    status: 'Confirmed'
                },
                {
                    id: 2,
                    customer: 'Sara Khan',
                    vehicle: 'Car 1',
                    driver: 'Jane Smith',
                    date: '2025-12-12',
                    status: 'Pending'
                }
            ],
            showModal: false,
            isEdit: false,
            form: {
                id: null,
                customer: '',
                vehicle: '',
                driver: '',
                date: '',
                status: 'Confirmed'
            }
        };
    },
    methods: {
        openModal() {
            this.isEdit = false;
            this.form = {
                id: null,
                customer: '',
                vehicle: '',
                driver: '',
                date: '',
                status: 'Confirmed'
            };
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        saveBooking() {
            if (!this.form.customer || !this.form.vehicle || !this.form.driver || !this.form.date) {
                alert('Fill all fields!');
                return;
            }
            if (this.isEdit) {
                const index = this.bookings.findIndex(b => b.id === this.form.id);
                if (index !== -1) this.bookings.splice(index, 1, {
                    ...this.form
                });
            } else {
                this.bookings.push({
                    ...this.form,
                    id: this.bookings.length + 1
                });
            }
            this.closeModal();
        },
        editBooking(b) {
            this.form = {
                ...b
            };
            this.isEdit = true;
            this.showModal = true;
        },
        deleteBooking(id) {
            if (confirm(`Delete booking #${id}?`)) {
                this.bookings = this.bookings.filter(b => b.id !== id);
            }
        }
    }
};
</script>

<style scoped>
.modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1050;
}

.modal-box {
    background: #fff;
    padding: 20px;
    width: 400px;
    border-radius: 8px;
}

.badge {
    padding: 0.4em;
    font-size: 0.85rem;
}

.table th,
.table td {
    vertical-align: middle;
}
</style>
