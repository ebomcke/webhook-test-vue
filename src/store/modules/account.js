import accounts from "../../api/accounts";

export default {
  state: {
    account: {}
  },
  mutations: {
    update(state, payload) {
      state.account = payload.account;
    }
  },
  getters: {
    isAuthenticated: state => {
      return !!state.account.uid;
    }
  },
  actions: {
    async login({ commit }, payload) {
      const account = await accounts.createOrGetAccount(payload.user);
      commit({
        type: "update",
        account
      });
      return account;
    },
    logout({ commit }) {
      commit({
        type: "update",
        account: {}
      });
    }
  }
};
