import Vue from 'vue'
import axios from 'axios'
// import Mint  from 'mint-ui';
import mintUiCom from './mintUiCom' //局部引入mintUi
import 'mint-ui/lib/style.css'
import './assets/css/common.css' //公共样式
import 'amfe-flexible' //自适应
// import 'default-passive-events'
// import './util/mock' //模拟数据
import api from './util/api'
import router from './router'
import plugin from './plugins' //自定义组件
import i18n from './i18n' //国际化
import App from './App'
// 'x-oss-process=style/imageZoom' //移动端显示漫画

Vue.config.productionTip = false
axios.defaults.baseURL = process.env.API_BASE;
axios.defaults.withCredentials = false
// axios.defaults.baseURL = '/api'
Vue.prototype.$axios = axios
Vue.prototype.$api = api //请求地址
// Vue.use(Mint); //全局引入

//全局通信
Vue.prototype.$bus = new Vue();

new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})