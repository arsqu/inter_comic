// import Vue from 'vue'
import axios from 'axios'
// import mintUiCom from './mintUiCom' //局部引入mintUi
import './assets/css/common.css' //公共样式
import 'amfe-flexible' //自适应
// import 'default-passive-events'
// import './util/mock' //模拟数据
import api from './util/api'
import router from './router'
import plugin from './plugins' //自定义组件
import i18n from './i18n' //国际化
import App from './App'
import Lazyload from 'mint-ui'

Vue.use(Lazyload, {
  attempt: 1
});

//'x-oss-process=style/imageZoom' //移动端显示漫画
Vue.config.productionTip = false
// axios.defaults.baseURL = process.env.API_BASE;
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios
Vue.prototype.$api = api //请求地址

//全局通信
Vue.prototype.$bus = new Vue();

var local = localStorage;
var idx = 0;

//拦截器
axios.interceptors.response.use(function (response) {
  if (response.data.code == 401) {
    console.log('未登录');
    local.setItem('loginTips',++idx);
    if(idx < 4){
      Vue.$toast(i18n.t('tips.tiplogin'));
    }
    local.removeItem("isLogin");
    local.removeItem("uname");
    local.removeItem("money");
    local.removeItem("path");
    // router.push({ name: 'login' });
  }
  return response;
}, function (error) {
  return Promise.reject(error);
});

// router.beforeEach((to, from, next) => {
//   console.log(to, from);
//   if (to.name == 'login' && (from.name != 'login' || from.name != 'register')) {
//     local.setItem('loginUrl', from.path)
//   }
//   next();
// })

new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})