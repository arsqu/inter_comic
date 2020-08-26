import '@/assets/css/common.styl' //公共样式
import '@/assets/css/resetui.css' //重置样式
import 'amfe-flexible' //自适应
import 'x/css/spec.styl'
import instance from '@/util/instance' //axios配置
import api from '@/util/api' //接口
import config from '@/util/config' //漫画全局配置 
import project from '@/util/project'
import i18n from '../i18n' //国际化
import util from '@/util/util' //通用方法
import router from '../router'
import plugin from '../plugins' //自定义组件
import App from './App'
import lazyload from 'vue-lazyload'

Vue.use(lazyload, {
  attempt: 1,
  filter: {
    progressive(listener, options) {
      const isCDN = /https?:\/\//
      // console.log(listener)
      if (!isCDN.test(listener.src)) {
        listener.src = process.env.IMG_PATH + '/' + listener.src
      }
    }
  }
})

Vue.prototype.i18n = i18n
Vue.config.productionTip = false
Vue.prototype.$axios = instance
Vue.prototype.$api = api //请求地址
Vue.prototype.$config = config
Vue.prototype.$project = project
Vue.prototype.$util = util

//全局通信
Vue.prototype.$bus = new Vue();

// window.vm = 
new Vue({
  el: '#app',
  router,
  i18n,
  render: h => h(App)
})