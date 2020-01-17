
var app = getApp();

Page({
  data:{
    username:'',
    password:'',
    isGood:false,
    canLogin:false,
    remenberPwd:false,
    autoLogin:false,
    userLogin:false//用户登录界面
  },
  _handleAccount(e){
    let accountV=e.detail.value
    this.setData({
      username:accountV,
      isGood: accountV.length>=3,
      canLogin:this.data.password>0 && this.data.isGood
    })
  },
  _handlePassword(e){
    let passwordV=e.detail.value
    this.setData({
      password:passwordV,
      canLogin: passwordV.length>0 && this.data.isGood 
    })
  },
  _getUserInfo(e){
    console.log(e)
  },
  _handleRememberPwd(e){
    if(e.detail.value.length===0){
      //取消记住，应该同时取消自动登录选项
      this.setData({
        autoLogin:false
      })
    }
  },
  _handleAutoLogin(e){
    if(e.detail.value.length>0){
      //选中自动登录时，应该同时选中记住密码
      this.setData({
        remenberPwd:true
      })
    }
  },
  _handleSumit(e){
    let userName=e.detail.value.accountV
     this.setData({
      userLogin:true
     })
  },
  onLoad:function(options){
   
  },
  onReady:function(){
    
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },

  loginBtnClick:function (){

    // 用户名和密码验证的过程

    app.appData.userinfo = {username:this.data.username,password:this.data.password}
    wx.redirectTo({url:"../user/user"})
  },

  usernameInput : function (event){

    
    this.setData({username:event.detail.value})
  },

  passwordInput : function (event){
    this.setData({password:event.detail.value})
  }


})