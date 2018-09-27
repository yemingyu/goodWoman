
// const districtListMock = [{ key: 1, value: "化妆品" }, {
//   key: 2, value: "食品"
// }, {
//   key: 3, value: "价格最高"
// }, {
//   key: 4, value: "服务最好"
// }, {
//   key: 5, value: "环境最好"
// }, {
//   key: 6, value: "预约最快"
// }]
// const sortingListMock = [{ key: 1, value: "智能排序" }, {
//   key: 2, value: "价格最低"
// }, {
//   key: 3, value: "价格最高"
// }, {
//   key: 4, value: "服务最好"
// }, {
//   key: 5, value: "环境最好"
// }, {
//   key: 6, value: "预约最快"
// }]

// const filterListMock = [{ key: 1, value: "周日营业", selected: false }, {
//   key: 2, value: "官方假期营业（香港）", selected: false
// }, {
//   key: 3, value: "可为儿童接种疫苗", selected: false
// }, {
//   key: 4, value: "网上付款", selected: false
// }, {
//   key: 5, value: "到诊所现场付款", selected: false
// }]



var AllDataValue = [];
var AllDealedDataValue = [];
var AllDataKey = "AllThingsKeyTest1";
var AllDataPageSize = 5;
var AllCurrentData = [];
var AllDataCurrentIdKey = "AllDataCurrentIdKeyTest3"

var AllDataDicValue = {};
var AllDataDicKey = "AllThingsDicKeyTest1";
// var AllDataDicValueIdKey = "AllDataDicValueIdKey"

var AllCategory = ['水果', '化妆品', '饮料'];

function transformThingData(data) {
  var resultData = {}
  resultData["id"] = data["id"]
  resultData["category"] = data["category"]
  resultData["title"] = data["title"]
  resultData["thingimage"] = data["thingimage"]
  // resultData["thingimage"] = "http://i3.hoopchina.com.cn/blogfile/201206/29/134095667484768.jpg"
  // 时间处理
  resultData["ValidityDate"] = data["ValidityDate"]
  resultData["OpenDate"] = data["OpenDate"]

    var ValidityDate_timestamp = Date.parse(new Date(resultData["ValidityDate"]));
    var OpenDate_timestamp = Date.parse(new Date(resultData["OpenDate"]));
    var ValidityDate = new Date();
    ValidityDate.setTime(ValidityDate_timestamp);

    var OpenDate = new Date();
    OpenDate.setTime(OpenDate_timestamp);

    var currentDate = new Date();

  var allDays = Math.floor((ValidityDate.getTime() - OpenDate.getTime()) / (24 * 3600 * 1000)) 
  var remainedDays = Math.floor((ValidityDate.getTime() - currentDate.getTime()) / (24 * 3600 * 1000))
  var costDaysPercent = Math.floor((allDays - remainedDays) / allDays * 100)

  resultData["useProgress"] = costDaysPercent
  if (costDaysPercent > 90) {
    resultData["progressColor"] = "#e64340"
  } else if (costDaysPercent > 70) {
    resultData["progressColor"] = "#FFC346"
  } else {
    resultData["progressColor"] = "#1AAD19"
  }
  if (remainedDays <= 0) {
    resultData["expiredDate"] = "已过期"
  } else {
    resultData["expiredDate"] = "还有" + remainedDays + "天过期"
  }
  return resultData
}

function getAllDataStorage() {
  AllDataDicValue = wx.getStorageSync(AllDataDicKey)
  if (AllDataDicValue == null || AllDataDicValue == "") {
    AllDataDicValue = {}
  }
  AllDataValue = []
  var i = 0
  for (var key in AllDataDicValue) {
    AllDataValue[i++] = AllDataDicValue[key]
  }
  // AllDataValue = wx.getStorageSync(AllDataKey)

  var AllDealedDataValue = []
  // 对数据进行处理
  for (var i = 0; i < AllDataValue.length; i++) {
    AllDealedDataValue[i] = transformThingData(AllDataValue[i])
  }
  return AllDealedDataValue
}

function getAllKeyDataStorageWithKey(key) {
  var data = getAllDataStorage()
  if (null == key || "" == key) {
    return null
  }
  var resultData = []
  // TODO: 搜索算法
  for (var i = 0; i < data.length; i++) {
    var title = data[i]["title"]
    var category = data[i]["category"]
    if (title && title.indexOf(key) != -1) {
      resultData.add(data[i])
    } else if (category && category.indexOf(key) != -1) {
      resultData.push(data[i])
    }
  }
  return resultData
}

function getDataWithPage(page) {
  var data = []
  for (var i = 0; i < AllDataPageSize; i++) {
    var item = AllDataValue[AllDataPageSize*page + i]
    if (item != null && item != undefined) {
      data[i] = transformThingData(item)
    }
  }
  return data
}

function getDataWithKeyDataAndPage(keyData, page) {
  var data = []
  for (var i = 0; i < AllDataPageSize; i++) {
    var item = keyData[AllDataPageSize * page + i]
    if (item != null && item != undefined) {
      data[i] = transformThingData(item)
    }
  }
  return data
}

function getAllDataStorageWithPage(page, completion) {
    setTimeout(() => {
      // TODO: 模拟从服务端获取数据
      getAllDataStorage()
      completion(getDataWithPage(page))
    }, 1000)
}

function getAllDataStorageWithPageAndKey(page, key, completion) {
  setTimeout(() => {
    // TODO: 模拟从服务端获取数据
    var keyData = getAllKeyDataStorageWithKey(key)
    completion(getDataWithKeyDataAndPage(keyData, page))
  }, 1000)
}

function getAllDataStorageWithReadyPage(page, completion) {
  setTimeout(() => {
    // TODO: 模拟从服务端获取数据
    getAllDataStorage()
    var data = []
    for (var i = 0; i <= page; i++) {
      data = data.concat(getDataWithPage(i))
    }
    completion(data)
  }, 1000)
}

function getAllDataStorageWithReadyPageAndKey(page, key, completion) {
  setTimeout(() => {
    // TODO: 模拟从服务端获取数据
    var keyData = getAllKeyDataStorageWithKey(key)
    var data = []
    for (var i = 0; i <= page; i++) {
      data = data.concat(getDataWithKeyDataAndPage(keyData, i))
    }
    completion(data)
  }, 1000)
}

function addAllDataStorageWithData(data, completion) {
  setTimeout(() => {
    var resultData = {}
    resultData["id"] = getCurrentId()
    resultData["category"] = data["category"]
    resultData["title"] = data["title"]
    // 图片需要上传后获取链接才能使用
    resultData["thingimage"] = data["thingimage"]
    // resultData["thingimage"] = "http://i3.hoopchina.com.cn/blogfile/201206/29/134095667484768.jpg"
    // 时间处理
    resultData["ValidityDate"] = data["ValidityDate"]
    resultData["OpenDate"] = data["OpenDate"]
    resultData["AlarmDate"] = data["AlarmDate"]

    // AllDataValue[AllDataValue.length] = resultData
    // wx.setStorageSync(AllDataKey, AllDataValue)
    AllDataDicValue[resultData["id"]] = resultData
    wx.setStorageSync(AllDataDicKey, AllDataDicValue)
    completion(true)
  }, 3000)
}

function getAllDataStorageWithId(targetIdStr) {
  var resultData = AllDataDicValue[targetIdStr]
  return resultData
}

function deleteAllDataStorageWithId(targetIdStr, completion) {
  setTimeout(() => {
    delete AllDataDicValue[targetIdStr];
    wx.setStorageSync(AllDataDicKey, AllDataDicValue)
    completion(true)
  }, 3000)
}

function updateAllDataStorageWithId(targetIdStr, data, completion) {
  setTimeout(() => {
    AllDataDicValue[targetIdStr] = data;
    wx.setStorageSync(AllDataDicKey, AllDataDicValue)
    completion(true)
  }, 3000)
}

function getCurrentId() {
  var currentId = wx.getStorageSync(AllDataCurrentIdKey)
  var currentIdNum
  if (currentId == null || currentId == "") {
    currentId = 1   // 从1开始
  }
  currentIdNum = new Number(currentId);
  var currentIdStr = currentId.toString()
  setCurrentId(currentId + 1)
  return currentIdStr
}

function setCurrentId(currentId) {
  wx.setStorageSync(AllDataCurrentIdKey, currentId)
}

// 导出接口
module.exports = {
  getAllDataStorage: getAllDataStorage,
  getAllDataStorageWithPage: getAllDataStorageWithPage,
  getAllDataStorageWithReadyPage: getAllDataStorageWithReadyPage,
  AllDataPageSize: AllDataPageSize,
  addAllDataStorageWithData: addAllDataStorageWithData,
  AllCategory: AllCategory,
  getAllDataStorageWithId: getAllDataStorageWithId,
  deleteAllDataStorageWithId: deleteAllDataStorageWithId,
  updateAllDataStorageWithId: updateAllDataStorageWithId,
  getAllDataStorageWithPageAndKey: getAllDataStorageWithPageAndKey,
  getAllDataStorageWithReadyPageAndKey: getAllDataStorageWithReadyPageAndKey
}