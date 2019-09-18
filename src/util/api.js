import fetch from './fetch'

/*** 生产环境 ***/
var comUrl = '';
var nextUrl = 'http://161.117.178.26:8080';

/***  mock测试数据 ***/
// var comUrl = '/test'; //mock数据
// var nextUrl = '/test'; //mock数据

/***  测试环境 ***/
// var comUrl = '/go'; //go
// var nextUrl = '/java'; //java
var base = '/api/v1';
//chapter/chapterList

const crossUrl = {
  'login': '/ulogin/loginUser',
  'register': '/ulogin/addMediaUser',
  'code': '/ulogin/code',
  'hasMoney': '/ulogin/UserMoney',
  'recharge': '/pay/recharge',
  'currencyUnit': '/contry/cinfo',
  // 'getAllChapter': '/chapter/chapterList',
  'hasRecord': '/record/AllRecord',
  'buyChapter': "/record/payRecord",
  'getBookList': base + '/home',
  'getMore': base + "/groupList",
  'getDetail': base + '/mediaDetail',
  'getAllChapter': base + '/chapterList',
  'weekList': base + '/weekList',
  'flag': base + '/clickList',
  'isOver': base + '/overList',
  'payTyp': base + '/payTypList',
  'Chapter': base + '/chapterDetail'
}

function getUrl(obj, key, val) {
  return new Function('a', 'return null==' + val + '?a.' + key + ':(a.' + key + '=' + val + ',a)')(obj);
}

function getData(key, param, config) {
  var url = getUrl(crossUrl, key);
  return fetch.getData(comUrl + url, param, config);
}

function postData(key, param, config) {
  var url = getUrl(crossUrl, key);
  return fetch.postData(comUrl + url, param, config);
}

function getDataN(key, param, config) {
  var url = getUrl(crossUrl, key);
  // console.log(nextUrl + url);
  return fetch.getData(nextUrl + url, param, config);
}

function postDataN(key, param, config) {
  var url = getUrl(crossUrl, key);
  return fetch.postData(nextUrl + url, param, config);
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
  getData,
  postData,
  getDataN,
  postDataN,

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