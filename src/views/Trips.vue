<template>
<div class="content pt-3">
    <div class="container-fluid">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h3 class="card-title">Trips</h3>
                <button class="btn btn-primary btn-sm" @click="openModal">Add Trip</button>
            </div>

            <!-- Modal -->
            <div v-if="showModal" class="modal-backdrop">
                <div class="modal-box">
                    <h5>{{ isEdit ? "Edit Trip" : "Add Trip" }}</h5>

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
                        <label>Trip Date</label>
                        <input type="date" v-model="form.date" class="form-control" />
                    </div>

                    <div class="mb-2">
                        <label>Start Location</label>
                        <input type="text" v-model="form.start" class="form-control" />
                    </div>

                    <div class="mb-2">
                        <label>End Location</label>
                        <input type="text" v-model="form.end" class="form-control" />
                    </div>

                    <div class="mb-2">
                        <label>Distance (km)</label>
                        <input type="number" v-model.number="form.distance" class="form-control" />
                    </div>

                    <div class="d-flex justify-content-end gap-2 mt-2">
                        <button class="btn btn-secondary btn-sm" @click="closeModal">Cancel</button>
                        <button class="btn btn-success btn-sm" @click="saveTrip">
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
                            <th>Start</th>
                            <th>End</th>
                            <th>Distance (km)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="t in trips" :key="t.id">
                            <td>{{ t.id }}</td>
                            <td>{{ getVehicleName(getAssignment(t.assignment_id)?.vehicle_id) }}</td>
                            <td>{{ getDriverName(getAssignment(t.assignment_id)?.driver_id) }}</td>
                            <td>{{ t.date }}</td>
                            <td>{{ t.start }}</td>
                            <td>{{ t.end }}</td>
                            <td>{{ t.distance }}</td>
                            <td>
                                <button class="btn btn-sm btn-info me-1" @click="editTrip(t)">Edit</button>
                                <button class="btn btn-sm btn-danger me-1" @click="deleteTrip(t.id)">Delete</button>
                                <button class="btn btn-sm btn-warning" @click="downloadInvoice(t)">Invoice</button>
                            </td>
                        </tr>
                        <tr v-if="trips.length===0">
                            <td colspan="8" class="text-center">No trips yet.</td>
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
    name: "Trips",
    data() {
        return {
            assignments: JSON.parse(localStorage.getItem('assignments')) || [],
            vehicles: JSON.parse(localStorage.getItem('vehicles')) || [],
            drivers: JSON.parse(localStorage.getItem('drivers')) || [],
            trips: JSON.parse(localStorage.getItem('trips')) || [],
            showModal: false,
            isEdit: false,
            form: {
                id: null,
                assignment_id: '',
                date: '',
                start: '',
                end: '',
                distance: 0
            }
        }
    },
    methods: {
        openModal() {
            this.isEdit = false;
            this.form = {
                id: null,
                assignment_id: '',
                date: '',
                start: '',
                end: '',
                distance: 0
            };
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        saveTrip() {
            if (!this.form.assignment_id || !this.form.date || !this.form.start || !this.form.end) {
                alert('All fields are required');
                return;
            }
            if (this.isEdit) {
                const idx = this.trips.findIndex(t => t.id === this.form.id);
                if (idx !== -1) this.trips.splice(idx, 1, {
                    ...this.form
                });
            } else {
                const id = this.trips.length ? Math.max(...this.trips.map(t => t.id)) + 1 : 1;
                this.trips.push({
                    ...this.form,
                    id
                });
            }
            localStorage.setItem('trips', JSON.stringify(this.trips));
            this.showModal = false;
        },
        editTrip(t) {
            this.form = {
                ...t
            };
            this.isEdit = true;
            this.showModal = true;
        },
        deleteTrip(id) {
            if (confirm(`Delete trip #${id}?`)) {
                this.trips = this.trips.filter(t => t.id !== id);
                localStorage.setItem('trips', JSON.stringify(this.trips));
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
        calculateCost(distance) {
            // Example: $2 per km
            return distance * 2;
        },

        // ---------- PROFESSIONAL INVOICE ----------
        downloadInvoice(trip) {
            const doc = new jsPDF("p", "mm", "a4");
            const assignment = this.getAssignment(trip.assignment_id);
            const vehicleName = this.getVehicleName(assignment ?.vehicle_id);
            const driverName = this.getDriverName(assignment ?.driver_id);

            // HEADER
            doc.setFontSize(18);
            doc.text("Fleet Trip Invoice", 14, 20);

            doc.setFontSize(10);
            doc.text("Fleet Management Ltd", 150, 20);
            doc.text("64 Raman Park Avenue, Dhaka", 150, 26);
            doc.text("Phone: 01797 147515", 150, 32);
            doc.text("VAT No: GB123456789", 150, 38);

            // INVOICE INFO
            doc.setFontSize(11);
            doc.text(`Invoice #: INV-${trip.id}`, 14, 40);
            doc.text(`Invoice Date: ${trip.date}`, 14, 46);

            // VEHICLE DETAILS
            doc.setFontSize(12);
            doc.text("Trip Details:", 14, 60);
            doc.setFontSize(10);
            doc.text(`Vehicle: ${vehicleName}`, 14, 66);
            doc.text(`Driver: ${driverName}`, 14, 72);
            doc.text(`From: ${trip.start}`, 14, 78);
            doc.text(`To: ${trip.end}`, 14, 84);
            doc.text(`Distance: ${trip.distance} km`, 14, 90);
            doc.text(`Cost: ${this.calculateCost(trip.distance).toFixed(2)}`, 14, 96);

            // FOOTER
            doc.setFontSize(9);
            doc.text(
                "Thank you for choosing our service. We hope our service made your life easier.",
                14,
                280
            );

            doc.save(`Trip_Invoice_${trip.id}.pdf`);
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
