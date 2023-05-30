<template>
  <div>
    <div class="search-code">
      <!--<el-date-picker v-model="selectMonth" type="date" placeholder="选择日期"  format="yyyy-MM-dd">
      </el-date-picker>
      <el-button class ="buttonType" type="primary" >搜索</el-button> -->
    </div>
    <el-card shadow="always" style="height:590px; overflow:auto">
    <div>
      <el-collapse accordion>
        <el-collapse-item v-for="(list,index) in noticeData" :key="index">
          <template slot="title">
            <span class="actived">[已读]</span>
            <b>{{list.title}}</b><i class="el-icon-alarm-clock ">{{list.date}}</i>
           </template>
          <div v-if="list.type ==2">{{list.content}}<br/><a :href="'https://ai.nuerabeauty.com:19015/pages/#/formLoad?orderCode='+list.orderCode"
                                                             style="color: darkorange;font-size: 10px;text-align: right;display: block;">&#12288;任务跳转>></a></div>
          <div v-if="list.type ==1">{{list.content}}<br/><a :href="'https://ai.nuerabeauty.com:19015/pages/#/storeDetail?orderCode='+list.orderCode"
                                                             style="color: darkorange;font-size: 10px;text-align: right;display: block;">&#12288;任务跳转>></a></div>
        </el-collapse-item>
      </el-collapse>
    </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "notice",
  data(){
    return{
      selectMonth:'',
      noticeData: []
    }
  },
  created() {
    this.getNotice();
  },
  methods:{

    //获取通知
    getNotice(){
        let userInfo = JSON.parse(localStorage.getItem('user'));
        let userNsCode = userInfo.userReal;
        this.$methods.http("wx/sys/sys/mes/searchReadResult",{userNsCode:userNsCode}).then(res => {
        this.noticeData = this.noticeData.concat(res);
      });
    },
    show_collapse(index){
      //alert(index)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../../assets/css/convert.styl';
.buttonType {
  padding: 5px; 10px ;
  margin: 0 0 0 0.5rem;
}
.search-code {
  flex: none;
  height: convert(80);
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
    left: convert(56); //32
    transform: translateY(-50%);
  }
}
.el-collapse{border:none;}
.el-collapse div:last-child > div div{border:none;}
.el-collapse-item__header{position:relative;font-size:16px;justify-content:space-between;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.el-collapse-item__header b{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:normal;}
.is-active b{padding-left:20px;transition:all .5s;}
.el-collapse-item__header .time{position:absolute;right:30px;font-size:14px;}
.el-icon-alarm-clock:before{margin-right:10px;}
.el-collapse-item__header span{font-size:12px;color:brown;margin-right:10px;}
.el-collapse-item__header span.actived{color:#666;}
.el-collapse-item__content{font-size:14px;line-height:26px;padding:30px 20px;color:#666;background:#f8f8f8;}
</style>
