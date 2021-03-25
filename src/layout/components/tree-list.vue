<template>
  <div>
    <el-tree
      :data="data"
      :props="defaultProps"
      :indent="indent"
      @node-click="handleNodeClick"
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
  </div>
</template>

<script>
export default {
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
  },
};
</script>

<style lang="scss">
.el-tree > .el-tree-node > .el-tree-node__content {
  height: 60px;
}
</style>
<style lang="scss" scoped>
.custom-tree-node {
  .action {
    color: red;
  }
}
</style>