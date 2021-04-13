<template>
  <textarea ref="textarea" v-model="code"></textarea>
</template>

<script>
import CodeMirror from "codemirror/lib/codemirror.js";
import "codemirror/lib/codemirror.css";
export default {
  mounted() {
    // https://codemirror.net/index.html
    CodeMirror.fromTextArea(this.$refs["textarea"], {
      lineNumbers: true
    });
  },
  data() {
    return {
      code: "12311",
    };
  },
};
</script>

<style lang="scss">
</style>

