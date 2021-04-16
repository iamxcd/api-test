<template>
  <div class="api">
    <splitpanes class="default-theme splitpane" horizontal>
      <pane>
        <UrlBar
          v-model:url="apiInfo.url"
          v-model:method="apiInfo.method"
          @onChange="urlChange"
          @onSave="onSave"
          @onSend="onSend"
        ></UrlBar>
        <ToolBar></ToolBar>
      </pane>
      <pane max-size="100" size="20" min-size="20">
        <ResponseBar :response="response"></ResponseBar>
      </pane>
    </splitpanes>
  </div>

  <MenuChoose
    v-if="!nodeKey"
    ref="MenuChoose"
    @onSelected="onSelectedFolder"
  ></MenuChoose>
</template>

<script>
import UrlBar from "@/components/UrlBar";
import ToolBar from "@/components/ToolBar";
import ResponseBar from "@/components/ResponseBar";
import MenuChoose from "@/components/MenuChoose";

import http from "@/libs/request";
import { Splitpanes, Pane } from "splitpanes";
import "@/styles/splitpanes.css";

import { getApi, storeApi } from "@/database/api";
export default {
  name: "api",
  components: {
    UrlBar,
    ToolBar,
    Splitpanes,
    Pane,
    ResponseBar,
    MenuChoose,
  },
  data() {
    return {
      apiInfo: {
        id: null,
        uuid: "",
        title: "",
        url: "",
        node_uuid: null,
        project_uuid: null,
        method: "GET",
        params: [],
        headers: [],
        data: "",
      },
      response: {},
    };
  },
  created() {
    this.getApiInfo();
    this.listening();
    // console.log(this.$route);
  },
  computed: {
    key() {
      return this.$route.params.key;
    },
    title() {
      return this.$route.query.title;
    },
    nodeKey() {
      return this.$route.query.node_uuid;
    },
    projectKey() {
      return this.$store.getters.curProject.uuid;
    },
  },
  watch: {
    apiInfo: {
      handler(val) {
        // console.log(val);
        this.setSaved(false);
      },
      deep: true,
    },
  },
  methods: {
    urlChange(obj) {
      this.apiInfo.url = obj.url;
      this.apiInfo.method = obj.method;
    },
    init() {
      this.apiInfo.uuid = this.key;
      this.apiInfo.title = this.title;
      this.apiInfo.node_uuid = this.nodeKey;
      this.apiInfo.project_uuid = this.projectKey;
    },
    async onSave() {
      // console.log(this.apiInfo.id);
      if (!this.apiInfo.node_uuid) {
        console.log("节点不存在");
        this.$refs["MenuChoose"].show();
        return;
      }

      if (this.apiInfo.id == null) {
        let data = JSON.parse(JSON.stringify(this.apiInfo));
        delete data.id; // 需要移除ID 数据库
        let id = await storeApi(data);
        console.log("插入的ID", id);
        this.getApiInfo();
      }
      this.setSaved(true);
    },
    onSelectedFolder(folder) {
      console.log("选中的目录", folder);
      this.apiInfo.node_uuid = folder.uuid;
      this.onSave();
    },
    onSend() {
      if (this.apiInfo.url == "") {
        this.$message.error("请输入URL");
        return;
      }
      // 发送请求
      http
        .request({
          method: this.apiInfo.methods,
          url: this.apiInfo.url,
        })
        .then((res) => {
          this.response = res;
        });
    },
    getApiInfo() {
      getApi(this.key).then((data) => {
        if (data === undefined) {
          console.log("未找到数据,初始化");
          this.init();
        } else {
          this.apiInfo = data;
        }
      });
    },
    setSaved(is_saved) {
      this.$store.dispatch("setIsSaved", {
        key: this.key,
        is_saved,
      });
    },
    listening() {
      document.onkeydown = (event) => {
        if (event.key === "s" && event.ctrlKey) {
          console.log("按下了 ctrl + s ");
          this.onSave();
        }
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.api {
  .splitpane {
    height: calc(100vh - 160px);
  }
}
</style>