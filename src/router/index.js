import Vue from 'vue'
import Router from 'vue-router'

import Business from '@/views/business/index.js'
import Consumer from '@/views/consumer/index.js'

import Examine from '@/views/examine/examine'
Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    redirect: '/business'
  }, {
    path: '/business',
    name: '业务人员',
    component: Business.index,
    meta: {
      keepAlive: true
    },
    children: [{
      path: '/',
      redirect: '/home'
    }, {
      path: '/home',
      name: '业务人员首页',
      component: Business.home,
      meta: {
        keepAlive: true,
        title: '首页'
      }
    }, {
      path: '/scanNews',
      name: '已读消息列表',
      component: Business.scanNews,
      meta: {
        keepAlive: true,
        title: '消息列表'
      }
    }, {
      path: '/shopList',
      name: '跟单任务',
      component: Business.shopList,
      meta: {
        keepAlive: true,
        title: '跟单任务'
      }
    }, {
      path: '/coverageList',
      name: '品控任务',
      component: Business.coverageList,
      meta: {
        keepAlive: true,
        title: '品控任务'
      }
    }, {
      path: '/mine',
      name: '个人信息',
      component: Business.mine,
      meta: {
        title: '个人信息'
      }
    }]
  }, {
    path: '/scanResult',
    name: '业务人员扫码结果',
    component: Business.scanResult,
    meta: {
      title: '消息列表'
    }
  }, {
    path: '/codeQuery',
    name: '扫码查询',
    component: Consumer.codeQuery,
    meta: {
      title: '扫码查询'
    }
  }, {
    path: '/feedbackInfo',
    name: '信息反馈',
    component: Consumer.feedbackInfo,
    meta: {
      title: '信息反馈'
    }
  }, {
    path: '/addStore',
    name: '验货任务',
    component: Business.addStore,
    meta: {
      title: '验货任务'
    }
  }, {
    path: '/personCert',
    name: '人员认证',
    component: Business.personCert,
    meta: {
      title: '人员认证'
    }
  }, {
    path: '/drugDetail',
    name: '药店详情',
    component: Business.drugDetail,
    meta: {
      title: '门店详情'
    }
  }, {
    path: '/productCoverage',
    name: '审批管理',
    component: Business.productCoverage,
    meta: {
      title: '审批管理'
    }
  }, {
    path: '/examine',
    name: '审核提示页',
    component: Examine,
    meta: {
      title: '提示'
    }
  }, {
    path: '/coverageDetail',
    name: '登记详情',
    component: Business.coverageDetail,
    meta: {
      title: '登记详情'
    }
  }, {
    path: '/changePhone',
    name: '更改手机',
    component: Business.changePhone,
    meta: {
      title: '更改手机'
    }
  }, {
    path: '/feedbackList',
    name: '反馈列表',
    component: Consumer.feedbackList,
    meta: {
      keepAlive: true,
      title: '反馈列表'
    }
  }, {
    path: '/feedbackDetail',
    name: '反馈详情',
    component: Consumer.feedbackDetail,
    meta: {
      title: '反馈详情'
    }
  }, {
    path: '/newsCode',
    name: '消息列表',
    component: Business.newsCode,
    meta: {
      title: '消息列表'
    }
  }, {
    path: '/gpsPosition',
    name: '图片拍照',
    component: Business.gpsPosition,
    meta: {
      title: '图片拍照'
    }
  }, {
    path: '/imageNext',
    name: '图片上传',
    component: Business.imageNext,
    meta: {
      title: '图片上传'
    }
  }, {
    path: '/preview',
    name: '图片显示',
    component: Business.preview,
    meta: {
      title: '图片显示'
    }
  }, , {
    path: '/imageShow',
    name: '图片显示',
    component: Business.imageShow,
    meta: {
      title: '图片显示'
    }
  }, {
    path: '/storeDetail',
    name: '跟单信息',
    component: Business.storeDetail,
    meta: {
      title: '跟单信息'
    }
  }, {
    path: '/annex',
    name: '附件',
    component: Business.annex,
    meta: {
      title: '附件'
    }
  }, {
    path: '/factoryVisit',
    name: '工厂拜访',
    component: Business.factoryVisit,
    meta: {
      title: '工厂拜访'
    }
  }, {
    path: '/formLoad',
    name: '品控信息',
    component: Business.formLoad,
    meta: {
      title: '品控信息'
    }
  }, {
    path: '/coverageIns',
    name: '品控任务（已验货）',
    component: Business.coverageIns,
    meta: {
      title: '品控任务（已验货）'
    }
  }]
})
let vm = new Vue()
router.beforeEach((to, from, next) => {
  if (!vm.$methods.URLFormat()) {
    console.log('URLFormat', vm.$methods.URLFormat());
    return;
    next(false)
  } else {
    console.log('ls', localStorage.getItem('user'));
    if (localStorage.getItem('user') && localStorage.getItem('user') !=undefined && localStorage.getItem('user') != 'undefined' ) {
      console.log(1);
      if (!vm.GLOBAL.user || JSON.stringify(vm.GLOBAL.user) == '{}') {
        vm.GLOBAL.user = JSON.parse(localStorage.getItem('user'));
      }
      next();
    } else if (typeof to.query.code === 'undefined' && (!localStorage.getItem('user') || localStorage.getItem('user') ==undefined || localStorage.getItem('user') == 'undefined')) {
      //开发环境
      console.log(2);
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wwc82919795f0f4640&redirect_uri=https://ai.nuerabeauty.com:19015/pages/&response_type=code&scope=snsapi_base&state=STATE&code=CODE#wechat_redirect'
      next(false)
    } else if (to.query.code && (!localStorage.getItem('user') || localStorage.getItem('user') ==undefined || localStorage.getItem('user') == 'undefined')) {
      vm.$methods.http('wx/WxWork/search', {
        code: to.query.code
      })
        .then(res => {
          console.log(3);
          if (res.status === 'success') {
            console.log('res',res);
            if(!res.user || res.user == null) {
              console.log(23);
              next(false)
            }
            localStorage.setItem('user', JSON.stringify(res.user));
            vm.GLOBAL.user = res.user;
            alert('欢迎登录：' + res.user.name);
            next()
          } else {
            return
          }
        }).catch(data => {

        return
      })
      next(false)
    }
  }
  next(false)
})

export default router

