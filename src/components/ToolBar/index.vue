<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="Params" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="Auth" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="Headers" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="Body" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
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