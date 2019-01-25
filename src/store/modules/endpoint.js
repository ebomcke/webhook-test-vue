import createEasyFirestore from "vuex-easy-firestore";
import firebase from "firebase/app";
import "firebase/firestore";

const endpoint = {
  firestorePath: "endpoints",
  firestoreRefType: "collection",
  moduleName: "endpoint",
  statePropName: "data",
  namespaced: true,
  sync: {
    defaultValues: {
      defaultResponse: {
        statusCode: 200,
        body: JSON.stringify({ status: "OK" })
      },
      lastActive: firebase.firestore.Timestamp.now()
    }
  },
  getters: {
    sorted: state => {
      return Object.values(state.data).sort((e1, e2) => {
        return e1.lastActive.toMillis() > e2.lastActive.toMillis() ? -1 : 1;
      });
    },
    get: state => id => {
      return state.data[id];
    }
  }
};

export default createEasyFirestore(endpoint, { logging: true });
