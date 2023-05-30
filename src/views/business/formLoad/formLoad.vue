<template>
  <div class="wrap">
    <div class="header">
      <label>
        <span class="headerApp">品控任务详情</span>
      </label>
    </div>
    <div class="content" >
      <div class="content-top" >
        <div class="labelcont">
          <label>
            <span>*</span>采购订单
          </label>
          <input placeholder=" " style="width: 130px;" v-model="orderName"  readonly="readonly"/>
          <el-button style="color: red;" type="text" @click.native.stop="review(headFileUrl)">查看品控表</el-button>
          <el-button @click="annex" style="margin-left:10px" type="text">查看附件</el-button>
        </div>
        <div class="labelcont">
          <label>
            <span>*</span>我司跟单
          </label>
          <input class="cube-input" placeholder=" "
                 readonly="readonly"
                 v-model="ourMerchName"/>
        </div>
        <div class="labelcont">
          <label>
            <span>*</span>客人代码
          </label>
          <input class="cube-input"
                 placeholder=" "
                 readonly="readonly"
                 v-model="customerName"/>
        </div>
        <div class="labelcont">
          <label>
            <span>*</span>供应商&#12288;
          </label>
          <input class="cube-input"
                 placeholder=" "
                 readonly="readonly"
                 v-model="sampleName"/>
        </div>
        <div class="labelcont">
          <label>
            <span>*</span>质量标准&#12288;
          </label>
          <el-button style="color: red;" type="text" @click.native.stop="checkDateHead(orderName)">★</el-button>
          <input class="cube-input"
                 placeholder="查看质量标准"
                 v-model="region"
                 readonly="readonly" @click="inputClick(allMarkList)"/>
        </div>
      </div>
      <div class="content-middle">
        <el-table v-loading = "isLoading"
                  element-loading-background = "rgba(255, 255, 255, .5)"
                  element-loading-text = "加载中，请稍后..."
                  element-loading-spinner = "el-icon-loading" ref = "table" height="400"   :data="tableData"  border  style="width:100%"   @row-click="clickData"  @select='onTableSelect'
                  :header-cell-style="{background:'\t#E8E8D0', fontFamily:'Helvetica',fontSize:'13px'}">
          <el-table-column type="selection" width="40" align="left"/>
          <el-table-column label="内部标识" align="center" min-width="130" v-if="false">
            <template slot-scope="scope" >{{scope.row.conId}}</template>
          </el-table-column>
          <el-table-column label="采购合同号" align="center" min-width="130" v-if="false">
            <template slot-scope="scope" >{{scope.row.orderCode}}</template>
          </el-table-column>
          <el-table-column label="货品" align="center" min-width="130">
            <template slot-scope="scope">{{scope.row.货品}}</template>
          </el-table-column>
          <el-table-column label="主产品客户货号" align="center" min-width="130">
            <template slot-scope="scope">{{scope.row.mainCode}}</template>
          </el-table-column>
          <el-table-column label="中文简描" align="center" min-width="100">
            <template slot-scope="scope">{{scope.row.产品}}</template>
          </el-table-column>
          <el-table-column label="订单数量" align="center" min-width="90">
            <template slot-scope="scope">{{scope.row.订单数量}}</template>
          </el-table-column>
          <el-table-column label="验货数量" align="center" min-width="90">
            <template slot-scope="scope">{{scope.row.跟进数量}}</template>
          </el-table-column>
          <el-table-column label="待检数量" align="center" min-width="90">
            <template slot-scope="scope">{{scope.row.inspectedQuantity}}</template>
          </el-table-column>
          <el-table-column label="最晚验货时间" align="center" min-width="120">
            <template slot-scope="scope">{{scope.row.lateInsString}}</template>
          </el-table-column>
          <el-table-column label="任务类型" align="center" min-width="90">
            <template slot-scope="scope">{{scope.row.任务类型}}</template>
          </el-table-column>
          <el-table-column  label="图片" width="100">
            <template slot-scope="scope">
              <el-popover placement="top-start" title="" trigger="hover">
                <img :src="scope.row.图片" alt="" :style="{width:scope.row.宽度+'px',height:scope.row.长度+'px'}">
                <img  @click.stop slot="reference" :src="scope.row.图片" :style="{width:scope.row.wShow+'px',height:scope.row.hShow+'px'}">
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="详细描述" align="center" min-width="90">
            <template slot-scope="scope">
              <el-button style="color: red;" type="text" @click.native.stop="checkNote(scope.row.detailId)">★</el-button>
              　　　　　<el-button type="text" @click.native.stop="checkDetail(scope.row.desc)">查看</el-button>
              　　　　</template>
          </el-table-column>
          <!--<el-table-column label="品控表" align="center" min-width="90">
            　　　　<template slot-scope="scope" >
                            <span v-if="scope.row.url !=' '">
                              <a target='_blank' :href="scope.row.url"  @click.stop>查看</a>
                            </span>
                            <span v-if="scope.row.url ==' '">
                              <a @click.stop>（空）</a>
                            </span>
            　　　　</template>
          </el-table-column> -->
          <!--<el-table-column label="品控表" align="center" min-width="90">
            　　<template slot-scope="scope" >
                  <span v-if="scope.row.url !=' '">
                    <el-button type="danger" class ="buttonType"  @click.native.stop="review(scope.row.url)">预览</el-button>
                  </span>
            <span v-if="scope.row.url ==' '">
                    <a @click.stop>（空）</a>
                  </span>
            　 </template>
          </el-table-column> -->
          <el-table-column label="备注" align="center" min-width="100">
            　　　　<template slot-scope="scope">
            <el-button  class ="buttonType" type="info" @click.native.stop="modifyUser(scope.row)">查/增</el-button>
            　　　　</template>
          </el-table-column>
        </el-table>
        <!-- 质量标准信息//商品详细信息 -->
        <el-dialog :visible.sync="dialogFormVisible" width="80%" :destroy-on-close="true">
          <el-form>
            <el-form-item label="详细描述" prop="questionContent">
              <el-input type="textarea" :rows="10" v-model="input1" :readonly="true">
              </el-input>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!-- 验货明细-->
        <el-dialog :visible.sync="conDetail" width="90%" :destroy-on-close="true" @close="resetForm('addForm')">
          <el-form ref='addForm'>
            <span span style="text-align: center;display:block;font-size: 18px;">验货报告</span>
            <el-form-item>
              <el-table :data="conList"  @row-click="clickIns">
                <el-table-column prop="dateIns" label="日期" align="center"></el-table-column>
                <el-table-column prop="custSumItem" min-width="45" label="数量" align="center"></el-table-column>
                <el-table-column prop="checkResult" min-width="45" label="结果" align="center"></el-table-column>
                <el-table-column prop="sendIsFlag" label="邮件状态" align="center"></el-table-column>
                <el-table-column prop="insId" label="验货内部标识" v-if="false" align="center"></el-table-column>
                <el-table-column prop="idList" label="品控明细内部标识" v-if="false" align="center"></el-table-column>
              </el-table>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!--查看质量标准历史记录 -->
        <el-dialog :visible.sync="dialogFormNote" width="80%" :destroy-on-close="true">
          <el-form>
            <el-form-item label="详细描述（历史）" prop="questionContent">
              <el-input type="textarea" :rows="10" v-model="inputNote" :readonly="true">
              </el-input>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!--查看历史记录  -->
        <el-dialog :visible.sync="dialogFormAll" width="80%" :destroy-on-close="true">
          <el-form>
            <el-form-item label="工厂交期（历史）" prop="questionContent">
              <el-input type="textarea" :rows="10" v-model="inputAll" :readonly="true">
              </el-input>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-dialog :visible.sync="dialogFormEdit" width="80%" :destroy-on-close="true">
          <el-form ref="formEdit" >
            <el-form-item label="备注">
              <el-input ref="conId"  v-show ="false" type="text" v-model="conId"></el-input>
              <el-input ref="Marks" type="textarea" :rows="6" v-model="Marks" :readonly="true"></el-input>
            </el-form-item>
          </el-form>
          <el-form ref="formEdit">
            <el-form-item label="新增">
              <el-input ref="addMarks" type="textarea" :rows="3" v-model="addMarks"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="Submit()">提交 </el-button>
          </div>
        </el-dialog>
        <el-dialog :visible.sync="headFormAll" width="80%" :destroy-on-close="true">
          <el-form>
            <el-form-item label="质量标准（历史）" prop="questionHead">
              <el-input type="textarea" :rows="10" v-model="inputHead" :readonly="true">
              </el-input>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-dialog :visible.sync="dialogZlVisible" width="80%" :destroy-on-close="true">
          <el-form ref="formEdit">
            <el-form-item label="质量标准">
              <el-input ref="Marks" type="textarea" :rows="16" v-model="allMarkList" :readonly="true" ></el-input>
            </el-form-item>
          </el-form>
        </el-dialog>
        <el-dialog :visible.sync="pdfDialogVisible" fullscreen append-to-body>
          <div style="text-align: center;margin-top:5%;width: 100%;">
            <el-button type="danger" icon="el-icon-remove-outline" @click="narrowButton()">缩小</el-button>
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="enlargeButton()">放大</el-button>
          </div>
          <div :style="'width:'+ diaWidth +'%;'">
            <div id="remoteSignature-pages-videoAuthenticationDetails-videoAuthenticationDetails">
              <pdf v-for="i in numPages" :key="i" :src="pdfSrc"
                   :page="i" ref="myPdfComponent"></pdf>
            </div>
            <div slot="footer" style="text-align: center;margin-top:5%;width: 100%;">
              <el-button type="primary" @click="goClose()">关闭</el-button>
            </div>
          </div>
        </el-dialog>
      </div>
      <div id="con"  slot="footer" class="dialog-footer">
        <el-button id="pkButton" type="primary" @click="subMitSelect()">验货报告</el-button>
      </div>
    </div>
  </div>
</template>
<script>
    import pdf from 'vue-pdf-signature';
    import CMapReaderFactory from "vue-pdf-signature/src/CMapReaderFactory";
    export default {
        name: "addStore",
        data() {
            return {
                isLoading:false,
                diaWidth:100,
                pdfData:'',
                showType: false,
                pdfDialogVisible:false,
                pdfSrc: '',//pdf路径
                numPages: 1,  //  pdf 文件总页数
                env:'',
                tableData: [],
                vendName:" ",
                options:[],
                conDetail:false,
                conList:[],
                dataonLineListSelections: [],
                orderName:" ",
                region:" ",
                ourMerchName:" ",
                salesmanName:" ",
                customerName:" ",
                sceneName:" ",
                conStatus:" ",
                orderStatus:" ",
                sampleName:" ",
                headFormAll:false,
                dialogFormVisible:false, //弹窗状态设置关闭
                dialogZlVisible:false,
                dialogFormNote:false,//历史记录
                dialogFormAll:false,
                input1:" ",
                inputNote:" ",
                conId:" ",
                Marks:"  ",
                addMarks:"",
                numberMark:"",
                inputHead:"",
                inputAll:" ",
                result1:"",
                selection:"",
                itemCode:" ",
                dialogFormEdit:false,
                ajaxFlag: false,
                marksInfo:" ",
                areaFullName: "",
                marksAll:" ",
                allMarkList:" ",
                headFileUrl:"",
            };
        },
        created() {
            this.initWxConfig();
        },
        beforeRouteLeave(to, from, next) {
            if (to.path === "/shopList") {
                // 设置下一个路由的 meta
                to.meta.keepAlive = false; // C 跳转到 A 时让 A 不缓存，即刷新
            }
            next();
        },
        methods: {
          // 页面跳转
          annex() {
            this.$router.push({
              path: '/annex',
              query: {
                orderName: this.orderName
                }
              })
            },
            //查看质量标准
            checkDetail(desc){
                this.dialogFormVisible = true;
                this.input1 = desc;
            },
            //查看修改记录
            checkNote(detailId){
                this.dialogFormNote = true;
                //根据明细行的内部标识查询历史记录
                this.$methods.http("sys/sys/note/searchNoteDetail",{detailId:detailId}).then(res => {
                    this.inputNote = res.desc; //描述
                    this.createDate = res.createDate;//创建时间
                });
            },
            //查看描述、长、宽、高、工厂交期等信息
            checkDate(detailId){
                this.dialogFormAll = true;
                //根据明细行的内部标识查询历史记录
                this.$methods.http("sys/sys/note/noteAllResponse",{detailId:detailId}).then(res => {
                    this.inputAll = res.chinaAll; //描述
                });
            },
            //质量标准点击事件
            inputClick(marks){
                this.dialogZlVisible = true;
                this.allMarkList = marks;
            },
            //表格数据选择
            handleSelectionChange(val,index) {
                this.selection = val;
            },
            //勾选事件(限制只能勾选一条)
            onTableSelect(rows, row){
                this.$refs.table.clearSelection();
                let selected = rows.length && rows.indexOf(row) !== -1;
                if(selected==0){
                    this.$refs.table.toggleRowSelection(row, false);
                }else if(selected==1){
                    this.$refs.table.toggleRowSelection(row, true);
                }
            },
            //验货任务，将界面明细行保存到数组里面，更改跟单任务明细状态
            subMitSelect(){
                let itemJson ={};
                if(this.$refs.table !=undefined){
                    let result = this.$refs.table.selection;
                    if(result.length ==0) {
                        this.$createToast({txt: "未选中相关货品！", type: "txt"}).show();
                        return;
                    }
                    let cusItem = result[0].cusItem;
                    let companyItem = result[0].companyItem;
                    let sceneNumber =  result[0].inspectedQuantity;
                    let detailId =  result[0].detailId;
                    let conId = result[0].conId;
                    let itemCode = result[0].货品;
                    let itemId = result[0].itemId;
                    let accountEn =result[0].accountEn;
                    let orderCode = result[0].orderCode;
                    let idList = result[0].conId;//验货明细ID
                    let faDateString = result[0].faDateString;//工厂交期
                    let importance = result[0].importance;//重要性
                    let mainCode = result[0].mainCode;//主产品客户货号
                    let idArray = result[0].idArray;//合并ID
                    let countResult = result[0].countList;//验货条数
                    if(importance =='1'){
                        importance ='生死重要';
                    }else if(importance =='2'){
                        importance ='非常重要';
                    }else if(importance =='3'){
                        importance ='重要';
                    }else if(importance =='4'){
                        importance ='常规';
                    }
                    itemJson = {
                        "cusItem":cusItem,
                        "itemCode":itemCode,
                        "companyItem":companyItem,
                        "number":sceneNumber,
                        "orderDetailId":detailId,
                        "itemId":itemId,
                        "mainCode":mainCode
                    }
                    this.$methods.http("wx/inspection/searchInsReportResult",{conId:conId})
                        .then(res => {
                            if(res.result =='200') {
                                this.$createToast({txt: "存在未发送的验货报告，无法新建验货报告！", type: "txt"}).show();
                            }else{
                                this.$router.push({path: 'coverageDetail', query: {
                                        env:accountEn,
                                        orderCode: this.orderName,
                                        itemJson:itemJson,
                                        sampleName:this.sampleName,
                                        ourMerchName:this.ourMerchName,
                                        type:'new',
                                        idList:idList,
                                        orderId:orderCode,
                                        faDateString:faDateString,
                                        importance:importance,
                                        idArray:idArray,
                                        countResult:countResult
                                    }})
                                return;
                            }
                        });
                }
            },
            //这边是动态设置明细表头的宽度
            cloumWith(indexCode,key){
                if(indexCode ==1) {
                    return 150;
                }else if(indexCode == 19 || indexCode == 21  || indexCode==28){
                    return 120;
                }else if(indexCode == 29){
                    return 180;
                }
            },
            //验货报告-行点击事件
            clickData(row, event, column) {
                let  conId = row.conId;
                this.$methods.http("wx/inspection/searchInsReport",{conId:conId}).then(res => {
                    this.conList = this.conList.concat(res);
                    this.conDetail = true;
                });
            },
            //行点击事件---传个验货报告的ID
            clickIns(row, event, column){
                let orderCode =  this.orderName;
                let sampleName = this.sampleName;
                let ourMerchName = this.ourMerchName;
                let itemCode = this.itemCode;
                let type ="edit";
                this.$router.push({path: 'coverageDetail', query: {id:row.insId,idList:row.idList,
                        orderCode:orderCode,sampleName:sampleName,
                        ourMerchName:ourMerchName,
                        itemCode:itemCode,
                        type:type}})
            },
            review(url){
                let datas = 'data:application/pdf;base64,' + url;
                this.pdfData = datas;
                this.pdfSrc = pdf.createLoadingTask({ url: this.pdfData,cMapUrl:'https://ai.nuerabeauty.com:19015/pages/static/cmaps/',cMapPacked:true });
                for(var key in require.cache) {
                    if(key.indexOf('bcmap') >= 0) {
                        delete require.cache[key];
                    }
                }
                this.pdfSrc.promise.then(pdf => {
                    this.numPages = pdf.numPages;
                    this.pdfDialogVisible = true;
                }).catch(err=>{
                    console.log("pdf加载失败",err);
                });
            },
            narrowButton() {
                this.diaWidth = this.diaWidth - 30;
            },
            enlargeButton() {
                this.diaWidth = this.diaWidth + 30;
            },
            goClose() {
                this.pdfDialogVisible = false;
            },
            //备注提交功能
            Submit() {
                this.$methods.http("wx/sys/sys/dict/upDateConDetail",
                    {mark:this.$refs.addMarks.value,conId:this.$refs.conId.value}).then(res => {
                    if(res =='200') {
                        this.$createToast({txt: "备注保存成功！", type: "txt"}).show();
                        //隐藏弹窗
                        this.dialogFormEdit = false;
                        window.location.reload();
                    }else{
                        this.$createToast({txt: "备注保存失败！", type: "txt"}).show();
                        this.dialogFormEdit = false;
                        window.location.reload();
                    }
                });
                this.$nextTick(() => {
                    this.$refs["formEdit"].resetFields();
                });
            },    //查看表头的唛头修改信息
            checkDateHead(orderName){
                this.headFormAll = true;
                //根据明细行的内部标识查询历史记录
                this.$methods.http("sys/sys/note/noteHeadResponse",{orderName:orderName}).then(res => {
                    this.inputHead = res.chinaHead; //描述
                });
            },
            modifyUser(row){
                this.dialogFormEdit = true;
                this.detailId = row.detailId;
                this.docCodeModify = row.docCode;
                this.Marks =row.Marks;
                this.conId = row.conId;
            },
            //备注取消功能
            cancel() {
                this.dialogFormEdit = false
                // 点击取消按钮的时候清除输入框中的内容 清除验证
                //  this.$nextTick获取了节点之后进行操作
                this.$nextTick(() => {
                    // form对应你写的<el-form ref="form"></el-form>
                    this.$refs["formEdit"].resetFields();
                });
            },
            resetForm(form){
                this.conList =[];
                this.$refs[form].resetFields();
            },
            //接收前一个界面传过来的参数,根据docId获取明细信息   做了个缓存用来存放搜索条件
            initWxConfig() {
                this.isLoading =true;
                let userInfo = JSON.parse(localStorage.getItem('user'));
                let userNsCode = userInfo.userReal;
                if(localStorage.getItem("stateId") != null){
                    this.$methods.http("sys/sys/changeWay/searchConDetail",{orderCode:this.$route.query.orderCode,userNsCode:userNsCode,
                        state:localStorage.getItem("stateId")}).then(res => {
                        this.tableData = this.tableData.concat(res);
                        this.isLoading =false;
                    });
                }else{
                    this.$methods.http("sys/sys/changeWay/searchConDetail",{orderCode:this.$route.query.orderCode,userNsCode:userNsCode,
                        state:" "}).then(res => {
                        this.tableData = this.tableData.concat(res);
                        this.isLoading =false;
                    });
                }
                this.$methods.http("sys/sys/changeWay/conIdSearch",{orderCode:this.$route.query.orderCode,userNsCode:userNsCode}).then(res => {
                    this.orderName = res.orderName;
                    this.vendName = res.vendName;
                    this.region = res.region;
                    this.ourMerchName = res.ourMerchName;
                    this.salesmanName = res.salesmanName;
                    this.customerName = res.customerName;
                    this.sceneName = res.sceneName;//跟单人
                    this.marksAll = res.marksAll;//唛头
                    this.conStatus = res.conStatus;//状态
                    this.orderStatus = res.orderStatus;//采购订单状态
                    this.sampleName =  res.sampleName;//供应商简称
                    this.env =  res.accountEn;//环境
                    this.allMarkList = res.allMarkList;
                    this.headFileUrl = res.fileUrl;
                });
            }
        },
        components: {
            pdf,
            CMapReaderFactory
        }
    };
</script>
<style lang="stylus" scoped>
  @import '../../../assets/css/convert.styl';
  .wrap {
    width: 100%;
    height: 100%;
    overflow: auto;
    .headerApp{
      font-size:13px
    }
    .inputStyle{
      outline: none;
      border: none;
      padding: 3px;
      margin: 10px;
      width: 80%; //89%
    }
    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 100%;
    }
    .el-form-item__content {
      width: 100%;
    }

    .el-table {

      /deep/ .el-table__header-wrapper .el-checkbox {
        display: none;
      }
      .buttonType {
        padding: 5px; 10px ;
      }
    }
    .buttonClass{
      margin: 0 0 0 0.5rem;
    }
    .search-wrap {
      flex: none;
      height: convert(50);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      background-color: #fff;
      border-bottom: convert(3) solid #F4F6F8;
      .search-form {
        position relative
        width 100%
      }
      input {
        width: 70%; //89%
        height: convert(29);
        outline: none;
        border: 1px solid #E3E3E3;
        border-radius: 16px;
        padding: 0 convert(16) 0 convert(47);
        //margin 0 auto
        margin: 0 0 0 0.2rem;
        display block
      }
      i {
        color: #EAEAEA;
        position: absolute;
        top: 50%;
        //left: convert(56); //32
        left:15%;
        transform: translateY(-50%);
      }
    }
    #con{
      //background-color: #28BF62;
      width: convert(359);
      height: convert(50);
      line-height: convert(50);
      text-align: center;
      border: 0;
      font-size: convert(16);
      color: #fff;
      margin-top: convert(2);
      bottom: convert(33);
      margin-left: convert(8);
      border-radius: convert(2);
      #pkButton{
        width: convert(105);
        //margin-right: convert(180);
      }
    }
    .header {
      flex: none;
      height: 5%; //convert(40)
      text-align: center;
      //color: #fff;
      //background: url('./1.jpg') no-repeat;
      background-size: 100% 100%;
      padding-top: convert(10);
      background:#F0F0F0
      .count {
        font-size: convert(48);
        line-height: convert(64);
      }

      .desc {
        font-size: convert(17);
      }

      .text {
        margin-top: convert(5);
        font-size: convert(12);
      }
    }
    .content {
      padding-bottom: convert(55);
      height: 94%;  //2022/1/24  将100改成了85%
      background-color: #F0F0F0;

      .content-top {
        background-color: #fff;

        .labelcont {
          width: 90%;
          height: convert(40); //设置表头字段的宽度 48
          line-height: convert(50); //62
          border-bottom: 1px solid #d7dce5;
          border-collapse: collapse;
          font-size: convert(12);
          margin-left: convert(20);

          label {
            color: #4D4C4E;

            span {
              color: red;
            }
          }

          input {
            border: 0;
            outline: none;
            margin-left: convert(20);
            width :220px
          }

          input::-webkit-input-placeholder {
                  color: #aab2bd;
                }
        }

        .labelphone {
          border-bottom: 0;
        }
      }

      .content-middle {
        bottom: 0;
        left: 0;
        top: 37%;
        margin-top: convert(5);
        width: 100%;
        height:65%; //convert(190)
        z-index: 1;
        background-color: #fff;
        display: flex;
      }
      .add {
        background-color: #28BF62;
        width: convert(359);
        height: convert(50);
        line-height: convert(50);
        text-align: center;
        border: 0;
        font-size: convert(16);
        color: #fff;
        margin-top: convert(25);
        bottom: convert(33);
        margin-left: convert(8);
        border-radius: convert(2);
      }
    }
  }
</style>
