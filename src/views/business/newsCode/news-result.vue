<template>
  <el-collapse accordion>
    <el-collapse-item v-for="(list,index) in noticeData" :key="index" >
      <template slot="title">
        <span v-if="list.status == 0">[未读]</span>
        <span v-if="list.status == 1" class="actived">[已读]</span>
        <b @click="noticeActive(list.id,list.status)">{{list.title}}</b><i class="el-icon-alarm-clock time">{{list.create_time.substring(0,11)}}</i></template>
      <div>{{list.content}}</div>
    </el-collapse-item>
  </el-collapse>
</template>
<script>
export default {
  name: "notice",
  data(){
    return{
      noticeData:"",//系统通知数据
    }
  },
  mounted(){
    this.getNotice();
  },
  methods:{
    //获取通知
    getNotice(){

      if (response.data.status==1) {
        console.log(response.data.data)
        this.noticeData = response.data.data;
      }

    },
    //设置点击过的系统消息已读  参数消息id 消息是否阅读状态status(1已读,0未读)
    noticeActive(eventId,eventStatus) {
      console.log(eventId,eventStatus);
      if(eventStatus == 0){ //阅读状态是未读提交已读申请
        if (response.data.status==1) {
          //提交成功后更新阅读状态为已读不用重新申请数据也不用刷新页面
          this.$set(this.noticeData[eventId-1],'status',1);
        }
      }
    }
  }
}
</script>
<style>
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
