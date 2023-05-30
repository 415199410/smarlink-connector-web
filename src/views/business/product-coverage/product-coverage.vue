<template>
  <div class="app-container">
    <el-row :gutter="30">
      <el-col :span="10" :xs="24">
        <el-form label-width="68px" ref="queryForm" :inline="true">
          <el-form-item label="工厂">
            <el-input placeholder="请输入工厂"
                      clearable size="small" style="width: 150px" ref="inputVal" v-model="inputVal"/>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="subMitSelect()">搜索</el-button>
          </el-form-item>
          <!--<el-form-item label="交期">
            <el-date-picker size="small" style="width: 240px" value-format="yyyy-MM-dd" type="date">
            </el-date-picker>
          </el-form-item> -->
          <!--<el-form-item style="margin-left:210px;">
            <el-button type="primary" icon="el-icon-search" size="mini" @click="subMitSelect()">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini"  @click="resetQuery">重置</el-button>
          </el-form-item> -->
        </el-form>
        <!-- 列表管理 -->
        <el-table border style="width:100%; " height="500" :data="tableData"   @row-click="clickData"
                  :header-cell-style="{background:'\t#E8E8D0', fontFamily:'Helvetica',fontSize:'13px'}" >
          <el-table-column label="采购合同号" align="center" width="150" prop="orderName">
          </el-table-column>
          <el-table-column label="工厂简称" align="center"  prop="sampleName" />
          <el-table-column label="货品" align="center" width="120"  prop="itemName" />
          <el-table-column label="跟进数量" align="center" width="150" prop="sceneNumber" />
          <el-table-column label="工厂交期" align="center" width="150" prop="factoryDate" />
          <el-table-column label="采购合同编码" align="center" width="150" prop="orderCode"  v-if="false"/>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "product-coverage",
  data() {
    return {
      tableData: [],
      inputVal:''
    };
  },
  created() {
    this.initWxConfig(" ");
  },
  methods: {
    //接收前一个界面传过来的参数,根据docId获取明细信息   做了个缓存用来存放搜索条件
    initWxConfig(vendorName) {
        let userInfo = JSON.parse(localStorage.getItem('user'));
        let userNsCode = userInfo.userReal;
        this.$methods.http("wx/sys/sys/dict/searchAllDocDetail",{vendorName:vendorName,userNsCode:userNsCode}).then(res => {
        this.tableData = this.tableData.concat(res);
      });
    },
    subMitSelect(){
      //获取输入框的值
      let vendorName = this.$refs.inputVal.value;
      event.preventDefault()
      // this.params.page = 1
      this.tableData = []
      this.initWxConfig(vendorName)
    },
    //行点击事件
    clickData(row, event, column) {
      this.$router.push({path: 'storeDetail', query: {orderCode:row.orderCode}})
      return;
    },
    resetQuery(){
      this.tableData = []
      this.$refs.queryForm.resetFields();
      this.subMitSelect()
    }
  },
};
</script>
<style lang="stylus" scoped>
@import '../../../assets/css/convert.styl';
.app-container {
  padding: 15px;
}

</style>
