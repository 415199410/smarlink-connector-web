<template>
    <div class="mine">
        <div class="header">
            <div class="left">
                <img :src="GLOBAL.userInfo.headImgUrl">
            </div>
            <div class="right">
                <div class="text">
                    <div class="name">{{GLOBAL.userInfo.userName}}</div>
                    <div class="type">
                        <img src="./1.png" >
                        <span>{{GLOBAL.userInfo.userTypeName}}</span>
                    </div>
                </div>
                <div class="info">
                    <div class="item">
                        <div class="desc">联系电话</div>
                        <div class="desc">{{GLOBAL.userInfo.contactTel}}</div>
                    </div>
                    <div class="item">
                        <div class="desc">工号</div>
                        <div class="desc">{{GLOBAL.userInfo.workNo}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="form">
            <div class="item" @click="changePhone">
                <i class="iconfont icongenggailianxifangshi"></i>
                <span>更改联系电话</span>
            </div>
            <div class="item" @click="back">
                <i class="iconfont iconzhuxiao"></i>
                <span>退出</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'mine',
    methods: {
        back() {
            this.$methods.http('wx/personal/sys/token/logout')
            .then(res=>{
                sessionStorage.removeItem(this.GLOBAL.tokenName)
                WeixinJSBridge.call('closeWindow')
            })

        },
        changePhone() {
            this.$router.push('/changePhone')
        }
    }
}
</script>
<style lang="stylus" scoped>
@import '../../../assets/css/index.styl'
.mine
    width 100%
    height 100%
    background-color #ffffff
    line-height 1.5
    .header {
        display flex
        padding convert(38) convert(25) convert(15)
        .left {
            img{
                width convert(63)
                height convert(63)
                border-radius 50%
            }
        }
        .right {
            flex 1
            overflow hidden
            margin-left convert(21)
            .text {
                display flex
                .name {
                    font-size convert(26)
                    font-weight bold
                    color #383838
                }
                .type {
                    position relative
                    height convert(23)
                    margin-left convert(21)
                    img {
                        width convert(72)
                    }
                    span {
                        position absolute
                        left convert(23)
                        top 50%
                        transform translateY(-50%)
                        font-size 10px
                        color #fff
                    }
                }
            }
            .info {
                display flex
                margin-top convert(14)
                .item {
                    color #707070
                    font-size 12px
                    line-height 1.5
                    padding 0 15px
                    border-right 1px solid #EAEAEA
                    display flex
                    flex-direction column
                    flex-wrap wrap
                    &:last-child {
                        border none
                    }
                    .desc {
                        white-space pre-wrap
                        word-wrap break-word
                        overflow hidden
                    }
                }
            }
        }
    }
    .form {
        border-top convert(5) solid #F0F0F0
        padding 0 convert(25)
        .item {
            height convert(60)
            display flex
            border-bottom 1px solid #EAEAEA
            align-items center
            &:last-child {
                border none
            }
            i {
                font-size 12px
                color #28BF62
            }
            span {
                color #707070
                cont-size convert(15)
                margin-left convert(8)
            }
        }
    }
</style>

