// pages/shop/shop.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    site_url :app.globalData.site_url,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: app.globalData.site_url + '/miniapp.php/Map/index',
      header: {
        'Content-Type': 'application/json'
      },
      success: res => {
        console.log(res.data.list);
        that.setData({
          //第一个data为固定用法
          list: res.data.list
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
  }
})