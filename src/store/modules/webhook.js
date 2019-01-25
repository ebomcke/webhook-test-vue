import createEasyFirestore from "vuex-easy-firestore";

const webhook = {
  firestorePath: "webhooks",
  firestoreRefType: "collection",
  moduleName: "webhook",
  statePropName: "data",
  namespaced: true
};

export default createEasyFirestore(webhook, { logging: true });
