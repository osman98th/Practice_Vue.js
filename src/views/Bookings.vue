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
                        <label>Assignment (Vehicle + Driver)</label>
                        <select v-model="form.assignment_id" class="form-select">
                            <option disabled value="">Select Assignment</option>
                            <option v-for="a in assignments" :key="a.id" :value="a.id">
                                {{ getVehicleName(a.vehicle_id) }} — {{ getDriverName(a.driver_id) }}
                            </option>
                        </select>
                    </div>

                    <div class="mb-2">
                        <label>Booking Date</label>
                        <input type="date" v-model="form.date" class="form-control" />
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
                            <th>Vehicle</th>
                            <th>Driver</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="b in bookings" :key="b.id">
                            <td>{{ b.id }}</td>
                            <td>{{ getVehicleName(getAssignment(b.assignment_id)?.vehicle_id) }}</td>
                            <td>{{ getDriverName(getAssignment(b.assignment_id)?.driver_id) }}</td>
                            <td>{{ b.date }}</td>
                            <td>
                                <button class="btn btn-sm btn-info me-1" @click="editBooking(b)">Edit</button>
                                <button class="btn btn-sm btn-danger me-1" @click="deleteBooking(b.id)">Delete</button>
                                <button class="btn btn-sm btn-warning" @click="downloadInvoice(b)">Invoice</button>
                            </td>
                        </tr>
                        <tr v-if="bookings.length===0">
                            <td colspan="5" class="text-center">No bookings yet.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    </div>
</div>
</template>

<script>
import jsPDF from "jspdf";

export default {
    name: "Bookings",
    data() {
        return {
            assignments: JSON.parse(localStorage.getItem('assignments')) || [],
            vehicles: JSON.parse(localStorage.getItem('vehicles')) || [],
            drivers: JSON.parse(localStorage.getItem('drivers')) || [],
            bookings: JSON.parse(localStorage.getItem('bookings')) || [],
            showModal: false,
            isEdit: false,
            form: {
                id: null,
                assignment_id: '',
                date: ''
            }
        }
    },
    methods: {
        openModal() {
            this.isEdit = false;
            this.form = { id: null, assignment_id: '', date: '' };
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        saveBooking() {
            if (!this.form.assignment_id || !this.form.date) {
                alert('Select assignment and date');
                return;
            }

            if (this.isEdit) {
                const idx = this.bookings.findIndex(b => b.id === this.form.id);
                if (idx !== -1) this.bookings.splice(idx, 1, { ...this.form });
            } else {
                const id = this.bookings.length ? Math.max(...this.bookings.map(b => b.id)) + 1 : 1;
                this.bookings.push({ ...this.form, id });
            }

            localStorage.setItem('bookings', JSON.stringify(this.bookings));
            this.showModal = false;
        },
        editBooking(b) {
            this.form = { ...b };
            this.isEdit = true;
            this.showModal = true;
        },
        deleteBooking(id) {
            if (confirm(`Delete booking #${id}?`)) {
                this.bookings = this.bookings.filter(b => b.id !== id);
                localStorage.setItem('bookings', JSON.stringify(this.bookings));
            }
        },
        getAssignment(id) {
            return this.assignments.find(a => a.id === id);
        },
        getVehicleName(id) {
            const v = this.vehicles.find(v => v.id === id);
            return v ? v.name : 'Unknown';
        },
        getDriverName(id) {
            const d = this.drivers.find(d => d.id === id);
            return d ? d.name : 'Unknown';
        },

        // Invoice PDF generate
        downloadInvoice(booking) {
            const doc = new jsPDF();
            const assignment = this.getAssignment(booking.assignment_id);
            const vehicleName = this.getVehicleName(assignment?.vehicle_id);
            const driverName = this.getDriverName(assignment?.driver_id);

            doc.setFontSize(16);
            doc.text("Booking Invoice", 20, 20);
            doc.setFontSize(12);
            doc.text(`Booking ID: ${booking.id}`, 20, 40);
            doc.text(`Date: ${booking.date}`, 20, 50);
            doc.text(`Vehicle: ${vehicleName}`, 20, 60);
            doc.text(`Driver: ${driverName}`, 20, 70);

            // Optional: Cost or other details can be added
            // doc.text(`Cost: $100`, 20, 80);

            doc.save(`Booking_Invoice_${booking.id}.pdf`);
        }
    }
}
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
.table th,
.table td {
    vertical-align: middle;
}
</style>
