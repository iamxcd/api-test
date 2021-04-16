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
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="onSubmit()">确 定</el-button>
        <el-button @click="close()">取 消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import TreeMenu from "@/components/TreeMenu";
import { getFolder } from "@/database/project-menu";
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
      selected: null,
    };
  },
  methods: {
    show() {
      this.getNodes();
      this.showDialog = true;
    },
    handleNodeClick(data) {
      this.selected = data;
    },
    getNodes() {
      getFolder().then((nodes) => {
        this.treeData = nodes;
      });
    },
    onSubmit() {
      if (this.selected === null) {
        this.$message.error("请选择目录");
      }
      this.$emit("onSelected", this.selected);
      this.close();
    },
    close() {
      this.showDialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>