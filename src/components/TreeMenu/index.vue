<template>
  <div class="tree-menu">
    <el-tree
      :data="nodes"
      :props="defaultProps"
      :indent="indent"
      node-key="uuid"
      empty-text="无数据"
      @node-click="handleNodeClick"
      @node-contextmenu="nodeContextmenu"
      :filter-node-method="filterNode"
      @node-expand="nodeExpand"
      @node-collapse="nodeCollapse"
      :default-expanded-keys="expandedKeys"
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
      // TODO 这里可能会越来越大 删除父级 子级展开的ID未被删除
      expandedKeys: [],
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
  computed: {
    nodes() {
      // console.log(this.expandedKeys);
      return store.getters.nodes;
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
      // console.log("右键菜单", node, data);
      this.contextMenuData.axis = {
        x: evt.clientX,
        y: evt.clientY,
      };
    },
    async createFolder() {
      let node = await createMenu("未命名", "folder");
      // this.treeData.push(node);
      this.$store.dispatch("getNodes");
    },
    async AddNode(type = "folder") {
      const node = this.contextMenuTmp.node;
      const data = this.contextMenuTmp.data;
      // 如果选择的是接口 则在同级新增节点
      let newnode;
      if (data.type == "api") {
        newnode = await createMenu("未命名", type, node.parent.data.uuid);
        this.nodeExpand(node.parent.data);
      } else {
        newnode = await createMenu("未命名", type, data.uuid);
        this.nodeExpand(data);
      }

      this.$store.dispatch("getNodes");
      if (type == "api") {
        this.$store.dispatch("openTag", {
          title: newnode.name,
          key: newnode.api_uuid,
          node_uuid: data.uuid,
        });
      }
    },
    removeNode() {
      // const node = this.contextMenuTmp.node;
      const data = this.contextMenuTmp.data;
      delMenu(data.id).then(() => {
        if (data.type == "api") {
          this.$store.dispatch("closeTag", data.api_uuid);
        }
        this.$store.dispatch("getNodes");
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
      this.$store.dispatch("getNodes");
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    setfilterText(val) {
      this.$refs["tree"].filter(val);
    },
    nodeCollapse(data) {
      let i = this._i(data.uuid);
      if (i > -1) {
        this.expandedKeys.splice(i, 1);
      }
    },
    nodeExpand(data) {
      if (this._i(data.uuid) == -1) {
        this.expandedKeys.push(data.uuid);
      }
    },
    _i(key) {
      return this.expandedKeys.indexOf(key);
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