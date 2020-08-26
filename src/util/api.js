import fetch from './fetch'

/***  mock测试 ***/
// var comUrl = '/test'; //mock数据
// var nextUrl = '/test'; //mock数据
// var env = process.env
var comUrl = process.env.SERVER_GO,
  nextUrl = process.env.SERVER_JAVA;
var base = process.env.ENV_CONFIG == 'novel' ? '' : '/api/v1'

const crossUrl = {
  'login': '/ulogin/loginUser',
  'logout': '/ulogin/delLogin',
  'code': '/ulogin/code',
  'hasMoney': '/ulogin/UserMoney',
  'recharge': '/pay/recharge',
  'currencyUnit': '/contry/cinfo',
  // 'getAllChapter': '/chapter/chapterList',
  'hasRecord': '/record/AllRecord',
  'buyChapter': "/record/payRecord",
  search: {
    get: '/media/selectMediaByOr'
  },
  suggest: {
    post: '/feedb/addFeedBack'
  },
  register: {
    create: '/ulogin/addMediaUser',
    getCode: '/ulogin/getCode'
  },
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
  return new Function('a', 'return null ==' + val + '?a.' + key + ':(a.' + key + '=' + val + ',a)')(obj);
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
  // nextUrl = '/test';
  return fetch.getData(nextUrl + url, param, config);
}

function postDataN(key, param, config) {
  var url = getUrl(crossUrl, key);
  // nextUrl = '/test';
  return fetch.postData(nextUrl + url, param, config);
}

function getChapter(param) {
  return fetch.getData(comUrl + crossUrl.Chapter, param);
}

//获取排行记录
function getCusRank(key, param) {
  return fetch.getData(comUrl + crossUrl[key], param)
}

//获取搜索结果
function getSearch(v) {
  return fetch.getData(comUrl + apiUrl.getSearch, { val: v });
}

export default {
  getData,
  postData,
  getDataN,
  postDataN,

  getChapter,
  getCusRank,
  getSearch
}