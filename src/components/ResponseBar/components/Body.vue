<template>
  <el-card class="body-area">
    <template #header>
      <div class="card-header">
        <span>Body</span>
        <span class="el-dropdown-link">
          json
          <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
        </span>
      </div>
    </template>
    <Editer :value="code"></Editer>
  </el-card>
</template>

<script>
import Editer from "@/components/Editer";
export default {
  components: {
    Editer,
  },
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      code: "",
    };
  },
  watch: {
    value(value) {
      this.code = value;
      console.log("监听到了2", value);
    },
  },
};
</script>

<style lang="scss">
.body-area {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card {
    width: 100%;
  }

  .el-card__header {
    padding: 9px 10px;
  }

  .el-card__body,
  .el-main {
    padding: 0px;
  }
}
</style>

