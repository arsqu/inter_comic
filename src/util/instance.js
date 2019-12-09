import util from './util'
import config from './config';
import Qs from 'qs'


const instance = axios.create({
  withCredentials: true,
  timeout: 10 * 1000
});

var idx = 0;

//请求拦截
instance.interceptors.request.use(request => {
  var token = localStorage.getItem('token');
  // s = token.split(':'),
  // k = s[0], v = s[1];
  // console.log(token);
  // if (request.method == 'post') {
  //   request.data = Qs.stringify(request.data);
  // }
  if (token) {
    request.headers['tocken'] = token;
  }
  return request;
}, err => {
  return Promise.reject(err);
});

//响应拦截
instance.interceptors.response.use(response => {
  if (response.data.code == 401) {
    // console.log('未登录');
    localStorage.setItem('loginTips', ++idx);
    if (idx < 3) {
      util.Toast('tips.tiplogin');
    }
    util.clearItem();
    // router.push({ name: 'login' });
  }
  return response;
}, err => {
  return Promise.reject(err);
});

export default instance
