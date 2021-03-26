<template>
  <div>
    <el-tree
      :data="data"
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
export default {
  components: {
    RightKeyMenu,
  },
  data() {
    return {
      indent: 5, // 每级缩进多少
      data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1",
                },
              ],
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    nodeContextmenu(evt, data, node, ctx) {
      console.log(evt, data, node, ctx);
      this.$refs["RightKeyMenu"].show(evt.clientX, evt.clientY);
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
</style>