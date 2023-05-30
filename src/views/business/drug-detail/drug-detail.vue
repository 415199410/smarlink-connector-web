<template>
  <div class="wrap">
    <div class="header">
      <label>
        <span class="headerApp">品控任务详情</span>
      </label>
    </div>
    <div class="content" >
      <!--  <form> -->
      <div class="content-top" >
        <div class="labelcont">
          <label>
            <span>*</span>采购订单
          </label>
          <input placeholder=" " v-model="orderName"   readonly="readonly"/>
        </div> <!---->
        <div class="labelcont">
          <label>
            <span>*</span>我司跟单
          </label>
          <input class="cube-input" placeholder=" "
                 readonly="readonly"
                 v-model="ourMerchName"/> <!--v-model="params.address"-->
        </div>
        <div class="labelcont">
          <label>
            <span>*</span>客人代码
          </label>
          <input class="cube-input"
                 placeholder=" "
                 readonly="readonly"
                 v-model="customerName"
          />
        </div>
        <div class="labelcont">
          <label>
            <span>*</span>供应商&#12288;
          </label>
          <input class="cube-input"
                 placeholder=" "
                 readonly="readonly"
                 v-model="vendName"
          />
        </div>
        <div class="labelcont">
          <label>
            <span>*</span>品控员&#12288;
          </label>
          <input class="cube-input"
                 placeholder=" "
          />   <!--@click="$refs.areaSelect.show()" readonly="readonly" v-model="areaFullName"-->
        </div>
        <div class="labelcont">
          <label>
            <span>*</span>区域&#12288;&#12288;
          </label>
          <input class="cube-input"
                 placeholder=" "
                 v-model="region"
          />   <!--@click="$refs.areaSelect.show()" readonly="readonly" -->
        </div>
      </div>
      <div class="content-middle">
        <!-- <div class="table"> -->
        <el-table  ref = "table"  :data="tableData"  border  style="width:100%" @row-click="clickData()"
                   :header-cell-style="{background:'\t#E8E8D0', fontFamily:'Helvetica',fontSize:'13px'}" >
          <el-table-column type="selection" width="70" align="left" :selectable="selectable"/>
          <el-table-column v-for="(book,key,index) in tableData[0]" :key="index" :prop="key"
                           :label="key" :width="cloumWith(index)" v-if="show(index)"></el-table-column>
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
        <!-- 质量标准信息//商品详细信息 -->
        <el-dialog :visible.sync="dialogFormVisible" width="80%" :destroy-on-close="true">
          <el-form>
            <el-form-item label="质量标准" prop="questionContent">
              <el-input type="textarea" :rows="10" v-model="input1" :readonly="true">
              </el-input>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-dialog :visible.sync="dialogFormEdit" width="80%" :destroy-on-close="true">
          <el-form ref="formEdit" >
            <el-form-item label="备注">
              <el-input ref="detailId"  v-show ="false" type="text" v-model="detailId"></el-input>
              <el-input ref="Marks" type="textarea" :rows="6" v-model="Marks" :readonly="true"></el-input>
            </el-form-item>
          </el-form>
          <el-form ref="formEdit" >
            <el-form-item label="新增">
              <el-input ref="addMarks" type="textarea" :rows="3" v-model="addMarks"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="Submit()">提交 </el-button>
          </div>
        </el-dialog>
      </div>
      <div id="con"  slot="footer" class="dialog-footer">
        <el-button id="pkButton" type="primary" @click="subMitSelect()">生成品控任务</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import AreaSelect from "@/components/area-select/area-select";
export default {
  name: "drug-detail",
  data() {
    return {
      tableData: [],
      vendName:" ",
      orderName:" ",
      region:" ",
      ourMerchName:" ",
      salesmanName:" ",
      customerName:" ",
      dialogFormVisible:false, //弹窗状态设置关闭
      input1:" ",
      detailId:" ",
      Marks:"  ",
      addMarks:"",
      hobbies: ['合格','不合格'],
      dialogFormEdit:false,
      params: {
        longitude: "",
        latitude: "",
        customerName: "",
        erpCustomerCode: "",
        areaCode: "",
        address: "",
        legalName: "",
        customerDesc: "",
      },
      ajaxFlag: false,
      areaFullName: ""
    };
  },
  created() {
    this.initWxConfig();
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/shopList") {
      // 设置下一个路由的 meta
      to.meta.keepAlive = false; // C 跳转到 A 时让 A 不缓存，即刷新
    }
    next();
  },
  methods: {
    checkDetail(orderCode){
      this.dialogFormVisible = true;
      this.input1 =orderCode;
    },
    selectable(row, index) {
      if(row.isFlag == 1){
        return false;
      }else{
        return true;
      }

    },
    //提交跟单任务，将界面明细行保存到数组里面，更改跟单任务明细状态
    subMitSelect(){
      var detailList =[];
      for(var i=0;i<this.$refs.table.selection.length;i++){
        var detailId = this.$refs.table.selection[i].detailId;
        detailList.push(detailId);
      }
      this.$methods.http("wx/sys/sys/dict/upDocDetailStatus",{docID:this.$route.query.docCode,detailArray:detailList})
        .then(res => {
          if(res =='200') {
            this.$createToast({txt: "任务提交成功！", type: "txt"}).show();
            //隐藏弹窗
            this.dialogFormEdit = false;
            //跳转跟单任务界面
            this.$router.push("/shopList");
          }else{
            this.$createToast({txt: "任务提交失败！", type: "txt"}).show();
            this.dialogFormEdit = false;
            window.location.reload();
          }
        });
      console.log(detailList)
    },
    modifyUser(row){
      console.log(row);
      this.dialogFormEdit = true;
      this.detailId = row.detailId;
      this.Marks =row.Marks;
    },
    //这边是动态设置明细表头的宽度
    cloumWith(indexCode){
      if(indexCode ==1 || indexCode ==3){
        return 100;
      }
    },
    //动态隐藏详细描述，然后再去描述信息/明细ID
    show(indexCode){
      if(indexCode ==5||indexCode ==6||indexCode ==7||indexCode ==0 || indexCode==8){
        return false;
      }else{
        return true;
      }
    },
    //备注提交功能
    Submit() {
      this.$methods.http("wx/sys/sys/dict/upDateDocDetail",
        {mark:this.$refs.addMarks.value,detailId:this.$refs.detailId.value}).then(res => {
        if(res =='200') {
          this.$createToast({txt: "备注保存成功！", type: "txt"}).show();
          //隐藏弹窗
          this.dialogFormEdit = false;
          //刷新界面
          window.location.reload();
        }else{
          this.$createToast({txt: "备注保存失败！", type: "txt"}).show();
          this.dialogFormEdit = false;
          window.location.reload();
        }
      });
      this.$nextTick(() => {
        this.$refs["formEdit"].resetFields();
      });
    },
    //备注取消功能
    cancel() {
      this.dialogFormEdit = false
      // 点击取消按钮的时候清除输入框中的内容 清除验证
      //  this.$nextTick获取了节点之后进行操作
      this.$nextTick(() => {
        // form对应你写的<el-form ref="form"></el-form>
        this.$refs["formEdit"].resetFields();
      });
    },
    //行点击事件
    clickData(row, event, column) {
      this.$router.push("/coverageDetail");
      return;
    },
    //接收前一个界面传过来的参数,根据docId获取明细信息
    initWxConfig() {
      this.$methods.http("wx/sys/sys/dict/searchPkDetail",{docID:this.$route.query.docCode}).then(res => {
        this.tableData = this.tableData.concat(res);
      });
      this.$methods.http("wx/sys/sys/dict/docIdSearch",{docID:this.$route.query.docCode}).then(res => {
        this.orderName = res.orderName;
        this.vendName = res.vendName;
        this.region = res.region;
        this.ourMerchName = res.ourMerchName;
        this.salesmanName = res.salesmanName;
        this.customerName = res.customerName;
      });
      // this.initWxJs(["getLocation"]).then(() => {
      //this.getLocation();
      // });
    },
    getLocation() {
      return new Promise((resolve, reject) => {
        wx.getLocation({
          type: "gcj02", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: res => {
            var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            var speed = res.speed; // 速度，以米/每秒计
            var accuracy = res.accuracy; // 位置精度
            let t = this.$GPSFormat.gcj02tobd09(longitude, latitude);
            longitude = t[0];
            latitude = t[1];
            this.params.longitude = longitude;
            this.params.latitude = latitude;
            resolve();
          },
          cancel: function(res) {
            alert("用户拒绝授权获取地理位置");
            reject()
          }
        });
      });
    },
    /*add() {
      if (!this.params.longitude) {
        this.$createToast({
          txt: "订单号不能为空",
          type: "txt"
        }).show();
        this.getLocation().then(() => {
          this.addAjax();
        });
      } else {
        this.addAjax();
      }
    },
    addAjax() {
      if (
        !this.$methods.check(this.params, {
          longitude: "经度",
          latitude: "纬度",
          customerName: "门店名称",
          areaCode: "所在地区",
          address: "街道地址"
        })
      ) {
        return;
      }
      if (this.ajaxFlag) {
        return;
      }
      this.ajaxFlag = true;
      const toast = this.$createToast({
        txt: "Loading...",
        mask: true,
        time: 0
      });
      toast.show();
      this.$methods
        .http("wx/mdm/mdm/customer/save", this.params)
        .then(res => {
          this.ajaxFlag = false;
          toast.hide();
          this.$createToast({
            txt: "添加门店成功",
            type: "txt"
          }).show();
          this.$router.push("/shopList");
        })
        .catch(() => {
          this.ajaxFlag = false;
          toast.hide();
        });
    }*/
  },
  components: {
    AreaSelect
  }
};
</script>
<style lang="stylus" scoped>
@import '../../../assets/css/convert.styl';


.wrap {
  width: 100%;
  height: 100%;
  overflow: auto;
  .headerApp{
    font-size:13px
  }
  .el-table {
    // 看这里！！！！！！！！！！！！！！！！！！！！！！！！！！！！
    // 深度选择器，去除默认的padding
    ///deep/ th {
    //  padding: 0 ;
    // }

    /deep/ .el-table__header-wrapper .el-checkbox__input::after {
      content: '合格';
      position: absolute;
      margin-left: 5px;
      font-size :2px;
      float: left;
      color: red;
      letter-spacing: 3px;
      margin-top: 1px;
    }
    /deep/ td {
      padding: 0 ;
    }
    .buttonType {
      padding: 5px; 10px ;
    }
  }
  .buttonClass{
    margin: 0 0 0 0.5rem;
  }
  .search-wrap {
    flex: none;
    height: convert(50);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: #fff;
    border-bottom: convert(3) solid #F4F6F8;

    .search-form {
      position relative
      width 100%
    }

    input {
      width: 70%; //89%
      height: convert(29);
      outline: none;
      border: 1px solid #E3E3E3;
      border-radius: 16px;
      padding: 0 convert(16) 0 convert(47);
      //margin 0 auto
      margin: 0 0 0 0.2rem;
      display block
    }

    i {
      color: #EAEAEA;
      position: absolute;
      top: 50%;
      //left: convert(56); //32
      left:15%;
      transform: translateY(-50%);
    }
  }
  #con{
    //background-color: #28BF62;
    width: convert(359);
    height: convert(50);
    line-height: convert(50);
    text-align: center;
    border: 0;
    font-size: convert(16);
    color: #fff;
    margin-top: convert(2);
    bottom: convert(33);
    margin-left: convert(8);
    border-radius: convert(2);
    #pkButton{
      width: convert(130);
      // margin-left: convert(180);
    }
  }
  .header {
    flex: none;
    height: 5%; //convert(40)
    text-align: center;
    //color: #fff;
    //background: url('./1.jpg') no-repeat;
    background-size: 100% 100%;
    padding-top: convert(10);
    background:#F0F0F0
    .count {
      font-size: convert(48);
      line-height: convert(64);
    }

    .desc {
      font-size: convert(17);
    }

    .text {
      margin-top: convert(5);
      font-size: convert(12);
    }
  }
  .content {
    padding-bottom: convert(55);
    height: 75%;  //2022/1/24  将100改成了85%
    background-color: #F0F0F0;

    .content-top {
      background-color: #fff;

      .labelcont {
        width: 90%;
        height: convert(40); //设置表头字段的宽度 48
        line-height: convert(50); //62
        border-bottom: 1px solid #d7dce5;
        border-collapse: collapse;
        font-size: convert(12);
        margin-left: convert(20);

        label {
          color: #4D4C4E;

          span {
            color: red;
          }
        }

        input {
          border: 0;
          outline: none;
          margin-left: convert(20);
          width :220px
        }

        input::-webkit-input-placeholder {
                color: #aab2bd;
              }
      }

      .labelphone {
        border-bottom: 0;
      }
    }

    .content-middle {
      bottom: 0;
      left: 0;
      top: 37%;
      margin-top: convert(5);
      width: 100%;
      height:67%; //convert(190)
      z-index: 1;
      background-color: #fff;
      display: flex;

      .labeladvice {
        width: 90%;
        height: convert(41);
        line-height: convert(41);
        font-size: convert(14);
        margin-left: convert(20);

        label {
          color: #4D4C4E;
        }

        textarea {
          width: convert(325);
          height: convert(102);
          border-color: #EAEAEA;
          outline: none;
        }
      }
    }
    .add {
      background-color: #28BF62;
      width: convert(359);
      height: convert(50);
      line-height: convert(50);
      text-align: center;
      border: 0;
      font-size: convert(16);
      color: #fff;
      margin-top: convert(25);
      bottom: convert(33);
      margin-left: convert(8);
      border-radius: convert(2);
    }
  }
}
</style>
