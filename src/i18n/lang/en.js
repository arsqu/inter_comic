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
    lang: 'switch successful',
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
      'first': 'Already the first page',
      'last': 'Already the last page'
    }
  },
  userInfo: {
    tabList: ['history', 'subscription'],
    suggestions: 'suggestions',
    tips: 'To be developed...'
  },
  login: {
    notAllowed: 'Not logged in',
    phone: 'enter your mobile number',
    pass: 'enter your password',
    register: 'Sign up',
    login: 'Sign in',
    logout: 'sign out',
    tips: {
      load: 'logging in',
      wait: 'Please wait',
      empty: 'Account or password cannot be empty'
    },
    status: {
      success: 'Login successful',
      err: 'Login failed'
    }
  },
  suggest: {
    txt: 'Feedback',
    head: 'Feedback content',
    phone: 'phone',
    email: 'email',
    tips: {
      content: 'Please enter what you want to feedback'
    },
    verify: {
      require: 'Fill in at least one phone or email address',
      content: 'Please describe in detail the problem content you want to feedback'
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
    loading: 'In the recharge,Please wait...',
    recharge: 'top Up',
    rechargeMoney: 'Enter the amount',
    tips: 'prompt',
    payRate: 'coins ratio',
    info: {
      1: 'The balance cannot be withdrawn',
      2: 'Please contact us if you have any recharge issues',
      3: 'Please refresh your account information after recharging'
    },
    payTips: {
      toLong: 'Server request timed out,Please try again',
      openUrl: 'Opening payment page, please wait...',
      txt: 'Whether to continue to recharge',
      pay: 'payfor',
      cancel: 'cancel'
    },
    rechargeStatus: {
      success: 'Recharge successful',
      err: 'Recharge failed',
      wait: 'Please click again after 2 seconds'
    }
  },
  response: {
    err: 'Request failed'
  },
  search: {
    txt: 'Comic | Author',
    search: 'search',
    total: 'total',
    tips: {
      tolong: 'Input is too long ( > 100 characters )'
    }
  },
  post: {
    txt: 'submit',
    success: 'Submitted successfully',
    err: 'Submission Failed'
  }
}