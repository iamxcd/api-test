<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item title="Params" name="1">
      <Params></Params>
    </el-collapse-item>
    <el-collapse-item title="Auth" name="2">
      <Params></Params>
    </el-collapse-item>
    <el-collapse-item title="Body" name="3">
      <Body></Body>
    </el-collapse-item>
  </el-collapse>
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