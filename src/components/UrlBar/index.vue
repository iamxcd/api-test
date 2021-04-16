<template>
  <el-form :inline="true" size="large" class="url-bar">
    <el-form-item class="ipt">
      <el-input
        v-model="url"
        @input="(val) => $emit('update:url', val)"
        class="url_ipt"
        placeholder="请输入URL"
      >
        <template #prepend>
          <el-dropdown
            class="action-dropdown"
            size="large"
            @command="(action) => $emit('update:method', action)"
          >
            <div class="action">
              <div class="action_name">
                {{ method }}
              </div>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="(action, index) in methods"
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
      <el-button type="primary" class="btn-send" @click="onSend()"
        >发送</el-button
      >
      <!-- <el-dropdown size="large"> -->
      <el-button type="primary" @click="onSave()">
        保存
        <!-- <i class="el-icon-arrow-down el-icon--right btn-save"></i> -->
      </el-button>
      <!-- <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>另存为</el-dropdown-item>
          </el-dropdown-menu>
        </template> -->
      <!-- </el-dropdown> -->
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: {
    url: {
      type: String,
      default: "",
    },
    method: {
      type: String,
      default: "GET",
    },
  },
  emits: ["update:url", "update:method"],
  data() {
    return {
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    };
  },
  methods: {
    onSend() {
      this.$emit("onSend");
    },
    onSave() {
      this.$emit("onSave");
    },
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