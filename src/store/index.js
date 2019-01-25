import firebase from "firebase/app";
import "firebase/firestore";

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import account from "./modules/account";
import endpoint from "./modules/endpoint";
import webhook from "./modules/webhook";

const store = new Vuex.Store({
  modules: {
    account
  },
  plugins: [endpoint, webhook]
});

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const accountRef = firebase
      .firestore()
      .collection("accounts")
      .doc(user.uid);
    store.dispatch("endpoint/openDBChannel", {
      where: [["account", "==", accountRef]],
      orderBy: ["lastActive", "desc"]
    });
    store.dispatch("webhook/openDBChannel", {
      where: [["account", "==", accountRef]],
      orderBy: ["date", "desc"]
    });
  } else {
    store.dispatch("endpoint/closeDBChannel");
    store.dispatch("webhook/closeDBChannel");
  }
});

export default store;
