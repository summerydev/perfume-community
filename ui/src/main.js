import Vue from "vue";
import App from "./App.vue";
import router from "./routes/routes";
import axios from "axios";
import { store } from "./store/index";

Vue.prototype.$axios = axios;

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
  router,
}).$mount("#app");
