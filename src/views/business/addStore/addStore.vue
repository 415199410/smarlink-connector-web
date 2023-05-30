<template>
  <div class="wrap">
    <div class="header">
      <div class="count"></div> <!--{{total}}-->
      <div class="desc"></div>
      <div class="text"></div>
    </div>
    <div class="search-wrap">
      <!-- <form class="search-form" action @submit="search($event)"> -->
      <input
        type="search"
        autocomplete="off"
        placeholder="输入采购订单号"
      /> <!--v-model="params.customerName"-->
      <a class="buttonClass">搜索</a>
      <i class="iconfont iconchazhao"></i>
      <!-- </form> -->
    </div>
    <div class="content">
      <form>
        <div class="content-top">
          <div class="labelcont">
            <label>
              <span>*</span>采购订单
            </label>
            <input placeholder=" " readonly="readonly"/>
          </div> <!--v-model="params.customerName1"  -->
          <div class="labelcont">
            <label>
              <span>*</span>我司跟单
            </label>
            <input class="cube-input" placeholder=" " readonly="readonly"/> <!--v-model="params.address"-->
          </div>
          <div class="labelcont">
            <label>
              <span>*</span>客人代码
            </label>
            <input class="cube-input"
                   placeholder=" "
                   readonly="readonly"
            />   <!--@click="$refs.areaSelect.show()"               v-model="areaFullName"-->
          </div>
          <div class="labelcont">
            <label>
              <span>*</span>质量标准
            </label>
            <!-- <label> 质量标准：</label>-->
            <a href="#" style="margin: 0;padding: 0;"></a>
            <!--  <input placeholder="公司法人" v-model="params.legalName" /> -->
          </div>
          <div class="labelcont">
            <label>
              <span>*</span>供应商&#12288;
            </label>
            <input class="cube-input"
                   placeholder=" "
                   readonly="readonly"
            />   <!--@click="$refs.areaSelect.show()" v-model="areaFullName"-->
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
            />   <!--@click="$refs.areaSelect.show()" readonly="readonly" v-model="areaFullName"-->
          </div>

        </div>
        <div class="content-middle">
          <!-- <div class="table"> -->
          <el-table :data="tableData"  border  style="width:100%" height="220"
                    :header-cell-style="{background:'', color:'#3C3C3C'}">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="name" label="货品" width="100"></el-table-column>
            <el-table-column prop="number" label="数量" width="80"></el-table-column>
            <el-table-column prop="date" label="工厂交期" width="110"></el-table-column>
            <el-table-column prop="" label="验货标准" width="110"></el-table-column>
            <el-table-column prop="" label="船样/确认样" width="110"></el-table-column>
            <el-table-column prop="" label="关键点" width="110"></el-table-column>
            <el-table-column prop="" label="任务类型" width="110"></el-table-column>
            <el-table-column prop="source" label="备注"></el-table-column>
            <el-table-column label="质量标准" align="center" min-width="80">
              　　　　<template slot-scope="scope">
              　　　　　<el-button type="text" @click="checkDetail(scope.row.number)">查看</el-button>
              　　　　</template>
              　　</el-table-column>
            　<el-table-column label="操作" align="center" min-width="100">
            　　　　<template slot-scope="scope">
            <el-button  class ="buttonType" type="info" @click="modifyUser(scope.row.phone)">修改</el-button>
            　　　　</template>
            　　</el-table-column>
          </el-table>
          <el-dialog :visible.sync="dialogFormVisible"
                     width="80%"
                     :destroy-on-close="true"
          >
            <el-form>
              <el-form-item label="质量标准" prop="questionContent">
                <el-input type="textarea" :rows="10" v-model="input1">
                  <span>231312</span>
                </el-input>
              </el-form-item>
            </el-form>
            <!--  <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click=" createData()">确定</el-button>
              </div> -->
          </el-dialog>
          <!--</div>-->
        </div>
        <!-- <div class="content-middle">
           <div class="labeladvice">
             <label>经营范围：</label>
             <textarea v-model="params.customerDesc"></textarea>
           </div>
         </div>-->
      </form>

      <div class="add" @click="add">生成任务</div>
    </div>
    <area-select ref="areaSelect" @area-selected="areaSelected"></area-select>
  </div>
</template>
<script>
import AreaSelect from "@/components/area-select/area-select";
export default {
  name: "addStore",
  data() {
    return {
      dialogFormVisible:false, //弹窗状态设置关闭
      input1:"眉部修整套装-PVC托\n" +
        "PET盒尺寸：（115+25）*60*22MM\n" +
        "PVC托厚度：35C\n" +
        "商品条码：6941501520182\n" +
        "产品的摆放：靠下对齐，眉夹在左，眉刷在右\n" +
        "注：PVC托有卡位、手指位、边缘痕\n" +
        "价格含税，货到阳江健亮",
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        number:'10'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        number:'9'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        number:'10'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        number:'10'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        number:'10'
      }],
      params: {
        longitude: "",
        latitude: "",
        customerName: "",
        erpCustomerCode: "",
        areaCode: "",
        address: "",
        // customerType: "",
        legalName: "",
        customerDesc: "",
        //  customerType: 0
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
    checkDetail(number){
      this.dialogFormVisible = true;
    },
    initWxConfig() {
      //this.initWxJs(["getLocation"]).then(() => {
        //this.getLocation();
      //});
    },
    areaSelected(item) {
      this.params.areaCode = item.areaActive.areaCode;
      this.areaFullName = item.areaActive.areaFullName;
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
    add() {
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
    }
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
  .cube-input{

  }
  .el-table {
    // 看这里！！！！！！！！！！！！！！！！！！！！！！！！！！！！
    // 深度选择器，去除默认的padding
    ///deep/ th {
    //  padding: 0 ;
    // }
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

  .header {
    flex: none;
    height: convert(40);
    text-align: center;
    color: #fff;
    //background: url('./1.jpg') no-repeat;
    background-size: 100% 100%;
    padding-top: convert(10);

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
    height: 85%;  //2022/1/24  将100改成了85%
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
          margin-left: convert(58);
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
      height: convert(190);
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
      // width: convert(359);
      width: 80%; //96% 设置按钮的宽度
      height: convert(42);//50  设置生成按钮的高度
      border: 0;
      outline: none;
      text-align: center;
      font-size: convert(16);
      color: #fff;
      margin-left: convert(35);//设置按钮居左位置
      margin-top: convert(50);//设置生成按钮居顶部高度 92
      //margin-top: 13%;//设置生成按钮居顶部高度 92
      border-radius: convert(2);
      line-height: convert(45);
      border-radius:16px;
    }
  }
}
</style>
