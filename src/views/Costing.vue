<template>
<div class="container py-4">
    <div class="card shadow-sm border-0">
        <div class="card-header d-flex justify-content-between align-items-center bg-primary text-white py-3">
            <h3 class="card-title mb-0 fw-bold">Fleet Costing & Invoices</h3>
            <button class="btn btn-light btn-sm fw-bold px-3 shadow-sm" @click="openModal">
                <i class="bi bi-plus-circle me-1"></i> Add New Trip
            </button>
        </div>

        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                    <thead class="table-light text-secondary small fw-bold">
                        <tr>
                            <th class="ps-4">ID</th>
                            <th>Vehicle & Driver</th>
                            <th>Date</th>
                            <th>Route</th>
                            <th>Distance</th>
                            <th>Total Cost (Inc. GST)</th>
                            <th class="text-center">Invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="t in trips" :key="t.id">
                            <td class="ps-4 fw-bold text-primary">#{{ t.id }}</td>
                            <td>
                                <div class="fw-bold text-dark">{{ getVehicleName(getAssignment(t.assignment_id)?.vehicle_id) }}</div>
                                <div class="small text-muted">{{ getDriverName(getAssignment(t.assignment_id)?.driver_id) }}</div>
                            </td>
                            <td>{{ t.date }}</td>
                            <td>
                                <span class="badge bg-light text-dark border fw-normal">{{ t.start }}</span>
                                <i class="bi bi-arrow-right mx-2 text-muted"></i>
                                <span class="badge bg-light text-dark border fw-normal">{{ t.end }}</span>
                            </td>
                            <td>{{ t.distance }} km</td>
                            <td class="fw-bold text-success">
                                ${{ ((t.distance * 2) * 1.05).toFixed(2) }}
                            </td>
                            <td class="text-center">
                                <button class="btn btn-warning btn-sm circular-btn" @click="downloadAndPrintInvoice(t)" title="Download Invoice">
                                    <i class="bi bi-file-earmark-pdf"></i>
                                </button>
                            </td>
                        </tr>
                        <tr v-if="trips.length === 0">
                            <td colspan="7" class="text-center py-5 text-muted">No trips recorded yet.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-backdrop d-flex justify-content-center align-items-center">
        <div class="modal-dialog w-100 shadow-lg border-0">
            <div class="modal-content border-0">
                <div class="modal-header bg-light border-bottom">
                    <h5 class="modal-title fw-bold text-dark">{{ isEdit ? 'Edit Trip' : 'Add New Trip' }}</h5>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body p-4">
                    <div class="mb-3">
                        <label class="form-label fw-semibold small">Assignment (Vehicle + Driver)</label>
                        <select v-model="form.assignment_id" class="form-select border-2 searchable-select">
                            <option disabled value="">Select Assignment</option>
                            <option v-for="a in assignments" :key="a.id" :value="a.id">
                                {{ getVehicleName(a.vehicle_id) }} — {{ getDriverName(a.driver_id) }}
                            </option>
                        </select>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-semibold small">Trip Date</label>
                            <input type="date" v-model="form.date" class="form-control border-2" />
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-semibold small">From Location</label>
                            <select v-model="form.start" @change="updateDistance" class="form-select border-2 searchable-select">
                                <option disabled value="">Select District</option>
                                <option v-for="d in districts" :key="d" :value="d">{{ d }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-semibold small">To Location</label>
                            <select v-model="form.end" @change="updateDistance" class="form-select border-2 searchable-select">
                                <option disabled value="">Select District</option>
                                <option v-for="d in districts" :key="d" :value="d">{{ d }}</option>
                            </select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label fw-semibold small">Distance (Calculated km)</label>
                            <input type="number" v-model.number="form.distance" class="form-control border-2 bg-light fw-bold" readonly />
                        </div>
                    </div>
                </div>
                <div class="modal-footer bg-light border-0">
                    <button class="btn btn-secondary px-4" @click="closeModal">Cancel</button>
                    <button class="btn btn-primary px-4 fw-bold" @click="saveTrip">Save Trip</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import jsPDF from "jspdf";

export default {
    name: "Costing",
    data() {
        return {
            trips: JSON.parse(localStorage.getItem('trips')) || [],
            assignments: JSON.parse(localStorage.getItem('assignments')) || [],
            vehicles: JSON.parse(localStorage.getItem('vehicles')) || [],
            drivers: JSON.parse(localStorage.getItem('drivers')) || [],
            showModal: false,
            isEdit: false,
            form: {
                id: null,
                assignment_id: '',
                date: '',
                start: '',
                end: '',
                distance: 0
            },
            districts: [
                "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogra", "Brahmanbaria", "Chandpur",
                "Chattogram", "Chuadanga", "Cox's Bazar", "Dhaka", "Dinajpur", "Faridpur", "Feni", "Gaibandha",
                "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore", "Jhalokati", "Jhenaidah", "Joypurhat",
                "Kishoreganj", "Khagrachhari", "Khulna", "Kurigram", "Kushtia", "Lakshmipur", "Lalmonirhat",
                "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj", "Mymensingh",
                "Naogaon", "Narail", "Narsingdi", "Natore", "Netrokona", "Nilphamari", "Noakhali", "Pabna",
                "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur",
                "Satkhira", "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj", "Sylhet", "Tangail", "Thakurgaon"
            ],
            distanceMatrix: {}
        };
    },
    created() {
        this.districts.forEach(start => {
            this.distanceMatrix[start] = {};
            this.districts.forEach(end => {
                this.distanceMatrix[start][end] = (start === end) ? 0 : Math.floor(Math.random() * 400) + 40;
            });
        });
    },
    methods: {
        openModal() {
            this.isEdit = false;
            this.form = {
                id: null,
                assignment_id: '',
                date: new Date().toISOString().split('T')[0],
                start: 'Dhaka',
                end: 'Chattogram',
                distance: 0
            };
            this.updateDistance();
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        saveTrip() {
            if (!this.form.assignment_id || !this.form.date || !this.form.start || !this.form.end) return alert("All fields are required");
            const id = this.trips.length ? Math.max(...this.trips.map(t => t.id)) + 1 : 1052;
            this.trips.push({
                ...this.form,
                id
            });
            localStorage.setItem('trips', JSON.stringify(this.trips));
            this.showModal = false;
        },
        updateDistance() {
            if (this.form.start && this.form.end) this.form.distance = this.distanceMatrix[this.form.start][this.form.end] || 0;
        },
        getAssignment(id) {
            return this.assignments.find(a => a.id === id);
        },
        getVehicleName(id) {
            return this.vehicles.find(v => v.id === id) ?.name || 'Unknown';
        },
        getDriverName(id) {
            return this.drivers.find(d => d.id === id) ?.name || 'Unknown';
        },
        downloadAndPrintInvoice(trip) {
            const doc = new jsPDF("p", "mm", "a4");
            const assignment = this.getAssignment(trip.assignment_id);
            const driverName = this.getDriverName(assignment ?.driver_id);
            const vehicle = this.getVehicleName(assignment ?.vehicle_id);
            const subtotal = trip.distance * 2;
            const gst = subtotal * 0.05;
            const total = subtotal + gst;

            doc.setFont("helvetica", "bold");
            doc.setTextColor(119, 188, 31);
            doc.setFontSize(22);
            doc.text("Fleet Institue", 14, 20);

            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.setTextColor(0, 50, 80);
            doc.text("Fleet Operations Ltd.", 200, 18, {
                align: "right"
            });
            doc.setFontSize(8);
            doc.text("64 Raman Park Avenue, Dhaka-1000", 200, 23, {
                align: "right"
            });
            doc.text("Contact: 888-01797-147-515 | osmangoni.top", 200, 27, {
                align: "right"
            });

            doc.setFont("helvetica", "bold");
            doc.setTextColor(100);
            doc.text("INVOICE FOR:", 14, 45);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(0);
            doc.setFontSize(11);
            doc.text(driverName, 14, 51);
            doc.setFontSize(9);
            doc.text(`Vehicle: ${vehicle}`, 14, 56);
            doc.text(`Trip Route: ${trip.start} to ${trip.end}`, 14, 61);

            doc.setFillColor(119, 188, 31);
            doc.rect(130, 40, 70, 10, 'F');
            doc.setTextColor(255);
            doc.setFontSize(13);
            doc.text(`Invoice #${trip.id}`, 134, 47);

            doc.setTextColor(80);
            doc.setFontSize(9);
            doc.text("Date Issued:", 134, 57);
            doc.setTextColor(0);
            doc.text(trip.date, 196, 57, {
                align: "right"
            });

            const calcY = 130;
            doc.setDrawColor(230);
            doc.line(130, calcY - 5, 200, calcY - 5);
            doc.setTextColor(80);
            doc.text("Subtotal", 130, calcY);
            doc.text(`${subtotal.toFixed(2)}`, 198, calcY, {
                align: "right"
            });
            doc.text("GST (5.0%)", 130, calcY + 6);
            doc.text(`${gst.toFixed(2)}`, 198, calcY + 6, {
                align: "right"
            });

            doc.setFillColor(119, 188, 31);
            doc.rect(130, calcY + 10, 70, 10, 'F');
            doc.setTextColor(255);
            doc.setFont("helvetica", "bold");
            doc.text("TOTAL AMOUNT", 134, calcY + 16.5);
            doc.text(`${total.toFixed(2)}`, 196, calcY + 16.5, {
                align: "right"
            });

            doc.setFontSize(8);
            doc.setTextColor(150);
            doc.text("Thank you for your business. Terms: Due upon receipt.", 14, 280);

            doc.save(`Invoice_${trip.id}.pdf`);
            window.open(doc.output('bloburl'), '_blank');
        }
    }
};
</script>

<style scoped>
.modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1050;
    backdrop-filter: blur(2px);
}

.modal-dialog {
    max-width: 550px;
}

.circular-btn {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s;
    border: none;
}

.circular-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Scrollable & styled select for 64 districts */
.searchable-select {
    max-height: 200px;
    overflow-y: auto;
    border-radius: 5px;
}

.searchable-select option {
    padding: 6px 10px;
}

.searchable-select:focus {
    outline: 2px solid #0d6efd;
    box-shadow: 0 0 5px rgba(13, 110, 253, 0.5);
}
</style>
