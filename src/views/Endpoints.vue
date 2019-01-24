<template>
  <div>
    <el-button type="primary" class="new-resource">New endpoint</el-button>
    <el-row>
      <el-col v-for="endpoint in endpoints" :key="endpoint.id" :span="12">
        <EndpointCard v-bind="endpoint"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import EndpointCard from "../components/EndpointCard";
export default {
  data() {
    return { endpoints: this.$store.state.endpoint.data };
  },
  components: { EndpointCard }
};
</script>

<style scoped>
.new-resource {
  margin: 11px;
}
</style>
