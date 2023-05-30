<template>
  <div class="wrap">

    <!-- 1.1头部信息条 -->
    <div class="header">
      <label>
        <span class="headerApp">跟单任务详情</span>
      </label>
    </div>

    <!-- 1.2主体部分 -->
    <div class="content" v-loading="isLoading" element-loading-background="rgba(255, 255, 255, .5)"
      element-loading-text="加载中，请稍后..." element-loading-spinner="el-icon-loading">

      <!-- 1.2.1上面的表单 -->
      <div class="content-top">
        <div class="labelcont">
          <label>
            <span>*</span>采购订单
          </label>
          <input placeholder=" " style="width: 130px;" v-model="orderName" readonly="readonly" />
          <el-button style="color: red;" type="text" @click.native.stop="review(headFileUrl)">查看品控表</el-button>
        </div>
        <div class="labelcont">
          <label>
            <span>*</span>我司跟单
          </label>
          <input class="cube-input" placeholder=" " readonly="readonly" v-model="ourMerchName" />
        </div>
        <div class="labelcont">
          <label>
            <span>*</span>客人代码
          </label>
          <input class="cube-input" placeholder=" " readonly="readonly" v-model="customerName" />
        </div>
        <div class="labelcont">
          <label>
            <span>*</span>供应商&#12288;
          </label>
          <input class="cube-input" placeholder=" " readonly="readonly" v-model="sampleName" />
        </div>
        <div class="labelcont">
          <label>
            <span>*</span>质量标准&#12288;
          </label>
          <el-button style="color: red;" type="text" @click.native.stop="checkHeadDate(orderName)">★</el-button>
          <input class="cube-input" placeholder="查看质量标准" v-model="region" readonly="readonly"
            @click="inputClick(marksAll)" />
        </div>
      </div>

      <!-- <el-divider><i class="el-icon-mobile-phone"></i></el-divider> -->

      <!-- 1.2.2中间的表格_上方筛选行 -->
      <div style="background-color:#fff;padding-top:20px;padding-bottom:10px;margin-top:30px">
        <el-row>
          <el-col :span="8">
            <h3 style="font-size:16px;margin-left:23px;margin-top: 3px;">生成日期</h3>
          </el-col>
          <el-col :span="8">
            <el-dropdown @command="handleCommand">
              <span ref="status" class="el-dropdown-link">
                选择状态<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">全部</el-dropdown-item>
                <el-dropdown-item command="b">跟进中</el-dropdown-item>
                <el-dropdown-item command="c">工厂部分完工</el-dropdown-item>
                <el-dropdown-item command="d">工厂全部完工</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="6"><el-button @click="annex" style="margin-left:10px" type="text">查看附件</el-button></el-col>
        </el-row>
      </div>

      <!-- 1.3.3表格  -->
      <div v-for="item, index in tableData" :key="index">
        <div class="title" @click.stop="item.show = !item.show"><i v-if="!item.show" class="el-icon-circle-plus"
            style="margin-right:10px"></i><i v-if="item.show" class="el-icon-remove-outline"
            style="margin-right:10px"></i>{{ item.date }}
        </div>

        <div v-if="item.show">
          <el-table @select='onTableSelect' @select-all="selectAll(selection,index)" @selection-change="handleSelectionChange($event, index)" :data="item.detail"
            class="tableBox" ref="multipleTable" tooltip-effect="dark" style="width: 100%;"
                    :header-cell-style="{background:'\t#E8E8D0', fontFamily:'Helvetica',fontSize:'13px'}">

            <el-table-column :selectable='selectable' align="center" type="selection" width="80">
            </el-table-column>

            <!-- <el-table-column label="日期" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column> -->

            <el-table-column prop="货品" label="货品" width="100" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="主产品客户货号" label="主产品客户货号" width="120" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="公司货号" label="公司货号" width="90" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="中文简描" label="中文简描" width="90" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="订单数量" label="订单数量" width="80" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="跟进数量" label="跟进数量" width="80" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="最晚完成时间" label="最晚完成时间" width="110" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="已累计完工数量" label="已累计完工数量" width="120" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="工厂累计完工数量" label="工厂累计完工数量" width="135" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input @change="changedMatNum(scope.$index, scope.row, $event)" placeholder="请输入"
                  v-model="scope.row['工厂累计完工数量']"></el-input>
              </template>
            </el-table-column>

            <el-table-column prop="剩余完工数量" label="剩余完工数量" width="110" show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop="工厂交期" label="工厂交期" width="120" show-overflow-tooltip>
              <template slot-scope="scope">
                <div class="Facontent">
                  <el-button style="color: red;" class="buttonType" type="text"
                    @click.native.stop="checkDate(scope.row.detailId)">★</el-button>
                  {{ scope.row.工厂交期 }}
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="图片" label="图片" width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-popover placement="top-start" title="" trigger="hover">
                  <img :src="scope.row.图片" alt="" :style="{ width: scope.row.宽度 + 'px', height: scope.row.长度 + 'px' }">
                  <img slot="reference" :src="scope.row.图片"
                    :style="{ width: scope.row.wShow + 'px', height: scope.row.hShow + 'px' }">
                </el-popover>
              </template>
            </el-table-column>

            <el-table-column prop="大货进度" label="大货进度" width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input placeholder="请输入" v-model="scope.row['大货进度']"></el-input>
              </template>
            </el-table-column>

            <el-table-column prop="品质反馈" label="品质反馈" width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input placeholder="请输入" v-model="scope.row['品质反馈']"></el-input>
              </template>
            </el-table-column>

            <el-table-column prop="详细描述" label="详细描述" width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button style="color: red;" type="text"
                  @click.native.stop="checkNote(scope.row.detailId)">★</el-button>
                <el-button type="text" @click.native.stop="checkDetail(scope.row.desc)">查看</el-button>
              </template>
            </el-table-column>

            <el-table-column label="备注" align="center" min-width="100">
              <template slot-scope="scope">
                <el-button class="buttonType" type="info" @click.native.stop="modifyUser(scope.row)">查/增</el-button>
              </template>
            </el-table-column>

          </el-table>

        </div>
      </div>


      <!-- 1.2.3最下方的确认按钮 -->
      <div id="con" slot="footer" class="dialog-footer">
        <el-button id="pkButton" type="primary" @click="subMitSelect()">提交</el-button>
      </div>

      <!-- 1.2.4最后的弹层 -->
      <!-- 表头的唛头信息弹层-->
      <el-dialog :visible.sync="headFormAll" width="80%" :destroy-on-close="true">
        <el-form>
          <el-form-item label="唛头（历史）" prop="questionHead">
            <el-input type="textarea" :rows="10" v-model="inputHead" :readonly="true">
            </el-input>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!-- 质量标准的弹层 -->
      <el-dialog :visible.sync="dialogZlVisible" width="80%" :destroy-on-close="true" v-model="marksAll">
        <el-form ref="formEdit">
          <el-form-item label="质量标准">
            <el-input ref="Marks" type="textarea" :rows="16" v-model="marksAll" :readonly="true"></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!-- pdf弹层 -->
      <el-dialog :visible.sync="pdfDialogVisible" fullscreen append-to-body>
        <div style="text-align: center;margin-top:5%;width: 100%;">
          <el-button type="danger" icon="el-icon-remove-outline" @click="narrowButton()">缩小</el-button>
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="enlargeButton()">放大</el-button>
        </div>
        <div :style="'width:' + diaWidth + '%;'">
          <div id="remoteSignature-pages-videoAuthenticationDetails-videoAuthenticationDetails">
            <pdf v-for="i in numPages" :key="i" :src="pdfSrc" :page="i" ref="myPdfComponent"></pdf>
          </div>
          <div slot="footer" style="text-align: center;margin-top:5%;width: 100%;">
            <el-button type="primary" @click="goClose()">关闭</el-button>
          </div>
        </div>
      </el-dialog>

      <!--查看历史记录弹层  -->
      <el-dialog :visible.sync="dialogFormAll" width="80%" :destroy-on-close="true">
        <el-form>
          <el-form-item label="工厂交期（历史）" prop="questionContent">
            <el-input type="textarea" :rows="10" v-model="inputAll" :readonly="true">
            </el-input>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!--查看质量标准历史记录弹层  -->
      <el-dialog :visible.sync="dialogFormNote" width="80%" :destroy-on-close="true">
        <el-form>
          <el-form-item label="详细描述（历史）" prop="questionContent">
            <el-input type="textarea" :rows="10" v-model="inputNote" :readonly="true">
            </el-input>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!-- 质量标准信息//商品详细信息弹层 -->
      <el-dialog :visible.sync="dialogFormVisible" width="80%" :destroy-on-close="true">
        <el-form>
          <el-form-item label="详细描述" prop="questionContent">
            <el-input type="textarea" :rows="10" v-model="input1" :readonly="true">
            </el-input>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!--备注相关信息弹层  -->
      <el-dialog :visible.sync="dialogFormEdit" width="80%" :destroy-on-close="true">
        <el-form ref="formEdit">
          <el-form-item label="备注">
            <el-input ref="detailId" v-show="false" type="text" v-model="detailId"></el-input>
            <el-input ref="docCodeModify" v-show="false" type="text" v-model="docCodeModify"></el-input>
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

    </div>
  </div>
</template>
<script>
import pdf from 'vue-pdf-signature';
import CMapReaderFactory from "vue-pdf-signature/src/CMapReaderFactory";
let jsonInfo = {};
export default {
  name: "addStore",
  components: {
    pdf,
    CMapReaderFactory
  },
  data() {
    return {
      // 1.1上方表单
      orderName: "",
      ourMerchName: "",
      customerName: "",
      sampleName: "",
      region: "",
      marksAll: " ",
      headFileUrl: "",
      pdfData: '',
      vendName: " ",
      salesmanName: " ",
      sceneName: " ",
      docStatus: " ",
      orderStatus: " ",
      pdfSrc: '',  //pdf路径
      numPages: 1,  //  pdf 文件总页数
      diaWidth: 100,
      isLoading: false, // 表格loading
      // 1.2上方表单的弹层
      headFormAll: false,
      inputHead: " ",
      dialogZlVisible: false,
      pdfDialogVisible: false,
      dialogFormAll: false,
      inputAll: " ",
      dialogFormNote: false,//历史记录
      inputNote: " ",
      dialogFormVisible: false, //弹窗状态设置关闭
      input1: " ",
      dialogFormEdit: false,
      detailId: " ",
      docCodeModify: "",
      Marks: "  ",
      addMarks: "",
      // 1.3表格
      tableData: [], // 表格数据
      selection: [], // 提交时候选中的表格数据
      listArr: [],  //select方法选中表格时的数据
      num: 0, // 记录要删除的元素的索引
      tableDataLast: [],
    };
  },
  created() {
    // 初始化
    this.initWxConfig();
  },
  methods: {
    // 主体表格部分
    // 1.下拉选框
    handleCommand(command) {
      if (command == 'a') {
        const params = JSON.parse(JSON.stringify(this.tableDataLast))
        this.tableData = params
        console.log('全部');
        // console.log(this.$refs.status.innerHTML, '====');
        this.$refs.status.innerHTML = '全部<i data-v-5a4f3260="" class="el-icon-arrow-down el-icon--right"></i>'
      }
      else if (command == 'b') {
        const params = JSON.parse(JSON.stringify(this.tableDataLast))
        params.forEach((e) => {
          let filterArr = e.detail.filter((i) => {
            return i['任务状态'] == '跟进中'
          })
          e.detail = filterArr
          console.log('跟进中');
        })
        this.tableData = params
        this.$refs.status.innerHTML = '跟进中<i data-v-5a4f3260="" class="el-icon-arrow-down el-icon--right"></i>'
      }
      else if (command == 'c') {
        const params = JSON.parse(JSON.stringify(this.tableDataLast))
        params.forEach((e) => {
          let filterArr = e.detail.filter((i) => {
            return i['任务状态'] == '工厂部分完工'
          })
          e.detail = filterArr
          console.log('工厂部分完工');
        })
        this.tableData = params
        this.$refs.status.innerHTML = '工厂部分完工<i data-v-5a4f3260="" class="el-icon-arrow-down el-icon--right"></i>'
      }
      else if (command == 'd') {
        const params = JSON.parse(JSON.stringify(this.tableDataLast))
        params.forEach((e) => {
          let filterArr = e.detail.filter((i) => {
            return i['任务状态'] == '工厂全部完工'
          })
          // e.detail = filterArr
          // console.log(filterArr);
          console.log('工厂全部完工');
        })
        this.tableData = params
        this.$refs.status.innerHTML = '工厂全部完工<i data-v-5a4f3260="" class="el-icon-arrow-down el-icon--right"></i>'
      }
    },

    //2. 表格数据选择
    handleSelectionChange(val, index) {
      this.selection = val;
    },
    //2. 全选
    selectAll(list){
      if(list.length==0){

      }else{
        list.map((item)=>{
          this.listArr.push(item);
        })
      }
    },
    //3.表格数据的处理
    onTableSelect(rows, row) {
      let selected = rows.length && rows.indexOf(row) !== -1
      if (selected == true) {
        this.listArr.push(row)
      }
      else if (selected == false) {
        for (let index = 0; index < this.listArr.length; index++) {
          this.listArr[index].id = row.id
          this.num = index
        }
        this.listArr.splice(this.num, 1)
      }
    },

    // 4.控制表格头部多选框是否禁用
    selectable(row, index) {
      // console.log(row, index);
      if (row.isFlag == 1) {
        return false
      } else {
        return true
      }
    },

    // 5.页面跳转
    annex() {
      this.$router.push({
        path: '/annex',
        query: {
          orderName: this.tableData[0].detail[0]['采购合同号']
        }
      })
    },

    // =============================================================================
    // 初始化
    initWxConfig() {
      this.isLoading = true;
      let userInfo = JSON.parse(localStorage.getItem('user'));
      let userNsCode = userInfo.userReal;
      this.$methods.http("sys/sys/changeWay/docIdSearch", { orderCode: this.$route.query.orderCode, userNsCode: userNsCode }).then(res => {
        this.orderName = res.orderName;
        this.vendName = res.vendName;
        this.region = res.region;
        this.ourMerchName = res.ourMerchName;
        this.salesmanName = res.salesmanName;
        this.customerName = res.customerName;
        this.sceneName = res.sceneName;//跟单人
        this.marksAll = res.allMarksList;//唛头
        this.docStatus = res.docStatus;//状态
        this.orderStatus = res.orderStatus;//采购订单状态
        this.sampleName = res.sampleName;//供应商简称
        this.headFileUrl = res.fileUrl;
        // this.marksInfo =  res.marksAll;//描述
      });
      if (localStorage.getItem("stateId") != null) {
        this.$methods.http("sys/sys/changeWay/searchDocDetail", {
          orderCode: this.$route.query.orderCode, userNsCode: userNsCode,
          state: localStorage.getItem("stateId")
        }).then(res => {
          // this.tableData = this.tableData.concat(res);
          localStorage.removeItem("stateId");
          console.log('初始化数据', res, '走的if分支');
          this.isLoading = false;
        });
      } else {
        this.$methods.http("sys/sys/changeWay/searchDocDetail", {
          orderCode: this.$route.query.orderCode, userNsCode: userNsCode,
          state: " "
        }).then(res => {
          res.forEach((e) => {
            e.show = true
          })
          console.log('初始化数据', res, '走的else分支');
          this.tableData = res
          this.tableDataLast = res
          this.isLoading = false;
        });
      }
    },

    // 上方品控表格pdf-1.1.1
    review(url) {
      let datas = 'data:application/pdf;base64,' + url;
      this.pdfData = datas;
      this.pdfSrc = pdf.createLoadingTask({ url: this.pdfData, cMapUrl: 'https://ai.nuerabeauty.com:19015/pages/static/cmaps/', cMapPacked: true });
      for (var key in require.cache) {
        if (key.indexOf('bcmap') >= 0) {
          delete require.cache[key];
        }
      }
      this.pdfSrc.promise.then(pdf => {
        this.numPages = pdf.numPages;
        this.pdfDialogVisible = true;
      }).catch(err => {
        console.log("pdf加载失败", err);
      });
    },
    // 关闭pdf弹层 1.1.2
    goClose() {
      this.pdfDialogVisible = false;
    },
    // 缩小1.1.3
    narrowButton() {
      this.diaWidth = this.diaWidth - 30;
    },
    // 放大1.1.4
    enlargeButton() {
      this.diaWidth = this.diaWidth + 30;
    },

    //查看表头的唛头修改信息-1.2
    checkHeadDate(orderName) {
      this.headFormAll = true;
      //根据明细行的内部标识查询历史记录
      this.$methods.http("sys/sys/note/noteHeadResponse", { orderName: orderName }).then(res => {
        this.inputHead = res.chinaHead; //描述
      });
    },

    //质量标准点击事件-1.3
    inputClick(marks) {
      // console.log(marks)
      this.dialogZlVisible = true;
      this.marksAll = marks;
    },

    // 表格中的弹层事件
    //查看历史记录弹层_工厂交期（历史）-1.1
    checkDate(detailId) {
      this.dialogFormAll = true;
      //根据明细行的内部标识查询历史记录
      this.$methods.http("sys/sys/note/noteAllResponse", { detailId: detailId }).then(res => {
        this.inputAll = res.chinaAll; //描述
      });
    },

    //查看质量标准历史记录弹层_详细描述（历史）-1.2
    checkNote(detailId) {
      this.dialogFormNote = true;
      //根据明细行的内部标识查询历史记录
      this.$methods.http("sys/sys/note/searchNoteDetail", { detailId: detailId }).then(res => {
        this.inputNote = res.desc; //描述
        this.createDate = res.createDate;//创建时间
      });
    },

    //质量标准信息//商品详细信息弹层_详细描述-1.3
    checkDetail(desc) {
      this.dialogFormVisible = true;
      this.input1 = desc;
    },

    // 备注相关信息弹层_备注-1.4
    modifyUser(row) {
      this.dialogFormEdit = true;
      this.detailId = row.detailId;
      this.docCodeModify = row.docCode;
      this.Marks = row.Marks;
    },

    //备注取消功能-1.4.1
    cancel() {
      this.dialogFormEdit = false
      // 点击取消按钮的时候清除输入框中的内容 清除验证
      //  this.$nextTick获取了节点之后进行操作
      this.$nextTick(() => {
        // form对应你写的<el-form ref="form"></el-form>
        this.$refs["formEdit"].resetFields();
      });
    },

    //备注提交功能-1.4.2
    Submit() {
      this.$methods.http("wx/sys/sys/dict/upDateDocDetail",
        { mark: this.$refs.addMarks.value, detailId: this.$refs.detailId.value, docCodeModify: this.$refs.docCodeModify.value }).then(res => {
          if (res == '200') {
            this.$createToast({ txt: "备注保存成功！", type: "txt" }).show();
            //隐藏弹窗
            this.dialogFormEdit = false;
            //刷新界面
            window.location.reload();
          } else {
            this.$createToast({ txt: "备注保存失败！", type: "txt" }).show();
            this.dialogFormEdit = false;
            window.location.reload();
          }
        });
      this.$nextTick(() => {
        this.$refs["formEdit"].resetFields();
      });
    },

    //工厂累计完工数量输入框事件-1.5
    changedMatNum(index, row, even) {
      var inputNumber = Number(event.target.value);
      //累计下推跟单数量
      var insNumber = Number(row.thisPushNumber);
      if (inputNumber < insNumber) {
        this.$createToast({ txt: "工厂累计完工数量不能小于工厂已累计完工数量！", type: "txt" }).show();
        //隐藏弹窗
        this.dialogFormEdit = false;
        event.target.value = " ";
      }
      var detailId = row.detailId;
      var docCode = row.docCode;
      var id = row.id;
      jsonInfo[detailId + '*' + docCode + '*' + id] = inputNumber
    },

    //最后的提交
    subMitSelect() {
       console.log(this.listArr, 'subMitSelect');
      var detailList = [];
      for (var i = 0; i < this.listArr.length; i++) {
        var detailJson = {};
        detailJson = {
          "detailId": this.listArr[i].detailId,
          "docCode": this.listArr[i].docCode,
          "id": this.listArr[i].id,
          "finishedNum": this.listArr[i]['工厂累计完工数量'],
          "schedule": this.listArr[i]['大货进度'],
          "feedback": this.listArr[i]['品质反馈'],
        }
        detailList.push(detailJson);
      }
      this.$methods.http("sys/sys/changeWay/upDocDetailStatus", { orderCode: this.$route.query.orderCode, detailArray: detailList, })
        .then(res => {
          if (res == '200') {
            window.location.reload();
            this.$createToast({ txt: "跟单任务提交成功！", type: "txt" }).show();
            //隐藏弹窗
            this.dialogFormEdit = false;
            jsonInfo = {};
          } else {
            this.$createToast({ txt: "任务提交失败！", type: "txt" }).show();
            this.dialogFormEdit = false;
            window.location.reload();
          }
        });
    },

  },
};
</script>
<style lang="stylus" scoped>
  @import '../../../assets/css/convert.styl';
  /deep/ .el-table .cell.el-tooltip {
    white-space: nowrap;
    min-width: 50px;
    height: 90px;
    line-height: 90px;
}
  .title {
    height: 26px;
    background-color: #eaeaea;
    border-radius: 5px;
    font-weight: 600;
    font-size: 14px;
    line-height: 26px;
    padding: 0 10px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #000;
  }
  .el-icon-arrow-down {
    font-size: 20px;
  }
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
    //上下滚动  必须要
    ///deep/  .el-table--scrollable-x .el-table__body-wrapper{
    //  overflow:auto;
    //  height:10%;
    //}
    //设置横向的滚动条
    // 设置滚动条的宽度
    /deep/ .el-table__body-wrapper::-webkit-scrollbar {
      width: 1px;
      height:1px;
    }
    // 设置滚动条的背景色和圆角
    /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb  {
      background-color: pink;
      border-radius: 8px;
    }
    .el-table--scrollable-x .el-table__body-wrapper {
      overflow-y: auto;
    }
    .el-table--border {
      border-right: none;
      border-bottom: none;
      overflow-y: auto;
    }

    /* 展开行样式 */
    .demo-table-expand {
      font-size: 0;
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
    /* 隐藏上方表格多余部分 */
    .undefined.el-table__expand-column {
      display: none;
    }
    /* 隐藏上方表格多余部分 */
    .el-table_1_column_8 .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
      border-right: 0px solid #ebeef5
    }
    .row-expand-unhas .el-table__expand-column{
      pointer-events: none;
    }
    .row-expand-unhas .el-table__expand-column .el-icon {
      visibility: hidden;
    }

    ::v-deep .is-scrolling-none::-webkit-scrollbar {
      display: none;
    }
    ::v-deep.el-table--scrollable-y ::-webkit-scrollbar {
      display: none;
    }
    ::v-deep.el-table--scrollable-x ::-webkit-scrollbar {
      display: none;
    }


    .el-table {
      // 看这里！！！！！！！！！！！！！！！！！！！！！！！！！！！！
      // 深度选择器，去除默认的padding
      ///deep/ th {
      //  padding: 0 ;
      // }
      .el-table__header-wrapper .el-table__header{
        width: 100%;
      }
      /deep/ .el-table__header-wrapper .el-checkbox__input::after {
        content: '交货';
        position: absolute;
        margin-left: 5px;
        font-size :2px;
        float: left;
        color: red;
        letter-spacing: 3px;
        margin-top: 1px;
      }
      /deep/ td {
        padding: 0 ;
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
        width: convert(130);
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
