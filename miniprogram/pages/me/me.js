Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      icon: "../../images/mine/shoucang.png",
      title: "我的收藏"
    }, {
      icon: "../../images/mine/like.png",
      title: "喜欢"
    }, {
      icon: "../../images/mine/guanzhu.png",
      title: "关注"
    }, {
      icon: "../../images/mine/pinglun.png",
      title: "评论"
    }],
    info: {}
  },
  getUser: function(event) {
    //获取用户信息
    console.log(event);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getUserInfo({
      withCredentials: true,
      lang: '',
      success: res => {
        console.log(res)
        this.setData({
          info: res.userInfo
        })
      }
    })
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