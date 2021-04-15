<template>
  <div class="tags-box" @mousewheel="mousewheel">
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
          size="large"
          :color="isActive(tag.key)"
          :disable-transitions="false"
          @click="openTagPage(tag)"
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
    openTagPage(tag) {
      this.$router.push({
        path: `/api/${tag.key}`,
        query: {
          title: tag.title,
        },
      });
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
  .tags-list {
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