export default {
  common: {
    priceUnit: 'coins',
    recharge: 'Top Up',
    pay: 'pay',
    balance: 'balance',
    singOut: 'Sign out',
    download: 'Read manga online',
    install: 'Install',
    register: 'Sign up'
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
    tabList: ['Reading record', 'My Favorites'],
    feedback: 'Feedback',
    rCode: 'Referral Code',
    tips: 'To be developed...'
  },
  login: {
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
    gender: ['male', 'Female'],
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
      ecode: 'Email verification code',
      ecodeEmpty: 'Please fill in the verification code in the email address',
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