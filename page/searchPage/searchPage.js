// page/searchPage.js

// main search
var WxSearch = require('../component/wxSearchView/wxSearchView.js');

Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this
    // 搜索栏初始化，TODO: 网络请求获取历史搜索等，进行初始化
    that.getSearchData();
    // TODO: 可以初始化一波历史搜索数据
    WxSearch.init(
      that,  // 本页面一个引用
      // ['杭州', '嘉兴', "海宁", "桐乡", '宁波', '金华'], // 热点搜索推荐，[]表示不使用
      // ['湖北', '湖南', '北京', "南京"],// 搜索匹配，[]表示不使用
      [],
      [],
      that.mySearchFunction, // 提供一个搜索回调函数
      that.myGobackFunction //提供一个返回回调函数
    );
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  // 初始化main search页面数据 
  getSearchData: function () {
    console.log("getSearchData");
  },
  wxSearchInput: WxSearch.wxSearchInput,  // 输入变化时的操作
  wxSearchKeyTap: WxSearch.wxSearchKeyTap,  // 点击提示或者关键字、历史记录时的操作
  wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
  wxSearchConfirm: WxSearch.wxSearchConfirm,  // 搜索函数



  wxSearchClear: WxSearch.wxSearchClear,  // 清空函数
  // 4 搜索回调函数  
  mySearchFunction: function (value) {
    // do your job here
    // 示例：跳转
    // wx.redirectTo({
    //   url: '../index/index?searchValue=' + value
    // })
  },

  // 5 返回回调函数
  myGobackFunction: function () {
    // do your job here
    // 示例：返回
    wx.navigateBack()
    // wx.redirectTo({
    //   url: '../index/index?searchValue=返回'
    // })
  },





  searchScrollLower: function () {
    let that = this;
    // console.log("yemingyu")

    that.setData({
      searchLoading: true,  //把"上拉加载"的变量设为true，显示  
    })


    if (that.data.searchLoading && !that.data.searchLoadingComplete) {
      that.setData({
        searchPageNum: that.data.searchPageNum + 1,  //每次触发上拉事件，把searchPageNum+1  
        isFromSearch: false  //触发到上拉事件，把isFromSearch设为为false  
      });
      that.fetchSearchList();
    }
  },
  //搜索，访问网络  
  fetchSearchList: function () {
    let that = this;
    // let searchKeyword = that.data.searchKeyword,//输入框字符串作为参数  
    //   searchPageNum = that.data.searchPageNum,//把第几次加载次数作为参数  
    //   callbackcount = that.data.callbackcount; //返回数据的个数  
    // //访问网络  
    // util.getSearchMusic(searchKeyword, searchPageNum, callbackcount, function (data) {
    //   console.log(data)

    setTimeout(() => {
      // if (data.data.song.curnum != 0) {
      if (secondPage != null) {

        let searchList = [];
        //如果isFromSearch是true从data中取出数据，否则先从原来的数据继续添加  
        that.data.isFromSearch ? searchList = that.data.things : searchList = that.data.things.concat(secondPage)

        that.setData({
          things: searchList, //获取数据数组  
          // zhida: data.data.zhida, //存放歌手属性的对象  
          searchLoading: true   //把"上拉加载"的变量设为false，显示  
        });
        //没有数据了，把“没有数据”显示，把“上拉加载”隐藏  
      } else {
        that.setData({
          searchLoadingComplete: true, //把“没有数据”设为true，显示  
          searchLoading: false  //把"上拉加载"的变量设为false，隐藏  
        });
      }
    }, 1500);

    //   //判断是否有数据，有则取数据  

    // })
  }
})