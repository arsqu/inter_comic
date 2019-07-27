import fetch from './fetch'

// var comUrl = location.origin;
var comUrl = '';
var base = '/api/v1';

const crossUrl = {
  'category': base + '/home',
  'detail': base + '/mediaDetail',
  'weekList': base + '/weekList',
  'flag': base + '/clickList',
  'isOver': base + '/overList',
  'payTyp': base + '/payTypList',
  'allChapter': base + '/chapterList',
  'Chapter': base + '/chapterDetail',
  'Chapter': base + '/chapterDetail',
  'groupItem': base + "/groupList"
}

//获取漫画类目
function getCateGory() {
  return fetch.getData(comUrl + crossUrl.category);
}

//获取漫画详情
function getDetail(param) {
  return fetch.getData(comUrl + crossUrl.detail, param);
}

//获取更新日期表
function getUpDate(param) {
  return fetch.getData(comUrl + crossUrl.weekList, param);
}

//获取自定义排行信息
function getCusRank(key, param) {
  return fetch.getData(comUrl + crossUrl[key], param)
}

//获取章节
function getAllChapter(param) {
  return fetch.getData(comUrl + crossUrl.allChapter, param)
}

//获取章节详情
function getChapter(param) {
  return fetch.getData(comUrl + crossUrl.Chapter, param);
}

//获取某个分类的漫画
function getGroupItem(param) {
  return fetch.getData(comUrl + crossUrl.groupItem, param)
}



//获取搜索结果
function getSearch(v) {
  return fetch.getData(comUrl + apiUrl.getSearch, { val: v });
}


//获取广告
function getBanner() {
  return fetch.getData(comUrl + apiUrl.banner);
}


//获取更新数据
function getUpload() {
  return fetch.getData(comUrl + apiUrl.updateTime);
}

export default {
  getCateGory,
  getDetail,
  getUpDate,
  getCusRank,
  getAllChapter,
  getChapter,
  getGroupItem,

  getBanner,
  getUpload,
  getSearch
}