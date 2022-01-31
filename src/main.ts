import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "element-plus/lib/theme-chalk/index.css";

//everything is surely good
const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.provide("store", store);
app.mount("#app");
