<template>
  <div class="top">
    <div class="project" @click="open()">
      <span class="title">{{ projectName }}</span>
      <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
    </div>
  </div>

  <el-dialog title="项目列表" v-model="showDialog">
    <el-form :inline="true" :model="form">
      <el-form-item label="项目名称">
        <el-input v-model="form.title" placeholder="请输入项目名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onClickCreate()">创建</el-button>
      </el-form-item>
    </el-form>
    <div class="list_item" v-for="(item, index) in projectList" :key="index">
      <div class="left">
        <div class="title">{{ item.title }}</div>
        <div class="created_at">创建时间 {{ item.created_at }}</div>
      </div>
      <div class="right">
        <div class="cur" @click="setCurProject(item)">切换到当前项目</div>
        <div class="action">项目管理</div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { getProjectList, createProject } from "@/database/project";
export default {
  data() {
    return {
      showDialog: false,
      projectList: [],
      form: {
        title: "",
      },
    };
  },
  computed: {
    projectName() {
      console.log(this.$store.getters.curProject);
      return this.$store.getters.curProject.title;
    },
  },
  methods: {
    open() {
      this.getList();
      this.showDialog = true;
    },
    close() {
      this.showDialog = false;
      this.form = {
        title: "",
      };
    },
    getList() {
      getProjectList().then((res) => {
        this.projectList = res;
      });
    },
    onClickCreate() {
      createProject(this.form.title).then((res) => {
        // console.log(res);
        this.getList();
      });
    },
    setCurProject(project) {
      this.$store.dispatch("setCurProject", project);
      this.close();
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  height: 100%;
  display: flex;
  align-items: center;
  .project {
    .title {
      font-size: 16px;
      padding: 4px;
    }
  }
}

.list_item {
  padding: 10px;
  display: flex;
  align-items: center;
  .left {
    flex: 1;
    .title,
    .created_at {
      padding: 5px;
    }
    .created_at {
      color: #ddd;
    }
  }
  .right {
    display: none; // flex 布局 隐藏
    align-items: center;
    .cur,
    .action {
      padding: 2px;
    }
  }
  &:hover {
    .right {
      display: flex;
    }
  }
}
</style>