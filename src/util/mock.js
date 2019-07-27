import Mock from 'mockjs'

Mock.setup({
  timeout: '1000-1500' // 表示响应时间介于 200 和 600 毫秒之间，默认值是'10-100'。
})

Mock.mock('/test/ranking', /post|get/i, {
  'data|5-20': [{
    'title': '@ctitle',
    'id|+1': 1,
    'week_no|1-7': 1,
    'info': '@cparagraph(1,3)',
    'show_img': '@img(@id)',
    'createTime': '@datetime'
    // 'show_img': '@img(' + parseInt(Math.random() * 100) + 100 + ')'
  }]
});

//菜单路由挂载
Mock.mock('/test/getCateGory', /post|get/i, {
  'data|2-4': [
    {
      'GroupName': '@string',
      'GroupId|+1': 1,
      "List|1-5": [{
        'title': '@ctitle',
        'id|+1': 1,
        'show_img': '@img(' + parseInt(Math.random() * 5 + 100) + ')',
        'update': '@id',
        'createTime': '@datetime'
      }]
    }]
});

//查看更多漫画
Mock.mock('/test/comicMore', /post|get/i, {
  'data|3-10': [
    {
      'title': '@ctitle',
      'id|+1': 1,
      'week_no|1-7': 1,
      'show_img': '@img(@id)',
    }]
})

//漫画详情
Mock.mock('/test/detail', /post|get/i, {
  'data': {
    'title': '@ctitle',
    'id|+1': 1,
    'is_over|1': [0, 1],
    'artist': '@cname',
    'info': '@cparagraph(1,5)',
    'area': '@region',
    'show_img': '@image(200x100, @color,Hello)',
  }
})

//漫画目录
Mock.mock('/test/category', /post|get/i, {
  'data|1-20': [{
    'id|+1': 1,
    'title': '@ctitle',
    'order_no|+1': 1,
    'is_free|1': [0, 1]
  }]
})
