<template>
  <el-form :inline="true" size="large" :model="formInline" class="url-bar">
    <el-form-item class="ipt">
      <el-input
        v-model="formInline.user"
        class="url_ipt"
        placeholder="请输入URL"
      >
        <template #prepend>
          <el-dropdown
            class="action-dropdown"
            size="large"
            @command="handleCommand"
          >
            <div class="action">
              <div class="action_name">
                {{ curAction }}
              </div>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="(action, index) in actions"
                  :key="index"
                  :command="action"
                  >{{ action }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item class="btn">
      <el-button type="primary" class="btn-send" @click="onSubmit"
        >发送</el-button
      >
      <el-dropdown size="large">
        <el-button type="primary">
          保存<i class="el-icon-arrow-down el-icon--right btn-save"></i>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>另存为</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      curAction: "GET",
      actions: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    };
  },
  methods: {
    handleCommand(action) {
      this.curAction = action;
      console.log(action);
    },
    onSubmit() {},
  },
};
</script>

<style lang="scss" scoped>
.url-bar {
  display: flex;
  .ipt {
    flex: 1;
    .url_ipt {
      width: 100%;
    }
  }
  .btn {
    text-align: right;
    .btn-send,
    .btn-save {
      margin: 0 10px;
    }
  }

  .action-dropdown {
    .action {
      width: 80px;
      display: flex;
      .action_name {
        flex: 1;
      }
      .action_name,
      .el-icon-arrow-down {
        line-height: 30px;
      }
    }
  }
}
</style>

<style lang="scss">
.url-bar {
  .el-input-group__prepend {
    padding: 0;

    .action-dropdown {
      padding: 0px 10px;
    }
  }
  .el-form-item__content {
    width: 100%;
  }
}
</style>