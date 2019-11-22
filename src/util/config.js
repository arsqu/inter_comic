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