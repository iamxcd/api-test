<template>
  <div class="tags-box" @mousewheel="mousewheel">
    <div class="tags-left-btn" @click="tagsScroll(300)">
      <el-button :plain="true">
        <i class="el-icon-arrow-left"></i>
      </el-button>
    </div>
    <div class="tags-right-btn" @click="tagsScroll(-300)">
      <el-button :plain="true">
        <i class="el-icon-arrow-right"></i>
      </el-button>
    </div>
    <div class="tags-close">
      <el-dropdown>
        <el-button :plain="true">
          <i class="el-icon-close"></i>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="closeAll"> 全部关闭 </el-dropdown-item>
            <el-dropdown-item @click="closeOther"> 关闭其他 </el-dropdown-item>
            <el-dropdown-item @click="closeRight"> 关闭右边 </el-dropdown-item>
            <el-dropdown-item @click="closeLeft"> 关闭左边 </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="tags-list" ref="tagsList">
      <div
        class="tags-view"
        ref="tagsView"
        :style="{ left: tagsViewLeft + 'px' }"
      >
        <el-tag
          :key="tag.key"
          v-for="tag in tagList"
          closable
          :color="isActive(tag.key)"
          :disable-transitions="false"
          @click="openTagPage(tag.key)"
          @close="closeTagPage(tag.key)"
        >
          <i class="el-icon-star-on" v-if="isStar(tag.key)"></i>
          {{ tag.title }}
        </el-tag>
        <el-button icon="el-icon-plus" @click="handleAddTag()"></el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TagsView",
  data() {
    return {
      tagsViewLeft: 0,
    };
  },
  methods: {
    isActive(key) {
      return key === this.$route.params.key ? "" : "#fff";
    },
    isStar(key) {
      return key === this.$route.params.key;
    },
    closeTagPage(key) {
      this.$store.dispatch("closeTag", key);
    },
    closeAll() {},
    closeOther() {},
    closeRight() {},
    closeLeft() {},
    mousewheel(evt) {
      let px = evt.wheelDelta > 0 ? 100 : -100;
      this.tagsScroll(px);
    },
    openTagPage(key) {
      this.$router.push({ path: `/api/${key}` });
    },
    tagsScroll(offset) {
      const tagsListWidth = this.$refs.tagsList.offsetWidth - 150;
      const tagsViewWidth = this.$refs.tagsView.offsetWidth;

      if (tagsListWidth > tagsViewWidth) {
        return (this.tagsViewLeft = 0);
      }

      if (offset > 0) {
        return (this.tagsViewLeft = Math.min(0, this.tagsViewLeft + offset));
      }

      if (this.tagsViewLeft > -(tagsViewWidth - tagsListWidth)) {
        this.tagsViewLeft = Math.max(
          this.tagsViewLeft + offset,
          tagsListWidth - tagsViewWidth
        );
      }
    },

    handleAddTag() {
      this.$store.dispatch("addTag");
    },
  },
  computed: {
    tagList() {
      return [...this.$store.getters.tags];
    },
  },
};
</script>

<style lang="scss" scoped>
.tags-box {
  position: relative;
  height: 40px;
  background-color: #f2f6fc;
  flex-shrink: 0;
  -webkit-flex-shrink: 0;
  overflow: hidden;
  max-width: 100%;
  .tags-left-btn {
    position: absolute;
    z-index: 10;
    left: 0;
  }
  .tags-right-btn {
    position: absolute;
    z-index: 10;
    right: 44px;
    border-right: 1px solid #e6e6e6;
  }
  .tags-close {
    position: absolute;
    z-index: 10;
    right: 0;
  }
  .tags-list {
    position: absolute;
    left: 45px;
    width: 100%;
    .tags-view {
      margin-top: 3px;
      position: absolute;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
.el-button {
  padding: 10px 15px;
  border: none;
  height: 39px;
}
.el-tag {
  margin-left: 5px;
  cursor: pointer;
}
</style>