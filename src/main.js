import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // router import

createApp(App)
  .use(router) // router inject
  .mount("#app");
