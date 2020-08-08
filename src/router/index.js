import router from './routes'
import config from '../util/config' //漫画全局配置

// function changeTitle() {
//   var siteMap = {
//     '192.168.1.103': 'Mangahub'
//   }
//   var hostname = location.hostname,
//     siteDetl = siteMap[hostname] || siteMap['www.' + hostname] || {};
//   document.title = siteDetl
//   document.querySelector('meta[itemprop="name"]').content = siteDetl
//   document.querySelector('meta[itemprop="description"]').content =
//     document.querySelector('meta[itemprop="description"]').content = 'Read manga online including Savita Bhabhi updated at Mangahub every week. Our aim is to bring the latest high quality manga not only from India local but also from Korea,Japan and China for Indian Manga readers'
// }

var local = localStorage;

var ch = local.getItem('wap_ch') || 'none',
  loginView = config.loginView, // 登录后查看的页面
  statistics = ['new_charging', 'main', 'register']; //统计页面
router.beforeEach((to, from, next) => {
  var isLogin = local.getItem('isLogin');
  if (to.name == 'login' && to.name != 'register') {
    local.setItem('loginUrl', from.fullPath);
  }
  var lang = navigator.browserLanguage || navigator.language;
  if (lang.slice(0, 2).indexOf('zh') != -1) { //非中文环境
    if (to.name == '406')
      next();
    else
      next('/406');
  } else {
    if (_hmt) {
      // 统计所有页面浏览量
      // if (statistics.indexOf(to.name) != -1) {
      _hmt.push(['_trackPageview', to.path + '?ch=' + ch]);
      // }
    }
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
  }
});

export default router