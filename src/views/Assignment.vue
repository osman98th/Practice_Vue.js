<template>
<div class="content pt-3">
    <div class="container-fluid">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h3 class="card-title">Assignments</h3>
                <button class="btn btn-primary btn-sm" @click="openModal">Assign Vehicle</button>
            </div>

            <!-- Modal -->
            <div v-if="showModal" class="modal-backdrop">
                <div class="modal-box">
                    <h5>{{ isEdit ? "Edit Assignment" : "Assign Vehicle to Driver" }}</h5>

                    <div class="mb-2">
                        <label>Vehicle</label>
                        <select v-model="form.vehicle_id" class="form-select">
                            <option disabled value="">Select Vehicle</option>
                            <option v-for="v in vehicles" :key="v.id" :value="v.id">{{v.id}} — {{v.name}}</option>
                        </select>
                    </div>

                    <div class="mb-2">
                        <label>Driver</label>
                        <select v-model="form.driver_id" class="form-select">
                            <option disabled value="">Select Driver</option>
                            <option v-for="d in drivers" :key="d.id" :value="d.id">{{d.id}} — {{d.name}}</option>
                        </select>
                    </div>

                    <div class="d-flex justify-content-end gap-2 mt-2">
                        <button class="btn btn-secondary btn-sm" @click="closeModal">Cancel</button>
                        <button class="btn btn-success btn-sm" @click="saveAssignment">
                            {{ isEdit ? "Update" : "Assign" }}
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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="a in assignments" :key="a.id">
                            <td>{{ a.id }}</td>
                            <td>{{ getVehicleName(a.vehicle_id) }}</td>
                            <td>{{ getDriverName(a.driver_id) }}</td>
                            <td>
                                <button class="btn btn-sm btn-info me-1" @click="editAssignment(a)">Edit</button>
                                <button class="btn btn-sm btn-danger" @click="deleteAssignment(a.id)">Delete</button>
                            </td>
                        </tr>
                        <tr v-if="assignments.length===0">
                            <td colspan="4" class="text-center">No assignments yet.</td>
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
    name: "Assignments",
    data() {
        return {
            vehicles: JSON.parse(localStorage.getItem('vehicles')) || [],
            drivers: JSON.parse(localStorage.getItem('drivers')) || [],
            assignments: JSON.parse(localStorage.getItem('assignments')) || [],
            showModal: false,
            isEdit: false,
            form: {
                id: null,
                vehicle_id: '',
                driver_id: ''
            }
        }
    },
    methods: {
        openModal() {
            this.isEdit = false;
            this.form = {
                id: null,
                vehicle_id: '',
                driver_id: ''
            };
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },

        saveAssignment() {
            if (!this.form.vehicle_id || !this.form.driver_id) {
                alert('Select both vehicle & driver');
                return;
            }

            // Prevent duplicate vehicle assignment
            if (!this.isEdit) {
                const exists = this.assignments.find(a => a.vehicle_id === this.form.vehicle_id);
                if (exists) {
                    alert('Vehicle already assigned');
                    return;
                }
            } else {
                const exists = this.assignments.find(a => a.vehicle_id === this.form.vehicle_id && a.id !== this.form.id);
                if (exists) {
                    alert('Vehicle already assigned');
                    return;
                }
            }

            if (this.isEdit) {
                const idx = this.assignments.findIndex(a => a.id === this.form.id);
                if (idx !== -1) this.assignments.splice(idx, 1, {
                    ...this.form
                });
            } else {
                const id = this.assignments.length ? Math.max(...this.assignments.map(a => a.id)) + 1 : 1;
                this.assignments.push({
                    ...this.form,
                    id
                });
            }

            localStorage.setItem('assignments', JSON.stringify(this.assignments));
            this.showModal = false;
        },

        editAssignment(a) {
            this.form = {
                ...a
            };
            this.isEdit = true;
            this.showModal = true;
        },

        deleteAssignment(id) {
            if (confirm(`Delete assignment #${id}?`)) {
                this.assignments = this.assignments.filter(a => a.id !== id);
                localStorage.setItem('assignments', JSON.stringify(this.assignments));
            }
        },

        getVehicleName(id) {
            const v = this.vehicles.find(v => v.id === id);
            return v ? v.name : 'Unknown';
        },
        getDriverName(id) {
            const d = this.drivers.find(d => d.id === id);
            return d ? d.name : 'Unknown';
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
