<template>
  <div>
    <el-tabs style="margin-top:20px" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="附件列表" name="first">
        <el-table :data="tableData" class="tableBox" ref="multipleTable" tooltip-effect="dark" style="width: 100%;">

          <!-- <el-table-column fixed align="center" type="selection" width="50">
          </el-table-column> -->

          <!-- <el-table-column label="日期" width="120">
              <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column> -->

          <el-table-column prop="orderName" label="采购订单号" width="160" show-overflow-tooltip>
          </el-table-column>

          <el-table-column prop="fileOldName" label="文件名称" width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <a target="_blank" :href="scope.row.fileLink">{{ scope.row.fileOldName }}</a>
            </template>
          </el-table-column>

          <el-table-column prop="fileType" label="文件类型" width="120" show-overflow-tooltip>
          </el-table-column>

        </el-table>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      activeName: 'first'

    }
  },
  created() {
    console.log(this.$route.query.orderName);
    this.init()
  },
  methods: {
    init() {
      this.$methods.http("sys/tw/file/searchFileByOrder", { orderName: this.$route.query.orderName }).then(res => {
        if (res && res.status == "success") {
          this.tableData = res.value
        }
      });
    },
    handleClick(tab, event) {
      // console.log(tab, event);
      console.log(tab.index);
    }
  },
}
</script>

<style></style>
