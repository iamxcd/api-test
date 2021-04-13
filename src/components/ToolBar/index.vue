<template>
  <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="Params" name="first">
      <Params></Params>
    </el-tab-pane>
    <el-tab-pane lazy label="Auth" name="second">
      <Params></Params>
    </el-tab-pane>
    <el-tab-pane lazy label="Body" name="third">
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
      activeNames: ["1", "2", "3"],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      this.activeName = tab.paneName;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>