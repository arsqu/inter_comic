import router from './routes'
import config from '@/util/config' //漫画全局配置

var local = localStorage;

var loginView = config.loginView; // 登录后查看的页面
router.beforeEach((to, from, next) => {
  console.log('路由跳转')
  if (to.name != 'new_detl') {
    Vue.prototype.$bus.$emit("loading", true);
  }
  var isLogin = local.getItem('isLogin');
  if (to.name == 'login' && to.name != 'register') {
    local.setItem('loginUrl', from.fullPath);
  }
  // var lang = navigator.browserLanguage || navigator.language;
  // if (lang.slice(0, 2).indexOf('zh') != -1) { //非中文环境
  //   if (to.name == '406')
  //     next();
  //   else
  //     next('/406');
  // } else {
  if (loginView.indexOf(to.name) != -1) {
    if (isLogin) {
      next();
    } else {
      // local.setItem('loginUrl', to.name);
      next({ name: config.Router.login })
    }
  } else {
    next();
  }
  // }
});

router.afterEach((to, from, next) => {
  if (to.name != 'new_detl') {
    Vue.prototype.$bus.$emit("loading", false);
  }
})

export default router