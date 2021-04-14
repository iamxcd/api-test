<template>
  <div class="api">
    <splitpanes class="default-theme splitpane" horizontal>
      <pane>
        <UrlBar
          :url="request.url"
          :method="request.method"
          @onChange="urlChange"
          @onSave="onSave"
          @onSend="onSend"
        ></UrlBar>
        <ToolBar></ToolBar>
      </pane>
      <pane max-size="100" size="20" min-size="20"> 返回值 </pane>
    </splitpanes>
  </div>
</template>

<script>
import UrlBar from "@/components/UrlBar";
import ToolBar from "@/components/ToolBar";
import http from "@/libs/request";
import { Splitpanes, Pane } from "splitpanes";
import "@/styles/splitpanes.css";
export default {
  name: "api",
  components: {
    UrlBar,
    ToolBar,
    Splitpanes,
    Pane,
  },
  data() {
    return {
      request: {
        url: "",
        method: "GET",
      },
      response: {},
    };
  },
  computed: {
    key() {
      return this.$route.params.key;
    },
  },
  methods: {
    urlChange(obj) {
      this.request.url = obj.url;
      this.request.method = obj.method;
      console.log(this.request);
    },
    onSave() {
      // TODO 保存
    },
    onSend() {
      console.log(this.request);
      if (this.request.url == "") {
        this.$message.error("请输入URL");
        return;
      }
      // 发送请求
      http
        .request({
          method: this.request.methods,
          url: this.request.url,
        })
        .then((res) => {
          console.log(res);
          this.drawer = true;
        });
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