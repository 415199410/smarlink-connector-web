<template>
  <div class="wrap">
    <ul class="form">
      <li class="item">
        <div class="left">姓名：</div>
        <dic class="right">{{data.userName}}</dic>
      </li>
      <li class="item">
        <div class="left">门店：</div>
        <div class="right">{{data.customerName?data.customerName:data.areaFullName}}</div>
      </li>
      <li class="item">
        <div class="left">联系方式：</div>
        <div class="right">{{data.contactTel}}</div>
      </li>
      <li class="item">
        <div class="left">处理结果：</div>
        <div class="right" :style="{color: data.dealSts==108020?'#28BF62':'#4D4C4E'}">{{data.dealStsName}}</div>
      </li>
    </ul>
    <div class="text-wrap">
      <div class="title">反馈意见：</div>
      <div
        class="text"
      >{{data.advice}}</div>
      <div class="img-wrap">
        <img :src="img" v-for="(img, index) in imgs" :key="img" @click="handleImgsClick(index)" />
      </div>
    </div>
    <div class="text-wrap">
      <div class="title">处理意见：</div>
      <div
        class="text"
      >{{data.remark}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "feedback-detail",
  data() {
    return {
      imgs: [],
      imgIndex: 0,
      data: {},
      reader: new FileReader()
    };
  },
  created() {
    if (typeof this.$route.query.id === "undefined") {
      this.$router.go(-1);
    }
    this.getData();
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/feedbackList") {
      // 设置下一个路由的 meta
      to.meta.keepAlive = true; // C 跳转到 A 时让 A 不缓存，即刷新
    }
    next();
  },
  methods: {
    getData() {
      this.$methods
        .http("wx/submit/submit/feedback/getById", {
          feedbackId: this.$route.query.id
        })
        .then(res => {
          res.attachList.forEach(item => {
            this.getImages(item.attachId);
          });
          this.data = res;
        });
    },
    getImages(id) {
      let formData = new FormData();
      formData.append("reqParam", JSON.stringify({ attachId: id }));
      this.$http({
        url: this.GLOBAL.API + "wx/download/sys/attach",
        method: "post",
        responseType: "blob",
        data: formData
      }).then(res => {
        this.reader.readAsDataURL(res.data);
        this.reader.onload = e => {
          this.imgs.push(e.target.result);
        };
      });
    },
    handleImgsClick(index) {
      this.imgIndex = index;
      const params = {
        $props: {
          imgs: this.imgs,
          initialIndex: "imgIndex", // 响应式数据的key名
          loop: false
        },
        $events: {
          change: i => {
            // 必须更新 initialIndex

            this.imgIndex = i;
          }
        }
      };
      this.$createImagePreview({ ...params }).show();
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../../assets/css/convert.styl';

.wrap {
  width: 100%;
  height: 100%;
  font-size: convert(14);
  color: #4D4C4E;
  overflow: auto;

  .form {
    border-bottom: convert(5) solid #F4F6F8;
    padding: 0 convert(25);

    .item {
      min-height: convert(50);
      display: flex;
      align-items: center;
      border-bottom: 1px solid #EAEAEA;
      padding: 10px 0;
      line-height: 1.5;

      .left {
        width: 25%;
      }

      .right {
        flex: 1;
      }
    }
  }

  .text-wrap {
    border-bottom: convert(5) solid #F4F6F8;
    padding: 0 convert(25);
    line-height: 1.5;
    padding-bottom: 15px;

    &:last-child {
      border: none;
    }

    .title {
      padding: convert(15) 0 convert(12);
    }

    .text {
      // text-indent: 2em;
      color: #707070;
    }

    .img-wrap {
      img {
        width: 23%;
        margin: 0 2% 10px 0;

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
