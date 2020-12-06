# 简易译

简易译 微信小程序

微信扫一扫：

<div>
  <img src="https://s3.ax1x.com/2020/12/06/DXn2qK.jpg" style="zoom:33%;" />
</div>



或长按二维码：

<div>
  <img src="https://s3.ax1x.com/2020/12/06/DXnWVO.jpg" style="zoom:33%;" />
</div>

# 项目说明

## 一、index 页

### 1.1 navigator

`navigator` 功能 `a`链接相似，通过`navigator`跳转到小程序的其他页面

### 1.2 iconfont

引入 `iconfont` ,使用外链的 icon-font 图标

### 1.3 input

`input` 栏通过 `hidden="{{hideClearIcon}}"` 控制 iconfont 的 `X` 是否隐藏

- `hideClearIcon: true` 隐藏
- `hideClearIcon: false` 展示

事件绑定为 `bindtap='onTapClose'`: 当用户点击的时候，执行 `onTapClose`

`textarea` 中 `bindinput='onInput' bindconfirm='onConfirm' bindblur='onConfirm'`触发翻译操作

```HTML
<textarea placeholder='请输入要翻译的文本' placeholder-style='color: #8995a1'  bindinput='onInput' bindconfirm='onConfirm' bindblur='onConfirm'  value="{{query}}"></textarea>
```

### 1.4 翻译 api

- 请求使用 `wx.request()`
  
- 翻译 api 使用百度的接口

```JavaScript
wx.request({
  url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
  data: {
    q,  //输入文本
    from,  //需要翻译的
    to,   //翻译为
    appid,
    salt,
    sign   //拼接 MD5进行加密
  },
  success(res) {
    if (res.data && res.data.trans_result) {
      resolve(res.data)
    } else {
      reject({ status: 'error', msg: '翻译失败' })
      wx.showToast({
        title: '翻译失败',
        icon: 'none',
        duration: 3000
      })
    }
  },
  fail() {
    reject({ status: 'error', msg: '翻译失败' })
    wx.showToast({
      title: '网络异常',
      icon: 'none',
      duration: 3000
    })
  }
})
```

- 设置百度翻译 api 之前需要先到微信小程序设置 `request合法域名`

### 1.5 text-area 翻译结果

`<view class="text-result" wx:for="{{result}}" wx:key="index">`，可以循环展示翻译结果。

`<text selectable="true">{{item.dst}}</text>`，设置用户可选择



## 二、change 页

### 2.1 globalData

设置默认语言`curlang`，和历史选择过的缓存语言`wx.getStorageSync('curLang')`

### 2.2 item 列表

change 页的 item 语言列表当中，绑定`bindtap='onTapItem'`事件

```JavaScript
onTapItem: function (e) {
  let langObj = e.currentTarget.dataset
  wx.setStorageSync('language', langObj)
  this.setData({ 'curLang': langObj })
  app.globalData.curLang = langObj
  wx.switchTab({ url: '/pages/index/index' })   //使用 switchTab 回到 tabBar
}
```

使用 `hover-class="view-hover"` 设置选择之后的样式效果

使用 `<text class="iconfont icon-duihao" wx:if="{{index===curLang.index}}"></text>` 添加选择语言后 ✅ 字体图标并通过 `wx:if` 选择渲染条件

### 2.3 onShow

进行 change 页面渲染的时候，获取当前的语言

```JavaScript
onShow: function () {
    this.setData({ curLang: app.globalData.curLang })
  }
```

## 三、history 页

### 3.1 获取 和设置 history 缓存

```JavaScript
let history = wx.getStorageSync('history') || []
history.unshift({ query: this.data.query, result: res.trans_result[0].dst })
history.length = history.length > 10 ? 10 : history.length
wx.setStorageSync('history', history)
```

### 3.2 onTapItem

点击跳转 `index页`，并附带 query

```JavaScript
onTapItem: function (e) {
  wx.reLaunch({
    url: `/pages/index/index?query=${e.currentTarget.dataset.query}`
  })
}
```

因为使用了`reLaunch`，所以`index页`会重新加载，使用 `index.js` 的 `onLoad`

```JavaScript
onLoad: function (options) {  //翻译历史页通过 reLaunch 跳转，重新加载
  if (options.query) {
    this.setData({ query: options.query })
    this.setData({ 'hideClearIcon': false })   //让icon-close显现
  }
}
```
