<template>
  <div class="content pt-3">
    <div class="container-fluid">
      <!-- Card -->
      <div class="card">
        <div
          class="card-header d-flex flex-wrap justify-content-between align-items-center"
        >
          <h3 class="card-title mb-2">Reports</h3>

          <!-- Filters & Actions -->
          <div class="d-flex flex-wrap align-items-center gap-2 mb-2">
            <input
              type="text"
              v-model="search"
              placeholder="Search Trip/Driver/Vehicle"
              class="form-control form-control-sm"
            />
            <input
              type="date"
              v-model="fromDate"
              class="form-control form-control-sm"
            />
            <input
              type="date"
              v-model="toDate"
              class="form-control form-control-sm"
            />
            <button class="btn btn-success btn-sm" @click="printInvoice">
              <i class="fas fa-print"></i> Print
            </button>
            <button class="btn btn-primary btn-sm" @click="downloadPDF">
              <i class="fas fa-file-pdf"></i> PDF
            </button>
          </div>
        </div>

        <div class="card-body" ref="reportContent">
          <!-- Invoice Header -->
          <div class="invoice-header text-center mb-3">
            <h2>Fleet Management Institute</h2>
            <p>123 Street, City, Country | Email: info@fleet.com</p>
            <hr />
          </div>

          <!-- Table -->
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Trip</th>
                  <th>Vehicle</th>
                  <th>Driver</th>
                  <th>Status</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="report in filteredReports" :key="report.id">
                  <td>{{ report.id }}</td>
                  <td>{{ report.trip }}</td>
                  <td>{{ report.vehicle }}</td>
                  <td>{{ report.driver }}</td>
                  <td>
                    <span
                      :class="
                        report.status === 'Completed'
                          ? 'badge bg-success'
                          : 'badge bg-warning'
                      "
                    >
                      {{ report.status }}
                    </span>
                  </td>
                  <td>${{ report.cost }}</td>
                </tr>
                <tr v-if="filteredReports.length === 0">
                  <td colspan="6" class="text-center">No reports found.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Totals & Barcode -->
          <div
            class="d-flex justify-content-between mt-4 align-items-center flex-wrap gap-3"
          >
            <div>
              <p><strong>Total Trips:</strong> {{ filteredReports.length }}</p>
              <p><strong>Total Cost:</strong> ${{ totalCost }}</p>
            </div>
            <div>
              <svg ref="barcode"></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import JsBarcode from "jsbarcode";

// Sample reports
const reports = ref([
  {
    id: 1,
    trip: "Trip 1",
    vehicle: "Truck 1",
    driver: "John Doe",
    status: "Completed",
    cost: 120,
    date: "2025-12-01",
  },
  {
    id: 2,
    trip: "Trip 2",
    vehicle: "Car 1",
    driver: "Jane Smith",
    status: "Pending",
    cost: 50,
    date: "2025-12-03",
  },
  {
    id: 3,
    trip: "Trip 3",
    vehicle: "Microbus",
    driver: "Ali Khan",
    status: "Completed",
    cost: 75,
    date: "2025-12-05",
  },
]);

const reportContent = ref(null);
const barcode = ref(null);

const search = ref("");
const fromDate = ref("");
const toDate = ref("");

// Filter reports
const filteredReports = computed(() => {
  return reports.value.filter((r) => {
    const matchesSearch =
      r.trip.toLowerCase().includes(search.value.toLowerCase()) ||
      r.driver.toLowerCase().includes(search.value.toLowerCase()) ||
      r.vehicle.toLowerCase().includes(search.value.toLowerCase());

    const matchesFromDate = fromDate.value
      ? new Date(r.date) >= new Date(fromDate.value)
      : true;
    const matchesToDate = toDate.value
      ? new Date(r.date) <= new Date(toDate.value)
      : true;

    return matchesSearch && matchesFromDate && matchesToDate;
  });
});

const totalCost = computed(() =>
  filteredReports.value.reduce((sum, r) => sum + r.cost, 0)
);

// Barcode
onMounted(() => {
  if (barcode.value) {
    JsBarcode(barcode.value, "FM-INV-2025", {
      format: "CODE128",
      width: 2,
      height: 40,
      displayValue: true,
    });
  }
});

// Print
const printInvoice = () => {
  const printContents = reportContent.value.innerHTML;
  const originalContents = document.body.innerHTML;
  document.body.innerHTML = `<div style="margin:20px">${printContents}</div>`;
  window.print();
  document.body.innerHTML = originalContents;
  window.location.reload();
};

// PDF
const downloadPDF = async () => {
  const canvas = await html2canvas(reportContent.value, { scale: 2 });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("invoice.pdf");
};
</script>

<style scoped>
.content {
  background-color: #f4f6f9;
  min-height: 100vh;
}
.table-responsive {
  overflow-x: auto;
}
.table th,
.table td {
  vertical-align: middle;
}
.badge {
  padding: 0.5em;
  font-size: 0.9rem;
}
.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
}
.invoice-header h2 {
  margin: 0;
  font-weight: 600;
}
.invoice-header p {
  margin: 0;
  font-size: 0.9rem;
  color: #555;
}
</style>
