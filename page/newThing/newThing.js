// var sourceType = [['camera'], ['album'], ['camera', 'album']]
// var sizeType = [['compressed'], ['original'], ['compressed', 'original']]

Page({
  data: {
    imageList: [],
    // sourceTypeIndex: 2,
    // sourceType: ['拍照', '相册', '拍照或相册'],

    // sizeTypeIndex: 2,
    // sizeType: ['压缩', '原图', '压缩或原图'],

    // countIndex: 8,
    // count: [1, 2, 3, 4, 5, 6, 7, 8, 9],

    inputThingValue: "",
    completeBtndisabled: true,

    thingsCategoryType: ['水果', '化妆品', '饮料'],
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
    // 保存数据，然后返回首页刷新
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
