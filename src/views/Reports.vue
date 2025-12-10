<template>
<div class="content pt-3">
    <div class="container-fluid">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h3 class="card-title">Reports</h3>
                <button class="btn btn-primary btn-sm" @click="openModal">Add Report</button>
            </div>

            <!-- Modal -->
            <div v-if="showModal" class="modal-backdrop">
                <div class="modal-box">
                    <h5>{{ isEdit ? "Edit Report" : "Add Report" }}</h5>

                    <div class="mb-2">
                        <label>Report Name</label>
                        <input type="text" v-model="form.name" class="form-control" />
                    </div>
                    <div class="mb-2">
                        <label>Description</label>
                        <input type="text" v-model="form.description" class="form-control" />
                    </div>
                    <div class="mb-2">
                        <label>Date</label>
                        <input type="date" v-model="form.date" class="form-control" />
                    </div>

                    <div class="d-flex justify-content-end gap-2 mt-2">
                        <button class="btn btn-secondary btn-sm" @click="closeModal">Cancel</button>
                        <button class="btn btn-success btn-sm" @click="saveReport">
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
                            <th>Report Name</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="r in reports" :key="r.id">
                            <td>{{ r.id }}</td>
                            <td>{{ r.name }}</td>
                            <td>{{ r.description }}</td>
                            <td>{{ r.date }}</td>
                            <td>
                                <button class="btn btn-sm btn-info me-1" @click="editReport(r)">Edit</button>
                                <button class="btn btn-sm btn-danger" @click="deleteReport(r.id)">Delete</button>
                            </td>
                        </tr>
                        <tr v-if="reports.length === 0">
                            <td colspan="5" class="text-center">No reports found.</td>
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
    name: "Reports",
    data() {
        return {
            reports: [{
                id: 1,
                name: 'Monthly Report',
                description: 'December 2025',
                date: '2025-12-10'
            }],
            showModal: false,
            isEdit: false,
            form: {
                id: null,
                name: '',
                description: '',
                date: ''
            }
        };
    },
    methods: {
        openModal() {
            this.isEdit = false;
            this.form = {
                id: null,
                name: '',
                description: '',
                date: ''
            };
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        saveReport() {
            if (!this.form.name || !this.form.description || !this.form.date) {
                alert('Fill all fields!');
                return;
            }
            if (this.isEdit) {
                const index = this.reports.findIndex(r => r.id === this.form.id);
                if (index !== -1) this.reports.splice(index, 1, {
                    ...this.form
                });
            } else {
                this.reports.push({
                    ...this.form,
                    id: this.reports.length + 1
                });
            }
            this.closeModal();
        },
        editReport(r) {
            this.form = {
                ...r
            };
            this.isEdit = true;
            this.showModal = true;
        },
        deleteReport(id) {
            if (confirm(`Delete report #${id}?`)) {
                this.reports = this.reports.filter(r => r.id !== id);
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
