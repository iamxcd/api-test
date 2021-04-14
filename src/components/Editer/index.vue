<template>
  <textarea ref="textarea" v-model="code"></textarea>
</template>

<script>
import CodeMirror from "codemirror/lib/codemirror.js";
import "codemirror/lib/codemirror.css";
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      code: "",
      cm: null,
    };
  },
  watch: {
    value(value) {
      this.code = value;
      this.cm && this.cm.setValue(value);
    },
  },
  mounted() {
    // https://codemirror.net/index.html
    this.cm = CodeMirror.fromTextArea(this.$refs["textarea"], {
      lineNumbers: true,
    });
    // this.cm.setSize("auto", "calc(100vh - 300px)");
  },
};
</script>

<style lang="scss">
</style>

