<template>
  <!-- <el-card class="body-area">
    <template #header>
      <div class="card-header">
        <span>Body</span>
        <span class="el-dropdown-link">
          json
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
      </div>
    </template> -->
  <Editer></Editer>
  <!-- </el-card> -->
</template>

<script>
import Editer from "@/components/Editer";
export default {
  components: {
    Editer,
  },
  data() {
    return {
      code: "12311",
    };
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
}
</style>

