<template>
  <div class="tag-nav">
    <div class="tags">
      <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
      >
        {{ tag }}
      </el-tag>
      <el-button icon="el-icon-plus" @click="handleAddTag()"></el-button>
    </div>
    <div class="setting">
      <el-select placeholder="测试环境">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
      <el-button icon="el-icon-view"></el-button>
      <el-button icon="el-icon-setting"></el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicTags: ["标签一", "标签二", "标签三"],
      inputVisible: false,
      inputValue: "",
    };
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleAddTag() {
      this.dynamicTags.push("新标签");
    },
  },
};
</script>

<style>
. .el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

<style lang="scss" scoped>
.tag-nav {
  display: flex;
  align-items: center;
  .tags {
    flex: 1;
    text-align: left;
  }
  .setting {
  }
}
</style>