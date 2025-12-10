// src/stores/dashboard.js
import { defineStore } from "pinia";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    cards: [
      { title: "Revenue", value: 12000, bg: "primary", isCurrency: true },
      { title: "Users", value: 450, bg: "success", isCurrency: false },
      { title: "Orders", value: 89, bg: "warning", isCurrency: false },
      { title: "Feedbacks", value: 25, bg: "danger", isCurrency: false },
    ],
  }),
});
