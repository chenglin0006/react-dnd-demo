var Tools = require('../../utils/index.js')
Page({
  //页面变量
  data: {
    toView: 'tab1',
    isLogin: false,//当前用户是否登录
    userInfo: {},//用户个人信息
    personalSign: '',//用户在多行文本框中输入的个人签名文本
    userSign: '',//展示在个人信息中的个人签名文本
    tabList: [
      {id:'tab1', name:'个人能力1'},
      {id:'tab2', name:'个人能力2'},
      {id:'tab3', name:'个人能力3'},
      {id:'tab4', name:'个人能力4'},
      {id:'tab5', name:'个人能力5'},
      {id:'tab6', name:'个人能力6'},
    ],
    resumeData: {},
    scrollStyle: '',
  },
  
  onLoad: function () {
    //页面加载时处理
    this.initUser();
    const suc = (res) => {
      console.log('list', res.data.data);
      let s = {
        name:'123123',
        age:30,
        sex:'男',
      }
      this.setData({resumeData: s});
    }
    const fail = (res) => {
      console.log(res);
    } 
    const params = {
      deptPoolId: "2",
      username: "10002985",
      resourceTypes: ["menu", "router", "button"],
    }
    Tools.baseRequest('/authoritySrv/v2/auth/resources/f0505e10-f442-4f4a-a1d6-50ca5676c936', 'post', params, suc, fail);
   
  },
  //获取用户个人信息
  initUser: function() {
    tt.getUserInfo({
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: JSON.parse(res.rawData),
          isLogin: true
        }, () => {
          tt.getSystemInfo({
            success:(res) => {
              console.log('system',res);
              tt.createSelectorQuery().select('#scrollView').boundingClientRect((rect) => {
                this.setData({scrollStyle:'height:'+(res.screenHeight-rect.top-60)+'px'})
              }).exec()
            }
          })
        })
      },
      fail:(res)=>{
        console.log(res)
        this.toLogin()
      }
    })

    
  },
  //确定button的点击绑定事件
  changeSign: function() {
    this.setData({
      userSign: this.data.personalSign
    })
  },

  tapName: function(event) {
    console.log(event.currentTarget.dataset.item);
     this.setData({
        toView: event.currentTarget.dataset.item.id,
      })
  },

  tap: function(e) {
    
  },

 //个人签名输入框textarea的bindblur事件
  textareaBlur: function(e) {
    console.log(e)
    this.setData({
      personalSign: e.detail.value
    })
  },
  //用户登录
  toLogin() {
    tt.login({
        success:(res) =>{
          this.initUser()
            tt.showToast({
              title: 'login',
              icon: 'success',
              success:() => {
                console.log("login success")
              }
            })
        },
        fail (res) {
            console.log(`login fail`);
        }
    });
  }
})