import Vue from "vue";
import Vuex from "vuex";
import reviews from "./modules/reviews";
import user from "./modules/user";
Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    reviews,
    user,
  },
});
