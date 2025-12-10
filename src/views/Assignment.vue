<template>
<div class="content pt-3">
    <div class="container-fluid">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h3 class="card-title">Assignment</h3>
                <button class="btn btn-primary btn-sm" @click="openModal">Add Assignment</button>
            </div>

            <!-- Modal -->
            <div v-if="showModal" class="modal-backdrop">
                <div class="modal-box">
                    <h5>{{ isEdit ? 'Edit Assignment' : 'Add Assignment' }}</h5>
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
                    <div class="d-flex justify-content-end gap-2 mt-2">
                        <button class="btn btn-secondary btn-sm" @click="closeModal">Cancel</button>
                        <button class="btn btn-success btn-sm" @click="saveAssignment">
                            {{ isEdit ? 'Update' : 'Add' }}
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
                        <tr v-for="a in assignments" :key="a.id">
                            <td>{{ a.id }}</td>
                            <td>{{ a.vehicle }}</td>
                            <td>{{ a.driver }}</td>
                            <td>{{ a.date }}</td>
                            <td>
                                <button class="btn btn-sm btn-info me-1" @click="editAssignment(a)">Edit</button>
                                <button class="btn btn-sm btn-danger" @click="deleteAssignment(a.id)">Delete</button>
                            </td>
                        </tr>
                        <tr v-if="assignments.length === 0">
                            <td colspan="5" class="text-center">No assignments found.</td>
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
    name: "Assignment",
    data() {
        return {
            assignments: [{
                id: 1,
                vehicle: 'Truck 1',
                driver: 'John Doe',
                date: '2025-12-10'
            }],
            showModal: false,
            isEdit: false,
            form: {
                id: null,
                vehicle: '',
                driver: '',
                date: ''
            }
        };
    },
    methods: {
        openModal() {
            this.isEdit = false;
            this.form = {
                id: null,
                vehicle: '',
                driver: '',
                date: ''
            };
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        saveAssignment() {
            if (!this.form.vehicle || !this.form.driver || !this.form.date) {
                alert('Fill all fields!');
                return;
            }
            if (this.isEdit) {
                const index = this.assignments.findIndex(a => a.id === this.form.id);
                if (index !== -1) this.assignments.splice(index, 1, {
                    ...this.form
                });
            } else {
                this.assignments.push({
                    ...this.form,
                    id: this.assignments.length + 1
                });
            }
            this.closeModal();
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

.table th,
.table td {
    vertical-align: middle;
}
</style>
