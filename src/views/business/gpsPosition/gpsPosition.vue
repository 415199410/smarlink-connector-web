<template>
  <div class="wrap">
    <div class="header">
      <label>
        <span class="headerApp">货品拍照</span>
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
        <div>
          <div class="content-middle">
            <div class="labeladvice">
              <label>
                <span>图片</span>
              </label>
            </div>
            <div class="img-ipload-wrap">
              <img-upload  ref="image"></img-upload>
            </div>
          </div>
          <!--<div class="content-middle" style="height: 260px;
	                    overflow-y: scroll;
	                    border-left: 1px solid #f2f2f2;">
            <div class="labeladvice">
               <label>
                 <span>已上传</span>
               </label>
             </div>
             <div class="img-upload">
               <div class="upload"  v-for="(item, index) in imgListJson" :key="index">
                 <div class="img-show">
                   <el-image :src="item.url"
                             :preview-src-list="imgList"
                             style="height: 63px;width: 63px;margin-left: 3px;"></el-image>
                   <i @click="delItem(item,index)" class="iconfont iconxxx-"></i>
                 </div>
               </div>
             </div>
           </div> -->
          <div class="add" @click="submitCheck" v-show="shopShow">保存</div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
    import IndexList from "@/components/index-list/index-list";
    import ImgUpload from "@/components/img-upload/img-upload";
    export default {
        data() {
            return {
                currentCustom: {},
                orderCode:" ",
                vendor:" ",
                itemCode:" ",
                shopShow:true,
                type:" ",
                insId:" ",
                imgList: [],
                imgListJson:[],
                params: {
                    productName: "",
                    customerCode: "",
                    salePrice: "",
                    ratioCode: "",
                    positionDesc: "",
                    shelfDesc: ""
                },
                ajaxFlag: false
            };
        },
        created() {
            this.initWxConfig();
        },
        //离开路由之前执行的函数,可用于页面的反向传值，页面跳转
        beforeRouteLeave(to, from, next) {
            if (to.path === "/coverageList") {
                // 设置下一个路由的 meta
                to.meta.keepAlive = false; // C 跳转到 A 时让 A 不缓存，即刷新
            }
            next();
        },
        methods: {
            //初始化加载
            initWxConfig() {
                let row =this.$route.query;
                this.orderCode = row.orderCode;
                this.vendor =  row.sampleName;
                this.insId = row.insId;
                this.itemCode =row.itemName;
            },
            //提交上传的图片事件
            submitCheck() {
                let imageList = this.$refs.image.getList();
                let arr1 = imageList.filter(item => { return item.edit;});
                if (arr1.length <= 0) {this.$createToast({txt: "图片不能为空", type: "txt"}).show();return;}
                this.submitAjax(arr1);
            },
            //图片附件上传功能实现
            submitAjax(arr1) {
                let row =this.$route.query;
                let orderCode = row.orderCode;
                let sampleName = row.sampleName;
                let itemCode = row.itemCode;
                let insId = row.insId;
                //唛头图片
                let formData = new FormData();
                arr1.forEach((item, index) => {
                    formData.append("shelfAttachFile" + index , item.file);
                    formData.append("url" , item.url);
                });
                formData.append("orderCode" , JSON.stringify(orderCode));
                formData.append("sampleName" , JSON.stringify(sampleName));
                formData.append("itemCode" , JSON.stringify(itemCode));
                formData.append("conID" , JSON.stringify(insId));
                const toast = this.$createToast({
                    txt: "Loading...",
                    mask: true,
                    time: 0
                });
                toast.show();
                this.$http({
                    url: this.GLOBAL.API + "wx/sys/sys/dict/imageSave",
                    method: "post",
                    data: formData
                }).then(res => {
                    toast.hide();
                    this.$createToast({txt: "提交成功", type: "txt"}).show();
                    window.location.reload();
                }).catch(err => {
                    toast.hide();
                });
            },
            //调用验货报告界面
            /*submitCheckNext(){
              let row =this.$route.query;
              let orderCode = row.orderCode;
              let sampleName = row.sampleName;
              let itemCode = row.itemCode;
              let ourMerchName = row.ourMerchName;
              let itemJson = row.itemJson;
              let idList = row.idList;
              this.$router.push({path: 'coverageDetail', query: {insId:" ",orderCode:orderCode,
                  sampleName:sampleName,itemCode:itemCode,ourMerchName:ourMerchName,itemJson:itemJson,idList:idList}})
              return;
            },*/
            delItem(item,index) {
                //移除逻辑
                let id = item.id;
                let row =this.$route.query;
                this.$methods.http("sys/sys/image/delateImage",
                    {id:id}).then(res => {
                    if(res =='200') {
                        this.$createToast({txt: "已删除！", type: "txt"}).show();
                        this.imgListJson.splice(index, 1);
                    }
                });
            },
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
          textarea {
            width: convert(325);
            height: convert(102);
            border-color: #EAEAEA;
            outline: none;
            resize: none;
            display: block;
          }
        }

        .labeItem{
          width: 90%;
          line-height: convert(41);
          font-size: convert(14);
          margin-left: convert(30);
          font-size:12px;
        }
        .shelf {
          width: 100%;
          height: convert(103);
          z-index: 1;
        }
      }
      #sizeId1{
        font-size:12px;
        font-weight:bold;
      }
      #sizeId2{
        font-size:12px;
        font-weight:bold;
      }
      #sizeId3{
        font-size:12px;
        font-weight:bold;
      }
      #sizeId4{
        font-size:12px;
        font-weight:bold;
      }
      #sizeId5  {
        font-size:12px;
        font-weight:bold;
      }
      #sizeId6  {
        font-size:12px;
        font-weight:bold;
      }
      #sizeId7  {
        font-size:12px;
        font-weight:bold;
      }
      .cube-input {
        width: 60%; //89%
        height: convert(29);
        outline:none;
      }
      .form_select {
        /* 清除默认边框 */
        border: 0;
        /* 清除默认的箭头样式 */
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background-size: 12px;
        width :200px;
        margin-left: convert(58);
      }
      .add {
        background-color: #28BF62;
        //width: convert(359);
        height: convert(50);
        width: convert(359);
        line-height: convert(50);
        text-align: center;
        border: 0;
        font-size: convert(16);
        color: #fff;
        margin-top: convert(12);
        bottom: convert(33);
        margin-left: convert(8);
        border-radius: convert(2);
      }
      .addNext {
        background-color: #28BF62;
        //width: convert(359);
        height: convert(50);
        width: convert(150);
        line-height: convert(50);
        text-align: center;
        border: 0;
        font-size: convert(16);
        color: #fff;
        margin-top: convert(12);
        bottom: convert(33);
        margin-left: convert(25);
        border-radius: convert(2);
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
              right: 7px;
              text-align: center;
              line-height: 10px;
              z-index: 2;
            }
          }
        }
      }
      .addLast {
        background-color: #28BF62;
        //width: convert(359);
        height: convert(50);
        width: convert(150);
        line-height: convert(50);
        text-align: center;
        border: 0;
        font-size: convert(16);
        color: #fff;
        margin-top: convert(12);
        bottom: convert(33);
        margin-left: convert(24);
        border-radius: convert(2);
      }
    }
  }
</style>
