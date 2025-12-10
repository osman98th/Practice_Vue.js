// src/store/index.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useFleetStore = defineStore("fleet", () => {
  const vehicles = ref([{ id: 1, name: "Truck 1", type: "Truck", registration: "AB-1234", status: "Active" }]);
  const drivers = ref([{ id: 1, name: "John Doe", license: "L12345", status: "Active" }]);
  const bookings = ref([]);
  const trips = ref([]);
  const reports = ref([]);
  const costing = ref({ vehicleCost: 1000, driverCost: 500, otherExpenses: 200 });

  return { vehicles, drivers, bookings, trips, reports, costing };
});
