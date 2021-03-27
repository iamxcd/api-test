<template>
  <div>
    <div class="tool">
      <div>
        <el-button @click="createNode()">添加</el-button>
      </div>
    </div>
    <el-tree
      :data="treeData"
      :props="defaultProps"
      :indent="indent"
      @node-click="handleNodeClick"
      @node-contextmenu="nodeContextmenu"
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span class="title"> {{ node.label }}</span>

          <span class="action">
            <i class="el-icon-more"></i>
          </span>
        </span>
      </template>
    </el-tree>
    <RightKeyMenu ref="RightKeyMenu"></RightKeyMenu>
  </div>
</template>

<script>
import RightKeyMenu from "./right-key-menu";
import store from "@/store";
import { node } from "@/database/project";
export default {
  components: {
    RightKeyMenu,
  },
  data() {
    return {
      indent: 5, // 每级缩进多少
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
      return store.getters.nodes;
    },
  },
  watch: {
    treeData: {
      handler(nodes) {
        this.$store.dispatch("setNodes", nodes);
      },
      deep: true,
    },
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    nodeContextmenu(evt, data, node, ctx) {
      console.log(evt, data, node, ctx);
      this.$refs["RightKeyMenu"].show(evt.clientX, evt.clientY);
    },
    createNode() {
      this.treeData.push(node("未命名", "folder"));
    },
  },
};
</script>

<style lang="scss">
.el-tree > .el-tree-node > .el-tree-node__content {
  height: 60px;
}

// 悬停展示右侧工具按钮效果
.el-tree-node__content {
  &:hover {
    .custom-tree-node {
      .action {
        display: inline-block;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.custom-tree-node {
  display: flex;
  width: 100%;
  .title {
    flex: 1;
  }
  .action {
    color: red;
    display: none;
    margin-right: 5px;
  }
}

.tool {
  height: 40px;
  display: flex;
  align-items: center;
}
</style>