<template>
  <el-card>
    <div slot="header">
      <span class="card-title">Send test message</span>
      <el-button
        class="card-operation"
        type="text"
        :loading="loading"
        :disabled="!endpoint"
        @click.stop="sendMessage"
      >Send</el-button>
    </div>
    <el-form>
      <el-form-item label="Endpoint" required>
        <div>
          <el-select v-model="endpoint" filterable placeholder="Select an endpoint">
            <el-option
              v-for="endpoint in endpoints"
              :key="endpoint.id"
              :label="endpoint.path"
              :value="endpoint.id"
            />
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label="Body">
        <div class="clearfix">
          <prism-editor :code="body" @change="updateBody" language="json "/>
        </div>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import PrismEditor from "vue-prism-editor";
import sendTestMessage from "../api/test-message";
export default {
  data() {
    return {
      body: JSON.stringify(
        {
          example: "content"
        },
        null,
        2
      ),
      endpoint: "",
      loading: false,
      error: false
    };
  },
  computed: {
    endpoints() {
      return this.$store.state.endpoint.data;
    }
  },
  methods: {
    updateBody(body) {
      this.body = body;
    },
    sendMessage() {
      this.loading = true;
      const endpoint = this.$store.getters["endpoint/get"](this.endpoint);
      sendTestMessage(
        this.$store.state.account.account,
        endpoint,
        this.body
      ).then(response => {
        this.loading = false;
        if (response.status !== endpoint.defaultResponse.statusCode) {
          this.error = true;
        }
      });
    }
  },
  components: {
    PrismEditor
  }
};
</script>


<style scoped>
.el-card {
  margin: 11px;
}
.card-operation {
  float: right;
  padding: 3px 0;
}
.card-title {
  font-size: 1.2em;
}
.el-select {
  width: 100%;
}
.clearfix {
  clear: both;
}
</style>
