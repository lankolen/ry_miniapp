// pages/shopDetail/shopDetail.js//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    site_url :app.globalData.site_url
  },

  onLoad: function (options) {
    let that = this;
    wx.request({
      url: app.globalData.site_url + '/miniapp.php/Map/map_select?sh_id=' + options.sh_id,
      header: {
        'Content-Type': 'application/json'
      },
      success: res => {
        that.setData({
          //第一个data为固定用法
          shop: res.data.shop,
          markers: [{
            iconPath: "/images/marker.png",
            id: 0,
            latitude: res.data.shop.sh_y,
            longitude: res.data.shop.sh_x
          }]
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  toCall:function(event){    
    wx.makePhoneCall({
      phoneNumber: event.currentTarget.dataset.value,
      success: function () {
        console.log('成功拨打电话')
      }
    })
  },
  //确认店铺
  btn_confirm:function(event){
    console.log(app.globalData.site_url + '/miniapp.php/Map/shop_select_save?sh_id=' + event.currentTarget.dataset.value);
    wx.request({
      url: app.globalData.site_url + '/miniapp.php/Map/shop_select_save',
      data: {
        sh_id:event.currentTarget.dataset.value
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (e) {
        //获取当前页面的页面栈
        var page=getCurrentPages();
        //获取上一个页面的页面栈
        var lastPage=page[page.length-2];
        //调用onload事件
        lastPage.onLoad();
        wx.navigateBack({
          delta:1
        })
      }
    })
  }
})