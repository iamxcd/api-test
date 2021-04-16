<template>
  <div>
    <div class="tool">
      <el-input
        placeholder="搜索"
        suffix-icon="el-icon-search"
        v-model="filterText"
        class="search"
      >
      </el-input>
      <el-button
        type="primary"
        @click="createNode()"
        icon="el-icon-plus"
        class="plus"
      ></el-button>
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
    return {
      filterText: "",
    };
  },
  methods: {
    createNode() {
      this.$refs["treemenu"].createFolder();
    },
  },
  watch: {
    filterText(val) {
      this.$refs["treemenu"].setfilterText(val);
    },
  },
};
</script>

<style lang="scss" scoped>
.tool {
  height: 40px;
  display: flex;
  align-items: center;
  .search {
    flex: 1;
    padding: 5px;
  }

  .plus {
  }
}
</style>