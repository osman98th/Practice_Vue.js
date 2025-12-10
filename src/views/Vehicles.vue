<template>
<div class="content pt-3">
    <div class="container-fluid">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h3 class="card-title">Vehicles</h3>
                <button class="btn btn-primary btn-sm" @click="openModal">Add Vehicle</button>
            </div>

            <!-- Modal -->
            <div v-if="showModal" class="modal-backdrop">
                <div class="modal-box">
                    <h5>{{ isEdit ? "Edit Vehicle" : "Add Vehicle" }}</h5>

                    <div class="mb-2">
                        <label>Name</label>
                        <input type="text" v-model="form.name" class="form-control" />
                    </div>
                    <div class="mb-2">
                        <label>Type</label>
                        <select v-model="form.type" class="form-select">
                            <option disabled value="">Select Type</option>
                            <option>Truck</option>
                            <option>Car</option>
                            <option>Microbus</option>
                        </select>
                    </div>
                    <div class="mb-2">
                        <label>Registration</label>
                        <input type="text" v-model="form.registration" class="form-control" />
                    </div>
                    <div class="mb-2">
                        <label>Status</label>
                        <select v-model="form.status" class="form-select">
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </div>

                    <div class="d-flex justify-content-end gap-2 mt-2">
                        <button class="btn btn-secondary btn-sm" @click="closeModal">Cancel</button>
                        <button class="btn btn-success btn-sm" @click="saveVehicle">
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
                            <th>Name</th>
                            <th>Type</th>
                            <th>Registration</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="v in vehicles" :key="v.id">
                            <td>{{ v.id }}</td>
                            <td>{{ v.name }}</td>
                            <td>{{ v.type }}</td>
                            <td>{{ v.registration }}</td>
                            <td>
                                <span :class="v.status === 'Active' ? 'badge bg-success' : 'badge bg-secondary'">
                                    {{ v.status }}
                                </span>
                            </td>
                            <td>
                                <button class="btn btn-sm btn-info me-1" @click="editVehicle(v)">Edit</button>
                                <button class="btn btn-sm btn-danger" @click="deleteVehicle(v.id)">Delete</button>
                            </td>
                        </tr>
                        <tr v-if="vehicles.length === 0">
                            <td colspan="6" class="text-center">No vehicles found.</td>
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
    name: "Vehicles",
    data() {
        return {
            vehicles: [{
                    id: 1,
                    name: "Truck 1",
                    type: "Truck",
                    registration: "AB-1234",
                    status: "Active"
                },
                {
                    id: 2,
                    name: "Car 1",
                    type: "Car",
                    registration: "CD-5678",
                    status: "Active"
                }
            ],
            showModal: false,
            isEdit: false,
            form: {
                id: null,
                name: "",
                type: "",
                registration: "",
                status: "Active"
            }
        };
    },
    methods: {
        openModal() {
            this.isEdit = false;
            this.form = {
                id: null,
                name: "",
                type: "",
                registration: "",
                status: "Active"
            };
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        saveVehicle() {
            if (!this.form.name || !this.form.type || !this.form.registration) {
                alert("Fill all fields!");
                return;
            }

            if (this.isEdit) {
                const index = this.vehicles.findIndex(v => v.id === this.form.id);
                if (index !== -1) this.vehicles.splice(index, 1, {
                    ...this.form
                });
            } else {
                this.vehicles.push({
                    ...this.form,
                    id: this.vehicles.length + 1
                });
            }

            this.closeModal();
        },
        editVehicle(v) {
            this.form = {
                ...v
            };
            this.isEdit = true;
            this.showModal = true;
        },
        deleteVehicle(id) {
            if (confirm(`Delete vehicle #${id}?`)) {
                this.vehicles = this.vehicles.filter(v => v.id !== id);
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
