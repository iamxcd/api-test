<template>
  <div>
    <el-header class="header">
      <TopHeader></TopHeader>
    </el-header>
    <el-container class="main">
      <el-aside class="left-nav-container" width="80px">
        <LeftNav></LeftNav>
      </el-aside>
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
        </el-container>
      </el-container>
    </el-container>

    <el-footer>
      <Footer></Footer>
    </el-footer>
  </div>
</template>

<script>
import TopHeader from "./components/top-header";
import TagNav from "./components/tag-nav";
import TreeList from "./components/tree-list";
import LeftNav from "./components/left-nav";
import Footer from "./components/footer";
export default {
  components: {
    TagNav,
    TreeList,
    TopHeader,
    LeftNav,
    Footer,
  },
};
</script>

<style lang="scss" scoped>
.main {
  min-height: calc(100vh - 120px);
  .left-nav-container {
    // background-color: #aaa;
  }
}
</style>