// import Vue from 'vue'
import axios from 'axios'
// import mintUiCom from './mintUiCom' //局部引入mintUi
import './assets/css/common.css' //公共样式
import 'amfe-flexible' //自适应
// import 'babel-polyfill'
// import 'default-passive-events'
// import './util/mock' //模拟数据
import api from './util/api'
import config from './util/config'
import util from './util/util'
import router from './router'
import plugin from './plugins' //自定义组件
import i18n from './i18n' //国际化
import App from './App'
// import Lazyload from 'mint-ui'
import Lazyload from 'vue-lazyload'
Vue.use(Lazyload, {
  attempt: 1,
  // error: '/static/img/404.png',
  // loading: '/static/img/404.png'
});

Vue.config.productionTip = false
axios.defaults.withCredentials = true

Vue.prototype.$axios = axios
Vue.prototype.$config = Vue.prototype.$config || config
Vue.prototype.$api = api //请求地址
Vue.prototype.$util = util //请求地址

//全局通信
Vue.prototype.$bus = new Vue();

var local = localStorage;
var idx = 0;

//拦截器
axios.interceptors.response.use(function (response) {
  if (response.data.code == 401) {
    // console.log('未登录');
    local.setItem('loginTips', ++idx);
    if (idx < 3) {
      Vue.$toast(i18n.t('tips.tiplogin')); //只提醒三次
    }
    local.removeItem("isLogin");
    local.removeItem("bookId");
    local.removeItem("loginTips");
    local.removeItem("uname");
    local.removeItem("money");
    local.removeItem("path");
    // router.push({ name: 'login' });
  }
  return response;
}, function (error) {
  return Promise.reject(error);
});

var ch = local.getItem('wap_ch') || 'none';
router.beforeEach((to, from, next) => {
  // console.log(to, from);
  // eslint-disable-next-line
  if (_hmt) {
    if (to.name == 'recharge' || to.name == 'main' || to.name == 'register') {
      console.log('trackPageView', '/' + to.name + '?ch=' + ch);
      // eslint-disable-next-line
      _hmt.push(['_trackPageview', '/' + to.name + '?ch=' + ch]); //统计各页面打开的次数
    }
  }
  next();
});

new Vue({
  el: '#app',
  router,
  i18n,
  render: h => h(App)
})