<template>
  <el-card shadow="hover">
    <a @click="goToWebhook">
      <div slot="header">
        <span class="card-title">/{{ organisationName }}/{{ path }}</span>
        <div class="bottom">
          <Timestamp class="last-active" :timestamp="date" prefix="Received"/>
          <el-button class="card-operation" type="text" @click.stop="deleteWebhook">Delete</el-button>
        </div>
      </div>
      <h5>Body</h5>
      <ShortJson :content="body"/>
    </a>
  </el-card>
</template>

<script>
import ShortJson from "./ShortJson";
import Timestamp from "./Timestamp";
export default {
  props: {
    id: String,
    path: String,
    date: Object,
    body: String
  },
  computed: {
    organisationName() {
      return this.$store.state.account.account.organisationName;
    }
  },
  components: {
    ShortJson,
    Timestamp
  },
  methods: {
    goToWebhook() {
      this.$router.push({
        name: "webhook",
        params: {
          id: this.id
        }
      });
    },
    deleteWebhook() {
      this.$store.dispatch("webhook/delete", this.id);
    }
  }
};
</script>

<style scoped>
.el-card {
  margin: 11px;
  min-height: 385px;
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
