// Page/home.js

var WxSearch = require('component/wxSearchView/wxSearchView.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeID: 0,
    isLoading: true,
    loadOver: false,
    hiddenSearch: true,
    districtList: [{ key: 1, value: "化妆品" }, {
      key: 2, value: "食品"
    }, {
      key: 3, value: "价格最高"
    }, {
      key: 4, value: "服务最好"
    }, {
      key: 5, value: "环境最好"
    }, {
      key: 6, value: "预约最快"
    }],
    sortingList: [{ key: 1, value: "智能排序" }, {
      key: 2, value: "价格最低"
    }, {
      key: 3, value: "价格最高"
    }, {
      key: 4, value: "服务最好"
    }, {
      key: 5, value: "环境最好"
    }, {
      key: 6, value: "预约最快"
    }],
    filterList: [{ key: 1, value: "周日营业", selected: false }, {
      key: 2, value: "官方假期营业（香港）", selected: false
    }, {
      key: 3, value: "可为儿童接种疫苗", selected: false
    }, {
      key: 4, value: "网上付款", selected: false
    }, {
      key: 5, value: "到诊所现场付款", selected: false
    }],
    districtChioceIcon: "/image/menuicon/icon-go-black.png",
    sortingChioceIcon: "/image/menuicon/icon-go-black.png",
    chioceDistrict: false,
    chioceSorting: false,
    chioceFilter: false,
    activeDistrictParentIndex: -1,
    activeDistrictChildrenIndex: -1,
    activeDistrictName: "区域位置",
    scrollTop: 0,
    scrollIntoView: 0,
    activeSortingIndex: -1,
    activeSortingName: "综合排序"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

    // 2 搜索栏初始化
    var that = this;
    WxSearch.init(
      that,  // 本页面一个引用
      ['杭州', '嘉兴', "海宁", "桐乡", '宁波', '金华'], // 热点搜索推荐，[]表示不使用
      ['湖北', '湖南', '北京', "南京"],// 搜索匹配，[]表示不使用
      that.mySearchFunction, // 提供一个搜索回调函数
      that.myGobackFunction //提供一个返回回调函数
    );

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

  gwsearchOpenNavigate: function (e) {
    // console.log(e);
    // wx.navigateTo({
    //   url: 'search/gwsearch',
    // })
    var that = this;
    that.setData({
      hiddenSearch: false
    })
  },


  // 3 转发函数，固定部分，直接拷贝即可
  wxSearchInput: WxSearch.wxSearchInput,  // 输入变化时的操作
  wxSearchKeyTap: WxSearch.wxSearchKeyTap,  // 点击提示或者关键字、历史记录时的操作
  wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
  // wxSearchConfirm: WxSearch.wxSearchConfirm,  // 搜索函数

  wxSearchConfirm: function (e) {
    var that = this;
    that.setData({
      hiddenSearch: true
    })
  },

  wxSearchClear: WxSearch.wxSearchClear,  // 清空函数

  // 4 搜索回调函数  
  mySearchFunction: function (value) {
    // do your job here
    // 示例：跳转
    wx.redirectTo({
      url: '../index/index?searchValue=' + value
    })
  },

  // 5 返回回调函数
  myGobackFunction: function () {
    // do your job here
    // 示例：返回
    wx.redirectTo({
      url: '../index/index?searchValue=返回'
    })
  },



  onPullDownRefresh: function () {
    this.setData({
      productList: [],
      pageIndex: 1,
      loadOver: false,
      isLoading: true
    })
    //this.getProductList();
    wx.stopPullDownRefresh()
  },
  onReachBottom: function () {
    if (!this.data.loadOver) {
      this.setData({
        pageIndex: this.data.pageIndex + 1,
        isLoading: true,
        loadOver: false
      })
      //this.getProductList();
    }
  },
  //条件选择
  choiceItem: function (e) {
    switch (e.currentTarget.dataset.item) {
      case "1":
        if (this.data.chioceDistrict) {
          this.setData({
            districtChioceIcon: "/image/menuicon/icon-go-black.png",
            sortingChioceIcon: "/image/menuicon/icon-go-black.png",
            chioceDistrict: false,
            chioceSorting: false,
            chioceFilter: false,
          });
        }
        else {
          this.setData({
            districtChioceIcon: "/image/menuicon/icon-down-black.png",
            sortingChioceIcon: "/image/menuicon/icon-go-black.png",
            chioceDistrict: true,
            chioceSorting: false,
            chioceFilter: false,
          });
        }
        break;
      case "2":
        if (this.data.chioceSorting) {
          this.setData({
            districtChioceIcon: "/image/menuicon/icon-go-black.png",
            sortingChioceIcon: "/image/menuicon/icon-go-black.png",
            chioceDistrict: false,
            chioceSorting: false,
            chioceFilter: false,
          });
        }
        else {
          this.setData({
            districtChioceIcon: "/image/menuicon/icon-go-black.png",
            sortingChioceIcon: "/image/menuicon/icon-down-black.png",
            chioceDistrict: false,
            chioceSorting: true,
            chioceFilter: false,
          });
        }
        break;
      case "3":
        if (this.data.chioceFilter) {
          this.setData({
            districtChioceIcon: "/image/menuicon/icon-go-black.png",
            sortingChioceIcon: "/image/menuicon/icon-go-black.png",
            chioceDistrict: false,
            chioceSorting: false,
            chioceFilter: false,
          });
        }
        else {
          this.setData({
            districtChioceIcon: "/image/menuicon/icon-go-black.png",
            sortingChioceIcon: "/image/menuicon/icon-go-black.png",
            chioceDistrict: false,
            chioceSorting: false,
            chioceFilter: true,
          });
        }
        break;
    }
  },
  hideAllChioce: function () {
    this.setData({
      districtChioceIcon: "/image/menuicon/icon-go-black.png",
      sortingChioceIcon: "/image/menuicon/icon-go-black.png",
      chioceDistrict: false,
      chioceSorting: false,
      chioceFilter: false,
    });
  },
  //区域位置
  /*getDistrictList: function () {
    var that = this;
    wx.request({
      url: app.globalData.hostUrl,
      data: {
        message: "20005",
        location_id: that.data.locationID,
        token: md5.hex_md5(app.globalData.token),
        device_source: app.globalData.deviceSource
      },
      success: function (resRequest) {
        if (resRequest.data.error_code == 0) {
          that.setData({
            districtList: resRequest.data.district_list
          })
        }
      }
    })
  },*/
  // selectDistrictParent: function (e) {
  //   this.setData({
  //     activeDistrictParentIndex: e.currentTarget.dataset.index,
  //     activeDistrictName: this.data.districtList[e.currentTarget.dataset.index].district_name,
  //     activeDistrictChildrenIndex: 0,
  //     scrollTop: 0,
  //     scrollIntoView: 0
  //   })
  // },
  // selectDistrictChildren: function (e) {
  //   var index = e.currentTarget.dataset.index;
  //   var parentIndex = this.data.activeDistrictParentIndex == -1 ? 0 : this.data.activeDistrictParentIndex;
  //   if (index == 0) {
  //     this.setData({
  //       activeDistrictName: this.data.districtList[parentIndex].district_name
  //     })
  //   } else {
  //     this.setData({
  //       activeDistrictName: this.data.districtList[parentIndex].district_children_list[index].district_name
  //     })
  //   }
  //   this.setData({
  //     districtChioceIcon: "../images/icon-go-black.png",
  //     chioceDistrict: false,
  //     activeDistrictChildrenIndex: index,
  //     productList: [],
  //     pageIndex: 1,
  //     loadOver: false,
  //     isLoading: true
  //   })
  //   //this.getProductList();
  // },

  selectCategory: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      sortingChioceIcon: "/image/menuicon/icon-go-black.png",
      chioceDistrict: false,
      activeDistrictIndex: index,
      activeDistrictName: this.data.districtList[index].value,
      productList: [],
      pageIndex: 1,
      loadOver: false,
      isLoading: true
    })
    //this.getProductList();
  },

  //综合排序
  selectSorting: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      sortingChioceIcon: "/image/menuicon/icon-go-black.png",
      chioceSorting: false,
      activeSortingIndex: index,
      activeSortingName: this.data.sortingList[index].value,
      productList: [],
      pageIndex: 1,
      loadOver: false,
      isLoading: true
    })
    //this.getProductList();
  },
  //筛选
  selectFilter: function (e) {
    var index = e.currentTarget.dataset.index;
    var _filterList = this.data.filterList;
    _filterList[index].selected = !_filterList[index].selected;
    this.setData({
      filterList: _filterList
    })
  },
  resetFilter: function () {
    var _filterList = this.data.filterList;
    _filterList.forEach(function (e) {
      e.selected = false;
    })
    this.setData({
      filterList: _filterList
    })
  },
  filterButtonClick: function () {
    this.setData({
      chioceFilter: false,
      productList: [],
      pageIndex: 1,
      loadOver: false,
      isLoading: true
    })
    //this.getProductList();
  }
})