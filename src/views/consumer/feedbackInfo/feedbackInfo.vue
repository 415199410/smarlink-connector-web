<template>
  <div class="wrap">
    <div class="content">
      <form>
        <div class="content-top">
          <div class="labelcont">
            <label>
              <span>*</span> 姓名：
            </label>
            <input placeholder="请填写真实姓名" v-model="params.userName" />
          </div>
          <div class="labelcont" @click="openScan">
            <label>
              <span>*</span>产品：
            </label>
            <input placeholder="请扫码产品追溯码获取产品信息" readonly v-model="params.productName" />
            <i class="iconfont iconsaoma"></i>
          </div>
          <div class="labelcont">
            <label>门店：</label>
            <input placeholder="具体门店名称" v-model="params.customerName" />
          </div>
          <div class="labelcont labelphone">
            <label>
              <span>*</span>联系方式：
            </label>
            <input placeholder="消费者有效联系方式" v-model="params.contactTel" />
          </div>
        </div>
        <div class="content-middle">
          <div class="labeladvice">
            <label>
              <span>*</span>反馈建议：
            </label>
            <textarea v-model="params.advice"></textarea>
          </div>
        </div>
        <div class="content-bottom">
          <img-upload ref="imgUpload"></img-upload>
        </div>
      </form>
      <div class="button" @click="submit">提交</div>
    </div>
  </div>
</template>
<script>
import ImgUpload from "@/components/img-upload/img-upload";
export default {
  name: "feedbackInfo",
  data() {
    return {
      params: {
        longitude: "",
        latitude: "",
        province: "",
        city: "",
        district: "",
        street: "",
        streetNumber: "",
        userName: "",
        customerName: "",
        contactTel: "",
        advice: "",
        productName: "",
        ratioCode: "",
        openId: this.GLOBAL.consumer.openId
      },
      ajaxFlag: false
    };
  },
  created() {
    this.initWxConfig();
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/feedbackList") {
      // 设置下一个路由的 meta
      to.meta.keepAlive = false; // C 跳转到 A 时让 A 不缓存，即刷新
    }
    next();
  },
  methods: {
    initWxConfig() {
      this.initWxJs(["getLocation", "scanQRCode"]).then(() => {
        //this.getLocation();
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
            });
            resolve();
          },
          cancel: () => {
            alert("用户拒绝授权获取地理位置");
            reject();
          }
        });
      });
    },
    openScan() {
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: res => {
          var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          if (result.includes(",")) {
            result = result.split(",");
            this.getProduct(result);
          } else {
            this.getProduct(result);
          }
        }
      });
    },
    getProduct(code) {
      this.$methods
        .http("wx/scan/scan/record/qryProduct", { epc: code })
        .then(res => {
          this.params.productName = res.productInfo.productName;
          this.params.ratioCode = res.productInfo.ratioCode;
        });
    },
    submit() {
      if (!/^[1]\d{10}$/.test(this.params.contactTel)) {
        this.$createToast({
          txt: "手机号格式不正确",
          type: "txt"
        }).show();
        return;
      }
      if (
        !this.$methods.check(this.params, {
          userName: "姓名",
          contactTel: "联系方式",
          advice: "反馈建议",
          productName: "产品名称"
        })
      ) {
        return;
      }

      if (!this.params.longitude) {
        this.$createToast({
          txt: "经纬度不能为空",
          type: "txt"
        }).show();
        this.getLocation().then(() => {
          this.submitAjax();
        });
      } else {
        this.submitAjax();
      }
    },
    submitAjax() {
      let imgs = this.$refs.imgUpload.getList();
      let arr1 = imgs.filter(item => {
        return item.edit;
      });
      if (arr1.length <= 0) {
        this.$createToast({
          txt: "图片不能为空",
          type: "txt"
        }).show();
        return;
      }
      let formData = new FormData();
      let temp = JSON.parse(JSON.stringify(this.params));
      formData.append("reqParam", JSON.stringify(temp));
      arr1.forEach((item, index) => {
        formData.append("attachFile" + index, item.file);
      });
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
      this.$http({
        url: this.GLOBAL.API + "wx/submit/submit/feedback/save",
        method: "post",
        data: formData
      })
        .then(res => {
          this.ajaxFlag = false;
          toast.hide();
          this.$createToast({
            txt: "反馈成功",
            type: "txt"
          }).show();
          this.$router.push("/feedbackList");
        })
        .catch(err => {
          this.ajaxFlag = false;
          toast.hide();
        });
    }
  },
  components: {
    ImgUpload
  }
};
</script>
<style lang="stylus" scoped>
@import '../../../assets/css/convert.styl';

.wrap {
  width: 100%;
  height: 100%;
  overflow: auto;

  .content {
    height: 100%;
    background-color: #F0F0F0;

    .content-top {
      background-color: #fff;

      .labelcont {
        width: 90%;
        min-height: convert(62);
        border-bottom: 1px solid #d7dce5;
        font-size: convert(14);
        margin-left: convert(20);
        display: flex;
        align-items: center;
        position: relative;

        label {
          color: #4D4C4E;
          width: 25%;

          span {
            color: red;
          }
        }

        input {
          border: 0;
          outline: none;
          width: 75%;
          height: 35px;
        }

        .iconsaoma {
          font-size: 16px;
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
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
      height: convert(162);
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

          span {
            color: red;
          }
        }

        textarea {
          width: convert(325);
          height: convert(102);
          border-color: #EAEAEA;
          outline: none;
        }
      }
    }

    .content-bottom {
      margin-top: convert(5);
      width: 100%;
      min-height: convert(127);
      z-index: 1;
      background-color: #fff;

      .img-upload {
        padding: convert(18) convert(20);
      }
    }

    .button {
      background-color: #28BF62;
      width: convert(359);
      height: convert(50);
      line-height: convert(50);
      border: 0;
      outline: none;
      text-align: center;
      font-size: convert(16);
      color: #fff;
      margin-left: convert(8);
      margin-top: convert(15);
      border-radius: convert(2);
    }
  }
}
</style>
