<template>
  <el-card shadow="hover">
    <div slot="header">
      <span class="card-title">/{{ path }}</span>
      <div class="bottom">
        <Timestamp class="last-active" :timestamp="lastActive" prefix="Last active"/>
        <el-button class="card-operation" type="text" @click="deleteEndpoint">Delete</el-button>
      </div>
    </div>
    <h5>Default response</h5>
    <ShortJson :content="defaultResponse.body" :prepend="httpHeader"/>
  </el-card>
</template>

<script>
import ShortJson from "./ShortJson";
import Timestamp from "./Timestamp";
export default {
  props: {
    id: String,
    path: String,
    lastActive: Object,
    defaultResponse: Object
  },
  computed: {
    httpHeader() {
      return `HTTP ${this.defaultResponse.statusCode}:`;
    }
  },
  components: {
    ShortJson,
    Timestamp
  },
  methods: {
    deleteEndpoint() {
      this.$store.dispatch("endpoint/delete", this.id);
    }
  }
};
</script>

<style scoped>
.el-card {
  margin: 11px;
  min-height: 300px;
}
.card-operation {
  float: right;
  padding: 3px 0;
  color: #f56c6c;
}
.card-operation:hover {
  color: #f78989;
}
.last-active {
  font-size: 13px;
  color: #999;
}
.card-title {
  font-size: 1.2em;
}
</style>
