<template>
  <div class="top">
    <el-row>
      <el-col :span="8"> 其他设置 </el-col>
      <el-col :span="8"></el-col>
      <el-col :span="8" class="setting">
        <el-button icon="el-icon-view"></el-button>
        <el-button icon="el-icon-setting"></el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.top {
  .logo {
    width: 50px;
    height: 50px;
  }
  .setting {
    text-align: right;
  }
}
</style>