<template>
  <div class="api">
    {{ key }}
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "api",
  components: {
    // HelloWorld
  },
  computed: {
    key() {
      return this.$route.params.key;
    },
  },
};
</script>
