// 自适应图片
const oss = 'x-oss-process=image/auto-orient,1/quality,q_60/resize,m_lfit,limit_1,w_';
const Wid = window.screen.width;
const autoImg = {
  swiper: oss + Wid,
  column: oss + ~~(Wid >= 768 ? Wid / 3 : Wid), //index
  gaussian: oss + 365, //new_detl 固定宽度
  list: oss + ~~(Wid >= 768 ? Wid / 2 : Wid), //listModule 固定宽度
  // chapterView: oss + (Wid <= 768 ? 768 : Wid), //章节详情 auto Height
  chapterView: oss + Wid, //章节详情 auto Height
}

// 获取url参数
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}

// 是否为Apk包
if (getQueryString('isApp')) {
  localStorage.setItem('isApp', '1')
}

// 路由
const Router = {
  login: 'login', //登录路由
  charging: 'new_charging' //充值
}

var defHide = ['new_view', 'new_infos']
var siteHeader = {
  'pmanga': ['new_view', 'new_infos', 'new_charging'],
  'novel': ['new_view']
}

const Header = {
  headerShow: siteHeader[process.env.OUT_PUT] ? siteHeader[process.env.OUT_PUT] : defHide
}

const Tabbar = {
  hideTab: ['new_detl', 'new_view', 'info_detl', 'groupItem', 'newInfo', 'feedback', 'login', 'register', '406', 'notFound']
}

export default {
  autoImg,
  Router,
  //语言包
  lang: {
    hi: 'Hindee',
    en: 'English'
  },
  //需要登录显示的页面
  loginView: [
    // 'new_detl', 
    // 'new_view'
  ],
  tabItem: {
    bookmark: [''],
  },
  // 不显示Header
  headerShow: Header.headerShow,
  // 是否显示Tabbar,目前开启需要手动静态引入
  showTabbar: false,
  // 不显示Tabbar的页面
  hideTab: Tabbar.hideTab,
  // 是否显示下载apk 并根据url的isApp参判断是否在webview中运行
  showDownload: process.env.APP_DOWN ? ((getQueryString('isApp') || localStorage.getItem('isApp')) ? false : true) : false,
  // 下载显示的区域
  isDown: ['main'],
  //'main'
  downUrl: '/static/download/MangaLine_20191122.apk' //apk下载地址
}