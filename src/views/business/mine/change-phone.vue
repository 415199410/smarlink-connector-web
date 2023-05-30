<template>
  <div class="wrap">
    <div class="item">
      <div class="left">原手机号：</div>
      <div class="right">{{GLOBAL.userInfo.contactTel}}</div>
    </div>
    <div class="item">
      <div class="left">新手机号：</div>
      <div class="right">
        <input type="text" v-model="params.contactTel" />
      </div>
    </div>
    <div class="btn" @click="submit">提交</div>
  </div>
</template>
<script>
export default {
  name: "change-phone",
  data() {
    return {
      params: {
        contactTel: ""
      }
    };
  },
  methods: {
    submit() {
      if (!/^[1]\d{10}$/.test(this.params.contactTel)) {
        this.$createToast({
          txt: "手机号格式不正确",
          type: "txt"
        }).show();
        return;
      }
      this.$methods.http('wx/personal/sys/user/update', this.params)
      .then(res=>{
          this.$createToast({
          txt: "修改成功",
          type: "txt"
        }).show();
        this.GLOBAL.userInfo.contactTel = this.params.contactTel
        this.$router.go(-1)
      })
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../../assets/css/index.styl';

.wrap {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  padding: 0 convert(25);

  .item {
    height: convert(90);
    display: flex;
    align-items: center;
    color: #4D4C4E;
    font-size: convert(14);
    border-bottom: 1px solid #EAEAEA;

    &:nth-child(2) {
      border: none;
    }

    .left {
    }

    .right {
      flex: 1;

      input {
        height: convert(35);
        border: 1px solid #EAEAEA;
        width: 100%;
        padding: 0 10px;
      }
    }
  }

  .btn {
    width: 100%;
    line-height: 35px;
    background-color: #28BF62;
    color: #ffffff;
    text-align: center;
    font-size: 14px;
    margin-top: 50px;
  }
}
</style>
