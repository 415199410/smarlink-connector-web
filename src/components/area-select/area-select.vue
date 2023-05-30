<template>
  <div>
    <transition name="fade">
      <div class="mask" v-show="maskShow" @click="hide"></div>
    </transition>
    <transition name="fold">
      <div class="wrap" v-show="maskShow">
        <div class="title">
          <span>所在地区</span>
          <div class="btn" @click="right">确认</div>
        </div>
        <div class="desc">已选择</div>
        <div class="text">{{provinceActive.text}} {{cityActive.text}} {{areaActive.text}}</div>
        <ul class="area-title border-1px">
          <li class="area-item">
            <span>省份</span>
          </li>
          <li class="area-item">
            <span>城市</span>
          </li>
          <li class="area-item">
            <span>区县</span>
          </li>
        </ul>
        <div class="area-content">
          <div class="area-ul-wrap">
            <ul class="area">
              <li
                class="item"
                v-for="(item, index) in data"
                :key="index"
                @click="provinceClick(item)"
                :class="{active: item.areaCode===provinceActive.areaCode}"
              >{{item.areaName}}</li>
            </ul>
          </div>
          <div class="area-ul-wrap">
            <ul class="area">
              <li
                class="item"
                v-for="(item, index) in cityComputedList"
                :class="{active: item.areaCode===cityActive.areaCode}"
                :key="index"
                @click="cityClick(item)"
              >{{item.areaName}}</li>
            </ul>
          </div>
          <div class="area-ul-wrap">
            <ul class="area">
              <li
                class="item"
                v-for="(item, index) in areaComputedList"
                :class="{active: item.areaCode===areaActive.areaCode}"
                :key="index"
                @click="areaClick(item)"
              >{{item.areaName}}</li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "area-select",
  data() {
    return {
      maskShow: false,
      provinceActive: {},
      cityActive: {},
      areaActive: {},
      data: [],
      cityList: {},
      areaList: {}
    };
  },
  computed: {
    cityComputedList() {
      return this.provinceActive.areaCode && this.cityList[this.provinceActive.areaCode]
        ? this.cityList[this.provinceActive.areaCode]
        : [];
    },
    areaComputedList() {
      return this.cityActive.areaCode && this.areaList[this.cityActive.areaCode]
        ? this.areaList[this.cityActive.areaCode]
        : [];
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$methods.http("wx/mdm/mdm/area/getForCombox").then(res => {
        this.data = this.getTree(
          res.dataList,
          "000000",
          "parentCode",
          "areaCode"
        );
        this.data.forEach(item => {
          if(typeof item.child !='undefined') {
            this.cityList[item.areaCode] = item.child;
          }
        });
        for (let i in this.cityList) {
          this.cityList[i].forEach(item => {
            if(typeof item.child != 'undefined') {
              this.areaList[item.areaCode] = item.child;
            }

          });
        }
      });
    },
    getTree(data, root, fatherId, childId) {
      let cloneData = JSON.parse(JSON.stringify(data)); // 对源数据深度克隆
      let tree = cloneData.filter(father => {
        //循环所有项
        let branchArr = cloneData.filter(child => {
          return father[childId] == child[fatherId]; //返回每一项的子级数组
        });
        if (branchArr.length > 0) {
          father.child = branchArr; //如果存在子级，则给父级添加一个children属性，并赋值
        }
        return father[fatherId] == root; //返回第一层
      });
      return tree; //返回树形数据
    },
    show() {
      this.maskShow = true;
    },
    hide() {
      this.maskShow = false;
    },
    provinceClick(item) {
      this.provinceActive = item;
      this.cityActive = {};
      this.areaActive = {};
    },
    cityClick(item) {
      this.cityActive = item;
      this.areaActive = {};
    },
    areaClick(item) {
      this.areaActive = item;
    },
    right() {
      if (!this.provinceActive.areaCode) {
        this.toast = this.$createToast({
          txt: "请选择省份",
          type: "txt"
        });
        this.toast.show();
        return;
      }

      if (!this.cityActive.areaCode) {
        this.toast = this.$createToast({
          txt: "请选择城市",
          type: "txt"
        });
        this.toast.show();
        return;
      }
      if (!this.areaActive.areaCode) {
        this.toast = this.$createToast({
          txt: "请选择区县",
          type: "txt"
        });
        this.toast.show();
        return;
      }

      this.$emit("area-selected", {
        provinceActive: this.provinceActive,
        cityActive: this.cityActive,
        areaActive: this.areaActive
      });
      this.hide();
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../assets/css/index.styl';

// @import '../../assets/css/global.styl';
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
  height: 76%;
  background-color: #fff;
  position: fixed;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  z-index: 20;
  transform: translate3d(0, -100%, 0);
  color: #868686;
  font-size: convert(14);
  display: flex;
  flex-direction: column;

  .title {
    text-align: center;
    line-height: convert(33);
    position: relative;

    span {
      color: #696969;
      font-size: convert(16);
    }

    .btn {
      position: absolute;
      right: 0;
      top: 0;
      color: #28BF62;
      line-height: convert(33);
      padding: 0 convert(15);
    }
  }

  .desc {
    line-height: convert(33);
    padding-left: convert(18);
  }

  .text {
    color: #28BF62;
    height: convert(25);
    line-height: convert(25);
    background-color: #F4F4F4;
    padding: 0 convert(18);
    text-overflow-e();
  }

  .area-title {
    flex: none;
    display: flex;
    height: convert(35);
    border-1px(#EAEAEA, border-bottom);

    .area-item {
      flex: 1;
      text-align: center;
      height: 100%;
      padding-top: convert(15);
    }
  }

  .area-content {
    flex: 1;
    display: flex;

    .area-ul-wrap {
      flex: 1;
      overflow: auto;
      height: 100%;
    }

    .area {
      padding: convert(10) 0;

      .item {
        line-height: convert(40);
        padding: 0 convert(18);
        text-overflow-e();
        &.active {
          color #28BF62
        }
      }
    }
  }
}
</style>
