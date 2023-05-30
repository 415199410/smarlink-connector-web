<template>
  <div class="wrap">
    <div id="mapContainer"></div>
    <div class="headerInfo">
      <div class="count"></div>
      <div class="desc"></div>
      <div class="text"></div>
    </div>
    <div class="content">
      <el-form ref="visitForm" :inline="true" :model="visitForm" label-width="90px" :rules="visitRules" size="small" label-position="right">
        <div class="content-top">
          <div class="labelcont">
            <el-form-item>
              <el-radio-group v-model="visitForm.visitType" @change="rdSign">
                <el-radio class="inputDeepx1" label="1">
										<span style="font-size:13px;color:black;">
											品控任务&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										</span>
                </el-radio>
                <el-radio class="inputDeepx1" label="3">
										<span style="font-size:13px;color:black;">
											跟单任务&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										</span>
                </el-radio>
                <el-radio class="inputDeepx1" label="2">
										<span style="font-size:13px;color:black;">
											其他
										</span>
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div class="labelcont">
            <el-form-item label-width="90px">
						<span slot="label">
							<span style="margin-left:10%;font-size:14px;color:black;">工厂</span>
						</span>
              <el-select
                v-model="visitForm.factoryCode"
                id="selectLabelId"
                ref='selectLable'
                filterable
                remote
                clearable
                reserve-keyword
                placeholder="选择工厂"
                :remote-method="remoteMethod"
                :loading="remoteLoading"
                @change="selectTask"
                @focus="cancalReadOnly"
                @blur="cancalReadOnly"
              >
                <el-option
                  v-for="item in vendorOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="labelcont">
            <el-form-item label-width="90px">
						<span slot="label">
							<span style="margin-left:10%;font-size:14px;color:black;">拜访人</span>
						</span>
              <el-input class = "inputvisit1" id = "userLabel" v-model="visitForm.userName" readonly/>
            </el-form-item>
          </div>
          <div class="labelcont">
            <el-form-item label-width="90px">
						<span slot="label">
							<span style="margin-left:10%;font-size:14px;color:black;">当前位置</span>
						</span>
              <el-input class = "inputvisit1" v-model="visitForm.locationCity" readonly/>
            </el-form-item>
          </div>
          <div class="labelcont">
            <el-form-item label-width="90px">
						<span slot="label">
							<span style="margin-left:10%;font-size:14px;color:black;">当前经纬度</span>
						</span>
              <el-input class = "inputvisit1" v-model="visitForm.lng" readonly/>
            </el-form-item>
          </div>
          <div class="labelcont">
            <el-form-item label-width="90px">
						<span slot="label">
							<span style="margin-left:10%;font-size:14px;color:black;">关联货号</span>
						</span>
              <el-input class = "inputvisit1" v-model="visitForm.linkItem"  readonly/>
            </el-form-item>
          </div>
          <div class="labelcont">
            <el-form-item label-width="90px" prop="memoRule">
              <span slot="label">
							<span style="margin-left:10%;font-size:14px;color:black;">备注</span>
						</span>
              <el-input class="inputDeepx2" v-model="visitForm.memo" type="textarea" autosize placeholder="请输入内容" />
            </el-form-item>
          </div>
        </div>
        <div style = "width:100%;text-align:center;">
          <el-button size="small" type="primary" @click="addDomain()">点击上传(多选)</el-button>
          <div> &nbsp;  </div>
          <div> &nbsp;  </div>

          <div style="text-align:center;">
            <el-row>
              <el-col :span="6" v-for="(item, index) in visitForm.fileList" :key="index" :offset="1" >
                <div style="margin-top:15px">
                  <el-image :src="item.baseStr" fit="contain"  lazy
                            style="height: 100px;width: 100px;margin-left: 2px;border: 1px dashed #e9e9e9;"></el-image>
                </div>
              </el-col>
            </el-row>
          </div>

        </div>
        <div v-if="!showClose" style="text-align: center;margin-top:5%;width: 90%;margin-left: 5%;">
          <el-button  type="primary" @click="submitVisit()">提交</el-button>
        </div>
        <div v-if="showClose" style="text-align: center;margin-top:5%;width: 90%;">
          <el-button  type="primary" @click="goBack()">关闭</el-button>
        </div>
      </el-form>
    </div>

    <div>
      <el-dialog :visible.sync="dialogVisible" fullscreen append-to-body>
        <div>
          <el-input
            clearable
            v-model="searchInfo"
            placeholder="根据合同号、货品名称搜索"
            style="width: 200px"
            maxlength="10"
            size="mini"
          />
        </div>
        <el-table
          :data="tableData.filter(data => !searchInfo || data.order.toLowerCase().includes(searchInfo.toLowerCase()) || data.cusItem.toLowerCase().includes(searchInfo.toLowerCase())|| data.item.toLowerCase().includes(searchInfo.toLowerCase()))"
          ref="multipleTable"
          height="500"
          stripe
          tooltip-effect="dark"
          style="width: 100%"
          :row-key="row => { return row.id }"
          @selection-change="handleSelectionChange">
          <el-table-column
            :reserve-selection="true"
            type="selection"
            width="55"
            fixed="left">
          </el-table-column>
          <el-table-column
            prop="order"
            label="采购合同号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="item"
            label="货品"
            width="150">
          </el-table-column>
          <el-table-column
            prop="cusItem"
            label="客户货号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="chinaDes"
            label="中文简描"
            width="150">
          </el-table-column>
          <el-table-column
            prop="orderNum"
            label="采购数量"
            width="120">
          </el-table-column>
          <el-table-column
            prop="taskNum"
            label="任务数量"
            width="120">
          </el-table-column>
          <el-table-column
            prop="lastTime"
            label="最晚交期"
            width="120">
          </el-table-column>
          <el-table-column
            prop="unit"
            label="单位"
            width="120">
          </el-table-column>
          <el-table-column
            prop="lineId"
            label="行id"
            width="120">
          </el-table-column>
        </el-table>
        <div slot="footer" style="text-align: center;margin-top:5%;width: 100%;">
          <el-button type="primary" @click="saveLink()">确定</el-button>
        </div>


      </el-dialog>

    </div>
  </div>
</template>
<script>
    import { wxCofigMixin } from "@/assets/js/mixin.js";
    let loading;
    export default {
        mixins: [wxCofigMixin],
        data() {
            return {
                inHidden:'',
                searchInfo:'',
                showClose:false,
                tableData:[],
                multipleSelection: [],
                vendorOptions: [], //
                remoteLoading: false,
                locationCity:"广东省阳江市阳东区",
                dialogVisible: false, // 弹框是否开启
                address: null,
                center: { lng: 112.06914436782431, lat: 21.937404302107034 },
                //地图展示级别
                zoom: 20,
                visitRules: {memoRule: [],},
                visitForm : {
                    memo:'',
                    visitType:'1',
                    factoryCode:'',
                    factoryName:'',
                    userCode:'123',
                    userName:'巨化',
                    locationCity:'',
                    lng:'',
                    geoType:'',
                    linkId:[],
                    userType:'跟单员',
                    fileList:[],
                    linkItem:''
                },
            };
        },
        mounted() {
            this.$nextTick(() => {
                this.getLocation();
                document.getElementById('userLabel').focus();
                document.getElementById('selectLabelId').focus();
                document.getElementById('userLabel').focus();
                document.getElementById('selectLabelId').focus()
            });
        },
        methods: {
            rdSign(){
                if(this.visitForm.visitType == 2) {
                    let meRule = {
                        required: true,
                        message: '必填项',
                        trigger: 'blur'
                    };
                    this.visitRules.memoRule.push(meRule);
                }
                else{
                    this.visitRules.memoRule = [];
                }

            },
            cancalReadOnly() {
                Array.from(document.getElementsByClassName('el-select')).forEach((item) => {
                    item.children[0].children[0].removeAttribute('readOnly');
                    item.children[0].children[0].onblur = function () {
                        let _this = this;
                        _this.removeAttribute('readOnly')
                    }
                })
            },
            delItem(item,index) {
                //移除逻辑
                for(var i = 0; i < this.visitForm.fileList.length; i++){
                    if(item.index == this.visitForm.fileList[i].index){
                        this.visitForm.fileList.splice(i,1);
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
                                                        that.visitForm.fileList.push({
                                                            index: timesm,
                                                            baseStr: imageBase64
                                                        });
                                                    }catch(e){
                                                        alert(e);
                                                    }
                                                } else {
                                                    //此处是安卓中的唯一得坑！在拼接前需要对localData进行换行符的全局替换
                                                    //此时一个正常的base64图片路径就完美生成赋值到img的src中了
                                                    imageBase64 = 'data:image/jpeg;base64,' + localData.replace(/\n/g, '');
                                                    that.visitForm.fileList.push({
                                                        index: parseInt(new Date().getTime() / 1000) + '',
                                                        baseStr: imageBase64
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
                console.log(213,this.visitForm.fileList);
            },
            goBack() {
                this.$router.back();
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isJPEG = file.type === 'image/jpg';
                if (!isJPG && !isPNG && !isJPEG) {
                    this.$message.error('上传头像图片只能是图片格式!');
                    return false;
                }
                return true
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
            submitVisit() {
                if(this.visitForm.visitType == 2 && (!this.visitForm.memo || this.visitForm.memo.length<1)) {
                    this.$message.error('请填写备注!');
                    return;
                }
                if(!this.visitForm.locationCity) {
                    this.$message.error('未获取定位信息!');
                    return;
                }
                if((this.visitForm.visitType == 1 || this.visitForm.visitType == '1') && (!this.visitForm.linkId || this.visitForm.linkId.length<1)) {
                    this.$message.error('未选择任务明细!');
                    return;
                }
                if(!this.visitForm.factoryCode) {
                    this.$message.error('未选择工厂!');
                    return;
                }
                if(!this.visitForm.fileList || this.visitForm.fileList.length<1) {
                    this.$message.error('请上传工厂图片!');
                    return;
                }
                this.visitForm.factoryName = this.$refs.selectLable.selected.label;
                loading = this.$loading({
                    lock: true,
                    text: 'Loading...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                let formInfo = {};
                for (let key in this.visitForm) {
                    formInfo[key] = this.visitForm[key];
                }
                this.$methods.http("wx/sys/sys/visit/visitSave", {
                    formInfo: formInfo,
                })
                    .then(res => {
                        loading.close();
                        if (res.status == 'success') {
                            this.$createToast({txt: "提交成功！", type: "txt"}).show();
                            this.showClose = true;
                        } else {
                            this.$createToast({txt: "提交失败！", type: "txt"}).show();
                        }
                    });
            },
            handleRemove(file, fileList) {
                for(var i = 0; i < this.visitForm.fileList.length; i++){
                    if(file.index == this.visitForm.fileList[i].index){
                        this.visitForm.fileList.splice(i,1);
                    }
                }
            },
            httpRequest(option) {
                this.getBase64(option.file).then(base64Str => {
                    this.visitForm.fileList.push({uid:option.file.uid,baseStr:base64Str});
                })
            },
            saveLink() {
                if(this.multipleSelection.length<1){
                    this.$message({
                        message: '请勾选明细行！',
                        type: 'warning',
                        center: true
                    });
                    return;
                }
                this.multipleSelection.forEach(row=>{
                        this.visitForm.linkId.push(row.lineId);
                        this.visitForm.linkItem = this.visitForm.linkItem + row.item + ',';
                    }
                )
                this.dialogVisible = false;
            },
            remoteMethod(query) {
                if (query !== '') {
                    this.remoteLoading = true;
                    this.remoteOptions = []
                    setTimeout(() => {
                        this.$methods.http("wx/sys/sys/visit/searchFactory", {
                            factoryName: query,
                        })
                            .then(res => {
                                this.remoteLoading = false
                                if (res.status == 'success') {
                                    this.vendorOptions = res.entity.map(item => {
                                        return { value: `${item[0]}`, label: `${item[1]}` };
                                    });
                                } else {
                                    this.$createToast({txt: "查询失败！", type: "txt"}).show();
                                }
                            });
                    }, 200);
                } else {
                    this.options = [];
                }
            },
            selectTask(value) {
                console.log(this.visitForm.visitType);
                console.log(!this.visitForm.factoryCode && (this.visitForm.visitType == 1 || this.visitForm.visitType == '1'));
                if(!this.visitForm.factoryCode) {return;}
                if(this.visitForm.visitType == 2 || this.visitForm.visitType == '2') {return;}
                this.tableData = [];
                this.dialogVisible = true;
                setTimeout(() => {
                    loading = this.$loading({
                        lock: true,
                        text: 'Loading...',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    this.$methods.http("wx/sys/sys/visit/searchTask", {
                        userCode: this.visitForm.userName,
                        vendorCode: this.visitForm.factoryCode,
                        role: this.GLOBAL.user.roleType,
                        visitType:this.visitForm.visitType,
                    })
                        .then(res => {
                            loading.close();
                            if (res.status == 'success') {
                                this.tableData = res.entity.map(item => {
                                    return { order: `${item[1]}`,
                                        item: `${item[2]}`,
                                        cusItem: `${item[3]}`,
                                        chinaDes: `${item[4]}`,
                                        orderNum: `${item[5]}`,
                                        taskNum: `${item[6]}`,
                                        lastTime: `${item[7]}`,
                                        unit: `${item[8]}`,
                                        lineId: `${item[0]}`,
                                    };
                                });
                            } else {
                                this.$createToast({txt: "查询失败！", type: "txt"}).show();
                            }
                        });
                }, 200);
            },
            getLocation() {
                var that = this;

                that.visitForm.userCode = this.GLOBAL.user.id;
                that.visitForm.userName = this.GLOBAL.user.userReal;
                that.visitForm.userType = this.GLOBAL.user.roleType;
                if (navigator.geolocation) { //用浏览器获取坐标地址
                    navigator.geolocation.getCurrentPosition(function (position) {
                        /*"经度"  position.coords.longitude; "纬度"  position.coords.latitude;"准确度" + position.coords.accuracy;
                        "海拔"  position.coords.altitude;"海拔准确度"  position.coords.altitudeAcuracy;"行进方向" + position.coords.heading;
                        "地面速度" + position.coords.speed;"请求的时间" + new Date(position.timestamp);*/
                        var pointArr= [];;
                        pointArr.push({lng:position.coords.longitude ,lat:position.coords.latitude});
                        new BMap.Convertor().translate(pointArr, 1, 5, function (item) {
                            that.center.lng = item.points[0].lng;
                            that.center.lat = item.points[0].lat;
                            var myGeo = new BMap.Geocoder();
                            // 根据坐标得到地址描述
                            myGeo.getLocation(new BMap.Point(item.points[0].lng, item.points[0].lat), function (result) {
                                if (result) {
                                    console.log(result);
                                    that.visitForm.locationCity = result.address;
                                    that.visitForm.lng = item.points[0].lng + ',' + item.points[0].lat;
                                    that.visitForm.geoType = 'GPS定位';
                                }
                            });
                        })
                    }, function (err) {
                        // code：返回获取位置的状态,0:不包括其他错误编号中的错误;1:用户拒绝浏览器获取位置信息;2:尝试获取用户信息，但失败了; 3:设置了timeout值，获取位置超时了
                        var map = new BMap.Map("mapContainer");
                        var point = new BMap.Point(116.331398,39.897445);
                        map.centerAndZoom(point,20);
                        var geolocation = new BMap.Geolocation();
                        geolocation.getCurrentPosition(function(r){
                            if(this.getStatus() == BMAP_STATUS_SUCCESS) {
                                var mk = new BMap.Marker(r.point);
                                map.addOverlay(mk);
                                map.panTo(r.point);
                                that.center.lng = r.point.lng;
                                that.center.lat = r.point.lat;
                                var myGeo = new BMap.Geocoder();
                                // 根据坐标得到地址描述
                                myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function (result) {
                                    if (result) {
                                        that.visitForm.locationCity = result.address;
                                        that.visitForm.lng = that.center.lng + ',' + that.center.lat;
                                        that.visitForm.geoType = 'IP定位';
                                    }
                                });
                            }
                            else {
                                that.visitForm.locationCity = '广东省阳江市阳东区';
                                that.visitForm.lng = '112.06914436782431,21.937404302107034';
                                that.visitForm.geoType = '虚拟定位';
                                this.$message({
                                    type: "warning",
                                    message: "请打开GPS，让您的定位更加准确！",
                                });
                            }
                        });
                    }, {
                        enableHighAcuracy: false, //位置是否精确获取
                        timeout: 5000, //获取位置允许的最长时间
                        maximumAge: 1000 //多久更新获取一次位置
                    });
                } else {
                    that.visitForm.locationCity = '广东省阳江市阳东区';
                    that.visitForm.lng = '112.06914436782431,21.937404302107034';
                    that.visitForm.geoType = '虚拟定位';
                    this.$message({
                        type: "warning",
                        message: "请打开GPS，让您的定位更加准确！",
                    });
                }
            },
            handler({BMap, map}) {
                //  this.center.lng = 116.404;
                //  this.center.lat = 39.915;
                // this.zoom = this.zoom;
            },
            getClickInfo(e) {
                // 创建地理编码实例
                const myGeo = new BMap.Geocoder();
                // 根据坐标逆解析地址
                myGeo.getLocation(new BMap.Point(e.point.lng, e.point.lat), (result) => {
                    if (result) {
                        this.address = result.address;
                    }
                });
                this.center.lng = e.point.lng;
                this.center.lat = e.point.lat;
            },
            syncCenterAndZoom(e) {
                const {lng, lat} = e.target.getCenter();
                this.zoom = e.target.getZoom();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        },
        components: {
        }
    };
</script>
<style lang="stylus" scoped>
  @import '../../../assets/css/convert.styl';
  .wrap {
    width: 100%;
    height: 100%;

    overflow: auto;
    .headerInfo {
      flex: none;
      height: convert(147);
      text-align: center;
      color: #fff;
      background: url('./1.jpg') no-repeat;
      background-size: 100% 100%;
      padding-top: convert(10);
      .count {
        font-size: convert(48);
        line-height: convert(64);
      }
      .desc {
        font-size: convert(17);
      }
      //设置文本样式
      .text {
        margin-top: convert(5);
        font-size: convert(12);
      }
    }
    .content {
      text-align: center;
      margin-left: -10%;
      .content-top {
        background-color: #fff;

        .labelcont {
          width: 90%;
          margin-left: 5%;
        }
        .inputDeepx1>>>.el-radio__input {
          width: 0px;
          margin-left: 60%;
        }
      }
    }
  }
  .BaiDuMap {
    width: 100%;
    height: 100%;
  }
  .inputvisit1>>>.el-input__inner {
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 1px;
  }
  .inputvisit2>>>.el-select__inner {
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 1px;
  }
  .uploadVisit3>>>.el-upload--picture-card {
    height: 100px !important;
    line-height:10px !important;
    width: 100px;
    height: 60px;
    // width:50px;
  }
  .uploadVisit4>>>.el-icon-plus:before {
    content: "\A\E6D9\A上传图片" !important;
    font-size:15px !important;
    white-space:pre !important;
  }
  .uploadVisit5>>>.el-upload-list--picture-card .el-upload-list__item{
    width: 100px;
    height: 100px;
    line-height: 100px;
  }
  .uploadVisit6>>>.el-upload-list--picture-card .el-upload-list__item-thumbnail{
    width: 100px;
    height: 100px;
    line-height: 100px;
  }
  .uploadVisit7>>>.avatar{
    width: 50px;
    height: 50px;
  }
  .inputDeepx2>>>.el-textarea__inner {
    width: 80%;
  }
</style>
