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
      <form class="search-form" action @submit="search($event)">
        <input
          type="text"
          autocomplete="off"
          placeholder="输入搜索值"
          v-model="params.customerName"
        />
      </form>
    </div>
    <div class="content-wrap">
      <ul class="list">
        <li class="item" @click="selectStyle(item.orderCode)" v-for="(item, index) in data" >
          <div class="name">❐YH-{{item.orderName}} <span class ="statusClass" style="font-size:10px;">[{{item.orderStatus}}]</span></div>
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
            <span>详情信息</span>
            <i class="iconfont iconjiantou"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
    export default {
        name: "coverage-list",
        data() {
            return {
                data: [],
                stateAll:[{
                    lable:'0',
                    state:'采购合同号'
                },{
                    lable:'1',
                    state:'供应商'
                }
                ],
                stateForm:{
                    lable:'0',
                    state:'采购合同号'
                },
                total: 0,
                options: {
                    pullUpLoad: true,
                    probeType: 3
                },
                params: {
                    createrCode: this.GLOBAL.userInfo.userCode,
                    customerName: "",
                    page: 1,
                    pageSize: 10
                },
                scrollY: 0
            };
        },
        created() {
            let inputValiue ="";
            let type ="";
            let userInfo = JSON.parse(localStorage.getItem('user'));
            let userNsCode = userInfo.userReal;
            if(localStorage.getItem("pk"+userNsCode+"inputValiue") != null){
                inputValiue = localStorage.getItem("pk"+userNsCode+'inputValiue');
                this.params.customerName = inputValiue;
            }
            if(localStorage.getItem("pk"+userNsCode+"type") != null){
                type = localStorage.getItem("pk"+userNsCode+'type');
                let typeCode = localStorage.getItem("pk"+userNsCode+"typeCode");
                this.stateForm.state= typeCode;
            }
            this.getData(inputValiue,type);
        },
        methods: {
            //点击li跳转界面
            selectStyle(orderCode){
                this.$router.push({path: 'formLoad', query: {orderCode: orderCode}})
                return;
            },
            getData(inputValiue,type) {
                let loading = this.$loading({
                lock: true,
                text: 'Loading...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
                });
                let userInfo = JSON.parse(localStorage.getItem('user'));
                let userNsCode = userInfo.userReal;
                this.$methods.http("wx/sys/sys/dict/conSearchResult", {inputValue:inputValiue,userNsCode:userNsCode,type:type,formType:'4'}).then(res => {
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
            },
            search(event) {
                //获取输入框的值
                let userInfo = JSON.parse(localStorage.getItem('user'));
                let userNsCode = userInfo.userReal;
                let inputValiue = this.params.customerName;
                let type = this.stateForm.lable;
                if(inputValiue ==''){
                    if(localStorage.getItem("pk"+userNsCode+"inputValiue") != null){
                        localStorage.removeItem("pk"+userNsCode+'inputValiue');
                        this.params.customerName = "";
                    }
                    if(localStorage.getItem("pk"+userNsCode+"type") != null){
                        localStorage.removeItem("pk"+userNsCode+"typeCode");
                        this.stateForm.state= "";
                    }
                }else{
                    localStorage.setItem("pk"+userNsCode+"inputValiue",inputValiue);
                    localStorage.setItem("pk"+userNsCode+"type",type);
                }
                event.preventDefault();
                this.params.page = 1;
                this.data = [];
                this.getData(inputValiue,type)
            },
            onPullingUp() {
                if(this.data.length>=this.total) {
                    this.$refs.shopListScroll.forceUpdate()
                    return
                }
                this.params.page++;
                this.getData();
            },
            toDetail(item) {
                this.$router.push({path: '/drugDetail', query: {id: item.customerCode}})
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
        .selectInfo{
          width:70%;
        }
        .item {
          border-bottom: convert(2) solid #F4F6F8;
          height: convert(120); //100
          background-color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          line-height: 1.2;

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
