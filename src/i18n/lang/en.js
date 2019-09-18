export default {
  index: {
    module: {
      recommend: 'Recommend',
      latest: 'Latest',
      new: 'New',
      hot: 'Hot',
      selected: 'Selected'
    },
    update: 'update',
    updateHead: 'update timetable',
    date: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saterday", "Sunday"],
    week: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
    rank: 'Ranking',
    rankHead: 'Ranking List',
    rankList: {
      flag: ["", "Daily Clicks", "Weekly Clicks", "Monthly Clicks", "Total Clicks"],
      isOver: ["Ongoing", "Completed"],
      payTyp: ["Free List", "Pay List"]
    }
  },
  detl: {
    isOver: ["Ongoing", "Completed"],
    auth: 'Author',
    country: 'Country',
    read: 'Reading',
    chapterPrice: 'price',
    hasMoney: 'balance',
    coins: 'coins',
    btnTxt: ['sign in', 'top up', 'pay'],
    emptyChapter: 'empty content',
    payRead: 'Read after paying',
    loginRead: 'This section is a paid chapter, please login first',
    payStatus: {
      success: 'payment successful',
      warning: 'episode bought',
      error: 'insufficient balance'
    }
  },
  //当前栏目下没有漫画
  column: {
    detl: 'Details',
    summary: 'Summary',
    catalog: 'chapter',
    noTitle: 'Untitled',
    noDesc: 'No description',
    chapter: 'chapter',
    footer: 'Read Now'
  },
  show: {
    unknown: 'unknown',
    update: '',
    case: 'Update per',
    more: 'more'
  },
  tips: {
    404: 'back to the homepage',
    toLogin: 'please log in first',
    notlogin: 'please sign in',
    tiplogin: 'Login to see more',
    loading: 'Loading',
    notHave: 'No more cartoon for current column',
    nomore: 'No more cartooons',
    notupdate: 'No more updated cartoons today',
    end: 'Already to the end'
  },
  view: {
    'tips': {
      'pay': 'Currently paid chapter',
      'first':'Already the first page',
      'last':'Already the last page'
    }
  },
  userInfo: {
    tabList: ['history', 'subscription']
  },
  login: {
    notAllowed: 'Not logged in',
    phone: 'enter your mobile number',
    pass: 'enter your password',
    register: 'Sign up',
    login: 'Sign in',
    tips: {
      wait: 'Please wait',
      empty: 'Account or password cannot be empty'
    },
    status: {
      success: 'Login successful',
      err: 'Login failed'
    }
  },
  register: {
    register: 'Register',
    account: 'enter an account number',
    code: 'enter the verification code',
    pass: 'enter the password',
    btnTxt: "Complete",
    status: {
      success: 'Registration is successful',
      warn: 'Verification code error',
      err: 'registration failed',
      repeat: 'Do not double registration'
    }
  },
  recharge: {
    recharge: 'recharge',
    rechargeMoney: 'top ap',
    tips: 'prompt',
    payRate: 'coins ratio',
    info: {
      1: 'The balance cannot be withdrawn',
      2: 'Please contact us if you have any recharge issues',
      3: 'Please refresh your account information after recharging'
    },
    rechargeStatus: {
      success: 'Recharge successful',
      err: 'Recharge failed'
    }
  },
  response: {
    err: 'Request failed'
  }
}