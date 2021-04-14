 <template>
  <el-table
    border
    :data="tableData"
    style="width: 100%"
    @cell-click="cellClick"
  >
    <el-table-column prop="id" width="40"> </el-table-column>
    <el-table-column prop="name" label="参数名" width="180">
      <template #default="{ row }">
        <input
          v-if="row[rename_key + 'name']"
          type="text"
          v-focus
          v-model="row.name"
          @keyup.enter="renameHandle(row, 'name')"
          @blur="renameHandle(row, 'name')"
          class="rename_input"
        />
        <div v-else>
          {{ row.name }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="value" label="参数值" width="180">
      <template #default="{ row }">
        <input
          v-if="row[rename_key + 'value']"
          type="text"
          v-focus
          v-model="row.value"
          @keyup.enter="renameHandle(row, 'value')"
          @blur="renameHandle(row, 'value')"
          class="rename_input"
        />
        <div v-else>
          {{ row.value }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="required" label="是否必须" width="80">
      <template #default="{ row }">
        <el-switch v-model="row.required"> </el-switch>
      </template>
    </el-table-column>
    <el-table-column prop="intro" label="描述">
      <template #default="{ row }">
        <input
          v-if="row[rename_key + 'intro']"
          type="text"
          v-focus
          v-model="row.intro"
          @keyup.enter="renameHandle(row, 'intro')"
          @blur="renameHandle(row, 'intro')"
          class="rename_input"
        />
        <div v-else>
          {{ row.intro }}
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: "姓名",
          value: "王小虎",
          required: false,
          intro: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      rename_key: "$_isShowInput_",
    };
  },
  methods: {
    renameHandle(data, column) {
      delete data[this.rename_key + column];
      console.log(data);
    },
    cellClick(row, column) {
      let p = this.rename_key + column.property;
      row[p] = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.rename_input {
  width: 90%;
}
</style>