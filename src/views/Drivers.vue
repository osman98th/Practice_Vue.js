<template>
<div class="content pt-3">
    <div class="container-fluid">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h3 class="card-title">Drivers</h3>
                <button class="btn btn-primary btn-sm" @click="openModal">Add Driver</button>
            </div>

            <!-- Modal -->
            <div v-if="showModal" class="modal-backdrop">
                <div class="modal-box">
                    <h5>{{ isEdit ? "Edit Driver" : "Add Driver" }}</h5>

                    <div class="mb-2">
                        <label>Name</label>
                        <input type="text" v-model="form.name" class="form-control" />
                    </div>

                    <div class="mb-2">
                        <label>License No</label>
                        <input type="text" v-model="form.license" class="form-control" />
                    </div>

                    <div class="mb-2">
                        <label>Phone</label>
                        <input type="text" v-model="form.phone" class="form-control" />
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
                        <button class="btn btn-success btn-sm" @click="saveDriver">
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
                            <th>License No</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="d in drivers" :key="d.id">
                            <td>{{ d.id }}</td>
                            <td>{{ d.name }}</td>
                            <td>{{ d.license }}</td>
                            <td>{{ d.phone }}</td>
                            <td>
                                <span :class="d.status==='Active'?'badge bg-success':'badge bg-secondary'">{{d.status}}</span>
                            </td>
                            <td>
                                <button class="btn btn-sm btn-info me-1" @click="editDriver(d)">Edit</button>
                                <button class="btn btn-sm btn-danger" @click="deleteDriver(d.id)">Delete</button>
                            </td>
                        </tr>
                        <tr v-if="drivers.length===0">
                            <td colspan="6" class="text-center">No drivers found.</td>
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
    name: "Drivers",
    data() {
        return {
            drivers: JSON.parse(localStorage.getItem('drivers')) || [],
            showModal: false,
            isEdit: false,
            form: {
                id: null,
                name: '',
                license: '',
                phone: '',
                status: 'Active'
            }
        }
    },
    methods: {
        openModal() {
            this.isEdit = false;
            this.form = {
                id: null,
                name: '',
                license: '',
                phone: '',
                status: 'Active'
            };
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        saveDriver() {
            if (!this.form.name || !this.form.license || !this.form.phone) {
                alert('Fill all fields!');
                return;
            }
            if (this.isEdit) {
                const idx = this.drivers.findIndex(d => d.id === this.form.id);
                if (idx !== -1) this.drivers.splice(idx, 1, {
                    ...this.form
                });
            } else {
                const id = this.drivers.length ? Math.max(...this.drivers.map(d => d.id)) + 1 : 1;
                this.drivers.push({
                    ...this.form,
                    id
                });
            }
            localStorage.setItem('drivers', JSON.stringify(this.drivers));
            this.closeModal();
        },
        editDriver(d) {
            this.form = {
                ...d
            };
            this.isEdit = true;
            this.showModal = true;
        },
        deleteDriver(id) {
            if (confirm(`Delete driver #${id}?`)) {
                this.drivers = this.drivers.filter(d => d.id !== id);
                localStorage.setItem('drivers', JSON.stringify(this.drivers));
            }
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

.badge {
    padding: 0.4em;
    font-size: 0.85rem;
}
</style>
