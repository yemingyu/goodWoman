// Page/home.js

// main search
var WxSearch = require('component/wxSearchView/wxSearchView.js');

// mock数据区
const firstPage = [{
  id: "1",
  category: "水果1",
  title: "苹果1",
  expiredDate: "七天后1"
},
  {
    id: "2",
    category: "水果2",
    title: "苹果2",
    expiredDate: "七天后2"
  },
  {
    id: "3",
    category: "水果3",
    title: "苹果3",
    expiredDate: "七天后3"
  },
  {
    id: "4",
    category: "水果4",
    title: "苹果4",
    expiredDate: "七天后4"
  },
  {
    id: "5",
    category: "水果5",
    title: "苹果5",
    expiredDate: "七天后5"
  },
  {
    id: "6",
    category: "水果6",
    title: "苹果6",
    expiredDate: "七天后6"
  }]

  const secondPage = [
  {
    id: "7",
    category: "水果7",
    title: "苹果7",
    expiredDate: "七天后7"
  },
  {
    id: "8",
    category: "水果8",
    title: "苹果8",
    expiredDate: "七天后8"
  },
  {
    id: "9",
    category: "水果9",
    title: "苹果9",
    expiredDate: "七天后9"
  },
  {
    id: "10",
    category: "水果10",
    title: "苹果10",
    expiredDate: "七天后10"
  },
  {
    id: "11",
    category: "水果11",
    title: "苹果11",
    expiredDate: "七天后11"
  },
  {
    id: "12",
    category: "水果12",
    title: "苹果12",
    expiredDate: "七天后12"
  }]

  const districtListMock = [{ key: 1, value: "化妆品" }, {
    key: 2, value: "食品"
  }, {
    key: 3, value: "价格最高"
  }, {
    key: 4, value: "服务最好"
  }, {
    key: 5, value: "环境最好"
  }, {
    key: 6, value: "预约最快"
  }]
  const sortingListMock = [{ key: 1, value: "智能排序" }, {
      key: 2, value: "价格最低"
    }, {
      key: 3, value: "价格最高"
    }, {
      key: 4, value: "服务最好"
    }, {
      key: 5, value: "环境最好"
    }, {
      key: 6, value: "预约最快"
    }]

    const filterListMock = [{ key: 1, value: "周日营业", selected: false }, {
        key: 2, value: "官方假期营业（香港）", selected: false
      }, {
        key: 3, value: "可为儿童接种疫苗", selected: false
      }, {
        key: 4, value: "网上付款", selected: false
      }, {
        key: 5, value: "到诊所现场付款", selected: false
      }]

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // scrollview滚动点
    // scrollTop: 0,
    scrollToView: "gwhome-search-bar-id",

    // 隐藏main search，true表示展示的是home页，否则是search页
    hiddenSearch: true,

    // 物品选择器数据区 
    districtList: districtListMock,
    sortingList: sortingListMock,
    filterList: filterListMock,

    // 物品选择器icon
    districtChioceIcon: "/image/menuicon/icon-go-black.png",
    sortingChioceIcon: "/image/menuicon/icon-go-black.png",

    // 选择器 是否选中展开
    chioceDistrict: false,
    chioceSorting: false,
    chioceFilter: false,

    // 选择器当前选中的类别
    activeDistrictName: "类别",
    activeSortingName: "综合排序",

    // 类别对应id，便于逻辑处理
    selectCategoryIndex: 0,
    selectSortingIndex: 0,

    // 物品列表数据
    things: [],

    // 上拉加载的 跟服务端所需参数有关
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false,  //“没有数据”的变量，默认false，隐藏 
    searchPageNum: 1,   // 设置加载的第几次，默认是第一次  
    callbackcount: 10,      //返回数据的个数  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    // 物品数据初始化
    // TODO:
      // 获取物品列表，提取类别等，提供给choice使用
      // 根据物品数据渲染列表
    that.getThings();

    // 搜索栏初始化，TODO: 网络请求获取历史搜索等，进行初始化
    that.getSearchData();
    
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

  /* 函数区 */

  // scrollview 整体控制 
  scroll: function (e) {
    console.log(e)
  },

  /* 初始化数据区 */
  // 初始化物品数据、类别等
  getThings: function () {
    setTimeout(() => {
      this.setData({
        things: firstPage
      })
    }, 1000)
  },
  // 初始化main search页面数据 
  getSearchData: function () {
    console.log("getSearchData");
  },

  /* home页search区 */
  // 首页隐藏，显示main search
  gwsearchOpenNavigate: function (e) {
    var that = this;
    that.setData({
      hiddenSearch: false
    })
  },
  // 新建物品
  gwAddNewThing: function (e) {
    var that = this;
    console.log(e);
    wx.navigateTo({
      url: 'newThing/newThing',
    })
  },
  
  /* 物品选择器区 */

  // choicebar 点击事件
  choiceItem: function (e) {
    this.setData({
      scrollToView: "choice-all-id"
    });
    // console.log("scrollTop:" + this.data.scrollTop);
    switch (e.currentTarget.dataset.item) {
      case "1":
        if (this.data.chioceDistrict) {
          this.setData({
            districtChioceIcon: "/image/menuicon/icon-go-black.png",
            sortingChioceIcon: "/image/menuicon/icon-go-black.png",
            chioceDistrict: false,
            chioceSorting: false,
          });
        }
        else {
          this.setData({
            districtChioceIcon: "/image/menuicon/icon-down-black.png",
            sortingChioceIcon: "/image/menuicon/icon-go-black.png",
            chioceDistrict: true,
            chioceSorting: false,
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
          });
        }
        else {
          this.setData({
            districtChioceIcon: "/image/menuicon/icon-go-black.png",
            sortingChioceIcon: "/image/menuicon/icon-down-black.png",
            chioceDistrict: false,
            chioceSorting: true,
          });
        }
        break;
    }
  },

  // 选中分类
  selectCategory: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      sortingChioceIcon: "/image/menuicon/icon-go-black.png",
      chioceDistrict: false,
      selectCategoryIndex: index,
      activeDistrictName: this.data.districtList[index].value,
    })

    // 获取相应category对应的数据，加载过程中，中间loading
    // productList: [],
    //   pageIndex: 1,
    //     loadOver: false,
    //       isLoading: true
    //this.getProductList();
  },

  // 选中排序
  selectSorting: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      sortingChioceIcon: "/image/menuicon/icon-go-black.png",
      chioceSorting: false,
      selectSortingIndex: index,
      activeSortingName: this.data.sortingList[index].value,

    })
    // productList: [],
    //   pageIndex: 1,
    //     loadOver: false,
    //       isLoading: true
    //this.getProductList();
  },

  // 点击蒙层，收起物品选择器
  hideAllChioce: function () {
    this.setData({
      scrollToView: "gwhome-search-bar-id",

      districtChioceIcon: "/image/menuicon/icon-go-black.png",
      sortingChioceIcon: "/image/menuicon/icon-go-black.png",
      chioceDistrict: false,
      chioceSorting: false
    });
  },
  

  selectThing: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.showToast({
      title: id,
      icon: '',
      image: '',
      duration: 1000,
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    wx.navigateTo({
      url: `thingDetails/thingDetails?id=` + id,
    })
    console.log(id);
  },

  // 3 转发函数，固定部分，直接拷贝即可
  wxSearchInput: WxSearch.wxSearchInput,  // 输入变化时的操作
  wxSearchKeyTap: WxSearch.wxSearchKeyTap,  // 点击提示或者关键字、历史记录时的操作
  wxSearchDeleteAll: WxSearch.wxSearchDeleteAll, // 删除所有的历史记录
  // wxSearchConfirm: WxSearch.wxSearchConfirm,  // 搜索函数



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

    setTimeout(()=>{
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