<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="Params" name="first">
      <Params></Params>
    </el-tab-pane>
    <el-tab-pane label="Auth" name="second">认证</el-tab-pane>
    <el-tab-pane label="Headers" name="third">
      <Params></Params>
    </el-tab-pane>
    <el-tab-pane label="Body" name="fourth">
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
      activeName: "first",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>