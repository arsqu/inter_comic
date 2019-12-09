// import mintUiCom from './mintUiCom' //局部引入mintUi
import './assets/css/common.css' //公共样式
import 'amfe-flexible' //自适应
// import 'babel-polyfill'
// import 'default-passive-events'
// import './util/mock' //模拟数据
import instance from './util/instance' //axios配置
import api from './util/api' //接口
import config from './util/config' //漫画全局配置
import i18n from './i18n' //国际化
import util from './util/util' //通用方法
import router from './router'
import plugin from './plugins' //自定义组件
import App from './App'
// import Lazyload from 'mint-ui'
import Lazyload from 'vue-lazyload'
Vue.use(Lazyload, {
  attempt: 1,
  // error: '/static/img/404.png',
  // loading: '/static/img/404.png'
});
console.dir(instance);

Vue.config.productionTip = false
Vue.prototype.$axios = instance
Vue.prototype.$api = api //请求地址
Vue.prototype.$config = config
Vue.prototype.$util = util //请求地址

//全局通信
Vue.prototype.$bus = new Vue();

window.vm = new Vue({
  el: '#app',
  router,
  i18n,
  render: h => h(App)
})