var configData={
//   environment: 'production',
  // environment: 'staging',
  environment: 'dev',
  production:{
    domain: 'https://authority.bnq.com.cn',//未来店订单相关,未来店购物车相关
  },
  staging:{
    domain: 'https://authority-test.bnq.com.cn',
  },
  dev:{
    domain: 'https://authority-test.bnq.com.cn',
  }
}
module.exports = configData