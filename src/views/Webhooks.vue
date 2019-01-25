<template>
  <div>
    <el-row>
      <el-col v-for="webhook in webhooks" :key="webhook.id" :span="12">
        <WebhookCard v-bind="webhook"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import WebhookCard from "../components/WebhookCard";

export default {
  data() {
    return { webhooks: this.$store.state.webhook.data };
  },
  components: { WebhookCard }
};
</script>
