const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: "",
    title: "",
    images: [],
    userInfo: {},
    fileIds: []
  },
  submit: function() {
    //功能一：将选中图片上传云存储
    //1：显示数据加载中提示框
    wx.showLoading({
      title: '正在发布中...',
    })
    //2：创建数组(添加Promise对象)
    var rows = [];
    //3：创建循环遍历选中图片数组中内容
    for (var i = 0; i < this.data.images.length; i++) {
      //4：为每张图片创建Promise对象
      rows.push(new Promise((resolve, reject) => {
        //5：获取数组中当前图片名称
        var item = this.data.images[i];
        //console.log(item);
        //6：创建正则表达式来解析图片名称后缀
        var suffix = /\.\w+$/.exec(item)[0];
        //console.log(suffix);
        //6.1：创建新文件名称
        //var newFile=new Date().getTime()+suffix;
        //特殊情况：网络非常好
        var newFile = new Date().getTime() + Math.floor(Math.random() * 9999) + suffix;
        console.log(newFile);
        //7：上传图片
        wx.cloud.uploadFile({ //上传函数
          cloudPath: newFile, //新文件名
          filePath: item, //原先文件
          success: (res) => { //上传成功
            //8：上传成功获取当前图片fileID
            var fid = res.fileID;
            //9：保存当前fileID在data中
            this.data.fileIds.push(fid);
            //10：执行成功 解析
            resolve();
          }
        })
      })); //push end
    } //for end
    //功能二：将留言/打分/fileID添加云数据库
    //11：等待所有Promise对象执行完成
    //    在回调函数完成功能二
    Promise.all(rows).then(res => {
      //12：在云数据库创建集合 comment1904
      //13：程序开始位置创建数据库实例对象
      //14：向comment1904集合添加一条记录
      //    content 内容
      //    title   标题
      //    fileIds 上传图片id列表
      db.collection("photo_list").add({
          data: {
            content: this.data.content, //内容
            title: this.data.title, //标题
            fileIds: this.data.fileIds, //图片ids列表
            userInfo: this.data.userInfo // 用户信息
          }

        })
        .then(res => {
          //15：成功回调函数 隐藏加载提示框 提示文字
          wx.hideLoading();
          // wx.showToast({
          //   title: '发布成功',
          // })
          wx.navigateTo({
            url: '/pages/index/index'
          })
        })
        .catch(err => {
          console.log(err)
        })
      //16：失败回调函数 隐藏加载提示框 提示文字
    }); //Promise.all end
  },
  // 上传头像
  selectImage: function() {
    var t = this;
    wx.chooseImage({
      count: 9,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: function(res) {
        var r = res.tempFilePaths;
        console.log(r)
        t.setData({
          images: r
        })
      }
    })
  },
  // 输入框 输入的事件
  inputAction: function(event) {
    // 保存 输入框 输入的内容
    this.setData({
      content: event.detail.value
    });
  },
  inputTitle: function(e) {
    this.setData({
      title: e.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getUserInfo({
      withCredentials: true,
      lang: '',
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo
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