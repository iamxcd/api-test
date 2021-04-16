<template>
  <div class="tree-menu">
    <el-tree
      :data="treeData"
      :props="defaultProps"
      :indent="indent"
      node-key="uuid"
      empty-text="无数据"
      @node-click="handleNodeClick"
      @node-contextmenu="nodeContextmenu"
      :filter-node-method="filterNode"
      ref="tree"
    >
      <template #default="{ data }">
        <div class="custom-tree-node">
          <i v-if="data.type == 'folder'" class="icon el-icon-folder"></i>
          <i v-else class="icon el-icon-document"></i>
          <input
            v-if="data.$_is_show_rename_input"
            type="text"
            v-focus
            v-model="data.name"
            @keyup.enter="renameHandle(data)"
            @blur="renameHandle(data)"
            class="rename_input"
          />

          <span v-else class="title"> {{ data.name }}</span>

          <span class="action">
            <i class="el-icon-more"></i>
          </span>
        </div>
      </template>
    </el-tree>
    <vue-context-menu
      :contextMenuData="contextMenuData"
      @createFolder="AddNode('folder')"
      @createApi="AddNode('api')"
      @removeNode="removeNode()"
      @rename="rename()"
    ></vue-context-menu>
  </div>
</template>

<script>
import store from "@/store";
import { createMenu, delMenu, renameName } from "@/database/project-menu";
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
            fnHandler: "rename",
            btnName: "重命名",
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
    "$store.getters.curProject.id": {
      handler() {
        // console.log("当前项目变化", this.$store.getters.nodes);
        this.treeData = this.$store.getters.nodes;
      },
      deep: true,
    },
  },
  methods: {
    handleNodeClick(data) {
      if (data.type == "api") {
        this.$store.dispatch("openTag", {
          title: data.name,
          key: data.api_uuid,
          node_uuid: data.uuid,
        });
      }
    },
    nodeContextmenu(evt, data, node) {
      this.contextMenuTmp.node = node;
      this.contextMenuTmp.data = data;
      //   console.log(node);
      this.contextMenuData.axis = {
        x: evt.clientX,
        y: evt.clientY,
      };
    },
    async createNode() {
      //   console.log("添加节点");
      let node = await createMenu("未命名", "folder");
      this.treeData.push(node);
    },
    async AddNode(type = "folder") {
      const node = this.contextMenuTmp.node;
      const data = this.contextMenuTmp.data;

      let children = null;
      if (!data.children) {
        children = data.children = [];
      } else {
        children = data.children;
      }

      // 如果选择的是接口 则在同级新增节点
      if (data.type == "api") {
        children = node.parent.data.children;
      }
      // console.log(data);
      let newnode = await createMenu("未命名", type, data.uuid);
      children.push(newnode);
      node.expanded = true;

      if (type == "api") {
        this.$store.dispatch("openTag", {
          title: newnode.name,
          key: newnode.api_uuid,
          node_uuid: data.uuid,
        });
      }
    },
    removeNode() {
      const node = this.contextMenuTmp.node;
      const data = this.contextMenuTmp.data;
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.uuid === data.uuid);
      delMenu(data.id).then(() => {
        if (data.type == "api") {
          this.$store.dispatch("closeTag", data.api_uuid);
        }
        children.splice(index, 1);
      });
    },
    rename() {
      const data = this.contextMenuTmp.data;
      data.$_is_show_rename_input = true;
    },
    renameHandle(data) {
      delete data.$_is_show_rename_input;
      renameName(data.id, data.name);
      if (data.type == "api") {
        this.$store.dispatch("renameTag", {
          title: data.name,
          key: data.api_uuid,
        });
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    setfilterText(val) {
      this.$refs["tree"].filter(val);
    },
  },
};
</script>

<style lang="scss">
.tree-menu > .el-tree > .el-tree-node > .el-tree-node__content {
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
  align-items: center;
  width: 100%;
  .icon {
    height: 100%;
  }
  .title {
    flex: 1;
  }
  .rename_input {
    width: 100%;
  }
  .action {
    color: red;
    display: none;
    margin-right: 5px;
  }
}
</style>