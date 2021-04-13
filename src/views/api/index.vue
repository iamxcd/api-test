<template>
  <div class="api">
    <UrlBar
      :url="request.url"
      :method="request.method"
      @onChange="urlChange"
      @onSave="onSave"
      @onSend="onSend"
    ></UrlBar>
    <ToolBar></ToolBar>
  </div>
</template>

<script>
import UrlBar from "@/components/UrlBar";
import ToolBar from "@/components/ToolBar";
import http from "@/libs/request";
export default {
  name: "api",
  components: {
    UrlBar,
    ToolBar,
  },
  data() {
    return {
      request: {
        url: "",
        method: "GET",
      },
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
      http({
        method: this.request.methods,
        url: this.request.url,
      }).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>
