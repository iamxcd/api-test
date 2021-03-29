<template>
  <div class="api">
    <UrlBar></UrlBar>
    <ToolBar></ToolBar>
  </div>
</template>

<script>
import UrlBar from "@/components/UrlBar";
import ToolBar from "@/components/ToolBar";
export default {
  name: "api",
  components: {
    UrlBar,
    ToolBar,
  },
  computed: {
    key() {
      return this.$route.params.key;
    },
  },
};
</script>
