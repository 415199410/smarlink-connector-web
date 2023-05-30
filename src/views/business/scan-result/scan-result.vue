<template>
  <div class="scan-result">
    <div class="content">
      <div class="top">
        <div class="topicon">
          <i class="iconfont iconsaomaweizhi"></i>
          <p>扫码位置</p>
        </div>
        <div class="address">
          <span>{{scanInfo.customerName?scanInfo.customerName:scanInfo.scanAreaFullName}}</span>
        </div>
      </div>
      <div class="productinfo">
        <div class="infotitle">
          <label>
            <i class="iconfont iconshangpin"></i>产品信息
          </label>
        </div>
        <table class="middletable">
          <tr>
            <td>商品名称：</td>
            <td>{{productInfo.productName}}</td>
          </tr>
          <tr>
            <td>制剂规格：</td>
            <td>{{productInfo.spec}}</td>
          </tr>
          <tr class="bottomtable">
            <td>包装规格：</td>
            <td>{{productInfo.pkgSpec}}</td>
          </tr>
        </table>
      </div>
      <div class="productinfo">
        <div class="infotitle">
          <label>
            <i class="iconfont iconpicixinxi"></i>批次信息
          </label>
        </div>
        <table class="middletable">
          <tr>
            <td>生产批号：</td>
            <td>{{productionInfo.batchNo}}</td>
          </tr>
          <tr>
            <td>生产日期：</td>
            <td>{{productionInfo.mdf}}</td>
          </tr>
          <tr>
            <td>有效期：</td>
            <td>{{productionInfo.exp}}</td>
          </tr>
          <tr class="bottomtable">
            <td>出厂日期：</td>
            <td>{{productionInfo.productionTime}}</td>
          </tr>
        </table>
      </div>
      <div class="sentinfo" v-show="inOutInfo.length">
        <div class="infotitle2">
          <label>
            <i class="iconfont iconfahuozhongxinxi"></i>发货信息
          </label>
        </div>
        <div class="sent-content">
          <ul class="sent-ul">
            <li class="sent-li" v-for="(item, index) in inOutInfo" :key="index">
              <div class="info-icon">
                <i
                  class="iconfont"
                  :class="[index===0?'iconshengchanqiye':index===1?'iconyijijingxiaoshang':'iconerji']"
                ></i>
              </div>
              <div class="info-label">
                <label>{{item.customerName}}</label>
                <p class="info-p">发往单位：{{item.oppositeCustomerName}}</p>
                <p>
                  <i class="iconfont iconfahuo"></i>
                  {{item.inOutTime}}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "scan-result",
  data() {
    return {
      scanInfo: {},
      productInfo: {},
      productionInfo: {},
      inOutInfo: [],
      verifyInfo: {}
    };
  },
  created() {
    this.initParams();
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/scanList") {
      // 设置下一个路由的 meta
      to.meta.keepAlive = true; // C 跳转到 A 时让 A 不缓存，即刷新
    }
    next();
  },
  methods: {
    initParams() {
      if (this.$route.query.id) {
        this.search2({ scanId: this.$route.query.id });
      } else {
        let temp = JSON.parse(sessionStorage.getItem("scanParams"));
        if (!temp) {
          this.$router.replace("/home");
          return;
        }
        this.search(temp);
      }
    },
    search(params) {
      this.$methods.http("wx/scan/scan/record/qry", params).then(res => {
         if (!res.productInfo.productName) {
          this.$createToast({
            txt: "未查到该产品信息",
            type: "txt"
          }).show();
        } else {
          this.getData(res)
        }
        
      });
    },
    search2(params) {
      this.$methods.http("wx/scan/scan/record/getById", params).then(res => {
        this.getData(res)
      });
    },
    getData(res) {
      this.scanInfo = res.scanInfo;
      this.productInfo = res.productInfo;
      this.productionInfo = res.productionInfo;
      this.inOutInfo = res.inOutInfo;
      this.verifyInfo = res.verifyInfo;
      // if (res.inOutInfo.length > 1) {
      //   this.inOutInfo =
      //     this.GLOBAL.userInfo.userType == 351002
      //       ? res.inOutInfo
      //       : res.inOutInfo.slice(0, 1);
      // }
      this.$forceUpdate();
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../../assets/css/index.styl';

.scan-result {
  width: 100%;
  height: 100%;
  overflow: auto;

  .content {
    background-color: #F0F0F0;

    .top {
      background-color: #fff;
      width: 100%;
      height: convert(84);
      align-items: center;
      display: flex;

      .topicon {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: convert(79);
        position: relative;

        i {
          color: #28BF62;
          font-size: convert(24);
        }

        p {
          color: #BABABA;
          margin-top: convert(5);
        }
      }

      .topicon:before {
        position: absolute;
        content: '';
        right: 0;
        height: convert(58);
        transform: scale(1);
        transform-origin: left top;
        border-right: 1px solid #d7dce5;
      }

      .address {
        flex: 1;
        padding: convert(15);

        span {
          color: #4D4C4E;
          font-size: convert(16);
        }
      }
    }
  }

  .productinfo {
    background-color: #fff;
    width: 100%;
    margin-top: convert(5);

    .middletable {
      width: convert(335);
      margin-left: convert(20);
      line-height: convert(42);

      tr {
        font-size: convert(14);
        width: convert(335);
        border-bottom: 1px solid #d7dce5;
        padding: 0 convert(20);

        &:last-child {
          border: none;
        }

        td {
          &:nth-child(1) {
            width: 25%;
          }

          &:nth-child(2) {
            width: 75%;
            color: #A3A3A3;
            text-align: right;
          }
        }
      }
    }

    .infotitle {
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
  }

  .picinfo {
    background-color: #fff;
    width: 100%;
    margin-top: convert(5);

    .middletable1 {
      width: convert(335);
      margin-left: convert(20);
      line-height: convert(42);

      tr {
        width: convert(335);
        font-size: convert(14);
        border-bottom: 1px solid #d7dce5;
        padding: 0 convert(20);
      }
    }

    .bottomtable {
      border: convert(0) !important;

      i {
        color: #28BF62;
        font-size: convert(15);
      }
    }

    .infotitle1 {
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
  }

  .sentinfo {
    background-color: #fff;
    width: 100%;
    margin-top: convert(5);

    .infotitle2 {
      display: flex;
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

    .sent-content {
      .sent-ul {
        width: 100%;

        .sent-li {
          display: flex;
          height: convert(94);

          &:nth-child(3n-1) {
            .info-icon {
              i {
                color: #6186FF;
              }
            }

            .info-label {
              p {
                i {
                  color: #6186FF;
                }
              }
            }
          }

          &:nth-child(3n-3) {
            .info-icon {
              i {
                color: #FFB42B;
              }
            }

            .info-label {
              p {
                i {
                  color: #FFB42B;
                }
              }
            }
          }

          &:last-child {
            .info-icon:after {
              display: none;
            }
          }

          .info-icon {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: convert(54);
            margin-bottom: convert(20);
            padding-left: convert(20);
            position: relative;
            z-index: 2;

            &:after {
              content: '';
              position: absolute;
              width: 1px;
              height: 100%;
              background-color: #f5f5f5;
              left: convert(35);
              top: 70%;
              z-index: 1;
            }

            i {
              font-size: convert(23);
              color: #FF6530;
            }
          }

          .info-label {
            flex: 1;
            padding: convert(20);
            padding-left: convert(11);

            label {
              font-size: convert(14);
              color: #696969;
            }

            p {
              padding: convert(5) 0;
              font-size: convert(12);
              color: #B9B9B9;

              i {
                font-size: convert(14);
                padding-right: convert(10);
                color: #FF6530;
              }
            }

            .info-p {
              border-bottom: 1px solid #EAEAEA;
            }
          }

          .info-icon1 {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: convert(54);
            margin-bottom: convert(40);
            padding-left: convert(20);

            i {
              font-size: convert(23);
              color: #6186FF;
            }
          }

          .info-label1 {
            flex: 1;
            padding-left: convert(11);

            label {
              font-size: convert(14);
              color: #696969;
            }

            p {
              padding: convert(5) 0;
              font-size: convert(12);
              color: #B9B9B9;

              i {
                font-size: convert(14);
                padding-right: convert(10);
                color: #6186FF;
              }
            }

            .info-p1 {
              border-bottom: 1px solid #EAEAEA;
              width: convert(290);
            }
          }

          .info-icon2 {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: convert(54);
            margin-bottom: convert(60);
            padding-left: convert(20);

            i {
              font-size: convert(23);
              color: #FFB42B;
            }
          }

          .info-label2 {
            flex: 1;
            padding-left: convert(11);

            label {
              font-size: convert(14);
              color: #696969;
            }

            p {
              padding: convert(5) 0;
              font-size: convert(12);
              color: #B9B9B9;

              i {
                font-size: convert(14);
                padding-right: convert(10);
                color: #FFB42B;
              }
            }

            .info-p2 {
              border-bottom: 1px solid #EAEAEA;
              width: convert(290);
            }
          }
        }
      }
    }
  }
}
</style>
