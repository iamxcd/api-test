<template>
  <div>
    <div class="tool">
      <div>
        <el-button @click="createNode()">添加</el-button>
      </div>
    </div>
    <TreeMenu ref="treemenu"></TreeMenu>
  </div>
</template>

<script>
import TreeMenu from "@/components/TreeMenu";
export default {
  components: {
    TreeMenu,
  },
  data() {
    return {};
  },
  methods: {
    createNode() {
      this.$refs["treemenu"].createNode();
    },
  },
};
</script>

<style lang="scss" scoped>
.tool {
  height: 40px;
  display: flex;
  align-items: center;
}
</style>