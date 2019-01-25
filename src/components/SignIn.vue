<template>
  <div id="firebaseui-auth-container"></div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

export default {
  name: "sign-in",
  mounted() {
    this.initUi();
  },
  beforeDestroy() {
    if (this.ui && this.ui.delete) this.ui.delete();
  },
  computed: {
    authenticated: function() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    async initUi() {
      const firebaseui = await import(/* webpackChunkName: "firebaseui" */ "firebaseui");
      if (this.ui) {
        this.ui.reset();
      }
      this.ui = new firebaseui.auth.AuthUI(firebase.auth());
      this.ui.start("#firebaseui-auth-container", uiConfig);
    }
  }
};
</script>
