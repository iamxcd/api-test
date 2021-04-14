<template>
  <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="响应" name="first">
      <Body :value="bodyValue"></Body>
    </el-tab-pane>
    <el-tab-pane lazy label="响应头" name="second">
      <!-- <Params></Params> -->
    </el-tab-pane>
    <el-tab-pane lazy label="响应文档" name="third">
      <!-- <Body></Body> -->
    </el-tab-pane>
  </el-tabs>
</template>
<script>
// import Params from "./components/Params";
import Body from "./components/Body";
export default {
  components: {
    // Params,
    Body,
  },
  props: {
    response: {
      type: Object,
    },
  },
  data() {
    return {
      activeName: "first",
      bodyValue: "",
    };
  },
  methods: {
    handleClick(tab, event) {
      this.activeName = tab.paneName;
    },
  },
  watch: {
    response: {
      handler(res) {
        if (res.data) {
          this.bodyValue = res.data;
        }
        console.log("监听到了响应", res.data);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>