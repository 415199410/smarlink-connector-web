<template>
  <div class="index-list2" v-show="maskShow">
    <transition name="fade">
      <div class="mask" v-show="maskShow" @click="hide"></div>
    </transition>
    <transition name="fold">
      <div class="wrap" v-show="maskShow">
        <div class="title">
          <span>选择门店</span>
          <i class="iconfont iconguanbi" @click="hide"></i>
        </div>
        <div class="content">
          <cube-index-list
          ref="cubeIndexList"
            :data="currentData"
            @select="selectItem"
          ></cube-index-list>
          <div class="empty" v-show="!currentData.length">暂无门店</div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>

export default {
  name: "index-list",
  data() {
    return {
      maskShow: false,
      currentData: [],
      defaultData: [
        {
          name: '无',
          items: [
            {
              name: '无',
              value: '',
              customerName: '',
              customerCode: ''
            }
          ]
        }
      ],
      data: []
    };
  },
  created() {
   // this.getCustomList()
  },
  methods: {
    getCustomList() {
      this.$methods
        .http("wx/mdm/mdm/customer/getForCombox", {
          createrCode: this.GLOBAL.userInfo.userCode
        })
        .then(res => {
          this.data = res.dataList;
          this.initData()
        });
    },
    initData() {
      let set = new Set()
      this.data.forEach(item=>{
        set.add(item.customerNameInitial)
      })
      for(let i of set.keys()) {
        this.defaultData.push({
          name: i,
          items: []
        })
      }
      this.defaultData.forEach(item=>{
        this.data.forEach(d=>{
           d.name = d.customerName
           d.value = d.customerCode
          if(d.customerNameInitial==item.name) {
            item.items.push(d)
          }
        })
      })
      this.currentData = this.defaultData
      this.$forceUpdate()

    },
    show() {
      this.maskShow = true;
    },
    hide() {
      this.maskShow = false;
    },
    selectItem(item) {
        this.$emit('select-item', item)
        this.hide()
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../assets/css/index.styl';
@import '../../assets/css/global.styl';
.index-list2 {
  position fixed
  bottom 0
  width 100%
  height 100%
  left 0
  z-index 999
}
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.wrap {
  position: fixed;
  height: 76%;
  width: 100%;
  background-color: #ffffff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  z-index: 20;
  left 0
  bottom 0
  // transform: translate3d(0, -100%, 0);
  display flex
  flex-direction column

  .title {
    height: convert(49);
    display: flex;
    justify-content: center;
    align-items: center;
    position relative

    span {
      color: #696969;
      font-size: convert(16);
      line-height: 1.2;
    }
    i {
      font-size 20px
      color #EAEAEA
      position absolute
      right 0
      top 50%
      transform translateY(-50%)
      padding convert(15)
      z-index 10
    }
  }
  .content {
      flex 1
      position relative
      .empty {
        position absolute
        top 100px
        width 100%
        text-align center
        color gray
        font-szie 16px
      }
  }
}
</style>
<style lang="stylus">
@import '../../assets/css/index.styl';
// .index-list .cube-index-list-anchor {
//     // padding 0
//     // padding 5px convert(22)
//     background-color #EAEAEA
// }
// .index-list .cube-index-list-item-def {
//     // line-height convert(45)
//     // height convert(45)
//     background-color #F8F8F8
// }
// .index-list .cube-index-list-nav {
//     background-color #ffffff
//     top 0
//     transform translateY(0)
// }
</style>
