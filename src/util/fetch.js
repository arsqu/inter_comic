import axios from 'axios'

// get
function getData(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params }).then(response => {
      resolve(response.data);
    }).catch(err => {
      reject(err);
    })
  })
}

// post
function postData(url, data, config) {
  return new Promise((resolve, reject) => {
    config = config || {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }
    axios.post(url, data, config).then(response => {
      resolve(response.data);
    }).catch(err => {
      reject(err);
    })
  })
}

export default {
  getData,
  postData
}