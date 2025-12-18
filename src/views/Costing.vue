<template>
<div class="container py-4">
    <div class="row mb-4">
        <div class="col-md-3">
            <div class="card border-0 shadow-sm p-3 bg-white">
                <div class="d-flex align-items-center">
                    <div class="icon-box bg-primary-light text-primary me-3">
                        <i class="bi bi-truck"></i>
                    </div>
                    <div>
                        <small class="text-muted d-block">Total Trips</small>
                        <h4 class="fw-bold mb-0">{{ trips.length }}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="card shadow-sm border-0 overflow-hidden">
        <div class="card-header d-flex justify-content-between align-items-center bg-white py-3 border-bottom">
            <h5 class="card-title mb-0 fw-bold text-dark">
                <i class="bi bi-journal-text me-2 text-primary"></i>Fleet Costing & Invoices
            </h5>
            <button class="btn btn-primary btn-sm fw-bold px-4 shadow-sm rounded-pill" @click="openModal">
                <i class="bi bi-plus-lg me-1"></i> Add New Trip
            </button>
        </div>

        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                    <thead class="bg-light text-secondary small fw-bold">
                        <tr>
                            <th class="ps-4">TRIP ID</th>
                            <th>VEHICLE & DRIVER</th>
                            <th>DATE</th>
                            <th>ROUTE</th>
                            <th>DISTANCE</th>
                            <th>TOTAL COST</th>
                            <th class="text-center">ACTION</th>
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
                                <div class="d-flex align-items-center">
                                    <span class="badge bg-soft-primary text-primary border-0">{{ t.start }}</span>
                                    <i class="bi bi-arrow-right mx-2 text-muted small"></i>
                                    <span class="badge bg-soft-secondary text-dark border-0">{{ t.end }}</span>
                                </div>
                            </td>
                            <td>{{ t.distance }} km</td>
                            <td class="fw-bold text-success">
                                ${{ ((t.distance * 2) * 1.05).toFixed(2) }}
                            </td>
                            <td class="text-center">
                                <button class="btn btn-danger btn-sm rounded-pill px-3 shadow-sm d-inline-flex align-items-center gap-2 btn-invoice" @click="downloadAndPrintInvoice(t)">
                                    <i class="bi bi-file-earmark-pdf"></i>
                                    <span>Invoice</span>
                                </button>
                            </td>
                        </tr>
                        <tr v-if="trips.length === 0">
                            <td colspan="7" class="text-center py-5 text-muted">
                                <i class="bi bi-inbox fs-2 d-block mb-2"></i>
                                No trips recorded yet.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div v-if="showModal" class="modal-overlay d-flex justify-content-center align-items-center">
        <div class="modal-dialog-custom shadow-lg">
            <div class="modal-header-custom">
                <h5 class="mb-0 fw-bold">Create New Trip</h5>
                <button type="button" class="btn-close-custom" @click="closeModal">&times;</button>
            </div>
            <div class="modal-body p-4 bg-white">
                <div class="mb-3">
                    <label class="form-label fw-bold small text-muted">ASSIGNMENT</label>
                    <select v-model="form.assignment_id" class="form-select custom-input">
                        <option disabled value="">Select Vehicle + Driver</option>
                        <option v-for="a in assignments" :key="a.id" :value="a.id">
                            {{ getVehicleName(a.vehicle_id) }} — {{ getDriverName(a.driver_id) }}
                        </option>
                    </select>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label fw-bold small text-muted">DATE</label>
                        <input type="date" v-model="form.date" class="form-control custom-input" />
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label fw-bold small text-muted">FROM</label>
                        <select v-model="form.start" @change="updateDistance" class="form-select custom-input">
                            <option v-for="d in districts" :key="d" :value="d">{{ d }}</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label fw-bold small text-muted">TO</label>
                        <select v-model="form.end" @change="updateDistance" class="form-select custom-input">
                            <option v-for="d in districts" :key="d" :value="d">{{ d }}</option>
                        </select>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label fw-bold small text-muted">DISTANCE (KM)</label>
                        <input type="number" v-model.number="form.distance" class="form-control custom-input bg-light" readonly />
                    </div>
                </div>
            </div>
            <div class="modal-footer-custom px-4 py-3 bg-light d-flex justify-content-end gap-2">
                <button class="btn btn-light px-4 fw-bold" @click="closeModal">Cancel</button>
                <button class="btn btn-primary px-4 fw-bold rounded-pill" @click="saveTrip">Save Trip</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import jsPDF from "jspdf";

export default {
    name: "FleetManager",
    data() {
        return {
            trips: JSON.parse(localStorage.getItem('trips')) || [],
            assignments: JSON.parse(localStorage.getItem('assignments')) || [],
            vehicles: JSON.parse(localStorage.getItem('vehicles')) || [],
            drivers: JSON.parse(localStorage.getItem('drivers')) || [],
            showModal: false,
            form: {
                id: null,
                assignment_id: '',
                date: '',
                start: 'Dhaka',
                end: 'Chattogram',
                distance: 0
            },
            districts: ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh", "Gazipur"],
            distanceMatrix: {}
        };
    },
    created() {
        this.districts.forEach(s => {
            this.distanceMatrix[s] = {};
            this.districts.forEach(e => {
                this.distanceMatrix[s][e] = (s === e) ? 0 : Math.floor(Math.random() * 300) + 50;
            });
        });
    },
    methods: {
        openModal() {
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
        updateDistance() {
            if (this.form.start && this.form.end) this.form.distance = this.distanceMatrix[this.form.start][this.form.end] || 120;
        },
        saveTrip() {
            if (!this.form.assignment_id) return alert("Select an assignment");
            const newId = this.trips.length ? Math.max(...this.trips.map(t => t.id)) + 1 : 1001;
            this.trips.unshift({
                ...this.form,
                id: newId
            });
            localStorage.setItem('trips', JSON.stringify(this.trips));
            this.showModal = false;
        },
        getAssignment(id) {
            return this.assignments.find(a => a.id === id);
        },
        getVehicleName(id) {
            return this.vehicles.find(v => v.id === id) ?.name || 'N/A';
        },
        getDriverName(id) {
            return this.drivers.find(d => d.id === id) ?.name || 'N/A';
        },

        downloadAndPrintInvoice(trip) {
            const doc = new jsPDF();
            const assignment = this.getAssignment(trip.assignment_id);
            const subtotal = trip.distance * 2;
            const gst = subtotal * 0.05;
            const total = subtotal + gst;

            // Header Background
            doc.setFillColor(33, 37, 41);
            doc.rect(0, 0, 210, 50, 'F');

            // Logo Text (Simulating Logo Image)
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(26);
            doc.setFont("helvetica", "bold");
            doc.text("FLEET", 15, 28);
            doc.setTextColor(13, 110, 253);
            doc.text("INSTITUTE", 48, 28);

            doc.setFontSize(9);
            doc.setTextColor(180, 180, 180);
            doc.setFont("helvetica", "normal");
            doc.text("OFFICIAL LOGISTICS INVOICE", 15, 36);

            // Company Info (Right Side)
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(10);
            doc.text("Fleet Propertise Ltd.", 195, 20, {
                align: "right"
            });
            doc.setFontSize(8);
            doc.text("64 Ramna Park Avenue, Dhaka, Bangladesh", 195, 25, {
                align: "right"
            });
            doc.text("fleet-propertise.bd.com", 195, 30, {
                align: "right"
            });

            // Billing Info
            doc.setTextColor(33, 37, 41);
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.text("TRIP DETAILS", 15, 70);

            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.text(`Invoice ID: #${trip.id}`, 15, 78);
            doc.text(`Issued Date: ${trip.date}`, 15, 83);

            // Driver/Vehicle Section
            doc.setFillColor(248, 249, 250);
            doc.rect(15, 95, 180, 25, 'F');
            doc.setFont("helvetica", "bold");
            doc.text("Driver Name:", 20, 103);
            doc.text("Vehicle:", 20, 111);
            doc.setFont("helvetica", "normal");
            doc.text(this.getDriverName(assignment ?.driver_id), 50, 103);
            doc.text(this.getVehicleName(assignment ?.vehicle_id), 50, 111);

            // Table Header
            doc.setFillColor(13, 110, 253);
            doc.rect(15, 130, 180, 10, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFont("helvetica", "bold");
            doc.text("DESCRIPTION", 20, 136.5);
            doc.text("DISTANCE", 110, 136.5);
            doc.text("TOTAL", 175, 136.5);

            // Table Body
            doc.setTextColor(33, 37, 41);
            doc.setFont("helvetica", "normal");
            doc.text(`Transport Route: ${trip.start} to ${trip.end}`, 20, 150);
            doc.text(`${trip.distance} KM`, 110, 150);
            doc.text(`${subtotal.toFixed(2)}`, 175, 150);

            // Calculation
            doc.line(15, 160, 195, 160);
            doc.text("Subtotal:", 140, 170);
            doc.text(`${subtotal.toFixed(2)}`, 175, 170);
            doc.text("Tax (VAT 5%):", 140, 178);
            doc.text(`${gst.toFixed(2)}`, 175, 178);

            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text("GRAND TOTAL:", 140, 190);
            doc.setTextColor(13, 110, 253);
            doc.text(`${total.toFixed(2)}`, 175, 190);

            // Footer
            doc.setTextColor(150);
            doc.setFontSize(8);
            doc.text("Thank you for choosing Fleet Institute. Safe travels!", 105, 280, {
                align: "center"
            });

            doc.save(`Invoice_${trip.id}.pdf`);
        }
    }
};
</script>

<style scoped>
/* Modern UI Classes */
.bg-primary-light {
    background: rgba(13, 110, 253, 0.1);
}

.icon-box {
    width: 45px;
    height: 45px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
}

.bg-soft-primary {
    background: #e7f0ff;
}

.bg-soft-secondary {
    background: #f8f9fa;
}

.btn-invoice:hover {
    transform: scale(1.05);
    transition: 0.3s;
}

/* Custom Modal */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 2000;
    backdrop-filter: blur(3px);
}

.modal-dialog-custom {
    width: 450px;
    border-radius: 15px;
    overflow: hidden;
    animation: slideUp 0.3s ease;
}

.modal-header-custom {
    background: #0d6efd;
    color: white;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.btn-close-custom {
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
}

.custom-input {
    border: 2px solid #eee;
    border-radius: 10px;
    padding: 10px;
}

.custom-input:focus {
    border-color: #0d6efd;
    box-shadow: none;
}

@keyframes slideUp {
    from {
        transform: translateY(20px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>
