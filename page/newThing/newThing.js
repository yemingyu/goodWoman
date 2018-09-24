// var sourceType = [['camera'], ['album'], ['camera', 'album']]
// var sizeType = [['compressed'], ['original'], ['compressed', 'original']]

// data js
var DataDeal = require('../../common/js/dataDeal.js');

Page({
  data: {
    imageList: [],
    inputThingValue: "",
    completeBtndisabled: true,

    thingsCategoryType: DataDeal.AllCategory,
    thingsCategoryIndex: 0,

    ValidityDate: '2016-09-01',
    OpenDate: '2016-09-01',
    AlarmDate: '2016-09-01'

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    var time = that.formatTime(new Date());
    that.setData({
      ValidityDate: time,
      OpenDate: time,
      AlarmDate: time
    });
  },
  thingsCategoryTypeChange: function (e) {
    this.setData({
      thingsCategoryIndex: e.detail.value
    })
  },

  chooseThingImage: function () {
    var that = this
    wx.chooseImage({
      sourceType: 2,
      sizeType: 1,
      count: 1,
      success: function (res) {
        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        })
        that.refreshCompleteButton()
      }
    })
  },
  previewThingImage: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  }, 
  formatTime: function(date) {
    var that = this;
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    return [year, month, day].map(that.formatNumber).join('-')
  },
  formatNumber: function(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },
  bindValidityDateChange: function (e) {
    this.setData({
      ValidityDate: e.detail.value
    })
  },
  bindOpenDateChange: function (e) {
    this.setData({
      OpenDate: e.detail.value
    })
  },
  bindAlarmDateChange: function (e) {
    this.setData({
      AlarmDate: e.detail.value
    })
  },
  bindThingNameInput: function (e) {
    this.setData({
      inputThingValue: e.detail.value
    })
  },
  bindThingNameBlurInput: function (e) {
    var that = this
    that.refreshCompleteButton()
  },
  completeNewThing: function () {
    var that = this
    var data = {}
    // 拼装数据
    data["title"] = that.data.inputThingValue
    data["category"] = that.data.thingsCategoryType[that.data.thingsCategoryIndex]
    data["ValidityDate"] = that.data.ValidityDate
    data["OpenDate"] = that.data.OpenDate
    data["AlarmDate"] = that.data.AlarmDate
    data["imgSource"] = that.data.imageList[0]

    wx.showLoading({
      title: "正在保存",
      icon: "loading"
    })
    // 保存数据，然后返回首页刷新
    DataDeal.addAllDataStorageWithData(data, function (result){
      wx.hideLoading()
      if (result) {
        wx.showToast({
          title: "保存成功",
          icon: "success",
          duration: 1000,
          success: function () {
            setTimeout(function() {
              that.callHomeRefresh()
              wx.navigateBack()
            }, 1000)
          }
        })
      } else {
        wx.showToast({
          title: "保存失败",
          icon: "failed",
          duration: 1000
        })
      }
    })
  },
  callHomeRefresh: function () {
    //获取页面栈
    var pages = getCurrentPages();
    if (pages.length > 1) {
      //上一个页面实例对象
      var prePage = pages[pages.length - 2];
      //关键在这里
      prePage.refreshThings.apply(prePage)
    }
  },
  refreshCompleteButton: function () {
    var that = this
    if (that.data.inputThingValue == null || that.data.imageList.length == 0) {
      that.setData({
        completeBtndisabled: true
      })
    } else {
      that.setData({
        completeBtndisabled: false
      })
    }
  }
})
