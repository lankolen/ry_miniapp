//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    site_url :app.globalData.site_url,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    swiperList:[{
      
    }],// Banner数据
    images:[
      app.globalData.site_url+"/Public/cssjsimages/images/banner/1.jpg",
      app.globalData.site_url+"/Public/cssjsimages/images/banner/2.jpg",
      app.globalData.site_url+"/Public/cssjsimages/images/banner/3.jpg",
      app.globalData.site_url+"/Public/cssjsimages/images/banner/4.jpg",
      app.globalData.site_url+"/Public/cssjsimages/images/banner/5.jpg",
      app.globalData.site_url+"/Public/cssjsimages/images/banner/6.jpg",
      app.globalData.site_url+"/Public/cssjsimages/images/banner/7.jpg",
    ],
    // 是否显示面板指示点
    indicatorDots: true,
    // 滑动方向是否为纵向
    vertical: false,
    // 自动切换
    autoplay: true,
    // 采用衔接滑动
    circular: true,
    // 自动切换时间间隔2s
    interval: 2000,
    // 滑动动画时长0.5s
    duration: 500,
    // 前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值
    previousMargin: 20,
    // 后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值
    nextMargin:20
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // 登录
    wx.login({
      success: function(res) {
        let that = this;
        //请求自己后台获取用户openid
        wx.request({
          url: app.globalData.site_url+'/miniapp.php/Common/getOpenid', 
          data: {
            code: res.code
          }, 
          success: function(response) {
            var openid = response.data.openid;
            //可以把openid存到本地，方便以后调用
            wx.setStorageSync('openid', openid);
            //如果没有保存，则保存到数据库
            wx.request({
              url: app.globalData.site_url+'/miniapp.php/Common/setOpenid', 
              data: {
                openid: openid
              },
              success:function(res){
                
              }
            })
          },
          fail:function(res){
            console.log(res)
          }
        })
      }
    });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
