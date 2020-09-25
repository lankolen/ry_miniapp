// pages/component/shopList/search.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    btn_list:function (param){
      let search = this.data.sh_search;
      console.log(search);
      if(search!=undefined){
        app.globalData.search = search;
      }else{
        app.globalData.search = '';
      }
      console.log(app.globalData.search);
      wx.reLaunch({
        url: '/pages/shop/shop'
      })
    },
    txt_search: function (e) {
      this.setData({
        sh_search: e.detail.value
      })
    },
  },
})
