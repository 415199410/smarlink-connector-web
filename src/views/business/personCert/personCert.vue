<template>
  <div class="wrap">
    <div class="content">
      <div class="content-top">
        <img src="./grrz.jpg" />
      </div>
      <div class="content-middle">
        <div class="labelcont">
          <label><span>*</span>姓名：</label>
          <input placeholder="请填写真实姓名" v-model="params.userName" />
        </div>
        <div class="labelcont">
          <label><span>*</span>工号：</label>
          <input placeholder="员工工号" v-model="params.workNo" />
        </div>
        <div class="labelcont">
          <label><span>*</span>手机号：</label>
          <input class="telphone" placeholder="有效个人联系方式" v-model="params.contactTel" />
        </div>
        <div class="labelcontsele">
          <cube-radio-group
            v-model="params.userType"
            :options="options"
            :horizontal="true"
            :hollow-style="true"
          />
        </div>
      </div>
      <button class="sumitbtn" @click="submit">提交认证</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "codeQuery",
  data() {
    return {
      options: [
        {
          label: "销售人员",
          value: 351001
        },
        {
          label: "稽查人员",
          value: 351002
        }
      ],
      params: {
        userCode: this.GLOBAL.wxInfo.openId,
        userName: "",
        nickname: this.GLOBAL.wxInfo.nickName,
        sex: this.GLOBAL.wxInfo.sex,
        userType: "",
        workNo: "",
        contactTel: "",
        headImgUrl: this.GLOBAL.wxInfo.headImgUrl
      },
      ajaxFlag: false
    };
  },
  methods: {
    submit() {
      if (
        !this.$methods.check(this.params, {
          userCode: "用户编码",
          userName: "用户姓名",
          nickname: "用户昵称",
          sex: "性别",
          userType: "用户类型",
          workNo: "工号",
          contactTel: "手机号",
          headImgUrl: "用户头像"
        })
      ) {
        return;
      }
      if(this.ajaxFlag) {
        return
      }
      this.ajaxFlag = true
      const toast = this.$createToast({
        txt: "Loading...",
        mask: true,
        time: 0
      });
      toast.show();
      this.$methods
        .http("wx/personal/sys/user/applyAuth", this.params)
        .then(res => {
          toast.hide();
          this.ajaxFlag = false
          this.$createToast({
            txt: "认证成功",
            type: "txt"
          }).show();
          this.$router.replace({ path: "/examine", query: { flag: 0 } });
        }).catch(()=>{
          this.ajaxFlag = false
          toast.hide();
        });
    }
  }
};
</script>
<style scoped>
</style>
<style lang="stylus" scoped>
@import '../../../assets/css/convert.styl';

.wrap {
  width: 100%;
  height: 100%;

  .content {
    padding-bottom: convert(55);
    height: 100%;
    background-color: #F0F0F0;

    .content-top {
      top: 0;
      left: 0;
      width: 100%;
      height: convert(148);
      z-index: 1;
      // background-color #03a9f4
      border: 0;

      img {
        width: 100%;
      }
    }

    .content-middle {
      position: relative;
      margin-top: convert(-20);
      margin-left: convert(8);
      border-radius: convert(4);
      width: convert(359);
      height: convert(238);
      background-color: #fff;
      z-index: 10;

      .labelcont {
        width: convert(325);
        height: convert(60);
        line-height: convert(60);
        border-bottom: 1px solid #d7dce5;
        border-collapse: collapse;
        font-size: convert(14);
        margin-left: convert(20);

        label {
          color: #4D4C4E;
          span {
            color red
          }
        }

        input {
          border: 0;
          outline: none;
          margin-left: convert(43);
        }

        input::-webkit-input-placeholder {
          color: #aab2bd;
        }

        .telphone {
          margin-left: convert(29);
        }

        .labelcontsele {
          width: convert(325);
          height: convert(60);
          line-height: convert(60);
          margin-left: convert(20);
        }
      }
    }

    .sumitbtn {
      background-color: #28BF62;
      width: convert(359);
      height: convert(50);
      border: 0;
      outline: none;
      text-align: center;
      font-size: convert(16);
      color: #fff;
      margin-left: convert(8);
      margin-top: convert(29);
      border-radius: convert(2);
    }
  }
}
</style>
