// 自适应图片
const oss = 'x-oss-process=image/auto-orient,1/quality,q_100/resize,m_lfit,limit_1,w_';
const Wid = window.screen.width;
const autoImg = {
  swiper: oss + Wid,
  column: oss + ~~(Wid >= 768 ? Wid / 3 : Wid), //index
  gaussian: oss + 365, //new_detl 固定宽度
  list: oss + ~~(Wid >= 768 ? Wid / 2 : Wid), //listModule 固定宽度
  chapterView: oss + (Wid <= 768 ? 768 : Wid), //章节详情 auto Height
}

var browser = {
  versions: function () {
    var u = navigator.userAgent
    return {
      trident: u.indexOf('Trident') > -1, //IE
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//firefox
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //mobile
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
      iPhone: u.indexOf('iPhone') > -1, //iPhone、QQHD浏览器
      iPad: u.indexOf('iPad') > -1,
      webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1, //wechat
      qq: u.match(/\sQQ/i) == " qq"
    };
  }(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
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

// alert(navigator.userAgent)

// 路由
const Router = {
  // login: 'userCtrl', //登录路由
  login: 'login', //登录路由
  charging: 'new_charging' //充值
}

const Header = {
  headerShow: ['new_view', 'new_infos'],
  customTxt: [
    "groupItem", "new_detl", "new_view", "new_info", "userCtrl", "login", "register", "main"
  ],
  colorIcon: [
    "new_charging",
    "new_week",
    "info_detl",
    "search",
    "feedback"
  ]
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
  // 有底色的导航栏
  colorIcon: Header.colorIcon,
  // 自定义标题文字
  customTxt: Header.customTxt,
  // 是否显示Tabbar
  showTabbar: false,
  // 不显示Tabbar
  hideTab: Tabbar.hideTab,
  // 是否显示下载apk 并根据url的isApp参判断是否在webview中运行
  showDownload: process.env.APP_DOWN ? ((getQueryString('isApp') || localStorage.getItem('isApp')) ? false : true) : false,
  // 下载显示的区域
  isDown: ['main'],
  //'main'
  downUrl: '/static/download/MangaLine_20191122.apk' //apk下载地址
}