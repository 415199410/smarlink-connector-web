<template>
  <div class="wrap">
    <cube-scroll ref="feedbackListScroll" :scroll-events="['scroll']"  @scroll="scroll"  :data="data" :options="options" @pulling-up="onPullingUp">
      <ul class="list">
        <li class="item" v-for="(item, index) in data" :key="index" @click="itemClick(item)">
          <div class="info">
            <div class="left">姓名：{{item.createrName}}</div>
            <div class="right">联系方式：{{item.contactTel}}</div>
          </div>
          <div class="text">{{item.advice}}</div>
          <div :style="{color: data.dealSts==108020?'#28BF62':'#4D4C4E'}">{{item.dealStsName}}</div>
          <div class="address">
            <i class="iconfont iconzuobiao"></i>
            <span>{{item.customerName?item.customerName:item.areaFullName}}</span>
          </div>
          <i class="iconfont iconjiantou"></i>
        </li>
      </ul>
    </cube-scroll>
    <div class="btn" @click="$router.push('/feedbackInfo')">
        <i class="iconfont icontianjiatupian"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "feedback-list",
  data() {
    return {
      data: [],
      total: 0,
      options: {
        pullUpLoad: true,
        probeType: 3
      },
      params: {
        createrCode: this.GLOBAL.consumer.openId,
        page: 1,
        pageSize: 10
      },
      scrollY: 0,
      flag: 0
    };
  },
  created() {
    this.getData();
  },
  activated() {
    this.$refs.feedbackListScroll.scrollTo(0,this.scrollY, 0)
    this.$nextTick(()=>{
      document.addEventListener(
        "popstate",
        this.popstateFn,
        false
      );
    })
    
  },
  deactivated() {
    document.removeEventListener('popstate', this.popstateFn)
  },
  mounted() {
    this.$nextTick(() => {
      document.addEventListener(
        "popstate",
        this.popstateFn,
        false
      );
    });
  },
  methods: {
    popstateFn() {
      WeixinJSBridge.call('closeWindow')
    },
    getData() {
      this.$methods
        .http("wx/submit/submit/feedback/list", this.params)
        .then(res => {
          this.data = this.data.concat(res.dataList);
          this.total = res.total;
        });
    },
    onPullingUp() {
      if (this.data.length >= this.total) {
        this.$refs.feedbackListScroll.forceUpdate();
        return;
      }
      this.params.page++;
      this.getData();
    },
    itemClick(item) {
      this.$router.push({
        path: "/feedbackDetail",
        query: { id: item.id }
      });
    },
    scroll(obj) {
      this.scrollY = obj.y
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../../assets/css/convert.styl';

.wrap {
  width: 100%;
  height: 100%;
  background-color: #F4F6F8;

  .list {

    .item {
      border-bottom: convert(5) solid #F4F6F8;
      background-color: #ffffff;
      padding: 10px convert(10);
      line-height: 1.5;
      position relative

      &:last-child {
        border: none;
      }

      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        color: #AFAFAF;
        border-bottom: 1px solid #EBEBEB;
      }

      .text {
        width: 90%;
        font-size: 12px;
        color: #707070;
        padding: 10px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3; 
        -Webkit-box-orient: vertical;
        max-height 65px
      }
      .address {
          display flex
          align-items center
          i {
              color #707070
              font-size 12px
          }
          span {
              color #AFAFAF
              font-size 12px
              margin-left 10px
          }
      }
      .iconjiantou {
          position absolute
          right convert(20)
          top 50%
          transform translateY(-50%)
          color #707070
      }
    }
  }
  .btn {
      background-color #28BF62
      color #ffffff
      width convert(55)
      height convert(55)
      line-height convert(55)
      text-align center
      position fixed
      right 20px
      bottom 40px
      border-radius 50%
      z-index 50
  }
}
</style>
