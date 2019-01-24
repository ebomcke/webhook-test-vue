import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    account: {
      authenticated: false,
      displayName: "",
      id: "",
      photo: "",
      confirmed: false
    }
  },
  mutations: {
    authenticate(state, account) {
      state.account = {
        authenticated: true,
        displayName: account.displayName,
        id: account.uid,
        photo: account.photoURL,
        confirmed: account.confirmed
      };
    },
    logout(state) {
      state.account = {
        authenticated: false,
        displayName: "",
        id: "",
        photo: "",
        confirmed: false
      };
    }
  }
});
