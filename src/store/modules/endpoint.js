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
    get: state => id => {
      return state.data[id];
    }
  }
};

export default createEasyFirestore(endpoint, { logging: true });
