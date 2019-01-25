<template>
  <div>
    <div class="webhook-search">
      <el-select
        v-model="filters"
        multiple
        filterable
        allow-create
        default-first-option
        placeholder="Search by path or content"
        @change="updateFilters"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <el-row>
      <el-col v-for="webhook in webhooks" :key="webhook.id" :span="12">
        <WebhookCard v-bind="webhook"/>
      </el-col>
    </el-row>
    <div v-if="noResults">
      <el-alert
        title="I can't find any webhook matching your search"
        type="info"
        description="Try using less restrictive search criteria. You can also send a test message using the form below"
        show-icon
        :closable="false"
      ></el-alert>
      <WebhookTester/>
    </div>
  </div>
</template>

<script>
import WebhookCard from "../components/WebhookCard";
import WebhookTester from "../components/WebhookTester";

export default {
  data() {
    const pathOptions = Object.values(this.$store.state.endpoint.data).map(
      endpoint => ({
        label: `path: /${endpoint.path}`,
        value: `p-${endpoint.path}`
      })
    );
    return {
      filters: this.$store.state.webhook.filters,
      options: pathOptions
    };
  },
  computed: {
    webhooks() {
      return this.$store.getters["webhook/filteredWebhooks"];
    },
    noResults() {
      return this.webhooks.length === 0;
    }
  },
  components: { WebhookCard, WebhookTester },
  methods: {
    updateFilters(filters) {
      this.$store.dispatch({
        type: "webhook/filter",
        filters
      });
    }
  }
};
</script>

<style scoped>
.webhook-search {
  margin: 11px 0;
}
.webhook-search > .el-select {
  display: block;
}
</style>
