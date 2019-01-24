<template>
  <EndpointEditor v-bind="endpoint"/>
</template>

<script>
import EndpointEditor from "../components/EndpointEditor";
export default {
  components: {
    EndpointEditor
  },
  computed: {
    endpoint() {
      return this.$store.state.endpoint.data[this.$route.params.id];
    }
  }
};
</script>
