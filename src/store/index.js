import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import account from "./modules/account";

export default new Vuex.Store({
  modules: {
    account
  }
});
