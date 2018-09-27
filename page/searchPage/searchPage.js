// page/searchPage.js

// data js
var DataDeal = require('../../common/js/dataDeal.js');

// main search
var WxSearch = require('../component/wxSearchView/wxSearchView.js');

Page({

  /**
   * Page initial data
   */
  data: {
    // scrollview滚动点
    scrollToView: "gwhome-search-bar-id",
    scrollEnabled: "true",
    // 物品列表数据
    thingslist: [],
    // 上拉加载的 跟服务端所需参数有关
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false,  //“没有数据”的变量，默认false，隐藏 
    searchPageNum: 0,   // 设置加载的第几次，默认是第一次  
    thingallTop: 20,
    currentKey: ""
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this
    // 搜索栏初始化，TODO: 网络请求获取历史搜索等，进行初始化
    that.getSearchData();
    // TODO: 可以初始化一波历史搜索数据 最多保留十个词
    WxSearch.init(
      that,  // 本页面一个引用
      // ['杭州', '嘉兴', "海宁", "桐乡", '宁波', '金华'], // 热点搜索推荐，[]表示不使用
      // ['湖北', '湖南', '北京', "南京"],// 搜索匹配，[]表示不使用
      [],
      [],
      that.mySearchFunction, // 提供一个搜索回调函数
      that.myGobackFunction //提供一个返回回调函数
    );
    // that.getThings();
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
    var that = this
    that.data.currentKey = value
    that.getThingsWithKey(value)
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
  },
  scrollToLower: function (e) {
    let that = this;
    // that.setData({
    //   searchLoading: true,  //把"上拉加载"的变量设为true，显示  
    // })
    if (that.data.thingslist.length < (that.data.searchPageNum + 1) * DataDeal.AllDataPageSize) {
      return
    }
    if (!that.data.searchLoadingComplete) {
      that.setData({
        searchLoading: true,  //把"上拉加载"的变量设为true，显示
        searchPageNum: that.data.searchPageNum + 1,  //每次触发上拉事件，把searchPageNum+1  
      });

      DataDeal.getAllDataStorageWithPageAndKey(that.data.searchPageNum, that.data.currentKey, function (data) {
        var nextPage = data

        if (nextPage != null) {

          let searchList = that.data.thingslist;
          searchList = that.data.thingslist.concat(nextPage)

          that.setData({
            thingslist: searchList, //获取数据数组  
            // searchLoading: true   //把"上拉加载"的变量设为false，显示  
          });
          //没有数据了，把“没有数据”显示，把“上拉加载”隐藏  
        }
        if (nextPage == null || nextPage.length < DataDeal.AllDataPageSize) {
          that.setData({
            searchLoadingComplete: true, //把“没有数据”设为true，显示  
            searchLoading: false  //把"上拉加载"的变量设为false，隐藏  
          });
        } else {
          that.setData({
            searchLoading: true   //把"上拉加载"的变量设为false，显示  
          });
        }
      })
    }

    // let searchKeyword = that.data.searchKeyword,//输入框字符串作为参数  
    //   searchPageNum = that.data.searchPageNum,//把第几次加载次数作为参数  
    //   callbackcount = that.data.callbackcount; //返回数据的个数  
    // //访问网络  
    // util.getSearchMusic(searchKeyword, searchPageNum, callbackcount, function (data) {
    //   console.log(data)
  },

  /* 初始化数据区 */
  // 初始化物品数据、类别等
  getThingsWithKey: function (key) {
    var that = this
    that.data.thingslist = []
    DataDeal.getAllDataStorageWithPageAndKey(0, key, function (data) {
      if (that.data.thingslist.length == 0) {
        that.setData({
          thingslist: data,
        })
      } else {
        for (var i = 0; i < data.length; i++) {
          that.data.thingslist[i] = data[i]
        }
        that.setData({
          thingslist: that.data.thingslist,
        })
      }
    })
  },
  getDataWithPage: function (data, page) {
    var resultData = []
    for (var i = 0; i < (page + 1) * DataDeal.AllDataPageSize; i++) {
      var item = data[i]
      if (item != null && item != undefined) {
        resultData[i] = item
      }
    }
    return resultData
  },
  refreshThings: function () {
    var that = this

    // 这里也要刷新首页的数据，因为可能已经修改了物品详情
    that.callHomeRefresh()

    var resultData
    // 刷新当前，需要把总共已经加载的page上传到服务端
    DataDeal.getAllDataStorageWithReadyPageAndKey(that.data.searchPageNum + 1, that.data.currentKey, function (data) {
      if (that.data.thingslist.length == 0) {
        // 获取first page数据
        resultData = that.getDataWithPage(data, 0)
        that.setData({
          thingslist: resultData,
        })
      } else {
        resultData = that.getDataWithPage(data, that.data.searchPageNum)
        // for (var i = 0; i < (that.data.searchPageNum + 1) * DataDeal.AllDataPageSize; i++) {
        //   that.data.thingslist[i] = data[i]
        // }
        that.setData({
          thingslist: resultData,
        })
        if (data.length > (that.data.searchPageNum + 1) * DataDeal.AllDataPageSize) {
          if (that.data.searchLoadingComplete && !that.data.searchLoading) {
            that.setData({
              searchLoadingComplete: false,
              searchLoading: true
            })
          }
        } else {
          if (!that.data.searchLoadingComplete && that.data.searchLoading) {
            that.setData({
              searchLoadingComplete: true,
              searchLoading: false
            })
          }
        }
      }
    })
  },
  callHomeRefresh: function () {
    //获取页面栈
    var pages = getCurrentPages();
    if (pages.length > 1) {
      //上一个页面实例对象
      var homePage = pages[0];
      //关键在这里
      homePage.refreshThings.apply(homePage)
    }
  },
  selectThing: function (e) {
    let id = e.currentTarget.dataset.id;
    // wx.showToast({
    //   title: id,
    //   icon: '',
    //   image: '',
    //   duration: 1000,
    //   mask: true,
    //   success: function(res) {},
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })
    wx.navigateTo({
      url: `../thingDetails/thingDetails?id=` + id,
    })
    // console.log(id);
  }
})