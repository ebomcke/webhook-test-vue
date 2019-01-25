<template>
  <WebhookViewer v-bind="webhook"/>
</template>

<script>
import WebhookViewer from "../components/WebhookViewer";
export default {
  components: {
    WebhookViewer
  },
  computed: {
    webhook() {
      return this.$store.state.webhook.data[this.$route.params.id];
    }
  }
};
</script>
