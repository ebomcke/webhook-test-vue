<template>
  <div>
    <el-button type="primary" class="new-resource" @click="newEndpoint">New endpoint</el-button>
    <el-row>
      <el-col v-for="endpoint in endpoints" :key="endpoint.id" :span="12">
        <EndpointCard v-bind="endpoint"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import EndpointCard from "../components/EndpointCard";
import firebase from "firebase/app";
import "firebase/firestore";

export default {
  data() {
    return { endpoints: this.$store.state.endpoint.data };
  },
  components: { EndpointCard },
  methods: {
    newEndpoint() {
      this.$store.dispatch("endpoint/insert", {
        account: firebase
          .firestore()
          .doc(`/accounts/${this.$store.state.account.account.id}`),
        path: `my-new-url-${new Date().getTime()}`
      });
    }
  }
};
</script>

<style scoped>
.new-resource {
  margin: 11px;
}
</style>
