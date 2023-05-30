<template>
  <div>
  <div class="search-code">
    <el-date-picker v-model="selectMonth" @change="selectTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"  format="yyyy-MM-dd">
    </el-date-picker>
    <el-button class ="buttonType" type="primary" @click="searchNewInfo($event)">搜索</el-button>
  </div>
    <el-card shadow="always" style="height:590px; overflow:auto">
  <div>
  <el-collapse accordion>
    <el-collapse-item v-for="(list,index) in noticeData" :key="index">
      <template slot="title">
        <span v-if="list.status == 0">[未读]</span>
        <span v-if="list.status == 1" class="actived">[已读]</span>
        <b @click="noticeActive(list.id,list.status,index,list.type)">{{list.title}}</b>
        <b @click="noticeActive(list.id,list.status,index,list.type)" class="el-icon-alarm-clock">{{list.date}}</b>
      </template>
      <div  v-if="list.type ==2">{{list.content}}<br/><a :href="'https://ai.nuerabeauty.com:19015/pages/#/formLoad?orderCode='+list.orderCode"
           style="color: darkorange;font-size: 10px;text-align: right;display: block;">&#12288;任务跳转>></a></div>
      <div  v-if="list.type ==1">{{list.content}}<br/><a :href="'https://ai.nuerabeauty.com:19015/pages/#/storeDetail?orderCode='+list.orderCode"
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
      noticeData: [],
      timeValue:'',
      timeGetValue:''
    }
  },
  created() {
    this.getNotice();
  },
  methods:{
  //获取通知
  getNotice(value){
      if(value==undefined){
        value ='';
      }
      let userInfo = JSON.parse(localStorage.getItem('user'));
      let userNsCode = userInfo.userReal;
      this.noticeData =[];
      this.$methods.http("wx/sys/sys/mes/searchMaResult",{userNsCode:userNsCode,value:value}).then(res => {
      this.noticeData = this.noticeData.concat(res);
    });
    },
    show_collapse(index){
      // alert(index)
    },
    selectTime(value){
      this.timeGetValue = value;
    },
    searchNewInfo(event){
      this.getNotice(this.timeGetValue);
    },
    //设置点击过的系统消息已读  参数消息id 消息是否阅读状态status(1已读,0未读)
    noticeActive(eventId,eventStatus,index,type) { //<!-- -->
      //console.log(eventId,eventStatus);
      if(eventStatus == 0){ //阅读状态是未读提交已读申请
       //  alert(this.noticeData[0]);
        //if (eventStatus==1) {
          //提交成功后更新阅读状态为已读不用重新申请数据也不用刷新页面
        this.$methods.http("wx/sys/sys/mes/upMationInfo",{id:eventId,type:type}).then(res => {
          if(res =='200') {
            this.$set(this.noticeData[index],'status',1);
          }
        });
       // }
      }
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
