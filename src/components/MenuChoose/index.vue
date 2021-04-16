<template>
  <el-dialog title="请选择目录" v-model="showDialog">
    <el-tree
      :data="treeData"
      :props="defaultProps"
      :indent="indent"
      node-key="uuid"
      empty-text="无数据"
      @node-click="handleNodeClick"
    >
    </el-tree>
  </el-dialog>
</template>

<script>
import TreeMenu from "@/components/TreeMenu";
export default {
  components: {
    TreeMenu,
  },
  data() {
    return {
      showDialog: false,
      indent: 10, // 每级缩进多少
      treeData: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
    };
  },
  created() {
    this.treeData = this.nodes;
  },
  computed: {
    nodes() {
      return this.$store.getters.nodes;
    },
  },

  methods: {
    show() {
      this.showDialog = true;
    },
    handleNodeClick(data) {
      console.log(data);
    },
    close() {
      this.showDialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>