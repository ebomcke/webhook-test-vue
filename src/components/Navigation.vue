<template>
  <el-menu mode="horizontal" router>
    <el-menu-item index="/">Home</el-menu-item>
    <el-menu-item v-if="authenticated" index="/account">Account</el-menu-item>
    <el-menu-item v-if="authenticated" index="/endpoints">Endpoints</el-menu-item>
    <el-menu-item v-if="authenticated" index="/webhooks">Webhooks</el-menu-item>
    <a v-if="authenticated" @click="logout" class="logout-menu-item">Logout</a>
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
.logout-menu-item {
  font-size: 14px;
  padding: 0 20px;
  cursor: pointer;
  height: 60px;
  line-height: 60px;
  margin: 0;
  border-bottom: 2px solid transparent;
  color: #909399;
  float: right;
}
</style>
