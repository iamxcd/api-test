<template>
  <div>
    <el-header class="header">
      <TopHeader></TopHeader>
    </el-header>
    <el-container class="main">
      <el-aside width="200px">
        <TreeList> </TreeList>
      </el-aside>
      <el-container>
        <el-header class="tag-nav-container">
          <TagView></TagView>
        </el-header>
        <el-main>
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :key="fullPath" :is="Component" />
            </keep-alive>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import TopHeader from "./components/top-header";
import TagView from "./components/tag-view.vue";
import TreeList from "./components/tree-list";
import LeftNav from "./components/left-nav";
import Footer from "./components/footer";
export default {
  components: {
    TreeList,
    TopHeader,
    LeftNav,
    Footer,
    TagView,
  },
  computed: {
    fullPath() {
      return this.$route.fullPath;
    },
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