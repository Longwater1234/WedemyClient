import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";
import YoutubeIframe from "@techassi/vue-youtube-iframe";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

//everything is surely good
const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.use(YoutubeIframe);
app.provide("store", store);
app.mount("#app");
