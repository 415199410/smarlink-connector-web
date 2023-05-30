<template>
  <div class="shop-list">
    <div class="header">
      <div class="count"></div>
      <div class="desc"></div>
      <div class="text"></div>
    </div>
    <div class="search-wrap">
      <form class="search-form">
        <el-select size="mini" class="selectInfo" placeholder="搜索条件" @change='stateChange' v-model="stateForm.state">
          <el-option v-for="state in stateAll"
                     :key="state.label"
                     :label="state.label"
                     :value="state.state"></el-option>
        </el-select>
      </form>
      <form class="search-form" action > <!-- @submit="search($event)" -->
        <input
          type="text"
          autocomplete="off"
          placeholder="输入搜索值"
          v-model="customerName"
        />
      </form>
    </div>
    <div class="search-wrap-copy">
      <form class="search-form">
        <el-select size="mini" class="selectInfo" placeholder="搜索条件" @change='stateChangeList' v-model="stateFormList.state">
          <el-option v-for="state in stateList"
                     :key="state.label"
                     :label="state.label"
                     :value="state.state"></el-option>
        </el-select>
      </form>
      <form class="search-form" action>
        <el-button class ="buttonType" type="primary" @click="searchResuleAll($event)">全部</el-button>
      </form>
      <form class="search-form" action>
        <el-button class ="buttonType" type="primary" @click="searchResule($event)">搜索</el-button>
      </form>
    </div>
    <div class="content-wrap">
      <ul class="list">
        <li class="item"  v-for="(item, index) in data" >
          <div class="name">❐GD-{{item.orderName}}
            <span class ="statusClass" style="font-size:10px;">[{{item.orderStatus}}]</span>&#12288;
            <span @click="selectImple(item.orderCode)" :id =item.orderCode
                  style="font-size:10px;color: red;font-size: 14px;">{{item.groupValue}}</span>
          </div>
          <div class="address">
            <i class="iconfont iconjutidizhi"></i>
            <span>客户：{{item.customerName}}</span>
          </div>
          <div class="address">
            <i class="iconfont iconjutidizhi"></i>
            <span>供应商：{{item.vendorSample}}</span>
          </div>
          <div class="address">
            <i class="iconfont iconjutidizhi"></i>
            <span>任务日期：{{item.createDate}}</span>
          </div>
          <div class="address">
            <i class="iconfont iconjutidizhi"></i>
            <span class ="stateColor">任务状态：{{item.status}}</span>
          </div>
          <div class="more">
            <span @click="selectStyle(item.orderCode)">详情信息</span>
            <i class="iconfont iconjiantou"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
let loading;
    export default {
        name: "shop-list",
        data() {
            return {
                data: [],
                gdState:" ",
                selectResult :" ",
                selectType:" ",
                customerName: "",
                stateAll:[
                    {
                        lable:'0',
                        state:'全部'
                    },
                    {
                        lable:'1',
                        state:'采购合同号'
                    },{
                        lable:'2',
                        state:'供应商'
                    },{
                        lable:'3',
                        state:'货品'
                    },{
                        lable:'4',
                        state:'主产品客户货号'
                    },{
                        lable:'5',
                        state:'部门'
                    },{
                        lable:'6',
                        state:'客户'
                    }
                ],
                stateList:[{
                    lable:'0',
                    state:'全部'
                },{
                    lable:'7',
                    state:'跟进中'
                },{
                    lable:'6',
                    state:'部分完工'
                },{
                    lable:'5',
                    state:'全部完工'
                }
                ],
                stateForm:{
                    lable:'0',
                    state:'全部'
                },
                stateFormList:{
                    lable:'0',
                    state:'状态'
                },
                total: 0,
                options: {
                    pullUpLoad: true,
                    probeType: 3
                },
                params: {
                    createrCode: this.GLOBAL.userInfo.userCode,
                    page: 1,
                    pageSize: 10
                },
                scrollY: 0
            };
        },
        created() {
            let inputValiue =" ";
            let type ="0";
            let gdState ="0";
            let userInfo = JSON.parse(localStorage.getItem('user'));
            let userNsCode = userInfo.userReal;
            //if(localStorage.getItem(userNsCode+"beLeve") != null){
            if(localStorage.getItem("gd"+userNsCode+"inputValiue") != null){
                inputValiue = localStorage.getItem("gd"+userNsCode+'inputValiue');
                this.customerName = inputValiue;
            }
            if(localStorage.getItem("gd"+userNsCode+"type") != null){
                type = localStorage.getItem("gd"+userNsCode+'type');
                let typeCode = localStorage.getItem("gd"+userNsCode+"typeCode");
                this.stateForm.state= typeCode;
            }
            if(localStorage.getItem("gd"+userNsCode+"gdState") != null){
                gdState = localStorage.getItem("gd"+userNsCode+'gdState');
                let gdStateCode =  localStorage.getItem("gd"+userNsCode+"gdStateCode");
                this.stateFormList.state = gdStateCode;
            }
            //  }
            //localStorage.removeItem(userNsCode+"beLeve")
            this.getData(inputValiue,type,gdState);
        },
        /* beforeRouteEnter (to, from, next) {
           if (from.path == "/storeDetail") {
             let userInfo = JSON.parse(localStorage.getItem('user'));
             let userNsCode = userInfo.userReal;
             localStorage.setItem(userNsCode+"beLeve","1");
            }
           next();
         },*/
        methods: {
            //点击li跳转界面
            selectStyle(orderCode){
                this.$router.push({path: 'storeDetail', query: {orderCode: orderCode}})
                return;
            },
            getData(inputValiue,type,gdState) {
                loading = this.$loading({
                lock: true,
                text: 'Loading...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
                });
                this.data =[];
                let userInfo = JSON.parse(localStorage.getItem('user'));
                let userNsCode = userInfo.userReal;
                this.$methods.http("wx/sys/sys/dict/searchResult", {inputValue:inputValiue,userNsCode:userNsCode,type:type,gdState:gdState}).then(res => {
                    this.data = this.data.concat(res);
                });
              loading.close();
            },
            //设置状态下拉框事件
            stateChange(id){
                this.stateForm.lable=id;
                var obj = {};
                //stateAll是下拉列表绑定的数组
                obj = this.stateAll.find(function(item){
                    return item.state === id
                })
                this.stateForm.state= obj.state;
                this.stateForm.lable= obj.lable;
                this.customerName ="";
            },
            //设置状态下拉框事件
            stateChangeList(id){
                this.stateFormList.lable=id;
                var obj = {};
                //stateAll是下拉列表绑定的数组
                obj = this.stateList.find(function(item){
                    return item.state === id
                })
                this.stateFormList.state= obj.state;
                this.stateFormList.lable= obj.lable;
                this.gdState = obj.lable;
            },
            /*search(event) {
                //获取输入框的值
                let inputValiue = this.params.customerName;
                let type = this.stateForm.lable;
                console.log(type)
                event.preventDefault()
                this.params.page = 1
                this.data = []
                this.selectResult = inputValiue;
                this.selectType = type;
                //this.getData(inputValiue,type," ")
            },*/
            searchResule(event){
                let userInfo = JSON.parse(localStorage.getItem('user'));
                let userNsCode = userInfo.userReal;
                let selectValue = this.customerName;
                let typeValue = this.stateForm.lable;
                let gdStateValue = this.stateFormList.lable;
                let typeCode = this.stateForm.state;
                let gdStateCode = this.stateFormList.state;
                localStorage.setItem("gd"+userNsCode+"inputValiue",selectValue);
                localStorage.setItem("gd"+userNsCode+"type",typeValue);
                localStorage.setItem("gd"+userNsCode+"gdState",gdStateValue);
                localStorage.setItem("gd"+userNsCode+"typeCode",typeCode);
                localStorage.setItem("gd"+userNsCode+"gdStateCode",gdStateCode);
                this.getData(selectValue,typeValue,gdStateValue);
            },
            searchResuleAll(event){
                let userInfo = JSON.parse(localStorage.getItem('user'));
                let userNsCode = userInfo.userReal;
                this.customerName = " ";
                this.stateForm.state= '全部';
                this.stateFormList.state = '全部';
                localStorage.removeItem("gd"+userNsCode+"inputValiue")
                localStorage.removeItem("gd"+userNsCode+"type")
                localStorage.removeItem("gd"+userNsCode+"gdState")
                localStorage.removeItem("gd"+userNsCode+"typeCode")
                localStorage.removeItem("gd"+userNsCode+"gdStateCode")
                this.getData(" ","0","0");
            },
            //设置重要性排序
            selectImple(orderCode){
                var state ='';
                var oldValue = document.getElementById(orderCode).innerText;
                if(oldValue =='☆'){
                    state ='2';
                    document.getElementById(orderCode).innerText="★";
                }else if(oldValue =='★'){
                    state ='1';
                    document.getElementById(orderCode).innerText="☆";
                }
                this.$methods.http("wx/sys/sys/dict/searchGroupResult", {orderCode:orderCode,state:state}).then(res => {
                    window.location.reload();
                });
            },
            onPullingUp() {
                console.log(123)
                if(this.data.length>=this.total) {
                    console.log(123)
                    this.$refs.shopListScroll.forceUpdate()
                    return
                }
                this.params.page++;
                this.getData();
            },
            scroll(obj) {
                this.scrollY = obj.y
            }
        }
    };
</script>
<style lang="stylus" scoped>
  @import '../../../assets/css/index.styl';

  input::-webkit-input-placeholder {
    color: #EAEAEA !important;
  }

  input:-moz-placeholder {
    color: #EAEAEA !important;
  }

  input::-moz-placeholder {
    color: #EAEAEA !important;
  }

  input:-ms-input-placeholder {
    color: #EAEAEA !important;
  }

  input[type="search"]::-webkit-search-cancel-button{
    display: none;
    -webkit-appearance: none;
  }



  .shop-list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;


    .header {
      flex: none;
      height: convert(100);
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

      .text {
        margin-top: convert(5);
        font-size: convert(12);
      }
    }
    .buttonType {
      padding: 6px; 6px ;
      margin: 0 0 0 0rem;
      width :80px;
    }
    .search-wrap-copy {
      flex: none;
      height: convert(63);
      display: flex;
      align-items: center;
      //justify-content: center;
      position: relative;
      background-color: #fff;
      border-bottom: convert(3) solid #F4F6F8;
      width:100%;
      .selectInfo{
        width:70%;
      }
      .search-form {
        position relative
        width 80%;
        left: convert(15);
      }
      input {
        width: 85%;
        height: convert(29);
        outline: none;
        border: 1px solid #E3E3E3;
        //border-radius: 16px;
        padding: 0 convert(16) 0 convert(47);
        //margin 0 auto;
        display block;
      }

      i {
        color: #EAEAEA;
        position: absolute;
        top: 50%;
        left: convert(10);
        transform: translateY(-50%);
      }
    }
    .search-wrap {
      flex: none;
      height: convert(63);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      background-color: #fff;
      border-bottom: convert(3) solid #F4F6F8;
      width:100%;
      .selectInfo{
        width:70%;
      }
      .search-form {
        position relative
        width 80%;
        left: convert(15);
      }
      input {
        width: 85%;
        height: convert(29);
        outline: none;
        border: 1px solid #E3E3E3;
        //border-radius: 16px;
        padding: 0 convert(16) 0 convert(47);
        //margin 0 auto;
        display block;
      }

      i {
        color: #EAEAEA;
        position: absolute;
        top: 50%;
        left: convert(32);
        transform: translateY(-50%);
      }
    }

    .content-wrap {
      flex: 1;
      overflow: auto;

      .list {
        padding: 0 convert(15);

        .item {
          border-bottom: convert(2) solid #F4F6F8;
          height: convert(135); //100
          background-color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          line-height: 1;

          &:last-child {
            border: none;
          }

          .name {
            font-size: convert(14);
            color: #414141;
            text-overflow-e();
          }

          .area {
            display: flex;
            align-items: center;
            margin-top: convert(8);
            width 60%

            i {
              color: #28BF62;
              font-size: convert(13);
            }

            span {
              margin-left: convert(11);
              color: #AFAFAF;
              font-size: convert(12);
              text-overflow-e();
            }
          }

          .address {
            display: flex;
            align-items: center;
            margin-top: convert(10);

            i {
              color: #28BF62;
              font-size: convert(14);
            }

            span {
              margin-left: convert(10);
              color: #AFAFAF;
              font-size: convert(12);
              text-overflow-e();
            }
            .stateColor{
              color: #8C8C00  	;
            }
          }

          .more {
            position: absolute;
            right: convert(29);
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            align-items: center;

            span {
              color: #AFAFAF;
              font-size: convert(12);
            }

            i {
              color: #AFAFAF;
              font-size: convert(12);
              margin-left: convert(5);
            }
          }
        }
      }
    }
  }
</style>
