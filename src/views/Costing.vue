<template>
<div class="content pt-3">
    <div class="container-fluid">
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Costing</h3>
            </div>
            <div class="card-body">
                <div class="mb-2">
                    <label>Vehicle Cost</label>
                    <input type="number" v-model.number="costs.vehicleCost" class="form-control" />
                </div>
                <div class="mb-2">
                    <label>Driver Cost</label>
                    <input type="number" v-model.number="costs.driverCost" class="form-control" />
                </div>
                <div class="mb-2">
                    <label>Other Expenses</label>
                    <input type="number" v-model.number="costs.otherExpenses" class="form-control" />
                </div>
                <div class="mb-2">
                    <label>Total Cost</label>
                    <input type="number" :value="totalCost" class="form-control" readonly />
                </div>
                <button class="btn btn-success btn-sm mt-2" @click="saveCosting">Save Costing</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "Costing",
    data() {
        return {
            costs: {
                vehicleCost: 0,
                driverCost: 0,
                otherExpenses: 0
            }
        };
    },
    computed: {
        totalCost() {
            return this.costs.vehicleCost + this.costs.driverCost + this.costs.otherExpenses;
        }
    },
    methods: {
        saveCosting() {
            alert(`Cost saved! Total: ${this.totalCost}`);
        }
    }
};
</script>

<style scoped>
.form-control {
    width: 100%;
}
</style>
