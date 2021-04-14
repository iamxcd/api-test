 <template>
  <el-table
    border
    :data="tableData"
    style="width: 100%"
    :row-style="{ height: '0' }"
    :cell-style="{ padding: '0' }"
    @cell-click="cellClick"
  >
    <el-table-column prop="id" width="40">
      <template #default="{ row }">
        <el-checkbox v-model="row.is_enable"></el-checkbox>
      </template>
    </el-table-column>
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
      <template #default="{ row, $index }">
        <div class="intro">
          <input
            v-if="row[rename_key + 'intro']"
            type="text"
            v-focus
            v-model="row.intro"
            @keyup.enter="renameHandle(row, 'intro')"
            @blur="renameHandle(row, 'intro')"
            class="rename_input left"
          />
          <div class="left" v-else>
            {{ row.intro }}
          </div>
          <i
            class="el-icon-delete del-right"
            @click.stop="onClickDel($index)"
          ></i>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import _ from "lodash";
export default {
  data() {
    return {
      tableData: [],
      rowData: {
        is_enable: true,
        name: "",
        value: "",
        required: false,
        intro: "",
      },
      rename_key: "$_isShowInput_",
    };
  },
  created() {
    this.tableData.push(_.clone(this.rowData));
  },
  methods: {
    renameHandle(data, column) {
      delete data[this.rename_key + column];
      // console.log(data);
    },
    cellClick(row, column) {
      let property = this.rename_key + column.property;
      row[property] = true;
    },
    onClickDel(index) {
      this.tableData.splice(index, 1);
    },
  },
  watch: {
    tableData: {
      handler(arr) {
        let len = arr.length;
        if (len == 0 || arr[len - 1].name != "") {
          this.tableData.push(_.clone(this.rowData));
        }
        this.$emit("change", arr);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.rename_input {
  width: 90%;
}
.intro {
  display: flex;
  align-items: center;
  .left {
    flex: 1;
  }
  .del-right {
    display: none;
  }
}
</style>
<style  lang="scss">
.el-table__row {
  &:hover {
    .del-right {
      display: block;
    }
  }
}
</style>