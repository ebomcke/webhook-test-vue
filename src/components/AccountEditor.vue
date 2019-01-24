<template>
  <div>
    <h1>Account settings</h1>
    <el-form>
      <el-form-item label="Organisation name">
        <el-input v-model="account.organisationName"/>
      </el-form-item>
      <el-alert
        title="Why do I need this?"
        type="info"
        description="The organisation name that you choose will appear in your URLs to make them unique across all users."
        show-icon
        :closable="false"
      ></el-alert>
      <el-form-item>
        <el-button type="primary" @click="saveAccount" :loading="loading">Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      account: this.$store.state.account.account,
      loading: false
    };
  },
  methods: {
    saveAccount() {
      this.loading = true;
      this.$store
        .dispatch({
          type: "update",
          account: this.account
        })
        .then(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
.el-alert {
  margin-top: -11px;
  margin-bottom: 22px;
}
</style>
