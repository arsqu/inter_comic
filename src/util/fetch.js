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
function postData(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(response => {
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