<template>
  <el-menu mode="horizontal" router>
    <el-menu-item index="/">Home</el-menu-item>
    <el-menu-item v-if="authenticated" index="account">Account</el-menu-item>
    <el-menu-item v-if="authenticated" @click="logout" index="/" class="logout-menu-item">Logout</el-menu-item>
  </el-menu>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "navigation",
  computed: {
    authenticated: function() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut();
    }
  }
};
</script>

<style scoped>
.el-menu--horizontal > .el-menu-item.logout-menu-item {
  float: right;
}
</style>
