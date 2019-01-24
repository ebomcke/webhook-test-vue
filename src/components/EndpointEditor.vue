<template>
  <div>
    <el-form>
      <el-form-item label="Path">
        <el-input v-model="path"/>
      </el-form-item>
      <el-form-item label="Default response status code">
        <div>
          <el-select v-model="defaultResponse.statusCode" filterable>
            <el-option
              v-for="item in statusCodes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label="Default response body">
        <el-input type="textarea" :autosize="{ minRows: 5}" v-model="defaultResponse.body"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveEndpoint" :loading="loading">Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    path: String,
    lastActive: Object,
    defaultResponse: Object
  },
  data() {
    return {
      statusCodes: [
        { label: "200 - OK", value: 200 },
        { label: "201 - Created", value: 201 }
      ],
      loading: false
    };
  },
  methods: {
    saveEndpoint() {
      this.loading = true;
      this.$store
        .dispatch("endpoint/patch", {
          id: this.id,
          path: this.path,
          defaultResponse: this.defaultResponse
        })
        .then(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
.el-select {
  width: 100%;
}
</style>
