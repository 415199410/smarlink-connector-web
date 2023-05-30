<template>
  <!-- 注意：el-table 上加一个 ref="table" -->
  <el-table ref="table" :data="list" border style="width: 100%; margin-top:20px; min-height:700px">
    <el-table-column align="center" label="编号">
      <template slot-scope="scope">
        <span>{{ id }}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="姓名">
      <template slot-scope="scope">
        <span>{{ name }}</span>
      </template>
    </el-table-column>

    <el-table-column label="操做" width="300" align="center" prop="operation">
      <template slot-scope="scope">
        <el-button plain   @click="toogleExpand(scope.row)">详情</el-button>
      </template>
    </el-table-column>
    <!-- 展开部分 -->
    <el-table-column type="expand" width="1">
      <el-table>
        <el-table-column label="质量标准" align="center" min-width="80">
          　　　　<template slot-scope="scope">
          　　　　　<el-button type="text" @click.native.stop="checkDetail(scope.row.desc)">查看</el-button>
          　　　　</template>
          　　</el-table-column>
        　<el-table-column label="备注" align="center" min-width="100">
        　　　　<template slot-scope="scope">
        <el-button  class ="buttonType" type="info" @click.native.stop="modifyUser(scope.row)">查/增</el-button>
        　　　　</template>
        　　</el-table-column>
      </el-table>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  data() {
    return {
      list: [{
        id: '1',
        name: '王小1',
      }, {
        id: '2',
        name: '王小2',
      }, {
        id: '3',
        name: '王小3',
      }, {
        id: '4',
        name: '王小4',
      }]
    }
  },

  methods: {
    // 展开行效果
    toogleExpand(row) {
      const $table = this.$refs.table
      // 注意，这里的 this.list 是上面 data 中的 list
      // 经过比对数据与行里的数据，对展开行进行控制，获取对应值
      this.list.map((item) => {
        if (row.id !== item.id) {
          $table.toggleRowExpansion(item, false)
        }
      })
      $table.toggleRowExpansion(row)
    },
  }
}
</script>
<style>
/* 展开行样式 */
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
.el-form-item__content {
  width: 100%;
}
/* 隐藏上方表格多余部分 */
.undefined.el-table__expand-column {
  display: none;
}
/* 隐藏上方表格多余部分 */
.el-table_1_column_8 .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
  border-right: 0px solid #ebeef5
}
</style>
