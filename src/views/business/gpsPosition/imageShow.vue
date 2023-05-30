<template>
  <div class="wrap">
    <div class="header">
      <label>
        <span class="headerApp">数据展示</span>
      </label>
    </div>
    <div class="content">
      <form>
        <div class="content-top">
          <div class="labelcont">
            <label>
              <span>合同号：</span>
            </label>
            <label>
              <input placeholder="采购合同号" readonly v-model="orderCode" />
            </label>
          </div>
          <div class="labelcont" >
            <label><span>工厂：&#12288;</span></label>
            <label>
              <input placeholder="工厂" readonly v-model="vendor" />
            </label>
          </div>
          <div class="labelcont" >
            <label><span>货品：&#12288;</span></label>
            <label>
              <input placeholder="货品" readonly v-model="itemCode" />
            </label>
          </div>
        </div>
        <div class="content-middle" style="height: 14rem;
	                    overflow-y: scroll;
	                    border-left: 1px solid #f2f2f2;">
          <div class="labeladvice">
            <label>
              <span>相关图片</span>
            </label>
          </div>
          <div class="img-upload">
            <div class="upload"  v-for="(item, index) in imgListJson" :key="index">
              <div class="img-show">
                <img v-lazy="item.url"
                     :preview-src-list="imgList"
                     style="height: 63px;width: 63px;margin-left: 3px;"/>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import IndexList from "@/components/index-list/index-list";
import ImgUpload from "@/components/img-upload/img-upload";
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: ' ',
  loading: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.huabanimg.com%2F12caf1d14d5fcd195debb43c6101204ffa93c0935cfe6-4k47Xp_fw658&refer=http%3A%2F%2Fhbimg.huabanimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1661158848&t=2c668392a4e491ccc89e3a2cd5acccb9',
  attempt: 1,
  //listenEvents: ['scroll']
})
export default {
  data() {
    return {
      orderCode:" ",
      vendor:" ",
      itemCode:" ",
      imgList:[],
      imgListJson:[]
    };
  },
  created() {
    this.initWxConfig();
  },
  //离开路由之前执行的函数,可用于页面的反向传值，页面跳转
  beforeRouteLeave(to, from, next) {
    if (to.path === "/imageShow") {
      // 设置下一个路由的 meta
      to.meta.keepAlive = false; // C 跳转到 A 时让 A 不缓存，即刷新
    }
    next();
  },
  methods: {
    //初始化加载
    initWxConfig() {
      let row =this.$route.query;
      let loading = this.$loading({
        lock: true,
        text: '图片加载中,请稍等.....',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.orderCode = row.orderCode;
      this.itemCode = row.itemName;
      this.vendor =  row.sampleName;
      this.itemCode =row.itemName;
      let insId = row.insId;
      this.$methods.http("sys/sys/image/searchImage",{insId: insId})
        .then(res => {
          //整理图片样式
          let imageAdd =[];
          for(let y=0;y<res.length;y++){
            imageAdd.push(res[y].url);
          }
          if(imageAdd.length) {
            this.imgList = this.imgList.concat(imageAdd)
            this.imgListJson = this.imgListJson.concat(res);
            loading.close();
          }else{
            this.$createToast({txt: "未上传相关产品的图片！", type: "txt"}).show();
            loading.close();
          }

        });
    }
  },
  components: {
    ImgUpload,
    IndexList
  }
};
</script>
<style lang="stylus" scoped>
@import '../../../assets/css/convert.styl';

.wrap {
  width: 100%;
  height: 100%;
  overflow: auto;
  .header {
    flex: none;
    height: 5%; //convert(40)
    text-align: center;
    background-size: 100% 100%;
    padding-top: convert(10);
    background:#F0F0F0
    .headerApp {
      font-size: 13px
    }
  }
  .content {
    padding-bottom: convert(55);
    background-color: #F0F0F0;
    height:95%;
    .content-top {
      background-color: #fff;
      .labelcont {
        width: 90%;
        height: convert(62);
        line-height: convert(62);
        border-bottom: 1px solid #d7dce5;
        border-collapse: collapse;
        font-size: convert(14);
        margin-left: convert(20);
        display: flex;
        position: relative;
        label {
          color: #4D4C4E;
          span {
            // color: red;
          }
        }
        input {
          border: 0;
          outline: none;
          margin-left: convert(58);
          flex: 1;
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
        input {
          margin-left: convert(44);
        }
      }
    }
    .content-middle {
      bottom: 0;
      left: 0;
      margin-top: convert(5);
      width: 100%;
      z-index: 1;
      background-color: #fff;
      height :30%;
      .img-ipload-wrap {
        padding: 20px convert(25);
      }

      .labeladvice {
        width: 90%;
        line-height: convert(41);
        font-size: convert(14);
        margin-left: convert(25);
        label {
          color: #4D4C4E;
          span {
            //   color: red;
          }
        }
      }
    }
    .img-upload {
      display: flex;
      flex-wrap: wrap;
      .upload {
        width: 23%;
        height: 0;
        padding-bottom: 23%;
        margin-right: 2%;
        margin-bottom: convert(10);
        position: relative;

        &:nth-child(4n) {
          margin-right: 0;
        }

        .normal {
          width: 100%;
          height: 100%;
          border: 1px solid #EAEAEA;
          background-color: #F7F7F7;
          display: inline-flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 0;
          left: 0;

          input {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 10;
            opacity: 0;
          }

          i {
            font-size: 15px;
            color: #EAEAEA;
          }

          span {
            margin-top: convert(8);
            font-size: convert(12);
            color: #E0E0E0;
          }
        }

        .img-show {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;

          img {
            width: 100%;
            height: 100%;
          }

          i {
            width: 10px;
            height: 10px;
            color: #FF3F1C;
            position: absolute;
            top: -5px;
            right: 2px;
            text-align: center;
            line-height: 10px;
            z-index: 2;
          }
        }
      }
    }
  }
}
</style>
