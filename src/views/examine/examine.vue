<template>
  <div class="wrap">
    <div class="content" :style="{color: flag==0?'#33E578':'#FF3F1C'}">
      <i class="iconfont" :class="[flag==0?'icondaishenhe':'iconbohui']"></i>
      <span>{{flag==0?'个人信息待审核中…':'个人信息被驳回'}}</span>
    </div>
    <div class="btn" @click="close">返回</div>
  </div>
</template>
<script>
export default {
  name: "examine",
  data() {
    return {
      flag: -1
    };
  },
  created() {
    this.flag = this.$route.query.flag;
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener(
        "popstate",
        function(e) {
          WeixinJSBridge.call('closeWindow')
        },
        false
      );
    });
  },
  methods: {
    close() {
      WeixinJSBridge.call('closeWindow')
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../assets/css/index.styl';

.wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: convert(142);

    i {
      font-size: convert(60);
    }

    span {
      line-height: 1.2;
      margin-top: 15px;
      font-size: 14px;
    }
  }

  .btn {
    width: convert(135);
    height: convert(35);
    line-height: convert(35);
    margin: convert(212) auto 0;
    text-align: center;
    background-color: #34EA7A;
    border-radius: 100px;
    color: #ffffff;
    box-shadow: 2px 3px 10px #34EA7A;
  }
}
</style>
