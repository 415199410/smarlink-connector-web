<template>
  <div class="home">
      <div class="box" >
     <div class="left">
   当前登陆人：
      <span>{{currentUser}}</span>
    </div>
    <div class="right" @click="clearLocalStorage()">清除缓存v11.0</div>
    </div>
    <div class="header">
      <img src="./8.jpg"/>
    </div>
    <ul class="nav-list">
      <li class="nav-item" v-for="(item, index) in navList" :key="index" @click="navClick(index)">
        <span v-if="item.text == '消息通知'" style="width: 20px;height: 20px;top: 0.1px; right:25px;line-height: 25px;
        border-radius: 10px;font-size: 12px;background: #FF0000; color:white;text-align: center;position:absolute">{{numberInfo}}
        </span>
        <img :src="item.icon"/>
        <span style="font-size:12px">{{item.text}}</span>
      </li>
    </ul>
   <div id="mapContainer"></div>

  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
        currentUser:'',
      customList: [],
      numberInfo:" ",
      currentCustom: {
        customerCode: "",
        customerName: "无"
      },
      tipShow: false,
      scanParams: {
        epc: "",
        customerCode: ""
      },
      GPSInfo: {},
      navList: [
        {
          icon: require("./消息1.png"),
          text: "消息通知", //业务扫码,
        },
        {
          icon: require("./3.png"),
          text: "跟单查询"
        }, {
              icon: require("./3.png"),
              text: "验货完成"
          },
        //{
        //   icon: require("./3.png"),
        //  text: "验货查询"
        //},
        {
          icon: require("./5.png"),
          text: "工厂拜访"
        },
      ]
    };
  },
  //在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图
  created() {
     this.initCustomer();
  },
  //初始化加载显示条数
  activated(){
   this.initCustomer();
  },
  //初始化加载的时候会调用这个方法，在模板渲染成html后调用，通常是初始化页面完成后
  mounted() {
    this.$nextTick(() => {
      this.initialize();
    });
  },
  //使用 beforeRouteLeave 来记录路由跳转之前滚动条的位置
  //使用keepAlive来缓存信息列表状态，路由切换到信息列表的时候回触发 activated。
  beforeRouteLeave(to, from, next) {
    if (to.path === "/scanList") {
      // 设置下一个路由的 meta
      to.meta.keepAlive = false; // C 跳转到 A 时让 A 不缓存，即刷新
    }
    next();
  },
  methods: {
      clearLocalStorage(){
          localStorage.clear();
          window.location.reload();
      },
    initCustomer() {
        let userInfo = JSON.parse(localStorage.getItem('user'));
        let userNsCode = userInfo.userReal;
        this.$methods.http("wx/sys/sys/mes/searchNumber",{userNsCode:userNsCode}).then(res => {
        this.numberInfo = res.number;
            console.log(JSON.parse(localStorage.getItem('user')));
            this.currentUser = JSON.parse(localStorage.getItem('user')).userReal;
      });
    },
    initialize() {
      //2022 1 21 暂时注释  // 这里是加载定位的逻辑
      //this.initWxJs(["getLocation", "scanQRCode"]).then(() => {
        //this.getAllList();
        //this.getLocation();
     // });
    },
    selectCustom(item) {
      this.currentCustom = item;
      sessionStorage.setItem(this.GLOBAL.customer, JSON.stringify(item));
      this.$forceUpdate();
    },
    openCustomList() {
      this.$refs.indexList.show();
    },
    navClick(index) {
      //消息通知
      if (index === 0) {
        this.$router.push("/newsCode");//  newsCode
        return;
      }
        if (index === 1) {
            //sessionStorage.setItem(
            // "currentCustom",
            // JSON.stringify(this.currentCustom)
            //  );
            this.$router.push("/productCoverage");//productCoverage   gpsPosition  gpsPosition
            return;
        }
        //品控查询
        if (index === 2) {
            this.$router.push("/coverageIns");
            return;
        }
        //工厂拜访
        if (index === 3) {
            this.$router.push("/factoryVisit");
            return;
        }
      //扫码查询
      //if (index === 3) {
      //  this.$router.push("/factoryVisit");  //mine  //  //gpsPosition
      //  return;
      //}
    },
  },
  components: {
  }
};
</script>
<style lang="stylus" scoped>
@import '../../../assets/css/index.styl';

//设置第三个图标的img位置大小
.home .nav-list .nav-item:nth-child(3) img[data-v-708947cc] {
  width: 1.12rem;
  margin-top: 0.133333333333333rem;
}

.home {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;


  .box {
    display: flex;
    height: convert(18);
    background-color: #ffffff;
    align-items: center;
    font-size: 12px;
    line-height: 1.2;

    .left {
      flex: 1;
      overflow: hidden;
      padding-left: convert(5);
      color: #707070;
    }

    .right {
      height: 100%;
      line-height: convert(20);
      padding: 0 convert(1);
      color: #3988FF;
    }
  }

  .header {
    font-size: 0;
    flex: none;

    img {
      width: 100%;
    }
  }

  .nav-list {
    width: 95%; //95%
    height: convert(80); //80
    border-radius: 8px;
    background-color: #ffffff;
    display: flex;
    overflow: hidden;
    position: absolute;
    left: 50%;
    top: 4rem;//23%
    transform: translateX(-50%);
    z-index: 2;
    box-sizing: border-box;
    box-shadow: 2px 3px 9px rgba(0, 0, 0, 0.1), 2px 2px 5px rgba(0, 0, 0, 0.1);

    .nav-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;

      &:nth-child(1) img {
        width: convert(32);
        margin-top: convert(3);
      }

      &:nth-child(2) img {
        width: convert(42);
        margin-top: convert(5);
      }

      &:nth-child(3) img {
        width: convert(35);
      }

      &:nth-child(4) img {
        width: convert(45);
        margin-top: convert(2);
      }

      &:after {
        content: '';
        display: block;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 1px;
        height: convert(30);
        background-color: #ECECEC;
      }

      &:last-child:after {
        display: none;
      }

      span {
        margin-top: convert(8);
        font-size: convert(13);
        color: #0B2446;
      }
    }
  }

  #mapContainer {
    flex: 1;
  }

  .tip {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 50;
    display: flex;
    flex-direction: column;

    .tou {
      height: convert(29);
    }

    .tip-text {
      flex: 1;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
}
.labelcont {
  position: fixed;
  top: 250px;
  width: 50%;
  margin: auto;
  text-align: center;
}
@media (-webkit-min-device-pixel-ratio: 1.5), (min-device-aspect-ratio: 1.5) {
  .home {
    .nav-list {
      .nav-item:after {
        transform: translateY(-50%) scaleX(0.7);
      }
    }
  }
}

@media (-webkit-min-device-pixel-ratio: 2), (min-device-aspect-ratio: 2) {
  .home {
    .nav-list {
      .nav-item:after {
        transform: translateY(-50%) scaleX(0.5);
      }
    }
  }
}

@media (-webkit-min-device-pixel-ratio: 3), (min-device-aspect-ratio: 3) {
  .home {
    .nav-list {
      .nav-item:after {
        transform: translateY(-50%) scaleX(0.3);
      }
    }
  }
}
</style>
