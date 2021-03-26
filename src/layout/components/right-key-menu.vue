<template>
  <div v-show="is_show" class="right-key-menu" :style="position">
    <el-card class="box-card">
      <div v-for="o in 4" :key="o" class="text item">
        {{ "菜单选项 " + o }}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      is_show: false,
      position: { left: 0 + "px", top: 0 + "px" },
    };
  },
  methods: {
    show(x, y) {
      this.position.left = x + "px";
      this.position.top = y + "px";
      //   this.$forceUpdate();
      this.is_show = true;
    },
    hide() {
      this.is_show = false;
    },
  },
};
</script>


<style lang="scss" scoped>
.right-key-menu {
  position: fixed;
}
</style>