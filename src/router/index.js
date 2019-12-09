import router from './routes'
import config from '../util/config' //漫画全局配置

var local = localStorage;

var ch = local.getItem('wap_ch') || 'none',
  loginView = ['new_detl', 'new_view'], //需要登录的页面
  // statistics = ['recharge', 'main', 'userCtrl']; //统计页面
  statistics = ['recharge', 'main', 'register']; //统计页面
router.beforeEach((to, from, next) => {
  var isLogin = local.getItem('isLogin');
  if (to.name == 'login' && to.name != 'register') {
    local.setItem('loginUrl', from.fullPath);
  }
  var lang = navigator.browserLanguage || navigator.language;
  if (lang.slice(0, 2).indexOf('zh') != -1) { //非中文环境
    // if (navigator.language.slice(0, 2).indexOf('zh') == -1) { //谷歌中文环境测试
    if (to.name == '406')
      next();
    else
      next('/406');
  } else {
    if (_hmt) {
      if (statistics.indexOf(to.name) != -1) {
        _hmt.push(['_trackPageview', '/' + to.name + '?ch=' + ch]);
      }
    }
    if (loginView.indexOf(to.name) != -1) {
      if (isLogin) {
        next();
      } else {
        console.log(from);
        // local.setItem('loginUrl', to.name);
        next({ name: config.Router.login })
      }
    } else {
      next();
    }
  }
});

export default router