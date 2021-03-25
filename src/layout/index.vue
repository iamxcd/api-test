<template>
  <div>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <TreeList> </TreeList>
      </el-aside>
      <el-container>
        <el-header class="tag-nav-container">
          <TagNav></TagNav>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
    <el-footer>Footer</el-footer>
  </div>
</template>

<script>
import TagNav from "./components/tag-nav";
import TreeList from "./components/tree-list";
export default {
  components: {
    TagNav,
    TreeList,
  },
};
</script>
<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.tag-nav-container {
  width: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>