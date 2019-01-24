import createEasyFirestore from "vuex-easy-firestore";

const endpoint = {
  firestorePath: "endpoints",
  firestoreRefType: "collection",
  moduleName: "endpoint",
  statePropName: "data",
  namespaced: true
};

export default createEasyFirestore(endpoint, { logging: true });
