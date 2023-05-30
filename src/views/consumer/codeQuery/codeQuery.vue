<template>
  <div class="wrap">
    <div class="topone">
        <img src ="./22.jpg" />
    </div>
    <div class="content-wrap">
      <div class="toptwo" v-show="productInfo.productName">
        <img src="./3.png" />
      </div>
      <!--  <div class="topthree" v-show="1">
        <div class="threename">{{productInfo.productName}}</div>
        <div class="threecode">追溯码：{{params.epc}}</div>
      </div> productInfo.productName v-show 字段为空隐藏div 否则显示 -->

      <div class="no" > <!--v-show="!productInfo.productName" -->
        <img src="./1.jpg" @click="scan($event)" />
        <form action @submit="search">
          <input type="search" autocomplete="off" v-model="params.epc" placeholder="手动输入条形码查询" />
          <input type="submit" value="查询" />
        </form>
      </div>
      <div class="content-middle" v-show="1"> <!--productInfo.productName v-show 字段为空隐藏div 否则显示-->
        <div class="tabletop">
          <label>
            <i class="iconfont iconshangpin"></i>商品信息
          </label>
        </div>
        <table class="middletable">
          <tr>
            <td>商品名称：</td>
            <td>{{productInfo.productName}}</td>
          </tr>
          <tr>
            <td>规格：</td>
            <td>{{productInfo.spec}}</td>
          </tr>
          <tr class="tablebottom">
            <td>出厂日期：</td>
            <td>{{productionInfo.productionTime}}</td>
          </tr>
          <tr>
            <td>有效期：</td>
            <td>{{productInfo.pkgSpec}}</td>
          </tr>
          <tr>
            <td>备注：</td>
            <td>{{productInfo.pkgSpec}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "codeQuery",
  data() {
    return {
      menuActive: 0,
      params: {
        openId: this.GLOBAL.consumer.openId,
        epc: "",
        longitude: "",
        latitude: "",
        province: "",
        city: "",
        district: "",
        street: "",
        streetNumber: "",
        customerCode: ""
      },
      productInfo: {},
      productionInfo: {}
    };
  },
  created() {
    this.initWxConfig();
  },
  mounted() {
    //功能：手机端返回时，退出APP，2022/1/27 修改为返回首页
    this.$nextTick(() => {
      window.addEventListener(
        "popstate",
        function(e) {
        // WeixinJSBridge.call("closeWindow");
        },
        false
      );
    });
  },
  methods: {
    initWxConfig() {
      this.initWxJs(["getLocation", "scanQRCode"]).then(() => {
       // this.getLocation();
      });
    },
    scan() {
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: res => {
          var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          if (result.includes(",")) {
            result = result.split(",");
            this.params.epc = result[1];
          } else {
            this.params.epc = result;
          }

          if (!this.params.longitude) {
            this.getLocation().then(() => {
              this.getData();
            });
          } else {
            this.getData();
          }
        }
      });
    },
    getLocation() {
      return new Promise((resolve, reject) => {
        wx.getLocation({
          type: "gcj02", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: res => {
            var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。

            let t = this.$GPSFormat.gcj02tobd09(longitude, latitude);
            longitude = t[0];
            latitude = t[1];

            var point = new BMap.Point(longitude, latitude);
            var geoc = new BMap.Geocoder();
            geoc.getLocation(point, res => {
              let addComp = res.addressComponents;
              this.params.province = addComp.province;
              this.params.city = addComp.city;
              this.params.district = addComp.district;
              this.params.street = addComp.street;
              this.params.streetNumber = addComp.streetNumber;
              this.params.longitude = longitude;
              this.params.latitude = latitude;
              resolve();
            });
          },
          cancel: function(res) {
            alert("用户拒绝授权获取地理位置");
          }
        });
      });
    },
    search(event) {
      event.preventDefault();
      if (this.params.epc.toString().trim().length !== 20) {
        this.$createToast({
          txt: "追溯码为20位，请检查",
          type: "txt"
        }).show();
        return;
      }
      if (!this.$methods.check({ epc: this.params.epc }, { epc: "追溯码" })) {
        return;
      }
      if (!this.params.longitude) {
        this.$createToast({
          txt: "经纬度不能为空",
          type: "txt"
        }).show();
        this.getLocation().then(() => {
          this.getData();
        });
      } else {
        this.getData();
      }
    },
    getData() {
      this.$methods.http("wx/scan/scan/record/qry", this.params).then(res => {
        if (!res.productInfo.productName) {
          this.$createToast({
            txt: "未查到该产品信息",
            type: "txt"
          }).show();
        } else {
          this.productInfo = res.productInfo;
          this.productionInfo = res.productionInfo;
          this.$forceUpdate();
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../../assets/css/convert.styl';

.wrap {
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #F0F0F0;
  display: flex;
  flex-direction: column;

  .topone {
    width: 100%;
    background-color: #03a9f4;

    img {
      width: 100%;
    }
  }

  .content-wrap {
    flex: 1;
    background-color: #fff;

    .no {
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        width: convert(170);
        margin-top: 20px;
      }

      form {
        display: flex;

        input[type='submit'] {
          width: convert(80);
          background-color: #7CAFFF;
          color: #fff;
        }
      }

      input {
        background-color: rgb(247, 245, 245);
        height: 35px;
        width: 200px;
        text-align: center;
        padding: 0 10px;
        border-radius: 20px;
        margin-top: 40px; //50px
      }
    }
  }

  .toptwo {
    position: absolute;
    top: 18%;
    left: 80%;
    width: convert(57);
    height: convert(57);
    z-index: 2;
    border-radius: 50%;
    background-color: #39DD78;
    -moz-box-shadow: 0 0 convert(20) #39DD78;
    -webkit-box-shadow: 0 0 convert(20) #39DD78;
    box-shadow: 0 0 convert(20) #39DD78;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: convert(36);
      height: convert(36);
    }
  }

  .topthree {
    flex-direction: column;
    top: 0;
    left: 0;
    width: 100%;
    height: convert(87);
    z-index: 1;
    background-color: #fff;
    display: flex;
  }

  .threename {
    font-size: convert(18);
    width: 100%;
    padding: convert(20);
    height: convert(24);
  }

  .threecode {
    font-size: convert(14);
    width: 100%;
    color: #9F9F9F;
    height: convert(19);
    padding: convert(5) convert(20);
  }

  .content-middle {
    bottom: 0;
    left: 0;
    top: 37%;
    margin-top: convert(20);//5
    width: 100%;
    z-index: 1;
    background-color: #fff;

    .tabletop {
      line-height: convert(38);
      border-bottom: 1px solid #d7dce5;
      border-collapse: collapse;

      label {
        font-size: convert(16);
        padding: 0 convert(20);
        color: #696969;

        i {
          color: #28bf62;
          font-size: convert(15);
          margin-right: convert(5);
        }
      }
    }

    .middletable {
      width: convert(335);
      margin-left: convert(20);
      line-height: 1.5;

      tr {
        border-bottom: 1px solid #d7dce5;
        border-collapse: collapse;

        td {
          min-height: convert(42);
          padding: 10px 0;

          &:nth-child(even) {
            text-align: right;
            width: 80%;
            color: #A3A3A3;
          }

          &:nth-child(odd) {
            width: 20%;
          }
        }

        i {
          color: #28BF62;
          font-size: convert(15);
        }
      }

      .tablebottom {
        border-bottom: none;
      }
    }
  }
}
</style>
