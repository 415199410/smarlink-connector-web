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
          <div class="content-middle" >
            <div class="labeladvice">
              <label>
                <span style="color: red">大货堆放图【手机】(必填项)</span>
              </label>
            </div>
            <div class="img-ipload-wrap">
              <div style = "width:100%;text-align:center;">
                <el-button size="small" type="primary" @click="addDomainDh()">点击上传(多选)</el-button>
              </div>
              <div> &nbsp;  </div>
              <div> &nbsp;  </div>
              <div style="text-align:center;">
                <el-row>
                  <el-col :span="6" v-for="(item, index) in fileListDh" :key="index" :offset="1" >
                    <div style="margin-top:15px">
                      <el-image :src="item.baseStr" fit="contain"  lazy
                                style="height: 100px;width: 100px;margin-left: 2px;border: 1px dashed #e9e9e9;"></el-image>
                      <!-- <i @click="delItems(item,index)" class="iconfont iconxxx-"></i> -->
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div class="content-middle" >
            <div class="labeladvice">
              <label>
                <span style="color: red">抽箱图【手机】(必填项)</span>
              </label>
            </div>
            <div class="img-ipload-wrap">
              <div style = "width:100%;text-align:center;">
                <el-button size="small" type="primary" @click="addDomainCx()">点击上传(多选)</el-button>
              </div>
              <div> &nbsp;  </div>
              <div> &nbsp;  </div>
              <div style="text-align:center;">
                <el-row>
                  <el-col :span="6" v-for="(item, index) in fileListCx" :key="index" :offset="1" >
                    <div style="margin-top:15px">
                      <el-image :src="item.baseStr" fit="contain"  lazy
                                style="height: 100px;width: 100px;margin-left: 2px;border: 1px dashed #e9e9e9;"></el-image>
                      <!-- <i @click="delItems(item,index)" class="iconfont iconxxx-"></i> -->
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div class="content-middle" >
            <div class="labeladvice">
              <label>
                <span style="color: red">样品对照图片及批量对比正面【手机】(必填项)</span>
              </label>
            </div>
            <div class="img-ipload-wrap">
              <div style = "width:100%;text-align:center;">
                <el-button size="small" type="primary" @click="addDomainZm()">点击上传(多选)</el-button>
              </div>
              <div> &nbsp;  </div>
              <div> &nbsp;  </div>
              <div style="text-align:center;">
                <el-row>
                  <el-col :span="6" v-for="(item, index) in fileListZm" :key="index" :offset="1" >
                    <div style="margin-top:15px">
                      <el-image :src="item.baseStr" fit="contain"  lazy
                                style="height: 100px;width: 100px;margin-left: 2px;border: 1px dashed #e9e9e9;"></el-image>
                      <!-- <i @click="delItems(item,index)" class="iconfont iconxxx-"></i> -->
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div class="content-middle" >
            <div class="labeladvice">
              <label>
                <span style="color: red">样品对照图片及批量对比反面【手机】(必填项)</span>
              </label>
            </div>
            <div class="img-ipload-wrap">
              <div style = "width:100%;text-align:center;">
                <el-button size="small" type="primary" @click="addDomainFm()">点击上传(多选)</el-button>
              </div>
              <div> &nbsp;  </div>
              <div> &nbsp;  </div>
              <div style="text-align:center;">
                <el-row>
                  <el-col :span="6" v-for="(item, index) in fileListFm" :key="index" :offset="1" >
                    <div style="margin-top:15px">
                      <el-image :src="item.baseStr" fit="contain"  lazy
                                style="height: 100px;width: 100px;margin-left: 2px;border: 1px dashed #e9e9e9;"></el-image>
                      <!-- <i @click="delItems(item,index)" class="iconfont iconxxx-"></i> -->
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div class="content-middle" >
            <div class="labeladvice">
              <label>
                <span style="color: red">产品抽检堆放图【手机】(必填项)</span>
              </label>
            </div>
            <div class="img-ipload-wrap">
              <div style = "width:100%;text-align:center;">
                <el-button size="small" type="primary" @click="addDomainCp()">点击上传(多选)</el-button>
              </div>
              <div> &nbsp;  </div>
              <div> &nbsp;  </div>
              <div style="text-align:center;">
                <el-row>
                  <el-col :span="6" v-for="(item, index) in fileListCp" :key="index" :offset="1" >
                    <div style="margin-top:15px">
                      <el-image :src="item.baseStr" fit="contain"  lazy
                                style="height: 100px;width: 100px;margin-left: 2px;border: 1px dashed #e9e9e9;"></el-image>
                      <!-- <i @click="delItems(item,index)" class="iconfont iconxxx-"></i> -->
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div class="content-middle" >
            <div class="labeladvice">
              <label>
                <span style="color: red">其他图片【手机】</span>
              </label>
            </div>
            <div class="img-ipload-wrap">
              <div style = "width:100%;text-align:center;">
                <el-button size="small" type="primary" @click="addDomain()">点击上传(多选)</el-button>
              </div>
              <div> &nbsp;  </div>
              <div> &nbsp;  </div>
              <div style="text-align:center;">
                <el-row>
                  <el-col :span="6" v-for="(item, index) in fileList" :key="index" :offset="1" >
                    <div style="margin-top:15px">
                      <el-image :src="item.baseStr" fit="contain"  lazy
                                style="height: 100px;width: 100px;margin-left: 2px;border: 1px dashed #e9e9e9;"></el-image>
                      <!-- <i @click="delItems(item,index)" class="iconfont iconxxx-"></i> -->
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div class="content-middle" >
            <div class="labeladvice">
              <label>
                <span style="color: red">大货堆放图【IPAD】（必填项）</span>
              </label>
            </div>
            <div class="img-ipload-wrap">
              <img-upload  ref="imageAddDh"></img-upload>
            </div>
          </div>
          <div class="content-middle" >
            <div class="labeladvice">
              <label>
                <span style="color: red">抽箱图【IPAD】（必填项）</span>
              </label>
            </div>
            <div class="img-ipload-wrap">
              <img-upload  ref="imageAddCx"></img-upload>
            </div>
          </div>
          <div class="content-middle" >
            <div class="labeladvice">
              <label>
                <span style="color: red">样品对照图片及批量对比正面【IPAD】（必填项）</span>
              </label>
            </div>
            <div class="img-ipload-wrap">
              <img-upload  ref="imageAddZm"></img-upload>
            </div>
          </div>
          <div class="content-middle" >
            <div class="labeladvice">
              <label>
                <span style="color: red">样品对照图片及批量对比反面【IPAD】（必填项）</span>
              </label>
            </div>
            <div class="img-ipload-wrap">
              <img-upload  ref="imageAddFm"></img-upload>
            </div>
          </div>
          <div class="content-middle" >
            <div class="labeladvice">
              <label>
                <span style="color: red">产品抽检堆放图片【IPAD】（必填项）</span>
              </label>
            </div>
            <div class="img-ipload-wrap">
              <img-upload  ref="imageAddCp"></img-upload>
            </div>
          </div>
          <div class="content-middle" >
            <div class="labeladvice">
              <label>
                <span style="color: red">其他【IPAD】（限制30张）</span>
              </label>
            </div>
            <div class="img-ipload-wrap">
              <img-upload  ref="imageAdd"></img-upload>
            </div>
          </div>
          <div class="content-middle" style="height: 160px;
	                    overflow-y: scroll;
	                    border-left: 1px solid #f2f2f2;">
            <div class="labeladvice">
              <label>
                <span>已上传（大货堆放图）</span>
              </label>
            </div>
            <div class="img-upload">
              <div class="upload"  v-for="(item, index) in imgListJsonDh" :key="index">
                <div class="img-show">
                  <img v-lazy="item.url"
                       :preview-src-list="imgListDh"
                       style="height: 63px;width: 63px;margin-left: 3px;"/>
                  <i @click="delItemA(item,index)" class="iconfont iconxxx-"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="content-middle" style="height: 160px;
	                    overflow-y: scroll;
	                    border-left: 1px solid #f2f2f2;">
            <div class="labeladvice">
              <label>
                <span>已上传（抽箱图片）</span>
              </label>
            </div>
            <div class="img-upload">
              <div class="upload"  v-for="(item, index) in imgListJsonCx" :key="index">
                <div class="img-show">
                  <img v-lazy="item.url"
                       :preview-src-list="imgListCx"
                       style="height: 63px;width: 63px;margin-left: 3px;"/>
                  <i @click="delItemB(item,index)" class="iconfont iconxxx-"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="content-middle" style="height: 160px;
	                    overflow-y: scroll;
	                    border-left: 1px solid #f2f2f2;">
            <div class="labeladvice">
              <label>
                <span>已上传（样品对照图片及批量对比正面）</span>
              </label>
            </div>
            <div class="img-upload">
              <div class="upload"  v-for="(item, index) in imgListJsonZm" :key="index">
                <div class="img-show">
                  <img v-lazy="item.url"
                       :preview-src-list="imgListZm"
                       style="height: 63px;width: 63px;margin-left: 3px;"/>
                  <i @click="delItemC(item,index)" class="iconfont iconxxx-"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="content-middle" style="height: 160px;
	                    overflow-y: scroll;
	                    border-left: 1px solid #f2f2f2;">
            <div class="labeladvice">
              <label>
                <span>已上传（样品对照图片及批量对比反面）</span>
              </label>
            </div>
            <div class="img-upload">
              <div class="upload"  v-for="(item, index) in imgListJsonFm" :key="index">
                <div class="img-show">
                  <img v-lazy="item.url"
                       :preview-src-list="imgListFm"
                       style="height: 63px;width: 63px;margin-left: 3px;"/>
                  <i @click="delItemD(item,index)" class="iconfont iconxxx-"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="content-middle" style="height: 160px;
	                    overflow-y: scroll;
	                    border-left: 1px solid #f2f2f2;">
            <div class="labeladvice">
              <label>
                <span>已上传（产品抽检堆放图片）</span>
              </label>
            </div>
            <div class="img-upload">
              <div class="upload"  v-for="(item, index) in imgListJsonCp" :key="index">
                <div class="img-show">
                  <img v-lazy="item.url"
                       :preview-src-list="imgListCp"
                       style="height: 63px;width: 63px;margin-left: 3px;"/>
                  <i @click="delItemE(item,index)" class="iconfont iconxxx-"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="content-middle" style="height: 160px;
	                    overflow-y: scroll;
	                    border-left: 1px solid #f2f2f2;">
            <div class="labeladvice">
              <label>
                <span>已上传（其他）</span>
              </label>
            </div>
            <div class="img-upload">
              <div class="upload"  v-for="(item, index) in imgListJson" :key="index">
                <div class="img-show">
                  <img v-lazy="item.url"
                       :preview-src-list="imgList"
                       style="height: 63px;width: 63px;margin-left: 3px;"/>
                  <i @click="delItem(item,index)" class="iconfont iconxxx-"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="add" @click="submitCheck" v-show="shopShow">确认上传（手机）</div>
          <div class="add" @click="submitCheckAdd">确认上传（IPAD）</div>
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
      currentCustom: {},
      orderCode:" ",
      vendor:" ",
      itemCode:" ",
      shopShow:true,
      type:" ",
      idList:[],
      imgList: [],
      imgListJson:[],
      imgListDh: [],
      imgListJsonDh:[],
      imgListCx: [],
      imgListJsonCx:[],
      imgListZm: [],
      imgListJsonZm:[],
      imgListFm: [],
      imgListJsonFm:[],
      imgListCp: [],
      imgListJsonCp:[],
      id:" ",
      fileList:[],
      fileListDh:[],
      fileListCx:[],
      fileListZm:[],
      fileListFm:[],
      fileListCp:[],
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
    if (to.path === "/coverageDetail") {
      // 设置下一个路由的 meta
      to.meta.keepAlive = false; // C 跳转到 A 时让 A 不缓存，即刷新
      to.query.id = this.id;
    }
    next();
  },
  methods: {
    delItems(item,index) {
      //移除逻辑
      for(var i = 0; i < this.fileList.length; i++){
        if(item.index == this.fileList[i].index){
          this.fileList.splice(i,1);
        }
      }
    },
    addDomain() {
      var that = this;
      this.$methods.http('/WW_verify_tf1aLBKuprz7w4aO.txt/getSignature', {
        url: window.location.href.split('#')[0]
      })
        .then(response => {
          wx.config({
            beta: true,
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: response.status.appId, // 必填，公众号的唯一标识 企业微信的corpID
            timestamp: response.status.timestamp, // 必填，生成签名的时间戳
            nonceStr: response.status.nonceStr, // 必填，生成签名的随机串
            signature: response.status.signature, // 必填，签名
            jsApiList: ['chooseImage','getLocalImgData'] // 必填，需要使用的JS接口列表
          });
          wx.ready(() => {
            wx.chooseImage({
              count: 9, // 默认9
              sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
              defaultCameraMode: "batch", //表示进入拍照界面的默认模式，目前有normal与batch两种选择，normal表示普通单拍模式，batch表示连拍模式，不传该参数则为normal模式。从3.0.26版本开始支持front和batch_front两种值，其中front表示默认为前置摄像头单拍模式，batch_front表示默认为前置摄像头连拍模式。（注：用户进入拍照界面仍然可自由切换两种模式）
              isSaveToAlbum: 1, //整型值，0表示拍照时不保存到系统相册，1表示自动保存，默认值是1
              success: function (res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，
                for (var i = 0; i < localIds.length; i++) {
                  var localId = localIds[i];
                  wx.getLocalImgData({
                    localId: localId.toString(),
                    success: function (res) {
                      var localData = res.localData;
                      var imageBase64 = '';
                      if (localData.indexOf('data:image') == 0) {
                        var timesm = parseInt(new Date().getTime() / 1000) + '';
                        //苹果的直接赋值，默认生成'data:image/jpeg;base64,'的头部拼接
                        imageBase64 = localData;
                        try{
                          that.fileList.push({
                            index: timesm,
                            baseStr: imageBase64,
                            type:' '
                          });
                        }catch(e){
                          alert(e);
                        }
                      } else {
                        //此处是安卓中的唯一得坑！在拼接前需要对localData进行换行符的全局替换
                        //此时一个正常的base64图片路径就完美生成赋值到img的src中了
                        imageBase64 = 'data:image/jpeg;base64,' + localData.replace(/\n/g, '');
                        that.fileList.push({
                          index: parseInt(new Date().getTime() / 1000) + '',
                          baseStr: imageBase64,
                          type:' '
                        });
                      }
                    }
                  })
                }
              }
            });
          })
          wx.error((err) => {
            console.log('失败')
            alert('失败');
          })
        })
    },
    addDomainDh() {
      var that = this;
      this.$methods.http('/WW_verify_tf1aLBKuprz7w4aO.txt/getSignature', {
        url: window.location.href.split('#')[0]
      })
        .then(response => {
          wx.config({
            beta: true,
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: response.status.appId, // 必填，公众号的唯一标识 企业微信的corpID
            timestamp: response.status.timestamp, // 必填，生成签名的时间戳
            nonceStr: response.status.nonceStr, // 必填，生成签名的随机串
            signature: response.status.signature, // 必填，签名
            jsApiList: ['chooseImage','getLocalImgData'] // 必填，需要使用的JS接口列表
          });
          wx.ready(() => {
            wx.chooseImage({
              count: 9, // 默认9
              sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
              defaultCameraMode: "batch", //表示进入拍照界面的默认模式，目前有normal与batch两种选择，normal表示普通单拍模式，batch表示连拍模式，不传该参数则为normal模式。从3.0.26版本开始支持front和batch_front两种值，其中front表示默认为前置摄像头单拍模式，batch_front表示默认为前置摄像头连拍模式。（注：用户进入拍照界面仍然可自由切换两种模式）
              isSaveToAlbum: 1, //整型值，0表示拍照时不保存到系统相册，1表示自动保存，默认值是1
              success: function (res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，
                console.log(23456,localIds);
                for (var i = 0; i < localIds.length; i++) {
                  var localId = localIds[i];
                  wx.getLocalImgData({
                    localId: localId.toString(),
                    success: function (res) {
                      var localData = res.localData;
                      var imageBase64 = '';
                      if (localData.indexOf('data:image') == 0) {
                        var timesm = parseInt(new Date().getTime() / 1000) + '';
                        //苹果的直接赋值，默认生成'data:image/jpeg;base64,'的头部拼接
                        imageBase64 = localData;
                        try{
                          that.fileListDh.push({
                            index: timesm,
                            baseStr: imageBase64,
                            type:'1'
                          });
                        }catch(e){
                          alert(e);
                        }
                      } else {
                        //此处是安卓中的唯一得坑！在拼接前需要对localData进行换行符的全局替换
                        //此时一个正常的base64图片路径就完美生成赋值到img的src中了
                        imageBase64 = 'data:image/jpeg;base64,' + localData.replace(/\n/g, '');
                        that.fileListDh.push({
                          index: parseInt(new Date().getTime() / 1000) + '',
                          baseStr: imageBase64,
                          type:'1'
                        });
                      }
                    }
                  })
                }
              }
            });
          })
          wx.error((err) => {
            console.log('失败')
            alert('失败');
          })
        })
    },
    addDomainCx() {
      var that = this;
      this.$methods.http('/WW_verify_tf1aLBKuprz7w4aO.txt/getSignature', {
        url: window.location.href.split('#')[0]
      })
        .then(response => {
          wx.config({
            beta: true,
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: response.status.appId, // 必填，公众号的唯一标识 企业微信的corpID
            timestamp: response.status.timestamp, // 必填，生成签名的时间戳
            nonceStr: response.status.nonceStr, // 必填，生成签名的随机串
            signature: response.status.signature, // 必填，签名
            jsApiList: ['chooseImage','getLocalImgData'] // 必填，需要使用的JS接口列表
          });
          wx.ready(() => {
            wx.chooseImage({
              count: 9, // 默认9
              sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
              defaultCameraMode: "batch", //表示进入拍照界面的默认模式，目前有normal与batch两种选择，normal表示普通单拍模式，batch表示连拍模式，不传该参数则为normal模式。从3.0.26版本开始支持front和batch_front两种值，其中front表示默认为前置摄像头单拍模式，batch_front表示默认为前置摄像头连拍模式。（注：用户进入拍照界面仍然可自由切换两种模式）
              isSaveToAlbum: 1, //整型值，0表示拍照时不保存到系统相册，1表示自动保存，默认值是1
              success: function (res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，
                console.log(23456,localIds);
                for (var i = 0; i < localIds.length; i++) {
                  var localId = localIds[i];
                  wx.getLocalImgData({
                    localId: localId.toString(),
                    success: function (res) {
                      var localData = res.localData;
                      var imageBase64 = '';
                      if (localData.indexOf('data:image') == 0) {
                        var timesm = parseInt(new Date().getTime() / 1000) + '';
                        //苹果的直接赋值，默认生成'data:image/jpeg;base64,'的头部拼接
                        imageBase64 = localData;
                        try{
                          that.fileListCx.push({
                            index: timesm,
                            baseStr: imageBase64,
                            type:'2'
                          });
                        }catch(e){
                          alert(e);
                        }
                      } else {
                        //此处是安卓中的唯一得坑！在拼接前需要对localData进行换行符的全局替换
                        //此时一个正常的base64图片路径就完美生成赋值到img的src中了
                        imageBase64 = 'data:image/jpeg;base64,' + localData.replace(/\n/g, '');
                        that.fileListCx.push({
                          index: parseInt(new Date().getTime() / 1000) + '',
                          baseStr: imageBase64,
                          type:'2'
                        });
                      }
                    }
                  })
                }
              }
            });
          })
          wx.error((err) => {
            console.log('失败')
            alert('失败');
          })
        })
    },
    addDomainZm() {
      var that = this;
      this.$methods.http('/WW_verify_tf1aLBKuprz7w4aO.txt/getSignature', {
        url: window.location.href.split('#')[0]
      })
        .then(response => {
          wx.config({
            beta: true,
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: response.status.appId, // 必填，公众号的唯一标识 企业微信的corpID
            timestamp: response.status.timestamp, // 必填，生成签名的时间戳
            nonceStr: response.status.nonceStr, // 必填，生成签名的随机串
            signature: response.status.signature, // 必填，签名
            jsApiList: ['chooseImage','getLocalImgData'] // 必填，需要使用的JS接口列表
          });
          wx.ready(() => {
            wx.chooseImage({
              count: 9, // 默认9
              sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
              defaultCameraMode: "batch", //表示进入拍照界面的默认模式，目前有normal与batch两种选择，normal表示普通单拍模式，batch表示连拍模式，不传该参数则为normal模式。从3.0.26版本开始支持front和batch_front两种值，其中front表示默认为前置摄像头单拍模式，batch_front表示默认为前置摄像头连拍模式。（注：用户进入拍照界面仍然可自由切换两种模式）
              isSaveToAlbum: 1, //整型值，0表示拍照时不保存到系统相册，1表示自动保存，默认值是1
              success: function (res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，
                console.log(23456,localIds);
                for (var i = 0; i < localIds.length; i++) {
                  var localId = localIds[i];
                  wx.getLocalImgData({
                    localId: localId.toString(),
                    success: function (res) {
                      var localData = res.localData;
                      var imageBase64 = '';
                      if (localData.indexOf('data:image') == 0) {
                        var timesm = parseInt(new Date().getTime() / 1000) + '';
                        //苹果的直接赋值，默认生成'data:image/jpeg;base64,'的头部拼接
                        imageBase64 = localData;
                        try{
                          that.fileListZm.push({
                            index: timesm,
                            baseStr: imageBase64,
                            type:'3'
                          });
                        }catch(e){
                          alert(e);
                        }
                      } else {
                        //此处是安卓中的唯一得坑！在拼接前需要对localData进行换行符的全局替换
                        //此时一个正常的base64图片路径就完美生成赋值到img的src中了
                        imageBase64 = 'data:image/jpeg;base64,' + localData.replace(/\n/g, '');
                        that.fileListZm.push({
                          index: parseInt(new Date().getTime() / 1000) + '',
                          baseStr: imageBase64,
                          type:'3'
                        });
                      }
                    }
                  })
                }
              }
            });
          })
          wx.error((err) => {
            console.log('失败')
            alert('失败');
          })
        })
    },
    addDomainFm() {
      var that = this;
      this.$methods.http('/WW_verify_tf1aLBKuprz7w4aO.txt/getSignature', {
        url: window.location.href.split('#')[0]
      })
        .then(response => {
          wx.config({
            beta: true,
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: response.status.appId, // 必填，公众号的唯一标识 企业微信的corpID
            timestamp: response.status.timestamp, // 必填，生成签名的时间戳
            nonceStr: response.status.nonceStr, // 必填，生成签名的随机串
            signature: response.status.signature, // 必填，签名
            jsApiList: ['chooseImage','getLocalImgData'] // 必填，需要使用的JS接口列表
          });
          wx.ready(() => {
            wx.chooseImage({
              count: 9, // 默认9
              sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
              defaultCameraMode: "batch", //表示进入拍照界面的默认模式，目前有normal与batch两种选择，normal表示普通单拍模式，batch表示连拍模式，不传该参数则为normal模式。从3.0.26版本开始支持front和batch_front两种值，其中front表示默认为前置摄像头单拍模式，batch_front表示默认为前置摄像头连拍模式。（注：用户进入拍照界面仍然可自由切换两种模式）
              isSaveToAlbum: 1, //整型值，0表示拍照时不保存到系统相册，1表示自动保存，默认值是1
              success: function (res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，
                console.log(23456,localIds);
                for (var i = 0; i < localIds.length; i++) {
                  var localId = localIds[i];
                  wx.getLocalImgData({
                    localId: localId.toString(),
                    success: function (res) {
                      var localData = res.localData;
                      var imageBase64 = '';
                      if (localData.indexOf('data:image') == 0) {
                        var timesm = parseInt(new Date().getTime() / 1000) + '';
                        //苹果的直接赋值，默认生成'data:image/jpeg;base64,'的头部拼接
                        imageBase64 = localData;
                        try{
                          that.fileListFm.push({
                            index: timesm,
                            baseStr: imageBase64,
                            type:'4'
                          });
                        }catch(e){
                          alert(e);
                        }
                      } else {
                        //此处是安卓中的唯一得坑！在拼接前需要对localData进行换行符的全局替换
                        //此时一个正常的base64图片路径就完美生成赋值到img的src中了
                        imageBase64 = 'data:image/jpeg;base64,' + localData.replace(/\n/g, '');
                        that.fileListFm.push({
                          index: parseInt(new Date().getTime() / 1000) + '',
                          baseStr: imageBase64,
                          type:'4'
                        });
                      }
                    }
                  })
                }
              }
            });
          })
          wx.error((err) => {
            console.log('失败')
            alert('失败');
          })
        })
    },
    addDomainCp() {
      var that = this;
      this.$methods.http('/WW_verify_tf1aLBKuprz7w4aO.txt/getSignature', {
        url: window.location.href.split('#')[0]
      })
        .then(response => {
          wx.config({
            beta: true,
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: response.status.appId, // 必填，公众号的唯一标识 企业微信的corpID
            timestamp: response.status.timestamp, // 必填，生成签名的时间戳
            nonceStr: response.status.nonceStr, // 必填，生成签名的随机串
            signature: response.status.signature, // 必填，签名
            jsApiList: ['chooseImage','getLocalImgData'] // 必填，需要使用的JS接口列表
          });
          wx.ready(() => {
            wx.chooseImage({
              count: 9, // 默认9
              sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
              defaultCameraMode: "batch", //表示进入拍照界面的默认模式，目前有normal与batch两种选择，normal表示普通单拍模式，batch表示连拍模式，不传该参数则为normal模式。从3.0.26版本开始支持front和batch_front两种值，其中front表示默认为前置摄像头单拍模式，batch_front表示默认为前置摄像头连拍模式。（注：用户进入拍照界面仍然可自由切换两种模式）
              isSaveToAlbum: 1, //整型值，0表示拍照时不保存到系统相册，1表示自动保存，默认值是1
              success: function (res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，
                console.log(23456,localIds);
                for (var i = 0; i < localIds.length; i++) {
                  var localId = localIds[i];
                  wx.getLocalImgData({
                    localId: localId.toString(),
                    success: function (res) {
                      var localData = res.localData;
                      var imageBase64 = '';
                      if (localData.indexOf('data:image') == 0) {
                        var timesm = parseInt(new Date().getTime() / 1000) + '';
                        //苹果的直接赋值，默认生成'data:image/jpeg;base64,'的头部拼接
                        imageBase64 = localData;
                        try{
                          that.fileListCp.push({
                            index: timesm,
                            baseStr: imageBase64,
                            type:'5'
                          });
                        }catch(e){
                          alert(e);
                        }
                      } else {
                        //此处是安卓中的唯一得坑！在拼接前需要对localData进行换行符的全局替换
                        //此时一个正常的base64图片路径就完美生成赋值到img的src中了
                        imageBase64 = 'data:image/jpeg;base64,' + localData.replace(/\n/g, '');
                        that.fileListCp.push({
                          index: parseInt(new Date().getTime() / 1000) + '',
                          baseStr: imageBase64,
                          type:'5'
                        });
                      }
                    }
                  })
                }
              }
            });
          })
          wx.error((err) => {
            console.log('失败')
            alert('失败');
          })
        })
    },
    //提交上传的图片事件
    submitCheckAdd() {
      let imageList = this.$refs.imageAdd.getList();
      let arr1 = imageList.filter(item => { return item.edit;});
      if (arr1.length <= 0) {this.$createToast({txt: "其他图片不能为空！", type: "txt"}).show();return;}

      let imageAddDh = this.$refs.imageAddDh.getList();//大货堆放
      let arr2 = imageAddDh.filter(item => { return item.edit;});
      if (arr2.length <= 0) {this.$createToast({txt: "大货堆放图片不能为空！", type: "txt"}).show();return;}

      let imageAddCx = this.$refs.imageAddCx.getList();//抽箱图片
      let arr3 = imageAddCx.filter(item => { return item.edit;});
      if (arr3.length <= 0) {this.$createToast({txt: "抽箱图片图片不能为空！", type: "txt"}).show();return;}

      let imageAddZm = this.$refs.imageAddZm.getList();//样品对照图片及批量对比正面
      let arr4 = imageAddZm.filter(item => { return item.edit;});
      if (arr4.length <= 0) {this.$createToast({txt: "样品对照图片及批量对比正面图片不能为空！", type: "txt"}).show();return;}

      let imageAddFm = this.$refs.imageAddFm.getList();//样品对照图片及批量对比反面
      let arr5 = imageAddFm.filter(item => { return item.edit;});
      if (arr5.length <= 0) {this.$createToast({txt: "样品对照图片及批量对比反面图片不能为空！", type: "txt"}).show();return;}

      let imageAddCp = this.$refs.imageAddCp.getList();//产品抽检堆放图片
      let arr6 = imageAddCp.filter(item => { return item.edit;});
      if (arr6.length <= 0) {this.$createToast({txt: "产品抽检堆放图片图片不能为空！", type: "txt"}).show();return;}

      this.submitAjaxAdd(arr1,arr2,arr3,arr4,arr5,arr6);
    },

    //初始化加载
    initWxConfig() {
      let loading;
      let row =this.$route.query;
      let type = row.type;
      //if(type =='edit'){
      ///loading = this.$loading({
      //  lock: true,
      //  text: '图片加载中,请稍等.....',
      //  spinner: 'el-icon-loading',
      //  background: 'rgba(0, 0, 0, 0.7)'
      //});
      // }
      this.orderCode = row.orderCode;
      this.itemCode = row.itemName;
      this.vendor =  row.sampleName;
      this.itemCode =row.itemName;
      this.idList = row.idList;
      let insId = row.insId;
      this.id = row.insId;
      this.$methods.http("sys/sys/image/searchImage",{insId: insId})
        .then(res => {
          //整理图片样式
          let imageAdd =[];
          let imageAddDh =[];
          let imageAddCx =[];
          let imageAddZm =[];
          let imageAddFm =[];
          let imageAddCp =[];
          for(let y=0;y<res.length;y++){
            let type = res[y].type;
            if(type =='1'){
              imageAddDh.push(res[y].url);
              this.imgListDh = this.imgListDh.concat(imageAddDh)
              this.imgListJsonDh = this.imgListJsonDh.concat(res[y]);
            }else if(type =='2'){
              imageAddCx.push(res[y].url);
              this.imgListCx = this.imgListCx.concat(imageAddCx)
              this.imgListJsonCx = this.imgListJsonCx.concat(res[y]);
            }else if(type =='3'){
              imageAddZm.push(res[y].url);
              this.imgListZm = this.imgListZm.concat(imageAddZm)
              this.imgListJsonZm = this.imgListJsonZm.concat(res[y]);
            }else if(type =='4'){
              imageAddFm.push(res[y].url);
              this.imgListFm = this.imgListFm.concat(imageAddFm)
              this.imgListJsonFm = this.imgListJsonFm.concat(res[y]);
            }else if(type =='5'){
              imageAddCp.push(res[y].url);
              this.imgListCp = this.imgListCp.concat(imageAddCp)
              this.imgListJsonCp = this.imgListJsonCp.concat(res[y]);
            }else{
              imageAdd.push(res[y].url);
              this.imgList = this.imgList.concat(imageAdd)
              this.imgListJson = this.imgListJson.concat(res[y]);
            }
          }

          // if(type =='edit'){
          //loading.close();
          //   }
        });
    },
    httpRequest(option) {
      this.getBase64(option.file).then(base64Str => {
        this.fileList.push({uid:option.file.uid,baseStr:base64Str});
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isJPEG = file.type === 'image/jpg';
      if (!isJPG && !isPNG && !isJPEG) {
        this.$message.error('上传图片只能是图片格式!');
        return false;
      }
      return true
    },
    handleRemove(file, fileList) {
      for(var i = 0; i < this.fileList.length; i++){
        if(file.uid == this.fileList[i].uid){
          this.fileList.splice(i,1);
        }
      }
    },
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function() {
          imgResult = reader.result;
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.onloadend = function() {
          resolve(imgResult);
        };
      });
    },
    //提交上传的图片事件
    submitCheck() {
      if(!this.fileList) {
        this.$message.error('请上传产品图片!');
        return;
      }
      if(!this.fileListDh) {
        this.$message.error('请上传大货堆放图!');
        return;
      }
      if(!this.fileListCx) {
        this.$message.error('请上传抽箱图片!');
        return;
      }
      if(!this.fileListZm) {
        this.$message.error('请上传样品对照图片及批量对比正面!');
        return;
      }
      if(!this.fileListFm) {
        this.$message.error('请上传样品对照图片及批量对比反面!');
        return;
      }
      if(!this.fileListCp) {
        this.$message.error('请上传产品抽检堆放图片!');
        return;
      }
      this.submitAjax(this.fileList,this.fileListDh,this.fileListCx,this.fileListZm,this.fileListFm,this.fileListCp);
    },
    //图片附件上传功能实现
    submitAjaxAdd(arr1,arr2,arr3,arr4,arr5,arr6) {
      //唛头图片
      let row =this.$route.query;
      console.log(row);
      let orderCode = row.orderCode;
      let sampleName = row.sampleName;
      let itemCode = row.itemName;
      let insId = row.insId;
      let imageList = [];
      let dhJson ={};
      let CxJson ={};
      let ZmJson ={};
      let FmJson ={};
      let CpJson ={};
      let OtJson ={};
      arr2.forEach((item, index) => {
        dhJson ={type:'1', url:item.url}
        imageList.push(dhJson);
      });
      arr3.forEach((item, index) => {
        CxJson ={type:'2', url:item.url}
        imageList.push(CxJson);
      });
      arr4.forEach((item, index) => {
        ZmJson ={type:'3', url:item.url}
        imageList.push(ZmJson);
      });
      arr5.forEach((item, index) => {
        FmJson ={type:'4', url:item.url}
        imageList.push(FmJson);
      });
      arr6.forEach((item, index) => {
        CpJson ={type:'5', url:item.url}
        imageList.push(CpJson);
      });
      let sizeNum =0;
      arr1.forEach((item, index) => {
        OtJson ={type:' ', url:item.url}
        //获取单张图片的大小KB
        //let imagebase = item.url;
        //let str =  imagebase.replace('data:image/png;base64,', '')
        //var equalIndex = str.indexOf('=');
        //if(str.indexOf('=')>0) {
        //    str = str.substring(0, equalIndex);
        //}
        //var strLength= str.length;
        //var fileLength=parseInt(strLength-(strLength/8)*2);
        //let size = (fileLength / 1024).toFixed(2);
        //var sizeStr = size + ""; //转成字符串
        //var index = sizeStr.indexOf("."); //获取小数点处的索引
        //var dou = sizeStr.substr(index + 1, 2) //获取小数点后两位的值
        //if (dou == "00") { //判断后两位是否为00，如果是则删除00
        //   size = sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
        //}
        //sizeNum = Number(sizeNum) +Number(size);
        imageList.push(OtJson);
      });
      const toast = this.$createToast({
        txt: "Loading...",
        mask: true,
        time: 0
      });
      toast.show();
      this.$methods.http("sys/sys/image/imageSave", {
        imageList: imageList,orderCode:orderCode,sampleName:sampleName,itemCode:itemCode,conID:insId
      }).then(res => {
        toast.hide();
        this.$createToast({txt: "提交成功", type: "txt"}).show();
        window.location.reload();
      }).catch(err => {
        toast.hide();
      });
    },
    //图片附件上传功能实现
    submitAjax(arr1,arr2,arr3,arr4,arr5,arr6) {
      let arrayList =[];
      let row =this.$route.query;
      let orderCode = row.orderCode;
      let sampleName = row.sampleName;
      let itemCode = row.itemName;
      let insId = row.insId;
      const toast = this.$createToast({
        txt: "Loading...",
        mask: true,
        time: 0
      });
      toast.show();
      this.$methods.http("sys/sys/image/imagePhoneSave", {
        url:arrayList,
        orderCode:orderCode,
        sampleName:sampleName,
        itemCode:itemCode,
        conID:insId,
        arr1:arr1,
        arr2:arr2,
        arr3:arr3,
        arr4:arr4,
        arr5:arr5,
        arr6:arr6
      }).then(res => {
        toast.hide();
        this.$createToast({txt: "提交成功", type: "txt"}).show();
        //改变当前地址中的参数
        const query=JSON.parse(JSON.stringify(this.$route.query))
        query.type='edit'
        this.$router.push({ path: this.$route.path, query })
        window.location.reload();
      }).catch(err => {
        toast.hide();
        this.$createToast({txt: "提交失败", type: "txt"}).show();
      });
    },
    //调用验货报告界面
    submitCheckNext(){
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
    },
    delItem(item,index) {
      //移除逻辑
      let id = item.id;
      let row =this.$route.query;
      let conID = this.id;
      this.$methods.http("sys/sys/image/delateImage",
        {id:id,conID:conID}).then(res => {
        if(res =='200') {
          this.$createToast({txt: "已删除！", type: "txt"}).show();
          this.imgListJson.splice(index, 1);
        }
      });
    },
    delItemA(item,index) {
      //移除逻辑
      let id = item.id;
      let row =this.$route.query;
      let conID = this.id;
      this.$methods.http("sys/sys/image/delateImage",
        {id:id,conID:conID}).then(res => {
        if(res =='200') {
          this.$createToast({txt: "已删除！", type: "txt"}).show();
          this.imgListJsonDh.splice(index, 1);
        }
      });
    },
    delItemB(item,index) {
      //移除逻辑
      let id = item.id;
      let row =this.$route.query;
      let conID = this.id;
      this.$methods.http("sys/sys/image/delateImage",
        {id:id,conID:conID}).then(res => {
        if(res =='200') {
          this.$createToast({txt: "已删除！", type: "txt"}).show();
          this.imgListJsonCx.splice(index, 1);
        }
      });
    },
    delItemC(item,index) {
      //移除逻辑
      let id = item.id;
      let row =this.$route.query;
      let conID = this.id;
      this.$methods.http("sys/sys/image/delateImage",
        {id:id,conID:conID}).then(res => {
        if(res =='200') {
          this.$createToast({txt: "已删除！", type: "txt"}).show();
          this.imgListJsonZm.splice(index, 1);
        }
      });
    },
    delItemD(item,index) {
      //移除逻辑
      let id = item.id;
      let row =this.$route.query;
      let conID = this.id;
      this.$methods.http("sys/sys/image/delateImage",
        {id:id,conID:conID}).then(res => {
        if(res =='200') {
          this.$createToast({txt: "已删除！", type: "txt"}).show();
          this.imgListJsonFm.splice(index, 1);
        }
      });
    },
    delItemE(item,index) {
      //移除逻辑
      let id = item.id;
      let row =this.$route.query;
      let conID = this.id;
      this.$methods.http("sys/sys/image/delateImage",
        {id:id,conID:conID}).then(res => {
        if(res =='200') {
          this.$createToast({txt: "已删除！", type: "txt"}).show();
          this.imgListJsonCp.splice(index, 1);
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
  .uploadVisit3>>>.el-upload--picture-card {
    height: 80px !important;
    line-height:8px !important;
    width: 80px;
    height: 40px;
    // width:50px;
  }
  .uploadVisit4>>>.el-icon-plus:before {
    content: "\A\E6D9\A上传图片" !important;
    font-size:15px !important;
    white-space:pre !important;
  }
  .el-upload--picture-card i{
    font-size:20px;
  }
  .uploadVisit5>>>.el-upload-list--picture-card .el-upload-list__item{
    width: 80px;
    height: 80px;
    line-height: 80px;
  }
  .uploadVisit6>>>.el-upload-list--picture-card .el-upload-list__item-thumbnail{
    width: 80px;
    height: 80px;
    line-height: 80px;
  }
  .uploadVisit7>>>.avatar{
    width: 50px;
    height: 50px;
  }
  .content {
    padding-bottom: convert(55);
    background-color: #F0F0F0;
    //height:95%;
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
        line-height: convert(20);
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
            right: 10x;
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
