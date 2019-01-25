import createEasyFirestore from "vuex-easy-firestore";

const webhook = {
  firestorePath: "webhooks",
  firestoreRefType: "collection",
  moduleName: "webhook",
  statePropName: "data",
  namespaced: true,
  state: {
    filters: []
  },
  getters: {
    filteredWebhooks: state => {
      const pathFilters = state.filters.filter(f => f.startsWith("p-"));
      const contentFilters = state.filters.filter(f => !f.startsWith("p-"));
      return Object.values(state.data)
        .filter(
          webhook =>
            (pathFilters.length === 0 ||
              pathFilters.some(f => webhook.path === f.replace("p-", ""))) &&
            (contentFilters.length === 0 ||
              contentFilters.every(f => webhook.body.includes(f)))
        )
        .sort((w1, w2) => {
          return w1.date.toMillis() > w2.date.toMillis() ? -1 : 1;
        });
    }
  },
  mutations: {
    setFilters(state, payload) {
      state.filters = payload.filters;
    }
  },
  actions: {
    filter({ commit }, payload) {
      commit({
        type: "setFilters",
        filters: payload.filters
      });
    }
  }
};

export default createEasyFirestore(webhook, { logging: true });
