// mangaline注册流程简化, 取消邮箱验证, 账号密码即可注册(2020/7/20)
const register = {
  // mangaline 使用账号登录(uname),否则手机或邮箱登录
  showPhone: process.env.ENV_CONFIG == 'mangaCh' ? false : true,
  simple: process.env.ENV_CONFIG == 'mangaCh' ? true : false
}

// 获取url参数
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}

// 是否为渠道推广,渠道推广时网站title隐藏,图片替换
if (getQueryString('ch')) {
  localStorage.setItem('isShare', '1')
}

// 域名对应的网站规则
/**
 * siteName 域名
 * outPut 本地文件夹
 * siteName 域名
 */
const env = process.env.OUT_PUT

const siteMap = {
  // "www.mangaline.com": {
  //   phone: '+91 93709 54921',
  //   siteName: "Mangaline",
  //   webDir: 'Mangaline',
  //   mail: ['bd@mangaline.com', 'cs@mangaline.com']
  // },
  "xulin": {
    siteName: "Manga",
    phone: '+91 93709 54921',
    mail: ['cs@xulinad.com', 'bd@xulinad.com']
  },
  "pmanga": {
    siteName: "aimghub",
    phone: '+91 74291 32896',
    mail: ['cs@aimghub.com', 'bd@aimghub.com']
  },
  "novel": {
    siteName: "Storyind",
    phone: '+91 74280 81833',
    mail: ['help@storyind.com', 'contact@storyind.com']
  },
  // 测试地址
  "192.168.1.103": {
    siteName: "novel",
    phone: '+91 19216 81103',
    mail: ['test@123.com', 'test@456.com']
  }
}

const siteDetl = siteMap[env] || {}

export default {
  register,
  // 是否为渠道推广
  share: localStorage.getItem('isShare') || null,
  siteDetl, // 目录
  siteName: siteDetl.siteName || '', // 网站名
  topUpList: siteDetl.topUpList || [10, 20, 50, 100, 200] //充值额度
}