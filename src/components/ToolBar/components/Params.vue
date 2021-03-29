 <template>
  <el-table border :data="tableData" style="width: 100%">
    <el-table-column prop="is" width="40"> </el-table-column>
    <el-table-column prop="date" label="参数名" width="180"> </el-table-column>
    <el-table-column prop="name" label="参数值" width="180"> </el-table-column>
    <el-table-column prop="name" label="是否必须" width="80"> </el-table-column>
    <el-table-column prop="address" label="类型" idth="80"> </el-table-column>
    <el-table-column prop="address" label="描述"> </el-table-column>
  </el-table>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
};
</script>