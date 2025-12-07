<script setup>
import { ref } from 'vue'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Pie } from 'vue-chartjs'

import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

// Sample Fleet Performance Data
const reports = ref([
  { vehicle: 'Truck 1', trips: 12, distance: 1200 },
  { vehicle: 'Truck 2', trips: 19, distance: 1900 },
  { vehicle: 'Truck 3', trips: 7, distance: 700 },
  { vehicle: 'Truck 4', trips: 14, distance: 1400 },
])

const chartData = {
  labels: reports.value.map(r => r.vehicle),
  datasets: [
    {
      label: 'Trips',
      backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545'],
      data: reports.value.map(r => r.trips)
    }
  ]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Fleet Trips Distribution' }
  }
}

// Export to Excel
const exportExcel = () => {
  const ws = XLSX.utils.json_to_sheet(reports.value)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Fleet Report')
  XLSX.writeFile(wb, 'Fleet_Report.xlsx')
}

// Export to PDF
const exportPDF = () => {
  const doc = new jsPDF()
  doc.text('Fleet Report', 14, 16)
  doc.autoTable({
    startY: 20,
    head: [['Vehicle', 'Trips', 'Distance (km)']],
    body: reports.value.map(r => [r.vehicle, r.trips, r.distance])
  })
  doc.save('Fleet_Report.pdf')
}
</script>

<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Fleet Reports</h3>
    </div>
    <div class="card-body">
      <div style="height: 300px;">
        <Pie :chart-data="chartData" :chart-options="chartOptions" />
      </div>

      <div class="mt-4">
        <button class="btn btn-success mr-2" @click="exportExcel">
          <i class="fas fa-file-excel"></i> Export Excel
        </button>
        <button class="btn btn-danger" @click="exportPDF">
          <i class="fas fa-file-pdf"></i> Export PDF
        </button>
      </div>

      <h5 class="mt-4">Fleet Details</h5>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>Trips</th>
            <th>Distance (km)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in reports" :key="r.vehicle">
            <td>{{ r.vehicle }}</td>
            <td>{{ r.trips }}</td>
            <td>{{ r.distance }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
