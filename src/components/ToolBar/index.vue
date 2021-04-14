<template>
  <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="参数" name="params">
      <Params></Params>
    </el-tab-pane>
    <el-tab-pane lazy label="请求头" name="header">
      <Params></Params>
    </el-tab-pane>
    <el-tab-pane lazy label="Body" name="body">
      <Body></Body>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import Params from "./components/Params";
import Body from "./components/Body";
export default {
  components: {
    Params,
    Body,
  },
  data() {
    return {
      activeName: "params",
    };
  },
  methods: {
    handleClick(tab) {
      this.activeName = tab.paneName;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>