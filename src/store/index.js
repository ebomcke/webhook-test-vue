import firebase from "firebase/app";
import "firebase/firestore";

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import account from "./modules/account";
import endpoint from "./modules/endpoint";

const store = new Vuex.Store({
  modules: {
    account
  },
  plugins: [endpoint]
});

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const accountRef = firebase
      .firestore()
      .collection("accounts")
      .doc(user.uid);
    store
      .dispatch("endpoint/openDBChannel", {
        where: [["account", "==", accountRef]],
        orderBy: ["lastActive", "desc"]
      })
      .catch(console.error);
  } else {
    store.dispatch("endpoint/closeDBChannel");
  }
});

export default store;
