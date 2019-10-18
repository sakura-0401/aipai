const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: ["http://epaper.gmw.cn/gmrb/images/2017-05/16/05/res04_attpic_brief.jpg", "http://www.cnnb.com.cn/pic/0/02/24/74/2247455_897677.jpg", "http://img.pconline.com.cn/images/upload/upc/tx/photoblog/1402/15/c0/31271547_31271547_1392452448981_mthumb.jpg"],
    list: []
  },
  toDetail: function(e) {
    console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/details/details?id=' + id
    })
  },
  sel: function() {
    db.collection("photo_list").get()
      .then(res => {
        console.log(res)
        this.setData({
          list: res.data
        })
      })
  },
  toSend: function() {
    wx.navigateTo({
      url: '../send/send'
    })
  },
  toMe: function() {
    wx.navigateTo({
      url: '../me/me'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.sel();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})