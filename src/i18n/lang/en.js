export default {
  common: {
    priceUnit: 'coins',
    recharge: 'Top Up',
    pay: 'Pay',
    balance: 'Balance',
    singOut: 'Sign out',
    download: 'Read manga online',
    install: 'Install',
    register: 'Sign up'
  },
  doc: {
    guide: 'Terms and Conditions',
    policy: 'Privacy Policy',
    about: 'Contact',
    refund: 'Refund and Cancellation Policy'
  },
  pay: {
    autoBuy: 'Auto buy next chapter'
  },
  index: {
    module: {
      recommend: 'Recommend',
      latest: 'Latest',
      new: 'New',
      hot: 'Hot',
      selected: 'Selected'
    },
    update: 'Update',
    updateHead: 'Update Timetable',
    date: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saterday", "Sunday"],
    week: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
    rank: 'Ranking',
    free: 'Vip',
    category: 'Category',
    rankHead: 'Ranking List',
    rankList: {
      flag: ["Paily Clicks", "Daily Clicks", "Weekly Clicks", "Monthly Clicks", "Total Clicks"],
      isOver: ["Ongoing", "Completed"],
      payTyp: ["Free List", "Pay List"]
    }
  },
  detl: {
    isOver: ["Ongoing", "Completed"],
    auth: 'Author',
    country: 'Country',
    read: 'Reading',
    chapterPrice: 'Price',
    hasMoney: 'Balance',
    coins: 'coins',
    btnTxt: ['Sign in', 'Top Up', 'Pay'],
    emptyChapter: 'Empty content',
    payRead: 'Read after paying',
    loginRead: 'This section is a paid chapter, please login first',
    payStatus: {
      success: 'Payment Successful',
      warning: 'Episode Bought',
      error: 'Insufficient Balance'
    }
  },
  //当前栏目下没有漫画
  column: {
    detl: 'Details',
    summary: 'Summary',
    catalog: 'Chapter',
    noTitle: 'Untitled',
    noDesc: 'No description',
    chapter: 'Chapter',
    footer: 'Start Reading'
  },
  paidRecord: {
    title: 'Withdrawals',
    record: 'Withdrawals Record',
    OutType: "Type",
    outCoin: 'Coins',
    money: 'Money',
    time: 'Withdrawals time',
    common: 'please enter',
    status: 'Status',
    oderId: 'oderId',
    vpa: 'Vpa',
    formList: {
      phone: 'Phone',
      account: 'Bank Account',
      ifsc: 'IFSC',
      money: 'gold coin'
    },
    response: {
      err: 'Request failed',
      1: 'Successful withdrawal',
      2: 'Insufficient account balance',
      3: "Can't withdraw cash temporarily"
    },
    tips: {
      money: 'Please enter the amount',
      phone: 'Please enter the phone',
      empty: 'Please fill in the complete information'
    }
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
    notHave: 'No more for current column',
    nomore: 'No more',
    notupdate: 'No more updated today',
    end: 'Already to the end'
  },
  view: {
    tips: {
      pay: 'Currently paid chapter',
      first: 'Already the first page',
      maxFont: 'Already the largest font',
      minFont: 'Already the smallest font',
      last: 'Already the last page'
    }
  },
  userInfo: {
    tabList: ['Reading record', 'My Favorites'],
    feedback: 'Feedback',
    rCode: 'Referral Code',
    info: "Profile",
    seemore: 'View after login',
    // tips: 'To be developed...'
    tips: {
      toLogin: 'Sign in for more features'
    }
  },
  login: {
    logText: ['Sign in', 'Click to Login'],
    notAllowed: 'Not logged in',
    phone: 'Email address or phone',
    pass: 'enter your password',
    register: 'Sign up',
    login: 'Sign in',
    logout: 'sign out',
    toLogin: 'to Login',
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
    phone: 'Phone',
    email: 'Email',
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
    gender: ['Male', 'Female'],
    genderTxt: 'gender',
    toRegister: 'Create an account',
    toLogin: 'Already have an account?',
    toggle: {
      0: 'Use a phone number instead',
      1: 'Use your email address instead'
    },
    type: {
      0: 'Enter your email address',
      1: 'Enter your phone number'
    },
    valid: {
      uname: 'NickName',
      email: 'Email',
      sendEmail: 'Verify email',
      sendPhone: 'Get code',
      sendSms: 'Send SMS',
      phone: 'phone number',
      smsCode: 'Verification code',
      phoneErr: 'Please enter the correct phone number',
      emailErr: 'Please enter the correct email',
      ecode: 'verification code',
      ecodeEmpty: 'Please fill in the verification code',
      pass: 'Password',
      age: 'Age',
      gender: 'Gender',
      icode: 'Invitation code'
    },
    tips: {
      sendSms: 'Enter phone number,By clicking "Send SMS" and send SMS to complete register'
    },
    status: {
      success: 'Registration is successful',
      send: 'Message has been sent',
      warn: 'Verification code error',
      err: 'Registration failed',
      repeat: 'Account has been registered',
      expires: 'The verification code has not expired, please check the mailbox',
      expired: 'The Verification code has expired',
      wait: 'verification code is sent, please wait for 60s to send',
    }
  },
  recharge: {
    loading: 'In the recharge,Please wait...',
    recharge: 'Top Up',
    rechargeMoney: 'Enter the amount',
    tips: 'Prompt',
    payRate: 'coins ratio',
    info: {
      1: 'The balance cannot be withdrawn',
      2: 'Please contact us if you have any recharge issues',
      3: 'Please refresh your account information after recharging'
    },
    payTips: {
      toLong: 'Server request timed out,Please try again',
      openUrl: 'Opening payment page, please wait...',
      txt: 'You will be redirected to <span class="special">paytm</span> to complete the payment. Do you want to continue?',
      // txt: 'Whether to continue to recharge',
      pay: 'payfor',
      cancel: 'cancel'
    },
    rechargeStatus: {
      success: 'Recharge successful',
      err: 'Recharge failed',
      wait: 'Please click again after 2 seconds'
    }
  },
  infoDetl: {
    title: 'Profile',
    nick: 'Nickname',
    uname: "Username",
    avatar: 'Avatar',
    balance: 'Balance',
    code: 'Invitation code',
    mail: 'Email',
    phone: 'Phone',
    gender: 'Gender',
    genderType: {
      m: 'Male',
      w: 'Female'
    },
    func: {
      autoBuy: 'Automatic purchase'
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
    txt: 'Submit',
    success: 'Submitted successfully',
    err: 'Submission Failed'
  }
}