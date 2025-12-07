<template>
  <div class="content-wrapper p-3">
    <!-- Cards -->
    <div class="row">
      <div
        class="col-lg-3 col-md-6 col-sm-12 mb-3"
        v-for="card in cards"
        :key="card.title"
      >
        <div :class="['small-box', card.bg]">
          <div class="inner">
            <h3>{{ card.value }}</h3>
            <p>{{ card.title }}</p>
          </div>
          <div class="icon">
            <i :class="card.icon"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Chart -->
    <div class="card mt-3">
      <div class="card-header">
        <h3 class="card-title">Trips Overview</h3>
      </div>
      <div class="card-body" style="height: 300px">
        <canvas ref="chartCanvas"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const chartCanvas = ref(null);
const cards = [
  { title: "Vehicles", value: 24, icon: "fas fa-truck", bg: "bg-info" },
  { title: "Drivers", value: 12, icon: "fas fa-user", bg: "bg-success" },
  { title: "Trips Today", value: 8, icon: "fas fa-route", bg: "bg-warning" },
  {
    title: "Bookings",
    value: 5,
    icon: "fas fa-calendar-check",
    bg: "bg-danger",
  },
];

onMounted(() => {
  if (!chartCanvas.value) return;
  new Chart(chartCanvas.value, {
    type: "bar",
    data: {
      labels: ["Bus", "Car", "Micro", "Ambulance"],
      datasets: [
        {
          label: "Trips Completed",
          data: [12, 19, 7, 14],
          backgroundColor: "#007bff",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: true } },
      scales: { y: { beginAtZero: true } },
    },
  });
});
</script>

<style scoped>
.small-box {
  color: #fff;
  padding: 20px;
  border-radius: 0.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 100px;
}
.small-box .inner h3 {
  font-size: 1.5rem;
  margin: 0;
}
.small-box .inner p {
  margin: 0;
  font-size: 1rem;
}
.small-box .icon {
  font-size: 2.5rem;
  opacity: 0.7;
}
.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  border-radius: 0.25rem;
}
.card-header h3 {
  margin: 0;
  font-weight: 600;
}
</style>
