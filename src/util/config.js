// 语言
const lang = {
  hi: 'Hindee',
  en: 'English'
}

// 自适应图片
const oss = 'x-oss-process=image/auto-orient,1/quality,q_100/resize,m_lfit,limit_1,w_';
const Wid = window.screen.width;
const autoImg = {
  swiper: oss + Wid,
  // column: oss + ~~(Wid / 3), //index
  column: oss + ~~(Wid >= 768 ? Wid / 3 : Wid), //index
  gaussian: oss + 365, //new_detl 固定宽度
  // list: oss + 165, //listModule 固定宽度
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

// alert(navigator.userAgent)

//download
const downUrl = '/static/download/MangaLine_20191122.apk';

// 路由
const Router = {
  // login: 'userCtrl', //登录路由
  login: 'login', //登录路由
  charging: 'new_charging' //充值
}

export default {
  lang, autoImg, Router, downUrl
}