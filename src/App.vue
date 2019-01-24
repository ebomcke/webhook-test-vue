<template>
  <div id="app">
    <Navigation/>
    <router-view/>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import Navigation from "./components/Navigation.vue";
import account from "./controllers/Account";

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
        account
          .createOrGetAccount(user)
          .then(account => {
            $store.commit({
              type: "authenticate",
              account
            });
            if (account.confirmed) {
              $router.replace("home");
            } else {
              $router.replace("account");
            }
          })
          .catch(e => console.log(e));
      } else {
        $store.commit("logout");
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
</style>
