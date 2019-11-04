// 语言
const lang = {
  hi: 'Hindee',
  en: 'English'
}

//自适应图片
const oss = 'x-oss-process=image/auto-orient,1/quality,q_100/resize,m_lfit,limit_1,w_';
const Wid = window.screen.width;
const autoImg = {
  swiper: oss + Wid,
  // column: oss + ~~(Wid / 3), //index
  column: oss + ~~(Wid >= 768 ? Wid / 3 : Wid), //index
  gaussian: oss + 365, //new_detl 固定宽度
  // list: oss + 165, //listModule 固定宽度
  list: oss + ~~(Wid >= 768 ? Wid / 2 : Wid), //listModule 固定宽度
  chapterView: oss + Wid, //auto Height
}

export default {
  lang, autoImg
}