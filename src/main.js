// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "@babel/polyfill"
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import BaiduMap from 'vue-baidu-map'
import vueEsign from 'vue-esign'
import {
  /* eslint-disable no-unused-vars */
  Style,
  CascadePicker,
  Button,
  Upload,
  Radio,
  Toast,
  IndexList,
  Scroll,
  ImagePreview
} from 'cube-ui'

import Global from '@/assets/js/global.js'
import Method from '@/assets/js/methods.js'
import GPSFormat from '@/assets/js/GPSFormat.js'
import VueLazy from 'vue-lazyload'

import '@/assets/css/reset.styl'
import '@/assets/css/global.styl'
import '@/assets/font/iconfont.css'

Vue.use(CascadePicker)
Vue.use(Button)
Vue.use(Upload)
Vue.use(ElementUI)
Vue.use(Radio)
Vue.use(Toast)
Vue.use(IndexList)
Vue.use(Scroll)
Vue.use(ImagePreview)
Vue.use(VueLazy)
Vue.use(vueEsign)

// 配置项
Vue.use(VueLazy, {
  preLoad: 1.3,
  error: '',
  loading: '@/assets/load.gif',
  attempt: 1
})
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'yAGbt8iSISLdbw3c0Iui5CC9P7ZYGhN6'
})
Vue.config.productionTip = false

Vue.prototype.GLOBAL = Global
Vue.prototype.$http = axios
Vue.prototype.$methods = Method
Vue.prototype.$GPSFormat = GPSFormat

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
