<template>
  <div class="wrap">
    <div class="content">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <div class="footer" v-show="footerShow">
      <div
        class="menu"
        v-for="(item, index) in menuIcon"
        :class="{active: index===menuActive}"
        :key="index"
        @click="menuChange(index)"
      >
        <i class="iconfont" :class="[menuActive===index?item.activeIcon:item.normalIcon]"></i>
        <span>{{item.text}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      menuActive: 0,
      footerShow: true,
      menuIcon: [
        {
          normalIcon: "iconshouye-weixuanzhong",
          activeIcon: "iconshouye-xuanzhong",
          text: "首页",
          url: "/home"
        },
        {
          normalIcon: "iconsaomajilu-weixuanzhong",
          activeIcon: "iconsaomajilu-xuanzhong",
          text: "消息列表",
          url: "/scanNews"
        },
        {
          normalIcon: "iconmendianliebiao-weixuanzhong",
          activeIcon: "iconmendianliebiao-xuanzhong",
          text: "跟单任务",
          url: "/shopList"
        },
        {
          normalIcon: "icondengjiliebiao",
          activeIcon: "icondengjiliebiaoxuanzhong",
          text: "品控任务",
          url: "/coverageList"
        }
      ]
    };
  },
  //在vue对象存活的情况下，进入当前存在activated()函数的页面时，一进入页面就触发；可用于初始化页面数据等
  activated() {
    switch (this.$route.path) {
        case "/home":
          this.menuActive = 0;
          break;
        case "/scanNews":
          this.menuActive = 1;
          break;
        case "/shopList":
          this.menuActive = 2;
          break;
        case "/coverageList":
          this.menuActive = 3;
          break;
      }
      //强制刷新
      this.$forceUpdate();
  },
  //this.$nextTick 将回调延迟到下次DOM更新循环之后执行。在修改数据之后立即使用它，然后等待DOM更新。
  mounted() {
    this.$nextTick(() => {
      switch (this.$route.path) {
        case "/home":
          this.menuActive = 0;
          break;
        case "/scanNews":
          this.menuActive = 1;
          break;
        case "/shopList":
          this.menuActive = 2;
          break;
        case "/coverageList":
          this.menuActive = 3;
          break;
      }
      this.$forceUpdate();
    });
  },
  methods: {
    menuChange(index) {
      this.menuActive = index;
      this.$forceUpdate();
      this.$router.replace(this.menuIcon[index].url);
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../../assets/css/convert.styl';

.wrap {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .content {
    flex: 1;
    background-color: #ffffff;
    overflow: hidden;
    box-sizing: border-box;
  }
  //2022/3/21 修改成65%
  .footer {
    height:2.3rem; // 65%
    z-index: 2;
    background-color: #ffffff;
    display: flex;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .menu {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &.active {
        i {
          color: #28BF62;
        }

        span {
          color: #28BF62;
        }
      }

      i {
        font-size: convert(22);
        color: #707070;
      }

      span {
        font-size: convert(10);
        margin-top: convert(5);
        color: #707070;
      }
    }
  }
}
</style>
