import Mock from 'mockjs'
var comUrl = '/test';
var base = '/api/v1';
var fullPath = comUrl + base;

Mock.setup({
  timeout: '1000-1500' // 表示响应时间介于 200 和 600 毫秒之间，默认值是'10-100'。
})


//首页推荐
Mock.mock(fullPath + '/home', /post|get/i, {
  code: 1,
  'data|2-4': [ //随机 2-4 条数组
    {
      'GroupName': '@string',
      'GroupId|+1': 1, //从1开始自增
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
Mock.mock(fullPath + '/groupList', /post|get/i, {
  'code|0-3': 1,
  'data': {
    'list|10-12': [{
      'title': '@ctitle',
      'id|+1': 1,
      'week_no|1-7': 1,
      'show_img': '@img(@id)',
    }]
  }
})

//漫画详情
Mock.mock(fullPath + '/mediaDetail', /post|get/i, {
  code: 1,
  'data': {
    'detail': {
      'title': '@ctitle',
      'id|+1': 1,
      'is_over|1': [0, 1],
      'artist': '@cname',
      'info': '@cparagraph(1,5)',
      'area': '@region',
      'show_img': '@image(200x100, @color,Hello)',
    }
  }
})

//漫画章节
Mock.mock(fullPath + '/chapterList', /post|get/i, {
  'code': 1,
  'data': {
    'list|1-20': [{
      'id|+1': 1,
      'title': '@ctitle',
      'price': '@integer(100, 200)',
      'order_no|+1': 1,
      'is_free': 1
      // 'is_free|1': [0, 1]
    }]
  }
})

// 一周更新
Mock.mock(fullPath + '/weekList', /post|get/i, {
  'code|0-1': 1,
  'data': {
    'list|5-20': [{
      'title': '@ctitle',
      'id|+1': 1,
      'week_no|1-7': 1,
      'info': '@cparagraph(1,3)',
      'show_img': '@img(@id)',
      'createTime': '@datetime'
      // 'show_img': '@img(' + parseInt(Math.random() * 100) + 100 + ')'
    }]
  }
});

//排行
Mock.mock(fullPath + '/ranking', /post|get/i, {
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