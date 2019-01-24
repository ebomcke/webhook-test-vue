<template>
  <div id="firebaseui-auth-container"></div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import * as firebaseui from "firebaseui";

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
    if (this.ui) {
      this.ui.reset();
    }
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());
    this.ui.start("#firebaseui-auth-container", uiConfig);
  },
  beforeDestroy() {
    if (this.ui && this.ui.delete) this.ui.delete();
  }
};
</script>
