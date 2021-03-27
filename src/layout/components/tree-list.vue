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
    <vue-context-menu
      :contextMenuData="contextMenuData"
      @createFolder="createFolder"
      @newdata="newdata"
      @removeNode="removeNode"
    ></vue-context-menu>
  </div>
</template>

<script>
import store from "@/store";
import { node } from "@/database/project";
import VueContextMenu from "@/components/VueContextMenu/VueContextMenu";

export default {
  components: {
    VueContextMenu,
  },
  data() {
    return {
      indent: 5, // 每级缩进多少
      treeData: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      // 右键菜单配置
      contextMenuData: {
        menuName: "demo",
        axis: {
          x: null,
          y: null,
        },
        menulists: [
          {
            fnHandler: "createApi",
            btnName: "新建接口",
          },
          {
            fnHandler: "createFolder",
            btnName: "新建目录",
          },
          {
            fnHandler: "removeNode",
            btnName: "删除",
          },
        ],
      },
      // 右键点击处理
      contextMenuTmp: {
        node: null,
        data: null,
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
    nodeContextmenu(evt, data, node) {
      this.contextMenuTmp.node = node;
      this.contextMenuTmp.data = data;
      this.contextMenuData.axis = {
        x: evt.clientX,
        y: evt.clientY,
      };
    },
    createNode() {
      this.treeData.push(node("未命名", "folder"));
    },
    savedata() {
      alert(1);
    },
    newdata() {
      console.log("newdata!");
    },
    createFolder() {},
    removeNode() {
      const node = this.contextMenuTmp.node;
      const data = this.contextMenuTmp.data;
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.uuid === data.uuid);
      children.splice(index, 1);
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