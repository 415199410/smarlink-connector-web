<template>
  <div class="scan-list">
    <cube-scroll ref="scanListScroll" :scroll-events="['scroll']" @scroll="scroll" :data="data" :options="options" @pulling-up="onPullingUp">
      <ul class="list">
        <li class="item" v-for="(item, index) in data" :key="index">
          <div class="title border-1px">
            <div class="left">
              <i class="iconfont iconzuobiao"></i>
              <span>{{item.scanInfo.customerName?item.scanInfo.customerName:item.scanInfo.scanAreaFullName}}</span>
            </div>
            <div class="right">{{item.scanInfo.scanTime}}</div>
          </div>
          <div class="content" @click="itemClick(item)">
            <p class="name">{{item.productInfo.productName}}</p>
            <p class="code">追溯码：{{item.scanInfo.epc}}</p>
            <i class="iconfont iconjiantou"></i>
          </div>
        </li>
      </ul>
    </cube-scroll>
  </div>
</template>
<script>
export default {
  name: "scan-list",
  data() {
    return {
      data: [],
      total: 0,
      options: {
        pullUpLoad: true,
        probeType: 3
      },
      params: {
        createrCode: this.GLOBAL.userInfo.userCode,
        createrUserTypeList: [
          { createrUserType:351001 },
          { createrUserType:351002}
        ],
        page: 1,
        pageSize: 10
      },
      scrollY: 0
    };
  },
  created() {
    this.getData();
  },
  activated() {
    this.$refs.scanListScroll.scrollTo(0,this.scrollY, 0)
  },
  methods: {
    getData() {
      this.$methods.http('wx/scan/scan/record/list', this.params)
      .then(res=>{
        this.data = this.data.concat(res.dataList)
        this.total = res.total
      })
    },
    onPullingUp() {
      if(this.data.length>=this.total) {
        this.$refs.scanListScroll.forceUpdate()
        return
      }
      this.params.page++
      this.getData()
    },
    itemClick(item) {
      this.$router.push({path: "/scanResult", query: {id: item.scanInfo.scanId}});
    },
    scroll(obj) {
      this.scrollY = obj.y
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../../assets/css/index.styl';

.scan-list {
  height: 100%;
  padding: convert(8) convert(8) 0;
  background-color: #f4f6f8;

  .list {
    .item {
      margin-bottom: convert(5);
      border-radius: 4px;
      background-color: #ffffff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

      .title {
        height: convert(33);
        display: flex;
        align-items: center;
        position: relative;
        border-1px(#EBEBEB, border-bottom);
        line-height: 1.2;

        &:before {
          content: '';
          display: block;
          width: convert(4);
          height: convert(23);
          background-color: #28BF62;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }

        .left {
          width: 60%;
          padding-left: convert(16);
          padding-right: convert(10);
          display: flex;
          align-items: center;

          i {
            color: #707070;
            font-size: convert(11);
            margin-right: convert(7);
          }

          span {
            color: #707070;
            font-size: convert(14);
            text-overflow-e();
          }
        }

        .right {
          width: 40%;
          text-align: right;
          color: #AFAFAF;
          font-size: convert(12);
          padding: 0 convert(10);
        }
      }

      .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: convert(74);
        padding: 0 convert(16);
        position: relative;
        line-height: 1.2;

        .name {
          color: #414141;
          font-size: convert(16);
          text-overflow-e();
        }

        .code {
          color: #A3A3A3;
          font-size: convert(12);
          margin-top: convert(10);
        }

        i {
          position: absolute;
          top: 50%;
          right: convert(26);
          transform: translateY(-50%);
          font-size: convert(10);
          color: #707070;
        }
      }
    }
  }
}
</style>
