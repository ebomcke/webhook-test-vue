<template>
  <prism-editor :code="shortContent" language="json" readonly></prism-editor>
</template>

<script>
import PrismEditor from "vue-prism-editor";
export default {
  props: {
    content: String,
    prepend: String
  },
  components: {
    PrismEditor
  },
  computed: {
    shortContent() {
      let lines = JSON.stringify(JSON.parse(this.content), null, 2).split(/\n/);
      if (this.prepend) {
        lines = [this.prepend, ...lines];
      }
      if (lines.length > 6) {
        lines = lines.slice(0, 6).concat("[...]", lines.slice(-1));
      }
      return lines.join("\r\n");
    }
  }
};
</script>
