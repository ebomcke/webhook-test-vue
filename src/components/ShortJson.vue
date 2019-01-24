<template>
  <pre>
    <code>{{ shortContent }}</code>
  </pre>
</template>

<script>
export default {
  props: {
    content: String,
    prepend: String
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
