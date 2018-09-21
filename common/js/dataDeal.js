// mock数据区
const firstPage = [{
  id: "1",
  category: "水果1",
  title: "苹果1",
  thingimage: "http://i3.hoopchina.com.cn/blogfile/201206/29/134095667484768.jpg",
  useProgress: 83,
  progressColor: "red",
  expiredDate: "七天后1"
},
{
  id: "2",
  category: "水果2",
  title: "苹果2",
  progressColor: "yellow",
  thingimage: "http://i3.hoopchina.com.cn/blogfile/201206/29/134095667484768.jpg",
  useProgress: 50,
  expiredDate: "七天后2"
},
{
  id: "3",
  category: "水果3",
  title: "苹果3",
  thingimage: "http://i3.hoopchina.com.cn/blogfile/201206/29/134095667484768.jpg",
  useProgress: 33,
  expiredDate: "七天后3"
},
{
  id: "4",
  category: "水果4",
  title: "苹果4",
  thingimage: "http://i3.hoopchina.com.cn/blogfile/201206/29/134095667484768.jpg",
  useProgress: 45,
  expiredDate: "七天后4"
},
{
  id: "5",
  category: "水果5",
  title: "苹果5",
  thingimage: "http://i3.hoopchina.com.cn/blogfile/201206/29/134095667484768.jpg",
  useProgress: 45,
  expiredDate: "七天后5"
},
{
  id: "6",
  category: "水果6",
  title: "苹果6",
  thingimage: "http://i3.hoopchina.com.cn/blogfile/201206/29/134095667484768.jpg",
  useProgress: 83,
  expiredDate: "七天后6"
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



var AllDataValue = [];
var AllDataKey = "AllThingsKey";
var AllDataPageSize = 5;
var AllCurrentData = [];

function getAllDataStorage() {
  var storageData
  storageData = wx.getStorageSync(AllDataKey)
  // 对数据进行处理
  return firstPage
  // return storageData
}

function getDataWithPage(page) {
  var data = []
  for (var i = 0; i < AllDataPageSize; i++) {
    var item = firstPage[AllDataPageSize*page + i]
    if (item != null && item != undefined) {
      data[i] = item
    }
  }
  return data
}

function getAllDataStorageWithPage(page, completion) {
    setTimeout(() => {
      completion(getDataWithPage(page))
    }, 3000)
}

// function getAllDataStorageWithPage(page) {
//   // var storageData = wx.getStorageSync(AllDataKey)
//   // 对数据进行处理 向服务端请求某页数据
//   // AllCurrentData = AllCurrentData.concat(getDataWithPage(page))
//   // return AllCurrentData

//   return getDataWithPage(page)

//   // return storageData
// }

// function setAllDataStorage() {
  // var key = this.data.key
  // var data = this.data.data
  // if (key.length === 0) {
  //   this.setData({
  //     key: key,
  //     data: data,
  //     'dialog.hidden': false,
  //     'dialog.title': '保存数据失败',
  //     'dialog.content': 'key 不能为空'
  //   })
  // } else {
  //   wx.setStorageSync(key, data)
  //   this.setData({
  //     key: key,
  //     data: data,
  //     'dialog.hidden': false,
  //     'dialog.title': '存储数据成功'
  //   })
  // }
// }

function getAllDataStorageWithxxx() {

}

function addAllDataStorageWithxxx() {

}

function deleteAllDataStorageWithxxx() {

}

function updateAllDataStorageWithxxx() {

}

// 导出接口
module.exports = {
  getAllDataStorage: getAllDataStorage,
  getAllDataStorageWithPage: getAllDataStorageWithPage,
  AllDataPageSize: AllDataPageSize
}