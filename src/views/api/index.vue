<template>
  <div class="api">
    <UrlBar></UrlBar>
  </div>
</template>

<script>
import UrlBar from "./components/UrlBar";
export default {
  name: "api",
  components: {
    UrlBar,
  },
  computed: {
    key() {
      return this.$route.params.key;
    },
  },
};
</script>
