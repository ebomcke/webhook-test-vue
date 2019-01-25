<template>
  <div id="app">
    <Navigation/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import Navigation from "./components/Navigation.vue";
import("prismjs");
import("prismjs/themes/prism.css");

export default {
  name: "app",
  components: {
    Navigation
  },
  created() {
    const $router = this.$router;
    const $store = this.$store;
    this.unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        $store
          .dispatch({
            type: "login",
            user
          })
          .then(account => {
            if (account.confirmed) {
              $router.replace("/webhooks");
            } else {
              $router.replace("/account");
            }
          });
      } else {
        $store.dispatch("logout");
        $router.replace("home");
      }
    });
  },
  beforeDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 11px;
}
</style>
