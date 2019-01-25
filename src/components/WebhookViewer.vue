<template>
  <div>
    <h5>Message id</h5>
    <div>{{ id }}</div>
    <h5>Received</h5>
    <Timestamp :timestamp="date"/>
    <h5>Body</h5>
    <prism-editor :code="bodyFormatted" language="json" readonly></prism-editor>
  </div>
</template>

<script>
import PrismEditor from "vue-prism-editor";
import Timestamp from "./Timestamp";
export default {
  props: {
    id: String,
    path: String,
    date: Object,
    body: String
  },
  components: {
    Timestamp,
    PrismEditor
  },
  computed: {
    bodyFormatted() {
      return JSON.stringify(JSON.parse(this.body), null, 2);
    }
  }
};
</script>
